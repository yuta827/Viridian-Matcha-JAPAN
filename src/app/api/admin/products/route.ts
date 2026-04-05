import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';

// 商品一覧取得
export async function GET(request: NextRequest) {
  const supabase = await createAdminClient();
  const { searchParams } = new URL(request.url);
  const line = searchParams.get('line');
  const published = searchParams.get('published');

  let query = supabase
    .from('products')
    .select('*, product_images(*)')
    .order('sort_order');

  if (line) query = query.eq('line', line);
  if (published === 'true') query = query.eq('is_published', true);
  if (published === 'false') query = query.eq('is_published', false);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// 商品作成
export async function POST(request: NextRequest) {
  const supabase = await createAdminClient();
  const body = await request.json();

  const { data, error } = await supabase
    .from('products')
    .insert([body])
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
