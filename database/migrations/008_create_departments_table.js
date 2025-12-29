// database/migrations/008_create_departments_table.js
module.exports = {
    async up(db) {
        console.log('📋 Creating departments table...');
        
        await db.execute(`
            CREATE TABLE IF NOT EXISTS departments (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL UNIQUE,
                code TEXT NOT NULL UNIQUE,
                description TEXT,
                status TEXT DEFAULT 'Active' CHECK(status IN ('Active', 'Inactive', 'Archived')),
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);
        
        console.log('✅ Departments table created');
    },

    async down(db) {
        console.log('⚠️  WARNING: This will DELETE ALL department data!');
        console.log('🗑️  Dropping departments table...');
        await db.execute('DROP TABLE IF EXISTS departments');
        console.log('✅ Departments table dropped');
    }
};