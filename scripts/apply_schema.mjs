/**
 * Supabase スキーマ適用スクリプト
 * Supabase Management API を使用してSQLを実行する
 */
import { readFileSync } from 'fs';

const PROJECT_REF = 'ynbppzqonxglslhhuawe';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InluYnBwenFvbnhnbHNsaGh1YXdlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTI4MDcwOCwiZXhwIjoyMDkwODU2NzA4fQ.O1YK1V358vFQv55VWxgcOZuWRq3Exm8krcRLBx9HRgs';

async function runSQL(sql, label) {
  console.log(`\n📦 ${label} を実行中...`);
  const res = await fetch(
    `https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SERVICE_KEY}`,
      },
      body: JSON.stringify({ query: sql }),
    }
  );

  const text = await res.text();
  if (res.ok) {
    console.log(`✅ ${label} 完了`);
    return true;
  } else {
    console.log(`❌ ${label} エラー (${res.status}):`, text.slice(0, 300));
    return false;
  }
}

// SQLを文ごとに分割して順番に実行
async function applyFile(filePath, label) {
  const sql = readFileSync(filePath, 'utf8');
  const ok = await runSQL(sql, label);
  return ok;
}

async function main() {
  console.log('🍵 抹茶OEM データベーススキーマ適用開始');
  console.log('========================================');

  const ok1 = await applyFile(
    './supabase/migrations/001_initial_schema.sql',
    'スキーマ作成'
  );

  if (ok1) {
    const ok2 = await applyFile(
      './supabase/migrations/002_seed_data.sql',
      'サンプルデータ投入'
    );
    if (ok2) {
      console.log('\n🎉 データベースのセットアップが完了しました！');
    }
  }
}

main().catch(console.error);
