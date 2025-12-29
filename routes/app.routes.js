// routes/app.routes.js
const express = require('express');
const router = express.Router();
const appController = require('../controllers/app.controller');
const holidaysController = require('../controllers/holidaysController');
const { requireLogin } = require('../middleware/auth.middleware');

router.use(requireLogin);

// PAGE ROUTES
router.get('/chat', appController.getChat);
router.get('/calendar', appController.getCalendar);
router.get('/holidays', holidaysController.renderHolidaysPage); // ADD THIS LINE

module.exports = router;