const https = require('https');

const SUPABASE_URL = 'https://ynbppzqonxglslhhuawe.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InluYnBwenFvbnhnbHNsaGh1YXdlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTI4MDcwOCwiZXhwIjoyMDkwODU2NzA4fQ.O1YK1V358vFQv55VWxgcOZuWRq3Exm8krcRLBx9HRgs';

const schema = `
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ===== PRODUCTS TABLE =====
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  name_en TEXT,
  slug TEXT UNIQUE NOT NULL,
  line TEXT NOT NULL CHECK (line IN ('premium', 'standard', 'organic')),
  grade TEXT NOT NULL,
  grade_label TEXT,
  grade_label_en TEXT,
  description TEXT,
  description_en TEXT,
  moq INTEGER DEFAULT 1,
  packaging TEXT,
  origin TEXT DEFAULT '京都府宇治・愛知県西尾',
  usage_suggestions TEXT,
  usage_suggestions_en TEXT,
  sample_price_usd DECIMAL(10,2),
  inquiry_type TEXT NOT NULL DEFAULT 'both' CHECK (inquiry_type IN ('order', 'inquiry', 'both')),
  is_recommended BOOLEAN DEFAULT false,
  is_visible BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===== PRODUCT IMAGES TABLE =====
CREATE TABLE IF NOT EXISTS product_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt TEXT,
  is_primary BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===== INQUIRIES TABLE =====
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  inquiry_number TEXT UNIQUE NOT NULL,
  company_name TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  country TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  interested_product TEXT,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  desired_quantity TEXT,
  packaging_preference TEXT,
  target_market TEXT,
  delivery_schedule TEXT,
  notes TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN (
    'new','contacted','sample_requested','quote_sent',
    'awaiting_payment','payment_confirmed','in_production',
    'shipped','completed','closed'
  )),
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===== QUOTES TABLE =====
CREATE TABLE IF NOT EXISTS quotes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quote_number TEXT UNIQUE NOT NULL,
  inquiry_id UUID REFERENCES inquiries(id) ON DELETE SET NULL,
  company_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  line_items JSONB DEFAULT '[]',
  subtotal_usd DECIMAL(10,2),
  shipping_usd DECIMAL(10,2),
  total_usd DECIMAL(10,2),
  valid_until DATE,
  payment_method TEXT CHECK (payment_method IN ('paypal', 'bank_transfer')),
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft','sent','accepted','rejected','expired')),
  notes TEXT,
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===== ORDERS TABLE =====
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number TEXT UNIQUE NOT NULL,
  order_type TEXT NOT NULL CHECK (order_type IN ('sample', 'oem')),
  company_name TEXT,
  contact_person TEXT,
  country TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  shipping_address JSONB,
  line_items JSONB DEFAULT '[]',
  subtotal_usd DECIMAL(10,2),
  shipping_usd DECIMAL(10,2) DEFAULT 0,
  total_usd DECIMAL(10,2),
  payment_method TEXT CHECK (payment_method IN ('paypal', 'bank_transfer')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN (
    'pending','awaiting_payment','payment_confirmed','failed','refunded'
  )),
  order_status TEXT DEFAULT 'new' CHECK (order_status IN (
    'new','processing','in_production','shipped','completed','cancelled'
  )),
  paypal_order_id TEXT,
  paypal_capture_id TEXT,
  bank_transfer_ref TEXT,
  quote_id UUID REFERENCES quotes(id) ON DELETE SET NULL,
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===== NEWS/BLOG TABLE =====
CREATE TABLE IF NOT EXISTS news_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  title_en TEXT,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  excerpt_en TEXT,
  content TEXT,
  content_en TEXT,
  thumbnail_url TEXT,
  category TEXT DEFAULT 'news',
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===== FAQ TABLE =====
CREATE TABLE IF NOT EXISTS faq_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question TEXT NOT NULL,
  question_en TEXT,
  answer TEXT NOT NULL,
  answer_en TEXT,
  category TEXT DEFAULT 'general',
  sort_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===== BANNERS TABLE =====
CREATE TABLE IF NOT EXISTS banners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT,
  title_en TEXT,
  subtitle TEXT,
  subtitle_en TEXT,
  image_url TEXT,
  link_url TEXT,
  link_text TEXT,
  link_text_en TEXT,
  sort_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===== CMS SECTIONS TABLE =====
CREATE TABLE IF NOT EXISTS cms_sections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  section_key TEXT UNIQUE NOT NULL,
  section_name TEXT NOT NULL,
  is_visible BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===== CMS CONTENTS TABLE =====
CREATE TABLE IF NOT EXISTS cms_contents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  section_key TEXT NOT NULL,
  content_key TEXT NOT NULL,
  content_type TEXT DEFAULT 'text' CHECK (content_type IN ('text','html','image','json')),
  value TEXT,
  value_en TEXT,
  label TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(section_key, content_key)
);

-- ===== COMPANY INFO TABLE =====
CREATE TABLE IF NOT EXISTS company_info (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  value_en TEXT,
  label TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===== SITE SETTINGS TABLE =====
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  label TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===== ADMIN NOTES TABLE =====
CREATE TABLE IF NOT EXISTS admin_notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  target_type TEXT NOT NULL,
  target_id UUID NOT NULL,
  note TEXT NOT NULL,
  created_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===== INDEXES =====
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_line ON products(line);
CREATE INDEX IF NOT EXISTS idx_products_visible ON products(is_visible);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_email ON inquiries(email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(order_status);
CREATE INDEX IF NOT EXISTS idx_orders_payment ON orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_news_slug ON news_posts(slug);
CREATE INDEX IF NOT EXISTS idx_news_published ON news_posts(is_published);
CREATE INDEX IF NOT EXISTS idx_faq_visible ON faq_items(is_visible);

-- ===== UPDATED_AT TRIGGER =====
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$ BEGIN
  CREATE TRIGGER trg_products_updated BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TRIGGER trg_inquiries_updated BEFORE UPDATE ON inquiries FOR EACH ROW EXECUTE FUNCTION update_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TRIGGER trg_quotes_updated BEFORE UPDATE ON quotes FOR EACH ROW EXECUTE FUNCTION update_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TRIGGER trg_orders_updated BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TRIGGER trg_news_updated BEFORE UPDATE ON news_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ===== ROW LEVEL SECURITY =====
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_contents ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_notes ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY IF NOT EXISTS "products_public_read" ON products FOR SELECT USING (is_visible = true);
CREATE POLICY IF NOT EXISTS "product_images_public_read" ON product_images FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "news_public_read" ON news_posts FOR SELECT USING (is_published = true);
CREATE POLICY IF NOT EXISTS "faq_public_read" ON faq_items FOR SELECT USING (is_visible = true);
CREATE POLICY IF NOT EXISTS "banners_public_read" ON banners FOR SELECT USING (is_visible = true);
CREATE POLICY IF NOT EXISTS "cms_sections_public_read" ON cms_sections FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "cms_contents_public_read" ON cms_contents FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "company_info_public_read" ON company_info FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "site_settings_public_read" ON site_settings FOR SELECT USING (true);

-- Public insert for inquiries and orders
CREATE POLICY IF NOT EXISTS "inquiries_public_insert" ON inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "orders_public_insert" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY IF NOT EXISTS "orders_public_select" ON orders FOR SELECT USING (true);

-- Service role full access (handled via service_role key)
`;

function executeSql(sql) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ query: sql });
    const url = new URL(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`);
    
    const options = {
      hostname: url.hostname,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(body);
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${body}`));
        }
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

// Use Supabase Management API to run SQL
function runSqlViaManagementApi(sql) {
  return new Promise((resolve, reject) => {
    const projectRef = 'ynbppzqonxglslhhuawe';
    const data = JSON.stringify({ query: sql });
    
    const options = {
      hostname: 'api.supabase.com',
      path: `/v1/projects/${projectRef}/database/query`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        console.log(`Status: ${res.statusCode}, Body: ${body.substring(0, 200)}`);
        resolve({ status: res.statusCode, body });
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function main() {
  console.log('Applying schema via Supabase...');
  try {
    const result = await runSqlViaManagementApi(schema);
    console.log('Result:', result);
  } catch (err) {
    console.error('Error:', err.message);
  }
}

main();
