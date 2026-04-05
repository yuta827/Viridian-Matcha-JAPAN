-- =====================================================
-- 抹茶OEM販売サイト データベーススキーマ
-- =====================================================

-- UUID拡張有効化
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 商品テーブル
-- =====================================================
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  name_en TEXT,
  slug TEXT UNIQUE NOT NULL,
  line TEXT NOT NULL, -- 'premium' | 'standard' | 'organic'
  grade TEXT NOT NULL, -- グレード識別子
  grade_label TEXT NOT NULL, -- 表示用グレード名
  description TEXT,
  description_en TEXT,
  moq TEXT, -- 最小注文数量
  packaging TEXT, -- 包装形態
  origin TEXT DEFAULT '京都府宇治市', -- 産地
  usage TEXT, -- 用途提案
  is_orderable BOOLEAN DEFAULT false, -- オンライン注文可能か
  is_featured BOOLEAN DEFAULT false, -- おすすめ表示
  is_published BOOLEAN DEFAULT true, -- 公開/非公開
  sample_price NUMERIC(10,2), -- サンプル価格(USD/100g)
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 商品画像テーブル
-- =====================================================
CREATE TABLE IF NOT EXISTS product_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  is_primary BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 一般問い合わせテーブル
-- =====================================================
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name TEXT,
  contact_name TEXT NOT NULL,
  country TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  whatsapp TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  -- new/contacted/closed
  admin_memo TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 見積依頼テーブル
-- =====================================================
CREATE TABLE IF NOT EXISTS quotes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name TEXT,
  contact_name TEXT NOT NULL,
  country TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  whatsapp TEXT,
  product_interest TEXT[], -- 興味のある商品（複数）
  quantity TEXT,
  packaging_pref TEXT,
  target_market TEXT,
  desired_delivery TEXT,
  message TEXT,
  status TEXT DEFAULT 'new',
  -- new/contacted/sample_requested/quote_sent/awaiting_payment/
  -- payment_confirmed/in_production/shipped/completed/closed
  payment_method TEXT,
  -- paypal/bank_transfer
  admin_memo TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 注文テーブル
