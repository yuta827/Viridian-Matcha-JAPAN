import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export const metadata = { title: 'FAQ - Matcha OEM' }

export default async function FaqPage() {
  const supabase = await createClient()
  const { data: faqs } = await supabase
    .from('faq_items')
    .select('*')
    .eq('is_visible', true)
    .order('sort_order')

  const categories = [
    { key: 'general', label: 'General' },
    { key: 'oem', label: 'OEM Service' },
    { key: 'order', label: 'Orders & Samples' },
    { key: 'shipping', label: 'Shipping' },
    { key: 'payment', label: 'Payment' },
  ]

  const grouped = categories.reduce((acc, cat) => {
    const items = faqs?.filter(f => f.category === cat.key) || []
    if (items.length > 0) acc[cat.key] = { label: cat.label, items }
    return acc
  }, {} as Record<string, { label: string; items: typeof faqs }>)

  return (
    <>
      <div className="bg-[#1a3009] py-20 text-center px-6">
        <div className="text-xs text-[#b8963e] tracking-widest mb-3">FAQ</div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
          Frequently Asked Questions
        </h1>
        <p className="text-green-200 max-w-xl mx-auto">Everything you need to know about our matcha OEM service.</p>
      </div>

      <section className="section-padding bg-[#faf8f3]">
        <div className="container-lg max-w-3xl">
          {Object.entries(grouped).map(([key, { label, items }]) => (
            <div key={key} className="mb-12">
              <h2 className="text-xl font-bold text-[#1a3009] mb-5 flex items-center gap-3" style={{ fontFamily: 'var(--font-serif)' }}>
                <span className="w-8 h-px bg-[#b8963e] inline-block" />
                {label}
              </h2>
              <div className="space-y-3">
                {items?.map(faq => (
                  <details key={faq.id} className="bg-white border border-gray-200 group">
                    <summary className="flex items-center justify-between p-5 cursor-pointer font-medium text-[#1a3009]">
                      {faq.question_en || faq.question}
                      <span className="ml-4 text-[#b8963e] group-open:rotate-45 transition-transform text-xl flex-shrink-0">+</span>
                    </summary>
                    <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                      {faq.answer_en || faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}

          {(!faqs || faqs.length === 0) && (
            <div className="text-center py-12 text-gray-400">No FAQs available yet.</div>
          )}

          <div className="mt-16 bg-[#1a3009] text-white p-8 text-center">
            <h3 className="text-xl font-bold mb-3">Still have questions?</h3>
            <p className="text-green-200 mb-6">Our team is ready to help you find the right matcha solution.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="px-6 py-3 border border-white text-white hover:bg-white hover:text-[#1a3009] transition-all">
                Contact Us
              </Link>
              <Link href="/quote" className="px-6 py-3 bg-[#b8963e] text-white hover:bg-[#d4af6a] transition-all font-semibold">
                Request Quote
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
