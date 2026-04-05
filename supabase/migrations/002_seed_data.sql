-- =====================================================
-- 初期サンプルデータ投入
-- =====================================================

-- =====================================================
-- 商品データ（15商品: ノンオーガニック7+3、オーガニック5）
-- =====================================================

-- ノンオーガニック プレミアムライン（7段階）
INSERT INTO products (name, name_en, slug, line, grade, grade_label, description, description_en, moq, packaging, origin, usage, is_orderable, is_featured, is_published, sample_price, sort_order) VALUES
(
  '宇治抹茶 A1グレード',
  'Uji Matcha Grade A1',
  'uji-matcha-a1',
  'premium',
  'A1',
  'Grade A1 - Ceremonial Supreme',
  '最高峰の抹茶。一番茶の最上等のみを使用した、茶道用最高級品。鮮やかな翠緑色と、豊かな旨み・甘みが特徴。',
  'The finest matcha available. Made exclusively from the highest grade first-flush tea leaves. Characterized by vivid emerald green color, rich umami and natural sweetness.',
  '1kg〜',
  '1kg袋、業務用缶',
  '京都府宇治市',
  '茶道・高級ラテ・ギフト商品',
  true,
  true,
  true,
  45.00,
  10
),
(
  '宇治抹茶 A2グレード',
  'Uji Matcha Grade A2',
  'uji-matcha-a2',
  'premium',
  'A2',
  'Grade A2 - Ceremonial Premium',
  '茶道にも使用できる高品質抹茶。A1に次ぐ品質で、上質な甘みと滑らかな口当たりが特徴。カフェ向けラテにも最適。',
  'High-quality matcha suitable for tea ceremony. Second only to A1 in quality, featuring excellent sweetness and smooth texture. Ideal for premium café lattes.',
  '1kg〜',
  '1kg袋、業務用缶',
  '京都府宇治市',
  '茶道・抹茶ラテ・高級スイーツ',
  true,
  true,
  true,
  38.00,
  20
),
(
  '宇治抹茶 A3グレード',
  'Uji Matcha Grade A3',
  'uji-matcha-a3',
  'premium',
  'A3',
  'Grade A3 - Ceremonial',
  '茶道・カフェ向け高品質抹茶。鮮やかな緑色と豊かな風味を持ち、抹茶ラテや和菓子に最適なグレード。',
  'High-quality matcha for tea ceremony and café use. Vibrant green color with rich flavor, ideal for matcha lattes and Japanese confectionery.',
  '1kg〜',
  '1kg袋、業務用缶',
  '京都府宇治市',
  '抹茶ラテ・和菓子・アイスクリーム',
  true,
  true,
  true,
  30.00,
  30
),
(
  '宇治抹茶 B1グレード',
  'Uji Matcha Grade B1',
  'uji-matcha-b1',
  'premium',
  'B1',
  'Grade B1 - Premium Latte',
  'カフェ・ラテ向けに特化した高品質グレード。発色が良く、ミルクと合わせた際に美しい緑色を発揮する。コストパフォーマンスに優れる。',
  'High-quality grade specialized for café lattes. Excellent color development, producing beautiful green when combined with milk. Outstanding cost performance.',
  '5kg〜',
  '1kg袋、5kg袋',
  '京都府宇治市',
  '抹茶ラテ・フラッペ・アイス',
  true,
  false,
  true,
  22.00,
  40
),
(
  '宇治抹茶 B2グレード',
  'Uji Matcha Grade B2',
  'uji-matcha-b2',
  'premium',
  'B2',
  'Grade B2 - Premium Culinary',
  '製菓・食品加工向けプレミアムグレード。加熱しても退色しにくく、製菓業界で高い評価を受けているグレード。',
  'Premium grade for confectionery and food processing. Resistant to color fading even when heated, highly regarded in the confectionery industry.',
  '5kg〜',
  '1kg袋、5kg袋、20kg袋',
  '京都府宇治市',
  'チョコレート・マカロン・アイスクリーム・製菓',
  true,
  false,
  true,
  16.00,
  50
),
(
  '宇治抹茶 C1グレード',
  'Uji Matcha Grade C1',
  'uji-matcha-c1',
  'premium',
  'C1',
  'Grade C1 - Culinary',
  '食品加工・製菓向けカリナリーグレード。大量使用にも対応できるコストパフォーマンスと安定した品質を両立。',
  'Culinary grade for food processing and confectionery. Balances cost performance for high-volume use with consistent quality.',
  '10kg〜',
  '1kg袋、20kg袋',
  '京都府',
  '焼き菓子・アイスクリーム・飲料',
  false,
  false,
  true,
  12.00,
  60
),
(
  '宇治抹茶 C2グレード',
  'Uji Matcha Grade C2',
  'uji-matcha-c2',
  'premium',
  'C2',
  'Grade C2 - Food Industry',
  '食品産業向け業務用グレード。大量生産に対応したコスト効率の高いグレード。飲料・菓子・食品着色に適する。',
  'Industrial-use grade for the food industry. Cost-efficient grade suitable for mass production. Ideal for beverages, confectionery, and food coloring.',
  '20kg〜',
  '20kg袋、業務用',
  '日本',
  '清涼飲料水・大量生産スイーツ・食品着色',
  false,
  false,
  true,
  8.00,
  70
),

