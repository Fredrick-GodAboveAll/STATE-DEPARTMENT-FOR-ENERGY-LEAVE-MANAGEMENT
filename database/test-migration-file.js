// database/test-migration-file.js
const fs = require('fs');
const path = require('path');

async function testMigrationFile() {
    console.log('🔍 Checking migration file...\n');
    
    const migrationPath = path.join(__dirname, 'migrations', '002_create_holidays_table.js');
    
    try {
        // 1. Check if file exists
        console.log(`1. File exists: ${fs.existsSync(migrationPath) ? '✅ Yes' : '❌ No'}`);
        
        // 2. Read the file content
        const content = fs.readFileSync(migrationPath, 'utf8');
        console.log(`\n2. File size: ${content.length} characters`);
        
        // 3. Try to require it
        console.log('\n3. Trying to require the file...');
        const migration = require(migrationPath);
        
        console.log(`   Type of migration: ${typeof migration}`);
        console.log(`   Is object: ${typeof migration === 'object'}`);
        
        if (typeof migration === 'object') {
            console.log(`   Has up function: ${typeof migration.up === 'function' ? '✅ Yes' : '❌ No'}`);
            console.log(`   Has down function: ${typeof migration.down === 'function' ? '✅ Yes' : '❌ No'}`);
            console.log(`   Object keys: ${Object.keys(migration).join(', ')}`);
        }
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

testMigrationFile();