// database/migrations/011_add_foreign_key_employees_department.js
module.exports = {
    async up(db) {
        console.log('🔗 Adding foreign key constraint for employees.department_id...');
        
        try {
            // SQLite has limited ALTER TABLE support, so we need to:
            // 1. Create a new table with the constraint
            // 2. Copy data from the old table
            // 3. Drop the old table
            // 4. Rename the new table
            
            // Create new employees table WITH foreign key constraint
            // NOTE: Must include ALL columns from current table (including date_of_birth and disability from migrations 005 & 007)
            await db.execute(`
                CREATE TABLE employees_new (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    payroll_number TEXT UNIQUE NOT NULL,
                    full_name TEXT NOT NULL,
                    id_number TEXT UNIQUE NOT NULL,
                    gender TEXT CHECK(gender IN ('M', 'F')),
                    age INTEGER CHECK(age > 0 AND age < 120),
                    designation TEXT NOT NULL,
                    job_group TEXT,
                    status TEXT,
                    retirement_date TEXT,
                    employment_status TEXT,
                    department_id INTEGER,
                    date_of_birth TEXT,
                    disability TEXT,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
                )
            `);
            console.log('✅ Created new employees table with foreign key constraint');
            
            // Copy all data from old table to new table
            // Use explicit column mapping to avoid mismatch
            await db.execute(`
                INSERT INTO employees_new 
                (id, payroll_number, full_name, id_number, gender, age, designation, job_group,
                 status, retirement_date, employment_status, department_id, date_of_birth, disability,
                 created_at, updated_at)
                SELECT id, payroll_number, full_name, id_number, gender, age, designation, job_group,
                 status, retirement_date, employment_status, department_id, date_of_birth, disability,
                 created_at, updated_at
                FROM employees
            `);
            console.log('✅ Migrated all employee data to new table');
            
            // Drop the old table
            await db.execute('DROP TABLE employees');
            console.log('✅ Dropped old employees table');
            
            // Rename the new table
            await db.execute('ALTER TABLE employees_new RENAME TO employees');
            console.log('✅ Renamed new table to employees');
            
            console.log('✅ Foreign key constraint added successfully!');
        } catch (error) {
            console.error('❌ Error adding foreign key constraint:', error.message);
            throw error;
        }
    },

    async down(db) {
        console.log('⚠️  WARNING: This will remove the foreign key constraint!');
        
        try {
            // Recreate employees table WITHOUT the foreign key constraint
            await db.execute(`
                CREATE TABLE employees_new (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    payroll_number TEXT UNIQUE NOT NULL,
                    full_name TEXT NOT NULL,
                    id_number TEXT UNIQUE NOT NULL,
                    gender TEXT CHECK(gender IN ('M', 'F')),
                    age INTEGER CHECK(age > 0 AND age < 120),
                    designation TEXT NOT NULL,
                    job_group TEXT,
                    status TEXT,
                    retirement_date TEXT,
                    employment_status TEXT,
                    department_id INTEGER,
                    date_of_birth TEXT,
                    disability TEXT,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            `);
            
            // Copy all data back
            await db.execute(`
                INSERT INTO employees_new 
                (id, payroll_number, full_name, id_number, gender, age, designation, job_group,
                 status, retirement_date, employment_status, department_id, date_of_birth, disability,
                 created_at, updated_at)
                SELECT id, payroll_number, full_name, id_number, gender, age, designation, job_group,
                 status, retirement_date, employment_status, department_id, date_of_birth, disability,
                 created_at, updated_at
                FROM employees
            `);
            
            // Drop the constrained table
            await db.execute('DROP TABLE employees');
            
            // Rename back
            await db.execute('ALTER TABLE employees_new RENAME TO employees');
            
            console.log('✅ Foreign key constraint removed (rollback complete)');
        } catch (error) {
            console.error('❌ Error rolling back foreign key constraint:', error.message);
            throw error;
        }
    }
};

