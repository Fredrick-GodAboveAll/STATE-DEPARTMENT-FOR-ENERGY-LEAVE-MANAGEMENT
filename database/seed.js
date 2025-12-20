// database/seed.js
const connection = require('./connection');
const schemas = require('./schemas');

class DatabaseSeeder {
    constructor() {
        this.connection = connection;
    }

    async seedSampleHolidays() {
        try {
            const sampleHolidays = [
                { 
                    holiday_name: 'New Year\'s Day', 
                    holiday_date: '2024-01-01', 
                    holiday_type: 'Public Holiday', 
                    year: 2024, 
                    recurring: 1,
                    description: 'Celebration of the new year'
                },
                { 
                    holiday_name: 'Good Friday', 
                    holiday_date: '2024-03-29', 
                    holiday_type: 'Public Holiday', 
                    year: 2024, 
                    recurring: 1,
                    description: 'Christian holiday commemorating the crucifixion of Jesus'
                },
                { 
                    holiday_name: 'Easter Monday', 
                    holiday_date: '2024-04-01', 
                    holiday_type: 'Public Holiday', 
                    year: 2024, 
                    recurring: 1,
                    description: 'Day after Easter Sunday'
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
                    holiday_name: 'Company Foundation Day', 
                    holiday_date: '2024-06-15', 
                    holiday_type: 'Company Holiday', 
                    year: 2024, 
                    recurring: 1,
                    description: 'Annual celebration of company founding'
                }
            ];

            console.log('🌴 Seeding sample holidays...');
            let inserted = 0;
            
            for (const holiday of sampleHolidays) {
                try {
                    await this.connection.execute(
                        schemas.holiday.INSERT_HOLIDAY,
                        [
                            holiday.holiday_name, 
                            holiday.holiday_date, 
                            holiday.holiday_type,
                            holiday.year, 
                            holiday.recurring, 
                            holiday.description, 
                            1  // created_by (user_id 1)
                        ]
                    );
                    inserted++;
                } catch (error) {
                    if (!error.message.includes('UNIQUE')) {
                        console.warn('⚠️ Error inserting holiday:', error.message);
                    }
                }
            }
            
            console.log(`✅ Seeded ${inserted} holidays`);
            return inserted;
        } catch (error) {
            console.error('❌ Error seeding holidays:', error.message);
            throw error;
        }
    }

    async seedSampleLeaveTypes() {
        try {
            const sampleLeaveTypes = [
                { 
                    leave_name: 'Annual Leave', 
                    color: 'blue', 
                    entitled_days: 30, 
                    gender_restriction: 'All', 
                    description: 'Slick - Drag & Drop Bootstrap Generator',
                    status: 'Active'
                },
                { 
                    leave_name: 'Paternity Leave', 
                    color: 'yellow', 
                    entitled_days: 10, 
                    gender_restriction: 'Male', 
                    description: 'For new fathers',
                    status: 'Active'
                },
                { 
                    leave_name: 'Maternity Leave', 
                    color: 'pink', 
                    entitled_days: 90, 
                    gender_restriction: 'Female', 
                    description: 'For new mothers',
                    status: 'Active'
                },
                { 
                    leave_name: 'Sick Leave', 
                    color: 'green', 
                    entitled_days: 15, 
                    gender_restriction: 'All', 
                    description: 'Medical leave with doctor\'s note',
                    status: 'Active'
                },
                { 
                    leave_name: 'Study Leave', 
                    color: 'purple', 
                    entitled_days: 5, 
                    gender_restriction: 'All', 
                    description: 'For professional development',
                    status: 'Inactive'
                }
            ];

            console.log('📝 Seeding sample leave types...');
            let inserted = 0;
            
            for (const leave of sampleLeaveTypes) {
                try {
                    await this.connection.execute(
                        schemas.leavetype.INSERT_LEAVE_TYPE,
                        [
                            leave.leave_name, 
                            leave.color, 
                            leave.entitled_days,
                            leave.gender_restriction, 
                            leave.description, 
                            leave.status
                        ]
                    );
                    inserted++;
                } catch (error) {
                    if (!error.message.includes('UNIQUE')) {
                        console.warn('⚠️ Error inserting leave type:', error.message);
                    }
                }
            }
            
            console.log(`✅ Seeded ${inserted} leave types`);
            return inserted;
        } catch (error) {
            console.error('❌ Error seeding leave types:', error.message);
            throw error;
        }
    }

