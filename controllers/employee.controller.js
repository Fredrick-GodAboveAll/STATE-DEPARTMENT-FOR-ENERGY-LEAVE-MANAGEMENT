// =============================================
// EMPLOYEE MANAGEMENT CONTROLLER - UPDATED FOR CSV FORMAT
// =============================================

const { db } = require('../database');

const employeeController = {
  /**
   * Display employee list page
   */
  getEmployees: async function(req, res) {
    try {
      // Get current user using repository pattern
      const user = await db.users.findById(req.session.userId);
      
      if (!user) {
        req.flash('error_msg', 'User not found');
        return res.redirect('/');
      }
      
      // Use the repository methods that actually exist
      const employees = await db.employees.findAll();
      const statistics = await db.employees.getStatistics();
      
      // Calculate additional statistics based on new CSV format
      const totalEmployees = employees ? employees.length : 0;
      
      // Count active employees (status contains "Active")
      const activeEmployees = employees ? employees.filter(function(emp) {
        return emp.status && emp.status.includes('Active');
      }).length : 0;
      
      // Count retired employees (status contains "Retired")
      const retiredEmployees = employees ? employees.filter(function(emp) {
        return emp.status && emp.status.includes('Retired');
      }).length : 0;
      
      // Count inactive employees (status contains "Inactive")
      const inactiveEmployees = employees ? employees.filter(function(emp) {
        return emp.status && emp.status.includes('Inactive');
      }).length : 0;
      
      // Group by employment status for progress bars (from employment_status column)
      const employmentStats = {};
      if (employees) {
        employees.forEach(function(emp) {
          const status = emp.employment_status || 'Unassigned';
          employmentStats[status] = (employmentStats[status] || 0) + 1;
        });
      }
      
      // Calculate percentages for progress bars
      const employmentPercentages = {};
      Object.keys(employmentStats).forEach(function(status) {
        employmentPercentages[status] = Math.round((employmentStats[status] / totalEmployees) * 100);
      });
      
      // Calculate gender distribution
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
        totalEmployees: totalEmployees,
        activeEmployees: activeEmployees,
        retiredEmployees: retiredEmployees,
        inactiveEmployees: inactiveEmployees,
        employmentStats: employmentStats,
        employmentPercentages: employmentPercentages,
        genderStats: genderStats,
        statistics: statistics || {}
      });
    } catch (error) {
      console.error('Error fetching employees:', error);
      req.flash('error_msg', 'Error loading employee data');
      res.redirect('/dashboard');
    }
  },

  /**
   * Display add employee form page
   */
  getAddEmployee: async function(req, res) {
    try {
      // Get current user using repository pattern
      const user = await db.users.findById(req.session.userId);
      
      if (!user) {
        req.flash('error_msg', 'User not found');
        return res.redirect('/');
      }
      
      res.render('employees/add-employee', {
        activeShow: 'employees',
        activePage: 'add-employee',
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
   * Display bulk upload page
   */
  getBulkUpload: async function(req, res) {
    try {
      const user = await db.users.findById(req.session.userId);
      
      if (!user) {
        req.flash('error_msg', 'User not found');
        return res.redirect('/');
      }
      
      res.render('employees/bulk-upload', {
        activeShow: 'employees',
        activePage: 'bulk-upload',
        userFirstName: user.first_name,
        userLastName: user.last_name,
        userEmail: user.email
      });
    } catch (error) {
      console.error('Error loading bulk upload page:', error);
      req.flash('error_msg', 'Error loading page');
      res.redirect('/employees/register');
    }
  },

  /**
   * Handle bulk upload CSV
   */
  postBulkUpload: async function(req, res) {
    try {
      if (!req.files || !req.files.csvFile) {
        req.flash('error_msg', 'No CSV file uploaded');
        return res.redirect('/employees/bulk-upload');
      }
      
      const csvFile = req.files.csvFile;
      
      // Validate file type
      if (!csvFile.name.endsWith('.csv')) {
        req.flash('error_msg', 'Please upload a CSV file');
        return res.redirect('/employees/bulk-upload');
      }
      
      // Parse CSV file
      const employeesData = await parseCSV(csvFile.data.toString());
      
      // Validate CSV structure
      if (!validateCSVStructure(employeesData)) {
        req.flash('error_msg', 'Invalid CSV format. Please check the column headers.');
        return res.redirect('/employees/bulk-upload');
      }
      
      // Process and insert employees
      const result = await db.employees.bulkInsert(employeesData);
      
      if (result.errorCount > 0) {
        req.flash('warning_msg', `Successfully uploaded ${result.successCount} employees, but ${result.errorCount} had errors.`);
      } else {
        req.flash('success_msg', `Successfully uploaded ${result.successCount} employees.`);
      }
      
      res.redirect('/employees/register');
    } catch (error) {
      console.error('Error processing bulk upload:', error);
      req.flash('error_msg', 'Error processing CSV file');
      res.redirect('/employees/bulk-upload');
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
        // Map CSV headers to database column names
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
    
    // Only add if we have required fields
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