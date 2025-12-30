// database/migrations/003_create_leavetypes_table.js
module.exports = {
    async up(db) {
        console.log('📋 Creating leave_types table...');
        
        await db.execute(`
            CREATE TABLE IF NOT EXISTS leave_types (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                leave_name TEXT NOT NULL UNIQUE,
                color TEXT DEFAULT 'primary',
                entitled_days INTEGER NOT NULL CHECK(entitled_days >= 0),
                gender_restriction TEXT CHECK(gender_restriction IN 
                    ('All', 'Male', 'Female', 'Other', 'None')),
                description TEXT,
                carry_forward_days INTEGER,
                status TEXT DEFAULT 'Active' CHECK(status IN ('Active', 'Inactive', 'Archived')),
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);
        
        console.log('✅ Leave_types table created');
    },

    async down(db) {
        console.log('⚠️  WARNING: This will DELETE ALL leave type data!');
        console.log('🗑️  Dropping leave_types table...');
        await db.execute('DROP TABLE IF EXISTS leave_types');
        console.log('✅ Leave_types table dropped');
    }
};