import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const supabase = await createAdminClient();
  const { searchParams } = new URL(request.url);
  const paymentStatus = searchParams.get('payment_status');
  const orderStatus = searchParams.get('order_status');

  let query = supabase
    .from('orders')
    .select('*, order_items(*)')
    .order('created_at', { ascending: false });

  if (paymentStatus) query = query.eq('payment_status', paymentStatus);
  if (orderStatus) query = query.eq('order_status', orderStatus);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
