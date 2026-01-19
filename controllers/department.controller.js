// controllers/department.controller.js
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
      
      // Get all departments
      const departments = await db.departments.findAll();
      
      // Get department statistics from repository
      const stats = await db.departments.getStatistics();
      
      res.render('departments/d-overview', {
        activeShow: 'departments',
        activePage: 'd-overview',
        userFirstName: user.first_name,
        userLastName: user.last_name,
        userEmail: user.email,
        departments: departments || [],
        stats: stats,
        totalDepartments: stats.total,
        activeCount: stats.activeCount,
        inactiveCount: stats.inactiveCount,
        archivedCount: stats.archivedCount
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
      
      // Get all active departments
      const departments = await db.departments.findActive();
      
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
   * Display form to add new department
   */
  getAddDepartment: async function(req, res) {
    try {
      const user = await db.users.findById(req.session.userId);
      
      if (!user) {
        req.flash('error_msg', 'User not found');
        return res.redirect('/');
      }
      
      res.render('departments/d-add', {
        activeShow: 'departments',
        activePage: 'd-overview',
        userFirstName: user.first_name,
        userLastName: user.last_name,
        userEmail: user.email,
        department: {} // empty object for form
      });
    } catch (error) {
      console.error('Error loading add department form:', error);
      req.flash('error_msg', 'Error loading form');
      res.redirect('/departments');
    }
  },

  /**
   * Handle adding new department (form submission)
   */
  postAddDepartment: async function(req, res) {
    try {
      const { name, code, description } = req.body;
      
      // Basic validation
      if (!name || !code) {
        req.flash('error_msg', 'Department name and code are required');
        return res.redirect('/departments/add');
      }
      
      // Check if code already exists
      const codeExists = await db.departments.checkCodeExists(code);
      if (codeExists) {
        req.flash('error_msg', `Department code "${code}" already exists`);
        return res.redirect('/departments/add');
      }
      
      // Check if name already exists
      const nameExists = await db.departments.checkNameExists(name);
      if (nameExists) {
        req.flash('error_msg', `Department "${name}" already exists`);
        return res.redirect('/departments/add');
      }
      
      // Create new department
      await db.departments.create({
        name,
        code,
        description: description || '',
        status: 'Active'
      });
      
      req.flash('success_msg', `Department "${name}" added successfully`);
      res.redirect('/departments');
      
    } catch (error) {
      console.error('Error adding department:', error);
      req.flash('error_msg', 'Error adding department');
      res.redirect('/departments/add');
    }
  },

  /**
   * Display form to edit department
   */
  getEditDepartment: async function(req, res) {
    try {
      const user = await db.users.findById(req.session.userId);
      const { id } = req.params;
      
      if (!user) {
        req.flash('error_msg', 'User not found');
        return res.redirect('/');
      }
      
      const department = await db.departments.findById(id);
      
      if (!department) {
        req.flash('error_msg', 'Department not found');
        return res.redirect('/departments');
      }
      
      res.render('departments/d-edit', {
        activeShow: 'departments',
        activePage: 'd-overview',
        userFirstName: user.first_name,
        userLastName: user.last_name,
        userEmail: user.email,
        department: department
      });
    } catch (error) {
      console.error('Error loading edit department form:', error);
      req.flash('error_msg', 'Error loading form');
      res.redirect('/departments');
    }
  },

  /**
   * Handle editing department (form submission)
   */
  postEditDepartment: async function(req, res) {
    try {
      const { id } = req.params;
      const { name, code, description, status } = req.body;
      
      // Basic validation
      if (!name || !code) {
        req.flash('error_msg', 'Department name and code are required');
        return res.redirect(`/departments/edit/${id}`);
      }
      
      // Check if code already exists (excluding current department)
      const codeExists = await db.departments.checkCodeExists(code, id);
      if (codeExists) {
        req.flash('error_msg', `Department code "${code}" already exists`);
        return res.redirect(`/departments/edit/${id}`);
      }
      
      // Check if name already exists (excluding current department)
      const nameExists = await db.departments.checkNameExists(name, id);
      if (nameExists) {
        req.flash('error_msg', `Department "${name}" already exists`);
        return res.redirect(`/departments/edit/${id}`);
      }
      
      // Update department
      await db.departments.update(id, {
        name,
        code,
        description: description || '',
        status: status || 'Active'
      });
      
      req.flash('success_msg', `Department "${name}" updated successfully`);
      res.redirect('/departments');
      
    } catch (error) {
      console.error('Error updating department:', error);
      req.flash('error_msg', 'Error updating department');
      res.redirect(`/departments/edit/${req.params.id}`);
    }
  },

  /**
   * Handle toggling department status (Active/Inactive/Archived)
   */
  toggleDepartmentStatus: async function(req, res) {
    try {
      const { id } = req.params;
      
      const updatedDepartment = await db.departments.toggleStatus(id);
      
      if (!updatedDepartment) {
        req.flash('error_msg', 'Department not found');
        return res.redirect('/departments');
      }
      
      req.flash('success_msg', `Department status updated to ${updatedDepartment.status}`);
      res.redirect('/departments');
      
    } catch (error) {
      console.error('Error toggling department status:', error);
      req.flash('error_msg', 'Error updating department status');
      res.redirect('/departments');
    }
  },

  /**
   * Handle deleting department
   */
  // In department.controller.js - Update the deleteDepartment function with logging
deleteDepartment: async function(req, res) {
    try {
        const { id } = req.params;
        console.log('Attempting to delete department ID:', id);
        
        // First get department info for flash message
        const department = await db.departments.findById(id);
        console.log('Department found:', department);
        
        if (!department) {
            req.flash('error_msg', 'Department not found');
            return res.redirect('/departments');
        }
        
        // Check if department has employees and unassign them
        console.log('Getting employees for department:', id);
        const employeesInDept = await db.employees.getEmployeesByDepartment(id);
        console.log('Employees in department:', employeesInDept);
        const employeeCount = employeesInDept ? employeesInDept.length : 0;
        console.log('Employee count:', employeeCount);
        
        if (employeeCount > 0) {
            // Unassign all employees from this department
            console.log('Unassigning employees from department:', id);
            const unassignedCount = await db.employees.unassignFromDepartment(id);
            console.log('Unassigned count:', unassignedCount);
            
            // Now delete the department
            console.log('Deleting department:', id);
            await db.departments.delete(id);
            
            req.flash('success_msg', 
                `Department "${department.name}" deleted successfully. ${unassignedCount} employees have been unassigned.`);
        } else {
            // No employees, just delete the department
            console.log('Deleting department with no employees:', id);
            await db.departments.delete(id);
            
            req.flash('success_msg', 
                `Department "${department.name}" deleted successfully.`);
        }
        
        console.log('Redirecting to departments page');
        res.redirect('/departments');
        
    } catch (error) {
        console.error('Error deleting department:', error);
        console.error('Error details:', error.message);
        console.error('Error stack:', error.stack);
        req.flash('error_msg', 'Error deleting department: ' + error.message);
        res.redirect('/departments');
    }
},

  /**
   * API endpoint to get all departments (for AJAX calls, dropdowns)
   */
  getDepartmentsAPI: async function(req, res) {
    try {
      const departments = await db.departments.findActive();
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
      const { name, code, description, status } = req.body;
      
      // Validation
      if (!name || !code) {
        return res.status(400).json({ success: false, message: 'Department name and code are required' });
      }
      
      // Check if code exists
      const codeExists = await db.departments.checkCodeExists(code);
      if (codeExists) {
        return res.status(400).json({ success: false, message: `Department code "${code}" already exists` });
      }
      
      // Check if name exists
      const nameExists = await db.departments.checkNameExists(name);
      if (nameExists) {
        return res.status(400).json({ success: false, message: `Department "${name}" already exists` });
      }
      
      const departmentData = { 
        name, 
        code, 
        description: description || '', 
        status: status || 'Active' 
      };
      
      const newDepartment = await db.departments.create(departmentData);
      
      res.json({ 
        success: true, 
        message: 'Department created successfully',
        data: newDepartment
      });
    } catch (error) {
      console.error('Error in createDepartmentAPI:', error);
      res.status(500).json({ success: false, message: 'Error creating department' });
    }
  },

  /**
   * API endpoint to update department
   */
  updateDepartmentAPI: async function(req, res) {
    try {
      const { id } = req.params;
      const { name, code, description, status } = req.body;
      
      // Validation
      if (!name || !code) {
        return res.status(400).json({ success: false, message: 'Department name and code are required' });
      }
      
      // Check if code exists (excluding current)
      const codeExists = await db.departments.checkCodeExists(code, id);
      if (codeExists) {
        return res.status(400).json({ success: false, message: `Department code "${code}" already exists` });
      }
      
      // Check if name exists (excluding current)
      const nameExists = await db.departments.checkNameExists(name, id);
      if (nameExists) {
        return res.status(400).json({ success: false, message: `Department "${name}" already exists` });
      }
      
      const departmentData = { 
        name, 
        code, 
        description: description || '', 
        status: status || 'Active' 
      };
      
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
      res.status(500).json({ success: false, message: 'Error updating department' });
    }
  },

  /**
   * API endpoint to delete department
   */
  deleteDepartmentAPI: async function(req, res) {
    try {
      const { id } = req.params;
      
      const department = await db.departments.findById(id);
      if (!department) {
        return res.status(404).json({ success: false, message: 'Department not found' });
      }
      
      // Check if department has employees and unassign them before deletion
      const employeesInDept = await db.employees.getEmployeesByDepartment(id);
      const employeeCount = employeesInDept ? employeesInDept.length : 0;
      
      if (employeeCount > 0) {
        // Unassign all employees from this department (fixes data consistency)
        await db.employees.unassignFromDepartment(id);
      }
      
      const deleted = await db.departments.delete(id);
      
      if (!deleted) {
        return res.status(500).json({ success: false, message: 'Failed to delete department' });
      }
      
      res.json({ 
        success: true, 
        message: `Department deleted successfully. ${employeeCount} employees have been unassigned.`,
        unassignedCount: employeeCount
      });
    } catch (error) {
      console.error('Error in deleteDepartmentAPI:', error);
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
  },

  /**
   * API endpoint to get department statistics
   */
  getDepartmentStatsAPI: async function(req, res) {
    try {
      const stats = await db.departments.getStatistics();
      res.json({ success: true, data: stats });
    } catch (error) {
      console.error('Error in getDepartmentStatsAPI:', error);
      res.status(500).json({ success: false, message: 'Error fetching department statistics' });
    }
  }
};

module.exports = departmentController;