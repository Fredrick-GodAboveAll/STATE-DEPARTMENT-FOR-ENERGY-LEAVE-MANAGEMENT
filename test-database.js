// test-database-simple.js
const database = require('./database');

async function testDatabase() {
    try {
        console.log('🧪 Testing modular database...\n');
        
        // 1. Initialize database
        console.log('1. Initializing database...');
        await database.initializeDatabase();
        console.log('✅ Database initialized\n');
        
        // 2. Check if repositories exist
        console.log('2. Checking repository exports...');
        console.log(`- database.users: ${database.users ? '✅ Exists' : '❌ Missing'}`);
        console.log(`- database.holidays: ${database.holidays ? '✅ Exists' : '❌ Missing'}`);
        console.log(`- database.leaveTypes: ${database.leaveTypes ? '✅ Exists' : '❌ Missing'}`);
        console.log(`- database.employees: ${database.employees ? '✅ Exists' : '❌ Missing'}`);
        console.log(`- database.resets: ${database.resets ? '✅ Exists' : '❌ Missing'}\n`);
        
        // 3. Test HolidayRepository
        console.log('3. Testing HolidayRepository...');
        const holidays = await database.holidays.findAll();
        console.log(`✅ Total holidays: ${holidays.length}\n`);
        
        // 4. Test LeaveTypeRepository
        console.log('4. Testing LeaveTypeRepository...');
        const leaveTypes = await database.leaveTypes.findAll();
        console.log(`✅ Total leave types: ${leaveTypes.length}\n`);
        
        // 5. Test EmployeeRepository
        console.log('5. Testing EmployeeRepository...');
        const employees = await database.employees.findAll();
        console.log(`✅ Total employees: ${employees.length}\n`);
        
        // 6. Test UserRepository
        console.log('6. Testing UserRepository...');
        const users = await database.users.findAll();
        console.log(`✅ Total users: ${users.length}\n`);
        
        // 7. Test statistics
        console.log('7. Testing employee statistics...');
        const employeeStats = await database.employees.getStatistics();
        console.log(`✅ Employee stats: ${employeeStats.total} total employees\n`);
        
        // 8. Get database status
        console.log('8. Getting database status...');
        const status = await database.db.getStatus();
        console.log('✅ Database status retrieved\n');
        
        console.log('='.repeat(50));
        console.log('🎉 All tests passed! Database is working correctly.');
        console.log('='.repeat(50));
        
        // Close connection
        await database.db.close();
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
        console.error('Stack:', error.stack);
        process.exit(1);
    }
}

// Run test
testDatabase();