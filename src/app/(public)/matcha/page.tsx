import Link from 'next/link'
import { Leaf, ArrowRight } from 'lucide-react'

export const metadata = { title: 'About Matcha - KUU Matcha' }

export default function MatchaPage() {
  return (
    <>
      <div className="bg-[#1a3009] py-20 text-center px-6">
        <div className="text-xs text-[#b8963e] tracking-widest mb-3">JAPANESE MATCHA</div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
          The Art of Japanese Matcha
        </h1>
        <p className="text-green-200 max-w-xl mx-auto">
          Understanding the origins, grades, and quality standards that make Japanese matcha exceptional.
        </p>
      </div>

      <section className="section-padding bg-white">
        <div className="container-lg max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <div className="text-xs text-[#b8963e] tracking-widest mb-3 font-medium">ORIGIN</div>
              <h2 className="text-2xl font-bold text-[#1a3009] mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
                Uji, Kyoto & Nishio, Aichi
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our matcha is sourced exclusively from two of Japan&apos;s most prestigious tea-growing regions: Uji in Kyoto Prefecture and Nishio in Aichi Prefecture — both with centuries of tea cultivation heritage.
              </p>
              <p className="text-gray-600 leading-relaxed">
                The unique climate, soil composition, and traditional cultivation methods of these regions produce matcha with unparalleled flavor complexity, vibrant green color, and consistent quality.
              </p>
            </div>
            <div className="bg-[#faf8f3] flex items-center justify-center aspect-[4/3]">
              <Leaf className="text-[#2d5016]/20" size={80} />
            </div>
          </div>

          <div className="mb-16">
            <div className="text-xs text-[#b8963e] tracking-widest mb-3 font-medium">GRADE GUIDE</div>
            <h2 className="text-2xl font-bold text-[#1a3009] mb-8" style={{ fontFamily: 'var(--font-serif)' }}>
              Understanding Matcha Grades
            </h2>
            <div className="space-y-4">
              {[
                {
                  grade: 'Ceremonial Grade', color: 'border-l-[#1a3009]',
                  desc: 'The highest quality matcha, made from the youngest leaves. Vibrant emerald green, naturally sweet, minimal bitterness. Used in traditional Japanese tea ceremony (chado).',
                  use: 'Tea ceremony, premium beverages, high-end cafes',
                },
                {
                  grade: 'Premium Grade', color: 'border-l-[#2d5016]',
                  desc: 'Excellent balance of quality and versatility. Bright green, smooth taste with light umami. Perfect for lattes, smoothies, and health-conscious consumers.',
                  use: 'Matcha lattes, specialty coffee shops, wellness brands',
                },
                {
                  grade: 'Culinary Grade', color: 'border-l-[#4a7c28]',
                  desc: 'Robust flavor profile with slight bitterness. Holds up well when mixed with other ingredients. The standard choice for food & beverage manufacturing.',
                  use: 'Ice cream, baked goods, beverages, confectionery',
                },
                {
                  grade: 'Food Industry Grade', color: 'border-l-[#b8963e]',
                  desc: 'Cost-effective grade for large-scale production. Consistent quality for industrial applications. Available in bulk quantities.',
                  use: 'Mass-produced beverages, supplements, industrial food',
                },
                {
                  grade: 'Organic Grade', color: 'border-l-[#b8963e]',
                  desc: 'All grades available in organic certified varieties (JAS, EU Organic). Grown without synthetic pesticides or fertilizers for premium health-conscious markets.',
                  use: 'Health food brands, organic cafes, wellness products',
                },
              ].map(item => (
                <div key={item.grade} className={`border-l-4 ${item.color} pl-6 py-4 bg-[#faf8f3]`}>
                  <h3 className="font-bold text-[#1a3009] text-lg mb-2">{item.grade}</h3>
                  <p className="text-sm text-gray-600 mb-2">{item.desc}</p>
                  <div className="text-xs text-[#b8963e] font-medium">Best for: {item.use}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#1a3009] text-white p-8 text-center">
            <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              Experience the Difference
            </h2>
            <p className="text-green-200 mb-8">Order samples and discover which grade suits your brand perfectly.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products" className="px-8 py-3 border border-white text-white hover:bg-white hover:text-[#1a3009] transition-all">
                View All Products
              </Link>
              <Link href="/sample-order" className="px-8 py-3 bg-[#b8963e] text-white hover:bg-[#d4af6a] transition-all font-bold flex items-center gap-2">
                Order Samples <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
