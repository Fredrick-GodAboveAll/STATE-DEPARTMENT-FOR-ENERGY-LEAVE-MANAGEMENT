// =============================================
// LEAVE MANAGEMENT SYSTEM - MAIN APPLICATION
// =============================================
// This is the main entry point of the application
// Purpose: Configure and start the Express server
// =============================================

// Load environment variables
require('dotenv').config();

// Import core modules
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');

// Import application modules
const { initializeDatabase } = require('./database');
const { SESSION_CONFIG } = require('./session');
const constants = require('./config/constants');
const routes = require('./routes/index');

// Import middleware
const flashMiddleware = require('./middleware/flash.middleware');
const { attachUserInfo } = require('./middleware/auth.middleware');
const { errorHandler, notFoundHandler } = require('./middleware/error.middleware');

// =============================================
// DATABASE INITIALIZATION
// =============================================
initializeDatabase()
  .then(function() {
    console.log('✅ Database setup completed successfully');
  })
  .catch(function(err) {
    console.error('❌ Database setup failed:', err);
    process.exit(1); // Exit if database fails
  });

// =============================================
// EXPRESS APPLICATION SETUP
// =============================================
const app = express();
const PORT = constants.PORT;

// =============================================
// MIDDLEWARE CONFIGURATION
// =============================================

// Parse request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration
app.use(session(SESSION_CONFIG));

// Flash messages
app.use(flash());

// EJS view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// EJS layouts
app.use(expressLayouts);
app.set('layout', 'layouts/main');

// Custom middleware
app.use(attachUserInfo);     // Add user info to all views
app.use(flashMiddleware);    // Process flash messages

// =============================================
// GLOBAL VIEW VARIABLES
// =============================================
app.use(function(req, res, next) {
  // Make constants available in all views
  res.locals.appName = constants.APP_NAME;
  res.locals.appVersion = constants.APP_VERSION;
  res.locals.currentYear = new Date().getFullYear();
  
  // Set active menu items based on URL
  res.locals.activePath = req.path;
  
  next();
});

// =============================================
// ROUTES
// =============================================
app.use('/', routes);

// =============================================
// ERROR HANDLING
// =============================================

// 404 Not Found handler (must be after all routes)
app.use(notFoundHandler);

// Global error handler (must be last middleware)
app.use(errorHandler);

// =============================================
// SERVER STARTUP
// =============================================
app.listen(PORT, function() {
  console.log('='.repeat(60));
  console.log(`🚀 ${constants.APP_NAME} v${constants.APP_VERSION}`);
  console.log('='.repeat(60));
  console.log(`📍 Server running on: http://localhost:${PORT}`);
  console.log(`📁 Views directory: ${path.join(__dirname, 'views')}`);
  console.log(`⚡ Node.js version: ${process.version}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('='.repeat(60));
  console.log('📋 Available routes:');
  console.log('   /                    - Login page');
  console.log('   /sign-up             - Registration page');
  console.log('   /dashboard           - Main dashboard');
  console.log('   /leave_types         - Leave types management');
  console.log('   /holidays            - Holidays management');
  console.log('   /register            - Employee list');
  console.log('   /api/*               - API endpoints');
  console.log('='.repeat(60));
});