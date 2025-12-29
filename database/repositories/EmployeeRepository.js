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
            await this.connection.connect();
            
            const {
                payroll_number, full_name, id_number, gender, age, designation, job_group,
                status, retirement_date, employment_status
            } = employeeData;
            
            const result = await this.connection.execute(
                this.schema.INSERT_EMPLOYEE,
                [
                    payroll_number, 
                    full_name, 
                    id_number, 
                    gender || null, 
                    age || null, 
                    designation, 
                    job_group || null,
                    status || '0 - Active', 
                    retirement_date || null, 
                    employment_status || 'Permanent'
                ]
            );
            
            return { id: result.lastID, ...employeeData };
        } catch (error) {
            console.error('EmployeeRepository.create error:', error.message);
            
            // Handle duplicate error
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
            await this.connection.connect();
            const employees = await this.connection.all(this.schema.GET_ALL_EMPLOYEES);
            return employees;
        } catch (error) {
            console.error('EmployeeRepository.findAll error:', error.message);
            throw error;
        }
    }

    async findById(id) {
        try {
            await this.connection.connect();
            const employee = await this.connection.get(this.schema.GET_EMPLOYEE_BY_ID, [id]);
            return employee;
        } catch (error) {
            console.error('EmployeeRepository.findById error:', error.message);
            throw error;
        }
    }

    async findByPayroll(payrollNumber) {
        try {
            await this.connection.connect();
            const employee = await this.connection.get(this.schema.GET_EMPLOYEE_BY_PAYROLL, [payrollNumber]);
            return employee;
        } catch (error) {
            console.error('EmployeeRepository.findByPayroll error:', error.message);
            throw error;
        }
    }

    async findByIdNumber(idNumber) {
        try {
            await this.connection.connect();
            const employee = await this.connection.get(
                `SELECT * FROM employees WHERE id_number = ?`,
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
            await this.connection.connect();
            const employees = await this.connection.all(this.schema.GET_EMPLOYEES_BY_STATUS, [status]);
            return employees;
        } catch (error) {
            console.error('EmployeeRepository.findByStatus error:', error.message);
            throw error;
        }
    }

    async update(id, employeeData) {
        try {
            await this.connection.connect();
            
            const {
                payroll_number, full_name, id_number, gender, age, designation, job_group,
                status, retirement_date, employment_status
            } = employeeData;
            
            const result = await this.connection.execute(
                this.schema.UPDATE_EMPLOYEE,
                [
                    payroll_number, 
                    full_name, 
                    id_number, 
                    gender || null, 
                    age || null, 
                    designation, 
                    job_group || null,
                    status || '0 - Active', 
                    retirement_date || null, 
                    employment_status || 'Permanent', 
                    id
                ]
            );
            
            return result.changes > 0 ? await this.findById(id) : null;
        } catch (error) {
            console.error('EmployeeRepository.update error:', error.message);
            throw error;
        }
    }

    async delete(id) {
        try {
            await this.connection.connect();
            const result = await this.connection.execute(this.schema.DELETE_EMPLOYEE, [id]);
            return result.changes > 0;
        } catch (error) {
            console.error('EmployeeRepository.delete error:', error.message);
            throw error;
        }
    }

    async getStatistics() {
        try {
            await this.connection.connect();
            
            // Get status counts
            const statusCounts = await this.connection.all(this.schema.COUNT_EMPLOYEES_BY_STATUS);
            
            // Get comprehensive statistics
            const stats = await this.connection.get(this.schema.GET_EMPLOYEE_STATISTICS);
            
            // Get gender distribution
            const genderStats = await this.connection.all(`
                SELECT gender, COUNT(*) as count 
                FROM employees 
                WHERE gender IS NOT NULL 
                GROUP BY gender
            `);
            
            // Get employment status distribution
            const employmentStats = await this.connection.all(`
                SELECT employment_status, COUNT(*) as count 
                FROM employees 
                WHERE employment_status IS NOT NULL 
                GROUP BY employment_status
            `);
            
            // Calculate average age
            const ageStats = await this.connection.get(`
                SELECT 
                    AVG(age) as average_age,
                    MIN(age) as min_age,
                    MAX(age) as max_age
                FROM employees 
                WHERE age IS NOT NULL
            `);
            
            return {
                ...stats,
                statusCounts,
                genderStats,
                employmentStats,
                ageStats
            };
        } catch (error) {
            console.error('EmployeeRepository.getStatistics error:', error.message);
            throw error;
        }
    }

    async search(query) {
        try {
            await this.connection.connect();
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
            await this.connection.connect();
            const employees = await this.connection.all(
                `SELECT * FROM employees WHERE status LIKE '%Active%' ORDER BY full_name`
            );
            return employees;
        } catch (error) {
            console.error('EmployeeRepository.getActiveEmployees error:', error.message);
            throw error;
        }
    }

    async getUpcomingRetirements(limit = 5) {
        try {
            await this.connection.connect();
            const sql = `
                SELECT * FROM employees 
                WHERE retirement_date IS NOT NULL 
                AND retirement_date != ''
                AND status LIKE '%Active%'
                ORDER BY 
                    substr(retirement_date, 7, 4) || '-' || 
                    substr(retirement_date, 4, 2) || '-' || 
                    substr(retirement_date, 1, 2)
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
            await this.connection.connect();
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

    // Bulk insert method for CSV upload
    async bulkInsert(employeesData) {
        try {
            await this.connection.connect();
            
            const insertedIds = [];
            const errors = [];
            
            for (const employeeData of employeesData) {
                try {
                    const {
                        payroll_number, full_name, id_number, gender, age, designation, job_group,
                        status, retirement_date, employment_status
                    } = employeeData;
                    
                    const result = await this.connection.execute(
                        this.schema.INSERT_EMPLOYEE,
                        [
                            payroll_number, 
                            full_name, 
                            id_number, 
                            gender || null, 
                            age || null, 
                            designation, 
                            job_group || null,
                            status || '0 - Active', 
                            retirement_date || null, 
                            employment_status || 'Permanent'
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
}

module.exports = new EmployeeRepository();