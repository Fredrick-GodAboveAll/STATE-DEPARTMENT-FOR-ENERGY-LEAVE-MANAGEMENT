// database/schemas/employee.schema.js
module.exports = {
    // Employees table queries - UPDATED TO INCLUDE department_id
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
            department_id INTEGER,          -- NEW: Foreign key to departments table
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
        )
    `,
    
    // Employee CRUD queries - ORDER MATCHES CSV HEADERS (updated to 11 columns)
    INSERT_EMPLOYEE: `
        INSERT INTO employees 
        (payroll_number, full_name, id_number, gender, age, designation, job_group, 
         status, retirement_date, employment_status, department_id) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    
    GET_ALL_EMPLOYEES: `
        SELECT e.*, d.name as department_name 
        FROM employees e 
        LEFT JOIN departments d ON e.department_id = d.id 
        ORDER BY e.full_name
    `,
    
    GET_EMPLOYEE_BY_ID: `
        SELECT e.*, d.name as department_name 
        FROM employees e 
        LEFT JOIN departments d ON e.department_id = d.id 
        WHERE e.id = ?
    `,
    
    GET_EMPLOYEE_BY_PAYROLL: `
        SELECT e.*, d.name as department_name 
        FROM employees e 
        LEFT JOIN departments d ON e.department_id = d.id 
        WHERE e.payroll_number = ?
    `,
    
    GET_EMPLOYEES_BY_STATUS: `
        SELECT e.*, d.name as department_name 
        FROM employees e 
        LEFT JOIN departments d ON e.department_id = d.id 
        WHERE e.status = ? 
        ORDER BY e.full_name
    `,
    
    UPDATE_EMPLOYEE: `
        UPDATE employees SET 
        payroll_number = ?, full_name = ?, id_number = ?, gender = ?, age = ?, 
        designation = ?, job_group = ?, status = ?, 
        retirement_date = ?, employment_status = ?, department_id = ?, 
        updated_at = CURRENT_TIMESTAMP 
        WHERE id = ?
    `,
    
    UPDATE_EMPLOYEE_DEPARTMENT: `
        UPDATE employees SET 
        department_id = ?, updated_at = CURRENT_TIMESTAMP 
        WHERE id = ?
    `,
    
    DELETE_EMPLOYEE: `
        DELETE FROM employees WHERE id = ?
    `,
    
    COUNT_EMPLOYEES_BY_STATUS: `
        SELECT status, COUNT(*) as count FROM employees GROUP BY status
    `,
    
    SEARCH_EMPLOYEES: `
        SELECT e.*, d.name as department_name 
        FROM employees e 
        LEFT JOIN departments d ON e.department_id = d.id 
        WHERE e.full_name LIKE ? OR e.payroll_number LIKE ? OR e.id_number LIKE ? 
        ORDER BY e.full_name
    `,
    
    GET_EMPLOYEE_STATISTICS: `
        SELECT 
            COUNT(*) as total,
            SUM(CASE WHEN status LIKE '%Active%' THEN 1 ELSE 0 END) as active,
            SUM(CASE WHEN status LIKE '%Inactive%' THEN 1 ELSE 0 END) as inactive,
            SUM(CASE WHEN status LIKE '%Terminated%' THEN 1 ELSE 0 END) as terminated,
            SUM(CASE WHEN status LIKE '%Retired%' THEN 1 ELSE 0 END) as retired
        FROM employees
    `,
    
    // NEW: Department-related queries
    GET_EMPLOYEES_BY_DEPARTMENT: `
        SELECT e.*, d.name as department_name 
        FROM employees e 
        LEFT JOIN departments d ON e.department_id = d.id 
        WHERE e.department_id = ? 
        ORDER BY e.full_name
    `,
    
    GET_UNASSIGNED_EMPLOYEES: `
        SELECT * FROM employees WHERE department_id IS NULL ORDER BY full_name
    `,
    
    GET_DEPARTMENT_STATS: `
        SELECT 
            d.id,
            d.name,
            d.code,
            COUNT(e.id) as employee_count,
            GROUP_CONCAT(e.full_name) as employee_names
        FROM departments d
        LEFT JOIN employees e ON d.id = e.department_id
        GROUP BY d.id
        ORDER BY d.name
    `
};