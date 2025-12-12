// =============================================
// DATABASE.JS - FIXED SYNTAX ERROR VERSION
// =============================================

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Initialize database connection
const db = new sqlite3.Database('./auth.db');

// Function to initialize database tables
function initializeDatabase() {
  return new Promise((resolve, reject) => {
    db.serialize(function () {
      // Users table WITH last_login column
      db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT,
        last_name TEXT,
        email TEXT UNIQUE,
        password TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        last_login DATETIME
      )`, function(err) {
        if (err) {
          console.error("Error creating users table:", err);
          reject(err);
        } else {
          console.log("✅ Users table ready (with last_login column)");
        }
      });

      // Password resets table
      db.run(`CREATE TABLE IF NOT EXISTS resets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT,
        token TEXT UNIQUE,
        expires TEXT
      )`, function(err) {
        if (err) {
          console.error("Error creating resets table:", err);
        } else {
          console.log("✅ Resets table ready");
        }
      });

      // Profiles table
      db.run(`CREATE TABLE IF NOT EXISTS profiles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER UNIQUE,
        avatar_url TEXT,
        bio TEXT,
        website TEXT,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      )`, function(err) {
        if (err) {
          console.error("Error creating profiles table:", err);
        } else {
          console.log("✅ Profiles table ready");
        }
      });

      // Holidays table
      db.run(`CREATE TABLE IF NOT EXISTS holidays (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        holiday_name TEXT NOT NULL,
        holiday_date DATE NOT NULL,
        holiday_type TEXT CHECK(holiday_type IN 
          ('Public Holiday', 'Company Holiday', 'Optional Holiday', 'Special Day')),
        year INTEGER NOT NULL,
        recurring BOOLEAN DEFAULT 0,
        description TEXT,
        created_by INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (created_by) REFERENCES users (id) ON DELETE SET NULL
      )`, function(err) {
        if (err) {
          console.error("Error creating holidays table:", err);
          reject(err);
        } else {
          console.log("✅ Holidays table ready");
        }
      });

      // Leave Types table
      db.run(`CREATE TABLE IF NOT EXISTS leave_types (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        leave_name TEXT NOT NULL UNIQUE,
        color TEXT DEFAULT 'primary',
        entitled_days INTEGER NOT NULL CHECK(entitled_days >= 0),
        gender_restriction TEXT CHECK(gender_restriction IN 
          ('All', 'Male', 'Female', 'Other', 'None')),
        description TEXT,
        status TEXT DEFAULT 'Active' CHECK(status IN ('Active', 'Inactive', 'Archived')),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`, function(err) {
        if (err) {
          console.error("Error creating leave_types table:", err);
          reject(err);
        } else {
          console.log("✅ Leave types table ready");
        }
      });

      // Employees table
      db.run(`CREATE TABLE IF NOT EXISTS employees (
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
      )`, function(err) {
        if (err) {
          console.error("Error creating employees table:", err);
          reject(err);
        } else {
          console.log("✅ Employees table ready");
          console.log("✅ Database initialized successfully");
          resolve();
        }
      });
    });
  });
}

// Holiday Queries
const holidayQueries = {
  insertHoliday: `INSERT INTO holidays 
    (holiday_name, holiday_date, holiday_type, year, recurring, description, created_by) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
  getAllHolidays: `SELECT h.*, u.first_name, u.last_name 
    FROM holidays h 
    LEFT JOIN users u ON h.created_by = u.id 
    ORDER BY holiday_date`,
  getHolidaysByYear: `SELECT * FROM holidays WHERE year = ? ORDER BY holiday_date`,
  getHolidaysByType: `SELECT * FROM holidays WHERE holiday_type = ? AND year = ? ORDER BY holiday_date`,
  getUpcomingHolidays: `SELECT * FROM holidays 
    WHERE holiday_date >= date('now') 
    ORDER BY holiday_date LIMIT 10`,
  getHolidayById: `SELECT h.*, u.first_name, u.last_name 
    FROM holidays h 
    LEFT JOIN users u ON h.created_by = u.id 
    WHERE h.id = ?`,
  updateHoliday: `UPDATE holidays SET 
    holiday_name = ?, holiday_date = ?, holiday_type = ?, 
    year = ?, recurring = ?, description = ?, updated_at = CURRENT_TIMESTAMP 
    WHERE id = ?`,
  deleteHoliday: `DELETE FROM holidays WHERE id = ?`,
  getHolidaysByMonth: `SELECT * FROM holidays 
    WHERE strftime('%Y-%m', holiday_date) = ? 
    ORDER BY holiday_date`
};

// Leave Types Queries
const leaveTypesQueries = {
  insertLeaveType: `INSERT INTO leave_types 
    (leave_name, color, entitled_days, gender_restriction, description, status) 
    VALUES (?, ?, ?, ?, ?, ?)`,
  getAllLeaveTypes: `SELECT * FROM leave_types ORDER BY leave_name`,
  getLeaveTypeById: `SELECT * FROM leave_types WHERE id = ?`,
  getLeaveTypesByStatus: `SELECT * FROM leave_types WHERE status = ? ORDER BY leave_name`,
  updateLeaveType: `UPDATE leave_types SET 
    leave_name = ?, color = ?, entitled_days = ?, 
    gender_restriction = ?, description = ?, status = ?,
    updated_at = CURRENT_TIMESTAMP 
    WHERE id = ?`,
  deleteLeaveType: `DELETE FROM leave_types WHERE id = ?`,
  getActiveLeaveTypes: `SELECT * FROM leave_types WHERE status = 'Active' ORDER BY leave_name`
};

// Employees Queries
const employeesQueries = {
  insertEmployee: `INSERT INTO employees 
    (payroll_number, full_name, id_number, gender, age, designation, job_group, 
     employment_status, retirement_date, status) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  
  getAllEmployees: `SELECT * FROM employees ORDER BY full_name`,
  
  getEmployeeById: `SELECT * FROM employees WHERE id = ?`,
  
  getEmployeeByPayroll: `SELECT * FROM employees WHERE payroll_number = ?`,
  
  getEmployeesByStatus: `SELECT * FROM employees WHERE status = ? ORDER BY full_name`,
  
  updateEmployee: `UPDATE employees SET 
    payroll_number = ?, full_name = ?, id_number = ?, gender = ?, age = ?, 
    designation = ?, job_group = ?, employment_status = ?, 
    retirement_date = ?, status = ?, updated_at = CURRENT_TIMESTAMP 
    WHERE id = ?`,
  
  deleteEmployee: `DELETE FROM employees WHERE id = ?`,
  
  countEmployeesByStatus: `SELECT status, COUNT(*) as count FROM employees GROUP BY status`,
  
  searchEmployees: `SELECT * FROM employees 
    WHERE full_name LIKE ? OR payroll_number LIKE ? OR id_number LIKE ? 
    ORDER BY full_name`
};

// Holiday CRUD Functions
function insertHoliday(holidayData) {
  return new Promise((resolve, reject) => {
    const { holiday_name, holiday_date, holiday_type, year, recurring, description, created_by } = holidayData;
    
    db.run(holidayQueries.insertHoliday,
      [holiday_name, holiday_date, holiday_type, year, recurring || 0, description, created_by],
      function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
  });
}

function getAllHolidays() {
  return new Promise((resolve, reject) => {
    db.all(holidayQueries.getAllHolidays, [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function getHolidaysByYear(year) {
  return new Promise((resolve, reject) => {
    db.all(holidayQueries.getHolidaysByYear, [year], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function getUpcomingHolidays() {
  return new Promise((resolve, reject) => {
    db.all(holidayQueries.getUpcomingHolidays, [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function getHolidayById(id) {
  return new Promise((resolve, reject) => {
    db.get(holidayQueries.getHolidayById, [id], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

function updateHoliday(id, holidayData) {
  return new Promise((resolve, reject) => {
    const { holiday_name, holiday_date, holiday_type, year, recurring, description } = holidayData;
    
    db.run(holidayQueries.updateHoliday,
      [holiday_name, holiday_date, holiday_type, year, recurring || 0, description, id],
      function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes);
        }
      });
  });
}

function deleteHoliday(id) {
  return new Promise((resolve, reject) => {
    db.run(holidayQueries.deleteHoliday, [id], function(err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.changes);
      }
    });
  });
}

// Leave Types CRUD Functions
function insertLeaveType(leaveData) {
  return new Promise((resolve, reject) => {
    const { leave_name, color, entitled_days, gender_restriction, description, status } = leaveData;
    
    db.run(leaveTypesQueries.insertLeaveType,
      [leave_name, color, entitled_days, gender_restriction || 'All', description, status || 'Active'],
      function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
  });
}

function getAllLeaveTypes() {
  return new Promise((resolve, reject) => {
    db.all(leaveTypesQueries.getAllLeaveTypes, [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function getLeaveTypeById(id) {
  return new Promise((resolve, reject) => {
    db.get(leaveTypesQueries.getLeaveTypeById, [id], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

function updateLeaveType(id, leaveData) {
  return new Promise((resolve, reject) => {
    const { leave_name, color, entitled_days, gender_restriction, description, status } = leaveData;
    
    db.run(leaveTypesQueries.updateLeaveType,
      [leave_name, color, entitled_days, gender_restriction || 'All', description, status || 'Active', id],
      function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes);
        }
      });
  });
}

function deleteLeaveType(id) {
  return new Promise((resolve, reject) => {
    db.run(leaveTypesQueries.deleteLeaveType, [id], function(err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.changes);
      }
    });
  });
}

// Employees CRUD Functions
function insertEmployee(employeeData) {
  return new Promise((resolve, reject) => {
    const {
      payroll_number, full_name, id_number, gender, age, designation, job_group,
      employment_status, retirement_date, status
    } = employeeData;
    
    db.run(employeesQueries.insertEmployee,
      [
        payroll_number, full_name, id_number, gender || null, age || null, 
        designation, job_group || null, employment_status || 'Permanent', 
        retirement_date || null, status || 'Active'
      ],
      function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
  });
}

function getAllEmployees() {
  return new Promise((resolve, reject) => {
    db.all(employeesQueries.getAllEmployees, [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function getEmployeeById(id) {
  return new Promise((resolve, reject) => {
    db.get(employeesQueries.getEmployeeById, [id], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

// FIXED THIS FUNCTION - Syntax Error at Line 400
function getEmployeeByPayroll(payrollNumber) {
  return new Promise((resolve, reject) => {
    db.get(employeesQueries.getEmployeeByPayroll, [payrollNumber], function(err, row) {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

function updateEmployee(id, employeeData) {
  return new Promise((resolve, reject) => {
    const {
      payroll_number, full_name, id_number, gender, age, designation, job_group,
      employment_status, retirement_date, status
    } = employeeData;
    
    db.run(employeesQueries.updateEmployee,
      [
        payroll_number, full_name, id_number, gender || null, age || null, 
        designation, job_group || null, employment_status || 'Permanent', 
        retirement_date || null, status || 'Active', id
      ],
      function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes);
        }
      });
  });
}

function deleteEmployee(id) {
  return new Promise((resolve, reject) => {
    db.run(employeesQueries.deleteEmployee, [id], function(err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.changes);
      }
    });
  });
}

function getEmployeeStatistics() {
  return new Promise((resolve, reject) => {
    db.all(employeesQueries.countEmployeesByStatus, [], function(err, statusCounts) {
      if (err) {
        reject(err);
        return;
      }
      
      // Find active employees count safely
      let activeEmployeesItem = null;
      for (let i = 0; i < statusCounts.length; i++) {
        if (statusCounts[i].status === 'Active') {
          activeEmployeesItem = statusCounts[i];
          break;
        }
      }
      const activeEmployeesCount = activeEmployeesItem ? activeEmployeesItem.count : 0;
      
      // Calculate total employees
      let totalEmployees = 0;
      for (let i = 0; i < statusCounts.length; i++) {
        totalEmployees += statusCounts[i].count;
      }
      
      resolve({
        statusCounts: statusCounts,
        totalEmployees: totalEmployees,
        activeEmployees: activeEmployeesCount
      });
    });
  });
}

// Function to insert sample holiday data
function insertSampleHolidays() {
  return new Promise((resolve, reject) => {
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

    let done = 0;
    sampleHolidays.forEach(function(holiday) {
      db.run(holidayQueries.insertHoliday,
        [holiday.holiday_name, holiday.holiday_date, holiday.holiday_type,
         holiday.year, holiday.recurring, holiday.description, 1],
        function(err) {
          done++;
          if (err && err.message && err.message.indexOf("UNIQUE") === -1) {
            console.error("❌ Holiday insert error:", err.message);
          }
          if (done === sampleHolidays.length) {
            console.log("✅ Sample holidays inserted");
            resolve();
          }
        });
    });
  });
}

// Function to insert sample leave type data
function insertSampleLeaveTypes() {
  return new Promise((resolve, reject) => {
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

    let done = 0;
    sampleLeaveTypes.forEach(function(leave) {
      db.run(leaveTypesQueries.insertLeaveType,
        [leave.leave_name, leave.color, leave.entitled_days,
         leave.gender_restriction, leave.description, leave.status],
        function(err) {
          done++;
          if (err && err.message && err.message.indexOf("UNIQUE") === -1) {
            console.error("❌ Leave type insert error:", err.message);
          }
          if (done === sampleLeaveTypes.length) {
            console.log("✅ Sample leave types inserted");
            resolve();
          }
        });
    });
  });
}

// Function to insert sample employee data
function insertSampleEmployees() {
  return new Promise((resolve, reject) => {
    const sampleEmployees = [
      { 
        payroll_number: '2000171800',
        full_name: 'Mr. Fredrick Wambua Muasya',
        id_number: '30008279',
        gender: 'Male',
        age: 26,
        designation: 'Human Resource Management Assistant 3',
        job_group: 'H',
        employment_status: 'Permanent',
        retirement_date: '2065-11-25',
        status: 'Active'
      },
      { 
        payroll_number: '2000171801',
        full_name: 'Ms. Sarah Wanjiku Kimani',
        id_number: '12345678',
        gender: 'Female',
        age: 35,
        designation: 'Senior Software Engineer',
        job_group: 'G',
        employment_status: 'Permanent',
        retirement_date: '2058-03-20',
        status: 'Active'
      },
      { 
        payroll_number: '2000171802',
        full_name: 'Mr. James Mwangi Kariuki',
        id_number: '23456789',
        gender: 'Male',
        age: 42,
        designation: 'Sales Manager',
        job_group: 'F',
        employment_status: 'Permanent',
        retirement_date: '2046-07-10',
        status: 'Active'
      },
      { 
        payroll_number: '2000171803',
        full_name: 'Ms. Grace Akinyi Odhiambo',
        id_number: '34567890',
        gender: 'Female',
        age: 29,
        designation: 'Finance Officer',
        job_group: 'H',
        employment_status: 'Permanent',
        retirement_date: '2059-11-25',
        status: 'Active'
      },
      { 
        payroll_number: '2000171804',
        full_name: 'Mr. Peter Kamau Njoroge',
        id_number: '45678901',
        gender: 'Male',
        age: 38,
        designation: 'System Administrator',
        job_group: 'G',
        employment_status: 'Contract',
        retirement_date: '2050-02-14',
        status: 'Active'
      }
    ];

    let done = 0;
    sampleEmployees.forEach(function(employee) {
      db.run(employeesQueries.insertEmployee,
        [
          employee.payroll_number, employee.full_name, employee.id_number,
          employee.gender, employee.age, employee.designation, employee.job_group,
          employee.employment_status, employee.retirement_date, employee.status
        ],
        function(err) {
          done++;
          if (err && err.message && err.message.indexOf("UNIQUE") === -1) {
            console.error("❌ Employee insert error:", err.message);
          }
          if (done === sampleEmployees.length) {
            console.log("✅ Sample employees inserted");
            resolve();
          }
        });
    });
  });
}

// Update the initializeDatabaseWithSampleData function to include all tables
function initializeDatabaseWithSampleData() {
  return new Promise((resolve, reject) => {
    initializeDatabase().then(function() {
      // Check if we need to insert sample holidays
      db.get('SELECT COUNT(*) as count FROM holidays', [], function(err, row) {
        if (err) {
          console.error('Error checking holiday data:', err);
          checkLeaveTypes();
          return;
        }
        
        if (!row || row.count === 0) {
          console.log('No holiday data found, inserting sample holidays...');
          insertSampleHolidays().then(function() {
            console.log('Sample holidays inserted');
            checkLeaveTypes();
          }).catch(function(err) {
            console.error('Error inserting sample holidays:', err);
            checkLeaveTypes();
          });
        } else {
          console.log('Found ' + row.count + ' existing holiday records');
          checkLeaveTypes();
        }
      });

      function checkLeaveTypes() {
        // Check if we need to insert sample leave types
        db.get('SELECT COUNT(*) as count FROM leave_types', [], function(err, row) {
          if (err) {
            console.error('Error checking leave types data:', err);
            checkEmployees();
            return;
          }
          
          if (!row || row.count === 0) {
            console.log('No leave types data found, inserting sample data...');
            insertSampleLeaveTypes().then(function() {
              console.log('Sample leave types inserted');
              checkEmployees();
            }).catch(function(err) {
              console.error('Error inserting sample leave types:', err);
              checkEmployees();
            });
          } else {
            console.log('Found ' + row.count + ' existing leave type records');
            checkEmployees();
          }
        });
      }

      function checkEmployees() {
        // Check if we need to insert sample employees
        db.get('SELECT COUNT(*) as count FROM employees', [], function(err, row) {
          if (err) {
            console.error('Error checking employees data:', err);
            resolve();
            return;
          }
          
          if (!row || row.count === 0) {
            console.log('No employees data found, inserting sample data...');
            insertSampleEmployees().then(function() {
              console.log('Sample employees inserted');
              resolve();
            }).catch(function(err) {
              console.error('Error inserting sample employees:', err);
              resolve();
            });
          } else {
            console.log('Found ' + row.count + ' existing employee records');
            resolve();
          }
        });
      }
    }).catch(function(err) {
      reject(err);
    });
  });
}

// Exports
module.exports = {
  db: db,
  initializeDatabase: initializeDatabaseWithSampleData,
  // Holiday queries and functions
  holidayQueries: holidayQueries,
  insertHoliday: insertHoliday,
  getAllHolidays: getAllHolidays,
  getHolidaysByYear: getHolidaysByYear,
  getUpcomingHolidays: getUpcomingHolidays,
  getHolidayById: getHolidayById,
  updateHoliday: updateHoliday,
  deleteHoliday: deleteHoliday,
  insertSampleHolidays: insertSampleHolidays,
  // Leave types queries and functions
  leaveTypesQueries: leaveTypesQueries,
  insertLeaveType: insertLeaveType,
  getAllLeaveTypes: getAllLeaveTypes,
  getLeaveTypeById: getLeaveTypeById,
  updateLeaveType: updateLeaveType,
  deleteLeaveType: deleteLeaveType,
  insertSampleLeaveTypes: insertSampleLeaveTypes,
  // Employees queries and functions
  employeesQueries: employeesQueries,
  insertEmployee: insertEmployee,
  getAllEmployees: getAllEmployees,
  getEmployeeById: getEmployeeById,
  getEmployeeByPayroll: getEmployeeByPayroll,
  updateEmployee: updateEmployee,
  deleteEmployee: deleteEmployee,
  getEmployeeStatistics: getEmployeeStatistics,
  insertSampleEmployees: insertSampleEmployees
};

// Run seeding if executed directly
if (require.main === module) {
  (async function() {
    await initializeDatabaseWithSampleData();
    const holidays = await getAllHolidays();
    const leaveTypes = await getAllLeaveTypes();
    const employees = await getAllEmployees();
    console.log("All holidays:", holidays.length, "records");
    console.log("All leave types:", leaveTypes.length, "records");
    console.log("All employees:", employees.length, "records");
  })();
}