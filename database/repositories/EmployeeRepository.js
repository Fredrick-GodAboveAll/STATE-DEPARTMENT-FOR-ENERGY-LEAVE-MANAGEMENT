// database/repositories/EmployeeRepository.js
const connection = require('../connection');
const schemas = require('../schemas');

class EmployeeRepository {
    constructor() {
        this.connection = connection;
        this.schema = schemas.employee;
    }

    async create(employeeData) {
        try {
            const {
                payroll_number, full_name, id_number, gender, age, designation, job_group,
                status, retirement_date, employment_status, date_of_birth, disability, department_id
            } = employeeData;
            
            // Auto-calculate age from date_of_birth if not provided
            let finalAge = age;
            if (date_of_birth && !age) {
                finalAge = this.schema.calculateAgeFromDOB(date_of_birth);
            }
            
            const result = await this.connection.execute(
                this.schema.INSERT_EMPLOYEE,
                [
                    payroll_number, 
                    full_name, 
                    id_number, 
                    gender || null, 
                    finalAge || null, 
                    designation, 
                    job_group || null,
                    status || '0 - Active', 
                    retirement_date || 'NA', 
                    employment_status || 'Permanent',
                    date_of_birth || null,
                    disability || null,
                    department_id || null
                ]
            );
            
            return { id: result.lastID, ...employeeData };
        } catch (error) {
            console.error('EmployeeRepository.create error:', error.message);
            
            if (error.message.includes('UNIQUE constraint failed')) {
                if (error.message.includes('payroll_number')) {
                    throw new Error(`Duplicate payroll number: ${employeeData.payroll_number}`);
                } else if (error.message.includes('id_number')) {
                    throw new Error(`Duplicate ID number: ${employeeData.id_number}`);
                }
            }
            
            throw error;
        }
    }

    async findAll() {
        try {
            const employees = await this.connection.all(this.schema.GET_ALL_EMPLOYEES);
            return employees;
        } catch (error) {
            console.error('EmployeeRepository.findAll error:', error.message);
            throw error;
        }
    }

    async findById(id) {
        try {
            const employee = await this.connection.get(this.schema.GET_EMPLOYEE_BY_ID, [id]);
            return employee;
        } catch (error) {
            console.error('EmployeeRepository.findById error:', error.message);
            throw error;
        }
    }

    async findByPayroll(payrollNumber) {
        try {
            const employee = await this.connection.get(this.schema.GET_EMPLOYEE_BY_PAYROLL, [payrollNumber]);
            return employee;
        } catch (error) {
            console.error('EmployeeRepository.findByPayroll error:', error.message);
            throw error;
        }
    }

    async findByIdNumber(idNumber) {
        try {
            const employee = await this.connection.get(
                `SELECT e.*, d.name as department_name 
                 FROM employees e 
                 LEFT JOIN departments d ON e.department_id = d.id 
                 WHERE e.id_number = ?`,
                [idNumber]
            );
            return employee;
        } catch (error) {
            console.error('EmployeeRepository.findByIdNumber error:', error.message);
            throw error;
        }
    }

    async findByStatus(status) {
        try {
            const employees = await this.connection.all(this.schema.GET_EMPLOYEES_BY_STATUS, [status]);
            return employees;
        } catch (error) {
            console.error('EmployeeRepository.findByStatus error:', error.message);
            throw error;
        }
    }

    async update(id, employeeData) {
        try {
            const {
                payroll_number, full_name, id_number, gender, age, designation, job_group,
                status, retirement_date, employment_status, date_of_birth, disability, department_id
            } = employeeData;
            
            // Auto-calculate age from date_of_birth if not provided
            let finalAge = age;
            if (date_of_birth && !age) {
                finalAge = this.schema.calculateAgeFromDOB(date_of_birth);
            }
            
            const result = await this.connection.execute(
                this.schema.UPDATE_EMPLOYEE,
                [
                    payroll_number, 
                    full_name, 
                    id_number, 
                    gender || null, 
                    finalAge || null, 
                    designation, 
                    job_group || null,
                    status || '0 - Active', 
                    retirement_date || 'NA', 
                    employment_status || 'Permanent',
                    date_of_birth || null,
                    disability || null,
                    department_id || 'NA',
                    id
                ]
            );
            
            return result.changes > 0 ? await this.findById(id) : null;
        } catch (error) {
            console.error('EmployeeRepository.update error:', error.message);
            throw error;
        }
    }