-- ノンオーガニック スタンダードライン（3段階）
(
  'スタンダード抹茶 S1グレード',
  'Standard Matcha Grade S1',
  'standard-matcha-s1',
  'standard',
  'S1',
  'Standard Grade S1 - Premium',
  'スタンダードラインの最高品質。安定した品質と手頃な価格を両立した、カフェ・飲食店向けの定番グレード。',
  'The highest quality in the standard line. A reliable grade that balances consistent quality with affordable pricing, ideal for cafés and restaurants.',
  '5kg〜',
  '1kg袋、5kg袋',
  '日本',
  '抹茶ラテ・デザート・カフェメニュー',
  true,
  false,
  true,
  18.00,
  80
),
(
  'スタンダード抹茶 S2グレード',
  'Standard Matcha Grade S2',
  'standard-matcha-s2',
  'standard',
  'S2',
  'Standard Grade S2 - Culinary',
  'スタンダードラインの製菓向けグレード。製菓・食品加工での使用に適した安定品質。大量注文に対応可能。',
  'Culinary grade in the standard line. Consistent quality suitable for confectionery and food processing. Available for large-volume orders.',
  '10kg〜',
  '1kg袋、20kg袋',
  '日本',
  '製菓・食品加工・デザートメニュー',
  false,
  false,
  true,
  11.00,
  90
),
(
  'スタンダード抹茶 S3グレード',
  'Standard Matcha Grade S3',
  'standard-matcha-s3',
  'standard',
  'S3',
  'Standard Grade S3 - Food',
  'スタンダードラインの食品産業向けグレード。最もコスト効率が高く、大量生産の食品製造に対応したグレード。',
  'Food industry grade in the standard line. Most cost-efficient grade, suitable for large-scale food manufacturing.',
  '20kg〜',
  '20kg袋、業務用',
  '日本',
  '大量生産食品・飲料・食品着色',
  false,
  false,
  true,
  7.00,
  100
),

