// =============================================
// APPS CONTROLLER - COMPLETE FIXED
// =============================================

const { db } = require('../database');  // ADD THIS IMPORT

const appController = {
  /**
   * Display chat application
   */
  getChat: function(req, res) {
    db.get('SELECT email, first_name, last_name FROM users WHERE id = ?', [req.session.userId], function(err, user) {
      if (err || !user) {
        req.flash('error_msg', 'User not found');
        return res.redirect('/');
      }
      
      res.render('apps/chat', {
        activeShow: 'chat',
        activePage: 'chat',
        userFirstName: user.first_name,
        userLastName: user.last_name
      });
    });
  },

  /**
   * Display calendar application
   */
  getCalendar: function(req, res) {
    db.get('SELECT email, first_name, last_name FROM users WHERE id = ?', [req.session.userId], function(err, user) {
      if (err || !user) {
        req.flash('error_msg', 'User not found');
        return res.redirect('/');
      }
      
      res.render('apps/calender', {
        activeShow: 'calender',
        activePage: 'calender',
        userFirstName: user.first_name,
        userLastName: user.last_name
      });
    });
  }
};

module.exports = appController;