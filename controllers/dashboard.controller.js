// =============================================
// DASHBOARD CONTROLLER - FIXED FOR NODE 13
// =============================================

const { db } = require('../database');

const dashboardController = {
  /**
   * Display main dashboard
   */
  getDashboard: function(req, res) {
    db.connection.get(
      'SELECT email, first_name, last_name FROM users WHERE id = ?',
      [req.session.userId]
    )
      .then(user => {
        if (!user) {
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
      })
      .catch(err => {
        console.error('Dashboard error:', err);
        req.flash('error_msg', 'An error occurred while loading dashboard');
        res.redirect('/');
      });
  },

  /**
   * Display analytics page
   */
  getAnalytics: function(req, res) {
    db.connection.get(
      'SELECT email, first_name, last_name FROM users WHERE id = ?',
      [req.session.userId]
    )
      .then(user => {
        if (!user) {
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
      })
      .catch(err => {
        console.error('Analytics error:', err);
        req.flash('error_msg', 'An error occurred while loading analytics');
        res.redirect('/');
      });
  },

  /**
   * Display overview page
   */
  getOverview: function(req, res) {
    db.connection.get(
      'SELECT email, first_name, last_name FROM users WHERE id = ?',
      [req.session.userId]
    )
      .then(user => {
        if (!user) {
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
      })
      .catch(err => {
        console.error('Overview error:', err);
        req.flash('error_msg', 'An error occurred while loading overview');
        res.redirect('/');
      });
  }
};

module.exports = dashboardController;