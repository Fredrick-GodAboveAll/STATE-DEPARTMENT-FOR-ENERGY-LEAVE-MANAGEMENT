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
    // REMOVED THE 'role' COLUMN FROM THE QUERY
    db.connection.get(
      'SELECT id, email, first_name, last_name FROM users WHERE id = ?',
      [req.session.userId]
    )
      .then(user => {
        if (user) {
          res.locals.user = user;
          res.locals.userFirstName = user.first_name;
          res.locals.userLastName = user.last_name;
          res.locals.userName = `${user.first_name} ${user.last_name}`;
        }
        next();
      })
      .catch(err => {
        console.error('Error in attachUserInfo:', err);
        // Continue even if there's an error getting user info
        next();
      });
  } else {
    next();
  }
}

module.exports = {
  requireLogin,
  requireAdmin,
  attachUserInfo
};