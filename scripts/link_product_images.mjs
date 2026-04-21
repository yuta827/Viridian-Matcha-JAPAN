// 商品と画像を紐付けるスクリプト
const SUPABASE_URL = 'https://ynbppzqonxglslhhuawe.supabase.co'
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InluYnBwenFvbnhnbHNsaGh1YXdlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTI4MDcwOCwiZXhwIjoyMDkwODU2NzA4fQ.O1YK1V358vFQv55VWxgcOZuWRq3Exm8krcRLBx9HRgs'
const STORAGE_BASE = `${SUPABASE_URL}/storage/v1/object/public/product-images`

const headers = {
  'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
  'apikey': SERVICE_ROLE_KEY,
  'Content-Type': 'application/json',
}

async function supabaseFetch(path, options = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    headers,
    ...options,
  })
  const text = await res.text()
  try { return JSON.parse(text) } catch { return text }
}

// 画像が既にアップロード済みのスラッグ→ファイル名マッピング
const IMAGE_MAP = {
  'premium-kiwami': 'kiwami.png',
  'premium-miyabi': 'miyabi.png',
  'premium-midori': 'midori.png',
  'organic-rin': 'rin.png',
  'organic-sumi': 'sumi.png',
  // 残り5枚は後で追加
  // 'organic-tsumugi': 'tsumugi.png',
  // 'organic-yui': 'yui.png',
  // 'hojicha-hou': 'hou.png',
  // 'hojicha-kaoru': 'kaoru.png',
  // 'hojicha-tomori': 'tomori.png',
}

async function main() {
  // 全商品を取得
  const products = await supabaseFetch('products?select=id,slug,name&is_visible=eq.true&order=sort_order')
  console.log(`\n商品数: ${products.length}`)

  for (const product of products) {
    const filename = IMAGE_MAP[product.slug]
    if (!filename) {
      console.log(`⚠ [${product.slug}] 画像なし（スキップ）`)
      continue
    }

    const imageUrl = `${STORAGE_BASE}/${filename}`
    
    // 既存のproduct_imagesを確認
    const existing = await supabaseFetch(`product_images?product_id=eq.${product.id}`)
    if (Array.isArray(existing) && existing.length > 0) {
      // URLを更新
      const updateRes = await supabaseFetch(`product_images?product_id=eq.${product.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ url: imageUrl, is_primary: true }),
      })
      console.log(`✓ [${product.slug}] 更新: ${imageUrl}`)
    } else {
      // 新規挿入
      const insertRes = await supabaseFetch('product_images', {
        method: 'POST',
        headers: {
          ...headers,
          'Prefer': 'return=representation',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: product.id,
          url: imageUrl,
          alt: product.name,
          is_primary: true,
          sort_order: 1,
        }),
      })
      console.log(`✓ [${product.slug}] 挿入: ${imageUrl}`)
      if (Array.isArray(insertRes)) {
        console.log(`  → ID: ${insertRes[0]?.id}`)
      } else {
        console.log(`  → レスポンス: ${JSON.stringify(insertRes)}`)
      }
    }
  }

  console.log('\n✅ 画像紐付け完了！')
}

main().catch(console.error)
