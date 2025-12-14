// dashbaordrote 

const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.controller');
const { requireLogin } = require('../middleware/auth.middleware');

router.use(requireLogin);

router.get('/dashboard', dashboardController.getDashboard);
router.get('/analytics', dashboardController.getAnalytics);
router.get('/overview', dashboardController.getOverview);

module.exports = router;