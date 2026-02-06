// routes/api.routes.js
const express = require('express');
const router = express.Router();
const apiController = require('../controllers/api.controller');
const departmentController = require('../controllers/department.controller');
const holidaysController = require('../controllers/holidaysController');
const { requireLogin } = require('../middleware/auth.middleware');
const upload = require('../middleware/multer'); // ADD THIS LINE

router.use(requireLogin);

// Holidays API
router.get('/holidays', holidaysController.getAllHolidays);
router.post('/holidays', holidaysController.createHoliday);
router.get('/holidays/search', holidaysController.searchHolidays);
router.get('/holidays/statistics', holidaysController.getHolidayStatistics);
router.get('/holidays/upcoming', holidaysController.getUpcomingHolidays);
router.get('/holidays/export', holidaysController.exportHolidaysToCSV);
router.get('/holidays/year/:year', holidaysController.getHolidaysByYear);
router.get('/holidays/month/:yearMonth', holidaysController.getHolidaysByMonth);
router.get('/holidays/type/:type/year/:year', holidaysController.getHolidaysByTypeAndYear);
router.get('/holidays/:id', holidaysController.getHolidayById);
router.put('/holidays/:id', holidaysController.updateHoliday);
router.delete('/holidays/:id', holidaysController.deleteHoliday);

// Holidays Bulk Upload Routes - ADD THESE 2 LINES
router.get('/holidays/template', holidaysController.downloadTemplate);
router.post('/holidays/bulk-upload', upload.single('csvFile'), holidaysController.bulkUploadHolidays);

// Leave Types API
router.get('/leave_types', apiController.getAllLeaveTypes);
router.post('/leave_types', apiController.addLeaveType);
router.delete('/leave_types/:id', apiController.deleteLeaveType);
router.put('/leave_types/:id', apiController.updateLeaveType);
router.get('/leave_types/:id', apiController.getLeaveType);

// Employees API
router.get('/employees', apiController.getAllEmployees);
router.post('/employees', apiController.addEmployee);
router.delete('/employees/:id', apiController.deleteEmployee);
router.put('/employees/:id', apiController.updateEmployee);
router.get('/employees/:id', apiController.getEmployee);
router.get('/employees/payroll/:payroll', apiController.getEmployeeByPayroll);
router.get('/employees/statistics', apiController.getEmployeeStatistics);

// Departments API
router.get('/departments', departmentController.getDepartmentsAPI);
router.get('/departments/:id', departmentController.getDepartmentByIdAPI);
router.post('/departments', departmentController.createDepartmentAPI);
router.put('/departments/:id', departmentController.updateDepartmentAPI);
router.delete('/departments/:id', departmentController.deleteDepartmentAPI);
router.get('/departments/search', departmentController.searchDepartmentsAPI);
router.get('/departments/stats', departmentController.getDepartmentStatsAPI);

module.exports = router;