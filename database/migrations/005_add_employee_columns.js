// database/migrations/007_add_employee_columns.js
module.exports = {
    async up(db) {
        console.log('➕ Adding new columns to employees table...');
        
        // Check current columns
        const columns = await db.all('PRAGMA table_info(employees)');
        const columnNames = columns.map(col => col.name);
        
        // Add date_of_birth if not exists
        if (!columnNames.includes('date_of_birth')) {
            await db.execute('ALTER TABLE employees ADD COLUMN date_of_birth TEXT');
            console.log('✅ Added date_of_birth column');
        } else {
            console.log('⏭️ date_of_birth column already exists');
        }
        
        // Add disability if not exists
        if (!columnNames.includes('disability')) {
            await db.execute('ALTER TABLE employees ADD COLUMN disability TEXT CHECK(disability IN (\'yes\', \'no\'))');
            console.log('✅ Added disability column');
        } else {
            console.log('⏭️ disability column already exists');
        }
        
        console.log('✅ Employee columns migration complete');
    },

    async down(db) {
        console.log('⚠️  SQLite cannot remove columns easily');
        console.log('⚠️  Manual intervention required to remove columns');
        console.log('💡 To remove: Create new table without columns, copy data, rename');
    }
};