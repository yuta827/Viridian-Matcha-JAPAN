const { createClient } = require('@supabase/supabase-js')
const supabase = createClient(
  'https://ynbppzqonxglslhhuawe.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InluYnBwenFvbnhnbHNsaGh1YXdlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTI4MDcwOCwiZXhwIjoyMDkwODU2NzA4fQ.O1YK1V358vFQv55VWxgcOZuWRq3Exm8krcRLBx9HRgs'
)

async function setRecommended() {
  // Check current state
  const { data: products } = await supabase
    .from('products')
    .select('id, name, line, grade, is_recommended')
    .order('line').order('sort_order')
  
  console.log('Current products:')
  products.forEach(p => console.log(`  ${p.is_recommended ? '★' : ' '} ${p.line} - ${p.name}`))
  
  const recommended = products.filter(p => p.is_recommended)
  console.log(`\nCurrently recommended: ${recommended.length}`)
  
  if (recommended.length < 3) {
    // Set top products from each line as recommended
    const toRecommend = []
    const lines = ['premium', 'standard', 'organic']
    for (const line of lines) {
      const lineProds = products.filter(p => p.line === line)
      if (lineProds.length > 0) toRecommend.push(lineProds[0].id)
      if (lineProds.length > 1) toRecommend.push(lineProds[1].id)
    }
    
    const { error } = await supabase
      .from('products')
      .update({ is_recommended: true })
      .in('id', toRecommend)
    
    if (error) console.error('Error:', error.message)
    else console.log(`✅ Set ${toRecommend.length} products as recommended`)
  } else {
    console.log('✅ Recommended products already set')
  }
}

setRecommended().catch(console.error)
