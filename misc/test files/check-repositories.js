// check-repositories.js
console.log('🔍 Checking repository files for syntax errors...\n');

const fs = require('fs');
const path = require('path');

const repositoryFiles = [
    'UserRepository.js',
    'HolidayRepository.js',
    'LeaveTypeRepository.js',
    'EmployeeRepository.js',
    'ResetRepository.js'
];

repositoryFiles.forEach(file => {
    const filePath = path.join(__dirname, 'database', 'repositories', file);
    console.log(`📄 ${file}:`);
    
    try {
        // Try to require the file
        const repo = require(filePath);
        console.log(`  ✅ Syntax OK, exports:`, typeof repo);
        
        // Check if it's a class instance
        if (repo && typeof repo === 'object') {
            console.log(`  ✅ Has constructor:`, repo.constructor ? repo.constructor.name : 'Unknown');
        }
        
    } catch (error) {
        console.log(`  ❌ Syntax error: ${error.message}`);
        
        // Show the error location
        if (error.stack) {
            const lines = error.stack.split('\n');
            console.log(`  🔍 Error at: ${lines[1]}`);
        }
    }
    console.log('');
});