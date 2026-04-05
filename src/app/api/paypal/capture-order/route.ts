import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET!;
const PAYPAL_BASE_URL = process.env.PAYPAL_MODE === 'live'
  ? 'https://api-m.paypal.com'
  : 'https://api-m.sandbox.paypal.com';

async function getPayPalToken(): Promise<string> {
  const credentials = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64');
  const res = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });
  const data = await res.json();
  return data.access_token;
}

export async function POST(request: NextRequest) {
  try {
    const { paypalOrderId, orderData } = await request.json();

    const token = await getPayPalToken();

    // PayPalでキャプチャ（支払い確定）
    const captureRes = await fetch(
      `${PAYPAL_BASE_URL}/v2/checkout/orders/${paypalOrderId}/capture`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const captureData = await captureRes.json();

    if (!captureRes.ok || captureData.status !== 'COMPLETED') {
      return NextResponse.json(
        { error: '支払いの確定に失敗しました', details: captureData },
        { status: 400 }
      );
    }

    // DBに注文保存
    const supabase = await createAdminClient();

    // 注文番号生成
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const { count } = await supabase
      .from('orders')
      .select('*', { count: 'exact', head: true });
    const orderNumber = `ORD-${dateStr}-${String((count || 0) + 1).padStart(4, '0')}`;

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([{
        order_number: orderNumber,
        company_name: orderData.company_name || null,
        contact_name: orderData.contact_name,
        country: orderData.country || null,
        email: orderData.email,
        phone: orderData.phone || null,
        total_amount: orderData.total_amount,
        currency: 'USD',
        payment_method: 'paypal',
        payment_status: 'payment_confirmed',
        paypal_order_id: paypalOrderId,
        order_status: 'confirmed',
        shipping_address: orderData.shipping_address || null,
        shipping_country: orderData.country || null,
      }])
      .select()
      .single();

    if (orderError) {
      console.error('Order save error:', orderError);
      return NextResponse.json(
        { error: '注文の保存に失敗しました' },
        { status: 500 }
      );
    }

    // 注文明細保存
    if (orderData.items && order) {
      await supabase.from('order_items').insert(
        orderData.items.map((item: {
          product_id: string;
          product_name: string;
          product_grade: string;
          quantity: number;
          unit_price: number;
        }) => ({
          order_id: order.id,
          product_id: item.product_id,
          product_name: item.product_name,
          product_grade: item.product_grade,
          quantity: item.quantity,
          unit_price: item.unit_price,
          subtotal: item.unit_price * item.quantity,
        }))
      );
    }

    return NextResponse.json({
      success: true,
      orderNumber,
      orderId: order.id,
    });
  } catch (error) {
    console.error('PayPal capture error:', error);
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}
