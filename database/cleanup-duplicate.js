// database/cleanup-duplicate.js
const fs = require('fs');
const path = require('path');

function cleanup() {
    console.log('🧹 Cleaning up duplicate files...\n');
    
    const migrationsDir = path.join(__dirname, 'migrations');
    
    // List of files that should exist
    const expectedFiles = [
        '001_create_users_table.js',
        '002_create_holidays_table.js',
        '003_create_leavetypes_table.js',
        '004_create_employees_table.js',
        '005_add_employee_columns.js',
        '006_create_resets_table.js',
        '007_create_profiles_table.js',
        'migration-template.js'
    ];
    
    // Get all files
    const allFiles = fs.readdirSync(migrationsDir);
    
    console.log('📁 Current files:');
    allFiles.forEach(file => {
        if (expectedFiles.includes(file)) {
            console.log(`   ✅ ${file}`);
        } else {
            console.log(`   🗑️  ${file} (to delete)`);
            const filePath = path.join(migrationsDir, file);
            fs.unlinkSync(filePath);
            console.log(`       Deleted`);
        }
    });
    
    console.log('\n✅ Cleanup complete!');
}

cleanup();
