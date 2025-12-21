// database/migrations/006_create_profiles_table.js
module.exports = {
    async up(db) {
        console.log('📋 Creating profiles table...');
        
        await db.execute(`
            CREATE TABLE IF NOT EXISTS profiles (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER UNIQUE,
                avatar_url TEXT,
                bio TEXT,
                website TEXT,
                FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
            )
        `);
        
        console.log('✅ Profiles table created');
    },

    async down(db) {
        console.log('⚠️  WARNING: This will DELETE ALL profile data!');
        console.log('🗑️  Dropping profiles table...');
        await db.execute('DROP TABLE IF EXISTS profiles');
        console.log('✅ Profiles table dropped');
    }
};