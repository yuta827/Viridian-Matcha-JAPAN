import Link from 'next/link'
import { ArrowRight, CheckCircle, Package, Leaf, Globe, Tag, FlaskConical, Truck } from 'lucide-react'

export const metadata = {
  title: 'Private Label Matcha - KUU Matcha',
  description: 'Launch your own matcha brand with KUU LLC. Full private label service from Japan\'s finest tea gardens — custom packaging, organic certification, and global shipping.',
}

export default function PrivateLabelPage() {
  const steps = [
    {
      num: '01', title: 'Inquiry & Consultation',
      desc: 'Tell us your brand vision, target market, and product requirements. Our specialist responds within 24 hours to guide you through the options.',
    },
    {
      num: '02', title: 'Sample & Evaluation',
      desc: 'We ship you matcha samples across multiple grades. Taste, evaluate color and aroma — no commitment required at this stage.',
    },
    {
      num: '03', title: 'Custom Proposal',
      desc: 'Receive a detailed proposal covering pricing, packaging design, certifications, and timeline. Fully tailored to your brand and budget.',
    },
    {
      num: '04', title: 'Packaging & Branding',
      desc: 'Work with our team or bring your own artwork. We support white label, full private label, and bespoke packaging formats.',
    },
    {
      num: '05', title: 'Production & Quality Control',
      desc: 'Your order is manufactured under strict QC protocols. Certificate of Analysis (COA) and relevant certifications provided upon request.',
    },
    {
      num: '06', title: 'Export & Delivery',
      desc: 'We handle all export documentation and customs paperwork. Air or sea freight delivery to 50+ countries worldwide.',
    },
  ]

  return (
    <>
      {/* Hero */}
      <div className="bg-[#1a3009] py-20 text-center px-6">
        <div className="text-xs text-[#b8963e] tracking-widest mb-3">PRIVATE LABEL SERVICE</div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
          Your Matcha. Your Brand.
        </h1>
        <p className="text-green-200 max-w-xl mx-auto leading-relaxed">
          Full custom matcha sourcing and private label service from Japan&apos;s finest tea origins.
          From concept to shelf — we build it with you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link href="/sample-order" className="px-8 py-3 bg-white text-[#1a3009] font-bold hover:bg-green-50 transition-colors">
            Order Samples
          </Link>
          <Link href="/quote" className="px-8 py-3 border-2 border-[#b8963e] text-[#b8963e] hover:bg-[#b8963e] hover:text-white transition-all font-bold">
            Start Your Private Label
          </Link>
        </div>
      </div>

      {/* What We Offer */}
      <section className="section-padding bg-[#faf8f3]">
        <div className="container-xl">
          <div className="text-center mb-14">
            <div className="text-xs text-[#b8963e] tracking-widest mb-3 font-medium">WHAT WE OFFER</div>
            <h2 className="section-title">Custom Matcha Solutions</h2>
            <div className="gold-divider" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Tag,
                title: 'Private Label',
                desc: 'Your brand, your design. We manufacture to your specifications and apply your custom labels. Full confidentiality guaranteed.',
              },
              {
                icon: FlaskConical,
                title: 'Custom Grades & Blends',
                desc: 'Need a specific flavor profile, color intensity, or unique blend? We develop grades tailored to your product and target market.',
              },
              {
                icon: Globe,
                title: 'Bulk Sourcing & Export',
                desc: 'From a 1 kg tasting sample to a 10-ton container. We manage all export documentation and customs clearance for 50+ countries.',
              },
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

      {/* Why brands choose us */}
      <section className="section-padding bg-white">
        <div className="container-xl max-w-4xl">
          <div className="text-center mb-12">
            <div className="text-xs text-[#b8963e] tracking-widest mb-3 font-medium">WHY KUU</div>
            <h2 className="section-title">Why Brands Choose Us</h2>
            <div className="gold-divider" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              'Direct contracts with Uji (Kyoto) & Nishio (Aichi) farms',
              '15+ matcha grades across premium, standard, and organic lines',
              'Flexible MOQ — start from just 1 kg sample',
              'JAS Organic, EU Organic, HACCP, ISO 22000 available',
              'In-house QC and Certificate of Analysis (COA) on request',
              'Dedicated English-speaking account manager',
              'Fast turnaround: 5–7 business days for standard orders',
              'Competitive pricing with full transparency',
            ].map(point => (
              <div key={point} className="flex items-start gap-3 p-4 bg-[#faf8f3] border border-[#e8e0d0]">
                <CheckCircle size={16} className="text-[#2d5016] mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Flow */}
      <section className="section-padding bg-[#faf8f3]">
        <div className="container-lg max-w-4xl">
          <div className="text-center mb-14">
            <div className="text-xs text-[#b8963e] tracking-widest mb-3 font-medium">HOW IT WORKS</div>
            <h2 className="section-title">Your Brand Journey</h2>
            <div className="gold-divider" />
          </div>
          <div className="space-y-6">
            {steps.map((step) => (
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

      {/* Packaging Options */}
      <section className="section-padding bg-white">
        <div className="container-xl max-w-4xl">
          <div className="text-center mb-12">
            <div className="text-xs text-[#b8963e] tracking-widest mb-3 font-medium">PACKAGING</div>
            <h2 className="section-title">Packaging Options</h2>
            <div className="gold-divider" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { icon: Package, label: 'Tin Canister', sub: '30g / 50g / 100g' },
              { icon: Package, label: 'Stand-Up Pouch', sub: '50g / 100g / 250g' },
              { icon: Package, label: 'Kraft Bag', sub: '100g / 250g / 500g' },
              { icon: Package, label: 'Bulk Bag', sub: '1kg / 5kg / 10kg' },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="border border-gray-200 p-6 hover:border-[#2d5016] transition-colors">
                <Icon className="mx-auto text-[#2d5016] mb-3" size={28} />
                <div className="font-semibold text-[#1a3009] text-sm">{label}</div>
                <div className="text-xs text-gray-500 mt-1">{sub}</div>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500 mt-6">
            Custom sizes and shapes available upon request. Minimum order quantities apply.
          </p>
        </div>
      </section>

      {/* Certifications */}
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

      {/* CTA */}
      <section className="bg-[#1a3009] py-16 px-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
          Ready to Build Your Matcha Brand?
        </h2>
        <p className="text-green-200 mb-8 max-w-lg mx-auto">
          Start with a free sample. No commitment, no minimum until you&apos;re ready.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/sample-order" className="px-8 py-3 bg-white text-[#1a3009] font-bold hover:bg-green-50 transition-colors">
            Order Samples First
          </Link>
          <Link href="/quote" className="px-8 py-3 border-2 border-[#b8963e] text-[#b8963e] hover:bg-[#b8963e] hover:text-white transition-all font-bold">
            Start Your Private Label
          </Link>
        </div>
      </section>
    </>
  )
}
