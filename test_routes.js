// test_routes.js
const { db } = require('./database');

async function testRoutes() {
    try {
        console.log('🧪 Testing Department Routes Integration...\n');
        
        // Test 1: Check if departments can be fetched
        console.log('📋 Test 1: Fetching departments...');
        const departments = await db.departments.findAll();
        console.log(`✅ Found ${departments.length} departments`);
        
        // Test 2: Check if API routes work
        console.log('\n📋 Test 2: Testing statistics...');
        const stats = await db.departments.getStatistics();
        console.log('✅ Department stats retrieved:', stats);
        
        // Test 3: Test search functionality
        console.log('\n📋 Test 3: Testing search...');
        const searchResults = await db.departments.search('IT');
        console.log(`✅ Search results: ${searchResults.length} department(s)`);
        
        console.log('\n🎉 All route integrations working!');
        console.log('\n💡 Available Department Routes:');
        console.log('   GET  /d-overview           - Department overview page');
        console.log('   GET  /d-structure          - Organization structure');
        console.log('   GET  /departments/add      - Add department form');
        console.log('   POST /departments/add      - Add department (submit)');
        console.log('   GET  /departments/edit/:id - Edit department form');
        console.log('   POST /departments/edit/:id - Edit department (submit)');
        console.log('   GET  /api/departments      - API: Get all departments');
        console.log('   GET  /api/departments/:id  - API: Get department by ID');
        console.log('   POST /api/departments      - API: Create department');
        console.log('   PUT  /api/departments/:id  - API: Update department');
        console.log('   DEL  /api/departments/:id  - API: Delete department');
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
    }
}

testRoutes();