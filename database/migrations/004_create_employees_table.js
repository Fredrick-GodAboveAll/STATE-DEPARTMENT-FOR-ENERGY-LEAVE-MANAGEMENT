// database/migrations/004_create_employees_table.js
module.exports = {
    async up(db) {
        console.log('📋 Creating employees table...');
        
        await db.execute(`
            CREATE TABLE IF NOT EXISTS employees (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                payroll_number TEXT UNIQUE NOT NULL,
                full_name TEXT NOT NULL,
                id_number TEXT UNIQUE NOT NULL,
                gender TEXT CHECK(gender IN ('M', 'F')),
                age INTEGER CHECK(age > 0 AND age < 120),
                designation TEXT NOT NULL,
                job_group TEXT,
                status TEXT,                    -- From "Employment Status" column (0 - Active, etc.)
                retirement_date TEXT,           -- From "ROD" column (dd/mm/yyyy format)
                employment_status TEXT,         -- From "Engage Name" column (Permanent, Contract, etc.)
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);
        
        console.log('✅ Employees table created');
    },

    async down(db) {
        console.log('⚠️  WARNING: This will DELETE ALL employee data!');
        console.log('🗑️  Dropping employees table...');
        await db.execute('DROP TABLE IF EXISTS employees');
        console.log('✅ Employees table dropped');
    }
};