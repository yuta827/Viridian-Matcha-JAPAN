// Apply schema via Supabase REST API using rpc or direct table creation
const https = require('https');
const fs = require('fs');

const SUPABASE_URL = 'ynbppzqonxglslhhuawe.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InluYnBwenFvbnhnbHNsaGh1YXdlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTI4MDcwOCwiZXhwIjoyMDkwODU2NzA4fQ.O1YK1V358vFQv55VWxgcOZuWRq3Exm8krcRLBx9HRgs';

function post(path, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const options = {
      hostname: SUPABASE_URL,
      path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SERVICE_KEY,
        'Authorization': `Bearer ${SERVICE_KEY}`,
        'Content-Length': Buffer.byteLength(data),
        'Prefer': 'return=minimal'
      }
    };
    const req = https.request(options, (res) => {
      let b = '';
      res.on('data', c => b += c);
      res.on('end', () => resolve({ status: res.statusCode, body: b }));
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

// Try to call a custom function or use the pg_dump approach
// First, let's create the exec_sql function via rpc
async function tryCreateFunction() {
  // Try to create a helper function via REST
  const res = await post('/rest/v1/rpc/version', {});
  console.log('version rpc:', res.status, res.body.substring(0, 100));
}

// Use Supabase's built-in query endpoint (requires management API token)
async function applyViaFetch() {
  const sql = fs.readFileSync('/home/user/webapp/scripts/schema.sql', 'utf8');
  
  // Supabase SQL endpoint (available in newer versions)
  const res = await post('/rest/v1/rpc/query', { sql });
  console.log('query rpc:', res.status, res.body.substring(0, 200));
}

async function main() {
  await tryCreateFunction();
  
  // Try pg_net or other approaches
  // The best approach is to use Supabase's SQL editor endpoint
  const res = await post('/rest/v1/rpc/exec', { sql: 'SELECT 1' });
  console.log('exec rpc:', res.status, res.body.substring(0, 100));
}

main().catch(console.error);
