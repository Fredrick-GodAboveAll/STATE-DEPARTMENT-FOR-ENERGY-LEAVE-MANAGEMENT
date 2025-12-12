// This file contains authentication and authorization middleware
// Purpose: Protect routes and check user permissions

const { db } = require('../database');

// Middleware to check if user is logged in
function requireLogin(req, res, next) {
  if (!req.session.userId) {
    req.flash('error_msg', 'Please log in to access this page');
    return res.redirect('/');
  }
  next();
}

// Middleware to check if user is admin (example for future use)
function requireAdmin(req, res, next) {
  if (!req.session.isAdmin) {
    req.flash('error_msg', 'Admin access required');
    return res.redirect('/dashboard');
  }
  next();
}

// Middleware to attach user info to all views
function attachUserInfo(req, res, next) {
  if (req.session.userId) {
    db.get(
      'SELECT id, email, first_name, last_name, role FROM users WHERE id = ?',
      [req.session.userId],
      (err, user) => {
        if (!err && user) {
          res.locals.user = user;
          res.locals.userName = `${user.first_name} ${user.last_name}`;
        }
        next();
      }
    );
  } else {
    next();
  }
}

module.exports = {
  requireLogin,
  requireAdmin,
  attachUserInfo
};