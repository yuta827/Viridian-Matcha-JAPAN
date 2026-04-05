import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { generateOrderNumber } from '@/lib/utils'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const supabase = createAdminClient()

    const { data, error } = await supabase.from('orders').insert({
      order_number: body.order_number || generateOrderNumber(),
      order_type: body.order_type || 'sample',
      email: body.email,
      company_name: body.company_name || null,
      contact_person: body.contact_person || null,
      country: body.country || null,
      phone: body.phone || null,
      shipping_address: body.shipping_address || null,
      line_items: body.line_items || [],
      subtotal_usd: body.subtotal_usd || null,
      shipping_usd: body.shipping_usd || 0,
      total_usd: body.total_usd || null,
      payment_method: body.payment_method || 'paypal',
      payment_status: body.payment_status || 'pending',
      order_status: 'new',
    }).select().single()

    if (error) {
      console.error('Order insert error:', error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, data })
  } catch (err) {
    console.error('API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false })
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
