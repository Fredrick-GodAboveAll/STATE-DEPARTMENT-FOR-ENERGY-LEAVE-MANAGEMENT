// database/migrations/005_create_resets_table.js
module.exports = {
    async up(db) {
        console.log('📋 Creating resets table...');
        
        await db.execute(`
            CREATE TABLE IF NOT EXISTS resets (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT,
                token TEXT UNIQUE,
                expires TEXT
            )
        `);
        
        console.log('✅ Resets table created');
    },

    async down(db) {
        console.log('⚠️  WARNING: This will DELETE ALL reset token data!');
        console.log('🗑️  Dropping resets table...');
        await db.execute('DROP TABLE IF EXISTS resets');
        console.log('✅ Resets table dropped');
    }
};