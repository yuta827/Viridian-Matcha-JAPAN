import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { sendQuoteNotification, sendQuoteAutoReply } from '@/lib/mailer'

export async function POST(request: NextRequest) {
  try {
    const supabase = createAdminClient()
    const body = await request.json()

    const { data, error } = await supabase
      .from('inquiries')
      .insert([{
        inquiry_number: `QT-${Date.now()}`,
        company_name: body.company_name || null,
        contact_person: body.contact_person,
        country: body.country || null,
        email: body.email,
        phone: body.phone || null,
        interested_product: body.interested_product || null,
        desired_quantity: body.desired_quantity || null,
        packaging_preference: body.packaging_preference || null,
        target_market: body.target_market || null,
        delivery_schedule: body.delivery_schedule || null,
        notes: body.notes || null,
        status: 'new',
      }])
      .select()
      .single()

    if (error) {
      console.error('Quote insert error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // メール通知（失敗してもAPIは成功扱い）
    try {
      await Promise.all([
        sendQuoteNotification({
          company_name: body.company_name,
          contact_person: body.contact_person,
          country: body.country,
          email: body.email,
          phone: body.phone,
          interested_product: body.interested_product,
          desired_quantity: body.desired_quantity,
          packaging_preference: body.packaging_preference,
          target_market: body.target_market,
          delivery_schedule: body.delivery_schedule,
          notes: body.notes,
        }),
        sendQuoteAutoReply({
          contact_person: body.contact_person,
          email: body.email,
          company_name: body.company_name,
        }),
      ])
      console.log(`✅ Quote emails sent to ${body.email}`)
    } catch (mailErr) {
      console.error('Quote mail error (non-fatal):', mailErr)
    }

    return NextResponse.json(data, { status: 201 })
  } catch (err) {
    console.error('API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
