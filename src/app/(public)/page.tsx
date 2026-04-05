import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { ArrowRight, Leaf, Award, Globe, Package, CheckCircle } from 'lucide-react'
import type { Product, FaqItem } from '@/types'

async function getHomeData() {
  const supabase = await createClient()
  const [{ data: products }, { data: faqs }, { data: cms }] = await Promise.all([
    supabase.from('products').select('*, product_images(url, is_primary)').eq('is_visible', true).eq('is_recommended', true).order('sort_order').limit(6),
    supabase.from('faq_items').select('*').eq('is_visible', true).order('sort_order').limit(5),
    supabase.from('cms_contents').select('*'),
  ])
  const cmsMap: Record<string, string> = {}
  cms?.forEach(c => { cmsMap[`${c.section_key}.${c.content_key}`] = c.value_en || c.value || '' })
  return { products: products || [], faqs: faqs || [], cmsMap }
}

function CmsText({ map, key: k, fallback }: { map: Record<string, string>; key: string; fallback: string }) {
  return <>{map[k] || fallback}</>
}

export default async function HomePage() {
  const { products, faqs, cmsMap } = await getHomeData()

  const heroTitle = cmsMap['hero.title_en'] || 'Premium Japanese Matcha for Global Brands'
  const heroSubtitle = cmsMap['hero.subtitle_en'] || 'Sourced from the finest tea gardens in Uji, Kyoto & Nishio, Aichi. Your trusted OEM partner for ceremonial, culinary, and organic matcha.'

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/6225838/pexels-photo-6225838.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Tea field"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a3009]/90 via-[#2d5016]/80 to-[#1a3009]/90" />
        </div>
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)', backgroundSize: '30px 30px' }} />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full text-green-200 text-xs tracking-widest mb-8">
            <Leaf size={12} />
            JAPAN MATCHA OEM
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            style={{ fontFamily: 'var(--font-serif)' }}>
            {heroTitle}
          </h1>
          <p className="text-lg text-green-100 max-w-2xl mx-auto mb-10 leading-relaxed">
            {heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sample-order"
              className="px-8 py-4 bg-white text-[#1a3009] font-bold hover:bg-green-50 transition-colors tracking-wide">
              Order Samples →
            </Link>
            <Link href="/quote"
              className="px-8 py-4 border-2 border-[#b8963e] text-[#b8963e] hover:bg-[#b8963e] hover:text-white transition-all font-bold tracking-wide">
              Request OEM Quote
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            {[['15+', 'Grades'], ['50+', 'Countries'], ['10+', 'Years']].map(([n, l]) => (
              <div key={l} className="text-center">
                <div className="text-2xl font-bold text-white">{n}</div>
                <div className="text-xs text-green-300 mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-px h-8 bg-white/30 mx-auto" />
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="bg-[#faf8f3] border-y border-[#e8e0d0]">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Award, title: 'Premium Quality', desc: 'Ceremonial & Culinary grades' },
              { icon: Leaf, title: 'Organic Certified', desc: 'JAS organic certification available' },
              { icon: Globe, title: 'Global Shipping', desc: 'Export to 50+ countries' },
              { icon: Package, title: 'Private Label', desc: 'Custom packaging & branding' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-3">
                <div className="p-2 bg-[#2d5016]/10 rounded-lg flex-shrink-0">
                  <Icon className="text-[#2d5016]" size={20} />
                </div>
                <div>
                  <div className="font-semibold text-sm text-gray-900">{title}</div>
                  <div className="text-xs text-gray-500">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MATCHA GRADES */}
      <section className="section-padding bg-white">
        <div className="container-xl">
          <div className="text-center mb-14">
            <div className="text-xs text-[#b8963e] tracking-widest mb-3 font-medium">OUR MATCHA</div>
            <h2 className="section-title">Three Lines of Excellence</h2>
            <div className="gold-divider" />
            <p className="text-gray-600 mt-4 max-w-xl mx-auto">
              {cmsMap['quality.body_en'] || 'From ceremonial-grade to culinary matcha, we offer 15 grades across three distinct lines to meet your specific requirements.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Non-Organic Premium', badge: '7 Grades', color: 'border-[#2d5016]',
                desc: 'Ceremonial to culinary grades. Perfect for premium tea brands, specialty cafes, and high-end confectionery.',
                grades: ['A1 Ceremonial', 'A2 High-Grade', 'A3 Ceremonial', 'B1 Premium Latte', 'B2 Culinary', 'C1 Culinary', 'C2 Food Industry'],
              },
              {
                name: 'Non-Organic Standard', badge: '3 Grades', color: 'border-[#4a7c28]',
                desc: 'Cost-effective solution for food manufacturers, beverage companies, and large-scale production.',
                grades: ['S1 Standard Premium', 'S2 Standard Culinary', 'S3 Food Grade'],
              },
              {
                name: 'Organic', badge: '5 Grades', color: 'border-[#b8963e]',
                desc: 'JAS & EU organic certified. Ideal for health food brands, wellness products, and organic beverage lines.',
                grades: ['Organic A1 Ceremonial', 'Organic A2 Premium', 'Organic B1 Latte', 'Organic B2 Culinary', 'Organic C1 Food'],
              },
            ].map(line => (
              <div key={line.name} className={`bg-[#faf8f3] border-t-4 ${line.color} p-8 hover:shadow-lg transition-shadow`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-[#1a3009] text-lg" style={{ fontFamily: 'var(--font-serif)' }}>{line.name}</h3>
                  <span className="bg-white border border-gray-200 text-xs text-gray-600 px-2 py-1">{line.badge}</span>
                </div>
                <p className="text-sm text-gray-600 mb-5 leading-relaxed">{line.desc}</p>
                <ul className="space-y-2">
                  {line.grades.map(g => (
                    <li key={g} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle size={14} className="text-[#2d5016] flex-shrink-0" />
                      {g}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/products" className="btn-primary inline-flex items-center gap-2">
              View All Products <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* OEM FLOW */}
      <section className="section-padding bg-[#1a3009]">
        <div className="container-xl">
          <div className="text-center mb-14">
            <div className="text-xs text-[#b8963e] tracking-widest mb-3 font-medium">HOW IT WORKS</div>
            <h2 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-serif)' }}>
              {cmsMap['oem_flow.title_en'] || 'OEM Service Flow'}
            </h2>
            <div className="gold-divider" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              { step: '01', title: cmsMap['oem_flow.step1'] || 'Inquiry & Consultation', desc: 'Tell us your requirements' },
              { step: '02', title: cmsMap['oem_flow.step2'] || 'Sample & Testing', desc: 'Receive & evaluate samples' },
              { step: '03', title: cmsMap['oem_flow.step3'] || 'Quote & Proposal', desc: 'Custom pricing & timeline' },
              { step: '04', title: cmsMap['oem_flow.step4'] || 'Production', desc: 'Manufacturing & quality check' },
              { step: '05', title: cmsMap['oem_flow.step5'] || 'Delivery', desc: 'Export & shipping worldwide' },
            ].map((s, i) => (
              <div key={s.step} className="text-center">
                <div className="w-12 h-12 bg-[#b8963e] text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">
                  {s.step}
                </div>
                <div className="font-semibold text-white text-sm mb-1">{s.title}</div>
                <div className="text-xs text-green-300">{s.desc}</div>
                {i < 4 && <div className="hidden md:block absolute" />}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/oem" className="px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-[#1a3009] transition-all font-semibold inline-flex items-center gap-2">
              Learn More About OEM <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* RECOMMENDED PRODUCTS */}
      {products.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-xl">
            <div className="text-center mb-14">
              <div className="text-xs text-[#b8963e] tracking-widest mb-3 font-medium">POPULAR PRODUCTS</div>
              <h2 className="section-title">Recommended Matcha</h2>
              <div className="gold-divider" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product: Product) => {
                const img = (product.product_images as any[])?.find((i: any) => i.is_primary) || (product.product_images as any[])?.[0]
                return (
                  <Link key={product.id} href={`/products/${product.slug}`}
                    className="group border border-gray-200 hover:border-[#2d5016] hover:shadow-lg transition-all">
                    <div className="aspect-[4/3] bg-[#faf8f3] overflow-hidden">
                      {img ? (
                        <img src={img.url} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Leaf className="text-[#2d5016]/30" size={48} />
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-[#b8963e] font-medium tracking-wider">{product.grade}</span>
                        <span className={`text-xs px-2 py-0.5 ${
                          product.line === 'organic' ? 'bg-amber-100 text-amber-800' :
                          product.line === 'premium' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {product.line === 'organic' ? 'Organic' : product.line === 'premium' ? 'Premium' : 'Standard'}
                        </span>
                      </div>
                      <h3 className="font-bold text-[#1a3009] text-lg mb-1" style={{ fontFamily: 'var(--font-serif)' }}>
                        {product.name_en || product.name}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                        {product.grade_label_en || product.grade_label}
                      </p>
                      <div className="flex items-center justify-between">
                        {product.sample_price_usd && (
                          <span className="text-[#2d5016] font-bold">From ${product.sample_price_usd}/100g</span>
                        )}
                        <span className="text-xs text-gray-400">MOQ: {product.moq}kg</span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>

            <div className="text-center mt-10">
              <Link href="/products" className="btn-secondary inline-flex items-center gap-2">
                View All Products <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="section-padding bg-[#faf8f3]">
          <div className="container-xl max-w-3xl">
            <div className="text-center mb-12">
              <div className="text-xs text-[#b8963e] tracking-widest mb-3 font-medium">FAQ</div>
              <h2 className="section-title">Frequently Asked Questions</h2>
              <div className="gold-divider" />
            </div>
            <div className="space-y-4">
              {faqs.map((faq: FaqItem) => (
                <details key={faq.id} className="bg-white border border-gray-200 group">
                  <summary className="flex items-center justify-between p-5 cursor-pointer font-medium text-[#1a3009]">
                    {faq.question_en || faq.question}
                    <span className="ml-4 text-[#b8963e] group-open:rotate-45 transition-transform text-xl flex-shrink-0">+</span>
                  </summary>
                  <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100">
                    {faq.answer_en || faq.answer}
                  </div>
                </details>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/faq" className="text-[#2d5016] hover:underline text-sm font-medium">
                View all FAQs →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA SECTION */}
      <section className="section-padding bg-white border-t border-gray-100">
        <div className="container-xl max-w-3xl text-center">
          <div className="text-xs text-[#b8963e] tracking-widest mb-3 font-medium">GET STARTED</div>
          <h2 className="section-title mb-4">
            {cmsMap['cta.title_en'] || 'Ready to Start Your Matcha OEM Journey?'}
          </h2>
          <div className="gold-divider mb-6" />
          <p className="text-gray-600 mb-10">
            {cmsMap['cta.body_en'] || 'Whether you need a single grade or a full private-label range, we are here to help. Start with a sample, or request a custom quote today.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sample-order" className="btn-primary flex items-center justify-center gap-2">
              {cmsMap['cta.sample_btn'] || 'Order Samples'} <ArrowRight size={16} />
            </Link>
            <Link href="/quote" className="btn-gold flex items-center justify-center gap-2">
              {cmsMap['cta.quote_btn'] || 'Request OEM Quote'} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
