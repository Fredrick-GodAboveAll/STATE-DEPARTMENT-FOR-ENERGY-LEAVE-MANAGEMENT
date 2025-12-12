// =============================================
// EMPLOYEE MANAGEMENT ROUTES - COMPLETE FIXED
// =============================================

const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee.controller');
const { requireLogin } = require('../middleware/auth.middleware');

// Protect all employee routes
router.use(requireLogin);

// Employee list page
router.get('/register', employeeController.getEmployees);

// Add employee form - BOTH routes for compatibility
router.get('/add-employee', employeeController.getAddEmployee);
router.get('/add-staff', employeeController.getAddEmployee); // For compatibility

module.exports = router;