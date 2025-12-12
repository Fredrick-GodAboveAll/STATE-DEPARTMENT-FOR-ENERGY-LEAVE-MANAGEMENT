// =============================================
// EMPLOYEE MANAGEMENT CONTROLLER - COMPLETE FIXED
// =============================================

const { 
  getAllEmployees,
  getEmployeeStatistics,
  db  // KEEP THIS IMPORT
} = require('../database');

const employeeController = {
  /**
   * Display employee list page
   */
  getEmployees: async function(req, res) {
    try {
      db.get('SELECT email, first_name, last_name FROM users WHERE id = ?', [req.session.userId], async function(err, user) {
        if (err || !user) {
          req.flash('error_msg', 'User not found');
          return res.redirect('/');
        }
        
        // Fetch all employees and statistics
        const employees = await getAllEmployees();
        const statistics = await getEmployeeStatistics();
        
        // Calculate additional statistics
        const totalEmployees = employees.length;
        const activeEmployees = employees.filter(function(emp) {
          return emp.status === 'Active';
        }).length;
        const retiredEmployees = employees.filter(function(emp) {
          return emp.status === 'Retired';
        }).length;
        
        // Group by employment status for progress bars
        const employmentStats = {};
        employees.forEach(function(emp) {
          const status = emp.employment_status || 'Unassigned';
          employmentStats[status] = (employmentStats[status] || 0) + 1;
        });
        
        // Calculate percentages for progress bars
        const employmentPercentages = {};
        Object.keys(employmentStats).forEach(function(status) {
          employmentPercentages[status] = Math.round((employmentStats[status] / totalEmployees) * 100);
        });
        
        res.render('employees/register', {
          activeShow: 'employees',
          activePage: 'register',
          userFirstName: user.first_name,
          userLastName: user.last_name,
          userEmail: user.email,
          employees: employees,
          totalEmployees: totalEmployees,
          activeEmployees: activeEmployees,
          retiredEmployees: retiredEmployees,
          employmentStats: employmentStats,
          employmentPercentages: employmentPercentages,
          statistics: statistics
        });
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
  getAddEmployee: function(req, res) {
    db.get('SELECT email, first_name, last_name FROM users WHERE id = ?', [req.session.userId], function(err, user) {
      if (err || !user) {
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
    });
  }
};

module.exports = employeeController;