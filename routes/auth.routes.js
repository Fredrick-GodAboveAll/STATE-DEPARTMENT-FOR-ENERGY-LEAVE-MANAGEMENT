const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// GET Routes
router.get('/', authController.getLogin);
router.get('/sign-up', authController.getRegister);
router.get('/forgot-pass', authController.getForgotPassword);
router.get('/reset-password/:token', authController.getResetPassword);
router.get('/check-mail', authController.getCheckMail);
router.get('/logout', authController.logout);

// POST Routes
router.post('/sign-up', authController.postRegister);
router.post('/login', authController.postLogin);
router.post('/forgot-pass', authController.postForgotPassword);
router.post('/reset-password/:token', authController.postResetPassword);

module.exports = router;