import Link from 'next/link'
import { ArrowRight, Leaf, Award, Sprout, Coffee } from 'lucide-react'

export const metadata = {
  title: 'About Our Matcha & Hojicha - KUU Matcha',
  description: 'Discover our premium Japanese matcha and hojicha lineup: 3 Premium grades, 4 Organic grades, and 3 Hojicha grades — all from Uji, Kyoto.',
}

const products = [
  // Premium
  {
    line: 'Premium',
    lineColor: 'bg-[#1a3009] text-white',
    barColor: 'border-l-[#2d5016]',
    icon: '🏆',
    items: [
      { name: '極 / Kiwami', price: '$50 / 100g · $740 / 1kg', desc: '一番茶の中でも最高品質の葉のみを使用。深い旨味と鮮やかな翠緑色。茶道・最高級カフェ向け。', descEn: 'Only the finest first-flush leaves. Deep umami, vibrant emerald. For tea ceremony & ultra-premium cafes.' },
      { name: '雅 / Miyabi', price: '$40 / 100g · $620 / 1kg', desc: '上品な甘みと滑らかな口当たり。スペシャルティカフェや高級ラテに最適。', descEn: 'Elegant sweetness and smooth finish. Ideal for specialty cafes and premium lattes.' },
      { name: '翠 / Midori', price: '$30 / 100g · $450 / 1kg', desc: '華やかな香りと適度な渋み。汎用性が高く、様々な飲料・スイーツに対応。', descEn: 'Bright aroma with balanced astringency. Versatile for beverages and confectionery.' },
    ],
  },
  // Organic
  {
    line: 'Organic',
    lineColor: 'bg-amber-700 text-white',
    barColor: 'border-l-amber-700',
    icon: '🌿',
    items: [
      { name: '凛 / Rin', price: '$40 / 100g · $620 / 1kg', desc: '有機JAS認証取得。クリアな旨味と透明感のある緑色。オーガニックブランドのフラッグシップに。', descEn: 'JAS Organic certified. Clear umami, transparent green. Flagship for organic brands.' },
      { name: '澄 / Sumi', price: '$38 / 100g · $580 / 1kg', desc: '澄んだ味わいと爽やかな後味。ラテ・スムージー・ウェルネス商品に。', descEn: 'Clear taste with a refreshing finish. For lattes, smoothies & wellness products.' },
      { name: '紬 / Tsumugi', price: '$38 / 100g · $580 / 1kg', desc: 'まろやかな風味で飲みやすい。デイリー向けオーガニック抹茶として人気。', descEn: 'Mild and approachable. Popular for everyday organic matcha.' },
      { name: '結 / Yui', price: '$35 / 100g · $480 / 1kg', desc: 'コストパフォーマンスに優れた有機グレード。製菓・製造業向けにも対応。', descEn: 'Best-value organic grade. Suitable for food manufacturing and confectionery.' },
    ],
  },
  // Hojicha
  {
    line: 'Hojicha',
    lineColor: 'bg-orange-700 text-white',
    barColor: 'border-l-orange-700',
    icon: '☕',
    items: [
      { name: '焙 / Hou', price: '$25 / 100g · $300 / 1kg', desc: '深煎りによる豊かな焙じ香と甘い余韻。ほうじ茶ラテ・製菓に最適。', descEn: 'Rich roasted aroma with a sweet finish. Best for hojicha lattes and baking.' },
      { name: '薫 / Kaoru', price: '$20 / 100g · $220 / 1kg', desc: '香り高く飲みやすいほうじ茶。幅広い用途に対応するスタンダードグレード。', descEn: 'Fragrant and easy-drinking. Versatile standard hojicha grade.' },
      { name: '燈 / Tomori', price: '$20 / 100g · $220 / 1kg', desc: '温かみのある焙煎香。食品製造・飲料開発向けのコスパグレード。', descEn: 'Warm roasted aroma. Cost-effective for food & beverage manufacturing.' },
    ],
  },
]

