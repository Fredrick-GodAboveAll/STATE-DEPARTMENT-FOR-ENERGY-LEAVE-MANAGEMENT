const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leave.controller');
const { requireLogin } = require('../middleware/auth.middleware');

router.use(requireLogin);

// View routes
router.get('/leave_types', leaveController.getLeaveTypes);
router.get('/holidays', leaveController.getHolidays);

// API routes for leave types CRUD
router.get('/leave_types/:id', leaveController.getLeaveTypeById);
router.post('/leave_types', leaveController.createLeaveType);
router.put('/leave_types/:id', leaveController.updateLeaveType);
router.delete('/leave_types/:id', leaveController.deleteLeaveType);

// Additional leave type operations
router.patch('/leave_types/:id/toggle-status', leaveController.toggleLeaveTypeStatus);
router.get('/leave_types/search', leaveController.searchLeaveTypes);

module.exports = router;