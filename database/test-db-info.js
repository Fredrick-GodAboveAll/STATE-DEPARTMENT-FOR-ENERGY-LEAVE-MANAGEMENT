// database/test-db-info.js
const migrationRunner = require('./migrations');

async function testDbInfo() {
    console.log('🧪 Testing getDatabaseInfo() method...\n');
    
    try {
        // Test that the method exists
        if (typeof migrationRunner.getDatabaseInfo === 'function') {
            console.log('✅ getDatabaseInfo() method exists');
            
            // Try to call it
            const tables = await migrationRunner.getDatabaseInfo();
            console.log(`✅ Method works! Found ${tables.length} tables:`);
            
            tables.forEach(table => {
                console.log(`  - ${table.name}`);
            });
            
            console.log('\n🎉 Fix is working! Your app should start without errors now.');
        } else {
            console.log('❌ getDatabaseInfo() method does not exist');
        }
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

testDbInfo();