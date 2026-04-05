/**
 * Supabase データベースセットアップスクリプト
 * supabase-js クライアントのrpcを使って初期データを投入する
 */
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ynbppzqonxglslhhuawe.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InluYnBwenFvbnhnbHNsaGh1YXdlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTI4MDcwOCwiZXhwIjoyMDkwODU2NzA4fQ.O1YK1V358vFQv55VWxgcOZuWRq3Exm8krcRLBx9HRgs';

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

async function check(label, fn) {
  try {
    const result = await fn();
    if (result.error) {
      console.log(`❌ ${label}: ${result.error.message}`);
      return false;
    }
    console.log(`✅ ${label}`);
    return true;
  } catch (e) {
    console.log(`❌ ${label}: ${e.message}`);
    return false;
  }
}

// 商品データ
const products = [
  { name: '宇治抹茶 A1グレード', name_en: 'Uji Matcha Grade A1', slug: 'uji-matcha-a1', line: 'premium', grade: 'A1', grade_label: 'Grade A1 - Ceremonial Supreme', description: '最高峰の抹茶。一番茶の最上等のみを使用した、茶道用最高級品。鮮やかな翠緑色と、豊かな旨み・甘みが特徴。', description_en: 'The finest matcha available. Made exclusively from the highest grade first-flush tea leaves. Characterized by vivid emerald green color, rich umami and natural sweetness.', moq: '1kg〜', packaging: '1kg袋、業務用缶', origin: '京都府宇治市', usage: '茶道・高級ラテ・ギフト商品', is_orderable: true, is_featured: true, is_published: true, sample_price: 45.00, sort_order: 10 },
  { name: '宇治抹茶 A2グレード', name_en: 'Uji Matcha Grade A2', slug: 'uji-matcha-a2', line: 'premium', grade: 'A2', grade_label: 'Grade A2 - Ceremonial Premium', description: '茶道にも使用できる高品質抹茶。A1に次ぐ品質で、上質な甘みと滑らかな口当たりが特徴。カフェ向けラテにも最適。', description_en: 'High-quality matcha suitable for tea ceremony. Second only to A1 in quality, featuring excellent sweetness and smooth texture. Ideal for premium café lattes.', moq: '1kg〜', packaging: '1kg袋、業務用缶', origin: '京都府宇治市', usage: '茶道・抹茶ラテ・高級スイーツ', is_orderable: true, is_featured: true, is_published: true, sample_price: 38.00, sort_order: 20 },
  { name: '宇治抹茶 A3グレード', name_en: 'Uji Matcha Grade A3', slug: 'uji-matcha-a3', line: 'premium', grade: 'A3', grade_label: 'Grade A3 - Ceremonial', description: '茶道・カフェ向け高品質抹茶。鮮やかな緑色と豊かな風味を持ち、抹茶ラテや和菓子に最適なグレード。', description_en: 'High-quality matcha for tea ceremony and café use. Vibrant green color with rich flavor, ideal for matcha lattes and Japanese confectionery.', moq: '1kg〜', packaging: '1kg袋、業務用缶', origin: '京都府宇治市', usage: '抹茶ラテ・和菓子・アイスクリーム', is_orderable: true, is_featured: true, is_published: true, sample_price: 30.00, sort_order: 30 },
  { name: '宇治抹茶 B1グレード', name_en: 'Uji Matcha Grade B1', slug: 'uji-matcha-b1', line: 'premium', grade: 'B1', grade_label: 'Grade B1 - Premium Latte', description: 'カフェ・ラテ向けに特化した高品質グレード。発色が良く、ミルクと合わせた際に美しい緑色を発揮する。コストパフォーマンスに優れる。', description_en: 'High-quality grade specialized for café lattes. Excellent color development, producing beautiful green when combined with milk. Outstanding cost performance.', moq: '5kg〜', packaging: '1kg袋、5kg袋', origin: '京都府宇治市', usage: '抹茶ラテ・フラッペ・アイス', is_orderable: true, is_featured: false, is_published: true, sample_price: 22.00, sort_order: 40 },
  { name: '宇治抹茶 B2グレード', name_en: 'Uji Matcha Grade B2', slug: 'uji-matcha-b2', line: 'premium', grade: 'B2', grade_label: 'Grade B2 - Premium Culinary', description: '製菓・食品加工向けプレミアムグレード。加熱しても退色しにくく、製菓業界で高い評価を受けているグレード。', description_en: 'Premium grade for confectionery and food processing. Resistant to color fading even when heated, highly regarded in the confectionery industry.', moq: '5kg〜', packaging: '1kg袋、5kg袋、20kg袋', origin: '京都府宇治市', usage: 'チョコレート・マカロン・アイスクリーム・製菓', is_orderable: true, is_featured: false, is_published: true, sample_price: 16.00, sort_order: 50 },
  { name: '宇治抹茶 C1グレード', name_en: 'Uji Matcha Grade C1', slug: 'uji-matcha-c1', line: 'premium', grade: 'C1', grade_label: 'Grade C1 - Culinary', description: '食品加工・製菓向けカリナリーグレード。大量使用にも対応できるコストパフォーマンスと安定した品質を両立。', description_en: 'Culinary grade for food processing and confectionery. Balances cost performance for high-volume use with consistent quality.', moq: '10kg〜', packaging: '1kg袋、20kg袋', origin: '京都府', usage: '焼き菓子・アイスクリーム・飲料', is_orderable: false, is_featured: false, is_published: true, sample_price: 12.00, sort_order: 60 },
  { name: '宇治抹茶 C2グレード', name_en: 'Uji Matcha Grade C2', slug: 'uji-matcha-c2', line: 'premium', grade: 'C2', grade_label: 'Grade C2 - Food Industry', description: '食品産業向け業務用グレード。大量生産に対応したコスト効率の高いグレード。飲料・菓子・食品着色に適する。', description_en: 'Industrial-use grade for the food industry. Cost-efficient grade suitable for mass production. Ideal for beverages, confectionery, and food coloring.', moq: '20kg〜', packaging: '20kg袋、業務用', origin: '日本', usage: '清涼飲料水・大量生産スイーツ・食品着色', is_orderable: false, is_featured: false, is_published: true, sample_price: 8.00, sort_order: 70 },
  { name: 'スタンダード抹茶 S1グレード', name_en: 'Standard Matcha Grade S1', slug: 'standard-matcha-s1', line: 'standard', grade: 'S1', grade_label: 'Standard Grade S1 - Premium', description: 'スタンダードラインの最高品質。安定した品質と手頃な価格を両立した、カフェ・飲食店向けの定番グレード。', description_en: 'The highest quality in the standard line. A reliable grade that balances consistent quality with affordable pricing, ideal for cafés and restaurants.', moq: '5kg〜', packaging: '1kg袋、5kg袋', origin: '日本', usage: '抹茶ラテ・デザート・カフェメニュー', is_orderable: true, is_featured: false, is_published: true, sample_price: 18.00, sort_order: 80 },
  { name: 'スタンダード抹茶 S2グレード', name_en: 'Standard Matcha Grade S2', slug: 'standard-matcha-s2', line: 'standard', grade: 'S2', grade_label: 'Standard Grade S2 - Culinary', description: 'スタンダードラインの製菓向けグレード。製菓・食品加工での使用に適した安定品質。大量注文に対応可能。', description_en: 'Culinary grade in the standard line. Consistent quality suitable for confectionery and food processing. Available for large-volume orders.', moq: '10kg〜', packaging: '1kg袋、20kg袋', origin: '日本', usage: '製菓・食品加工・デザートメニュー', is_orderable: false, is_featured: false, is_published: true, sample_price: 11.00, sort_order: 90 },
  { name: 'スタンダード抹茶 S3グレード', name_en: 'Standard Matcha Grade S3', slug: 'standard-matcha-s3', line: 'standard', grade: 'S3', grade_label: 'Standard Grade S3 - Food', description: 'スタンダードラインの食品産業向けグレード。最もコスト効率が高く、大量生産の食品製造に対応したグレード。', description_en: 'Food industry grade in the standard line. Most cost-efficient grade, suitable for large-scale food manufacturing.', moq: '20kg〜', packaging: '20kg袋、業務用', origin: '日本', usage: '大量生産食品・飲料・食品着色', is_orderable: false, is_featured: false, is_published: true, sample_price: 7.00, sort_order: 100 },
  { name: 'オーガニック抹茶 OA1グレード', name_en: 'Organic Matcha Grade OA1', slug: 'organic-matcha-oa1', line: 'organic', grade: 'OA1', grade_label: 'Organic Grade OA1 - Ceremonial', description: 'JAS・EU有機認証取得の最高級オーガニック抹茶。農薬不使用で栽培された最高品質の有機茶葉を使用。環境意識の高いブランドに最適。', description_en: 'JAS & EU organic certified premium organic matcha. Made from the highest quality organic tea leaves grown without pesticides. Perfect for eco-conscious brands.', moq: '1kg〜', packaging: '1kg袋、業務用缶', origin: '京都府宇治市（有機栽培）', usage: '健康志向ブランド・有機認証商品・高級ラテ', is_orderable: true, is_featured: true, is_published: true, sample_price: 55.00, sort_order: 110 },
  { name: 'オーガニック抹茶 OA2グレード', name_en: 'Organic Matcha Grade OA2', slug: 'organic-matcha-oa2', line: 'organic', grade: 'OA2', grade_label: 'Organic Grade OA2 - Premium', description: '有機認証取得のプレミアム抹茶。茶道・カフェ両用に使える高品質オーガニック抹茶。健康・環境意識の高い消費者向け商品に最適。', description_en: 'Certified organic premium matcha. High-quality organic matcha suitable for both tea ceremony and café use. Perfect for health and eco-conscious consumer products.', moq: '1kg〜', packaging: '1kg袋、5kg袋', origin: '京都府（有機栽培）', usage: '有機ラテ・健康食品・スーパーフード', is_orderable: true, is_featured: true, is_published: true, sample_price: 45.00, sort_order: 120 },
  { name: 'オーガニック抹茶 OB1グレード', name_en: 'Organic Matcha Grade OB1', slug: 'organic-matcha-ob1', line: 'organic', grade: 'OB1', grade_label: 'Organic Grade OB1 - Latte', description: '有機認証取得のラテ向けグレード。ミルクとの相性が良く、オーガニック抹茶ラテに最適。コストパフォーマンスに優れる。', description_en: 'Certified organic latte-grade matcha. Excellent compatibility with milk, ideal for organic matcha lattes. Outstanding cost performance.', moq: '5kg〜', packaging: '1kg袋、5kg袋', origin: '日本（有機栽培）', usage: 'オーガニックラテ・健康飲料・スムージー', is_orderable: true, is_featured: false, is_published: true, sample_price: 32.00, sort_order: 130 },
  { name: 'オーガニック抹茶 OB2グレード', name_en: 'Organic Matcha Grade OB2', slug: 'organic-matcha-ob2', line: 'organic', grade: 'OB2', grade_label: 'Organic Grade OB2 - Culinary', description: '有機認証取得の製菓向けグレード。オーガニック製品ライン向けの製菓・食品加工に適したコスト効率の高いグレード。', description_en: 'Certified organic culinary grade. Cost-efficient grade suitable for confectionery and food processing in organic product lines.', moq: '5kg〜', packaging: '1kg袋、20kg袋', origin: '日本（有機栽培）', usage: 'オーガニックスイーツ・製菓・健康食品', is_orderable: false, is_featured: false, is_published: true, sample_price: 24.00, sort_order: 140 },
  { name: 'オーガニック抹茶 OC1グレード', name_en: 'Organic Matcha Grade OC1', slug: 'organic-matcha-oc1', line: 'organic', grade: 'OC1', grade_label: 'Organic Grade OC1 - Food', description: '有機認証取得の食品産業向けグレード。大量生産でもオーガニック認証を維持できるコスト効率の高いグレード。', description_en: 'Certified organic food industry grade. Cost-efficient grade that maintains organic certification even for mass production.', moq: '20kg〜', packaging: '20kg袋、業務用', origin: '日本（有機栽培）', usage: 'オーガニック飲料・大量生産食品・食品産業', is_orderable: false, is_featured: false, is_published: true, sample_price: 16.00, sort_order: 150 },
];

