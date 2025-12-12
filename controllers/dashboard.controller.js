// =============================================
// DASHBOARD CONTROLLER - COMPLETE FIXED
// =============================================

const { db } = require('../database');  // ADD THIS IMPORT

const dashboardController = {
  /**
   * Display main dashboard
   */
  getDashboard: function(req, res) {
    db.get('SELECT email, first_name, last_name FROM users WHERE id = ?', [req.session.userId], function(err, user) {
      if (err || !user) {
        req.flash('error_msg', 'User not found');
        return res.redirect('/');
      }
      
      res.render('dashboard/index', {
        activeShow: 'dashboard',
        activePage: 'dashboard',
        userFirstName: user.first_name,
        userLastName: user.last_name,
        userEmail: user.email
      });
    });
  },

  /**
   * Display analytics page
   */
  getAnalytics: function(req, res) {
    db.get('SELECT email, first_name, last_name FROM users WHERE id = ?', [req.session.userId], function(err, user) {
      if (err || !user) {
        req.flash('error_msg', 'User not found');
        return res.redirect('/');
      }
      
      res.render('dashboard/analytics', {
        activeShow: 'dashboard',
        activePage: 'analytics',
        userFirstName: user.first_name,
        userLastName: user.last_name,
        userEmail: user.email
      });
    });
  },

  /**
   * Display overview page
   */
  getOverview: function(req, res) {
    db.get('SELECT email, first_name, last_name FROM users WHERE id = ?', [req.session.userId], function(err, user) {
      if (err || !user) {
        req.flash('error_msg', 'User not found');
        return res.redirect('/');
      }
      
      res.render('dashboard/overview', {
        activeShow: 'overview',
        activePage: 'overview',
        userFirstName: user.first_name,
        userLastName: user.last_name,
        userEmail: user.email
      });
    });
  }
};

module.exports = dashboardController;