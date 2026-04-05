import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { generateInquiryNumber } from '@/lib/utils'
import { sendInquiryNotification, sendInquiryAutoReply } from '@/lib/mailer'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const supabase = createAdminClient()

    const inquiryNumber = body.inquiry_number || generateInquiryNumber()

    const { data, error } = await supabase.from('inquiries').insert({
      inquiry_number: inquiryNumber,
      company_name: body.company_name,
      contact_person: body.contact_person,
      country: body.country,
      email: body.email,
      phone: body.phone || null,
      interested_product: body.interested_product || null,
      desired_quantity: body.desired_quantity || null,
      packaging_preference: body.packaging_preference || null,
      target_market: body.target_market || null,
      delivery_schedule: body.delivery_schedule || null,
      notes: body.notes || null,
      status: 'new',
    }).select().single()

    if (error) {
      console.error('Inquiry insert error:', error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    // メール通知（失敗してもAPIは成功扱い）
    try {
      await Promise.all([
        // 管理者への通知
        sendInquiryNotification({
          inquiry_number: inquiryNumber,
          company_name: body.company_name,
          contact_person: body.contact_person,
          country: body.country,
          email: body.email,
          phone: body.phone,
          interested_product: body.interested_product,
          desired_quantity: body.desired_quantity,
          notes: body.notes,
        }),
        // お客様への自動返信
        sendInquiryAutoReply({
          inquiry_number: inquiryNumber,
          contact_person: body.contact_person,
          email: body.email,
          company_name: body.company_name,
        }),
      ])
      console.log(`✅ Emails sent for inquiry ${inquiryNumber}`)
    } catch (mailErr) {
      console.error('Mail send error (non-fatal):', mailErr)
    }

    return NextResponse.json({ success: true, data })
  } catch (err) {
    console.error('API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const supabase = createAdminClient()
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    let query = supabase.from('inquiries').select('*').order('created_at', { ascending: false })
    if (status) query = query.eq('status', status)

    const { data, error } = await query
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })

    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
