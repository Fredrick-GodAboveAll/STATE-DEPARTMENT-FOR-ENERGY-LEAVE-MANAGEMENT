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
            await this.seedLeaveApplications();
            
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
            // Skip user seeding - allow users to register themselves
            console.log('⏭️ Skipping user seeding - register new users via sign-up');
            return;
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
                    leave_name: 'Annual Leave',
                    color: 'primary',
                    entitled_days: 21,
                    gender_restriction: 'All',
                    description: 'Annual leave with pay',
                    carry_forward_days: null,
                    status: 'Active'
                },
                {
                    leave_name: 'Sick Leave',
                    color: 'danger',
                    entitled_days: 14,
                    gender_restriction: 'All',
                    description: 'Sick leave with pay',
                    carry_forward_days: null,
                    status: 'Active'
                },
                {
                    leave_name: 'Maternity Leave',
                    color: 'success',
                    entitled_days: 90,
                    gender_restriction: 'Female',
                    description: 'Maternity leave',
                    carry_forward_days: null,
                    status: 'Active'
                },
                {
                    leave_name: 'Paternity Leave',
                    color: 'warning',
                    entitled_days: 7,
                    gender_restriction: 'Male',
                    description: 'Paternity leave',
                    carry_forward_days: null,
                    status: 'Active'
                },
                {
                    leave_name: 'Casual Leave',
                    color: 'info',
                    entitled_days: 7,
                    gender_restriction: 'All',
                    description: 'Casual leave',
                    carry_forward_days: null,
                    status: 'Active'
                },
                {
                    leave_name: 'Bereavement Leave',
                    color: 'secondary',
                    entitled_days: 3,
                    gender_restriction: 'All',
                    description: 'Bereavement leave',
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
                    name: 'Human Resource',
                    code: 'HR',
                    description: 'Human Resources Department',
                    status: 'Active'
                },
                {
                    name: 'Information Technology',
                    code: 'IT',
                    description: 'Information Technology Department',
                    status: 'Active'
                },
                {
                    name: 'Finance',
                    code: 'FIN',
                    description: 'Finance Department',
                    status: 'Active'
                },
                {
                    name: 'Operations',
                    code: 'OPS',
                    description: 'Operations Department',
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
            
            console.log('👥 Seeding sample employees (no departments - NULL)...');
            
            const employees = [
                {
                    payroll_number: 'EMP001',
                    full_name: 'John Mwangi',
                    id_number: '12345678',
                    gender: 'M',
                    age: 46,
                    designation: 'Senior Finance Officer',
                    job_group: 'A',
                    status: '0',
                    retirement_date: 'NA',
                    employment_status: 'Permanent',
                    date_of_birth: '1978-03-15',
                    disability: 'no',
                    department_id: 1  // Human Resource
                },
                {
                    payroll_number: 'EMP002',
                    full_name: 'Sarah Wanjiku',
                    id_number: '23456789',
                    gender: 'F',
                    age: 39,
                    designation: 'Human Resources Manager',
                    job_group: 'B',
                    status: '0',
                    retirement_date: 'NA',
                    employment_status: 'Permanent',
                    date_of_birth: '1985-06-22',
                    disability: 'yes',
                    department_id: 2  // Information Technology
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
                    disability: 'no',
                    department_id: 4  // Operations
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
                    disability: 'no',
                    department_id: 3  // Finance
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
                    disability: 'no',
                    department_id: 1  // Human Resource
                }
            ];
            
            for (const emp of employees) {
                await connection.execute(
                    `INSERT INTO employees (payroll_number, full_name, id_number, gender, age, designation, job_group, status, retirement_date, employment_status, date_of_birth, disability, department_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [emp.payroll_number, emp.full_name, emp.id_number, emp.gender, emp.age, 
                     emp.designation, emp.job_group, emp.status, emp.retirement_date, 
                     emp.employment_status, emp.date_of_birth, emp.disability, emp.department_id]
                );
            }
            
            console.log(`✅ Seeded ${employees.length} employees (all without departments)`);
        } catch (error) {
            console.log('⏭️ Employees table not ready for seeding yet:', error.message);
        }
    }

    async seedLeaveApplications() {
        try {
            const existing = await connection.get('SELECT COUNT(*) as count FROM leave_applications');
            
            if (existing.count > 0) {
                console.log('⚠️ Leave applications table already has data, skipping leave application seeding');
                return;
            }
            
            console.log('📋 Seeding sample leave applications...');
            
            const leaveApplications = [
                {
                    ref_no: 'LA/001/2026',
                    employee_id: 1,  // John Mwangi
                    leave_type_id: 1,  // Annual Leave
                    start_date: '2026-02-01',
                    end_date: '2026-02-14',
                    back_on: '2026-02-15',
                    duration_days: 14,
                    applied_on: '2026-01-10',
                    letter_date: '2026-01-15',
                    status: 'Pending',
                    reason: null
                },
                {
                    ref_no: 'LA/002/2026',
                    employee_id: 2,  // Sarah Wanjiku
                    leave_type_id: 2,  // Sick Leave
                    start_date: '2026-01-20',
                    end_date: '2026-01-24',
                    back_on: '2026-01-25',
                    duration_days: 5,
                    applied_on: '2026-01-19',
                    letter_date: '2026-01-20',
                    status: 'Approved',
                    reason: null
                }
            ];
            
            for (const app of leaveApplications) {
                await connection.execute(
                    `INSERT INTO leave_applications (ref_no, employee_id, leave_type_id, start_date, end_date, back_on, duration_days, applied_on, letter_date, status, reason) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [app.ref_no, app.employee_id, app.leave_type_id, app.start_date, app.end_date, app.back_on, 
                     app.duration_days, app.applied_on, app.letter_date, app.status, app.reason]
                );
            }
            
            console.log(`✅ Seeded ${leaveApplications.length} leave applications`);
        } catch (error) {
            console.log('⏭️ Leave applications table not ready for seeding yet:', error.message);
        }
    }
}

// Create instance
const seeder = new DatabaseSeeder();

// Export the instance directly
module.exports = seeder;