-- オーガニックライン（5段階）
(
  'オーガニック抹茶 OA1グレード',
  'Organic Matcha Grade OA1',
  'organic-matcha-oa1',
  'organic',
  'OA1',
  'Organic Grade OA1 - Ceremonial',
  'JAS・EU有機認証取得の最高級オーガニック抹茶。農薬不使用で栽培された最高品質の有機茶葉を使用。環境意識の高いブランドに最適。',
  'JAS & EU organic certified premium organic matcha. Made from the highest quality organic tea leaves grown without pesticides. Perfect for eco-conscious brands.',
  '1kg〜',
  '1kg袋、業務用缶',
  '京都府宇治市（有機栽培）',
  '健康志向ブランド・有機認証商品・高級ラテ',
  true,
  true,
  true,
  55.00,
  110
),
(
  'オーガニック抹茶 OA2グレード',
  'Organic Matcha Grade OA2',
  'organic-matcha-oa2',
  'organic',
  'OA2',
  'Organic Grade OA2 - Premium',
  '有機認証取得のプレミアム抹茶。茶道・カフェ両用に使える高品質オーガニック抹茶。健康・環境意識の高い消費者向け商品に最適。',
  'Certified organic premium matcha. High-quality organic matcha suitable for both tea ceremony and café use. Perfect for health and eco-conscious consumer products.',
  '1kg〜',
  '1kg袋、5kg袋',
  '京都府（有機栽培）',
  '有機ラテ・健康食品・スーパーフード',
  true,
  true,
  true,
  45.00,
  120
),
(
  'オーガニック抹茶 OB1グレード',
  'Organic Matcha Grade OB1',
  'organic-matcha-ob1',
  'organic',
  'OB1',
  'Organic Grade OB1 - Latte',
  '有機認証取得のラテ向けグレード。ミルクとの相性が良く、オーガニック抹茶ラテに最適。コストパフォーマンスに優れる。',
  'Certified organic latte-grade matcha. Excellent compatibility with milk, ideal for organic matcha lattes. Outstanding cost performance.',
  '5kg〜',
  '1kg袋、5kg袋',
  '日本（有機栽培）',
  'オーガニックラテ・健康飲料・スムージー',
  true,
  false,
  true,
  32.00,
  130
),
(
  'オーガニック抹茶 OB2グレード',
  'Organic Matcha Grade OB2',
  'organic-matcha-ob2',
  'organic',
  'OB2',
  'Organic Grade OB2 - Culinary',
  '有機認証取得の製菓向けグレード。オーガニック製品ライン向けの製菓・食品加工に適したコスト効率の高いグレード。',
  'Certified organic culinary grade. Cost-efficient grade suitable for confectionery and food processing in organic product lines.',
  '5kg〜',
  '1kg袋、20kg袋',
  '日本（有機栽培）',
  'オーガニックスイーツ・製菓・健康食品',
  false,
  false,
  true,
  24.00,
  140
),
(
  'オーガニック抹茶 OC1グレード',
  'Organic Matcha Grade OC1',
  'organic-matcha-oc1',
  'organic',
  'OC1',
  'Organic Grade OC1 - Food',
  '有機認証取得の食品産業向けグレード。大量生産でもオーガニック認証を維持できるコスト効率の高いグレード。',
  'Certified organic food industry grade. Cost-efficient grade that maintains organic certification even for mass production.',
  '20kg〜',
  '20kg袋、業務用',
  '日本（有機栽培）',
  'オーガニック飲料・大量生産食品・食品産業',
  false,
  false,
  true,
  16.00,
  150
);

