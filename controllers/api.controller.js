// =============================================
// API CONTROLLER - UPDATED to use new repositories
// =============================================

const { db } = require('../database');

const apiController = {
  // ============== HOLIDAYS API ==============
  
  /**
   * Add a new holiday
   */
  addHoliday: async function(req, res) {
    try {
      const { holiday_name, holiday_date, holiday_type, year, recurring, description } = req.body;
      
      // Validation
      if (!holiday_name || !holiday_date || !holiday_type || !year) {
        return res.json({ success: false, message: 'Please fill in all required fields' });
      }
      
      const holidayData = {
        holiday_name,
        holiday_date,
        holiday_type,
        year: parseInt(year),
        recurring: recurring === 'true' || recurring === 1 ? 1 : 0,
        description,
        created_by: req.session.userId
      };
      
      const newHoliday = await db.holidays.create(holidayData);
      
      res.json({ 
        success: true, 
        message: 'Holiday added successfully',
        holidayId: newHoliday.id,
        holiday: newHoliday
      });
      
    } catch (error) {
      console.error('Error adding holiday:', error);
      res.status(500).json({ success: false, message: error.message || 'Error adding holiday' });
    }
  },

  /**
   * Update an existing holiday
   */
  updateHoliday: async function(req, res) {
    try {
      const { id } = req.params;
      const { holiday_name, holiday_date, holiday_type, year, recurring, description } = req.body;
      
      // Validation
      if (!holiday_name || !holiday_date || !holiday_type || !year) {
        return res.json({ success: false, message: 'Please fill in all required fields' });
      }
      
      const holidayData = {
        holiday_name,
        holiday_date,
        holiday_type,
        year: parseInt(year),
        recurring: recurring === 'true' || recurring === 1 ? 1 : 0,
        description
      };
      
      const updatedHoliday = await db.holidays.update(id, holidayData);
      
      if (updatedHoliday) {
        res.json({ success: true, message: 'Holiday updated successfully', holiday: updatedHoliday });
      } else {
        res.json({ success: false, message: 'Holiday not found or could not be updated' });
      }
      
    } catch (error) {
      console.error('Error updating holiday:', error);
      res.status(500).json({ success: false, message: error.message || 'Error updating holiday' });
    }
  },

  /**
   * Delete a holiday
   */
  deleteHoliday: async function(req, res) {
    try {
      const { id } = req.params;
      const deleted = await db.holidays.delete(id);
      
      if (deleted) {
        res.json({ success: true, message: 'Holiday deleted successfully' });
      } else {
        res.json({ success: false, message: 'Holiday not found' });
      }
    } catch (error) {
      console.error('Error deleting holiday:', error);
      res.status(500).json({ success: false, message: error.message || 'Error deleting holiday' });
    }
  },

  /**
   * Get single holiday by ID
   */
  getHoliday: async function(req, res) {
    try {
      const { id } = req.params;
      const holiday = await db.holidays.findById(id);
      
      if (holiday) {
        // Format date for frontend (YYYY-MM-DD)
        if (holiday.holiday_date) {
          const date = new Date(holiday.holiday_date);
          holiday.formatted_date = date.toISOString().split('T')[0];
        }
        
        res.json({ success: true, holiday });
      } else {
        res.json({ success: false, message: 'Holiday not found' });
      }
    } catch (error) {
      console.error('Error fetching holiday:', error);
      res.status(500).json({ success: false, message: error.message || 'Error fetching holiday' });
    }
  },

  /**
   * Search holidays
   */
  searchHolidays: async function(req, res) {
    try {
      const { query } = req.query;
      
      if (!query || query.trim().length < 2) {
        return res.json({
          success: true,
          holidays: []
        });
      }

      const results = await db.holidays.search(query);
      
      res.json({
        success: true,
        holidays: results
      });
    } catch (error) {
      console.error('Error searching holidays:', error);
      res.status(500).json({
        success: false,
        message: 'Error searching holidays'
      });
    }
  },

  // ============== LEAVE TYPES API ==============
  
  /**
   * Add a new leave type
   */
  addLeaveType: async function(req, res) {
    try {
      const { leave_name, color, entitled_days, gender_restriction, description, status, carry_forward_days } = req.body;
      
      // Validation
      if (!leave_name || !entitled_days) {
        return res.json({ success: false, message: 'Please fill in all required fields' });
      }
      
      const leaveData = {
        leave_name,
        color: color || 'primary',
        entitled_days: parseInt(entitled_days),
        gender_restriction: gender_restriction || 'All',
        description,
        carry_forward_days: (carry_forward_days === '' || typeof carry_forward_days === 'undefined') ? null : parseInt(carry_forward_days),
        status: status || 'Active'
      };
      
      const newLeaveType = await db.leaveTypes.create(leaveData);
      
      res.json({ 
        success: true, 
        message: 'Leave type added successfully',
        leaveId: newLeaveType.id,
        leaveType: newLeaveType
      });
      
    } catch (error) {
      console.error('Error adding leave type:', error);
      res.status(500).json({ success: false, message: error.message || 'Error adding leave type' });
    }
  },

  /**
   * Update an existing leave type
   */
  updateLeaveType: async function(req, res) {
    try {
      const { id } = req.params;
      const { leave_name, color, entitled_days, gender_restriction, description, status, carry_forward_days } = req.body;
      
      // Validation
      if (!leave_name || !entitled_days) {
        return res.json({ success: false, message: 'Please fill in all required fields' });
      }
      
      const leaveData = {
        leave_name,
        color: color || 'primary',
        entitled_days: parseInt(entitled_days),
        gender_restriction: gender_restriction || 'All',
        description,
        carry_forward_days: (carry_forward_days === '' || typeof carry_forward_days === 'undefined') ? null : parseInt(carry_forward_days),
        status: status || 'Active'
      };
      
      const updatedLeaveType = await db.leaveTypes.update(id, leaveData);
      
      if (updatedLeaveType) {
        res.json({ success: true, message: 'Leave type updated successfully', leaveType: updatedLeaveType });
      } else {
        res.json({ success: false, message: 'Leave type not found or could not be updated' });
      }
      
    } catch (error) {
      console.error('Error updating leave type:', error);
      res.status(500).json({ success: false, message: error.message || 'Error updating leave type' });
    }
  },

  /**
   * Delete a leave type
   */
  deleteLeaveType: async function(req, res) {
    try {
      const { id } = req.params;
      const deleted = await db.leaveTypes.delete(id);
      
      if (deleted) {
        res.json({ success: true, message: 'Leave type deleted successfully' });
      } else {
        res.json({ success: false, message: 'Leave type not found' });
      }
    } catch (error) {
      console.error('Error deleting leave type:', error);
      res.status(500).json({ success: false, message: error.message || 'Error deleting leave type' });
    }
  },

  /**
   * Get all leave types
   */
  getAllLeaveTypes: async function(req, res) {
    try {
      res.set('Content-Type', 'application/json');
      const leaveTypes = await db.leaveTypes.findAll();
      res.json({ success: true, leaveTypes: leaveTypes || [] });
    } catch (error) {
      console.error('Error fetching leave types:', error);
      res.status(500).json({ success: false, message: error.message || 'Error fetching leave types' });
    }
  },

  /**
   * Get single leave type by ID
   */
  getLeaveType: async function(req, res) {
    try {
      const { id } = req.params;
      const leaveType = await db.leaveTypes.findById(id);
      
      if (leaveType) {
        res.json({ success: true, leaveType });
      } else {
        res.json({ success: false, message: 'Leave type not found' });
      }
    } catch (error) {
      console.error('Error fetching leave type:', error);
      res.status(500).json({ success: false, message: error.message || 'Error fetching leave type' });
    }
  },

  // ============== EMPLOYEES API ==============
  
  /**
   * Add a new employee
   */
  addEmployee: async function(req, res) {
    try {
      const {
        payroll_number, full_name, id_number, gender, age, designation, job_group,
        employment_status, retirement_date, status
      } = req.body;
      
      // Validation
      if (!payroll_number || !full_name || !id_number || !designation) {
        return res.json({ success: false, message: 'Please fill in all required fields' });
      }
      
      const employeeData = {
        payroll_number,
        full_name,
        id_number,
        gender: gender || null,
        age: age ? parseInt(age) : null,
        designation,
        job_group: job_group || null,
        employment_status: employment_status || 'Permanent',
        retirement_date: retirement_date || null,
        status: status || 'Active'
      };
      
      const employeeId = await db.employees.create(employeeData);
      
      res.json({ 
        success: true, 
        message: 'Employee added successfully',
        employeeId 
      });
      
    } catch (error) {
      console.error('Error adding employee:', error);
      res.status(500).json({ success: false, message: error.message || 'Error adding employee' });
    }
  },

  /**
   * Update an existing employee
   */
  updateEmployee: async function(req, res) {
    try {
      const { id } = req.params;
      const {
        payroll_number, full_name, id_number, gender, age, designation, job_group,
        employment_status, retirement_date, status
      } = req.body;
      
      // Validation
      if (!payroll_number || !full_name || !id_number || !designation) {
        return res.json({ success: false, message: 'Please fill in all required fields' });
      }
      
      const employeeData = {
        payroll_number,
        full_name,
        id_number,
        gender: gender || null,
        age: age ? parseInt(age) : null,
        designation,
        job_group: job_group || null,
        employment_status: employment_status || 'Permanent',
        retirement_date: retirement_date || null,
        status: status || 'Active'
      };
      
      const result = await db.employees.update(id, employeeData);
      
      if (result) {
        res.json({ success: true, message: 'Employee updated successfully' });
      } else {
        res.json({ success: false, message: 'Employee not found' });
      }
      
    } catch (error) {
      console.error('Error updating employee:', error);
      res.status(500).json({ success: false, message: error.message || 'Error updating employee' });
    }
  },

  /**
   * Delete an employee
   */
  deleteEmployee: async function(req, res) {
    try {
      const { id } = req.params;
      const deleted = await db.employees.delete(id);
      
      if (deleted) {
        res.json({ success: true, message: 'Employee deleted successfully' });
      } else {
        res.json({ success: false, message: 'Employee not found' });
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
      res.status(500).json({ success: false, message: error.message || 'Error deleting employee' });
    }
  },

  /**
   * Get all employees with their departments
   */
  getAllEmployees: async function(req, res) {
    try {
      res.set('Content-Type', 'application/json');
      const employees = await db.employees.findAll();
      res.json({ success: true, employees: employees || [] });
    } catch (error) {
      console.error('Error fetching employees:', error);
      res.status(500).json({ success: false, message: error.message || 'Error fetching employees' });
    }
  },

  /**
   * Get single employee by ID
   */
  getEmployee: async function(req, res) {
    try {
      const { id } = req.params;
      const employee = await db.employees.findById(id);
      
      if (employee) {
        res.json({ success: true, employee });
      } else {
        res.json({ success: false, message: 'Employee not found' });
      }
    } catch (error) {
      console.error('Error fetching employee:', error);
      res.status(500).json({ success: false, message: error.message || 'Error fetching employee' });
    }
  },

  /**
   * Get employee by payroll number
   */
  getEmployeeByPayroll: async function(req, res) {
    try {
      const { payroll } = req.params;
      const employee = await db.employees.findByPayroll(payroll);
      
      if (employee) {
        res.json({ success: true, employee });
      } else {
        res.json({ success: false, message: 'Employee not found' });
      }
    } catch (error) {
      console.error('Error fetching employee:', error);
      res.status(500).json({ success: false, message: error.message || 'Error fetching employee' });
    }
  },

  /**
   * Get employee statistics
   */
  getEmployeeStatistics: async function(req, res) {
    try {
      const statistics = await db.employees.getStatistics();
      
      res.json({ success: true, statistics });
    } catch (error) {
      console.error('Error fetching employee statistics:', error);
      res.status(500).json({ success: false, message: error.message || 'Error fetching employee statistics' });
    }
  }
};

module.exports = apiController;