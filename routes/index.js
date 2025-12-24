// routes/index.js
const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const dashboardRoutes = require('./dashboard.routes');
const leaveRoutes = require('./leave.routes');
const employeeRoutes = require('./employee.routes');
const apiRoutes = require('./api.routes');
const appRoutes = require('./app.routes');
const departmentRoutes = require('./departments.routes'); // NEW

router.use('/', authRoutes);
router.use('/', dashboardRoutes);
router.use('/', leaveRoutes);
router.use('/', employeeRoutes);
router.use('/api', apiRoutes);
router.use('/', appRoutes);
router.use('/', departmentRoutes); // ADD THIS LINE

module.exports = router;