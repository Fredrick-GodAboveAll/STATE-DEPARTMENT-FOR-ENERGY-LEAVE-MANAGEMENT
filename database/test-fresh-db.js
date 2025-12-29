// database/test-fresh-db.js
const database = require('./database');

async function testFreshDb() {
    console.log('🧪 Testing fresh database creation...\n');
    
    try {
        console.log('1. Initializing database from scratch...');
        await database.initializeDatabase();
        console.log('✅ Database initialized successfully!\n');
        
        console.log('2. Checking database status...');
        const status = await database.db.getStatus();
        
        console.log('   Database Status:');
        console.log(`     Path: ${status.databasePath}`);
        console.log(`     Connected: ${status.connected ? '✅ Yes' : '❌ No'}`);
        console.log(`     Initialized: ${status.initialized ? '✅ Yes' : '❌ No'}\n`);
        
        console.log('3. Checking tables created...');
        if (status.tables && status.tables.length > 0) {
            console.log('   📋 Tables Summary:');
            status.tables.forEach(table => {
                const tableName = table.name || 'unknown';
                const recordCount = table.count || 0;
                console.log(`     ${tableName.padEnd(20)}: ${recordCount} records`);
            });
            console.log(`\n   Total tables: ${status.tables.length}`);
        } else {
            console.log('   ❌ No tables found');
        }
        
        console.log('\n🎉 Fresh database test passed!');
        console.log('🚀 Your app can now create databases from scratch!');
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
        console.error(error.stack);
    } finally {
        await database.db.close();
    }
}

testFreshDb();