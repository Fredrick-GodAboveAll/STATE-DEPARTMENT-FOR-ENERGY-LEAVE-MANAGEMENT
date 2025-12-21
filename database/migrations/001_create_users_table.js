// database/migrations/001_create_users_table.js
module.exports = {
    async up(db) {
        console.log('📋 Creating users table...');
        
        await db.execute(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                first_name TEXT,
                last_name TEXT,
                email TEXT UNIQUE,
                password TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                last_login DATETIME
            )
        `);
        
        console.log('✅ Users table created');
    },

    async down(db) {
        console.log('⚠️  WARNING: This will DELETE ALL user data!');
        console.log('🗑️  Dropping users table...');
        await db.execute('DROP TABLE IF EXISTS users');
        console.log('✅ Users table dropped');
    }
};