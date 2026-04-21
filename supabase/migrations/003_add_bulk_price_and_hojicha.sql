-- 003: 1kg商品価格カラム追加 & ほうじ茶ライン対応

-- bulk_price_usd カラム追加（1kgあたりの商品価格）
ALTER TABLE products ADD COLUMN IF NOT EXISTS bulk_price_usd NUMERIC(10,2);

-- line の CHECK制約を更新（hojichaを追加）
-- まず既存の制約を確認・削除
DO $$
BEGIN
  ALTER TABLE products DROP CONSTRAINT IF EXISTS products_line_check;
EXCEPTION WHEN others THEN NULL;
END$$;

ALTER TABLE products ADD CONSTRAINT products_line_check 
  CHECK (line IN ('premium', 'organic', 'standard', 'hojicha'));
