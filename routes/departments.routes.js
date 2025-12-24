// routes/department.routes.js
const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/department.controller');
const { requireLogin } = require('../middleware/auth.middleware');

// Apply login requirement to all department routes
router.use(requireLogin);

// Page routes
router.get('/d-overview', departmentController.getDepartments);
router.get('/d-structure', departmentController.getDepartmentStructure);
router.get('/departments/add', departmentController.getAddDepartment);
router.post('/departments/add', departmentController.postAddDepartment);
router.get('/departments/edit/:id', departmentController.getEditDepartment);
router.post('/departments/edit/:id', departmentController.postEditDepartment);
router.get('/departments/toggle/:id', departmentController.toggleDepartmentStatus);
router.get('/departments/delete/:id', departmentController.deleteDepartment);

module.exports = router;