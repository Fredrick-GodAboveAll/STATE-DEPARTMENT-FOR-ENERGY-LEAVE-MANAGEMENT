// database/check-after-first-migration.js
const connection = require('./connection');

async function checkAfterMigration() {
    console.log('🔍 Checking after migration...\n');
    
    await connection.connect();
    
    try {
        // 1. Check all tables
        const tables = await connection.all(`
            SELECT name FROM sqlite_master 
            WHERE type='table' 
            ORDER BY name
        `);
        
        console.log('📊 All tables now:');
        tables.forEach(table => {
            console.log(`   ${table.name}`);
        });
        
        console.log(`\n   Total: ${tables.length} tables`);
        
        // 2. Check migrations table
        console.log('\n📋 Migrations recorded:');
        const migrations = await connection.all('SELECT * FROM migrations ORDER BY id');
        
        if (migrations.length === 0) {
            console.log('   (none)');
        } else {
            migrations.forEach(m => {
                console.log(`   - ${m.name}`);
            });
        }
        
        // 3. Check users table specifically
        console.log('\n👤 Users table details:');
        const usersExists = tables.some(t => t.name === 'users');
        
        if (usersExists) {
            const columns = await connection.all('PRAGMA table_info(users)');
            console.log(`   ✅ Exists with ${columns.length} columns:`);
            columns.forEach(col => {
                console.log(`     - ${col.name} (${col.type})`);
            });
        } else {
            console.log('   ❌ Does not exist');
        }
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await connection.close();
    }
}

checkAfterMigration();