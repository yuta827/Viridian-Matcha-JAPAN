import Link from 'next/link'
import { ArrowRight, CheckCircle, Package, Leaf, Globe } from 'lucide-react'

export const metadata = { title: 'OEM Service - Matcha OEM' }

export default function OemPage() {
  const steps = [
    { num: '01', title: 'Inquiry & Consultation', desc: 'Submit your OEM inquiry with product requirements, target market, and desired quantities. Our specialist will contact you within 24 hours.' },
    { num: '02', title: 'Sample & Testing', desc: 'We ship samples of your selected matcha grades. Evaluate quality, taste, and color before any commitment.' },
    { num: '03', title: 'Quote & Agreement', desc: 'Receive a detailed proposal covering pricing, packaging, certifications, and timeline. We negotiate to fit your budget.' },
    { num: '04', title: 'Label & Packaging Design', desc: 'Work with our design team or provide your own artwork. Private label, white label, or bulk packaging available.' },
    { num: '05', title: 'Production & QC', desc: 'Your order is produced under strict quality control. Certificates and COA documents provided upon request.' },
    { num: '06', title: 'Export & Delivery', desc: 'We handle all export documentation. Products shipped by sea or air freight to your preferred destination.' },
  ]

  return (
    <>
      <div className="bg-[#1a3009] py-20 text-center px-6">
        <div className="text-xs text-[#b8963e] tracking-widest mb-3">OEM SERVICE</div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
          Build Your Brand with Japanese Matcha
        </h1>
        <p className="text-green-200 max-w-xl mx-auto">
          Complete OEM & private label service from Japan&apos;s finest matcha origins.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link href="/sample-order" className="px-8 py-3 bg-white text-[#1a3009] font-bold hover:bg-green-50 transition-colors">
            Order Samples
          </Link>
          <Link href="/quote" className="px-8 py-3 border-2 border-[#b8963e] text-[#b8963e] hover:bg-[#b8963e] hover:text-white transition-all font-bold">
            Request OEM Quote
          </Link>
        </div>
      </div>

      {/* Services */}
      <section className="section-padding bg-[#faf8f3]">
        <div className="container-xl">
          <div className="text-center mb-14">
            <div className="text-xs text-[#b8963e] tracking-widest mb-3 font-medium">WHAT WE OFFER</div>
            <h2 className="section-title">OEM Capabilities</h2>
            <div className="gold-divider" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Package, title: 'Private Label', desc: 'Your brand, your packaging. We produce to your specifications and apply your labels. Full confidentiality guaranteed.' },
              { icon: Leaf, title: 'Custom Grades', desc: 'Need a specific flavor profile or color? We can create custom blends and grades tailored to your market needs.' },
              { icon: Globe, title: 'Bulk Export', desc: 'From 1kg sample to 10-ton container orders. We handle all customs and export documentation for 50+ countries.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white border border-gray-200 p-8 text-center hover:border-[#2d5016] hover:shadow-lg transition-all">
                <div className="w-14 h-14 bg-[#2d5016]/10 rounded-full flex items-center justify-center mx-auto mb-5">
                  <Icon className="text-[#2d5016]" size={24} />
                </div>
                <h3 className="font-bold text-[#1a3009] text-lg mb-3" style={{ fontFamily: 'var(--font-serif)' }}>{title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flow */}
      <section className="section-padding bg-white">
        <div className="container-lg max-w-4xl">
          <div className="text-center mb-14">
            <div className="text-xs text-[#b8963e] tracking-widest mb-3 font-medium">HOW IT WORKS</div>
            <h2 className="section-title">OEM Process Flow</h2>
            <div className="gold-divider" />
          </div>
          <div className="space-y-6">
            {steps.map((step, i) => (
              <div key={step.num} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-[#2d5016] text-white font-bold flex items-center justify-center text-sm">
                  {step.num}
                </div>
                <div className="flex-1 pb-6 border-b border-gray-100 last:border-0">
                  <h3 className="font-bold text-[#1a3009] text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certs */}
      <section className="bg-[#faf8f3] py-16 px-6 border-y border-[#e8e0d0]">
        <div className="container-lg max-w-4xl">
          <h2 className="text-2xl font-bold text-[#1a3009] mb-8 text-center" style={{ fontFamily: 'var(--font-serif)' }}>
            Certifications Available
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['JAS Organic', 'EU Organic', 'HACCP', 'ISO 22000', 'Kosher', 'Halal', 'Non-GMO', 'Gluten-Free'].map(cert => (
              <div key={cert} className="bg-white border border-gray-200 p-4 text-center text-sm font-medium text-[#1a3009] flex items-center justify-center gap-2">
                <CheckCircle size={14} className="text-[#2d5016]" /> {cert}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#1a3009] py-16 px-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
          Ready to Start Your OEM Project?
        </h2>
        <p className="text-green-200 mb-8">Get samples first — commitment comes later.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/sample-order" className="px-8 py-3 bg-white text-[#1a3009] font-bold hover:bg-green-50 transition-colors">
            Order Samples First
          </Link>
          <Link href="/quote" className="px-8 py-3 border-2 border-[#b8963e] text-[#b8963e] hover:bg-[#b8963e] hover:text-white transition-all font-bold">
            Request OEM Quote
          </Link>
        </div>
      </section>
    </>
  )
}
