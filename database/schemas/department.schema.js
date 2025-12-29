// database/schemas/department.schema.js
module.exports = {
    // Departments table queries
    CREATE_TABLE: `
        CREATE TABLE IF NOT EXISTS departments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE,
            code TEXT NOT NULL UNIQUE,
            description TEXT,
            status TEXT DEFAULT 'Active' CHECK(status IN ('Active', 'Inactive', 'Archived')),
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `,
    
    // Department CRUD queries
    INSERT_DEPARTMENT: `
        INSERT INTO departments 
        (name, code, description, status) 
        VALUES (?, ?, ?, ?)
    `,
    
    GET_ALL_DEPARTMENTS: `
        SELECT * FROM departments ORDER BY name
    `,
    
    GET_DEPARTMENT_BY_ID: `
        SELECT * FROM departments WHERE id = ?
    `,
    
    GET_DEPARTMENT_BY_CODE: `
        SELECT * FROM departments WHERE code = ?
    `,
    
    GET_DEPARTMENTS_BY_STATUS: `
        SELECT * FROM departments WHERE status = ? ORDER BY name
    `,
    
    UPDATE_DEPARTMENT: `
        UPDATE departments SET 
        name = ?, code = ?, description = ?, status = ?,
        updated_at = CURRENT_TIMESTAMP 
        WHERE id = ?
    `,
    
    DELETE_DEPARTMENT: `
        DELETE FROM departments WHERE id = ?
    `,
    
    GET_ACTIVE_DEPARTMENTS: `
        SELECT * FROM departments WHERE status = 'Active' ORDER BY name
    `,
    
    GET_DEPARTMENT_COUNT: `
        SELECT status, COUNT(*) as count FROM departments GROUP BY status
    `,
    
    SEARCH_DEPARTMENTS: `
        SELECT * FROM departments 
        WHERE (name LIKE ? OR code LIKE ? OR description LIKE ?)
        ORDER BY name
    `,
    
    GET_DEPARTMENT_STATS: `
        SELECT 
            COUNT(*) as total_departments,
            SUM(CASE WHEN status = 'Active' THEN 1 ELSE 0 END) as active_departments,
            SUM(CASE WHEN status = 'Inactive' THEN 1 ELSE 0 END) as inactive_departments,
            SUM(CASE WHEN status = 'Archived' THEN 1 ELSE 0 END) as archived_departments
        FROM departments
    `
};