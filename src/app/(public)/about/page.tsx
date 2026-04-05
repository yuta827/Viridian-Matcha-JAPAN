import Link from 'next/link'
import { ArrowRight, Award, Leaf, Globe, Users, MapPin, Clock, Shield, Heart } from 'lucide-react'

export const metadata = {
  title: 'About Us - KUU LLC | Matcha OEM',
  description: '合同会社KUUは名古屋を拠点に、宇治・西尾の銘茶園と直接提携した抹茶OEM専門会社です。',
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5" style={{ fontFamily: 'var(--font-serif)' }}>
            日本の抹茶を、世界へ。
          </h1>
          <p className="text-green-200 max-w-2xl mx-auto text-lg leading-relaxed">
            Bringing Japan&apos;s finest matcha tradition to the global market —<br />
            directly from the tea gardens of Uji and Nishio.
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
                名古屋から世界へ届ける、<br />本物の抹茶
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                合同会社KUUは、愛知県名古屋市を拠点とする抹茶OEM専門会社です。
                世界有数の抹茶産地として名高い<strong>京都・宇治</strong>と
                <strong>愛知・西尾</strong>の老舗茶園と直接提携し、
                最高品質の抹茶をグローバルブランドへとお届けしています。
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                抹茶の国際的な需要が急速に高まる中、本物の日本産抹茶へのアクセスに
                課題を感じるブランドオーナーとの出会いが、KUUの原点です。
                「品質・信頼・スピード」を三本柱に、サンプル対応からコンテナスケールの
                大口OEM生産まで、あらゆるニーズに応えます。
              </p>
              <p className="text-gray-600 leading-relaxed">
                KUU（空）という社名には、抹茶が持つ「静けさ」と「無限の可能性」への
                敬意を込めています。禅の精神が宿る一杯のお茶が、世界中の人々の日常に
                溶け込む未来を目指しています。
              </p>
            </div>
            <div className="space-y-4">
              <div className="aspect-video overflow-hidden">
                <img
                  src="https://sspark.genspark.ai/cfimages?u1=cFX5eYsRUipc2W3IaCYxqpQU1FDW1MptDD8t3XGtyuQauoVtD5s7IRuYIFD3cYK5KFufPs%2BQwMnM4ADfJbHERCM3CMa5n5bRy7K6b88NSPhjDEFeR9U2U%2FHn%2FoOKQkjFdWompGnWaUpJzJ%2FC&u2=GF%2BrmhdNgFlx8lbE&width=2560"
                  alt="Nishio matcha tea farm, Aichi"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs text-gray-400 text-center">西尾市（愛知県）の抹茶茶園 — 日本有数の抹茶産地</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="overflow-hidden aspect-square">
                  <img
                    src="https://sspark.genspark.ai/cfimages?u1=5EK%2BkI22ppKn6j8f75zYmfNOIzUB1DZvb7aGTHX4q3XC0dcp6Gv0IYgr1kve16y4uBrKqncnfge2KeBXdHh9Tp44ea7%2FoZ%2FLIOwdz8jxxgJFVh2U9nsztalQiw%3D%3D&u2=tRtJK%2BTm4wXGjmWA&width=2560"
                    alt="Uji tea tradition Kyoto"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="overflow-hidden aspect-square">
                  <img
                    src="https://sspark.genspark.ai/cfimages?u1=5ecIzMWjaYSTXLozuyOa4DIO%2Ff24s2bwGQ1ULL5ZdpMjoQhXk6nsTBpOap1nXVUD5HT66YZcLY0w5McFWTuJP8MWXYdTxHRLlk0J6KpytQqtFDUSXYd6Y7ZUHDumG5U%3D&u2=Y6vxnJXNjkwavBLF&width=2560"
                    alt="Matcha production process Japan"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-400 text-center">宇治（京都府）の茶の湯文化 / 抹茶の石臼製造工程</p>
            </div>
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="py-16 bg-[#faf8f3] border-y border-[#e8e0d0]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Award, value: '15+', label: '抹茶グレード', sublabel: 'Matcha Grades' },
              { icon: Globe, value: '30+', label: '輸出対応国', sublabel: 'Export Countries' },
              { icon: Users, value: '100+', label: 'ブランド取引実績', sublabel: 'Brand Partners' },
              { icon: Leaf, value: '5+', label: '年の専門実績', sublabel: 'Years Experience' },
            ].map(({ icon: Icon, value, label, sublabel }) => (
              <div key={label} className="text-center p-6 bg-white border border-[#e8e0d0]">
                <Icon className="text-[#b8963e] mx-auto mb-3" size={26} />
                <div className="text-3xl font-bold text-[#1a3009]">{value}</div>
                <div className="text-sm font-medium text-gray-700 mt-1">{label}</div>
                <div className="text-xs text-gray-400">{sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Info & Sourcing */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

            {/* 会社情報 */}
            <div>
              <div className="text-xs text-[#b8963e] tracking-widest mb-3 font-medium">COMPANY INFO</div>
              <h2 className="text-2xl font-bold text-[#1a3009] mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
                会社概要
              </h2>
              <table className="w-full text-sm">
                <tbody className="divide-y divide-gray-100">
                  {[
                    ['会社名', '合同会社KUU（KUU LLC）'],
                    ['所在地', '〒461-0005\n愛知県名古屋市東区\n東桜2-17-25\nレジディア東桜Ⅱ 207'],
                    ['メール', 'maccha.kuu@gmail.com'],
                    ['電話', '052-990-2209'],
                    ['事業内容', '抹茶OEM製造・輸出\n国際取引コーディネート'],
                    ['取引銀行', '住信SBIネット銀行\n法人第一支店（0038-106）\n普通 3043430'],
                  ].map(([label, value]) => (
                    <tr key={label}>
                      <td className="py-3 pr-4 text-gray-400 text-xs align-top w-24 shrink-0">{label}</td>
                      <td className="py-3 text-gray-700 font-medium whitespace-pre-line text-sm">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 産地・品質 */}
            <div>
              <div className="text-xs text-[#b8963e] tracking-widest mb-3 font-medium">SOURCING & QUALITY</div>
              <h2 className="text-2xl font-bold text-[#1a3009] mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
                産地へのこだわり
              </h2>
              <div className="space-y-5">
                {[
                  {
                    title: '京都 宇治',
                    sub: 'Uji, Kyoto — 日本最古の銘茶産地',
                    desc: '600年以上の歴史を持つ抹茶発祥の地。独特の気候と霧が育む最高級の碾茶を使用した、フラッグシップグレードを提供。',
                    color: 'bg-green-50 border-green-200',
                    dot: 'bg-green-600',
                  },
                  {
                    title: '愛知 西尾',
                    sub: 'Nishio, Aichi — 全国シェア約20%の一大産地',
                    desc: '安定した品質と高い生産量を誇る西尾。コストパフォーマンスに優れたスタンダード・有機グレードを中心に幅広く対応。',
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
                    <span className="font-bold text-sm">品質管理・認証</span>
                  </div>
                  <ul className="text-sm text-green-200 space-y-1">
                    <li>✓ JAS有機認定（オーガニックライン）</li>
                    <li>✓ 農薬残留検査済み（EU基準対応可）</li>
                    <li>✓ HACCP準拠製造環境</li>
                    <li>✓ 第三者機関による成分分析書発行可</li>
                  </ul>
                </div>
              </div>
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
              KUUが大切にしていること
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Leaf,
                title: '本物志向',
                subtitle: 'Authenticity',
                desc: '産地・製法・グレードに嘘をつかない。原料から完成品まで、すべての工程でトレーサビリティを確保します。',
              },
              {
                icon: Heart,
                title: '誠実な対応',
                subtitle: 'Integrity',
                desc: '小口のサンプル注文も、大口OEM取引も、同じ誠意で向き合います。お客様の事業成功が私たちの使命です。',
              },
              {
                icon: Clock,
                title: 'スピードと信頼',
                subtitle: 'Speed & Trust',
                desc: '問い合わせから1〜2営業日以内に回答。サンプルは5〜7営業日で発送。スピードが信頼を生みます。',
              },
            ].map(item => (
              <div key={item.title} className="bg-white border border-[#e8e0d0] p-8 text-center">
                <div className="w-14 h-14 bg-[#1a3009] flex items-center justify-center mx-auto mb-5">
                  <item.icon className="text-[#b8963e]" size={24} />
                </div>
                <h3 className="text-lg font-bold text-[#1a3009] mb-1">{item.title}</h3>
                <div className="text-xs text-[#b8963e] tracking-widest mb-3">{item.subtitle}</div>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tea Ceremony Image */}
      <section className="relative h-80 overflow-hidden">
        <img
          src="https://sspark.genspark.ai/cfimages?u1=HlGFmy988btSW1%2Frl90h8DK%2FcFFMfBP19I7232Bkgu%2BxRHSRAfxhQvzl9USkWGPNmc%2Ft2JiprT2U7Jc3%2BBFKV1cq4RivBIy1VAlgY9oaJxpfKGMD%2FZ9TUD9aEx%2BjWXY%3D&u2=CrNqOdelGmcA6nuh&width=2560"
          alt="Tea ceremony Uji"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#1a3009]/70 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <p className="text-2xl md:text-3xl font-bold mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
              &quot;一期一会&quot;
            </p>
            <p className="text-green-200 text-sm max-w-md mx-auto">
              This moment, this encounter — will never come again.<br />
              Every cup of matcha deserves to be extraordinary.
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
              KUUをパートナーに選ぶ理由
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              '宇治・西尾の老舗茶園との直接契約で中間コストゼロ',
              'サンプル100gから対応 — まずは品質を確かめてから',
              'プライベートラベル・OEMパッケージに完全対応',
              'JAS有機・農薬残留検査書・成分分析書を発行可能',
              '英語・日本語のバイリンガル対応で海外取引もスムーズ',
              '1〜2営業日以内の迅速な見積もり回答',
              'ヨーロッパ・アメリカ向けEMS国際配送に精通',
              '少量からコンテナスケールまで柔軟なMOQ設定',
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
          <span className="text-sm">愛知県名古屋市 — Japan</span>
        </div>
        <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
          まずはサンプルを試してください
        </h2>
        <p className="text-green-200 mb-8 max-w-lg mx-auto">
          15種類以上のグレードから、貴社のブランドに最適な抹茶をお選びいただけます。
          サンプルは100g単位、EMS国際配送でお届けします。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/sample-order" className="px-8 py-3 bg-white text-[#1a3009] font-bold hover:bg-green-50 transition-colors inline-flex items-center gap-2">
            サンプルを注文する <ArrowRight size={16} />
          </Link>
          <Link href="/quote" className="px-8 py-3 border-2 border-[#b8963e] text-[#b8963e] hover:bg-[#b8963e] hover:text-white transition-all font-bold">
            OEM見積もりを依頼する
          </Link>
        </div>
      </section>
    </>
  )
}
