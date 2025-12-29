// middleware/auth.middleware.js
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
async function attachUserInfo(req, res, next) {
  if (req.session.userId) {
    try {
      // Ensure connection is open
      if (!db.connection.isConnected) {
        await db.connection.connect();
      }
      
      // REMOVED THE 'role' COLUMN FROM THE QUERY
      const user = await db.connection.get(
        'SELECT id, email, first_name, last_name FROM users WHERE id = ?',
        [req.session.userId]
      );
      
      if (user) {
        req.user = user;
        res.locals.user = user;
        res.locals.userFirstName = user.first_name;
        res.locals.userLastName = user.last_name;
        res.locals.userName = `${user.first_name} ${user.last_name}`;
      }
    } catch (err) {
      console.error('Error in attachUserInfo:', err.message);
      // Don't crash the app on user lookup error
    }
  }
  next();
}

module.exports = {
  requireLogin,
  requireAdmin,
  attachUserInfo
};