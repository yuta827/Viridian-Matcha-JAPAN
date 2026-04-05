// Direct SQL execution via Supabase REST API
const https = require('https');

const SUPABASE_URL = 'ynbppzqonxglslhhuawe.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InluYnBwenFvbnhnbHNsaGh1YXdlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTI4MDcwOCwiZXhwIjoyMDkwODU2NzA4fQ.O1YK1V358vFQv55VWxgcOZuWRq3Exm8krcRLBx9HRgs';

function request(path, method, body) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const options = {
      hostname: SUPABASE_URL,
      path,
      method,
      headers: {
        'Content-Type': 'application/json',
        'apikey': SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
        'Prefer': 'return=representation'
      }
    };
    if (data) options.headers['Content-Length'] = Buffer.byteLength(data);

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body }));
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

// Test connection by checking products table
async function testConnection() {
  const res = await request('/rest/v1/products?limit=1', 'GET');
  console.log('Connection test:', res.status, res.body.substring(0, 100));
  return res.status;
}

async function main() {
  console.log('Testing Supabase connection...');
  const status = await testConnection();
  
  if (status === 200) {
    console.log('✅ Tables already exist!');
  } else if (status === 404) {
    console.log('❌ Tables not found. Need to create schema manually in Supabase Dashboard.');
    console.log('\nPlease go to: https://supabase.com/dashboard/project/ynbppzqonxglslhhuawe/sql/new');
    console.log('And run the SQL from: scripts/schema.sql');
  } else {
    console.log(`Status: ${status} - may need manual setup`);
  }
}

main();