    async updateDepartment(employeeId, departmentId) {
        try {
            const result = await this.connection.execute(
                this.schema.UPDATE_EMPLOYEE_DEPARTMENT,
                [departmentId, employeeId]
            );
            
            return result.changes > 0;
        } catch (error) {
            console.error('EmployeeRepository.updateDepartment error:', error.message);
            throw error;
        }
    }

    async delete(id) {
        try {
            const result = await this.connection.execute(this.schema.DELETE_EMPLOYEE, [id]);
            return result.changes > 0;
        } catch (error) {
            console.error('EmployeeRepository.delete error:', error.message);
            throw error;
        }
    }

    async getStatistics() {
        try {
            const stats = await this.connection.get(this.schema.GET_EMPLOYEE_STATISTICS);
            
            const statusCounts = await this.connection.all(this.schema.COUNT_EMPLOYEES_BY_STATUS);
            
            const genderStats = await this.connection.all(`
                SELECT gender, COUNT(*) as count 
                FROM employees 
                WHERE gender IS NOT NULL 
                GROUP BY gender
            `);
            
            const employmentStats = await this.connection.all(`
                SELECT employment_status, COUNT(*) as count 
                FROM employees 
                WHERE employment_status IS NOT NULL 
                GROUP BY employment_status
            `);
            
            const ageStats = await this.connection.get(`
                SELECT 
                    AVG(age) as average_age,
                    MIN(age) as min_age,
                    MAX(age) as max_age
                FROM employees 
                WHERE age IS NOT NULL
            `);
            
            const departmentStats = await this.connection.all(`
                SELECT 
                    d.name,
                    COUNT(e.id) as employee_count
                FROM departments d
                LEFT JOIN employees e ON d.id = e.department_id
                GROUP BY d.id
                ORDER BY employee_count DESC
            `);
            
            return {
                ...stats,
                statusCounts,
                genderStats,
                employmentStats,
                ageStats,
                departmentStats
            };
        } catch (error) {
            console.error('EmployeeRepository.getStatistics error:', error.message);
            throw error;
        }
    }

    async search(query) {
        try {
            const searchQuery = `%${query}%`;
            const employees = await this.connection.all(
                this.schema.SEARCH_EMPLOYEES,
                [searchQuery, searchQuery, searchQuery]
            );
            return employees;
        } catch (error) {
            console.error('EmployeeRepository.search error:', error.message);
            throw error;
        }
    }

    async getActiveEmployees() {
        try {
            const employees = await this.connection.all(
                `SELECT e.*, d.name as department_name 
                 FROM employees e 
                 LEFT JOIN departments d ON e.department_id = d.id 
                 WHERE e.status LIKE '%Active%' 
                 ORDER BY e.full_name`
            );
            return employees;
        } catch (error) {
            console.error('EmployeeRepository.getActiveEmployees error:', error.message);
            throw error;
        }
    }

   // In EmployeeRepository.js - Update the getEmployeesByDepartment method (around line 200-210)
async getEmployeesByDepartment(departmentId) {
    try {
        // Fix: Use a simpler query without schema reference
        const sql = `
            SELECT e.*, d.name as department_name 
            FROM employees e 
            LEFT JOIN departments d ON e.department_id = d.id 
            WHERE e.department_id = ? 
            ORDER BY e.full_name
        `;
        
        const employees = await this.connection.all(sql, [departmentId]);
        return employees;
    } catch (error) {
        console.error('EmployeeRepository.getEmployeesByDepartment error:', error.message);
        throw error;
    }
}

    async getUnassignedEmployees() {
        try {
            const query = `SELECT * FROM employees WHERE department_id IS NULL ORDER BY full_name`;
            const employees = await this.connection.all(query);
            return employees;
        } catch (error) {
            console.error('EmployeeRepository.getUnassignedEmployees error:', error.message);
            throw error;
        }
    }

