const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://ynbppzqonxglslhhuawe.supabase.co'
const serviceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InluYnBwenFvbnhnbHNsaGh1YXdlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTI4MDcwOCwiZXhwIjoyMDkwODU2NzA4fQ.O1YK1V358vFQv55VWxgcOZuWRq3Exm8krcRLBx9HRgs'

const supabase = createClient(supabaseUrl, serviceKey)

// Pexels free images (CC0) for matcha products
const productImages = [
  // Premium line images
  { key: 'premium', urls: [
    'https://images.pexels.com/photos/5078583/pexels-photo-5078583.jpeg?auto=compress&cs=tinysrgb&w=800', // spoon close up
    'https://images.pexels.com/photos/8474061/pexels-photo-8474061.jpeg?auto=compress&cs=tinysrgb&w=800', // bowl + spoon
    'https://images.pexels.com/photos/8004563/pexels-photo-8004563.jpeg?auto=compress&cs=tinysrgb&w=800', // whisk + powder
  ]},
  // Standard line images
  { key: 'standard', urls: [
    'https://images.pexels.com/photos/8004563/pexels-photo-8004563.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/5078583/pexels-photo-5078583.jpeg?auto=compress&cs=tinysrgb&w=800',
  ]},
  // Organic line images
  { key: 'organic', urls: [
    'https://images.pexels.com/photos/8474061/pexels-photo-8474061.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/8004560/pexels-photo-8004560.jpeg?auto=compress&cs=tinysrgb&w=800',
  ]},
]

async function updateImages() {
  // Get all products
  const { data: products, error } = await supabase
    .from('products')
    .select('id, name, line, slug')
    .order('sort_order')

  if (error) {
    console.error('Error fetching products:', error)
    return
  }

  console.log(`Found ${products.length} products`)

  // Delete existing product images
  const { error: delError } = await supabase
    .from('product_images')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000') // delete all

  if (delError) console.log('Delete error (may be ok):', delError.message)

  // Assign images to products by line
  let insertCount = 0
  for (const product of products) {
    const lineImages = productImages.find(p => p.key === product.line)
    if (!lineImages) continue

    // Cycle through images based on product index
    const idx = products.filter(p => p.line === product.line).indexOf(product)
    const imageUrl = lineImages.urls[idx % lineImages.urls.length]

    const { error: imgError } = await supabase
      .from('product_images')
      .insert({
        product_id: product.id,
        url: imageUrl,
        alt: product.name,
        is_primary: true,
        sort_order: 0
      })

    if (imgError) {
      console.error(`Error inserting image for ${product.name}:`, imgError.message)
    } else {
      insertCount++
      console.log(`✓ Image set for: ${product.name}`)
    }
  }

  console.log(`\n✅ ${insertCount} product images updated`)

  // Update CMS hero image
  const heroImageUrl = 'https://images.pexels.com/photos/6225838/pexels-photo-6225838.jpeg?auto=compress&cs=tinysrgb&w=1920'
  
  const { error: cmsError } = await supabase
    .from('cms_contents')
    .upsert({
      section_key: 'hero',
      content_key: 'image_url',
      value: heroImageUrl,
      value_en: heroImageUrl
    }, { onConflict: 'section_key,content_key' })

  if (cmsError) {
    console.error('CMS hero image error:', cmsError.message)
  } else {
    console.log('✅ Hero image URL saved to CMS')
  }
}

updateImages().catch(console.error)
