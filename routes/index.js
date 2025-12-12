// =============================================
// MAIN ROUTE AGGREGATOR - COMPLETE FIXED
// =============================================

const express = require('express');
const router = express.Router();

// Import all route modules
const authRoutes = require('./auth.routes');
const dashboardRoutes = require('./dashboard.routes');
const leaveRoutes = require('./leave.routes');
const employeeRoutes = require('./employee.routes');
const apiRoutes = require('./api.routes');
const appRoutes = require('./app.routes');

// Mount routes
router.use('/', authRoutes);
router.use('/', dashboardRoutes);
router.use('/', leaveRoutes);
router.use('/', employeeRoutes);
router.use('/api', apiRoutes);
router.use('/', appRoutes);

module.exports = router;