// routes/index.js
const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const dashboardRoutes = require('./dashboard.routes');
const leaveRoutes = require('./leave.routes');
const employeeRoutes = require('./employee.routes');
const apiRoutes = require('./api.routes');
const appRoutes = require('./app.routes');     // FOR PAGES
const departmentRoutes = require('./departments.routes');

router.use('/', authRoutes);
router.use('/', dashboardRoutes);
router.use('/', leaveRoutes);
router.use('/', employeeRoutes);
router.use('/api', apiRoutes);      // ALL API ROUTES UNDER /api
router.use('/', appRoutes);         // ALL PAGE ROUTES AT ROOT
router.use('/', departmentRoutes);

module.exports = router;