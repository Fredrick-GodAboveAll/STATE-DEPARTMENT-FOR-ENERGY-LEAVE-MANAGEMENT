// =============================================
// API CONTROLLER
// Handles: All AJAX API endpoints
// =============================================

const { 
  // Holiday functions
  deleteHoliday,
  insertHoliday,
  updateHoliday,
  getHolidayById,
  // Leave Types functions
  insertLeaveType,
  updateLeaveType,
  deleteLeaveType,
  getLeaveTypeById,
  // Employee functions
  insertEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeById,
  getEmployeeByPayroll,
  getEmployeeStatistics
} = require('../database');

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
        year,
        recurring: recurring === 'true' ? 1 : 0,
        description,
        created_by: req.session.userId
      };
      
      const holidayId = await insertHoliday(holidayData);
      
      res.json({ 
        success: true, 
        message: 'Holiday added successfully',
        holidayId 
      });
      
    } catch (error) {
      console.error('Error adding holiday:', error);
      res.status(500).json({ success: false, message: 'Error adding holiday' });
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
        year,
        recurring: recurring === 'true' ? 1 : 0,
        description
      };
      
      const result = await updateHoliday(id, holidayData);
      
      if (result > 0) {
        res.json({ success: true, message: 'Holiday updated successfully' });
      } else {
        res.json({ success: false, message: 'Holiday not found' });
      }
      
    } catch (error) {
      console.error('Error updating holiday:', error);
      res.status(500).json({ success: false, message: 'Error updating holiday' });
    }
  },

  /**
   * Delete a holiday
   */
  deleteHoliday: async function(req, res) {
    try {
      const result = await deleteHoliday(req.params.id);
      
      if (result > 0) {
        res.json({ success: true, message: 'Holiday deleted successfully' });
      } else {
        res.json({ success: false, message: 'Holiday not found' });
      }
    } catch (error) {
      console.error('Error deleting holiday:', error);
      res.status(500).json({ success: false, message: 'Error deleting holiday' });
    }
  },

  /**
   * Get single holiday by ID
   */
  getHoliday: async function(req, res) {
    try {
      const holiday = await getHolidayById(req.params.id);
      
      if (holiday) {
        res.json({ success: true, holiday });
      } else {
        res.json({ success: false, message: 'Holiday not found' });
      }
    } catch (error) {
      console.error('Error fetching holiday:', error);
      res.status(500).json({ success: false, message: 'Error fetching holiday' });
    }
  },

  // ============== LEAVE TYPES API ==============
  
  /**
   * Add a new leave type
   */
  addLeaveType: async function(req, res) {
    try {
      const { leave_name, color, entitled_days, gender_restriction, description, status } = req.body;
      
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
        status: status || 'Active'
      };
      
      const leaveId = await insertLeaveType(leaveData);
      
      res.json({ 
        success: true, 
        message: 'Leave type added successfully',
        leaveId 
      });
      
    } catch (error) {
      console.error('Error adding leave type:', error);
      res.status(500).json({ success: false, message: 'Error adding leave type' });
    }
  },

  /**
   * Update an existing leave type
   */
  updateLeaveType: async function(req, res) {
    try {
      const { id } = req.params;
      const { leave_name, color, entitled_days, gender_restriction, description, status } = req.body;
      
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
        status: status || 'Active'
      };
      
      const result = await updateLeaveType(id, leaveData);
      
      if (result > 0) {
        res.json({ success: true, message: 'Leave type updated successfully' });
      } else {
        res.json({ success: false, message: 'Leave type not found' });
      }
      
    } catch (error) {
      console.error('Error updating leave type:', error);
      res.status(500).json({ success: false, message: 'Error updating leave type' });
    }
  },

  /**
   * Delete a leave type
   */
  deleteLeaveType: async function(req, res) {
    try {
      const result = await deleteLeaveType(req.params.id);
      
      if (result > 0) {
        res.json({ success: true, message: 'Leave type deleted successfully' });
      } else {
        res.json({ success: false, message: 'Leave type not found' });
      }
    } catch (error) {
      console.error('Error deleting leave type:', error);
      res.status(500).json({ success: false, message: 'Error deleting leave type' });
    }
  },

  /**
   * Get single leave type by ID
   */
  getLeaveType: async function(req, res) {
    try {
      const leaveType = await getLeaveTypeById(req.params.id);
      
      if (leaveType) {
        res.json({ success: true, leaveType });
      } else {
        res.json({ success: false, message: 'Leave type not found' });
      }
    } catch (error) {
      console.error('Error fetching leave type:', error);
      res.status(500).json({ success: false, message: 'Error fetching leave type' });
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
      
      const employeeId = await insertEmployee(employeeData);
      
      res.json({ 
        success: true, 
        message: 'Employee added successfully',
        employeeId 
      });
      
    } catch (error) {
      console.error('Error adding employee:', error);
      res.status(500).json({ success: false, message: 'Error adding employee' });
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
      
      const result = await updateEmployee(id, employeeData);
      
      if (result > 0) {
        res.json({ success: true, message: 'Employee updated successfully' });
      } else {
        res.json({ success: false, message: 'Employee not found' });
      }
      
    } catch (error) {
      console.error('Error updating employee:', error);
      res.status(500).json({ success: false, message: 'Error updating employee' });
    }
  },

  /**
   * Delete an employee
   */
  deleteEmployee: async function(req, res) {
    try {
      const result = await deleteEmployee(req.params.id);
      
      if (result > 0) {
        res.json({ success: true, message: 'Employee deleted successfully' });
      } else {
        res.json({ success: false, message: 'Employee not found' });
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
      res.status(500).json({ success: false, message: 'Error deleting employee' });
    }
  },

  /**
   * Get single employee by ID
   */
  getEmployee: async function(req, res) {
    try {
      const employee = await getEmployeeById(req.params.id);
      
      if (employee) {
        res.json({ success: true, employee });
      } else {
        res.json({ success: false, message: 'Employee not found' });
      }
    } catch (error) {
      console.error('Error fetching employee:', error);
      res.status(500).json({ success: false, message: 'Error fetching employee' });
    }
  },

  /**
   * Get employee by payroll number
   */
  getEmployeeByPayroll: async function(req, res) {
    try {
      const employee = await getEmployeeByPayroll(req.params.payroll);
      
      if (employee) {
        res.json({ success: true, employee });
      } else {
        res.json({ success: false, message: 'Employee not found' });
      }
    } catch (error) {
      console.error('Error fetching employee:', error);
      res.status(500).json({ success: false, message: 'Error fetching employee' });
    }
  },

  /**
   * Get employee statistics
   */
  getEmployeeStatistics: async function(req, res) {
    try {
      const statistics = await getEmployeeStatistics();
      
      res.json({ success: true, statistics });
    } catch (error) {
      console.error('Error fetching employee statistics:', error);
      res.status(500).json({ success: false, message: 'Error fetching employee statistics' });
    }
  }
};

module.exports = apiController;