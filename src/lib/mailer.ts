import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

const ADMIN_EMAIL = process.env.GMAIL_USER || 'maccha.kuu@gmail.com'
const SITE_NAME = 'Matcha OEM | KUU LLC'

// ────────────────────────────────────────────────
// お問い合わせ通知（管理者宛）
// ────────────────────────────────────────────────
export async function sendInquiryNotification(data: {
  inquiry_number: string
  company_name?: string
  contact_person: string
  country: string
  email: string
  phone?: string
  interested_product?: string
  desired_quantity?: string
  notes?: string
}) {
  const subject = `【新しいお問い合わせ】${data.inquiry_number} - ${data.contact_person} / ${data.country}`

  const html = `
<!DOCTYPE html>
<html lang="ja">
<head><meta charset="UTF-8"><style>
  body { font-family: 'Helvetica Neue', Arial, sans-serif; background: #f5f5f5; margin: 0; padding: 20px; }
  .container { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 4px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
  .header { background: #1a3009; color: #fff; padding: 24px 32px; }
  .header h1 { margin: 0; font-size: 20px; font-weight: bold; letter-spacing: 1px; }
  .header p { margin: 6px 0 0; color: #a8c97a; font-size: 13px; }
  .badge { display: inline-block; background: #b8963e; color: #fff; font-size: 12px; padding: 3px 10px; border-radius: 2px; margin-top: 8px; }
  .body { padding: 28px 32px; }
  .section-title { font-size: 12px; color: #b8963e; font-weight: bold; letter-spacing: 1px; text-transform: uppercase; margin: 20px 0 10px; border-bottom: 1px solid #e8e0d0; padding-bottom: 6px; }
  table { width: 100%; border-collapse: collapse; }
  td { padding: 8px 0; font-size: 14px; vertical-align: top; }
  td:first-child { color: #666; width: 38%; white-space: nowrap; }
  td:last-child { color: #1a1a1a; font-weight: 500; }
  .notes-box { background: #faf8f3; border-left: 3px solid #2d5016; padding: 12px 16px; font-size: 14px; color: #333; line-height: 1.7; margin-top: 6px; white-space: pre-wrap; }
  .footer { background: #f0ece4; padding: 16px 32px; font-size: 12px; color: #888; text-align: center; }
  .action-link { display: inline-block; margin-top: 20px; background: #2d5016; color: #fff; text-decoration: none; padding: 10px 24px; font-size: 14px; border-radius: 2px; }
</style></head>
<body>
<div class="container">
  <div class="header">
    <h1>🍵 新しいお問い合わせ</h1>
    <p>${SITE_NAME}</p>
    <span class="badge">${data.inquiry_number}</span>
  </div>
  <div class="body">
    <div class="section-title">お客様情報</div>
    <table>
      <tr><td>会社名</td><td>${data.company_name || '（未入力）'}</td></tr>
      <tr><td>担当者名</td><td>${data.contact_person}</td></tr>
      <tr><td>国・地域</td><td>${data.country}</td></tr>
      <tr><td>メールアドレス</td><td><a href="mailto:${data.email}">${data.email}</a></td></tr>
      <tr><td>電話 / WhatsApp</td><td>${data.phone || '（未入力）'}</td></tr>
    </table>

    <div class="section-title">お問い合わせ内容</div>
    <table>
      <tr><td>希望商品</td><td>${data.interested_product || '（未入力）'}</td></tr>
      <tr><td>希望数量</td><td>${data.desired_quantity || '（未入力）'}</td></tr>
    </table>

    ${data.notes ? `
    <div class="section-title">メッセージ</div>
    <div class="notes-box">${data.notes}</div>
    ` : ''}

    <div style="text-align:center; margin-top: 28px;">
      <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/inquiries" class="action-link">
        管理画面で確認する →
      </a>
    </div>
  </div>
  <div class="footer">
    このメールは ${SITE_NAME} のお問い合わせフォームから自動送信されました。<br>
    送信日時：${new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })} JST
  </div>
</div>
</body></html>
`

  await transporter.sendMail({
    from: `"${SITE_NAME}" <${ADMIN_EMAIL}>`,
    to: ADMIN_EMAIL,
    subject,
    html,
    replyTo: data.email,
  })
}

