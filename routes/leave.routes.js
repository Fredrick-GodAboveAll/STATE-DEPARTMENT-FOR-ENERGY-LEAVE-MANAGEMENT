const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leave.controller');
const { requireLogin } = require('../middleware/auth.middleware');

router.use(requireLogin);

router.get('/leave_types', leaveController.getLeaveTypes);
router.get('/holidays', leaveController.getHolidays);

module.exports = router;