export default function MatchaPage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-[#1a3009] py-20 text-center px-6">
        <div className="text-xs text-[#b8963e] tracking-widest mb-3 font-semibold">OUR LINEUP</div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
          Matcha &amp; Hojicha
        </h1>
        <p className="text-green-200 max-w-xl mx-auto text-base leading-relaxed">
          3 Premium · 4 Organic · 3 Hojicha<br />
          すべて京都宇治産・有機JAS認証対応
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
          <span className="bg-white/10 border border-white/20 text-white/80 px-4 py-1.5 rounded-full">🏆 Premium Matcha</span>
          <span className="bg-white/10 border border-white/20 text-white/80 px-4 py-1.5 rounded-full">🌿 Organic Matcha</span>
          <span className="bg-white/10 border border-white/20 text-white/80 px-4 py-1.5 rounded-full">☕ Hojicha (Roasted)</span>
        </div>
      </div>

      {/* Origin */}
      <section className="bg-[#faf8f3] border-b border-[#e8e0d0] py-12 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="text-xs text-[#b8963e] tracking-widest mb-3 font-semibold">ORIGIN</div>
            <h2 className="text-2xl font-bold text-[#1a3009] mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              Uji, Kyoto — 京都府宇治市
            </h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              日本最高峰の茶産地・京都宇治から、厳選した茶葉のみを使用しています。
              数百年の栽培の歴史、独自の気候・土壌、伝統的な製法が
              世界に誇る品質を生み出しています。
            </p>
            <p className="text-gray-500 text-sm leading-relaxed">
              Sourced exclusively from Uji, Kyoto — one of Japan's most prestigious tea-growing regions with centuries of cultivation heritage. Our teas deliver unparalleled flavor, vibrant color, and consistent quality.
            </p>
          </div>
          <div className="bg-[#f0ece4] border border-[#e8e0d0] p-8 rounded-sm text-center space-y-4">
            {[
              { icon: '🍃', title: '一番茶使用', sub: 'First-flush leaves only' },
              { icon: '✅', title: '有機JAS認証対応', sub: 'JAS & EU Organic available' },
              { icon: '🌡️', title: '石臼挽き', sub: 'Stone-ground fine powder' },
            ].map(item => (
              <div key={item.title} className="flex items-center gap-4 text-left">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <div className="font-bold text-[#1a3009] text-sm">{item.title}</div>
                  <div className="text-xs text-gray-500">{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Lines */}
      <section className="section-padding bg-white">
        <div className="container-lg max-w-5xl space-y-16">

          {products.map(line => (
            <div key={line.line}>
              {/* Line Header */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{line.icon}</span>
                <div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-sm ${line.lineColor}`}>{line.line.toUpperCase()}</span>
                  <h2 className="text-xl font-bold text-[#1a3009] mt-1" style={{ fontFamily: 'var(--font-serif)' }}>
                    {line.line} Line
                  </h2>
                </div>
              </div>

              {/* Products */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {line.items.map(item => (
                  <div key={item.name} className={`border-l-4 ${line.barColor} bg-[#faf8f3] p-5`}>
                    <h3 className="text-lg font-bold text-[#1a3009] mb-1" style={{ fontFamily: 'var(--font-serif)' }}>
                      {item.name}
                    </h3>
                    <div className="text-xs text-[#b8963e] font-semibold mb-3">{item.price} <span className="text-gray-400 font-normal">+ shipping</span></div>
                    <p className="text-xs text-gray-600 leading-relaxed mb-2">{item.desc}</p>
                    <p className="text-xs text-gray-400 leading-relaxed italic">{item.descEn}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Grade Guide */}
      <section className="bg-[#faf8f3] border-t border-[#e8e0d0] py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-xs text-[#b8963e] tracking-widest mb-3 font-semibold text-center">GRADE GUIDE</div>
          <h2 className="text-2xl font-bold text-[#1a3009] mb-8 text-center" style={{ fontFamily: 'var(--font-serif)' }}>
            グレードの選び方 / How to Choose
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: '🏆',
                title: 'Ceremonial / 茶道向け',
                color: 'border-[#2d5016]',
                desc: '茶道・最高級カフェ・プレミアムギフト向け。最も深い旨味と鮮やかな緑色。',
                rec: '推奨: 極 / Kiwami、雅 / Miyabi',
              },
              {
                icon: '☕',
                title: 'Café & Latte / カフェ向け',
                color: 'border-amber-600',
                desc: 'ラテ・スムージー・スペシャルティコーヒーショップ向け。バランスの良い風味と扱いやすさ。',
                rec: '推奨: 翠 / Midori、凛 / Rin、澄 / Sumi',
              },
              {
                icon: '🏭',
                title: 'Food Mfg. / 製造業向け',
                color: 'border-orange-600',
                desc: '製菓・飲料製造・サプリ向け。コスト効率が高く安定品質。',
                rec: '推奨: 紬 / Tsumugi、結 / Yui、薫 / Kaoru、燈 / Tomori',
              },
            ].map(item => (
              <div key={item.title} className={`border-l-4 ${item.color} bg-white p-5`}>
                <div className="text-2xl mb-2">{item.icon}</div>
                <h3 className="font-bold text-[#1a3009] text-sm mb-2">{item.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed mb-3">{item.desc}</p>
                <div className="text-xs text-[#b8963e] font-semibold">{item.rec}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1a3009] py-16 px-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
          まずはサンプルでご確認ください
        </h2>
        <p className="text-green-200 mb-8 max-w-lg mx-auto text-sm">
          全グレード100gサンプルよりご注文いただけます。<br />
          品質をご確認の上、バルク・プライベートラベルのご相談へ。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/products" className="px-8 py-3 border border-white text-white hover:bg-white hover:text-[#1a3009] transition-all font-semibold flex items-center justify-center gap-2">
            <Leaf size={16} />
            全商品を見る
          </Link>
          <Link href="/sample-order" className="px-8 py-3 bg-[#b8963e] text-white hover:bg-[#d4af6a] transition-all font-bold flex items-center justify-center gap-2">
            サンプルを注文する <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  )
}
