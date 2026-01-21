module.exports = {
    async up(db) {
        console.log('🔄 Adding department_id column to employees table...');

        // Check if department_id column already exists
        const columns = await db.all('PRAGMA table_info(employees)');
        const columnNames = columns.map(col => col.name);

        if (!columnNames.includes('department_id')) {
            // Add the department_id column (allows NULL for unassigned)
            await db.execute('ALTER TABLE employees ADD COLUMN department_id INTEGER');
            console.log('✅ Added department_id column to employees');
            
            // Create index for better query performance
            await db.execute('CREATE INDEX IF NOT EXISTS idx_employees_department_id ON employees(department_id)');
            console.log('✅ Created index on department_id');
        } else {
            console.log('⏭️ department_id column already exists');
        }

        console.log('✅ Migration 010 complete: department_id added to employees');
    },

    async down(db) {
        console.log('⚠️  SQLite cannot remove columns via ALTER TABLE');
        console.log('⚠️  To rollback this migration, you would need to:');
        console.log('⚠️  1. Create a new table without department_id');
        console.log('⚠️  2. Copy data over');
        console.log('⚠️  3. Drop old table and rename');
        console.log('⚠️  Or manually set department_id to NULL for all rows');
    }
};