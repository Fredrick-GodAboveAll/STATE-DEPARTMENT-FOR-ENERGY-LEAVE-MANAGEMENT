// database/schemas/leave_application.schema.js
module.exports = {
    // Leave Applications table queries
    CREATE_TABLE: `
        CREATE TABLE IF NOT EXISTS leave_applications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ref_no TEXT UNIQUE NOT NULL,
            employee_id INTEGER NOT NULL,
            leave_type_id INTEGER NOT NULL,
            start_date TEXT NOT NULL,
            end_date TEXT NOT NULL,
            back_on TEXT NOT NULL,
            duration_days INTEGER NOT NULL,
            applied_on TEXT NOT NULL,
            letter_date TEXT,
            status TEXT DEFAULT 'Pending' CHECK(status IN ('Pending', 'Approved', 'Rejected', 'Cancelled')),
            reason TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
            FOREIGN KEY (leave_type_id) REFERENCES leave_types(id) ON DELETE CASCADE
        )
    `,
    
    // Leave Application CRUD queries
    INSERT_LEAVE_APPLICATION: `
        INSERT INTO leave_applications 
        (ref_no, employee_id, leave_type_id, start_date, end_date, back_on, duration_days, applied_on, letter_date, status, reason) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    
    GET_ALL_LEAVE_APPLICATIONS: `
        SELECT la.*, 
               e.full_name as employee_name, 
               e.payroll_number,
               d.name as department_name,
               lt.leave_name as leave_type_name,
               lt.color as leave_type_color
        FROM leave_applications la
        LEFT JOIN employees e ON la.employee_id = e.id
        LEFT JOIN departments d ON e.department_id = d.id
        LEFT JOIN leave_types lt ON la.leave_type_id = lt.id
        ORDER BY la.applied_on DESC
    `,
    
    GET_LEAVE_APPLICATION_BY_ID: `
        SELECT la.*, 
               e.full_name as employee_name, 
               e.payroll_number,
               d.name as department_name,
               lt.leave_name as leave_type_name,
               lt.color as leave_type_color
        FROM leave_applications la
        LEFT JOIN employees e ON la.employee_id = e.id
        LEFT JOIN departments d ON e.department_id = d.id
        LEFT JOIN leave_types lt ON la.leave_type_id = lt.id
        WHERE la.id = ?
    `,
    
    GET_LEAVE_APPLICATIONS_BY_EMPLOYEE: `
        SELECT la.*, 
               lt.leave_name as leave_type_name,
               lt.color as leave_type_color
        FROM leave_applications la
        LEFT JOIN leave_types lt ON la.leave_type_id = lt.id
        WHERE la.employee_id = ?
        ORDER BY la.applied_on DESC
    `,
    
    UPDATE_LEAVE_APPLICATION_STATUS: `
        UPDATE leave_applications 
        SET status = ?, updated_at = CURRENT_TIMESTAMP 
        WHERE id = ?
    `,
    
    DELETE_LEAVE_APPLICATION: `
        DELETE FROM leave_applications WHERE id = ?
    `,
    
    GET_LEAVE_APPLICATIONS_COUNT: `
        SELECT COUNT(*) as count FROM leave_applications
    `,
    
    GET_LEAVE_APPLICATIONS_BY_STATUS: `
        SELECT COUNT(*) as count FROM leave_applications WHERE status = ?
    `
};