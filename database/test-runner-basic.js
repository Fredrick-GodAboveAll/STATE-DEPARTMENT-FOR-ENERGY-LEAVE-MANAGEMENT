// database/test-runner-basic.js
const migrationRunner = require('./migrations');

async function testBasic() {
    console.log('🧪 Testing basic migration runner...\n');
    
    try {
        await migrationRunner.createTables();
        console.log('\n✅ Basic runner works!');
    } catch (error) {
        console.error('\n❌ Test failed:', error.message);
    }
}

testBasic();