import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Leaf, ArrowRight, Package, MapPin, CheckCircle } from 'lucide-react'

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: product } = await supabase
    .from('products')
    .select('*, product_images(*)')
    .eq('slug', slug)
    .eq('is_visible', true)
    .single()

  if (!product) notFound()

  const images = (product.product_images || []).sort((a: any, b: any) => a.sort_order - b.sort_order)
  const primaryImg = images.find((i: any) => i.is_primary) || images[0]

  const lineLabel = product.line === 'organic' ? 'Organic' : product.line === 'premium' ? 'Non-Organic Premium' : 'Non-Organic Standard'
  const lineColor = product.line === 'organic' ? 'text-amber-700 bg-amber-50' : product.line === 'premium' ? 'text-green-700 bg-green-50' : 'text-blue-700 bg-blue-50'

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="bg-[#faf8f3] border-b border-[#e8e0d0] px-6 py-3">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-[#2d5016]">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#2d5016]">Products</Link>
          <span>/</span>
          <span className="text-gray-900">{product.name_en || product.name}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div>
            <div className="aspect-square bg-[#faf8f3] overflow-hidden mb-4">
              {primaryImg ? (
                <img src={primaryImg.url} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Leaf className="text-[#2d5016]/20" size={80} />
                </div>
              )}
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((img: any) => (
                  <div key={img.id} className="aspect-square bg-[#faf8f3] overflow-hidden border border-gray-200">
                    <img src={img.url} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs font-medium px-2 py-1 ${lineColor}`}>{lineLabel}</span>
              <span className="font-mono text-sm font-bold text-[#b8963e]">Grade {product.grade}</span>
              {product.is_recommended && (
                <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1">★ Recommended</span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-[#1a3009] mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
              {product.name_en || product.name}
            </h1>
            {product.grade_label_en && (
              <p className="text-[#b8963e] font-medium mb-4">{product.grade_label_en}</p>
            )}

            <div className="border-t border-b border-[#e8e0d0] py-5 my-5 space-y-3">
              {product.sample_price_usd && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Sample Price</span>
                  <span className="text-2xl font-bold text-[#2d5016]">${product.sample_price_usd} <span className="text-sm font-normal text-gray-500">/ 100g</span></span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Minimum Order Qty</span>
                <span className="font-semibold">{product.moq}kg</span>
              </div>
              {product.origin && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 flex items-center gap-1"><MapPin size={14} /> Origin</span>
                  <span className="font-semibold">{product.origin}</span>
                </div>
              )}
              {product.packaging && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 flex items-center gap-1"><Package size={14} /> Packaging</span>
                  <span className="font-semibold">{product.packaging}</span>
                </div>
              )}
            </div>

            {product.description_en && (
              <div className="mb-6">
                <h2 className="font-semibold text-[#1a3009] mb-2">About This Grade</h2>
                <p className="text-gray-600 text-sm leading-relaxed">{product.description_en}</p>
              </div>
            )}

            {product.usage_suggestions_en && (
              <div className="mb-8">
                <h2 className="font-semibold text-[#1a3009] mb-2">Recommended Uses</h2>
                <p className="text-gray-600 text-sm leading-relaxed">{product.usage_suggestions_en}</p>
              </div>
            )}

            <div className="flex flex-col gap-3">
              {(product.inquiry_type === 'order' || product.inquiry_type === 'both') && product.sample_price_usd && (
                <Link href={`/sample-order?product=${product.slug}`}
                  className="btn-primary w-full flex items-center justify-center gap-2 py-4">
                  Order Sample — ${product.sample_price_usd}/100g <ArrowRight size={16} />
                </Link>
              )}
              {(product.inquiry_type === 'inquiry' || product.inquiry_type === 'both') && (
                <Link href={`/quote?product=${product.slug}`}
                  className="btn-gold w-full flex items-center justify-center gap-2 py-4">
                  Start Your Private Label <ArrowRight size={16} />
                </Link>
              )}
              <Link href="/contact" className="btn-secondary w-full flex items-center justify-center gap-2 py-3 text-sm">
                Ask a Question
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
