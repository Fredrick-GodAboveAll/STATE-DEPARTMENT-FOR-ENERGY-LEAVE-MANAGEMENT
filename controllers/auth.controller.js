// =============================================
// AUTHENTICATION CONTROLLER - ASYNC/AWAIT FIX
// =============================================

const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { db } = require('../database'); // KEEP THIS IMPORT
const emailService = require('../services/email.service');
const validators = require('../utils/validators');
const constants = require('../config/constants');

const authController = {
  // ==================== GET ROUTES ====================
  getLogin: (req, res) => {
    if (req.session.userId) return res.redirect('/dashboard');
    res.render('auth/login', { layout: 'layouts/auth' });
  },

  getRegister: (req, res) => {
    if (req.session.userId) return res.redirect('/dashboard');
    res.render('auth/register', { layout: 'layouts/auth' });
  },

  getForgotPassword: (req, res) => {
    res.render('auth/forgot-password', { layout: 'layouts/auth' });
  },

  getResetPassword: async (req, res) => {
    const token = req.params.token;
    const now = new Date().toISOString();

    try {
      const reset = await db.connection.get(
        'SELECT * FROM resets WHERE token = ? AND expires > ?',
        [token, now]
      );

      if (!reset) {
        req.flash('error_msg', 'Invalid or expired reset token');
        return res.redirect('/forgot-pass');
      }

      res.render('auth/reset-password', {
        layout: 'layouts/auth',
        token,
      });
    } catch (err) {
      console.error('Reset token error:', err);
      req.flash('error_msg', 'Something went wrong');
      res.redirect('/forgot-pass');
    }
  },

  getCheckMail: (req, res) => {
    res.render('auth/check-mail', { layout: 'layouts/auth' });
  },

  logout: (req, res) => {
    req.session.destroy((err) => {
      if (err) console.error('Session destruction error:', err);
      res.redirect('/');
    });
  },

  // ==================== POST ROUTES ====================
  postRegister: async (req, res) => {
    const { first_name, last_name, email, password, confirm_password } = req.body;

    // --- Validation ---
    if (!first_name || !last_name || !email || !password || !confirm_password) {
      req.flash('error_msg', 'All fields are required');
      return res.redirect('/sign-up');
    }

    const trimmedFirstName = first_name.trim();
    const trimmedLastName = last_name.trim();
    const trimmedEmail = email.trim().toLowerCase();

    console.log('📝 Registration attempt with email:', trimmedEmail);

    if (trimmedFirstName.length < 2 || trimmedFirstName.length > 50) {
      req.flash('error_msg', 'First name must be 2-50 chars');
      return res.redirect('/sign-up');
    }

    if (trimmedLastName.length < 2 || trimmedLastName.length > 50) {
      req.flash('error_msg', 'Last name must be 2-50 chars');
      return res.redirect('/sign-up');
    }

    if (password !== confirm_password) {
      req.flash('error_msg', 'Passwords do not match');
      return res.redirect('/sign-up');
    }

    if (!validators.isValidEmail(trimmedEmail)) {
      req.flash('error_msg', 'Invalid email address');
      return res.redirect('/sign-up');
    }

    if (password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/\d/.test(password)) {
      req.flash(
        'error_msg',
        'Password must be at least 8 chars and contain uppercase, lowercase, and number'
      );
      return res.redirect('/sign-up');
    }

    try {
      // Check if email already exists first
      const existingUser = await db.connection.get('SELECT id FROM users WHERE LOWER(email) = ?', [trimmedEmail]);
      if (existingUser) {
        console.log('❌ Email already exists in database:', trimmedEmail);
        req.flash('error_msg', 'Email already registered. Please log in or use a different email.');
        return res.redirect('/sign-up');
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const result = await db.connection.execute(
        'INSERT INTO users (first_name, last_name, email, password, created_at) VALUES (?, ?, ?, ?, datetime("now"))',
        [trimmedFirstName, trimmedLastName, trimmedEmail, hashedPassword]
      );

      console.log('✅ User registered successfully:', trimmedEmail);
      req.session.userId = result.lastID;
      req.session.userEmail = trimmedEmail;
      req.flash('success_msg', 'Registration successful! Welcome.');
      res.redirect('/dashboard');
    } catch (err) {
      console.error('Registration DB error:', err);

      if (err.message.includes('UNIQUE constraint failed: users.email')) {
        req.flash('error_msg', 'Email already exists');
      } else {
        req.flash('error_msg', 'Registration failed. Try again');
      }

      res.redirect('/sign-up');
    }
  },

  postLogin: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await db.connection.get('SELECT * FROM users WHERE email = ?', [email]);

      if (!user) {
        req.flash('error_msg', 'Invalid credentials');
        return res.redirect('/');
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        req.flash('error_msg', 'Invalid credentials');
        return res.redirect('/');
      }

      req.session.userId = user.id;
      req.session.userEmail = user.email;
      req.flash('success_msg', `Welcome back, ${user.first_name}!`);

      req.session.save((err) => {
        if (err) console.error('Session save error:', err);
        res.redirect('/dashboard');
      });
    } catch (err) {
      console.error('Login error:', err);
      req.flash('error_msg', 'Login failed');
      res.redirect('/');
    }
  },

  postForgotPassword: async (req, res) => {
    const { email } = req.body;
    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 3600000).toISOString();

    try {
      const user = await db.connection.get('SELECT * FROM users WHERE email = ?', [email]);
      if (!user) {
        req.flash('success_msg', 'If registered, you will receive a reset link');
        return res.redirect('/forgot-pass');
      }

      await db.connection.execute('DELETE FROM resets WHERE email = ?', [email]);
      await db.connection.execute(
        'INSERT INTO resets (email, token, expires) VALUES (?, ?, ?)',
        [email, token, expires]
      );

      const resetLink = `http://localhost:${constants.PORT}/reset-password/${token}`;
      emailService.sendResetEmail(email, resetLink);

      res.redirect('/check-mail');
    } catch (err) {
      console.error('Forgot password error:', err);
      req.flash('error_msg', 'Failed to generate reset link');
      res.redirect('/forgot-pass');
    }
  },

  postResetPassword: async (req, res) => {
    const { password, confirm_password } = req.body;
    const token = req.params.token;

    if (password !== confirm_password) {
      req.flash('error_msg', 'Passwords do not match');
      return res.redirect(`/reset-password/${token}`);
    }

    if (password.length < 8) {
      req.flash('error_msg', 'Password must be at least 8 characters');
      return res.redirect(`/reset-password/${token}`);
    }

    try {
      const now = new Date().toISOString();
      const reset = await db.connection.get(
        'SELECT * FROM resets WHERE token = ? AND expires > ?',
        [token, now]
      );

      if (!reset) {
        req.flash('error_msg', 'Invalid or expired token');
        return res.redirect('/forgot-pass');
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      await db.connection.execute(
        'UPDATE users SET password = ? WHERE email = ?',
        [hashedPassword, reset.email]
      );

      await db.connection.execute('DELETE FROM resets WHERE email = ?', [reset.email]);

      req.flash('success_msg', 'Password updated! Please login');
      res.redirect('/');
    } catch (err) {
      console.error('Reset password error:', err);
      req.flash('error_msg', 'Failed to reset password');
      res.redirect(`/reset-password/${token}`);
    }
  },
};

module.exports = authController;
