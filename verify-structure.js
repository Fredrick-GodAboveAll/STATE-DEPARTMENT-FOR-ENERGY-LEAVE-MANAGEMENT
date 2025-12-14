// verify-structure.js
console.log('🔍 Verifying database structure...\n');

const fs = require('fs');
const path = require('path');

const requiredFiles = [
    'database/index.js',
    'database/connection.js',
    'database/migrations.js',
    'database/seed.js',
    'database/schemas/index.js',
    'database/schemas/user.schema.js',
    'database/schemas/holiday.schema.js',
    'database/schemas/leavetype.schema.js',
    'database/schemas/employee.schema.js',
    'database/schemas/reset.schema.js',
    'database/repositories/UserRepository.js',
    'database/repositories/HolidayRepository.js',
    'database/repositories/LeaveTypeRepository.js',
    'database/repositories/EmployeeRepository.js',
    'database/repositories/ResetRepository.js'
];

console.log('📁 Checking required files:');
let allFilesExist = true;

requiredFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        console.log(`✅ ${file}`);
    } else {
        console.log(`❌ ${file} - MISSING`);
        allFilesExist = false;
    }
});

console.log('\n📦 Checking exports in database/index.js:');
try {
    const dbExports = require('./database');
    const exportKeys = Object.keys(dbExports);
    
    const requiredExports = [
        'db',
        'initializeDatabase',
        'users',
        'holidays',
        'leaveTypes',
        'employees',
        'resets'
    ];
    
    requiredExports.forEach(exp => {
        if (exportKeys.includes(exp)) {
            console.log(`✅ ${exp}`);
        } else {
            console.log(`❌ ${exp} - Missing export`);
            allFilesExist = false;
        }
    });
    
} catch (error) {
    console.log(`❌ Error loading database module: ${error.message}`);
    allFilesExist = false;
}

console.log('\n' + '='.repeat(50));
if (allFilesExist) {
    console.log('✅ All files and exports verified successfully!');
} else {
    console.log('❌ Some files or exports are missing.');
    console.log('\n🔧 Next steps:');
    console.log('1. Make sure all required files exist');
    console.log('2. Check the exports in database/index.js');
    console.log('3. Run: node verify-structure.js');
}