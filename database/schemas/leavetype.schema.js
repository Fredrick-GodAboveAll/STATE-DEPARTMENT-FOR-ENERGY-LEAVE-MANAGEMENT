// database/schemas/leavetype.schema.js
module.exports = {
    // Leave Types table queries
    CREATE_TABLE: `
        CREATE TABLE IF NOT EXISTS leave_types (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            leave_name TEXT NOT NULL UNIQUE,
            color TEXT DEFAULT 'primary',
            entitled_days INTEGER NOT NULL CHECK(entitled_days >= 0),
            gender_restriction TEXT CHECK(gender_restriction IN 
                ('All', 'Male', 'Female', 'Other', 'None')),
            description TEXT,
            carry_forward_days INTEGER,
            status TEXT DEFAULT 'Active' CHECK(status IN ('Active', 'Inactive', 'Archived')),
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `,
    
    // Leave Type CRUD queries
    INSERT_LEAVE_TYPE: `
        INSERT INTO leave_types 
        (leave_name, color, entitled_days, gender_restriction, description, carry_forward_days, status) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    
    GET_ALL_LEAVE_TYPES: `
        SELECT * FROM leave_types ORDER BY leave_name
    `,
    
    GET_LEAVE_TYPE_BY_ID: `
        SELECT * FROM leave_types WHERE id = ?
    `,
    
    GET_LEAVE_TYPES_BY_STATUS: `
        SELECT * FROM leave_types WHERE status = ? ORDER BY leave_name
    `,
    
    UPDATE_LEAVE_TYPE: `
        UPDATE leave_types SET 
        leave_name = ?, color = ?, entitled_days = ?, 
        gender_restriction = ?, description = ?, carry_forward_days = ?, status = ?,
        updated_at = CURRENT_TIMESTAMP 
        WHERE id = ?
    `,
    
    DELETE_LEAVE_TYPE: `
        DELETE FROM leave_types WHERE id = ?
    `,
    
    GET_ACTIVE_LEAVE_TYPES: `
        SELECT * FROM leave_types WHERE status = 'Active' ORDER BY leave_name
    `,
    
    GET_LEAVE_TYPE_COUNT: `
        SELECT status, COUNT(*) as count FROM leave_types GROUP BY status
    `
};