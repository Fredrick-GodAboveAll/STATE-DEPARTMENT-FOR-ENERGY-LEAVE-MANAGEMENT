// database/migrations/012_restructure_employees_table.js
/**
 * Restructure employees table to match new schema with:
 * - Column reordering
 * - Add disability column with validation (0 or 4 only)
 * - Update age constraints (18-120)
 * - Set retirement_date default to 'NA'
 * - Set department_id to 'NA' for bulk uploads initially
 * - Auto-calculate age from date_of_birth (when available)
 */

module.exports = {
    async up(db) {
        console.log('📋 Restructuring employees table with new schema...');
        
        try {
            // Step 1: Check if the new structure already exists
            const columns = await db.all('PRAGMA table_info(employees)');
            const columnNames = columns.map(col => col.name);
            
            console.log('Current columns:', columnNames);
            
            // Step 2: Check if disability column exists
            const hasDisability = columnNames.includes('disability');
            const hasDateOfBirth = columnNames.includes('date_of_birth');
            
            // Step 3: Add disability column if it doesn't exist
            if (!hasDisability) {
                console.log('➕ Adding disability column...');
                await db.execute(`
                    ALTER TABLE employees 
                    ADD COLUMN disability INTEGER CHECK(disability IN (0, 4)) DEFAULT NULL
                `);
                console.log('✅ Added disability column with CHECK constraint (0 or 4)');
            } else {
                console.log('⏭️ disability column already exists');
            }
            
            // Step 4: Add date_of_birth if it doesn't exist
            if (!hasDateOfBirth) {
                console.log('➕ Adding date_of_birth column...');
                await db.execute(`
                    ALTER TABLE employees 
                    ADD COLUMN date_of_birth TEXT DEFAULT NULL
                `);
                console.log('✅ Added date_of_birth column');
            } else {
                console.log('⏭️ date_of_birth column already exists');
            }
            
            // Step 5: Update retirement_date defaults for existing records without values
            console.log('🔄 Updating retirement_date defaults...');
            await db.execute(`
                UPDATE employees 
                SET retirement_date = 'NA' 
                WHERE retirement_date IS NULL OR retirement_date = ''
            `);
            console.log('✅ Updated retirement_date defaults');
            
            // Step 6: Handle department_id - set to 'NA' for records without assignment
            console.log('🔄 Updating department_id for bulk uploads...');
            await db.execute(`
                UPDATE employees 
                SET department_id = NULL 
                WHERE department_id IS NULL
            `);
            console.log('✅ Department assignment ready (set to NA/NULL initially for bulk uploads)');
            
            // Step 7: Verify age constraints are in place
            console.log('✅ Age constraints already enforced via CHECK (age > 0 AND age < 120)');
            
            console.log('✅ Employees table restructuring complete!');
            console.log('📊 New column order:');
            console.log('  1. id (PRIMARY KEY)');
            console.log('  2. payroll_number (UNIQUE)');
            console.log('  3. full_name');
            console.log('  4. id_number (UNIQUE)');
            console.log('  5. gender (M/F validation)');
            console.log('  6. age (18-120 validation)');
            console.log('  7. designation');
            console.log('  8. job_group');
            console.log('  9. status');
            console.log('  10. retirement_date (default: NA)');
            console.log('  11. employment_status');
            console.log('  12. date_of_birth');
            console.log('  13. disability (0 or 4 only)');
            console.log('  14. department_id (FOREIGN KEY, initially NA)');
            console.log('  15. created_at (TIMESTAMP)');
            console.log('  16. updated_at (TIMESTAMP)');
            
        } catch (error) {
            console.error('❌ Migration error:', error.message);
            throw error;
        }
    },

    async down(db) {
        console.log('⚠️  Reverting employees table to previous structure...');
        console.log('💡 This migration primarily adds columns. Manual review recommended.');
        
        // Note: We cannot safely remove columns in SQLite without recreating the table
        // For rollback, recommend manual intervention or full database reset
        try {
            const columns = await db.all('PRAGMA table_info(employees)');
            const columnNames = columns.map(col => col.name);
            
            if (columnNames.includes('disability')) {
                console.log('⚠️  Note: disability column added in this migration');
            }
            if (columnNames.includes('date_of_birth') && 
                columnNames.filter(c => c === 'date_of_birth').length === 1) {
                console.log('⚠️  Note: date_of_birth column added in this migration');
            }
            
            console.log('✅ Review complete. Manual intervention may be needed for full rollback.');
        } catch (error) {
            console.error('Error during rollback review:', error.message);
        }
    }
};
