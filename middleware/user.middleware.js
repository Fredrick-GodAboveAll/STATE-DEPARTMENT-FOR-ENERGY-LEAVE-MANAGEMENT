// =============================================
// USER MIDDLEWARE
// Attaches user info to all views
// =============================================

const { db } = require('../database');

function attachUserInfo(req, res, next) {
  // Attach user info to all views if logged in
  if (req.session.userId) {
    db.get(
      'SELECT id, email, first_name, last_name, role FROM users WHERE id = ?',
      [req.session.userId],
      function(err, user) {
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

module.exports = attachUserInfo;