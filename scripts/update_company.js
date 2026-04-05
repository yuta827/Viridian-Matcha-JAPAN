const https = require('https');

const SUPABASE_URL = 'ynbppzqonxglslhhuawe.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InluYnBwenFvbnhnbHNsaGh1YXdlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTI4MDcwOCwiZXhwIjoyMDkwODU2NzA4fQ.O1YK1V358vFQv55VWxgcOZuWRq3Exm8krcRLBx9HRgs';

function upsert(table, data) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(data);
    const options = {
      hostname: SUPABASE_URL,
      path: `/rest/v1/${table}?on_conflict=key`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SERVICE_KEY,
        'Authorization': `Bearer ${SERVICE_KEY}`,
        'Prefer': 'resolution=merge-duplicates,return=minimal',
        'Content-Length': Buffer.byteLength(body),
      }
    };
    const req = https.request(options, (res) => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        console.log(`${table}: ${res.statusCode}`);
        if (res.statusCode >= 300) console.error('Error:', d.substring(0, 200));
        resolve(res.statusCode);
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function main() {
  const company = [
    { key: 'company_name',    value: 'KUU LLC（合同会社KUU）',      value_en: 'KUU LLC',                              label: '会社名' },
    { key: 'email',           value: 'maccha.kuu@gmail.com',          value_en: 'maccha.kuu@gmail.com',                 label: 'メール' },
    { key: 'phone',           value: '052-990-2209',                  value_en: '+81-52-990-2209',                      label: '電話' },
    { key: 'postal_code',     value: '〒461-0005',                   value_en: '461-0005',                             label: '郵便番号' },
    { key: 'address',         value: '愛知県名古屋市東区東桜2-17-25 レジディア東桜Ⅱ 207', value_en: 'Residia Higashisakura II 207, 2-17-25 Higashisakura, Higashi-ku, Nagoya-shi, Aichi, Japan', label: '住所' },
    { key: 'bank_name',       value: '住信SBIネット銀行',             value_en: 'SBI Sumishin Net Bank',                label: '銀行名' },
    { key: 'bank_code',       value: '0038',                          value_en: '0038',                                 label: '金融機関コード' },
    { key: 'bank_branch',     value: '法人第一支店',                  value_en: 'Corporate Branch 1',                   label: '支店名' },
    { key: 'bank_branch_code',value: '106',                           value_en: '106',                                  label: '支店コード' },
    { key: 'bank_account_type',value: '普通',                         value_en: 'Ordinary',                             label: '口座種別' },
    { key: 'bank_account_number', value: '3043430',                   value_en: '3043430',                              label: '口座番号' },
    { key: 'bank_account_name',   value: 'ド）クウ',                  value_en: 'KUU LLC',                              label: '口座名義' },
    { key: 'bank_swift',      value: 'NTSSJPJT',                     value_en: 'NTSSJPJT',                             label: 'SWIFTコード' },
    { key: 'bank_instructions', value: '振込手数料はお客様負担でお願いします。振込後はmaccha.kuu@gmail.comまでご連絡ください。', value_en: 'Please note that bank transfer fees are the responsibility of the sender. After transfer, please notify us at maccha.kuu@gmail.com.', label: '振込案内' },
    { key: 'about', value: '日本の厳選された茶園から最高品質の抹茶をお届けするOEM専門会社です。セレモニアルグレードから業務用まで15グレードをご用意しています。', value_en: 'We are a specialized matcha OEM company delivering Japan\'s finest matcha to global brands. We offer 15 grades from ceremonial to food industry grade.', label: '会社紹介' },
  ];

  for (const row of company) {
    await upsert('company_info', row);
  }
  console.log('\n✅ 会社情報の更新完了！');
}

main().catch(console.error);