const cmsSections = [
  { section_key: 'hero', section_name: 'ヒーローセクション', title: '日本の抹茶を、世界へ。', title_en: 'Japanese Matcha, Delivered to the World.', subtitle: '京都宇治の最高品質抹茶をOEM・プライベートラベルで提供します。', subtitle_en: 'Premium Uji matcha from Kyoto, available for OEM and private label partnerships.', content: { cta_primary_text: 'サンプルを注文する', cta_primary_text_en: 'Order a Sample', cta_primary_url: '/sample-order', cta_secondary_text: '見積を依頼する', cta_secondary_text_en: 'Request a Quote', cta_secondary_url: '/quote' }, is_visible: true, sort_order: 10 },
  { section_key: 'quality', section_name: '品質・信頼性訴求', title: '品質へのこだわり', title_en: 'Our Commitment to Quality', subtitle: '徹底した品質管理と、長年の信頼に裏付けられた抹茶をお届けします。', subtitle_en: 'Delivering matcha backed by rigorous quality control and years of trusted expertise.', content: { points: [{ icon: 'leaf', title: '産地直送', title_en: 'Direct from Origin', desc: '京都宇治産の最高品質茶葉を使用', desc_en: 'Using the finest tea leaves from Uji, Kyoto' }, { icon: 'shield', title: '品質認証', title_en: 'Quality Certified', desc: 'JAS・EU有機認証・ISO取得', desc_en: 'JAS, EU Organic & ISO Certified' }, { icon: 'globe', title: 'グローバル対応', title_en: 'Global Ready', desc: '世界30カ国以上への輸出実績', desc_en: 'Exported to 30+ countries worldwide' }, { icon: 'package', title: 'OEM対応', title_en: 'OEM Available', desc: '小ロットから大量生産まで対応', desc_en: 'From small batches to mass production' }] }, is_visible: true, sort_order: 20 },
  { section_key: 'grades', section_name: '抹茶グレード紹介', title: '抹茶グレードラインナップ', title_en: 'Our Matcha Grade Lineup', subtitle: 'ノンオーガニック・オーガニックの各ラインから、用途に合わせたグレードをお選びいただけます。', subtitle_en: 'Choose from non-organic and organic lines, with grades tailored to your specific application.', content: { show_count: 6 }, is_visible: true, sort_order: 30 },
  { section_key: 'oem_flow', section_name: 'OEM対応フロー', title: 'OEM対応の流れ', title_en: 'OEM Process Flow', subtitle: 'お問い合わせから納品まで、専任スタッフがサポートします。', subtitle_en: 'Our dedicated team supports you from inquiry to delivery.', content: { steps: [{ num: '01', title: 'お問い合わせ・ヒアリング', title_en: 'Inquiry & Consultation', desc: 'ご要望をお伺いし、最適なグレードをご提案します', desc_en: 'We listen to your needs and propose the optimal grade' }, { num: '02', title: 'サンプル提供', title_en: 'Sample Provision', desc: 'ご要望に合わせたサンプルをお送りします', desc_en: 'We send samples tailored to your requirements' }, { num: '03', title: '見積・仕様確定', title_en: 'Quote & Specifications', desc: '数量・パッケージ・配送条件等を確定します', desc_en: 'Finalize quantity, packaging, and shipping terms' }, { num: '04', title: '製造・品質検査', title_en: 'Production & QC', desc: '厳格な品質管理のもと製造いたします', desc_en: 'Manufactured under strict quality control' }, { num: '05', title: '出荷・納品', title_en: 'Shipping & Delivery', desc: '世界各地へ安全に納品します', desc_en: 'Safe delivery to destinations worldwide' }] }, is_visible: true, sort_order: 40 },
  { section_key: 'packages', section_name: 'パッケージ対応', title: 'パッケージ・プライベートラベル対応', title_en: 'Packaging & Private Label Solutions', subtitle: 'お客様のブランドに合わせたパッケージデザインに対応します。', subtitle_en: 'We accommodate packaging designs tailored to your brand identity.', content: { features: ['オリジナルラベル印刷対応', '多様な容量・形状に対応', '環境配慮型パッケージ選択可', '最小ロットからの対応可'] }, is_visible: true, sort_order: 50 },
  { section_key: 'sample_cta', section_name: 'サンプルCTA', title: 'まずはサンプルからお試しください', title_en: 'Start with a Sample', subtitle: '品質をご確認いただいてから、本発注をご検討ください。', subtitle_en: 'Verify the quality before placing your full order.', content: { cta_text: 'サンプルを注文する', cta_text_en: 'Order a Sample', cta_url: '/sample-order' }, is_visible: true, sort_order: 60 },
  { section_key: 'faq_excerpt', section_name: 'FAQ抜粋', title: 'よくあるご質問', title_en: 'Frequently Asked Questions', subtitle: 'お客様からよくいただくご質問にお答えします。', subtitle_en: 'Answers to questions we frequently receive from our customers.', content: { show_count: 4 }, is_visible: true, sort_order: 70 },
  { section_key: 'contact_cta', section_name: 'お問い合わせCTA', title: 'ご相談・お見積りはお気軽に', title_en: 'Contact Us Anytime', subtitle: '専任スタッフが迅速に対応いたします。', subtitle_en: 'Our dedicated staff will respond promptly.', content: { cta_text: 'お問い合わせ', cta_text_en: 'Contact Us', cta_url: '/contact', cta_quote_text: '見積依頼', cta_quote_text_en: 'Request a Quote', cta_quote_url: '/quote' }, is_visible: true, sort_order: 80 },
];

