// database/schemas/employee.schema.js
module.exports = {
    // Employees table queries - UPDATED TO MATCH CSV COLUMN ORDER
    CREATE_TABLE: `
        CREATE TABLE IF NOT EXISTS employees (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            payroll_number TEXT UNIQUE NOT NULL,
            full_name TEXT NOT NULL,
            id_number TEXT UNIQUE NOT NULL,
            gender TEXT CHECK(gender IN ('M', 'F')),
            age INTEGER CHECK(age > 0 AND age < 120),
            designation TEXT NOT NULL,
            job_group TEXT,
            status TEXT,                    -- From "Employment Status" column (0 - Active, etc.)
            retirement_date TEXT,           -- From "ROD" column (dd/mm/yyyy format)
            employment_status TEXT,         -- From "Engage Name" column (Permanent, Contract, etc.)
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `,
    
    // Employee CRUD queries - ORDER MATCHES CSV HEADERS
    INSERT_EMPLOYEE: `
        INSERT INTO employees 
        (payroll_number, full_name, id_number, gender, age, designation, job_group, 
         status, retirement_date, employment_status) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    
    GET_ALL_EMPLOYEES: `
        SELECT * FROM employees ORDER BY full_name
    `,
    
    GET_EMPLOYEE_BY_ID: `
        SELECT * FROM employees WHERE id = ?
    `,
    
    GET_EMPLOYEE_BY_PAYROLL: `
        SELECT * FROM employees WHERE payroll_number = ?
    `,
    
    GET_EMPLOYEES_BY_STATUS: `
        SELECT * FROM employees WHERE status = ? ORDER BY full_name
    `,
    
    UPDATE_EMPLOYEE: `
        UPDATE employees SET 
        payroll_number = ?, full_name = ?, id_number = ?, gender = ?, age = ?, 
        designation = ?, job_group = ?, status = ?, 
        retirement_date = ?, employment_status = ?, updated_at = CURRENT_TIMESTAMP 
        WHERE id = ?
    `,
    
    DELETE_EMPLOYEE: `
        DELETE FROM employees WHERE id = ?
    `,
    
    COUNT_EMPLOYEES_BY_STATUS: `
        SELECT status, COUNT(*) as count FROM employees GROUP BY status
    `,
    
    SEARCH_EMPLOYEES: `
        SELECT * FROM employees 
        WHERE full_name LIKE ? OR payroll_number LIKE ? OR id_number LIKE ? 
        ORDER BY full_name
    `,
    
    GET_EMPLOYEE_STATISTICS: `
        SELECT 
            COUNT(*) as total,
            SUM(CASE WHEN status LIKE '%Active%' THEN 1 ELSE 0 END) as active,
            SUM(CASE WHEN status LIKE '%Inactive%' THEN 1 ELSE 0 END) as inactive,
            SUM(CASE WHEN status LIKE '%Terminated%' THEN 1 ELSE 0 END) as terminated,
            SUM(CASE WHEN status LIKE '%Retired%' THEN 1 ELSE 0 END) as retired
        FROM employees
    `
};