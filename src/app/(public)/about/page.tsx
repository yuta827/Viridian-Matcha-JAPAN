import Link from 'next/link'
import { ArrowRight, Award, Leaf, Globe, Users } from 'lucide-react'

export const metadata = { title: 'About Us - Matcha OEM' }

export default function AboutPage() {
  return (
    <>
      <div className="bg-[#1a3009] py-20 text-center px-6">
        <div className="text-xs text-[#b8963e] tracking-widest mb-3">ABOUT US</div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
          Our Story
        </h1>
        <p className="text-green-200 max-w-xl mx-auto">
          Bridging Japan&apos;s finest matcha tradition with global markets.
        </p>
      </div>

      <section className="section-padding bg-white">
        <div className="container-lg max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="text-xs text-[#b8963e] tracking-widest mb-3 font-medium">OUR MISSION</div>
              <h2 className="text-3xl font-bold text-[#1a3009] mb-5" style={{ fontFamily: 'var(--font-serif)' }}>
                Premium Matcha, Trusted Partnership
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We are a specialized matcha OEM company based in Japan, working directly with established tea gardens in Uji, Kyoto and Nishio, Aichi — the two most celebrated matcha producing regions in the world.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our mission is to help global brands access authentic, premium-quality Japanese matcha with full private-label and OEM capabilities, from single samples to container-scale production.
              </p>
            </div>
            <div className="aspect-square overflow-hidden">
              <img
                src="https://images.pexels.com/photos/8474061/pexels-photo-8474061.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Premium matcha powder"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              { icon: Award, value: '15+', label: 'Matcha Grades' },
              { icon: Globe, value: '50+', label: 'Export Countries' },
              { icon: Users, value: '200+', label: 'Brand Partners' },
              { icon: Leaf, value: '10+', label: 'Years Experience' },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="text-center p-6 border border-gray-200">
                <Icon className="text-[#2d5016] mx-auto mb-3" size={28} />
                <div className="text-3xl font-bold text-[#1a3009]">{value}</div>
                <div className="text-sm text-gray-500 mt-1">{label}</div>
              </div>
            ))}
          </div>

          <div className="bg-[#faf8f3] border border-[#e8e0d0] p-8 md:p-12">
            <h2 className="text-2xl font-bold text-[#1a3009] mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
              Why Partner With Us?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                'Direct sourcing from renowned tea gardens in Uji & Nishio',
                'Full OEM & private label capabilities',
                'Flexible MOQ — from samples to container orders',
                'Quality certificates: JAS Organic, ISO, HACCP available',
                'In-house quality control at every production stage',
                'Dedicated account manager for each partner brand',
                'Fast turnaround — samples shipped within 5-7 business days',
                'Competitive pricing with transparent cost structure',
              ].map(item => (
                <div key={item} className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-[#2d5016] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ArrowRight size={10} className="text-white" />
                  </div>
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#1a3009] py-16 px-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
          Start Your OEM Partnership
        </h2>
        <p className="text-green-200 mb-8">Order samples first — experience the quality before committing.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/sample-order" className="px-8 py-3 bg-white text-[#1a3009] font-bold hover:bg-green-50 transition-colors">
            Order Samples
          </Link>
          <Link href="/quote" className="px-8 py-3 border-2 border-[#b8963e] text-[#b8963e] hover:bg-[#b8963e] hover:text-white transition-all font-bold">
            Request Quote
          </Link>
        </div>
      </section>
    </>
  )
}
