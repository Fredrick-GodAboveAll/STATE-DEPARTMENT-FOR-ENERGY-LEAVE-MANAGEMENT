// database/migrations/013_create_leave_applications_table.js
module.exports = {
    async up(db) {
        console.log('📋 Creating leave_applications table...');
        
        await db.execute(`
            CREATE TABLE IF NOT EXISTS leave_applications (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                ref_no TEXT UNIQUE NOT NULL,
                employee_id INTEGER NOT NULL,
                leave_type_id INTEGER NOT NULL,
                start_date TEXT NOT NULL,
                end_date TEXT NOT NULL,
                back_on TEXT NOT NULL,
                duration_days INTEGER NOT NULL,
                applied_on TEXT NOT NULL,
                letter_date TEXT,
                status TEXT DEFAULT 'Pending' CHECK(status IN ('Pending', 'Approved', 'Rejected', 'Cancelled')),
                reason TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
                FOREIGN KEY (leave_type_id) REFERENCES leave_types(id) ON DELETE CASCADE
            )
        `);
        
        console.log('✅ Leave applications table created');
    },

    async down(db) {
        console.log('⚠️  WARNING: This will DELETE ALL leave application data!');
        console.log('🗑️  Dropping leave_applications table...');
        await db.execute('DROP TABLE IF EXISTS leave_applications');
        console.log('✅ Leave applications table dropped');
    }
};