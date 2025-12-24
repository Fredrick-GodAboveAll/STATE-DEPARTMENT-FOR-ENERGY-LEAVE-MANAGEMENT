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
                    holiday_name: 'New Year\'s Day',
                    holiday_date: '2024-01-01',
                    holiday_type: 'Public Holiday',
                    year: 2024,
                    recurring: 1,
                    description: 'First day of the year'
                },
                {
                    holiday_name: 'Labour Day',
                    holiday_date: '2024-05-01',
                    holiday_type: 'Public Holiday',
                    year: 2024,
                    recurring: 1,
                    description: 'International Workers\' Day'
                },
                {
                    holiday_name: 'Christmas Day',
                    holiday_date: '2024-12-25',
                    holiday_type: 'Public Holiday',
                    year: 2024,
                    recurring: 1,
                    description: 'Christmas celebration'
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
                    leave_name: 'Annual Leave',
                    color: 'primary',
                    entitled_days: 21,
                    gender_restriction: 'All',
                    description: 'Paid annual vacation leave',
                    status: 'Active'
                },
                {
                    leave_name: 'Sick Leave',
                    color: 'danger',
                    entitled_days: 10,
                    gender_restriction: 'All',
                    description: 'Medical leave with doctor\'s note',
                    status: 'Active'
                },
                {
                    leave_name: 'Maternity Leave',
                    color: 'success',
                    entitled_days: 90,
                    gender_restriction: 'Female',
                    description: 'Leave for new mothers',
                    status: 'Active'
                },
                {
                    leave_name: 'Paternity Leave',
                    color: 'info',
                    entitled_days: 14,
                    gender_restriction: 'Male',
                    description: 'Leave for new fathers',
                    status: 'Active'
                }
            ];
            
            for (const leaveType of leaveTypes) {
                await connection.execute(
                    `INSERT INTO leave_types (leave_name, color, entitled_days, gender_restriction, description, status) 
                     VALUES (?, ?, ?, ?, ?, ?)`,
                    [leaveType.leave_name, leaveType.color, leaveType.entitled_days, 
                     leaveType.gender_restriction, leaveType.description, leaveType.status]
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
                    name: 'Human Resources',
                    code: 'HR',
                    description: 'Handles recruitment, employee relations, and benefits',
                    status: 'Active'
                },
                {
                    name: 'Information Technology',
                    code: 'IT',
                    description: 'Manages technology infrastructure and support',
                    status: 'Active'
                },
                {
                    name: 'Finance',
                    code: 'FIN',
                    description: 'Handles accounting, budgeting, and financial reporting',
                    status: 'Active'
                },
                {
                    name: 'Operations',
                    code: 'OPS',
                    description: 'Manages day-to-day business operations',
                    status: 'Active'
                },
                {
                    name: 'Marketing',
                    code: 'MKT',
                    description: 'Responsible for brand promotion and customer acquisition',
                    status: 'Active'
                },
                {
                    name: 'Sales',
                    code: 'SAL',
                    description: 'Handles customer acquisition and revenue generation',
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
                    payroll_number: '1983077337',
                    full_name: 'MR EG JMA',
                    id_number: '111111111',
                    gender: 'M',
                    age: 35,
                    designation: 'Manager',
                    job_group: 'JG6',
                    status: 'Active',
                    retirement_date: '2040-12-31',
                    employment_status: 'Permanent',
                    date_of_birth: '1988-05-15',
                    disability: 'None'
                },
                {
                    payroll_number: '2000171800',
                    full_name: 'Mr. Fredrick Wambua Muasya',
                    id_number: '222222222',
                    gender: 'M',
                    age: 32,
                    designation: 'Senior Developer',
                    job_group: 'JG5',
                    status: 'Active',
                    retirement_date: '2042-06-30',
                    employment_status: 'Permanent',
                    date_of_birth: '1991-08-22',
                    disability: 'None'
                },
                {
                    payroll_number: 'EMP003',
                    full_name: 'Jane Smith',
                    id_number: '333333333',
                    gender: 'F',
                    age: 28,
                    designation: 'HR Specialist',
                    job_group: 'JG4',
                    status: 'Active',
                    retirement_date: '2045-03-15',
                    employment_status: 'Contract',
                    date_of_birth: '1995-11-30',
                    disability: 'Visual Impairment'
                }
            ];
            
            for (const emp of employees) {
                await connection.execute(
                    `INSERT INTO employees 
                    (payroll_number, full_name, id_number, gender, age, designation, job_group, 
                     status, retirement_date, employment_status, date_of_birth, disability) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [emp.payroll_number, emp.full_name, emp.id_number, emp.gender, emp.age, 
                     emp.designation, emp.job_group, emp.status, emp.retirement_date, 
                     emp.employment_status, emp.date_of_birth, emp.disability]
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