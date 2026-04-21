import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Leaf, ArrowRight, Package, Truck } from 'lucide-react'
import type { Product } from '@/types'

export const metadata = {
  title: 'Products — KUU Matcha | Premium Japanese Matcha & Hojicha',
  description: 'KUU Matcha product catalog: 3 Premium, 4 Organic, and 3 Hojicha grades. Sample from $20/100g. Bulk pricing from $220/kg.',
}

// ほうじ茶をgrade_label_enで識別するヘルパー
function isHojicha(product: Product): boolean {
  return (product.grade_label_en || '').toLowerCase().startsWith('hojicha') ||
    product.slug.startsWith('hojicha-')
}

// bulk_price_usd が未設定の場合のフォールバック（grade_label_enから判定）
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

export default async function ProductsPage() {
  const supabase = await createClient()
  const { data: products } = await supabase
    .from('products')
    .select('*, product_images(url, is_primary, sort_order)')
    .eq('is_visible', true)
    .order('sort_order')

  const premium  = products?.filter(p => p.line === 'premium') || []
  const organic  = products?.filter(p => p.line === 'organic') || []
  const hojicha  = products?.filter(p => p.line === 'standard' && isHojicha(p)) || []

  const sections = [
    {
      key: 'premium',
      label: 'Premium Matcha',
      labelJa: 'プレミアム抹茶',
      badge: 'PREMIUM',
      badgeColor: 'bg-[#2d5016] text-white',
      barColor: 'bg-[#2d5016]',
      headerBg: 'from-[#1a3009] to-[#2d5016]',
      items: premium,
      desc: '一番茶のみ使用 · 最高品質 · セレモニアルグレード',
    },
    {
      key: 'organic',
      label: 'Organic Matcha',
      labelJa: 'オーガニック抹茶',
      badge: 'ORGANIC',
      badgeColor: 'bg-amber-700 text-white',
      barColor: 'bg-amber-700',
      headerBg: 'from-amber-900 to-amber-700',
      items: organic,
      desc: '有機JAS認証取得 · 農薬不使用 · 健康志向ブランドに最適',
    },
    {
      key: 'hojicha',
      label: 'Hojicha (Roasted Green Tea)',
      labelJa: 'ほうじ茶',
      badge: 'HOJICHA',
      badgeColor: 'bg-orange-700 text-white',
      barColor: 'bg-orange-700',
      headerBg: 'from-orange-900 to-orange-700',
      items: hojicha,
      desc: '丁寧に焙煎 · 豊かな香り · カフェ・食品製造向け',
    },
  ]

  return (
    <>
      {/* ── Hero ──────────────────────────────────── */}
      <div className="bg-[#1a3009] py-20 text-center px-6">
        <div className="text-xs text-[#b8963e] tracking-widest mb-3 font-semibold">PRODUCTS</div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
          Matcha &amp; Hojicha Catalog
        </h1>
        <p className="text-green-200 max-w-2xl mx-auto text-base leading-relaxed">
          3 Premium · 4 Organic · 3 Hojicha — All from Uji, Kyoto, Japan.
        </p>

        {/* 送料別バナー */}
        <div className="mt-8 inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 px-5 py-2.5 rounded-full text-sm">
          <Truck size={15} className="text-[#b8963e]" />
          All prices shown are <span className="font-bold mx-1">product price only</span> — shipping calculated separately at checkout
        </div>
      </div>

      {/* ── 価格ガイド ──────────────────────────────── */}
      <div className="bg-[#faf8f3] border-b border-[#e8e0d0] py-5 px-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Package size={15} className="text-[#2d5016]" />
            <span><span className="font-semibold text-[#1a3009]">Sample</span>: 100g from $20 (ships worldwide via Japan Post)</span>
          </div>
          <div className="hidden sm:block text-gray-300">|</div>
          <div className="flex items-center gap-2">
            <Package size={15} className="text-amber-700" />
            <span><span className="font-semibold text-[#1a3009]">Bulk</span>: 1kg pricing listed — MOQ 1kg</span>
          </div>
          <div className="hidden sm:block text-gray-300">|</div>
          <div className="flex items-center gap-2">
            <Truck size={15} className="text-gray-400" />
            <span className="text-gray-500">Shipping billed separately</span>
          </div>
        </div>
      </div>

      {/* ── Product Sections ─────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-xl space-y-20">
          {sections.map(section => {
            if (section.items.length === 0) return null
            return (
              <div key={section.key}>
                {/* Section Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className={`w-1.5 h-14 ${section.barColor} rounded-full`} />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-bold tracking-widest px-2 py-0.5 rounded ${section.badgeColor}`}>
                        {section.badge}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-[#1a3009]" style={{ fontFamily: 'var(--font-serif)' }}>
                      {section.label}
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">{section.desc}</p>
                  </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {section.items.map((product: Product) => {
                    const imgs = (product.product_images as any[]) || []
                    const img = imgs.find((i: any) => i.is_primary) || imgs[0]
                    const bulkPrice = (product as any).bulk_price_usd ?? BULK_PRICES[product.slug]
                    return (
                      <Link
                        key={product.id}
                        href={`/products/${product.slug}`}
                        className="group border border-gray-200 hover:border-[#2d5016] hover:shadow-xl transition-all bg-white overflow-hidden rounded-sm"
                      >
                        {/* Product Image */}
                        <div className="aspect-square bg-[#f5f2eb] overflow-hidden relative">
                          {img ? (
                            <img
                              src={img.url}
                              alt={product.name_en || product.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-[#2d5016]/20">
                              <Leaf size={48} />
                              <span className="text-xs">Image coming soon</span>
                            </div>
                          )}
                          {product.is_recommended && (
                            <div className="absolute top-3 left-3 bg-[#b8963e] text-white text-[10px] font-bold px-2 py-1 tracking-wider">
                              ★ BEST SELLER
                            </div>
                          )}
                        </div>

                        {/* Product Info */}
                        <div className="p-5">
                          {/* Japanese/English name */}
                          <div className="mb-3">
                            <h3 className="text-lg font-bold text-[#1a3009] leading-tight" style={{ fontFamily: 'var(--font-serif)' }}>
                              {product.name}
                            </h3>
                            <p className="text-xs text-gray-500 mt-0.5">{product.grade_label_en || product.grade_label}</p>
                          </div>

                          {/* Description */}
                          <p className="text-xs text-gray-600 leading-relaxed line-clamp-2 mb-4">
                            {product.description_en || product.description}
                          </p>

                          {/* Price Block */}
                          <div className="border-t border-gray-100 pt-3 space-y-1.5">
                            {/* Sample price */}
                            {product.sample_price_usd && (
                              <div className="flex items-center justify-between">
                                <span className="text-[11px] text-gray-400 font-medium">Sample (100g)</span>
                                <span className="text-sm font-bold text-[#2d5016]">
                                  ${product.sample_price_usd}
                                  <span className="text-[10px] font-normal text-gray-400 ml-1">+ shipping</span>
                                </span>
                              </div>
                            )}
                            {/* Bulk price */}
                            {bulkPrice && (
                              <div className="flex items-center justify-between">
                                <span className="text-[11px] text-gray-400 font-medium">Bulk (1kg)</span>
                                <span className="text-sm font-bold text-[#b8963e]">
                                  ${bulkPrice}
                                  <span className="text-[10px] font-normal text-gray-400 ml-1">+ shipping</span>
                                </span>
                              </div>
                            )}
                            {!product.sample_price_usd && !bulkPrice && (
                              <span className="text-xs text-gray-400">Price on inquiry</span>
                            )}
                          </div>

                          {/* CTA Arrow */}
                          <div className="mt-4 flex items-center justify-end text-[#2d5016] text-xs font-semibold gap-1 group-hover:gap-2 transition-all">
                            View details <ArrowRight size={12} />
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )
          })}

          {/* Empty state */}
          {(!products || products.length === 0) && (
            <div className="text-center py-20 text-gray-400">
              <Leaf size={48} className="mx-auto mb-4 opacity-30" />
              <p>Products coming soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── Shipping Note ────────────────────────── */}
      <section className="bg-[#f5f2eb] border-t border-[#e8e0d0] py-8 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Truck size={18} className="text-[#2d5016]" />
            <h3 className="font-bold text-[#1a3009] text-base">Shipping Information</h3>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            All prices above are <strong>product price only, excluding shipping</strong>.<br />
            Shipping is calculated at checkout based on your country and total weight.<br />
            We ship worldwide via Japan Post (EMS / e-Packet Light / Parcel).
          </p>
          <Link href="/sample-order" className="mt-4 inline-block text-xs text-[#2d5016] font-semibold underline underline-offset-2 hover:text-[#b8963e] transition-colors">
            → View international shipping rates on Sample Order page
          </Link>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────── */}
      <section className="bg-[#1a3009] py-16 px-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
          Ready to Get Started?
        </h2>
        <p className="text-green-200 mb-8 max-w-lg mx-auto">
          Order samples to verify quality, or contact us for custom blends, large-volume pricing, and private label services.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/sample-order" className="btn-primary inline-flex items-center gap-2">
            Order Samples <ArrowRight size={16} />
          </Link>
          <Link href="/quote" className="btn-gold inline-flex items-center gap-2">
            Get a Bulk Quote <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  )
}