    async getDepartmentStats() {
        try {
            const query = `
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
            `;
            const stats = await this.connection.all(query);
            return stats;
        } catch (error) {
            console.error('EmployeeRepository.getDepartmentStats error:', error.message);
            throw error;
        }
    }

    async getUpcomingRetirements(limit = 5) {
        try {
            const sql = `
                SELECT e.*, d.name as department_name 
                FROM employees e 
                LEFT JOIN departments d ON e.department_id = d.id 
                WHERE e.retirement_date IS NOT NULL 
                AND e.retirement_date != ''
                AND e.status LIKE '%Active%'
                ORDER BY 
                    substr(e.retirement_date, 7, 4) || '-' || 
                    substr(e.retirement_date, 4, 2) || '-' || 
                    substr(e.retirement_date, 1, 2)
                LIMIT ?
            `;
            
            const employees = await this.connection.all(sql, [limit]);
            return employees;
        } catch (error) {
            console.error('EmployeeRepository.getUpcomingRetirements error:', error.message);
            throw error;
        }
    }

    async toggleStatus(id) {
        try {
            const employee = await this.findById(id);
            
            if (!employee) {
                throw new Error('Employee not found');
            }
            
            let newStatus;
            if (employee.status && employee.status.includes('Active')) {
                newStatus = employee.status.replace('Active', 'Inactive');
            } else if (employee.status && employee.status.includes('Inactive')) {
                newStatus = employee.status.replace('Inactive', 'Active');
            } else {
                newStatus = '0 - Active';
            }
            
            await this.connection.execute(
                `UPDATE employees SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
                [newStatus, id]
            );
            
            return { ...employee, status: newStatus };
        } catch (error) {
            console.error('EmployeeRepository.toggleStatus error:', error.message);
            throw error;
        }
    }

    async bulkInsert(employeesData) {
        try {
            const insertedIds = [];
            const errors = [];
            
            for (const employeeData of employeesData) {
                try {
                    const {
                        payroll_number, full_name, id_number, gender, age, designation, job_group,
                        status, retirement_date, employment_status, date_of_birth, disability, department_id
                    } = employeeData;
                    
                    // Auto-calculate age from date_of_birth if not provided
                    let finalAge = age;
                    if (date_of_birth && !age) {
                        finalAge = this.schema.calculateAgeFromDOB(date_of_birth);
                    }
                    
                    const result = await this.connection.execute(
                        this.schema.INSERT_EMPLOYEE,
                        [
                            payroll_number, 
                            full_name, 
                            id_number, 
                            gender || null, 
                            finalAge || null, 
                            designation, 
                            job_group || null,
                            status || '0 - Active', 
                            retirement_date || 'NA', 
                            employment_status || 'Permanent',
                            date_of_birth || null,
                            disability || null,
                            department_id || 'NA'
                        ]
                    );
                    
                    insertedIds.push(result.lastID);
                } catch (error) {
                    errors.push({
                        employee: employeeData,
                        error: error.message
                    });
                }
            }
            
            return {
                successCount: insertedIds.length,
                errorCount: errors.length,
                insertedIds,
                errors
            };
        } catch (error) {
            console.error('EmployeeRepository.bulkInsert error:', error.message);
            throw error;
        }
    }

    async bulkUpdateDepartments(employeeIds, departmentId) {
        try {
            if (employeeIds.length === 0) return { successCount: 0 };
            
            const placeholders = employeeIds.map(() => '?').join(',');
            
            const sql = `UPDATE employees SET department_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id IN (${placeholders})`;
            
            const result = await this.connection.execute(
                sql,
                [departmentId, ...employeeIds]
            );
            
            return {
                successCount: result.changes
            };
        } catch (error) {
            console.error('EmployeeRepository.bulkUpdateDepartments error:', error.message);
            throw error;
        }
    }

    async unassignFromDepartment(departmentId) {
        try {
            const result = await this.connection.execute(
                `UPDATE employees SET department_id = NULL, updated_at = CURRENT_TIMESTAMP WHERE department_id = ?`,
                [departmentId]
            );
            
            return result.changes;
        } catch (error) {
            console.error('EmployeeRepository.unassignFromDepartment error:', error.message);
            throw error;
        }
    }
}

module.exports = new EmployeeRepository();