-- =====================================================
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number TEXT UNIQUE NOT NULL,
  company_name TEXT,
  contact_name TEXT NOT NULL,
  country TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  total_amount NUMERIC(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  payment_method TEXT NOT NULL,
  -- paypal/bank_transfer
  payment_status TEXT DEFAULT 'pending',
  -- pending/awaiting_payment/payment_confirmed/refunded/cancelled
  paypal_order_id TEXT,
  order_status TEXT DEFAULT 'new',
  -- new/confirmed/in_production/shipped/completed/cancelled
  shipping_address JSONB,
  shipping_country TEXT,
  bank_transfer_sent_at TIMESTAMPTZ,
  admin_memo TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 注文明細テーブル
-- =====================================================
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  product_grade TEXT,
  quantity INTEGER NOT NULL,
  unit_price NUMERIC(10,2) NOT NULL,
  subtotal NUMERIC(10,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- お知らせ・ブログテーブル
-- =====================================================
CREATE TABLE IF NOT EXISTS news_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  title_en TEXT,
  slug TEXT UNIQUE NOT NULL,
  content TEXT,
  content_en TEXT,
  excerpt TEXT,
  excerpt_en TEXT,
  thumbnail_url TEXT,
  category TEXT DEFAULT 'news',
  -- news/blog/update
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- FAQテーブル
-- =====================================================
CREATE TABLE IF NOT EXISTS faq_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question TEXT NOT NULL,
  question_en TEXT,
  answer TEXT NOT NULL,
  answer_en TEXT,
  category TEXT DEFAULT 'general',
  -- general/oem/shipping/payment/product/quality
  is_published BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- バナーテーブル
-- =====================================================
CREATE TABLE IF NOT EXISTS banners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  image_url TEXT,
  link_url TEXT,
  headline TEXT,
  headline_en TEXT,
  subheadline TEXT,
  subheadline_en TEXT,
  cta_text TEXT,
  cta_text_en TEXT,
  cta_url TEXT,
  is_active BOOLEAN DEFAULT true,
  display_start TIMESTAMPTZ,
  display_end TIMESTAMPTZ,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- トップページセクションテーブル (CMS)
-- =====================================================
CREATE TABLE IF NOT EXISTS cms_sections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  section_key TEXT UNIQUE NOT NULL,
  -- hero/quality/grades/oem_flow/packages/sample_cta/faq_excerpt/contact_cta
  section_name TEXT NOT NULL,
  -- 管理画面表示名
  title TEXT,
  title_en TEXT,
  subtitle TEXT,
  subtitle_en TEXT,
  content JSONB DEFAULT '{}',
  -- セクション固有の柔軟なコンテンツ
  image_url TEXT,
  cta_text TEXT,
  cta_text_en TEXT,
  cta_url TEXT,
  is_visible BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 会社情報テーブル
-- =====================================================
CREATE TABLE IF NOT EXISTS company_info (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name TEXT DEFAULT '株式会社 抹茶OEM',
  company_name_en TEXT DEFAULT 'Matcha OEM Co., Ltd.',
  address TEXT,
  address_en TEXT,
  phone TEXT,
  email TEXT,
  business_hours TEXT,
  established_year TEXT,
  description TEXT,
  description_en TEXT,
  bank_transfer_info TEXT,
  -- 振込先案内文
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- サイト設定テーブル
-- =====================================================
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value TEXT,
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- インデックス作成
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_is_published ON products(is_published);
CREATE INDEX IF NOT EXISTS idx_products_is_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_products_line ON products(line);
CREATE INDEX IF NOT EXISTS idx_product_images_product_id ON product_images(product_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quotes_status ON quotes(status);
CREATE INDEX IF NOT EXISTS idx_quotes_created_at ON quotes(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_news_posts_slug ON news_posts(slug);
CREATE INDEX IF NOT EXISTS idx_news_posts_is_published ON news_posts(is_published);
CREATE INDEX IF NOT EXISTS idx_faq_items_category ON faq_items(category);
CREATE INDEX IF NOT EXISTS idx_faq_items_sort_order ON faq_items(sort_order);

-- =====================================================
-- updated_at 自動更新トリガー
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_inquiries_updated_at BEFORE UPDATE ON inquiries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_quotes_updated_at BEFORE UPDATE ON quotes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_news_posts_updated_at BEFORE UPDATE ON news_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_faq_items_updated_at BEFORE UPDATE ON faq_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_banners_updated_at BEFORE UPDATE ON banners
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_cms_sections_updated_at BEFORE UPDATE ON cms_sections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 注文番号自動生成関数
-- =====================================================
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT AS $$
DECLARE
  date_part TEXT;
  seq_num INTEGER;
  order_num TEXT;
BEGIN
  date_part := TO_CHAR(NOW(), 'YYYYMMDD');
  SELECT COUNT(*) + 1 INTO seq_num
  FROM orders
  WHERE created_at::DATE = NOW()::DATE;
  order_num := 'ORD-' || date_part || '-' || LPAD(seq_num::TEXT, 4, '0');
  RETURN order_num;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- RLS (Row Level Security) 設定
-- =====================================================
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- 公開データ（誰でも読める）
CREATE POLICY "公開商品は誰でも閲覧可能" ON products
  FOR SELECT USING (is_published = true);

CREATE POLICY "商品画像は誰でも閲覧可能" ON product_images
  FOR SELECT USING (true);

CREATE POLICY "公開ニュースは誰でも閲覧可能" ON news_posts
  FOR SELECT USING (is_published = true);

CREATE POLICY "公開FAQは誰でも閲覧可能" ON faq_items
  FOR SELECT USING (is_published = true);

CREATE POLICY "アクティブバナーは誰でも閲覧可能" ON banners
  FOR SELECT USING (is_active = true);

CREATE POLICY "CMSセクションは誰でも閲覧可能" ON cms_sections
  FOR SELECT USING (true);

CREATE POLICY "会社情報は誰でも閲覧可能" ON company_info
  FOR SELECT USING (true);

CREATE POLICY "サイト設定は誰でも閲覧可能" ON site_settings
  FOR SELECT USING (true);

-- 問い合わせ・見積・注文の投稿（誰でも作成可能）
CREATE POLICY "問い合わせは誰でも作成可能" ON inquiries
  FOR INSERT WITH CHECK (true);

CREATE POLICY "見積依頼は誰でも作成可能" ON quotes
  FOR INSERT WITH CHECK (true);

CREATE POLICY "注文は誰でも作成可能" ON orders
  FOR INSERT WITH CHECK (true);

CREATE POLICY "注文明細は誰でも作成可能" ON order_items
  FOR INSERT WITH CHECK (true);

-- 管理者（service_role）は全操作可能
CREATE POLICY "管理者は商品を全操作可能" ON products
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "管理者は商品画像を全操作可能" ON product_images
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "管理者は問い合わせを全操作可能" ON inquiries
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "管理者は見積を全操作可能" ON quotes
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "管理者は注文を全操作可能" ON orders
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "管理者は注文明細を全操作可能" ON order_items
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "管理者はニュースを全操作可能" ON news_posts
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "管理者はFAQを全操作可能" ON faq_items
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "管理者はバナーを全操作可能" ON banners
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "管理者はCMSを全操作可能" ON cms_sections
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "管理者は会社情報を全操作可能" ON company_info
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "管理者はサイト設定を全操作可能" ON site_settings
  FOR ALL USING (auth.role() = 'service_role');
