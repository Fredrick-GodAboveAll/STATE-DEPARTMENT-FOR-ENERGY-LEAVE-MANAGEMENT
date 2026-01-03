// routes/employee.routes.js - UPDATED VERSION
const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee.controller');
const { requireLogin } = require('../middleware/auth.middleware');
const upload = require('../middleware/multer');

// Protect all employee routes
router.use(requireLogin);

// Employee list page
router.get('/register', employeeController.getEmployees);

// Add employee form (single)
router.get('/add-employee', employeeController.getAddEmployee);
router.get('/add-staff', employeeController.getAddEmployee); // For compatibility

// Bulk employee upload page and functionality
router.get('/employee-bulk', employeeController.getEmployeeBulk);
router.get('/bulk-template', employeeController.downloadEmployeeTemplate); // Add template download
router.post('/bulk-upload', upload.single('csvFile'), employeeController.bulkUploadEmployees); // Add bulk upload

// NEW: Department assignment routes
router.get('/employee-departments', employeeController.getDepartmentAssignments);
router.put('/api/employees/:id/department', employeeController.updateEmployeeDepartment);
router.post('/api/employees/bulk-departments', employeeController.bulkUpdateDepartments);

module.exports = router;