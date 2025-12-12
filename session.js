// session.js - Session Management Module
const crypto = require('crypto');

// Session configuration
const SESSION_CONFIG = {
  secret: crypto.randomBytes(32).toString('hex'),
  resave: false,
  saveUninitialized: false,
  genid: () => crypto.randomBytes(16).toString('hex'),
  rolling: true, // This resets the expiration time on each request
  cookie: { 
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 1000  // 1 hour in milliseconds (3,600,000 ms)
  }
};

// Function to get session time remaining
function getSessionTimeRemaining(req) {
  const expires = new Date(req.session.cookie.expires);
  const now = new Date();
  const timeRemaining = expires - now;
  
  const totalHours = Math.floor(timeRemaining / (1000 * 60 * 60));
  const totalMinutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
  
  // Format display for 1-hour sessions
  let timeDisplay;
  if (totalHours > 0) {
    timeDisplay = `${totalHours}h ${totalMinutes}m`;
  } else if (totalMinutes > 0) {
    timeDisplay = `${totalMinutes}m`;
  } else if (seconds > 0) {
    timeDisplay = `${seconds}s`;
  } else {
    timeDisplay = 'Expired';
  }
  
  return {
    expires,
    timeRemaining: timeDisplay,
    totalSeconds: Math.floor(timeRemaining / 1000),
    isExpired: timeRemaining <= 0
  };
}

// Middleware to add session info to all protected routes
function addSessionInfo(req, res, next) {
  if (req.session.userId) {
    const sessionInfo = getSessionTimeRemaining(req);
    res.locals.sessionInfo = sessionInfo;
  }
  next();
}

// Authentication middleware
function requireLogin(req, res, next) {
  if (!req.session.userId) {
    req.flash('error_msg', 'Please login to access this page');
    return res.redirect('/');
  }
  next();
}

module.exports = {
  SESSION_CONFIG,
  getSessionTimeRemaining,
  addSessionInfo,
  requireLogin
};