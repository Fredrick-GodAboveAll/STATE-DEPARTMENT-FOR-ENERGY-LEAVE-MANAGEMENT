const express = require('express');
const router = express.Router();
const appController = require('../controllers/app.controller');
const { requireLogin } = require('../middleware/auth.middleware');

router.use(requireLogin);

router.get('/chat', appController.getChat);
router.get('/calender', appController.getCalendar);

module.exports = router;