// database/schemas/holiday.schema.js
module.exports = {
    // Holidays table queries
    CREATE_TABLE: `
        CREATE TABLE IF NOT EXISTS holidays (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            holiday_name TEXT NOT NULL,
            holiday_date DATE NOT NULL,
            holiday_type TEXT CHECK(holiday_type IN 
                ('Public Holiday', 'Company Holiday', 'Optional Holiday', 'Special Day')),
            year INTEGER NOT NULL,
            recurring BOOLEAN DEFAULT 0,
            description TEXT,
            created_by INTEGER,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (created_by) REFERENCES users (id) ON DELETE SET NULL
        )
    `,
    
    // Holiday CRUD queries
    INSERT_HOLIDAY: `
        INSERT INTO holidays 
        (holiday_name, holiday_date, holiday_type, year, recurring, description, created_by) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    
    GET_ALL_HOLIDAYS: `
        SELECT h.*, u.first_name, u.last_name 
        FROM holidays h 
        LEFT JOIN users u ON h.created_by = u.id 
        ORDER BY holiday_date
    `,
    
    GET_HOLIDAYS_BY_YEAR: `
        SELECT * FROM holidays WHERE year = ? ORDER BY holiday_date
    `,
    
    GET_HOLIDAYS_BY_TYPE: `
        SELECT * FROM holidays WHERE holiday_type = ? AND year = ? ORDER BY holiday_date
    `,
    
    GET_UPCOMING_HOLIDAYS: `
        SELECT * FROM holidays 
        WHERE holiday_date >= date('now') 
        ORDER BY holiday_date LIMIT 10
    `,
    
    GET_HOLIDAY_BY_ID: `
        SELECT h.*, u.first_name, u.last_name 
        FROM holidays h 
        LEFT JOIN users u ON h.created_by = u.id 
        WHERE h.id = ?
    `,
    
    UPDATE_HOLIDAY: `
        UPDATE holidays SET 
        holiday_name = ?, holiday_date = ?, holiday_type = ?, 
        year = ?, recurring = ?, description = ?, updated_at = CURRENT_TIMESTAMP 
        WHERE id = ?
    `,
    
    DELETE_HOLIDAY: `
        DELETE FROM holidays WHERE id = ?
    `,
    
    GET_HOLIDAYS_BY_MONTH: `
        SELECT * FROM holidays 
        WHERE strftime('%Y-%m', holiday_date) = ? 
        ORDER BY holiday_date
    `,
    
    GET_HOLIDAY_COUNT_BY_YEAR: `
        SELECT year, COUNT(*) as count FROM holidays GROUP BY year ORDER BY year DESC
    `
};