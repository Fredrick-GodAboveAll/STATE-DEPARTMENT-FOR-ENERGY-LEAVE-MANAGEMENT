// database/test-department-column.js
const { getDb } = require('./connection');

async function testDepartmentColumn() {
    const db = getDb();
    
    console.log('🔍 Testing department_id column...\n');
    
    // Check column exists
    const columns = await db.all('PRAGMA table_info(employees)');
    console.log('Columns in employees table:');
    columns.forEach(col => {
        console.log(`  ${col.name}: ${col.type}${col.notnull ? ' NOT NULL' : ''}${col.pk ? ' PRIMARY KEY' : ''}`);
    });
    
    // Check if column has data
    const result = await db.get(`
        SELECT 
            COUNT(*) as total_employees,
            SUM(CASE WHEN department_id IS NULL THEN 1 ELSE 0 END) as unassigned,
            SUM(CASE WHEN department_id IS NOT NULL THEN 1 ELSE 0 END) as assigned
        FROM employees
    `);
    
    console.log('\n📊 Current Status:');
    console.log(`  Total employees: ${result.total_employees}`);
    console.log(`  Assigned to departments: ${result.assigned} (${(result.assigned/result.total_employees*100).toFixed(1)}%)`);
    console.log(`  Unassigned: ${result.unassigned} (${(result.unassigned/result.total_employees*100).toFixed(1)}%)`);
    
    db.close();
}

if (require.main === module) {
    testDepartmentColumn().catch(console.error);
}

module.exports = testDepartmentColumn;