// ────────────────────────────────────────────────
// お客様への自動返信
// ────────────────────────────────────────────────
export async function sendInquiryAutoReply(data: {
  inquiry_number: string
  contact_person: string
  email: string
  company_name?: string
}) {
  const subject = `[${data.inquiry_number}] お問い合わせを受け付けました / Inquiry Received - Matcha OEM`

  const html = `
<!DOCTYPE html>
<html lang="ja">
<head><meta charset="UTF-8"><style>
  body { font-family: 'Helvetica Neue', Arial, sans-serif; background: #f5f5f5; margin: 0; padding: 20px; }
  .container { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 4px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
  .header { background: #1a3009; color: #fff; padding: 24px 32px; text-align: center; }
  .header h1 { margin: 0; font-size: 22px; }
  .header p { margin: 6px 0 0; color: #a8c97a; font-size: 13px; }
  .body { padding: 32px; line-height: 1.8; color: #333; font-size: 15px; }
  .highlight { background: #faf8f3; border: 1px solid #e8e0d0; padding: 16px 20px; margin: 20px 0; font-size: 14px; }
  .highlight strong { color: #1a3009; }
  .divider { border: none; border-top: 1px solid #e8e0d0; margin: 24px 0; }
  .en { color: #666; font-size: 13px; line-height: 1.7; }
  .footer { background: #1a3009; color: #a8c97a; padding: 20px 32px; font-size: 12px; text-align: center; }
  .footer a { color: #c9d8b3; }
</style></head>
<body>
<div class="container">
  <div class="header">
    <h1>🍵 MATCHA OEM</h1>
    <p>KUU LLC（合同会社KUU）</p>
  </div>
  <div class="body">
    <p>${data.contact_person} 様${data.company_name ? `<br><small style="color:#666">${data.company_name}</small>` : ''}</p>

    <p>この度はMatcha OEMへお問い合わせいただき、誠にありがとうございます。<br>
    以下の内容でお問い合わせを受け付けました。</p>

    <div class="highlight">
      <strong>受付番号：${data.inquiry_number}</strong><br>
      <small style="color:#888">このメールを保存しておくと、問い合わせ状況の確認に便利です。</small>
    </div>

    <p>内容を確認の上、<strong>1〜2営業日以内</strong>にご連絡いたします。<br>
    お急ぎの場合は下記へ直接ご連絡ください。</p>

    <ul style="font-size:14px; color:#444;">
      <li>📧 メール：<a href="mailto:maccha.kuu@gmail.com">maccha.kuu@gmail.com</a></li>
      <li>📞 電話：+81-52-990-2209</li>
    </ul>

    <hr class="divider">

    <p class="en">
      Dear ${data.contact_person},<br><br>
      Thank you for contacting Matcha OEM (KUU LLC). We have received your inquiry 
      <strong>${data.inquiry_number}</strong> and will respond within 1–2 business days.<br><br>
      For urgent matters, please contact us at <a href="mailto:maccha.kuu@gmail.com">maccha.kuu@gmail.com</a>.
    </p>
  </div>
  <div class="footer">
    KUU LLC（合同会社KUU）<br>
    〒461-0005 愛知県名古屋市東区東桜2-17-25 レジディア東桜Ⅱ 207<br>
    <a href="mailto:maccha.kuu@gmail.com">maccha.kuu@gmail.com</a> ｜ +81-52-990-2209<br><br>
    <a href="${process.env.NEXT_PUBLIC_SITE_URL}">www.matcha-oem.jp</a>
  </div>
</div>
</body></html>
`

  await transporter.sendMail({
    from: `"Matcha OEM | KUU LLC" <${ADMIN_EMAIL}>`,
    to: data.email,
    subject,
    html,
  })
}

// ────────────────────────────────────────────────
// 見積もり依頼通知（管理者宛）
// ────────────────────────────────────────────────
export async function sendQuoteNotification(data: {
  company_name?: string
  contact_person: string
  country?: string
  email: string
  phone?: string
  interested_product?: string
  desired_quantity?: string
  packaging_preference?: string
  target_market?: string
  delivery_schedule?: string
  notes?: string
}) {
  const subject = `【OEM見積依頼】${data.contact_person}${data.company_name ? ` / ${data.company_name}` : ''} (${data.country || '国不明'})`

  const html = `
<!DOCTYPE html>
<html lang="ja">
<head><meta charset="UTF-8"><style>
  body { font-family: 'Helvetica Neue', Arial, sans-serif; background: #f5f5f5; margin: 0; padding: 20px; }
  .container { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 4px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
  .header { background: #b8963e; color: #fff; padding: 24px 32px; }
  .header h1 { margin: 0; font-size: 20px; font-weight: bold; }
  .header p { margin: 6px 0 0; color: #f5e8c8; font-size: 13px; }
  .body { padding: 28px 32px; }
  .section-title { font-size: 12px; color: #b8963e; font-weight: bold; letter-spacing: 1px; text-transform: uppercase; margin: 20px 0 10px; border-bottom: 1px solid #e8e0d0; padding-bottom: 6px; }
  table { width: 100%; border-collapse: collapse; }
  td { padding: 8px 0; font-size: 14px; vertical-align: top; }
  td:first-child { color: #666; width: 40%; white-space: nowrap; }
  td:last-child { color: #1a1a1a; font-weight: 500; }
  .notes-box { background: #faf8f3; border-left: 3px solid #b8963e; padding: 12px 16px; font-size: 14px; color: #333; line-height: 1.7; margin-top: 6px; white-space: pre-wrap; }
  .footer { background: #f0ece4; padding: 16px 32px; font-size: 12px; color: #888; text-align: center; }
  .action-link { display: inline-block; margin-top: 20px; background: #b8963e; color: #fff; text-decoration: none; padding: 10px 24px; font-size: 14px; border-radius: 2px; }
</style></head>
<body>
<div class="container">
  <div class="header">
    <h1>📋 OEM見積依頼</h1>
    <p>${SITE_NAME}</p>
  </div>
  <div class="body">
    <div class="section-title">お客様情報</div>
    <table>
      <tr><td>会社名</td><td>${data.company_name || '（未入力）'}</td></tr>
      <tr><td>担当者名</td><td>${data.contact_person}</td></tr>
      <tr><td>国・地域</td><td>${data.country || '（未入力）'}</td></tr>
      <tr><td>メールアドレス</td><td><a href="mailto:${data.email}">${data.email}</a></td></tr>
      <tr><td>電話 / WhatsApp</td><td>${data.phone || '（未入力）'}</td></tr>
    </table>

    <div class="section-title">見積内容</div>
    <table>
      <tr><td>希望商品・グレード</td><td>${data.interested_product || '（未入力）'}</td></tr>
      <tr><td>希望数量</td><td>${data.desired_quantity || '（未入力）'}</td></tr>
      <tr><td>パッケージ希望</td><td>${data.packaging_preference || '（未入力）'}</td></tr>
      <tr><td>ターゲット市場</td><td>${data.target_market || '（未入力）'}</td></tr>
      <tr><td>納期希望</td><td>${data.delivery_schedule || '（未入力）'}</td></tr>
    </table>

    ${data.notes ? `
    <div class="section-title">備考・メッセージ</div>
    <div class="notes-box">${data.notes}</div>
    ` : ''}

    <div style="text-align:center; margin-top: 28px;">
      <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/inquiries" class="action-link">
        管理画面で確認する →
      </a>
    </div>
  </div>
  <div class="footer">
    このメールは ${SITE_NAME} のお問い合わせフォームから自動送信されました。<br>
    送信日時：${new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })} JST
  </div>
</div>
</body></html>
`

  await transporter.sendMail({
    from: `"${SITE_NAME}" <${ADMIN_EMAIL}>`,
    to: ADMIN_EMAIL,
    subject,
    html,
    replyTo: data.email,
  })
}

