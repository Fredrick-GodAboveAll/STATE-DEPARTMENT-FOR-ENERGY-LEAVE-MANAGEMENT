// database/check-tables-simple.js
const connection = require('./connection');

async function checkTables() {
    console.log('📋 Checking tables...');
    
    await connection.connect();
    const db = connection.getConnection();
    
    try {
        // Use connection.all() instead of db.all()
        const tables = await connection.all(`
            SELECT name FROM sqlite_master 
            WHERE type='table' 
            ORDER BY name
        `);
        
        console.log('\n📊 All tables in your database:');
        console.log('==============================');
        
        tables.forEach(table => {
            console.log(`✅ ${table.name}`);
        });
        
        console.log(`\nTotal: ${tables.length} tables`);
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await connection.close();
    }
}

checkTables();