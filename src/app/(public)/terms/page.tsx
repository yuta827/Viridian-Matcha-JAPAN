export const metadata = {
  title: '特定商取引法に基づく表記 / Terms of Service - KUU Matcha',
  description: '合同会社KUUの特定商取引法に基づく表記ページです。',
}

export default function TermsPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="bg-[#1a3009] py-16 text-center px-6">
        <div className="text-xs text-[#b8963e] tracking-widest mb-3 font-semibold">LEGAL</div>
        <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'var(--font-serif)' }}>
          特定商取引法に基づく表記
        </h1>
        <p className="text-green-200 text-sm mt-2">Specified Commercial Transactions Act</p>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16">

        {/* 特定商取引法テーブル（日本語） */}
        <section className="mb-16">
          <h2 className="text-lg font-bold text-[#1a3009] border-b-2 border-[#2d5016] pb-2 mb-6">
            特定商取引法に基づく表記
          </h2>
          <table className="w-full text-sm border-collapse">
            <tbody>
              {[
                { label: '販売事業者', value: '合同会社KUU（KUU LLC）' },
                { label: '代表責任者', value: '山田 裕太' },
                {
                  label: '所在地',
                  value: '〒461-0005\n愛知県名古屋市東区東桜2-17-25\nレジディア東桜Ⅱ 207',
                },
                { label: '電話番号', value: '052-990-2209\n（受付時間：平日 10:00〜17:00 JST）' },
                { label: 'メールアドレス', value: 'maccha.kuu@gmail.com' },
                { label: 'ウェブサイト', value: 'https://viridian-matcha-japan.vercel.app' },
                {
                  label: '販売価格',
                  value: '各商品ページに表示された価格（米ドル表示）\nサンプル：$20〜$50 / 100g\nバルク：$220〜$740 / 1kg',
                },
                {
                  label: '商品代金以外の費用',
                  value: '国際送料（Japan Post / EMS・国際eパケットライト・国際小包）\n送料は注文時に国・重量に応じて自動計算されます。\n関税・輸入税は購入者様のご負担となります。',
                },
                {
                  label: 'お支払い方法',
                  value: '① PayPal（クレジットカード含む）\n② 銀行振込（住信SBIネット銀行）\n※ 振込先は注文確認メールにてご案内します。',
                },
                {
                  label: 'お支払い時期',
                  value: 'PayPal：注文時に即時決済\n銀行振込：注文確認メール受信後7日以内',
                },
                {
                  label: '商品の引渡し時期',
                  value: 'お支払い確認後、10営業日以内に発送いたします。\n発送後の配達日数はお届け先の国・地域により異なります。\n（目安：EMS 3〜7営業日、eパケットライト 7〜14営業日）',
                },
                {
                  label: '発送国',
                  value: '日本国内より発送（Japan Post 国際郵便）',
                },
                {
                  label: '返品・交換について',
                  value: '【返品不可】\n当サービスは海外向けB2B（企業間取引）のサンプル評価を目的としております。\n商品の性質上、お客様のご都合による返品・交換はお受けできません。\n\n【例外対応】\n商品の破損・品質不良・誤送品があった場合は、商品到着後5日以内にメール（maccha.kuu@gmail.com）にてご連絡ください。写真確認の上、再発送または返金対応いたします。\nその際の送料は当社が負担いたします。',
                },
                {
                  label: '動作環境',
                  value: '最新版のGoogle Chrome、Safari、Firefox、Microsoft Edgeを推奨します。',
                },
              ].map(({ label, value }) => (
                <tr key={label} className="border-b border-gray-100">
                  <td className="py-4 pr-6 font-semibold text-[#1a3009] align-top whitespace-nowrap w-40 bg-[#faf8f3] px-4">
                    {label}
                  </td>
                  <td className="py-4 pl-4 text-gray-700 align-top leading-relaxed" style={{ whiteSpace: 'pre-wrap' }}>
                    {value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* 英語版 Terms of Service */}
        <section className="border-t-2 border-[#e8e0d0] pt-12">
          <h2 className="text-lg font-bold text-[#1a3009] border-b-2 border-[#2d5016] pb-2 mb-6">
            Terms of Service <span className="text-sm font-normal text-gray-500">（English）</span>
          </h2>

          <p className="text-xs text-gray-400 mb-8">Last updated: April 2026</p>

          <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
            <div>
              <h3 className="font-bold text-[#1a3009] mb-2">1. Seller Information</h3>
              <p>
                KUU LLC (合同会社KUU)<br />
                2-17-25 Higashisakura, Higashi-ku, Nagoya, Aichi 461-0005, Japan<br />
                Email: maccha.kuu@gmail.com / Tel: +81-52-990-2209
              </p>
            </div>

            <div>
              <h3 className="font-bold text-[#1a3009] mb-2">2. Prices &amp; Fees</h3>
              <p>
                All prices are listed in USD on each product page. International shipping fees are calculated at checkout based on destination country and total weight. Import duties and taxes are the buyer's responsibility.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-[#1a3009] mb-2">3. Payment</h3>
              <p>
                We accept PayPal (including credit cards) and bank wire transfer. PayPal payments are charged at the time of order. Bank transfers must be completed within 7 days of order confirmation.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-[#1a3009] mb-2">4. Delivery</h3>
              <p>
                Orders are shipped from Japan via Japan Post within 10 business days after payment confirmation. Estimated delivery: EMS 3–7 business days, e-Packet Light 7–14 business days, depending on destination.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-[#1a3009] mb-2">5. Returns &amp; Refunds</h3>
              <p>
                <strong>All sales are final.</strong> Due to the B2B nature of our sample evaluation service, we do not accept returns or exchanges for change-of-mind reasons.
              </p>
              <p className="mt-2">
                <strong>Exceptions:</strong> If you receive a damaged, defective, or incorrect item, please contact us at maccha.kuu@gmail.com within 5 days of delivery with photos. We will arrange a replacement or full refund at our expense.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-[#1a3009] mb-2">6. Private Label &amp; OEM Services</h3>
              <p>
                Private label and OEM orders are subject to minimum order quantities (MOQ) as specified per product. Custom packaging artwork becomes the property of the client upon full payment. Our formulas and production methods remain our exclusive intellectual property.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-[#1a3009] mb-2">7. Limitation of Liability</h3>
              <p>
                Our maximum liability is limited to the amount paid for the specific order in question. We are not liable for indirect, consequential, or special damages.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-[#1a3009] mb-2">8. Contact</h3>
              <p>
                For any questions regarding these terms, please contact:<br />
                📧 maccha.kuu@gmail.com<br />
                📞 +81-52-990-2209 (Weekdays 10:00–17:00 JST)
              </p>
            </div>
          </div>
        </section>

        {/* 最終更新 */}
        <div className="mt-12 pt-6 border-t border-gray-100 text-xs text-gray-400 text-right">
          最終更新：2026年4月 / Last updated: April 2026
        </div>
      </div>
    </div>
  )
}
