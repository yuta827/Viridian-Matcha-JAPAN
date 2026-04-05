const https = require('https');

const SUPABASE_URL = 'ynbppzqonxglslhhuawe.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InluYnBwenFvbnhnbHNsaGh1YXdlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTI4MDcwOCwiZXhwIjoyMDkwODU2NzA4fQ.O1YK1V358vFQv55VWxgcOZuWRq3Exm8krcRLBx9HRgs';

function request(path, method, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const options = {
      hostname: SUPABASE_URL,
      path,
      method,
      headers: {
        'Content-Type': 'application/json',
        'apikey': SERVICE_KEY,
        'Authorization': `Bearer ${SERVICE_KEY}`,
        'Prefer': 'return=representation'
      }
    };
    if (data) options.headers['Content-Length'] = Buffer.byteLength(data);

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        console.log(`${method} ${path}: ${res.statusCode}`);
        resolve({ status: res.statusCode, body: JSON.parse(body || '[]') });
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

async function insert(table, rows) {
  // Insert one by one to avoid "All object keys must match" error
  let successCount = 0;
  for (const row of rows) {
    const res = await request(`/rest/v1/${table}`, 'POST', row);
    if (res.status >= 300) {
      console.error(`Error inserting row into ${table}:`, JSON.stringify(res.body).substring(0, 200));
    } else {
      successCount++;
    }
  }
  return { body: { length: successCount } };
}

async function main() {
  console.log('Seeding database...\n');

  // Products
  const products = [
    // Premium line (7 grades)
    { name: 'プレミアム抹茶 A1', name_en: 'Premium Matcha A1 Ceremonial', slug: 'premium-a1', line: 'premium', grade: 'A1', grade_label: '最上位セレモニアルグレード', grade_label_en: 'Supreme Ceremonial Grade', description: '最高品質の一番茶のみを使用。鮮やかな翠緑色と豊かな旨味が特徴。', description_en: 'Made from the finest first-flush leaves. Vibrant emerald color with rich umami flavor.', moq: 1, sample_price_usd: 45.00, inquiry_type: 'both', is_recommended: true, is_visible: true, sort_order: 1, usage_suggestions: '茶道、プレミアム抹茶ラテ', usage_suggestions_en: 'Tea ceremony, premium matcha latte', packaging: '100g袋', origin: '京都府宇治' },
    { name: 'プレミアム抹茶 A2', name_en: 'Premium Matcha A2 High-Grade Ceremonial', slug: 'premium-a2', line: 'premium', grade: 'A2', grade_label: '高級セレモニアルグレード', grade_label_en: 'High-Grade Ceremonial', description: '一番茶使用の高品質グレード。透明感のある緑色と滑らかな味わい。', description_en: 'High-quality first-flush grade with clear green color and smooth taste.', moq: 1, sample_price_usd: 38.00, inquiry_type: 'both', is_recommended: true, is_visible: true, sort_order: 2, usage_suggestions: '茶道、スペシャルティカフェ', usage_suggestions_en: 'Tea ceremony, specialty cafes', packaging: '100g袋', origin: '京都府宇治' },
    { name: 'プレミアム抹茶 A3', name_en: 'Premium Matcha A3 Ceremonial', slug: 'premium-a3', line: 'premium', grade: 'A3', grade_label: 'セレモニアルグレード', grade_label_en: 'Ceremonial Grade', description: 'バランスの良いセレモニアルグレード。抹茶本来の風味を楽しめます。', description_en: 'Well-balanced ceremonial grade with authentic matcha flavor.', moq: 1, sample_price_usd: 30.00, inquiry_type: 'both', is_recommended: false, is_visible: true, sort_order: 3, usage_suggestions: '茶道、カフェ', usage_suggestions_en: 'Tea ceremony, cafes', packaging: '100g袋', origin: '京都府宇治・愛知県西尾' },
    { name: 'プレミアム抹茶 B1', name_en: 'Premium Matcha B1 Premium Latte', slug: 'premium-b1', line: 'premium', grade: 'B1', grade_label: 'プレミアムラテグレード', grade_label_en: 'Premium Latte Grade', description: '抹茶ラテに最適。ミルクとの相性が抜群で、鮮やかな色が映えます。', description_en: 'Perfect for matcha lattes. Excellent with milk, vivid color.', moq: 5, sample_price_usd: 22.00, inquiry_type: 'both', is_recommended: true, is_visible: true, sort_order: 4, packaging: '100g袋, 1kg業務用', origin: '愛知県西尾' },
    { name: 'プレミアム抹茶 B2', name_en: 'Premium Matcha B2 Premium Culinary', slug: 'premium-b2', line: 'premium', grade: 'B2', grade_label: 'プレミアム製菓グレード', grade_label_en: 'Premium Culinary Grade', description: '製菓・調理用プレミアムグレード。抹茶スイーツに最適な濃い風味。', description_en: 'Premium culinary grade with intense flavor for matcha sweets.', moq: 5, sample_price_usd: 16.00, inquiry_type: 'both', is_recommended: false, is_visible: true, sort_order: 5, packaging: '1kg袋', origin: '愛知県西尾' },
    { name: 'プレミアム抹茶 C1', name_en: 'Premium Matcha C1 Culinary', slug: 'premium-c1', line: 'premium', grade: 'C1', grade_label: '製菓グレード', grade_label_en: 'Culinary Grade', description: '汎用性の高い製菓・飲料グレード。コストパフォーマンスに優れています。', description_en: 'Versatile culinary grade for beverages and confectionery.', moq: 10, sample_price_usd: 12.00, inquiry_type: 'both', is_recommended: false, is_visible: true, sort_order: 6, packaging: '1kg袋, 10kg業務用', origin: '愛知県西尾' },
    { name: 'プレミアム抹茶 C2', name_en: 'Premium Matcha C2 Food Industry', slug: 'premium-c2', line: 'premium', grade: 'C2', grade_label: '食品業界用グレード', grade_label_en: 'Food Industry Grade', description: '大量生産向け食品工業用グレード。安定した品質と価格を提供。', description_en: 'Food industry grade for mass production with consistent quality.', moq: 20, sample_price_usd: 8.00, inquiry_type: 'inquiry', is_recommended: false, is_visible: true, sort_order: 7, packaging: '10kg袋, 25kg業務用', origin: '愛知県西尾' },
    // Standard line (3 grades)
    { name: 'スタンダード抹茶 S1', name_en: 'Standard Matcha S1 Premium', slug: 'standard-s1', line: 'standard', grade: 'S1', grade_label: 'スタンダードプレミアム', grade_label_en: 'Standard Premium Grade', description: 'スタンダードラインの最高グレード。コストパフォーマンスに優れたラテ用。', description_en: 'Top of the standard line. Excellent value for latte applications.', moq: 5, sample_price_usd: 18.00, inquiry_type: 'both', is_recommended: false, is_visible: true, sort_order: 1, packaging: '1kg袋', origin: '愛知県西尾' },
    { name: 'スタンダード抹茶 S2', name_en: 'Standard Matcha S2 Culinary', slug: 'standard-s2', line: 'standard', grade: 'S2', grade_label: 'スタンダード製菓グレード', grade_label_en: 'Standard Culinary Grade', description: '飲料・製菓向けスタンダードグレード。大量生産に適した安定品質。', description_en: 'Standard culinary grade for beverages and food production.', moq: 10, sample_price_usd: 11.00, inquiry_type: 'both', is_recommended: false, is_visible: true, sort_order: 2, packaging: '1kg袋, 10kg業務用', origin: '愛知県西尾' },
    { name: 'スタンダード抹茶 S3', name_en: 'Standard Matcha S3 Food Grade', slug: 'standard-s3', line: 'standard', grade: 'S3', grade_label: 'スタンダードフードグレード', grade_label_en: 'Standard Food Grade', description: '食品工業向けエコノミーグレード。大量生産・加工食品に最適。', description_en: 'Economy grade for food manufacturing and large-scale production.', moq: 20, sample_price_usd: 7.00, inquiry_type: 'inquiry', is_recommended: false, is_visible: true, sort_order: 3, packaging: '10kg袋, 25kg業務用', origin: '愛知県西尾' },
    // Organic line (5 grades)
    { name: 'オーガニック抹茶 Organic A1', name_en: 'Organic Matcha A1 Ceremonial', slug: 'organic-a1', line: 'organic', grade: 'Organic A1', grade_label: 'オーガニックセレモニアル', grade_label_en: 'Organic Ceremonial Grade', description: 'JAS認証オーガニック最高品質。無農薬栽培の一番茶。鮮やかな色と豊かな旨味。', description_en: 'JAS Organic certified, highest quality ceremonial grade. Vibrant color and rich umami.', moq: 1, sample_price_usd: 55.00, inquiry_type: 'both', is_recommended: true, is_visible: true, sort_order: 1, packaging: '100g袋', origin: '京都府宇治' },
    { name: 'オーガニック抹茶 Organic A2', name_en: 'Organic Matcha A2 Premium', slug: 'organic-a2', line: 'organic', grade: 'Organic A2', grade_label: 'オーガニックプレミアム', grade_label_en: 'Organic Premium Grade', description: 'JAS認証オーガニックプレミアムグレード。健康志向ブランドに最適。', description_en: 'JAS Organic certified premium grade. Perfect for health-conscious brands.', moq: 1, sample_price_usd: 45.00, inquiry_type: 'both', is_recommended: true, is_visible: true, sort_order: 2, packaging: '100g袋', origin: '京都府宇治・愛知県西尾' },
    { name: 'オーガニック抹茶 Organic B1', name_en: 'Organic Matcha B1 Latte Grade', slug: 'organic-b1', line: 'organic', grade: 'Organic B1', grade_label: 'オーガニックラテグレード', grade_label_en: 'Organic Latte Grade', description: 'オーガニック認証のラテ用グレード。ミルクとの相性が良く、濃い緑色。', description_en: 'Organic certified latte grade. Works beautifully with milk, deep green color.', moq: 5, sample_price_usd: 32.00, inquiry_type: 'both', is_recommended: false, is_visible: true, sort_order: 3, packaging: '1kg袋', origin: '愛知県西尾' },
    { name: 'オーガニック抹茶 Organic B2', name_en: 'Organic Matcha B2 Culinary', slug: 'organic-b2', line: 'organic', grade: 'Organic B2', grade_label: 'オーガニック製菓グレード', grade_label_en: 'Organic Culinary Grade', description: 'オーガニック認証製菓グレード。有機菓子・飲料製造に最適。', description_en: 'Organic certified culinary grade for organic confectionery and beverages.', moq: 5, sample_price_usd: 24.00, inquiry_type: 'both', is_recommended: false, is_visible: true, sort_order: 4, packaging: '1kg袋', origin: '愛知県西尾' },
    { name: 'オーガニック抹茶 Organic C1', name_en: 'Organic Matcha C1 Food Grade', slug: 'organic-c1', line: 'organic', grade: 'Organic C1', grade_label: 'オーガニックフードグレード', grade_label_en: 'Organic Food Grade', description: 'オーガニック認証食品グレード。大量生産向けオーガニック製品に。', description_en: 'Organic certified food grade for large-scale organic production.', moq: 10, sample_price_usd: 16.00, inquiry_type: 'both', is_recommended: false, is_visible: true, sort_order: 5, packaging: '1kg袋, 10kg業務用', origin: '愛知県西尾' },
  ];

  const prodRes = await insert('products', products);
  console.log(`✅ Products: ${prodRes.body.length || 0} inserted`);

  // FAQ
  const faqs = [
    { question: 'What is the minimum order quantity for samples?', question_en: 'What is the minimum order quantity for samples?', answer: '最小注文数量は商品により1〜20kgです。サンプルは100gから注文可能です。', answer_en: 'Minimum order quantities range from 1kg to 20kg depending on the product. Samples can be ordered from 100g.', category: 'order', sort_order: 1, is_visible: true },
    { question: 'Do you offer organic certified matcha?', question_en: 'Do you offer organic certified matcha?', answer: 'はい、JAS認証オーガニック抹茶を5グレード提供しています。EU有機認証対応も可能です。', answer_en: 'Yes, we offer JAS-certified organic matcha in 5 grades. EU organic certification is also available upon request.', category: 'oem', sort_order: 2, is_visible: true },
    { question: 'What is the typical lead time for OEM orders?', question_en: 'What is the typical lead time for OEM orders?', answer: 'サンプルは5〜7営業日以内に発送します。OEM大量注文は数量により3〜8週間が目安です。', answer_en: 'Samples are shipped within 5-7 business days. Large OEM orders typically require 3-8 weeks depending on quantity.', category: 'oem', sort_order: 3, is_visible: true },
    { question: 'What payment methods do you accept?', question_en: 'What payment methods do you accept?', answer: 'PayPalと銀行振込（T/T）に対応しています。大口注文の場合は分割払いの交渉も可能です。', answer_en: 'We accept PayPal and bank transfer (T/T). Payment installments can be negotiated for large orders.', category: 'payment', sort_order: 4, is_visible: true },
    { question: 'Can you provide private label packaging?', question_en: 'Can you provide private label packaging?', answer: 'はい、プライベートラベルパッケージングを提供しています。デザインのご支援も可能です。', answer_en: 'Yes, we provide full private label packaging. We can assist with design or apply your artwork to our packaging options.', category: 'oem', sort_order: 5, is_visible: true },
    { question: 'Do you ship internationally?', question_en: 'Do you ship internationally?', answer: '50カ国以上に輸出実績があります。輸出書類の手配も承ります。', answer_en: 'Yes, we export to 50+ countries worldwide. We handle all export documentation and can arrange freight by sea or air.', category: 'shipping', sort_order: 6, is_visible: true },
  ];

  const faqRes = await insert('faq_items', faqs);
  console.log(`✅ FAQs: ${faqRes.body.length || 0} inserted`);

  // CMS Contents
  const cms = [
    { section_key: 'hero', content_key: 'title', value: 'プレミアム日本産抹茶OEM', value_en: 'Premium Japanese Matcha for Global Brands', content_type: 'text', label: 'ヒーロータイトル' },
    { section_key: 'hero', content_key: 'subtitle', value: '宇治・西尾産の高品質抹茶を世界へ。セレモニアルから業務用まで15グレード対応。', value_en: 'Sourced from the finest tea gardens in Uji, Kyoto & Nishio, Aichi. Your trusted OEM partner for ceremonial, culinary, and organic matcha.', content_type: 'text', label: 'ヒーローサブタイトル' },
    { section_key: 'hero', content_key: 'cta_primary', value: 'サンプル注文', value_en: 'Order Samples', content_type: 'text', label: 'CTAボタン（主）' },
    { section_key: 'hero', content_key: 'cta_secondary', value: '見積依頼', value_en: 'Get a Quote', content_type: 'text', label: 'CTAボタン（副）' },
    { section_key: 'quality', content_key: 'title', value: '品質へのこだわり', value_en: 'Our Commitment to Quality', content_type: 'text', label: '品質セクションタイトル' },
    { section_key: 'quality', content_key: 'body', value: '宇治・西尾の厳選茶園から直接調達。15グレードのラインナップで様々なニーズに対応します。', value_en: 'From ceremonial-grade to culinary matcha, we offer 15 grades across three distinct lines to meet your specific requirements.', content_type: 'text', label: '品質セクション本文' },
    { section_key: 'oem_flow', content_key: 'title', value: 'OEMサービスフロー', value_en: 'OEM Service Flow', content_type: 'text', label: 'OEMフロータイトル' },
    { section_key: 'oem_flow', content_key: 'step1', value: 'お問い合わせ', value_en: 'Inquiry & Consultation', content_type: 'text', label: 'ステップ1' },
    { section_key: 'oem_flow', content_key: 'step2', value: 'サンプル確認', value_en: 'Sample & Testing', content_type: 'text', label: 'ステップ2' },
    { section_key: 'oem_flow', content_key: 'step3', value: '見積・提案', value_en: 'Quote & Proposal', content_type: 'text', label: 'ステップ3' },
    { section_key: 'oem_flow', content_key: 'step4', value: '製造', value_en: 'Production', content_type: 'text', label: 'ステップ4' },
    { section_key: 'oem_flow', content_key: 'step5', value: '発送・納品', value_en: 'Delivery', content_type: 'text', label: 'ステップ5' },
    { section_key: 'cta', content_key: 'title', value: '今すぐ始めましょう', value_en: 'Ready to Start Your Matcha OEM Journey?', content_type: 'text', label: 'CTAタイトル' },
    { section_key: 'cta', content_key: 'body', value: 'サンプルから始めて品質をご確認ください。', value_en: 'Whether you need a single grade or a full private-label range, we are here to help.', content_type: 'text', label: 'CTA本文' },
    { section_key: 'cta', content_key: 'sample_btn', value: 'サンプル注文', value_en: 'Order Samples', content_type: 'text', label: 'サンプルボタン' },
    { section_key: 'cta', content_key: 'quote_btn', value: '見積依頼', value_en: 'Request OEM Quote', content_type: 'text', label: '見積ボタン' },
  ];

  const cmsRes = await insert('cms_contents', cms);
  console.log(`✅ CMS: ${cmsRes.body.length || 0} inserted`);

  // Company info
  const company = [
    { key: 'company_name', value: '株式会社抹茶OEM', value_en: 'Matcha OEM Japan Co., Ltd.', label: '会社名' },
    { key: 'established', value: '2015年', value_en: '2015', label: '設立年' },
    { key: 'address', value: '〒600-8001 京都府京都市中京区...', value_en: '123 Matcha Street, Uji City, Kyoto, Japan', label: '住所' },
    { key: 'email', value: 'info@matchaoem.jp', value_en: 'info@matchaoem.jp', label: 'メール' },
    { key: 'phone', value: '+81-75-XXX-XXXX', value_en: '+81-75-XXX-XXXX', label: '電話' },
    { key: 'whatsapp', value: '+81-90-XXXX-XXXX', value_en: '+81-90-XXXX-XXXX', label: 'WhatsApp' },
    { key: 'about', value: '日本の最高品質の抹茶を世界へ届けるOEM専門会社です。', value_en: 'We are a specialized matcha OEM company delivering Japan\'s finest matcha to global brands.', label: '会社紹介' },
    { key: 'bank_name', value: '三菱UFJ銀行', value_en: 'MUFG Bank, Ltd.', label: '銀行名' },
    { key: 'bank_branch', value: '京都支店', value_en: 'Kyoto Branch', label: '支店' },
    { key: 'bank_instructions', value: '振込手数料はお客様負担でお願いします。振込後はメールにてご連絡ください。', value_en: 'Please note that bank transfer fees are the responsibility of the sender. Please notify us by email after transfer.', label: '振込案内' },
  ];

  const companyRes = await insert('company_info', company);
  console.log(`✅ Company info: ${companyRes.body.length || 0} inserted`);

  // News
  const news = [
    { title: '2024年春摘み抹茶 新入荷のお知らせ', title_en: '2024 Spring Harvest Matcha Now Available', slug: '2024-spring-harvest', excerpt: '2024年春摘みの一番茶が入荷しました。', excerpt_en: 'Our 2024 spring harvest first-flush matcha is now available for order.', content: '今年の春摘み抹茶が入荷しました。品質確認済みのサンプルをご請求ください。', content_en: 'Our 2024 spring harvest matcha has arrived. The quality is exceptional this year with vibrant green color and rich umami.', is_published: true, published_at: new Date().toISOString(), category: 'news' },
    { title: 'オーガニック認証取得のご報告', title_en: 'New EU Organic Certification Achieved', slug: 'eu-organic-certification', excerpt: 'EU有機認証を新たに取得しました。', excerpt_en: 'We are pleased to announce our new EU organic certification for our organic matcha line.', content: 'この度、EU有機認証を取得いたしました。欧州市場向けのOEM対応が可能になりました。', content_en: 'We have successfully obtained EU organic certification for our organic matcha line, enabling export to European markets with full certification.', is_published: true, published_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), category: 'news' },
  ];

  const newsRes = await insert('news_posts', news);
  console.log(`✅ News: ${newsRes.body.length || 0} inserted`);

  console.log('\n✅ Database seeding completed!');
}

main().catch(console.error);
