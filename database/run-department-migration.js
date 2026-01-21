// database/run-department-migration.js
const Database = require('better-sqlite3');
const path = require('path');

async function runDepartmentMigration() {
    // Connect to your database (update the path)
    const dbPath = path.join(__dirname, '..', 'your-database.db');
    const db = new Database(dbPath, { verbose: console.log });
    
    console.log('🔄 Running department_id migration...');
    
    try {
        // Check if column exists
        const columns = db.prepare('PRAGMA table_info(employees)').all();
        const hasDeptId = columns.some(col => col.name === 'department_id');
        
        if (!hasDeptId) {
            // Add the column
            db.prepare('ALTER TABLE employees ADD COLUMN department_id INTEGER').run();
            console.log('✅ Added department_id column');
            
            // Create index
            db.prepare('CREATE INDEX IF NOT EXISTS idx_employees_department_id ON employees(department_id)').run();
            console.log('✅ Created index');
        } else {
            console.log('⏭️ department_id already exists');
        }
        
        console.log('✅ Migration complete!');
        
    } catch (error) {
        console.error('❌ Migration failed:', error.message);
    } finally {
        db.close();
    }
}

// Run if called directly
if (require.main === module) {
    runDepartmentMigration();
}

module.exports = runDepartmentMigration;