    async seedSampleEmployees() {
        try {
            const sampleEmployees = [
                { 
                    payroll_number: '1983077337',
                    full_name: 'MR EG JMA',
                    id_number: '164',
                    gender: 'M',
                    age: 53,
                    designation: 'Deputy Director - HRM & Development',
                    job_group: 'P',
                    status: '0 - Active',
                    retirement_date: '04/11/2026',
                    employment_status: 'Permanent'
                },
                { 
                    payroll_number: '2000171800',
                    full_name: 'Mr. Fredrick Wambua Muasya',
                    id_number: '30008279',
                    gender: 'M',
                    age: 26,
                    designation: 'Human Resource Management Assistant 3',
                    job_group: 'H',
                    status: '0 - Active',
                    retirement_date: '25/11/2065',
                    employment_status: 'Permanent'
                }
            ];

            console.log('👥 Seeding sample employees...');
            let inserted = 0;
            
            for (const employee of sampleEmployees) {
                try {
                    await this.connection.execute(
                        schemas.employee.INSERT_EMPLOYEE,
                        [
                            employee.payroll_number, 
                            employee.full_name, 
                            employee.id_number,
                            employee.gender, 
                            employee.age, 
                            employee.designation, 
                            employee.job_group,
                            employee.status,        // New order: status comes before retirement_date
                            employee.retirement_date, 
                            employee.employment_status  // New order: employment_status comes last
                        ]
                    );
                    inserted++;
                } catch (error) {
                    if (!error.message.includes('UNIQUE')) {
                        console.warn('⚠️ Error inserting employee:', error.message);
                    }
                }
            }
            
            console.log(`✅ Seeded ${inserted} employees`);
            return inserted;
        } catch (error) {
            console.error('❌ Error seeding employees:', error.message);
            throw error;
        }
    }

    async seedSampleUsers() {
        try {
            const sampleUsers = [
                {
                    first_name: 'Admin',
                    last_name: 'User',
                    email: 'admin@company.com',
                    password: '$2b$10$YourHashedPasswordHere', // You should hash this properly
                    last_login: new Date().toISOString()
                }
            ];

            console.log('👤 Seeding sample users...');
            let inserted = 0;
            
            for (const user of sampleUsers) {
                try {
                    await this.connection.execute(
                        schemas.user.INSERT_USER,
                        [
                            user.first_name, 
                            user.last_name, 
                            user.email,
                            user.password, 
                            user.last_login
                        ]
                    );
                    inserted++;
                } catch (error) {
                    if (!error.message.includes('UNIQUE')) {
                        console.warn('⚠️ Error inserting user:', error.message);
                    }
                }
            }
            
            console.log(`✅ Seeded ${inserted} users`);
            return inserted;
        } catch (error) {
            console.error('❌ Error seeding users:', error.message);
            throw error;
        }
    }

    async seedAll() {
        try {
            await this.connection.connect();
            
            console.log('🌱 Starting database seeding...');
            
            // Check if database is empty
            const usersCount = await this.connection.get(schemas.user.COUNT_USERS);
            
            if (usersCount.count === 0) {
                await this.seedSampleUsers();
            } else {
                console.log('⚠️ Users table already has data, skipping user seeding');
            }
            
            // Check holidays
            const holidayCount = await this.connection.get("SELECT COUNT(*) as count FROM holidays");
            if (holidayCount.count === 0) {
                await this.seedSampleHolidays();
            } else {
                console.log('⚠️ Holidays table already has data, skipping holiday seeding');
            }
            
            // Check leave types
            const leaveTypeCount = await this.connection.get("SELECT COUNT(*) as count FROM leave_types");
            if (leaveTypeCount.count === 0) {
                await this.seedSampleLeaveTypes();
            } else {
                console.log('⚠️ Leave types table already has data, skipping leave type seeding');
            }
            
            // Check employees
            const employeeCount = await this.connection.get("SELECT COUNT(*) as count FROM employees");
            if (employeeCount.count === 0) {
                await this.seedSampleEmployees();
            } else {
                console.log('⚠️ Employees table already has data, skipping employee seeding');
            }
            
            console.log('✅ Database seeding completed');
            return true;
        } catch (error) {
            console.error('❌ Error seeding database:', error.message);
            throw error;
        }
    }

    async clearAll() {
        try {
            await this.connection.connect();
            
            console.log('🧹 Clearing all data...');
            
            await this.connection.execute('DELETE FROM employees');
            await this.connection.execute('DELETE FROM leave_types');
            await this.connection.execute('DELETE FROM holidays');
            await this.connection.execute('DELETE FROM resets');
            await this.connection.execute('DELETE FROM profiles');
            await this.connection.execute('DELETE FROM users');
            
            console.log('✅ All data cleared');
            return true;
        } catch (error) {
            console.error('❌ Error clearing data:', error.message);
            throw error;
        }
    }
}

module.exports = new DatabaseSeeder();