const faqItems = [
  { question: '最小注文数量（MOQ）はどのくらいですか？', question_en: 'What is the minimum order quantity (MOQ)?', answer: 'グレードや商品により異なりますが、サンプルは100gから、通常のOEM注文は1kgからご対応可能です。大量注文については別途ご相談ください。', answer_en: 'It varies by grade and product, but samples start from 100g and standard OEM orders start from 1kg. Please contact us for large volume orders.', category: 'oem', is_published: true, sort_order: 10 },
  { question: 'サンプルの取り寄せは可能ですか？', question_en: 'Can I request samples?', answer: 'はい、可能です。各グレードのサンプル（100g）をオンラインでご注文いただけます。サンプル費用はUSD表示の価格をご確認ください。', answer_en: 'Yes, absolutely. You can order samples (100g) for each grade online. Please check the listed USD price for sample costs.', category: 'general', is_published: true, sort_order: 20 },
  { question: 'オーガニック認証を持っていますか？', question_en: 'Do you have organic certification?', answer: 'はい。オーガニックラインはJAS有機認証およびEU有機認証を取得しております。認証書類はご要望に応じてご提供いたします。', answer_en: 'Yes. Our organic line holds JAS Organic and EU Organic certifications. Certification documents are available upon request.', category: 'product', is_published: true, sort_order: 30 },
  { question: '対応可能なパッケージの種類を教えてください。', question_en: 'What types of packaging do you offer?', answer: '袋（1kg、5kg、20kg）、缶、業務用大袋など多様な形状に対応しております。またプライベートラベルへの対応も可能です。', answer_en: 'We offer various formats including bags (1kg, 5kg, 20kg), cans, and large commercial bags. Private label packaging is also available.', category: 'oem', is_published: true, sort_order: 40 },
  { question: '支払い方法はどのようなものがありますか？', question_en: 'What payment methods do you accept?', answer: 'PayPal決済と銀行振込（T/T送金）に対応しております。サンプル・小口注文はPayPalが便利です。大口OEM案件は銀行振込が一般的です。', answer_en: 'We accept PayPal and bank transfer (T/T). PayPal is convenient for samples and small orders. Bank transfer is common for large OEM orders.', category: 'payment', is_published: true, sort_order: 50 },
  { question: '納期はどのくらいかかりますか？', question_en: 'How long does delivery take?', answer: '在庫商品は通常1〜2週間、OEM特注品は仕様確定後3〜4週間が目安です。お急ぎの場合はご相談ください。', answer_en: 'Stock items typically take 1-2 weeks, and custom OEM products take 3-4 weeks after specifications are confirmed. Please contact us for urgent orders.', category: 'shipping', is_published: true, sort_order: 60 },
  { question: '輸出・通関書類はサポートしていただけますか？', question_en: 'Can you support export and customs documentation?', answer: 'はい。輸出に必要な衛生証明書、産地証明書、成分分析表などの書類作成をサポートしております。国により必要書類が異なるためお問い合わせください。', answer_en: 'Yes. We support the preparation of documents required for export, such as health certificates, certificates of origin, and nutritional analysis reports.', category: 'shipping', is_published: true, sort_order: 70 },
  { question: 'プライベートラベル（自社ブランド）への対応は可能ですか？', question_en: 'Is private label (own brand) production possible?', answer: 'はい、対応可能です。お客様のブランドロゴ・デザインを使用したパッケージングに対応しています。デザインデータをご提供いただく必要があります。', answer_en: 'Yes, we can accommodate this. We support packaging using your brand logo and design. You will need to provide the design data.', category: 'oem', is_published: true, sort_order: 80 },
];

