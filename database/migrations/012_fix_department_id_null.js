// database/migrations/012_fix_department_id_null.js
// Fix department_id values: Convert 'NA' string to NULL for foreign key constraint
module.exports = {
    async up(db) {
        console.log('🔧 Converting department_id = "NA" to NULL...');
        
        try {
            // Update any rows where department_id is the string 'NA' to NULL
            await db.execute(`
                UPDATE employees 
                SET department_id = NULL 
                WHERE department_id = 'NA' OR department_id = ''
            `);
            
            console.log('✅ Successfully converted department_id "NA" values to NULL');
        } catch (error) {
            console.error('❌ Error fixing department_id values:', error.message);
            throw error;
        }
    },

    async down(db) {
        console.log('⚠️  Rolling back department_id NULL values...');
        
        try {
            // This is a data migration, rollback is not practical
            console.log('⚠️  Note: This migration cannot be fully rolled back as it converts data');
        } catch (error) {
            console.error('❌ Error rolling back:', error.message);
            throw error;
        }
    }
};
