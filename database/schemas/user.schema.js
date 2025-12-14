// database/schemas/user.schema.js
module.exports = {
    // Users table queries
    CREATE_TABLE: `
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name TEXT,
            last_name TEXT,
            email TEXT UNIQUE,
            password TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            last_login DATETIME
        )
    `,
    
    // User CRUD queries
    INSERT_USER: `
        INSERT INTO users (first_name, last_name, email, password, last_login)
        VALUES (?, ?, ?, ?, ?)
    `,
    
    GET_USER_BY_ID: `
        SELECT * FROM users WHERE id = ?
    `,
    
    GET_USER_BY_EMAIL: `
        SELECT * FROM users WHERE email = ?
    `,
    
    GET_ALL_USERS: `
        SELECT id, first_name, last_name, email, created_at, last_login 
        FROM users ORDER BY created_at DESC
    `,
    
    UPDATE_USER: `
        UPDATE users 
        SET first_name = ?, last_name = ?, email = ?, last_login = ?
        WHERE id = ?
    `,
    
    UPDATE_PASSWORD: `
        UPDATE users SET password = ? WHERE id = ?
    `,
    
    UPDATE_LAST_LOGIN: `
        UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?
    `,
    
    DELETE_USER: `
        DELETE FROM users WHERE id = ?
    `,
    
    COUNT_USERS: `
        SELECT COUNT(*) as count FROM users
    `
};