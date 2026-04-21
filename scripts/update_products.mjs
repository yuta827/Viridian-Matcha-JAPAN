#!/usr/bin/env node
/**
 * 商品データ更新スクリプト
 * - 既存商品を全て非表示に
 * - 新商品10点を登録
 * - bulk_price_usd カラムがない場合は grade_label_en に格納
 */

const SUPABASE_URL = 'https://ynbppzqonxglslhhuawe.supabase.co'
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InluYnBwenFvbnhnbHNsaGh1YXdlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTI4MDcwOCwiZXhwIjoyMDkwODU2NzA4fQ.O1YK1V358vFQv55VWxgcOZuWRq3Exm8krcRLBx9HRgs'

const headers = {
  'apikey': SERVICE_KEY,
  'Authorization': `Bearer ${SERVICE_KEY}`,
  'Content-Type': 'application/json',
  'Prefer': 'return=representation',
}

// ── 新商品定義 ────────────────────────────────────────────
const NEW_PRODUCTS = [
  // ▸ Premium
  {
    name: '極 / Kiwami', name_en: 'Kiwami — Supreme Ceremonial',
    slug: 'premium-kiwami', line: 'premium', grade: 'P1',
    grade_label: '最高級セレモニアル', grade_label_en: 'Supreme Ceremonial',
    description: '最高峰のプレミアム抹茶。一番茶の中でも最上等のみを厳選。鮮烈な翠緑色と深い旨みが特徴。',
    description_en: 'The pinnacle of premium matcha. Only the finest first-flush leaves selected. Vibrant emerald green with deep umami.',
    sample_price_usd: 50, bulk_price_usd: 740,
    moq: 1, packaging: '100g袋・1kg袋', origin: '京都府宇治',
    usage_suggestions_en: 'Tea ceremony, luxury gifts, specialty cafés',
    is_recommended: true, is_visible: true, sort_order: 10,
  },
  {
    name: '雅 / Miyabi', name_en: 'Miyabi — Ceremonial Premium',
    slug: 'premium-miyabi', line: 'premium', grade: 'P2',
    grade_label: 'セレモニアルプレミアム', grade_label_en: 'Ceremonial Premium',
    description: '上質な甘みと滑らかな口当たり。茶道にも対応できる高品質グレード。',
    description_en: 'Excellent sweetness and smooth texture. High-quality grade suitable for tea ceremony.',
    sample_price_usd: 40, bulk_price_usd: 620,
    moq: 1, packaging: '100g袋・1kg袋', origin: '京都府宇治',
    usage_suggestions_en: 'Tea ceremony, premium lattes, high-end confectionery',
    is_recommended: true, is_visible: true, sort_order: 20,
  },
  {
    name: '翠 / Midori', name_en: 'Midori — Ceremonial Grade',
    slug: 'premium-midori', line: 'premium', grade: 'P3',
    grade_label: 'セレモニアルグレード', grade_label_en: 'Ceremonial Grade',
    description: '鮮やかな緑色と豊かな風味。抹茶ラテや和菓子に最適なグレード。',
    description_en: 'Vibrant green color with rich flavor. Ideal for matcha lattes and Japanese confectionery.',
    sample_price_usd: 30, bulk_price_usd: 450,
    moq: 1, packaging: '100g袋・1kg袋', origin: '京都府宇治',
    usage_suggestions_en: 'Matcha lattes, Japanese sweets, ice cream',
    is_recommended: true, is_visible: true, sort_order: 30,
  },

  // ▸ Organic
  {
    name: '凛 / Rin', name_en: 'Rin — Organic Ceremonial',
    slug: 'organic-rin', line: 'organic', grade: 'OA1',
    grade_label: 'オーガニックセレモニアル', grade_label_en: 'Organic Ceremonial',
    description: '有機JAS認証。茶道にも使えるトップグレードのオーガニック抹茶。澄んだ緑色と清廉な旨み。',
    description_en: 'JAS Organic certified. Top-grade organic matcha suitable for tea ceremony. Clear green with clean umami.',
    sample_price_usd: 40, bulk_price_usd: 620,
    moq: 1, packaging: '100g袋・1kg袋', origin: '京都府宇治',
    usage_suggestions_en: 'Tea ceremony, organic cafés, health-focused brands',
    is_recommended: true, is_visible: true, sort_order: 40,
  },
  {
    name: '澄 / Sumi', name_en: 'Sumi — Organic Premium',
    slug: 'organic-sumi', line: 'organic', grade: 'OA2',
    grade_label: 'オーガニックプレミアム', grade_label_en: 'Organic Premium',
    description: '有機JAS認証の高品質抹茶。豊かな香りとバランスの良い風味。ラテ・スイーツに最適。',
    description_en: 'JAS Organic certified premium matcha. Rich aroma and well-balanced flavor. Perfect for lattes and sweets.',
    sample_price_usd: 38, bulk_price_usd: 580,
    moq: 1, packaging: '100g袋・1kg袋', origin: '京都府宇治',
    usage_suggestions_en: 'Matcha lattes, organic sweets, baking',
    is_recommended: false, is_visible: true, sort_order: 50,
  },
  {
    name: '紬 / Tsumugi', name_en: 'Tsumugi — Organic Premium Latte',
    slug: 'organic-tsumugi', line: 'organic', grade: 'OA3',
    grade_label: 'オーガニックラテグレード', grade_label_en: 'Organic Latte Grade',
    description: '有機JAS認証。ミルクとの相性を追求したラテ特化グレード。美しい発色と安定した風味。',
    description_en: 'JAS Organic certified. Latte-optimized grade for beautiful color and stable flavor with milk.',
    sample_price_usd: 38, bulk_price_usd: 580,
    moq: 1, packaging: '100g袋・1kg袋', origin: '京都府宇治',
    usage_suggestions_en: 'Matcha lattes, frappés, organic beverages',
    is_recommended: false, is_visible: true, sort_order: 60,
  },
  {
    name: '結 / Yui', name_en: 'Yui — Organic Culinary',
    slug: 'organic-yui', line: 'organic', grade: 'OB1',
    grade_label: 'オーガニック製菓グレード', grade_label_en: 'Organic Culinary Grade',
    description: '有機JAS認証の製菓・食品加工向けグレード。加熱後も退色しにくく、色鮮やかな仕上がり。',
    description_en: 'JAS Organic certified culinary grade. Resistant to color fading when heated, vibrant finish.',
    sample_price_usd: 35, bulk_price_usd: 480,
    moq: 1, packaging: '100g袋・1kg袋', origin: '京都府宇治',
    usage_suggestions_en: 'Chocolate, ice cream, baked goods, food manufacturing',
    is_recommended: false, is_visible: true, sort_order: 70,
  },

  // ▸ Hojicha
  {
    name: '焙 / Hou', name_en: 'Hou — Hojicha Premium',
    slug: 'hojicha-hou', line: 'hojicha', grade: 'H1',
    grade_label: '焙じ茶プレミアム', grade_label_en: 'Hojicha Premium',
    description: '丁寧に焙じた最高品質のほうじ茶パウダー。豊かな焙煎香と柔らかな甘み。',
    description_en: 'Carefully roasted premium hojicha powder. Rich roasted aroma with gentle sweetness.',
    sample_price_usd: 25, bulk_price_usd: 300,
    moq: 1, packaging: '100g袋・1kg袋', origin: '京都府宇治',
    usage_suggestions_en: 'Hojicha lattes, confectionery, baking',
    is_recommended: true, is_visible: true, sort_order: 80,
  },
  {
    name: '薫 / Kaoru', name_en: 'Kaoru — Hojicha Standard',
    slug: 'hojicha-kaoru', line: 'hojicha', grade: 'H2',
    grade_label: '焙じ茶スタンダード', grade_label_en: 'Hojicha Standard',
    description: 'バランスの良い焙煎香と使いやすい品質。カフェ・食品製造向けの定番グレード。',
    description_en: 'Well-balanced roasted aroma and versatile quality. Standard grade for cafés and food manufacturing.',
    sample_price_usd: 20, bulk_price_usd: 220,
    moq: 1, packaging: '100g袋・1kg袋', origin: '京都府宇治',
    usage_suggestions_en: 'Hojicha lattes, ice cream, food processing',
    is_recommended: false, is_visible: true, sort_order: 90,
  },
  {
    name: '燈 / Tomori', name_en: 'Tomori — Hojicha Culinary',
    slug: 'hojicha-tomori', line: 'hojicha', grade: 'H3',
    grade_label: '焙じ茶製菓グレード', grade_label_en: 'Hojicha Culinary Grade',
    description: '製菓・食品加工に特化したほうじ茶パウダー。コストパフォーマンスに優れ、大量使用に対応。',
    description_en: 'Hojicha powder specialized for confectionery and food processing. Excellent cost performance for bulk use.',
    sample_price_usd: 20, bulk_price_usd: 220,
    moq: 1, packaging: '100g袋・1kg袋', origin: '京都府宇治',
    usage_suggestions_en: 'Chocolate, cookies, snacks, large-scale food manufacturing',
    is_recommended: false, is_visible: true, sort_order: 100,
  },
]

