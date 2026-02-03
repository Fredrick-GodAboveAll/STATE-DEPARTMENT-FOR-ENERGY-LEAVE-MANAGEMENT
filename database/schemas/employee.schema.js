// database/schemas/employee.schema.js
module.exports = {
    // Employees table queries - UPDATED TO INCLUDE disability and date_of_birth
    CREATE_TABLE: `
        CREATE TABLE IF NOT EXISTS employees (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            payroll_number TEXT UNIQUE NOT NULL,
            full_name TEXT NOT NULL,
            id_number TEXT UNIQUE NOT NULL,
            gender TEXT CHECK(gender IN ('M', 'F')),
            age INTEGER CHECK(age >= 18 AND age <= 120),
            designation TEXT NOT NULL,
            job_group TEXT,
            status TEXT,                        -- From "Employment Status" column (0 - Active, etc.)
            retirement_date TEXT DEFAULT 'NA',  -- Default to 'NA'
            employment_status TEXT,             -- From "Engage Name" column (Permanent, Contract, etc.)
            date_of_birth TEXT,                 -- Used for age auto-calculation
            disability TEXT CHECK(disability IN ('yes', 'no')),  -- "yes" = disability, "no" = no disability
            department_id INTEGER,              -- Foreign key to departments (NULL = unassigned)
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
        )
    `,
    
    // Employee CRUD queries - NEW ORDER with disability and date_of_birth
    // Order: id, payroll_number, full_name, id_number, gender, age, designation, job_group, 
    //        status, retirement_date, employment_status, date_of_birth, disability, department_id, created_at, updated_at
    INSERT_EMPLOYEE: `
        INSERT INTO employees 
        (payroll_number, full_name, id_number, gender, age, designation, job_group, 
         status, retirement_date, employment_status, date_of_birth, disability, department_id) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
        retirement_date = ?, employment_status = ?, date_of_birth = ?, disability = ?, 
        department_id = ?, updated_at = CURRENT_TIMESTAMP 
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
    `,

    // ============ VALIDATION HELPERS ============
    
    validateGender: (gender) => {
        if (!gender) return false;
        const normalized = gender.toString().toUpperCase().trim();
        return normalized === 'M' || normalized === 'F';
    },

    validateAge: (age) => {
        const ageNum = parseInt(age);
        return !isNaN(ageNum) && ageNum >= 18 && ageNum <= 120;
    },

    validateDisability: (disability) => {
        if (disability === null || disability === undefined || disability === '') {
            return true;
        }
        const disabilityNum = parseInt(disability);
        return !isNaN(disabilityNum) && (disabilityNum === 0 || disabilityNum === 4);
    },

    calculateAgeFromDOB: (dateOfBirth) => {
        if (!dateOfBirth) return null;
        
        let dob;
        if (dateOfBirth.includes('-')) {
            dob = new Date(dateOfBirth);
        } else if (dateOfBirth.includes('/')) {
            const parts = dateOfBirth.split('/');
            if (parts.length === 3) {
                dob = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
            }
        }
        
        if (!dob || isNaN(dob.getTime())) {
            return null;
        }
        
        // Use fixed date: February 3, 2026 (real life date for this project)
        const today = new Date(2026, 1, 3); // Month is 0-based: 1 = February
        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
        
        return age >= 18 && age <= 120 ? age : null;
    },

    formatDateToISO: (dateStr) => {
        if (!dateStr) return null;
        
        try {
            let date;
            if (dateStr.includes('-')) {
                date = new Date(dateStr);
            } else if (dateStr.includes('/')) {
                const parts = dateStr.split('/');
                if (parts.length === 3) {
                    date = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
                }
            }
            
            if (!date || isNaN(date.getTime())) {
                return null;
            }
            
            return date.toISOString().split('T')[0];
        } catch (error) {
            return null;
        }
    }
};