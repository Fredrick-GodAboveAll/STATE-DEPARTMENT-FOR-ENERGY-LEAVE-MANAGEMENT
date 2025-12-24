// employee.routes.js - COMPLETE FIXED VERSION
const express = require('express');
const multer = require('multer');
const router = express.Router();
const employeeController = require('../controllers/employee.controller');
const { requireLogin } = require('../middleware/auth.middleware');

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Protect all employee routes
router.use(requireLogin);

// Employee list page
router.get('/register', employeeController.getEmployees);

// Add employee form - THIS IS YOUR UPLOAD PAGE!
router.get('/add-employee', employeeController.getAddEmployee);
router.get('/add-staff', employeeController.getAddEmployee); // For compatibility

// Bulk upload POST route - FIXED: Make sure it's ONLY POST
router.post('/bulk-upload', upload.single('csvFile'), employeeController.postBulkUpload);

// NO GET ROUTE FOR /bulk-upload - This is important!
// ❌ DON'T ADD THIS: router.get('/bulk-upload', ...)

module.exports = router;