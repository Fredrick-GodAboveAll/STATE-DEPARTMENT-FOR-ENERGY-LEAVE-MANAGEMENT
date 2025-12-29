// routes/holidaysRoutes.js
const express = require('express');
const router = express.Router();
const holidaysController = require('../controllers/holidaysController');

// Main page route
router.get('/', holidaysController.renderHolidaysPage);

// API Routes
router.get('/api/holidays', holidaysController.getAllHolidays);
router.get('/api/holidays/statistics', holidaysController.getHolidayStatistics);
router.get('/api/holidays/upcoming', holidaysController.getUpcomingHolidays);
router.get('/api/holidays/search', holidaysController.searchHolidays);
router.get('/api/holidays/export', holidaysController.exportHolidaysToCSV);
router.get('/api/holidays/:id', holidaysController.getHolidayById);
router.post('/api/holidays', holidaysController.createHoliday);
router.put('/api/holidays/:id', holidaysController.updateHoliday);
router.delete('/api/holidays/:id', holidaysController.deleteHoliday);

// Filter routes
router.get('/api/holidays/year/:year', holidaysController.getHolidaysByYear);
router.get('/api/holidays/month/:yearMonth', holidaysController.getHolidaysByMonth);
router.get('/api/holidays/type/:type/year/:year', holidaysController.getHolidaysByTypeAndYear);

module.exports = router;