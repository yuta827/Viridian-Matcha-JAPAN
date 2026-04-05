import Link from 'next/link'
import { ArrowRight, Award, Leaf, Globe, Users, MapPin, Clock, Shield, Heart } from 'lucide-react'

export const metadata = {
  title: 'About Us - KUU LLC | Japanese Matcha OEM',
  description: 'KUU LLC is a Japanese matcha OEM specialist based in Nagoya, partnering directly with renowned tea gardens in Uji (Kyoto) and Nishio (Aichi).',
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <div className="relative bg-[#1a3009] py-28 text-center px-6 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('https://sspark.genspark.ai/cfimages?u1=iPpClO2Z0sGZ4kV9fs9Z42NCahPdgDdJi3RxHyi6AyF5rX%2ByvVNCvtEni2VbLnW8gtC6EdCWq84boB63a5jnCKQXeoEPrgAB1gefEYn9itHeMisBe%2BaEbMIMDmH0N2cK&u2=PSAkBQvZ6v4p8wF%2F&width=2560')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative z-10">
          <div className="text-xs text-[#b8963e] tracking-widest mb-3">ABOUT KUU LLC</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
            From Japan&apos;s Finest Tea Gardens<br />to Your Brand
          </h1>
          <p className="text-[#b8963e] text-lg mb-5" style={{ fontFamily: 'var(--font-serif)' }}>
            日本の抹茶を、世界へ。
          </p>
          <p className="text-green-200 max-w-2xl mx-auto leading-relaxed">
            KUU LLC is a matcha OEM specialist headquartered in Nagoya, Japan —
            partnering directly with century-old tea gardens in Uji, Kyoto and Nishio, Aichi
            to bring authentic Japanese matcha to global brands.
          </p>
        </div>
      </div>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-xs text-[#b8963e] tracking-widest mb-3 font-medium">OUR STORY</div>
              <h2 className="text-3xl font-bold text-[#1a3009] mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
                Built on a Simple Belief:<br />Authenticity Matters
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                As the global demand for matcha surged, we saw a gap: brand owners worldwide
                were struggling to source <em>genuine</em> Japanese matcha — traceable, certified,
                and consistently high in quality. KUU LLC was founded to bridge exactly that gap.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Based in Nagoya — at the heart of Japan&apos;s tea country — we work directly with
                established tea gardens in <strong>Uji, Kyoto</strong> and <strong>Nishio, Aichi</strong>,
                the two most celebrated matcha-producing regions in Japan. No middlemen. No compromises.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our name, <strong>KUU（空）</strong>, means &quot;sky&quot; or &quot;void&quot; in Japanese —
                evoking the stillness of a tea ceremony and the boundless possibility of what matcha
                can become in the hands of a great brand.
              </p>
            </div>
            <div className="space-y-4">
              <div className="aspect-video overflow-hidden">
                <img
                  src="https://sspark.genspark.ai/cfimages?u1=cFX5eYsRUipc2W3IaCYxqpQU1FDW1MptDD8t3XGtyuQauoVtD5s7IRuYIFD3cYK5KFufPs%2BQwMnM4ADfJbHERCM3CMa5n5bRy7K6b88NSPhjDEFeR9U2U%2FHn%2FoOKQkjFdWompGnWaUpJzJ%2FC&u2=GF%2BrmhdNgFlx8lbE&width=2560"
                  alt="Nishio matcha tea farm, Aichi, Japan"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs text-gray-400 text-center">Nishio, Aichi — one of Japan&apos;s largest matcha-producing regions</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="overflow-hidden aspect-square">
                  <img
                    src="https://sspark.genspark.ai/cfimages?u1=5EK%2BkI22ppKn6j8f75zYmfNOIzUB1DZvb7aGTHX4q3XC0dcp6Gv0IYgr1kve16y4uBrKqncnfge2KeBXdHh9Tp44ea7%2FoZ%2FLIOwdz8jxxgJFVh2U9nsztalQiw%3D%3D&u2=tRtJK%2BTm4wXGjmWA&width=2560"
                    alt="Uji tea tradition, Kyoto"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="overflow-hidden aspect-square">
                  <img
                    src="https://sspark.genspark.ai/cfimages?u1=5ecIzMWjaYSTXLozuyOa4DIO%2Ff24s2bwGQ1ULL5ZdpMjoQhXk6nsTBpOap1nXVUD5HT66YZcLY0w5McFWTuJP8MWXYdTxHRLlk0J6KpytQqtFDUSXYd6Y7ZUHDumG5U%3D&u2=Y6vxnJXNjkwavBLF&width=2560"
                    alt="Matcha stone-grinding production process"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-400 text-center">Uji, Kyoto — birthplace of Japanese matcha / Stone-ground production</p>
            </div>
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="py-16 bg-[#faf8f3] border-y border-[#e8e0d0]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Award, value: '15+', label: 'Matcha Grades', sub: 'Premium to Standard' },
              { icon: Globe, value: '30+', label: 'Export Countries', sub: 'Europe · USA · Asia' },
              { icon: Users, value: '100+', label: 'Brand Partners', sub: 'Worldwide' },
              { icon: Leaf, value: '5+', label: 'Years Experience', sub: 'Matcha OEM Specialist' },
            ].map(({ icon: Icon, value, label, sub }) => (
              <div key={label} className="text-center p-6 bg-white border border-[#e8e0d0]">
                <Icon className="text-[#b8963e] mx-auto mb-3" size={26} />
                <div className="text-3xl font-bold text-[#1a3009]">{value}</div>
                <div className="text-sm font-medium text-gray-700 mt-1">{label}</div>
                <div className="text-xs text-gray-400">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sourcing & Company Info */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

            {/* Sourcing */}
            <div>
              <div className="text-xs text-[#b8963e] tracking-widest mb-3 font-medium">SOURCING & QUALITY</div>
              <h2 className="text-2xl font-bold text-[#1a3009] mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
                Direct from the Source
              </h2>
              <div className="space-y-5">
                {[
                  {
                    title: 'Uji, Kyoto',
                    sub: '宇治（京都） — Over 600 years of matcha heritage',
                    desc: 'The birthplace of Japanese matcha. Unique microclimate and morning mist produce the world\'s finest tencha leaves, used in our flagship ceremonial-grade products.',
                    color: 'bg-green-50 border-green-200',
                    dot: 'bg-green-600',
                  },
                  {
                    title: 'Nishio, Aichi',
                    sub: '西尾（愛知） — ~20% of Japan\'s total matcha output',
                    desc: 'Japan\'s largest single matcha-producing city. Consistent quality at scale makes Nishio ideal for our Standard and Organic lines, balancing performance and value.',
                    color: 'bg-amber-50 border-amber-200',
                    dot: 'bg-amber-600',
                  },
                ].map(item => (
                  <div key={item.title} className={`border p-5 ${item.color}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-2 h-2 rounded-full ${item.dot}`} />
                      <span className="font-bold text-[#1a3009]">{item.title}</span>
                    </div>
                    <div className="text-xs text-gray-500 mb-2">{item.sub}</div>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}

                <div className="bg-[#1a3009] text-white p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield size={16} className="text-[#b8963e]" />
                    <span className="font-bold text-sm">Certifications & Testing</span>
                  </div>
                  <ul className="text-sm text-green-200 space-y-1">
                    <li>✓ JAS Organic Certified (Organic line)</li>
                    <li>✓ Pesticide residue tested — EU standards compliant</li>
                    <li>✓ HACCP-compliant production facility</li>
                    <li>✓ Third-party lab reports available on request</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Company Info */}
            <div>
              <div className="text-xs text-[#b8963e] tracking-widest mb-3 font-medium">COMPANY INFO</div>
              <h2 className="text-2xl font-bold text-[#1a3009] mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
                About KUU LLC
              </h2>
              <table className="w-full text-sm">
                <tbody className="divide-y divide-gray-100">
                  {[
                    ['Company', 'KUU LLC\n（合同会社KUU）'],
                    ['Headquarters', '2-17-25 Higashisakura, Higashi-ku\nNagoya, Aichi 461-0005\nJapan'],
                    ['Email', 'maccha.kuu@gmail.com'],
                    ['Phone', '+81-52-990-2209'],
                    ['Business', 'Matcha OEM Manufacturing\n& International Trade'],
                    ['Bank', 'Sumishin SBI Net Bank\nCorp. Branch 1 (0038-106)\nOrd. 3043430 — KUU LLC'],
                  ].map(([label, value]) => (
                    <tr key={label}>
                      <td className="py-3 pr-4 text-gray-400 text-xs align-top w-28 shrink-0">{label}</td>
                      <td className="py-3 text-gray-700 font-medium whitespace-pre-line text-sm">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-[#faf8f3] border-t border-[#e8e0d0]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="text-xs text-[#b8963e] tracking-widest mb-3">OUR VALUES</div>
            <h2 className="text-3xl font-bold text-[#1a3009]" style={{ fontFamily: 'var(--font-serif)' }}>
              What We Stand For
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Leaf,
                en: 'Authenticity',
                jp: '本物志向',
                desc: 'No blends, no shortcuts. Every product is fully traceable — from the tea field to your packaging. We never compromise on origin or quality.',
              },
              {
                icon: Heart,
                en: 'Partnership',
                jp: '誠実な対応',
                desc: 'Whether you order a single 100g sample or a full container, you receive the same dedicated attention. Your brand\'s growth is our mission.',
              },
              {
                icon: Clock,
                en: 'Reliability',
                jp: 'スピードと信頼',
                desc: 'Quotes within 1–2 business days. Samples shipped within 5–7 days. We know that in business, speed and consistency build trust.',
              },
            ].map(item => (
              <div key={item.en} className="bg-white border border-[#e8e0d0] p-8 text-center">
                <div className="w-14 h-14 bg-[#1a3009] flex items-center justify-center mx-auto mb-5">
                  <item.icon className="text-[#b8963e]" size={24} />
                </div>
                <h3 className="text-lg font-bold text-[#1a3009] mb-1">{item.en}</h3>
                <div className="text-xs text-[#b8963e] tracking-widest mb-3">{item.jp}</div>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote image section */}
      <section className="relative h-80 overflow-hidden">
        <img
          src="https://sspark.genspark.ai/cfimages?u1=HlGFmy988btSW1%2Frl90h8DK%2FcFFMfBP19I7232Bkgu%2BxRHSRAfxhQvzl9USkWGPNmc%2Ft2JiprT2U7Jc3%2BBFKV1cq4RivBIy1VAlgY9oaJxpfKGMD%2FZ9TUD9aEx%2BjWXY%3D&u2=CrNqOdelGmcA6nuh&width=2560"
          alt="Tea ceremony, Uji"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#1a3009]/70 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <p className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
              &quot;一期一会&quot;
            </p>
            <p className="text-[#b8963e] text-sm tracking-widest mb-3">ICHI-GO ICHI-E</p>
            <p className="text-green-200 text-sm max-w-md mx-auto">
              &quot;One time, one meeting.&quot; — A Japanese philosophy that every encounter
              is unique and unrepeatable. We bring this spirit to every cup of matcha we supply.
            </p>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="text-xs text-[#b8963e] tracking-widest mb-3">WHY KUU LLC</div>
            <h2 className="text-3xl font-bold text-[#1a3009]" style={{ fontFamily: 'var(--font-serif)' }}>
              Why Brands Choose Us
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Direct contracts with Uji & Nishio tea gardens — no middlemen, lower cost',
              'Samples from 100g — test quality before any commitment',
              'Full private-label & custom OEM packaging capabilities',
              'JAS Organic, pesticide residue test reports, and lab certificates available',
              'Fully bilingual (English & Japanese) — seamless international communication',
              'Quotes and responses within 1–2 business days',
              'Experienced in EMS shipping to Europe & USA with full tracking',
              'Flexible MOQ — from small sample runs to container-scale orders',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-[#faf8f3] border border-[#e8e0d0]">
                <div className="w-6 h-6 bg-[#2d5016] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <ArrowRight size={12} className="text-white" />
                </div>
                <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1a3009] py-20 px-6 text-center">
        <div className="flex items-center justify-center gap-2 text-[#b8963e] mb-4">
          <MapPin size={16} />
          <span className="text-sm tracking-widest">NAGOYA, JAPAN</span>
        </div>
        <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
          Ready to Start?
        </h2>
        <p className="text-green-200 mb-8 max-w-lg mx-auto">
          Order samples from our full range of 15+ matcha grades.
          Experience the quality first — then let&apos;s build your brand together.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/sample-order" className="px-8 py-3 bg-white text-[#1a3009] font-bold hover:bg-green-50 transition-colors inline-flex items-center gap-2">
            Order Samples <ArrowRight size={16} />
          </Link>
          <Link href="/quote" className="px-8 py-3 border-2 border-[#b8963e] text-[#b8963e] hover:bg-[#b8963e] hover:text-white transition-all font-bold">
            Request OEM Quote
          </Link>
        </div>
      </section>
    </>
  )
}