// ────────────────────────────────────────────────
// 見積依頼 お客様自動返信
// ────────────────────────────────────────────────
export async function sendQuoteAutoReply(data: {
  contact_person: string
  email: string
  company_name?: string
}) {
  const subject = `お見積もり依頼を受け付けました / OEM Quote Request Received - Matcha OEM`

  const html = `
<!DOCTYPE html>
<html lang="ja">
<head><meta charset="UTF-8"><style>
  body { font-family: 'Helvetica Neue', Arial, sans-serif; background: #f5f5f5; margin: 0; padding: 20px; }
  .container { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 4px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
  .header { background: #1a3009; color: #fff; padding: 24px 32px; text-align: center; }
  .header h1 { margin: 0; font-size: 22px; }
  .header p { margin: 6px 0 0; color: #a8c97a; font-size: 13px; }
  .body { padding: 32px; line-height: 1.8; color: #333; font-size: 15px; }
  .highlight { background: #fdf9f0; border: 1px solid #e8d8a0; padding: 16px 20px; margin: 20px 0; font-size: 14px; }
  .divider { border: none; border-top: 1px solid #e8e0d0; margin: 24px 0; }
  .en { color: #666; font-size: 13px; line-height: 1.7; }
  .footer { background: #1a3009; color: #a8c97a; padding: 20px 32px; font-size: 12px; text-align: center; }
  .footer a { color: #c9d8b3; }
</style></head>
<body>
<div class="container">
  <div class="header">
    <h1>🍵 MATCHA OEM</h1>
    <p>KUU LLC（合同会社KUU）</p>
  </div>
  <div class="body">
    <p>${data.contact_person} 様${data.company_name ? `<br><small style="color:#666">${data.company_name}</small>` : ''}</p>

    <p>OEM見積もりのご依頼をいただき、誠にありがとうございます。<br>
    内容を確認の上、<strong>2〜3営業日以内</strong>に詳細なお見積もりをお送りいたします。</p>

    <div class="highlight">
      ご不明な点は下記へお気軽にお問い合わせください：<br>
      📧 <a href="mailto:maccha.kuu@gmail.com">maccha.kuu@gmail.com</a><br>
      📞 +81-52-990-2209
    </div>

    <hr class="divider">

    <p class="en">
      Dear ${data.contact_person},<br><br>
      Thank you for submitting your OEM quote request. We have received your inquiry 
      and will prepare a detailed proposal within 2–3 business days.<br><br>
      Feel free to contact us at <a href="mailto:maccha.kuu@gmail.com">maccha.kuu@gmail.com</a> 
      for any questions.
    </p>
  </div>
  <div class="footer">
    KUU LLC（合同会社KUU）<br>
    〒461-0005 愛知県名古屋市東区東桜2-17-25 レジディア東桜Ⅱ 207<br>
    <a href="mailto:maccha.kuu@gmail.com">maccha.kuu@gmail.com</a> ｜ +81-52-990-2209
  </div>
</div>
</body></html>
`

  await transporter.sendMail({
    from: `"Matcha OEM | KUU LLC" <${ADMIN_EMAIL}>`,
    to: data.email,
    subject,
    html,
  })
}
