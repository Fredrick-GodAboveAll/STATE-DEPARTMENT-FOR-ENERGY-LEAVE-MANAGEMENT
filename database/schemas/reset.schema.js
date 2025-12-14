// database/schemas/reset.schema.js
module.exports = {
    // Password resets table queries
    CREATE_TABLE: `
        CREATE TABLE IF NOT EXISTS resets (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT,
            token TEXT UNIQUE,
            expires TEXT
        )
    `,
    
    CREATE_PROFILES_TABLE: `
        CREATE TABLE IF NOT EXISTS profiles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER UNIQUE,
            avatar_url TEXT,
            bio TEXT,
            website TEXT,
            FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
        )
    `,
    
    // Reset CRUD queries
    INSERT_RESET_TOKEN: `
        INSERT INTO resets (email, token, expires) VALUES (?, ?, ?)
    `,
    
    GET_RESET_TOKEN: `
        SELECT * FROM resets WHERE token = ? AND expires > datetime('now')
    `,
    
    DELETE_RESET_TOKEN: `
        DELETE FROM resets WHERE token = ?
    `,
    
    DELETE_EXPIRED_TOKENS: `
        DELETE FROM resets WHERE expires <= datetime('now')
    `,
    
    // Profile queries
    INSERT_PROFILE: `
        INSERT INTO profiles (user_id, avatar_url, bio, website) VALUES (?, ?, ?, ?)
    `,
    
    GET_PROFILE_BY_USER_ID: `
        SELECT * FROM profiles WHERE user_id = ?
    `,
    
    UPDATE_PROFILE: `
        UPDATE profiles SET avatar_url = ?, bio = ?, website = ? WHERE user_id = ?
    `
};