-- =====================================================
-- トップページCMSセクション初期データ
-- =====================================================
INSERT INTO cms_sections (section_key, section_name, title, title_en, subtitle, subtitle_en, content, is_visible, sort_order) VALUES
(
  'hero',
  'ヒーローセクション',
  '日本の抹茶を、世界へ。',
  'Japanese Matcha, Delivered to the World.',
  '京都宇治の最高品質抹茶をOEM・プライベートラベルで提供します。',
  'Premium Uji matcha from Kyoto, available for OEM and private label partnerships.',
  '{"cta_primary_text": "サンプルを注文する", "cta_primary_text_en": "Order a Sample", "cta_primary_url": "/sample-order", "cta_secondary_text": "見積を依頼する", "cta_secondary_text_en": "Request a Quote", "cta_secondary_url": "/quote"}',
  true,
  10
),
(
  'quality',
  '品質・信頼性訴求',
  '品質へのこだわり',
  'Our Commitment to Quality',
  '徹底した品質管理と、長年の信頼に裏付けられた抹茶をお届けします。',
  'Delivering matcha backed by rigorous quality control and years of trusted expertise.',
  '{"points": [{"icon": "leaf", "title": "産地直送", "title_en": "Direct from Origin", "desc": "京都宇治産の最高品質茶葉を使用", "desc_en": "Using the finest tea leaves from Uji, Kyoto"}, {"icon": "shield", "title": "品質認証", "title_en": "Quality Certified", "desc": "JAS・EU有機認証・ISO取得", "desc_en": "JAS, EU Organic & ISO Certified"}, {"icon": "globe", "title": "グローバル対応", "title_en": "Global Ready", "desc": "世界30カ国以上への輸出実績", "desc_en": "Exported to 30+ countries worldwide"}, {"icon": "package", "title": "OEM対応", "title_en": "OEM Available", "desc": "小ロットから大量生産まで対応", "desc_en": "From small batches to mass production"}]}',
  true,
  20
),
(
  'grades',
  '抹茶グレード紹介',
  '抹茶グレードラインナップ',
  'Our Matcha Grade Lineup',
  'ノンオーガニック・オーガニックの各ラインから、用途に合わせたグレードをお選びいただけます。',
  'Choose from non-organic and organic lines, with grades tailored to your specific application.',
  '{"show_count": 6}',
  true,
  30
),
(
  'oem_flow',
  'OEM対応フロー',
  'OEM対応の流れ',
  'OEM Process Flow',
  'お問い合わせから納品まで、専任スタッフがサポートします。',
  'Our dedicated team supports you from inquiry to delivery.',
  '{"steps": [{"num": "01", "title": "お問い合わせ・ヒアリング", "title_en": "Inquiry & Consultation", "desc": "ご要望をお伺いし、最適なグレードをご提案します", "desc_en": "We listen to your needs and propose the optimal grade"}, {"num": "02", "title": "サンプル提供", "title_en": "Sample Provision", "desc": "ご要望に合わせたサンプルをお送りします", "desc_en": "We send samples tailored to your requirements"}, {"num": "03", "title": "見積・仕様確定", "title_en": "Quote & Specifications", "desc": "数量・パッケージ・配送条件等を確定します", "desc_en": "Finalize quantity, packaging, and shipping terms"}, {"num": "04", "title": "製造・品質検査", "title_en": "Production & QC", "desc": "厳格な品質管理のもと製造いたします", "desc_en": "Manufactured under strict quality control"}, {"num": "05", "title": "出荷・納品", "title_en": "Shipping & Delivery", "desc": "世界各地へ安全に納品します", "desc_en": "Safe delivery to destinations worldwide"}]}',
  true,
  40
),
(
  'packages',
  'パッケージ対応',
  'パッケージ・プライベートラベル対応',
  'Packaging & Private Label Solutions',
  'お客様のブランドに合わせたパッケージデザインに対応します。',
  'We accommodate packaging designs tailored to your brand identity.',
  '{"features": ["オリジナルラベル印刷対応", "多様な容量・形状に対応", "環境配慮型パッケージ選択可", "最小ロットからの対応可"]}',
  true,
  50
),
(
  'sample_cta',
  'サンプルCTA',
  'まずはサンプルからお試しください',
  'Start with a Sample',
  '品質をご確認いただいてから、本発注をご検討ください。',
  'Verify the quality before placing your full order.',
  '{"cta_text": "サンプルを注文する", "cta_text_en": "Order a Sample", "cta_url": "/sample-order"}',
  true,
  60
),
(
  'faq_excerpt',
  'FAQ抜粋',
  'よくあるご質問',
  'Frequently Asked Questions',
  'お客様からよくいただくご質問にお答えします。',
  'Answers to questions we frequently receive from our customers.',
  '{"show_count": 4}',
  true,
  70
),
(
  'contact_cta',
  'お問い合わせCTA',
  'ご相談・お見積りはお気軽に',
  'Contact Us Anytime',
  '専任スタッフが迅速に対応いたします。',
  'Our dedicated staff will respond promptly.',
  '{"cta_text": "お問い合わせ", "cta_text_en": "Contact Us", "cta_url": "/contact", "cta_quote_text": "見積依頼", "cta_quote_text_en": "Request a Quote", "cta_quote_url": "/quote"}',
  true,
  80
);

