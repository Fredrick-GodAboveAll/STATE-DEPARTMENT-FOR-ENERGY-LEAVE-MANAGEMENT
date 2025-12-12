// =============================================
// AUTHENTICATION CONTROLLER - COMPLETE FIXED
// =============================================

const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { db } = require('../database');  // KEEP THIS IMPORT
const emailService = require('../services/email.service');
const validators = require('../utils/validators');
const constants = require('../config/constants');

const authController = {
  // ==================== GET ROUTES ====================
  
  getLogin: function(req, res) {
    if (req.session.userId) return res.redirect('/dashboard');
    res.render('auth/login', { layout: 'layouts/auth' });
  },

  getRegister: function(req, res) {
    if (req.session.userId) return res.redirect('/dashboard');
    res.render('auth/register', { layout: 'layouts/auth' });
  },

  getForgotPassword: function(req, res) {
    res.render('auth/forgot-password', { layout: 'layouts/auth' });
  },

  getResetPassword: function(req, res) {
    const token = req.params.token;
    const now = new Date().toISOString();
    
    db.get(
      'SELECT * FROM resets WHERE token = ? AND expires > ?',
      [token, now],
      function(err, reset) {
        if (err || !reset) {
          req.flash('error_msg', 'Invalid or expired reset token');
          return res.redirect('/forgot-pass');
        }
        
        res.render('auth/reset-password', {
          layout: 'layouts/auth',
          token: token
        });
      }
    );
  },

  getCheckMail: function(req, res) {
    res.render('auth/check-mail', { layout: 'layouts/auth' });
  },

  logout: function(req, res) {
    req.session.destroy(function(err) {
      if (err) console.error('Session destruction error:', err);
      res.redirect('/');
    });
  },

  // ==================== POST ROUTES ====================
  
  postRegister: function(req, res) {
    const { first_name, last_name, email, password, confirm_password } = req.body;
    
    // Input validation
    if (!first_name || !last_name || !email || !password || !confirm_password) {
      req.flash('error_msg', 'All fields are required');
      return res.redirect('/sign-up');
    }
    
    // Trim inputs
    const trimmedFirstName = first_name.trim();
    const trimmedLastName = last_name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    
    // Name length validation
    if (trimmedFirstName.length < 2 || trimmedFirstName.length > 50) {
      req.flash('error_msg', 'First name must be between 2 and 50 characters');
      return res.redirect('/sign-up');
    }
    
    if (trimmedLastName.length < 2 || trimmedLastName.length > 50) {
      req.flash('error_msg', 'Last name must be between 2 and 50 characters');
      return res.redirect('/sign-up');
    }
    
    // Password confirmation
    if (password !== confirm_password) {
      req.flash('error_msg', 'Passwords do not match');
      return res.redirect('/sign-up');
    }
    
    // Email validation
    if (!validators.isValidEmail(trimmedEmail)) {
      req.flash('error_msg', 'Please enter a valid email address');
      return res.redirect('/sign-up');
    }
    
    // Password strength validation
    if (password.length < 8) {
      req.flash('error_msg', 'Password must be at least 8 characters long');
      return res.redirect('/sign-up');
    }
    
    // Additional password strength checks
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    
    if (!hasUpperCase || !hasLowerCase || !hasNumbers) {
      req.flash('error_msg', 'Password must contain uppercase, lowercase, and numeric characters');
      return res.redirect('/sign-up');
    }

    // Hash password and create user
    bcrypt.hash(password, 12, function(err, hashedPassword) {
      if (err) {
        console.error('Password hashing error:', err);
        req.flash('error_msg', 'Registration failed. Please try again.');
        return res.redirect('/sign-up');
      }
      
      db.run(
        'INSERT INTO users (first_name, last_name, email, password, created_at) VALUES (?, ?, ?, ?, datetime("now"))',
        [trimmedFirstName, trimmedLastName, trimmedEmail, hashedPassword],
        function(err) {
          if (err) {
            console.error('Database error:', err);
            
            if (err.code === 'SQLITE_CONSTRAINT' && err.message.includes('email')) {
              req.flash('error_msg', 'An account with this email already exists');
            } else {
              req.flash('error_msg', 'Registration failed. Please try again.');
            }
            return res.redirect('/sign-up');
          }
          
          req.session.userId = this.lastID;
          req.session.userEmail = trimmedEmail;
          req.flash('success_msg', 'Registration successful! Welcome to your dashboard.');
          res.redirect('/dashboard');
        }
      );
    });
  },

  postLogin: function(req, res) {
    const { email, password } = req.body;
    
    db.get('SELECT * FROM users WHERE email = ?', [email], function(err, user) {
      if (err) {
        console.error('Login error:', err);
        req.flash('error_msg', 'Login failed');
        return res.redirect('/');
      }
      
      if (!user) {
        req.flash('error_msg', 'Invalid credentials');
        return res.redirect('/');
      }
      
      bcrypt.compare(password, user.password, function(err, result) {
        if (err || !result) {
          req.flash('error_msg', 'Invalid credentials');
          return res.redirect('/');
        }
        
        req.session.userId = user.id;
        req.session.userEmail = user.email;
        
        // NOTE: Removed last_login update since table doesn't have this column
        // If you want to add it, update database.js first
        
        req.flash('success_msg', `Welcome back, ${user.first_name}!`);
        
        // Save session and redirect
        req.session.save(function(err) {
          if (err) {
            console.error('Session save error:', err);
          }
          res.redirect('/dashboard');
        });
      });
    });
  },

  postForgotPassword: function(req, res) {
    const { email } = req.body;
    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 3600000).toISOString();

    db.get('SELECT * FROM users WHERE email = ?', [email], function(err, user) {
      if (err || !user) {
        req.flash('success_msg', 'If registered, you\'ll receive a reset link');
        return res.redirect('/forgot-pass');
      }

      db.run('DELETE FROM resets WHERE email = ?', [email], function() {
        db.run(
          'INSERT INTO resets (email, token, expires) VALUES (?, ?, ?)',
          [email, token, expires],
          function(err) {
            if (err) {
              console.error('Token save error:', err);
              req.flash('error_msg', 'Password reset failed');
              return res.redirect('/forgot-pass');
            }
            
            const resetLink = `http://localhost:${constants.PORT}/reset-password/${token}`;
            emailService.sendResetEmail(email, resetLink);
            
            res.redirect('/check-mail');
          }
        );
      });
    });
  },

  postResetPassword: function(req, res) {
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

    const now = new Date().toISOString();
    db.get(
      'SELECT * FROM resets WHERE token = ? AND expires > ?',
      [token, now],
      function(err, reset) {
        if (err || !reset) {
          req.flash('error_msg', 'Invalid or expired token');
          return res.redirect('/forgot-pass');
        }
        
        bcrypt.hash(password, 12, function(err, hashedPassword) {
          if (err) {
            console.error('Hashing error:', err);
            req.flash('error_msg', 'Password reset failed');
            return res.redirect(`/reset-password/${token}`);
          }
          
          db.run(
            'UPDATE users SET password = ? WHERE email = ?',
            [hashedPassword, reset.email],
            function(err) {
              if (err) {
                console.error('Password reset error:', err);
                req.flash('error_msg', 'Password reset failed');
                return res.redirect(`/reset-password/${token}`);
              }
              
              db.run('DELETE FROM resets WHERE email = ?', [reset.email]);
              
              req.flash('success_msg', 'Password updated! Please login');
              res.redirect('/');
            }
          );
        });
      }
    );
  }
};

module.exports = authController;