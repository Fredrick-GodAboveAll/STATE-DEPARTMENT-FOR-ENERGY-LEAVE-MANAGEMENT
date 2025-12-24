// routes/api.routes.js
const express = require('express');
const router = express.Router();
const apiController = require('../controllers/api.controller');
const departmentController = require('../controllers/department.controller'); // ADD THIS
const { requireLogin } = require('../middleware/auth.middleware');

router.use(requireLogin);

// Holidays API
router.post('/holidays', apiController.addHoliday);
router.delete('/holidays/:id', apiController.deleteHoliday);
router.put('/holidays/:id', apiController.updateHoliday);
router.get('/holidays/:id', apiController.getHoliday);
router.get('/holidays/search', apiController.searchHolidays);

// Leave Types API
router.post('/leave_types', apiController.addLeaveType);
router.delete('/leave_types/:id', apiController.deleteLeaveType);
router.put('/leave_types/:id', apiController.updateLeaveType);
router.get('/leave_types/:id', apiController.getLeaveType);

// Employees API
router.post('/employees', apiController.addEmployee);
router.delete('/employees/:id', apiController.deleteEmployee);
router.put('/employees/:id', apiController.updateEmployee);
router.get('/employees/:id', apiController.getEmployee);
router.get('/employees/payroll/:payroll', apiController.getEmployeeByPayroll);
router.get('/employees/statistics', apiController.getEmployeeStatistics);

// Departments API - ADD ALL THESE LINES
router.get('/departments', departmentController.getDepartmentsAPI);
router.get('/departments/:id', departmentController.getDepartmentByIdAPI);
router.post('/departments', departmentController.createDepartmentAPI);
router.put('/departments/:id', departmentController.updateDepartmentAPI);
router.delete('/departments/:id', departmentController.deleteDepartmentAPI);
router.get('/departments/search', departmentController.searchDepartmentsAPI);
router.get('/departments/stats', departmentController.getDepartmentStatsAPI);

module.exports = router;