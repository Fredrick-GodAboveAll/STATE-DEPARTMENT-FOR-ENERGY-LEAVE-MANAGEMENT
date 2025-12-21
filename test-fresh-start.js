// test-fresh-start.js (put this in root folder)
const database = require('./database');

async function testFreshStart() {
    console.log('🚀 Testing fresh database start...\n');
    
    try {
        console.log('1. Deleting old database if exists...');
        const fs = require('fs');
        if (fs.existsSync('./auth.db')) {
            fs.unlinkSync('./auth.db');
            console.log('🗑️  Deleted old database');
        }
        
        console.log('\n2. Initializing fresh database...');
        await database.initializeDatabase();
        console.log('✅ Database initialized!\n');
        
        console.log('3. Checking what was created...');
        const status = await database.db.getStatus();
        
        console.log(`   Tables created: ${status.tables.length}`);
        console.log('   List of tables:');
        status.tables.forEach((table, i) => {
            console.log(`     ${i+1}. ${table.name} (${table.count} rows)`);
        });
        
        console.log('\n✅ SUCCESS! Database created from scratch!');
        console.log('🎉 Your migration system is working!');
        
    } catch (error) {
        console.error('\n❌ FAILED:', error.message);
        if (error.code === 'SQLITE_ERROR') {
            console.error('SQLite error code:', error.code);
        }
    } finally {
        if (database.db && database.db.close) {
            await database.db.close();
        }
    }
}

testFreshStart();