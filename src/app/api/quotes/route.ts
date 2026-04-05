import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  const supabase = await createAdminClient();
  const body = await request.json();

  const { data, error } = await supabase
    .from('quotes')
    .insert([{
      company_name: body.company_name || null,
      contact_name: body.contact_name,
      country: body.country || null,
      email: body.email,
      phone: body.phone || null,
      whatsapp: body.whatsapp || null,
      product_interest: body.product_interest || [],
      quantity: body.quantity || null,
      packaging_pref: body.packaging_pref || null,
      target_market: body.target_market || null,
      desired_delivery: body.desired_delivery || null,
      message: body.message || null,
      status: 'new',
    }])
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
