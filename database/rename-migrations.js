// database/rename-migrations.js
const fs = require('fs');
const path = require('path');

async function renameMigrations() {
    console.log('🔄 Renaming migration files to correct order...\n');
    
    const migrationsDir = path.join(__dirname, 'migrations');
    
    // Define the correct order
    const correctOrder = [
        '001_create_users_table.js',
        '002_create_holidays_table.js',
        '003_create_leavetypes_table.js',
        '004_create_employees_table.js',
        '005_add_employee_columns.js',
        '006_create_resets_table.js',
        '007_create_profiles_table.js'
    ];
    
    // Get current files
    const files = fs.readdirSync(migrationsDir)
        .filter(file => file.endsWith('.js') && file !== 'migration-template.js');
    
    console.log('📁 Current files:');
    files.forEach(file => console.log(`  ${file}`));
    
    // Check if we need to rename
    if (files.includes('003_add_employee_columns.js') && files.includes('004_create_employees_table.js')) {
        console.log('\n❌ Problem found: Employee columns migration (003) runs before employees table (004)');
        console.log('💡 We need to rename 003_add_employee_columns.js to 005_add_employee_columns.js');
        
        // Rename the problematic file
        const oldPath = path.join(migrationsDir, '003_add_employee_columns.js');
        const newPath = path.join(migrationsDir, '005_add_employee_columns.js');
        
        if (fs.existsSync(oldPath)) {
            fs.renameSync(oldPath, newPath);
            console.log('✅ Renamed: 003_add_employee_columns.js → 005_add_employee_columns.js');
        }
        
        // Rename other files if needed
        if (fs.existsSync(path.join(migrationsDir, '005_create_resets_table.js'))) {
            fs.renameSync(
                path.join(migrationsDir, '005_create_resets_table.js'),
                path.join(migrationsDir, '006_create_resets_table.js')
            );
            console.log('✅ Renamed: 005_create_resets_table.js → 006_create_resets_table.js');
        }
        
        if (fs.existsSync(path.join(migrationsDir, '006_create_profiles_table.js'))) {
            fs.renameSync(
                path.join(migrationsDir, '006_create_profiles_table.js'),
                path.join(migrationsDir, '007_create_profiles_table.js')
            );
            console.log('✅ Renamed: 006_create_profiles_table.js → 007_create_profiles_table.js');
        }
        
        console.log('\n✅ Files renamed successfully!');
        
        // Show new file list
        const newFiles = fs.readdirSync(migrationsDir)
            .filter(file => file.endsWith('.js') && file !== 'migration-template.js')
            .sort();
        
        console.log('\n📁 New file order:');
        newFiles.forEach(file => console.log(`  ${file}`));
        
    } else {
        console.log('\n✅ Files are already in correct order');
    }
}

renameMigrations();