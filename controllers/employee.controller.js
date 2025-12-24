// employee.controller.js - COMPLETE FIXED VERSION
const { db } = require('../database');

const employeeController = {
  /**
   * Display employee list page
   */
  getEmployees: async function(req, res) {
    try {
      const user = await db.users.findById(req.session.userId);
      
      if (!user) {
        req.flash('error_msg', 'User not found');
        return res.redirect('/');
      }
      
      const employees = await db.employees.findAll();
      const statistics = await db.employees.getStatistics();
      
      const totalEmployees = employees ? employees.length : 0;
      const activeEmployees = employees ? employees.filter(emp => emp.status && emp.status.includes('Active')).length : 0;
      const retiredEmployees = employees ? employees.filter(emp => emp.status && emp.status.includes('Retired')).length : 0;
      const inactiveEmployees = employees ? employees.filter(emp => emp.status && emp.status.includes('Inactive')).length : 0;
      
      const employmentStats = {};
      if (employees) {
        employees.forEach(emp => {
          const status = emp.employment_status || 'Unassigned';
          employmentStats[status] = (employmentStats[status] || 0) + 1;
        });
      }
      
      const employmentPercentages = {};
      Object.keys(employmentStats).forEach(status => {
        employmentPercentages[status] = Math.round((employmentStats[status] / totalEmployees) * 100);
      });
      
      const genderStats = {
        male: employees ? employees.filter(emp => emp.gender === 'M').length : 0,
        female: employees ? employees.filter(emp => emp.gender === 'F').length : 0
      };
      
      res.render('employees/register', {
        activeShow: 'employees',
        activePage: 'register',
        userFirstName: user.first_name,
        userLastName: user.last_name,
        userEmail: user.email,
        employees: employees || [],
        totalEmployees,
        activeEmployees,
        retiredEmployees,
        inactiveEmployees,
        employmentStats,
        employmentPercentages,
        genderStats,
        statistics: statistics || {}
      });
    } catch (error) {
      console.error('Error fetching employees:', error);
      req.flash('error_msg', 'Error loading employee data');
      res.redirect('/dashboard');
    }
  },

  /**
   * Display add employee form page - THIS IS YOUR UPLOAD PAGE!
   */
  getAddEmployee: async function(req, res) {
    try {
      const user = await db.users.findById(req.session.userId);
      
      if (!user) {
        req.flash('error_msg', 'User not found');
        return res.redirect('/');
      }
      
      res.render('employees/add-employee', {
        activeShow: 'employees',
        activePage: 'add-employees', // This matches your sidebar!
        userFirstName: user.first_name,
        userLastName: user.last_name,
        userEmail: user.email
      });
    } catch (error) {
      console.error('Error fetching user for add employee:', error);
      req.flash('error_msg', 'Error loading page');
      res.redirect('/dashboard');
    }
  },

  /**
   * Handle bulk upload CSV - FIXED: ONLY redirects, NEVER renders
   */
  postBulkUpload: async function(req, res) {
    try {
      // Get user for session
      const user = await db.users.findById(req.session.userId);
      
      if (!user) {
        req.flash('error_msg', 'User not found');
        return res.redirect('/');
      }
      
      if (!req.files || !req.files.csvFile) {
        req.flash('error_msg', 'No CSV file uploaded');
        return res.redirect('/employees/add-employee'); // REDIRECT, don't render!
      }
      
      const csvFile = req.files.csvFile;
      
      if (!csvFile.name.endsWith('.csv')) {
        req.flash('error_msg', 'Please upload a CSV file');
        return res.redirect('/employees/add-employee'); // REDIRECT, don't render!
      }
      
      const employeesData = await parseCSV(csvFile.data.toString());
      
      if (!validateCSVStructure(employeesData)) {
        req.flash('error_msg', 'Invalid CSV format. Please check the column headers.');
        return res.redirect('/employees/add-employee'); // REDIRECT, don't render!
      }
      
      const result = await db.employees.bulkInsert(employeesData);
      
      if (result.errorCount > 0) {
        req.flash('warning_msg', `Successfully uploaded ${result.successCount} employees, but ${result.errorCount} had errors.`);
      } else {
        req.flash('success_msg', `Successfully uploaded ${result.successCount} employees.`);
      }
      
      // SUCCESS: Redirect to employee list
      return res.redirect('/employees/register'); // REDIRECT, don't render!
      
    } catch (error) {
      console.error('Error processing bulk upload:', error);
      req.flash('error_msg', 'Error processing CSV file: ' + error.message);
      return res.redirect('/employees/add-employee'); // REDIRECT, don't render!
    }
  }
};

/**
 * Parse CSV data
 */
async function parseCSV(csvData) {
  const lines = csvData.split('\n');
  const headers = lines[0].split(',').map(header => header.trim());
  
  const employees = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    const values = line.split(',').map(value => value.trim());
    const employee = {};
    
    headers.forEach((header, index) => {
      if (values[index] !== undefined) {
        switch(header) {
          case 'Payroll Number':
            employee.payroll_number = values[index];
            break;
          case 'Full Name':
            employee.full_name = values[index];
            break;
          case 'ID Number':
            employee.id_number = values[index];
            break;
          case 'Gender':
            employee.gender = values[index];
            break;
          case 'Age':
            employee.age = parseInt(values[index]) || null;
            break;
          case 'Designation':
            employee.designation = values[index];
            break;
          case 'Job Group':
            employee.job_group = values[index];
            break;
          case 'Employment Status':
            employee.status = values[index];
            break;
          case 'ROD':
            employee.retirement_date = values[index];
            break;
          case 'Engage Name':
            employee.employment_status = values[index];
            break;
        }
      }
    });
    
    if (employee.payroll_number && employee.full_name && employee.id_number) {
      employees.push(employee);
    }
  }
  
  return employees;
}

/**
 * Validate CSV structure has required columns
 */
function validateCSVStructure(employeesData) {
  if (employeesData.length === 0) return false;
  
  const firstEmployee = employeesData[0];
  const requiredFields = ['payroll_number', 'full_name', 'id_number'];
  
  for (const field of requiredFields) {
    if (!firstEmployee[field]) {
      return false;
    }
  }
  
  return true;
}

module.exports = employeeController;