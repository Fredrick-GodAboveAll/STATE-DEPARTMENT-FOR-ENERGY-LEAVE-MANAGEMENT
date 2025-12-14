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
                employment_status, retirement_date, status
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
                    employment_status || 'Permanent', 
                    retirement_date || null, 
                    status || 'Active'
                ]
            );
            
            return { id: result.lastID, ...employeeData };
        } catch (error) {
            console.error('EmployeeRepository.create error:', error.message);
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
                employment_status, retirement_date, status
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
                    employment_status || 'Permanent', 
                    retirement_date || null, 
                    status || 'Active', 
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
            const employees = await this.findByStatus('Active');
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
                AND retirement_date >= date('now')
                AND status = 'Active'
                ORDER BY retirement_date 
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
            
            const newStatus = employee.status === 'Active' ? 'Inactive' : 'Active';
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
}

module.exports = new EmployeeRepository();