-- =====================================================
-- FAQ初期データ
-- =====================================================
INSERT INTO faq_items (question, question_en, answer, answer_en, category, is_published, sort_order) VALUES
(
  '最小注文数量（MOQ）はどのくらいですか？',
  'What is the minimum order quantity (MOQ)?',
  'グレードや商品により異なりますが、サンプルは100gから、通常のOEM注文は1kgからご対応可能です。大量注文については別途ご相談ください。',
  'It varies by grade and product, but samples start from 100g and standard OEM orders start from 1kg. Please contact us for large volume orders.',
  'oem',
  true,
  10
),
(
  'サンプルの取り寄せは可能ですか？',
  'Can I request samples?',
  'はい、可能です。各グレードのサンプル（100g）をオンラインでご注文いただけます。サンプル費用はUSD表示の価格をご確認ください。',
  'Yes, absolutely. You can order samples (100g) for each grade online. Please check the listed USD price for sample costs.',
  'general',
  true,
  20
),
(
  'オーガニック認証を持っていますか？',
  'Do you have organic certification?',
  'はい。オーガニックラインはJAS有機認証およびEU有機認証を取得しております。認証書類はご要望に応じてご提供いたします。',
  'Yes. Our organic line holds JAS Organic and EU Organic certifications. Certification documents are available upon request.',
  'product',
  true,
  30
),
(
  '対応可能なパッケージの種類を教えてください。',
  'What types of packaging do you offer?',
  '袋（1kg、5kg、20kg）、缶、業務用大袋など多様な形状に対応しております。またプライベートラベルへの対応も可能です。',
  'We offer various formats including bags (1kg, 5kg, 20kg), cans, and large commercial bags. Private label packaging is also available.',
  'oem',
  true,
  40
),
(
  '支払い方法はどのようなものがありますか？',
  'What payment methods do you accept?',
  'PayPal決済と銀行振込（T/T送金）に対応しております。サンプル・小口注文はPayPalが便利です。大口OEM案件は銀行振込が一般的です。',
  'We accept PayPal and bank transfer (T/T). PayPal is convenient for samples and small orders. Bank transfer is common for large OEM orders.',
  'payment',
  true,
  50
),
(
  '納期はどのくらいかかりますか？',
  'How long does delivery take?',
  '在庫商品は通常1〜2週間、OEM特注品は仕様確定後3〜4週間が目安です。お急ぎの場合はご相談ください。',
  'Stock items typically take 1-2 weeks, and custom OEM products take 3-4 weeks after specifications are confirmed. Please contact us for urgent orders.',
  'shipping',
  true,
  60
),
(
  '輸出・通関書類はサポートしていただけますか？',
  'Can you support export and customs documentation?',
  'はい。輸出に必要な衛生証明書、産地証明書、成分分析表などの書類作成をサポートしております。国により必要書類が異なるためお問い合わせください。',
  'Yes. We support the preparation of documents required for export, such as health certificates, certificates of origin, and nutritional analysis reports. Requirements vary by country, so please contact us.',
  'shipping',
  true,
  70
),
(
  'プライベートラベル（自社ブランド）への対応は可能ですか？',
  'Is private label (own brand) production possible?',
  'はい、対応可能です。お客様のブランドロゴ・デザインを使用したパッケージングに対応しています。デザインデータをご提供いただく必要があります。',
  'Yes, we can accommodate this. We support packaging using your brand logo and design. You will need to provide the design data.',
  'oem',
  true,
  80
);

-- =====================================================
-- 会社情報初期データ
-- =====================================================
INSERT INTO company_info (
  company_name, company_name_en,
  address, address_en,
  phone, email, business_hours,
  established_year,
  description, description_en,
  bank_transfer_info
) VALUES (
  '株式会社 抹茶OEM',
  'Matcha OEM Co., Ltd.',
  '〒604-0000 京都府京都市中京区○○町XXX',
  'XXX, ○○-cho, Nakagyo-ku, Kyoto 604-0000, Japan',
  '+81-75-XXX-XXXX',
  'info@matcha-oem.jp',
  '平日 9:00〜18:00 (JST)',
  '2010',
  '創業以来、最高品質の宇治抹茶を世界各地へお届けしてまいりました。厳格な品質管理と、お客様一人ひとりに寄り添ったサービスで、世界30カ国以上のバイヤー様・ブランド様にご信頼いただいております。',
  'Since our founding, we have been delivering the finest Uji matcha to customers around the world. With rigorous quality control and personalized service, we have earned the trust of buyers and brands in over 30 countries worldwide.',
  '【銀行振込先案内】

銀行名: ○○銀行
支店名: ○○支店
口座種別: 普通
口座番号: XXXXXXX
口座名義: カ）マッチャOEM

※振込手数料はお客様負担でお願いします。
※ご入金確認後、製造・発送手続きを開始いたします。
※海外送金の場合はSWIFTコード: XXXXXXXXをご利用ください。'
);

