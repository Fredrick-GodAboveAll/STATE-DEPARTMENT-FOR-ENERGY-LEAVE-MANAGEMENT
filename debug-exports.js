// debug-exports.js
console.log('🔍 Debugging database exports...\n');

try {
    // First, let's check what each repository exports
    console.log('1. Checking repository exports:');
    
    const UserRepo = require('./database/repositories/UserRepository');
    console.log('- UserRepository:', typeof UserRepo, UserRepo ? '✅ Loaded' : '❌ Empty');
    
    const HolidayRepo = require('./database/repositories/HolidayRepository');
    console.log('- HolidayRepository:', typeof HolidayRepo, HolidayRepo ? '✅ Loaded' : '❌ Empty');
    
    const LeaveTypeRepo = require('./database/repositories/LeaveTypeRepository');
    console.log('- LeaveTypeRepository:', typeof LeaveTypeRepo, LeaveTypeRepo ? '✅ Loaded' : '❌ Empty');
    
    const EmployeeRepo = require('./database/repositories/EmployeeRepository');
    console.log('- EmployeeRepository:', typeof EmployeeRepo, EmployeeRepo ? '✅ Loaded' : '❌ Empty');
    
    const ResetRepo = require('./database/repositories/ResetRepository');
    console.log('- ResetRepository:', typeof ResetRepo, ResetRepo ? '✅ Loaded' : '❌ Empty');
    
    console.log('\n2. Checking database/index.js exports:');
    const database = require('./database');
    
    console.log('- database object keys:', Object.keys(database).join(', '));
    
    console.log('\n3. Checking specific exports:');
    console.log('- database.users:', database.users ? '✅ Exists' : '❌ Missing');
    console.log('- database.holidays:', database.holidays ? '✅ Exists' : '❌ Missing');
    console.log('- database.leaveTypes:', database.leaveTypes ? '✅ Exists' : '❌ Missing');
    console.log('- database.employees:', database.employees ? '✅ Exists' : '❌ Missing');
    console.log('- database.resets:', database.resets ? '✅ Exists' : '❌ Missing');
    console.log('- database.initializeDatabase:', typeof database.initializeDatabase);
    console.log('- database.db:', typeof database.db);
    
    console.log('\n4. Testing repository methods:');
    if (database.users && typeof database.users.findAll === 'function') {
        console.log('- database.users.findAll: ✅ Function exists');
    } else {
        console.log('- database.users.findAll: ❌ Missing or not a function');
    }
    
    if (database.holidays && typeof database.holidays.findAll === 'function') {
        console.log('- database.holidays.findAll: ✅ Function exists');
    } else {
        console.log('- database.holidays.findAll: ❌ Missing or not a function');
    }
    
} catch (error) {
    console.error('❌ Error:', error.message);
    console.error('\n🔍 Stack trace:');
    console.error(error.stack);
}