const companyInfo = {
  company_name: '株式会社 抹茶OEM',
  company_name_en: 'Matcha OEM Co., Ltd.',
  address: '〒604-0000 京都府京都市中京区○○町XXX',
  address_en: 'XXX, ○○-cho, Nakagyo-ku, Kyoto 604-0000, Japan',
  phone: '+81-75-XXX-XXXX',
  email: 'info@matcha-oem.jp',
  business_hours: '平日 9:00〜18:00 (JST)',
  established_year: '2010',
  description: '創業以来、最高品質の宇治抹茶を世界各地へお届けしてまいりました。',
  description_en: 'Since our founding, we have been delivering the finest Uji matcha to customers around the world.',
  bank_transfer_info: `【銀行振込先案内】\n\n銀行名: ○○銀行\n支店名: ○○支店\n口座種別: 普通\n口座番号: XXXXXXX\n口座名義: カ）マッチャOEM\n\n※振込手数料はお客様負担でお願いします。\n※ご入金確認後、製造・発送手続きを開始いたします。`,
};

const siteSettings = [
  { key: 'site_title', value: '抹茶OEM | 日本の抹茶を世界へ', description: 'サイトタイトル' },
  { key: 'site_title_en', value: 'Matcha OEM | Premium Japanese Matcha for the World', description: 'サイトタイトル（英語）' },
  { key: 'meta_description', value: '京都宇治産の最高品質抹茶をOEM・プライベートラベルで提供。海外バイヤー向け抹茶OEM専門商社。', description: 'メタディスクリプション' },
  { key: 'contact_email', value: 'info@matcha-oem.jp', description: 'お問い合わせ先メール' },
  { key: 'primary_color', value: '#2D5016', description: 'プライマリカラー（深緑）' },
  { key: 'secondary_color', value: '#C9A84C', description: 'セカンダリカラー（ゴールド）' },
  { key: 'instagram_url', value: '', description: 'Instagram URL' },
  { key: 'linkedin_url', value: '', description: 'LinkedIn URL' },
];

