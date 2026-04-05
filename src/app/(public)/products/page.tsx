import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Leaf, ArrowRight } from 'lucide-react'
import type { Product } from '@/types'

export const metadata = { title: 'Products - Matcha OEM' }

export default async function ProductsPage() {
  const supabase = await createClient()
  const { data: products } = await supabase
    .from('products')
    .select('*, product_images(url, is_primary)')
    .eq('is_visible', true)
    .order('line').order('sort_order')

  const lines = [
    { key: 'premium', label: 'Non-Organic Premium Line', subtitle: '7 Grades — Ceremonial to Culinary', color: 'bg-green-700' },
    { key: 'standard', label: 'Non-Organic Standard Line', subtitle: '3 Grades — Cost-Effective', color: 'bg-blue-700' },
    { key: 'organic', label: 'Organic Line', subtitle: '5 Grades — JAS Certified', color: 'bg-amber-700' },
  ]

  const grouped = {
    premium: products?.filter(p => p.line === 'premium') || [],
    standard: products?.filter(p => p.line === 'standard') || [],
    organic: products?.filter(p => p.line === 'organic') || [],
  }

  return (
    <>
      {/* Hero */}
      <div className="bg-[#1a3009] py-20 text-center px-6">
        <div className="text-xs text-[#b8963e] tracking-widest mb-3">PRODUCTS</div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
          Matcha Product Catalog
        </h1>
        <p className="text-green-200 max-w-xl mx-auto">
          15 grades across 3 lines. From ceremonial tea ceremony to large-scale food manufacturing.
        </p>
      </div>

      {/* Products */}
      <section className="section-padding bg-white">
        <div className="container-xl">
          {lines.map(line => {
            const lineProducts = grouped[line.key as keyof typeof grouped]
            if (lineProducts.length === 0) return null
            return (
              <div key={line.key} className="mb-20">
                <div className="flex items-center gap-4 mb-8">
                  <div className={`w-1 h-12 ${line.color}`} />
                  <div>
                    <h2 className="text-2xl font-bold text-[#1a3009]" style={{ fontFamily: 'var(--font-serif)' }}>
                      {line.label}
                    </h2>
                    <p className="text-sm text-gray-500">{line.subtitle}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {lineProducts.map((product: Product) => {
                    const img = (product.product_images as any[])?.find((i: any) => i.is_primary) || (product.product_images as any[])?.[0]
                    return (
                      <Link key={product.id} href={`/products/${product.slug}`}
                        className="group border border-gray-200 hover:border-[#2d5016] hover:shadow-lg transition-all">
                        <div className="aspect-[4/3] bg-[#faf8f3] overflow-hidden">
                          {img ? (
                            <img src={img.url} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Leaf className="text-[#2d5016]/20" size={40} />
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-mono text-xs font-bold text-[#b8963e]">Grade {product.grade}</span>
                            {product.is_recommended && (
                              <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5">★ Recommended</span>
                            )}
                          </div>
                          <h3 className="font-bold text-[#1a3009] text-base mb-1" style={{ fontFamily: 'var(--font-serif)' }}>
                            {product.name_en || product.name}
                          </h3>
                          <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                            {product.grade_label_en || product.grade_label}
                          </p>
                          <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
                            {product.sample_price_usd ? (
                              <span className="text-sm font-bold text-[#2d5016]">${product.sample_price_usd}<span className="text-xs font-normal text-gray-400">/100g</span></span>
                            ) : (
                              <span className="text-xs text-gray-400">Inquiry only</span>
                            )}
                            <span className="text-xs text-gray-400">MOQ {product.moq}kg</span>
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )
          })}

          {(!products || products.length === 0) && (
            <div className="text-center py-20 text-gray-400">
              <Leaf size={48} className="mx-auto mb-4 opacity-30" />
              <p>Products coming soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#faf8f3] py-16 px-6 text-center border-t border-[#e8e0d0]">
        <h2 className="text-2xl font-bold text-[#1a3009] mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
          Can&apos;t find what you need?
        </h2>
        <p className="text-gray-600 mb-8">Contact us for custom grades, blends, or large-volume OEM pricing.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/sample-order" className="btn-primary inline-flex items-center gap-2">Order Samples <ArrowRight size={16} /></Link>
          <Link href="/quote" className="btn-gold inline-flex items-center gap-2">Request OEM Quote <ArrowRight size={16} /></Link>
        </div>
      </section>
    </>
  )
}