-- =====================================================
-- サイト基本設定初期データ
-- =====================================================
INSERT INTO site_settings (key, value, description) VALUES
('site_title', '抹茶OEM | 日本の抹茶を世界へ', 'サイトタイトル'),
('site_title_en', 'Matcha OEM | Premium Japanese Matcha for the World', 'サイトタイトル（英語）'),
('meta_description', '京都宇治産の最高品質抹茶をOEM・プライベートラベルで提供。海外バイヤー・ティーブランド・カフェ向けの抹茶OEM専門商社。', 'メタディスクリプション'),
('meta_description_en', 'Premium Uji Kyoto matcha for OEM and private label. Specialized matcha OEM supplier for overseas buyers, tea brands, and cafés.', 'メタディスクリプション（英語）'),
('contact_email', 'info@matcha-oem.jp', 'お問い合わせ先メール'),
('instagram_url', '', 'Instagram URL'),
('twitter_url', '', 'Twitter/X URL'),
('linkedin_url', '', 'LinkedIn URL'),
('facebook_url', '', 'Facebook URL'),
('primary_color', '#2D5016', 'プライマリカラー（深緑）'),
('secondary_color', '#C9A84C', 'セカンダリカラー（ゴールド）'),
('privacy_policy', '## プライバシーポリシー

当社は、お客様の個人情報の保護を重要な責務と考え、適切に管理・運用いたします。

### 1. 個人情報の収集
当サイトでは、お問い合わせや注文の際に、会社名・氏名・メールアドレス等の個人情報をご提供いただく場合があります。

### 2. 利用目的
収集した個人情報は、以下の目的のみに使用いたします：
- ご注文・お問い合わせへの対応
- 商品・サービスに関するご連絡
- 当社サービスの改善

### 3. 第三者への提供
法令に基づく場合を除き、お客様の同意なく第三者に個人情報を提供することはありません。

### 4. 安全管理
個人情報の漏洩・紛失・破壊を防ぐため、適切な安全管理措置を講じます。

### 5. お問い合わせ
個人情報の取扱いに関するお問い合わせは、info@matcha-oem.jp までご連絡ください。', 'プライバシーポリシー本文'),
('terms_of_service', '## 利用規約

### 1. サービスの利用
本サイトをご利用いただくことで、以下の利用規約に同意いただいたものとみなします。

### 2. 注文・契約
商品の注文は、当社による受注確認メールの送信をもって契約成立といたします。

### 3. 価格・決済
表示価格はUSDベースです。PayPal決済または銀行振込に対応しています。

### 4. キャンセル・返品
製造前のキャンセルは可能です。製造開始後のキャンセルはお受けできない場合があります。

### 5. 免責事項
天災・戦争・感染症等の不可抗力による納期遅延については責任を負いかねます。

### 6. 準拠法
本規約は日本法に準拠し、京都地方裁判所を専属合意管轄裁判所とします。', '利用規約本文');

-- =====================================================
-- お知らせ初期データ
-- =====================================================
INSERT INTO news_posts (title, title_en, slug, content, content_en, excerpt, excerpt_en, category, is_published, published_at) VALUES
(
  '抹茶OEM公式サイトをリニューアルしました',
  'We Have Launched Our New Matcha OEM Website',
  'website-renewal-launch',
  '## 公式サイトリニューアルのお知らせ

この度、抹茶OEMの公式サイトをリニューアルいたしました。

新しいサイトでは、以下の機能が強化されています：
- 商品グレードの詳細情報
- オンラインサンプル注文機能
- 見積依頼フォームの改善
- 多言語対応（英語）

引き続きよろしくお願いいたします。',
  '## Website Renewal Announcement

We are pleased to announce the launch of our new official Matcha OEM website.

The new site features enhanced capabilities including:
- Detailed product grade information
- Online sample ordering system
- Improved quote request form
- Multilingual support (English)

Thank you for your continued support.',
  '公式サイトをリニューアルしました。新機能・改善点についてお知らせします。',
  'We have launched our new official website with enhanced features and improvements.',
  'news',
  true,
  NOW()
);
