const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const client = new Client({
  host: 'db.ynbppzqonxglslhhuawe.supabase.co',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: 'Tori&koji999',
  ssl: { rejectUnauthorized: false }
});

async function main() {
  try {
    console.log('Connecting to Supabase PostgreSQL...');
    await client.connect();
    console.log('✅ Connected!');
    
    const sql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    
    // Split by semicolons and run each statement
    const statements = sql
      .split(/;\s*\n/)
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));
    
    console.log(`Running ${statements.length} statements...`);
    
    for (let i = 0; i < statements.length; i++) {
      const stmt = statements[i];
      if (!stmt) continue;
      try {
        await client.query(stmt + ';');
        process.stdout.write('.');
      } catch (err) {
        if (err.message.includes('already exists') || err.message.includes('duplicate')) {
          process.stdout.write('s'); // skip
        } else {
          console.error(`\n❌ Error at statement ${i}: ${err.message}`);
          console.error('Statement:', stmt.substring(0, 100));
        }
      }
    }
    
    console.log('\n✅ Schema applied successfully!');
    
    // Verify tables
    const res = await client.query(`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `);
    console.log('\nTables created:');
    res.rows.forEach(row => console.log(' -', row.table_name));
    
  } catch (err) {
    console.error('Connection error:', err.message);
  } finally {
    await client.end();
  }
}

main();
