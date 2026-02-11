// controllers/department.controller.js - UPDATED
const { db } = require('../database');

const departmentController = {
  /**
   * Display department overview page
   */
  getDepartments: async function(req, res) {
    try {
      // Get current user using repository pattern
      const user = await db.users.findById(req.session.userId);
      
      if (!user) {
        req.flash('error_msg', 'User not found');
        return res.redirect('/');
      }
      
      // Get departments with employee count
      const departments = await db.departments.getDepartmentsWithEmployeeCount();
      
      // Get department statistics
      const stats = await db.departments.getStatistics();
      
      res.render('departments/d-overview', {
        activeShow: 'departments', // This should match your sidebar menu
        activePage: 'd-overview',  // This is the specific page
        userFirstName: user.first_name,
        userLastName: user.last_name,
        userEmail: user.email,
        departments: departments || [],
        totalDepartments: stats.total,
        departmentsWithCodes: stats.withCodes,
        latestDepartments: stats.latest || []
      });
    } catch (error) {
      console.error('Error fetching departments:', error);
      req.flash('error_msg', 'Error loading department data');
      res.redirect('/dashboard');
    }
  },

  /**
   * Display department structure/organization chart page
   */
  getDepartmentStructure: async function(req, res) {
    try {
      const user = await db.users.findById(req.session.userId);
      
      if (!user) {
        req.flash('error_msg', 'User not found');
        return res.redirect('/');
      }
      
      // Get all departments for the structure/organization chart
      const departments = await db.departments.getDepartmentsWithEmployeeCount();
      
      res.render('departments/d-structure', {
        activeShow: 'departments',
        activePage: 'd-structure',
        userFirstName: user.first_name,
        userLastName: user.last_name,
        userEmail: user.email,
        departments: departments || []
      });
    } catch (error) {
      console.error('Error loading department structure:', error);
      req.flash('error_msg', 'Error loading department structure');
      res.redirect('/departments');
    }
  },

  /**
   * API endpoint to get all departments (for AJAX calls, dropdowns)
   */
  getDepartmentsAPI: async function(req, res) {
    try {
      const departments = await db.departments.getDepartmentOptions();
      res.json({ success: true, data: departments });
    } catch (error) {
      console.error('Error in getDepartmentsAPI:', error);
      res.status(500).json({ success: false, message: 'Error fetching departments' });
    }
  },

  /**
   * API endpoint to get department by ID
   */
  getDepartmentByIdAPI: async function(req, res) {
    try {
      const { id } = req.params;
      const department = await db.departments.findById(id);
      
      if (!department) {
        return res.status(404).json({ success: false, message: 'Department not found' });
      }
      
      res.json({ success: true, data: department });
    } catch (error) {
      console.error('Error in getDepartmentByIdAPI:', error);
      res.status(500).json({ success: false, message: 'Error fetching department' });
    }
  },

  /**
   * API endpoint to create new department
   */
  createDepartmentAPI: async function(req, res) {
    try {
      const { name, code, description } = req.body;
      
      // Validation
      if (!name) {
        return res.status(400).json({ success: false, message: 'Department name is required' });
      }
      
      const departmentData = { name, code, description };
      const newDepartment = await db.departments.create(departmentData);
      
      res.json({ 
        success: true, 
        message: 'Department created successfully',
        data: newDepartment
      });
    } catch (error) {
      console.error('Error in createDepartmentAPI:', error);
      
      if (error.message.includes('already exists')) {
        return res.status(400).json({ success: false, message: error.message });
      }
      
      res.status(500).json({ success: false, message: 'Error creating department' });
    }
  },

  /**
   * API endpoint to update department
   */
  updateDepartmentAPI: async function(req, res) {
    try {
      const { id } = req.params;
      const { name, code, description } = req.body;
      
      // Validation
      if (!name) {
        return res.status(400).json({ success: false, message: 'Department name is required' });
      }
      
      const departmentData = { name, code, description };
      const updatedDepartment = await db.departments.update(id, departmentData);
      
      if (!updatedDepartment) {
        return res.status(404).json({ success: false, message: 'Department not found' });
      }
      
      res.json({ 
        success: true, 
        message: 'Department updated successfully',
        data: updatedDepartment
      });
    } catch (error) {
      console.error('Error in updateDepartmentAPI:', error);
      
      if (error.message.includes('already exists')) {
        return res.status(400).json({ success: false, message: error.message });
      }
      
      res.status(500).json({ success: false, message: 'Error updating department' });
    }
  },

  /**
   * API endpoint to delete department
   */
  deleteDepartmentAPI: async function(req, res) {
    try {
      const { id } = req.params;
      
      const deleted = await db.departments.delete(id);
      
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Department not found' });
      }
      
      res.json({ 
        success: true, 
        message: 'Department deleted successfully'
      });
    } catch (error) {
      console.error('Error in deleteDepartmentAPI:', error);
      
      if (error.message.includes('Cannot delete')) {
        return res.status(400).json({ success: false, message: error.message });
      }
      
      res.status(500).json({ success: false, message: 'Error deleting department' });
    }
  },

  /**
   * API endpoint to search departments
   */
  searchDepartmentsAPI: async function(req, res) {
    try {
      const { query } = req.query;
      
      if (!query || query.trim().length < 2) {
        return res.json({ success: true, data: [] });
      }
      
      const departments = await db.departments.search(query);
      res.json({ success: true, data: departments });
    } catch (error) {
      console.error('Error in searchDepartmentsAPI:', error);
      res.status(500).json({ success: false, message: 'Error searching departments' });
    }
  }
};

module.exports = departmentController;