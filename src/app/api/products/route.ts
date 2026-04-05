import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  try {
    const supabase = createAdminClient()
    const { searchParams } = new URL(request.url)
    const line = searchParams.get('line')
    const visible = searchParams.get('visible')
    const recommended = searchParams.get('recommended')

    let query = supabase.from('products').select('*, product_images(*)').order('line').order('sort_order')

    if (line) query = query.eq('line', line)
    if (visible === 'true') query = query.eq('is_visible', true)
    if (recommended === 'true') query = query.eq('is_recommended', true)

    const { data, error } = await query
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })

    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