async function main() {
  console.log('🍵 抹茶OEM データベースセットアップ開始\n');

  // 商品データ投入
  console.log('📦 商品データ投入中...');
  const { data: prodData, error: prodErr } = await supabase
    .from('products')
    .upsert(products, { onConflict: 'slug' });
  if (prodErr) console.log('❌ 商品:', prodErr.message);
  else console.log(`✅ 商品: ${products.length}件`);

  // CMSセクション投入
  console.log('📦 CMSセクション投入中...');
  const { error: cmsErr } = await supabase
    .from('cms_sections')
    .upsert(cmsSections, { onConflict: 'section_key' });
  if (cmsErr) console.log('❌ CMSセクション:', cmsErr.message);
  else console.log(`✅ CMSセクション: ${cmsSections.length}件`);

  // FAQ投入
  console.log('📦 FAQ投入中...');
  const { error: faqErr } = await supabase
    .from('faq_items')
    .upsert(faqItems, { onConflict: 'id' });
  if (faqErr) console.log('❌ FAQ:', faqErr.message);
  else console.log(`✅ FAQ: ${faqItems.length}件`);

  // 会社情報投入
  console.log('📦 会社情報投入中...');
  const { error: compErr } = await supabase
    .from('company_info')
    .upsert([companyInfo]);
  if (compErr) console.log('❌ 会社情報:', compErr.message);
  else console.log('✅ 会社情報');

  // サイト設定投入
  console.log('📦 サイト設定投入中...');
  const { error: settErr } = await supabase
    .from('site_settings')
    .upsert(siteSettings, { onConflict: 'key' });
  if (settErr) console.log('❌ サイト設定:', settErr.message);
  else console.log(`✅ サイト設定: ${siteSettings.length}件`);

  // お知らせ投入
  console.log('📦 お知らせ投入中...');
  const { error: newsErr } = await supabase
    .from('news_posts')
    .upsert([{
      title: '抹茶OEM公式サイトをリニューアルしました',
      title_en: 'We Have Launched Our New Matcha OEM Website',
      slug: 'website-renewal-launch',
      content: '## 公式サイトリニューアルのお知らせ\n\nこの度、抹茶OEMの公式サイトをリニューアルいたしました。\n\n新しいサイトでは、オンラインサンプル注文・見積依頼フォームが強化されています。',
      content_en: '## Website Renewal Announcement\n\nWe are pleased to announce the launch of our new official Matcha OEM website.',
      excerpt: '公式サイトをリニューアルしました。新機能についてお知らせします。',
      excerpt_en: 'We have launched our new official website with enhanced features.',
      category: 'news',
      is_published: true,
      published_at: new Date().toISOString(),
    }], { onConflict: 'slug' });
  if (newsErr) console.log('❌ お知らせ:', newsErr.message);
  else console.log('✅ お知らせ');

  console.log('\n🎉 セットアップ完了！');
}

main().catch(console.error);
