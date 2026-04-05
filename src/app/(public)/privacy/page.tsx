export const metadata = {
  title: 'プライバシーポリシー / Privacy Policy - KUU Matcha | KUU LLC',
}

export default function PrivacyPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="bg-[#1a3009] py-16 text-center px-6">
        <div className="text-xs text-[#b8963e] tracking-widest mb-3">LEGAL</div>
        <h1 className="text-3xl font-bold text-white" style={{ fontFamily: 'var(--font-serif)' }}>
          プライバシーポリシー
        </h1>
        <p className="text-green-300 mt-2 text-sm">Privacy Policy</p>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16">
        <p className="text-sm text-gray-400 mb-10 border-b border-gray-100 pb-6">
          制定日：2024年1月1日　／　最終改定日：2026年4月1日<br />
          <span className="text-xs">Last updated: April 1, 2026</span>
        </p>

        <div className="space-y-10 text-gray-700 leading-relaxed">

          {/* 前文 */}
          <section>
            <p>
              合同会社KUU（以下「当社」）は、お客様の個人情報の保護を重要な責務と考え、
              個人情報の保護に関する法律（個人情報保護法）およびその他の関連法令を遵守し、
              以下のプライバシーポリシー（以下「本ポリシー」）に従って個人情報を適切に取り扱います。
            </p>
            <p className="mt-3 text-sm text-gray-500 italic">
              KUU LLC (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your personal information
              in accordance with the Act on the Protection of Personal Information (Japan) and other applicable laws.
            </p>
          </section>

          {/* 1. 事業者情報 */}
          <section>
            <h2 className="text-lg font-bold text-[#1a3009] border-b border-[#e8e0d0] pb-2 mb-4">
              第1条（事業者情報）
            </h2>
            <table className="w-full text-sm border-collapse">
              <tbody>
                {[
                  ['会社名', '合同会社KUU（KUU LLC）'],
                  ['所在地', '〒461-0005　愛知県名古屋市東区東桜2-17-25　レジディア東桜Ⅱ 207'],
                  ['代表者', '代表社員'],
                  ['メール', 'maccha.kuu@gmail.com'],
                  ['電話番号', '052-990-2209'],
                  ['事業内容', '抹茶プライベートラベル・輸出入・国際取引'],
                ].map(([label, value]) => (
                  <tr key={label} className="border-b border-gray-100">
                    <td className="py-2.5 pr-4 text-gray-500 w-32 shrink-0">{label}</td>
                    <td className="py-2.5 font-medium">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* 2. 収集する個人情報 */}
          <section>
            <h2 className="text-lg font-bold text-[#1a3009] border-b border-[#e8e0d0] pb-2 mb-4">
              第2条（収集する個人情報の種類）
            </h2>
            <p>当社は、以下の個人情報を収集する場合があります。</p>
            <ul className="mt-3 space-y-1.5 text-sm list-disc list-inside marker:text-[#2d5016]">
              <li>氏名・担当者名</li>
              <li>会社名・所属組織名</li>
              <li>メールアドレス</li>
              <li>電話番号・WhatsApp番号</li>
              <li>住所・配送先住所（サンプル注文時）</li>
              <li>国・地域</li>
              <li>お問い合わせ内容・ご要望</li>
              <li>注文情報（商品・数量・金額）</li>
              <li>当サイトへのアクセスログ（IPアドレス、ブラウザ情報など）</li>
            </ul>
          </section>

          {/* 3. 利用目的 */}
          <section>
            <h2 className="text-lg font-bold text-[#1a3009] border-b border-[#e8e0d0] pb-2 mb-4">
              第3条（個人情報の利用目的）
            </h2>
            <p>当社は、収集した個人情報を以下の目的のために利用します。</p>
            <ul className="mt-3 space-y-1.5 text-sm list-disc list-inside marker:text-[#2d5016]">
              <li>お問い合わせ・見積依頼・サンプル注文への対応</li>
              <li>商品の発送・配送状況の連絡</li>
              <li>プライベートラベル・カスタム注文に関する提案・見積書の送付</li>
              <li>請求書・領収書などの発行</li>
              <li>当社サービスに関するご案内・情報提供</li>
              <li>サービス改善のための統計分析（個人を特定しない形式）</li>
              <li>法令に基づく対応</li>
            </ul>
          </section>

          {/* 4. 第三者提供 */}
          <section>
            <h2 className="text-lg font-bold text-[#1a3009] border-b border-[#e8e0d0] pb-2 mb-4">
              第4条（第三者への提供）
            </h2>
            <p>
              当社は、以下の場合を除き、お客様の個人情報を第三者に提供・開示・売却しません。
            </p>
            <ul className="mt-3 space-y-1.5 text-sm list-disc list-inside marker:text-[#2d5016]">
              <li>お客様本人の同意がある場合</li>
              <li>法令に基づき開示が必要な場合</li>
              <li>人の生命・身体・財産の保護のために必要な場合</li>
              <li>業務委託先（配送会社・決済サービス等）に対し、必要最小限の情報を提供する場合（守秘義務契約を締結）</li>
            </ul>
            <div className="mt-4 bg-[#faf8f3] border border-[#e8e0d0] p-4 text-sm">
              <p className="font-medium text-[#1a3009] mb-2">利用している外部サービス</p>
              <ul className="space-y-1 text-gray-600">
                <li>・<strong>Supabase</strong>（データベース・認証）— 米国</li>
                <li>・<strong>PayPal</strong>（決済処理）— 米国</li>
                <li>・<strong>Google Gmail</strong>（メール送信）— 米国</li>
                <li>・<strong>日本郵便 / EMS</strong>（国際配送）— 日本</li>
              </ul>
            </div>
          </section>

          {/* 5. 安全管理 */}
          <section>
            <h2 className="text-lg font-bold text-[#1a3009] border-b border-[#e8e0d0] pb-2 mb-4">
              第5条（安全管理措置）
            </h2>
            <p>
              当社は、個人情報の紛失・破損・改ざん・不正アクセス・漏洩等を防止するため、
              SSL/TLS暗号化通信、アクセス制限、パスワード管理等の技術的・組織的安全管理措置を講じています。
            </p>
          </section>

          {/* 6. 保存期間 */}
          <section>
            <h2 className="text-lg font-bold text-[#1a3009] border-b border-[#e8e0d0] pb-2 mb-4">
              第6条（個人情報の保存期間）
            </h2>
            <p>
              当社は、利用目的達成後、法令で定められた保存義務期間を超えない範囲で個人情報を保存します。
              取引関連の記録は、商取引法および税法の定めに従い原則7年間保存します。
              それ以外の問い合わせデータは、最終連絡から3年後を目安に削除します。
            </p>
          </section>

          {/* 7. 開示・訂正・削除 */}
          <section>
            <h2 className="text-lg font-bold text-[#1a3009] border-b border-[#e8e0d0] pb-2 mb-4">
              第7条（個人情報の開示・訂正・削除の請求）
            </h2>
            <p>
              お客様は、当社が保有するご自身の個人情報について、開示・訂正・追加・削除・
              利用停止・消去・第三者提供の停止を請求する権利を有します。
              ご請求の際は、下記お問い合わせ先までご連絡ください。
              本人確認後、合理的な期間内に対応いたします。
            </p>
          </section>

          {/* 8. Cookie */}
          <section>
            <h2 className="text-lg font-bold text-[#1a3009] border-b border-[#e8e0d0] pb-2 mb-4">
              第8条（Cookieおよびアクセス解析）
            </h2>
            <p>
              当サイトでは、ユーザー体験の向上およびサービス改善を目的として、
              Cookieおよびアクセス解析ツールを使用する場合があります。
              これらのツールは、個人を特定しない形式でアクセス情報を収集します。
              ブラウザの設定によりCookieを無効にすることができますが、
              一部機能が利用できなくなる場合があります。
            </p>
          </section>

          {/* 9. 海外への移転 */}
          <section>
            <h2 className="text-lg font-bold text-[#1a3009] border-b border-[#e8e0d0] pb-2 mb-4">
              第9条（外国への個人情報の提供）
            </h2>
            <p>
              当社は、業務上の必要性から、日本国外（主に米国）にある事業者のサービスを利用しています。
              これらの事業者に対して個人情報を提供する場合があります。
              詳細は第4条の「利用している外部サービス」をご参照ください。
              各サービスの個人情報保護方針については、各社のウェブサイトをご確認ください。
            </p>
          </section>

          {/* 10. 改定 */}
          <section>
            <h2 className="text-lg font-bold text-[#1a3009] border-b border-[#e8e0d0] pb-2 mb-4">
              第10条（プライバシーポリシーの変更）
            </h2>
            <p>
              当社は、法令の改正や業務内容の変更に伴い、本ポリシーを予告なく改定する場合があります。
              重要な変更の場合はウェブサイト上でお知らせします。
              改定後のポリシーは、当ページに掲載した時点から効力を生じるものとします。
            </p>
          </section>

          {/* 11. お問い合わせ */}
          <section>
            <h2 className="text-lg font-bold text-[#1a3009] border-b border-[#e8e0d0] pb-2 mb-4">
              第11条（お問い合わせ窓口）
            </h2>
            <p>本ポリシーに関するご質問・個人情報に関するご請求は、下記までご連絡ください。</p>
            <div className="mt-4 bg-[#faf8f3] border border-[#e8e0d0] p-5 text-sm space-y-2">
              <p className="font-bold text-[#1a3009]">合同会社KUU（KUU LLC）　個人情報取扱窓口</p>
              <p>〒461-0005　愛知県名古屋市東区東桜2-17-25　レジディア東桜Ⅱ 207</p>
              <p>Email：<a href="mailto:maccha.kuu@gmail.com" className="text-[#2d5016] underline">maccha.kuu@gmail.com</a></p>
              <p>TEL：052-990-2209</p>
              <p className="text-gray-500 text-xs pt-1">受付時間：平日10:00〜17:00（日本時間）</p>
            </div>
          </section>

          <div className="text-right text-sm text-gray-400 pt-4 border-t border-gray-100">
            合同会社KUU（KUU LLC）<br />
            制定：2024年1月1日　改定：2026年4月1日
          </div>
        </div>
      </div>
    </div>
  )
}