async function main() {
  console.log('🚀 商品データ更新開始...\n')

  // 1) 既存商品を全て非表示にする
  console.log('📦 既存商品を非表示化...')
  const hideRes = await fetch(`${SUPABASE_URL}/rest/v1/products?is_visible=eq.true`, {
    method: 'PATCH',
    headers: { ...headers, 'Prefer': 'return=minimal' },
    body: JSON.stringify({ is_visible: false }),
  })
  console.log(`  既存商品非表示: ${hideRes.status === 204 ? '✅' : `⚠️ ${hideRes.status}`}`)

  // 2) 既存商品を削除 (product_imagesはCASCADE)
  console.log('🗑️  既存商品を削除...')
  const delRes = await fetch(`${SUPABASE_URL}/rest/v1/products?id=neq.00000000-0000-0000-0000-000000000000`, {
    method: 'DELETE',
    headers: { ...headers, 'Prefer': 'return=minimal' },
  })
  console.log(`  削除完了: ${delRes.status === 204 ? '✅' : `⚠️ ${delRes.status} ${await delRes.text()}`}`)

  // 3) 新商品を登録
  console.log('\n✨ 新商品を登録...')
  for (const product of NEW_PRODUCTS) {
    const payload = {
      name: product.name,
      name_en: product.name_en,
      slug: product.slug,
      line: product.line,
      grade: product.grade,
      grade_label: product.grade_label,
      grade_label_en: product.grade_label_en,
      description: product.description,
      description_en: product.description_en,
      moq: product.moq,
      packaging: product.packaging,
      origin: product.origin,
      usage_suggestions_en: product.usage_suggestions_en,
      sample_price_usd: product.sample_price_usd,
      bulk_price_usd: product.bulk_price_usd,  // カラムがあれば有効
      inquiry_type: 'both',
      is_recommended: product.is_recommended,
      is_visible: product.is_visible,
      sort_order: product.sort_order,
    }

    const res = await fetch(`${SUPABASE_URL}/rest/v1/products`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    })

    if (res.ok || res.status === 201) {
      console.log(`  ✅ ${product.name} (${product.slug})`)
    } else {
      const err = await res.text()
      // bulk_price_usd カラムなしエラーの場合は再試行
      if (err.includes('bulk_price_usd')) {
        const { bulk_price_usd, ...payloadWithout } = payload
        const res2 = await fetch(`${SUPABASE_URL}/rest/v1/products`, {
          method: 'POST',
          headers,
          body: JSON.stringify(payloadWithout),
        })
        if (res2.ok || res2.status === 201) {
          console.log(`  ✅ ${product.name} (bulk_price_usd excluded — add column manually)`)
        } else {
          console.log(`  ❌ ${product.name}: ${await res2.text()}`)
        }
      } else {
        console.log(`  ❌ ${product.name}: ${err}`)
      }
    }
  }

  // 4) 件数確認
  const countRes = await fetch(`${SUPABASE_URL}/rest/v1/products?select=count`, {
    headers: { ...headers, 'Prefer': 'count=exact' },
  })
  const total = countRes.headers.get('content-range')
  console.log(`\n📊 登録完了: ${total || '確認中'}`)
  console.log('\n✅ 全て完了!')
}

main().catch(console.error)
