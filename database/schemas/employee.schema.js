// database/schemas/employee.schema.js
module.exports = {
    // Employees table queries
    CREATE_TABLE: `
        CREATE TABLE IF NOT EXISTS employees (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            payroll_number TEXT UNIQUE NOT NULL,
            full_name TEXT NOT NULL,
            id_number TEXT UNIQUE NOT NULL,
            gender TEXT CHECK(gender IN ('Male', 'Female', 'Other')),
            age INTEGER CHECK(age > 0 AND age < 120),
            designation TEXT NOT NULL,
            job_group TEXT,
            employment_status TEXT CHECK(employment_status IN 
                ('Permanent', 'Contract', 'Temporary', 'Probation', 'Casual')),
            retirement_date DATE,
            status TEXT DEFAULT 'Active' CHECK(status IN ('Active', 'Inactive', 'Terminated', 'Retired', 'Resigned')),
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `,
    
    // Employee CRUD queries
    INSERT_EMPLOYEE: `
        INSERT INTO employees 
        (payroll_number, full_name, id_number, gender, age, designation, job_group, 
         employment_status, retirement_date, status) 
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
        designation = ?, job_group = ?, employment_status = ?, 
        retirement_date = ?, status = ?, updated_at = CURRENT_TIMESTAMP 
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
            SUM(CASE WHEN status = 'Active' THEN 1 ELSE 0 END) as active,
            SUM(CASE WHEN status = 'Inactive' THEN 1 ELSE 0 END) as inactive,
            SUM(CASE WHEN status = 'Terminated' THEN 1 ELSE 0 END) as terminated,
            SUM(CASE WHEN status = 'Retired' THEN 1 ELSE 0 END) as retired
        FROM employees
    `
};