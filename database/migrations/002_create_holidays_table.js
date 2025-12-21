// database/migrations/002_create_holidays_table.js
module.exports = {
    async up(db) {
        console.log('📋 Creating holidays table...');
        
        await db.execute(`
            CREATE TABLE IF NOT EXISTS holidays (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                holiday_name TEXT NOT NULL,
                holiday_date DATE NOT NULL,
                holiday_type TEXT CHECK(holiday_type IN 
                    ('Public Holiday', 'Company Holiday', 'Optional Holiday', 'Special Day')),
                year INTEGER NOT NULL,
                recurring BOOLEAN DEFAULT 0,
                description TEXT,
                created_by INTEGER,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (created_by) REFERENCES users (id) ON DELETE SET NULL
            )
        `);
        
        console.log('✅ Holidays table created');
    },

    async down(db) {
        console.log('⚠️  WARNING: This will DELETE ALL holiday data!');
        console.log('🗑️  Dropping holidays table...');
        await db.execute('DROP TABLE IF EXISTS holidays');
        console.log('✅ Holidays table dropped');
    }
};