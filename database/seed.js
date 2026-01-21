// database/seed.js
const connection = require('./connection');

class DatabaseSeeder {
    constructor() {
        this.initialized = false;
    }

    async seedAll() {
        console.log('🌱 Starting database seeding...\n');
        
        await connection.connect();
        
        try {
            // Seed in order of dependencies
            await this.seedUsers();
            await this.seedHolidays();
            await this.seedLeaveTypes();
            await this.seedDepartments();  // NEW: Add departments
            await this.seedEmployees();
            
            console.log('✅ Database seeding completed');
        } catch (error) {
            console.error('❌ Seeding failed:', error.message);
            throw error;
        } finally {
            await connection.close();
        }
    }

    async seedUsers() {
        try {
            // Check if users table has data
            const existing = await connection.get('SELECT COUNT(*) as count FROM users');
            
            if (existing.count > 0) {
                console.log('⚠️ Users table already has data, skipping user seeding');
                return;
            }
            
            console.log('👤 Seeding sample users...');
            
            const users = [
                {
                    first_name: 'Admin',
                    last_name: 'User',
                    email: 'admin@example.com',
                    password: '$2b$10$YourHashedPasswordHere' // Use bcrypt hash in real app
                }
            ];
            
            for (const user of users) {
                await connection.execute(
                    `INSERT INTO users (first_name, last_name, email, password, last_login) 
                     VALUES (?, ?, ?, ?, ?)`,
                    [user.first_name, user.last_name, user.email, user.password, new Date().toISOString()]
                );
            }
            
            console.log('✅ Seeded 1 user');
        } catch (error) {
            console.log('⏭️ Users table not ready for seeding yet:', error.message);
        }
    }

    async seedHolidays() {
        try {
            const existing = await connection.get('SELECT COUNT(*) as count FROM holidays');
            
            if (existing.count > 0) {
                console.log('⚠️ Holidays table already has data, skipping holiday seeding');
                return;
            }
            
            console.log('🎉 Seeding sample holidays...');
            
            const holidays = [
                {
                    holiday_name: 'test holiday\'s Day',
                    holiday_date: '2024-01-01',
                    holiday_type: 'Public Holiday',
                    year: 2025,
                    recurring: 1,
                    description: 'First holiday from code'
                }
            ];
            
            for (const holiday of holidays) {
                await connection.execute(
                    `INSERT INTO holidays (holiday_name, holiday_date, holiday_type, year, recurring, description) 
                     VALUES (?, ?, ?, ?, ?, ?)`,
                    [holiday.holiday_name, holiday.holiday_date, holiday.holiday_type, 
                     holiday.year, holiday.recurring, holiday.description]
                );
            }
            
            console.log(`✅ Seeded ${holidays.length} holidays`);
        } catch (error) {
            console.log('⏭️ Holidays table not ready for seeding yet:', error.message);
        }
    }

    async seedLeaveTypes() {
        try {
            const existing = await connection.get('SELECT COUNT(*) as count FROM leave_types');
            
            if (existing.count > 0) {
                console.log('⚠️ Leave types table already has data, skipping leave type seeding');
                return;
            }
            
            console.log('🏖️ Seeding sample leave types...');
            
            const leaveTypes = [
                {
                    leave_name: 'Test',
                    color: 'primary',
                    entitled_days: 1,
                    gender_restriction: 'All',
                    description: 'this is a test leave type',
                    carry_forward_days: null,
                    status: 'Active'
                }
            ];
            
            for (const leaveType of leaveTypes) {
                await connection.execute(
                    `INSERT INTO leave_types (leave_name, color, entitled_days, gender_restriction, description, carry_forward_days, status) 
                     VALUES (?, ?, ?, ?, ?, ?, ?)`,
                    [leaveType.leave_name, leaveType.color, leaveType.entitled_days, 
                     leaveType.gender_restriction, leaveType.description, leaveType.carry_forward_days, leaveType.status]
                );
            }
            
            console.log(`✅ Seeded ${leaveTypes.length} leave types`);
        } catch (error) {
            console.log('⏭️ Leave types table not ready for seeding yet:', error.message);
        }
    }

