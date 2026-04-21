import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Leaf, ArrowRight, Package, MapPin, Truck, CheckCircle } from 'lucide-react'

// bulk_price_usd がDBにない場合のフォールバック
const BULK_PRICES: Record<string, number> = {
  'premium-kiwami': 740,
  'premium-miyabi': 620,
  'premium-midori': 450,
  'organic-rin': 620,
  'organic-sumi': 580,
  'organic-tsumugi': 580,
  'organic-yui': 480,
  'hojicha-hou': 300,
  'hojicha-kaoru': 220,
  'hojicha-tomori': 220,
}

function isHojicha(slug: string, gradeLabel?: string): boolean {
  return slug.startsWith('hojicha-') || (gradeLabel || '').toLowerCase().startsWith('hojicha')
}

function getLineInfo(product: any) {
  const hojicha = isHojicha(product.slug, product.grade_label_en)
  if (hojicha) return { label: 'Hojicha', color: 'text-orange-700 bg-orange-50', bar: 'bg-orange-700' }
  if (product.line === 'organic') return { label: 'Organic', color: 'text-amber-700 bg-amber-50', bar: 'bg-amber-700' }
  if (product.line === 'premium') return { label: 'Premium', color: 'text-green-700 bg-green-50', bar: 'bg-[#2d5016]' }
  return { label: 'Standard', color: 'text-blue-700 bg-blue-50', bar: 'bg-blue-700' }
}

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
  const lineInfo = getLineInfo(product)
  const bulkPrice = product.bulk_price_usd ?? BULK_PRICES[product.slug]

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="bg-[#faf8f3] border-b border-[#e8e0d0] px-6 py-3">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-[#2d5016]">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#2d5016]">Products</Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* ── Image ───────────────────────────── */}
          <div>
            <div className="aspect-square bg-[#faf8f3] overflow-hidden mb-4 rounded-sm">
              {primaryImg ? (
                <img src={primaryImg.url} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-[#2d5016]/20">
                  <Leaf size={80} />
                  <span className="text-sm">Image coming soon</span>
                </div>
              )}
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((img: any) => (
                  <div key={img.id} className="aspect-square bg-[#faf8f3] overflow-hidden border border-gray-200 rounded-sm">
                    <img src={img.url} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Product Info ─────────────────────── */}
          <div>
            {/* Badges */}
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className={`text-xs font-bold px-2.5 py-1 rounded-sm ${lineInfo.color}`}>
                {lineInfo.label}
              </span>
              {product.is_recommended && (
                <span className="text-xs bg-[#b8963e] text-white px-2.5 py-1 rounded-sm font-bold">★ BEST SELLER</span>
              )}
            </div>

            {/* Name */}
            <h1 className="text-3xl md:text-4xl font-bold text-[#1a3009] mb-1 leading-tight" style={{ fontFamily: 'var(--font-serif)' }}>
              {product.name}
            </h1>
            <p className="text-base text-gray-500 mb-1">{product.name_en}</p>
            {product.grade_label_en && (
              <p className="text-sm text-[#b8963e] font-medium mb-5">{product.grade_label_en}</p>
            )}

            {/* Price Block */}
            <div className="bg-[#faf8f3] border border-[#e8e0d0] rounded-sm p-5 mb-5 space-y-3">
              {product.sample_price_usd && (
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-400 font-medium mb-0.5">Sample Price</div>
                    <div className="text-xs text-gray-500">100g · ships worldwide</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#2d5016]">${product.sample_price_usd}</div>
                    <div className="text-xs text-gray-400">+ shipping</div>
                  </div>
                </div>
              )}

              {bulkPrice && (
                <>
                  <div className="border-t border-[#e8e0d0]" />
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-gray-400 font-medium mb-0.5">Bulk Price</div>
                      <div className="text-xs text-gray-500">1kg · MOQ 1kg</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-[#b8963e]">${bulkPrice}</div>
                      <div className="text-xs text-gray-400">+ shipping</div>
                    </div>
                  </div>
                </>
              )}

              {/* Shipping note */}
              <div className="border-t border-[#e8e0d0] pt-3 flex items-start gap-2 text-xs text-gray-500">
                <Truck size={13} className="mt-0.5 shrink-0 text-gray-400" />
                <span>Prices are <strong>product only</strong>. International shipping via Japan Post is calculated at checkout based on weight &amp; destination.</span>
              </div>
            </div>

            {/* Specs */}
            <div className="border-t border-[#e8e0d0] pt-4 mb-5 space-y-2.5 text-sm">
              {product.origin && (
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-gray-400 shrink-0" />
                  <span className="text-gray-500">Origin:</span>
                  <span className="font-semibold text-[#1a3009]">{product.origin}</span>
                </div>
              )}
              {product.packaging && (
                <div className="flex items-center gap-2">
                  <Package size={14} className="text-gray-400 shrink-0" />
                  <span className="text-gray-500">Packaging:</span>
                  <span className="font-semibold text-[#1a3009]">{product.packaging}</span>
                </div>
              )}
            </div>

            {/* Description */}
            {product.description_en && (
              <div className="mb-5">
                <h2 className="font-semibold text-[#1a3009] mb-2 text-sm">About This Grade</h2>
                <p className="text-gray-600 text-sm leading-relaxed">{product.description_en}</p>
              </div>
            )}

            {/* Usage */}
            {product.usage_suggestions_en && (
              <div className="mb-6">
                <h2 className="font-semibold text-[#1a3009] mb-2 text-sm">Recommended Uses</h2>
                <div className="flex flex-wrap gap-1.5">
                  {product.usage_suggestions_en.split(',').map((use: string, i: number) => (
                    <span key={i} className="inline-flex items-center gap-1 text-xs bg-[#f5f2eb] text-[#2d5016] px-2.5 py-1 rounded-full border border-[#e8e0d0]">
                      <CheckCircle size={10} />
                      {use.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3">
              {product.sample_price_usd && (product.inquiry_type === 'order' || product.inquiry_type === 'both') && (
                <Link
                  href={`/sample-order?product=${product.slug}`}
                  className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-base font-semibold"
                >
                  Order Sample — ${product.sample_price_usd}/100g
                  <ArrowRight size={16} />
                </Link>
              )}
              {(product.inquiry_type === 'inquiry' || product.inquiry_type === 'both') && (
                <Link
                  href={`/quote?product=${product.slug}`}
                  className="btn-gold w-full flex items-center justify-center gap-2 py-3"
                >
                  Get Bulk Quote / Private Label
                  <ArrowRight size={16} />
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