    async seedDepartments() {
        try {
            const existing = await connection.get('SELECT COUNT(*) as count FROM departments');
            
            if (existing.count > 0) {
                console.log('⚠️ Departments table already has data, skipping department seeding');
                return;
            }
            
            console.log('🏢 Seeding sample departments...');
            
            const departments = [
                {
                    name: 'Test Department',
                    code: 'TD',
                    description: 'this is just a test',
                    status: 'Active'
                }
            ];
            
            for (const dept of departments) {
                await connection.execute(
                    `INSERT INTO departments (name, code, description, status) 
                     VALUES (?, ?, ?, ?)`,
                    [dept.name, dept.code, dept.description, dept.status]
                );
            }
            
            console.log(`✅ Seeded ${departments.length} departments`);
        } catch (error) {
            console.log('⏭️ Departments table not ready for seeding yet:', error.message);
        }
    }

    async seedEmployees() {
        try {
            const existing = await connection.get('SELECT COUNT(*) as count FROM employees');
            
            if (existing.count > 0) {
                console.log('⚠️ Employees table already has data, skipping employee seeding');
                return;
            }
            
            console.log('👥 Seeding sample employees...');
            
            const employees = [
                {
                    payroll_number: '10001',
                    full_name: 'John Kariuki Mwangi',
                    id_number: '12345678',
                    gender: 'M',
                    age: 46,
                    designation: 'Senior Finance Officer',
                    job_group: 'A',
                    status: '0',
                    retirement_date: 'NA',
                    employment_status: 'Permanent',
                    date_of_birth: '1978-03-15',
                    disability: 0,
                    department_id: '1'
                },
                {
                    payroll_number: '10002',
                    full_name: 'Sarah Kamau Wanjiru',
                    id_number: '23456789',
                    gender: 'F',
                    age: 39,
                    designation: 'Human Resources Manager',
                    job_group: 'B',
                    status: '0',
                    retirement_date: 'NA',
                    employment_status: 'Permanent',
                    date_of_birth: '1985-06-22',
                    disability: 4,
                    department_id: '1'
                },
                {
                    payroll_number: '10003',
                    full_name: 'Peter Omondi Kipchoge',
                    id_number: '34567890',
                    gender: 'M',
                    age: 42,
                    designation: 'Operations Supervisor',
                    job_group: 'A',
                    status: '0',
                    retirement_date: 'NA',
                    employment_status: 'Contract',
                    date_of_birth: '1982-11-08',
                    disability: 0,
                    department_id: '1'
                },
                {
                    payroll_number: '10004',
                    full_name: 'Alice Njeri Muthoni',
                    id_number: '45678901',
                    gender: 'F',
                    age: 34,
                    designation: 'Accounts Officer',
                    job_group: 'B',
                    status: '0',
                    retirement_date: 'NA',
                    employment_status: 'Permanent',
                    date_of_birth: '1990-01-30',
                    disability: 0,
                    department_id: '1'
                },
                {
                    payroll_number: '10005',
                    full_name: 'Michael Kiplagat Bor',
                    id_number: '56789012',
                    gender: 'M',
                    age: 49,
                    designation: 'Deputy Director',
                    job_group: 'A',
                    status: '0',
                    retirement_date: 'NA',
                    employment_status: 'Permanent',
                    date_of_birth: '1975-09-12',
                    disability: 0,
                    department_id: '1'
                }
            ];
            
            for (const emp of employees) {
                await connection.execute(
                    `INSERT INTO employees 
                    (payroll_number, full_name, id_number, gender, age, designation, job_group, 
                     status, retirement_date, employment_status, date_of_birth, disability, department_id) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [emp.payroll_number, emp.full_name, emp.id_number, emp.gender, emp.age, 
                     emp.designation, emp.job_group, emp.status, emp.retirement_date, 
                     emp.employment_status, emp.date_of_birth, emp.disability, emp.department_id]
                );
            }
            
            console.log(`✅ Seeded ${employees.length} employees`);
        } catch (error) {
            console.log('⏭️ Employees table not ready for seeding yet:', error.message);
        }
    }
}

// Create instance
const seeder = new DatabaseSeeder();

// Export the instance directly
module.exports = seeder;