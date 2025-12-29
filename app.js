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
const database = require('./database'); // Updated to use modular database
const { SESSION_CONFIG } = require('./session');
const constants = require('./config/constants');
const routes = require('./routes/index');

// Import controllers
const holidaysController = require('./controllers/holidaysController'); // ADD THIS

// Import middleware
const flashMiddleware = require('./middleware/flash.middleware');
const { attachUserInfo } = require('./middleware/auth.middleware');
const { errorHandler, notFoundHandler } = require('./middleware/error.middleware');

// =============================================
// DATABASE INITIALIZATION
// =============================================
database.initializeDatabase()
  .then(function() {
    console.log('✅ Database setup completed successfully');
    
    // Display database status
    database.db.getStatus().then(status => {
      console.log('\n📊 Database Status Report:');
      console.log('='.repeat(50));
      console.log(`📁 Database: ${status.databasePath || './auth.db'}`);
      console.log(`🔗 Connected: ${status.connected ? '✅ Yes' : '❌ No'}`);
      console.log(`🔄 Initialized: ${status.initialized ? '✅ Yes' : '❌ No'}`);
      
      if (status.tables && status.tables.length > 0) {
        console.log('\n📋 Tables Summary:');
        status.tables.forEach(table => {
          const tableName = table.name || 'unknown';
          const recordCount = table.count || 0;
          console.log(`   ${tableName.padEnd(20)}: ${recordCount} records`);
        });
      }
      console.log('='.repeat(50) + '\n');
    }).catch(err => {
      console.log('⚠️ Could not get database status:', err.message);
    });
  })
  .catch(function(err) {
    console.error('❌ Database setup failed:', err);
    console.error('\n🔧 Troubleshooting steps:');
    console.error('   1. Check if SQLite3 is installed');
    console.error('   2. Check write permissions in the current directory');
    console.error('   3. Check if another process is using the database');
    console.error('   4. Try deleting auth.db and restarting');
    console.error('='.repeat(60));
    process.exit(1); // Exit if database fails
  });

// =============================================
// EXPRESS APPLICATION SETUP
// =============================================
const app = express();
const PORT = constants.PORT || 3000;

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
  
  // Make database available for debugging (remove in production)
  if (process.env.NODE_ENV !== 'production') {
    res.locals.dbStatus = database.db.getStatus ? database.db.getStatus() : null;
  }
  
  next();
});

// =============================================
// ROUTES
// =============================================
app.use('/', routes);

// =============================================
// HOLIDAYS PAGE ROUTE (ADD THIS SECTION)
// =============================================
app.get('/holidays', function(req, res, next) {
  // Check if user is logged in
  if (!req.session.userId) {
    return res.redirect('/?error=Please login to access holidays page');
  }
  
  // Use the holidays controller to render the page
  holidaysController.renderHolidaysPage(req, res);
});

// =============================================
// HEALTH CHECK ENDPOINT
// =============================================
app.get('/health', async function(req, res) {
  try {
    const status = await database.db.getStatus();
    res.json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      database: status.connected ? 'Connected' : 'Disconnected',
      tables: status.tables ? status.tables.length : 0,
      uptime: process.uptime(),
      memory: process.memoryUsage()
    });
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      error: error.message
    });
  }
});

// =============================================
// DATABASE DEBUG ENDPOINTS (REMOVE IN PRODUCTION)
// =============================================
if (process.env.NODE_ENV !== 'production') {
  app.get('/debug/db-status', async function(req, res) {
    try {
      const status = await database.db.getStatus();
      res.json(status);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get('/debug/db-tables', async function(req, res) {
    try {
      // Ensure connection
      if (!database.connection.isConnected) {
        await database.connection.connect();
      }
      
      // Get all tables and their row counts
      const tables = await database.connection.all(
        "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name"
      );
      
      const tableData = [];
      for (const table of tables) {
        const count = await database.connection.get(`SELECT COUNT(*) as count FROM ${table.name}`);
        const schema = await database.connection.all(`PRAGMA table_info(${table.name})`);
        
        tableData.push({
          name: table.name,
          count: count.count,
          columns: schema.map(col => ({
            name: col.name,
            type: col.type,
            notnull: col.notnull,
            pk: col.pk
          }))
        });
      }
      
      res.json(tableData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
}

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
const server = app.listen(PORT, function() {
  console.log('='.repeat(60));
  console.log(`🚀 ${constants.APP_NAME} v${constants.APP_VERSION}`);
  console.log('='.repeat(60));
  console.log(`📍 Server running on: http://localhost:${PORT}`);
  console.log(`📁 Views directory: ${path.join(__dirname, 'views')}`);
  console.log(`📊 Database: ./auth.db`);
  console.log(`⚡ Node.js version: ${process.version}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('='.repeat(60));
  console.log('📋 Available routes:');
  console.log('   /                    - Login page');
  console.log('   /sign-up             - Registration page');
  console.log('   /dashboard           - Main dashboard');
  console.log('   /leave_types         - Leave types management');
  console.log('   /holidays            - Holidays management');
  console.log('   /register            - Employee list');
  console.log('   /api/*               - API endpoints');
  console.log('   /health              - Health check endpoint');
  
  if (process.env.NODE_ENV !== 'production') {
    console.log('   /debug/db-status     - Database status (dev only)');
    console.log('   /debug/db-tables     - Database tables info (dev only)');
  }
  
  console.log('='.repeat(60));
});

// =============================================
// GRACEFUL SHUTDOWN
// =============================================
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

function gracefulShutdown() {
  console.log('\n🔄 Received shutdown signal, closing gracefully...');
  
  server.close(async function() {
    console.log('✅ HTTP server closed');
    
    try {
      await database.db.close();
      console.log('✅ Database connection closed');
    } catch (err) {
      console.error('❌ Error closing database:', err);
    }
    
    console.log('👋 Goodbye!');
    process.exit(0);
  });

  // Force shutdown after 5 seconds
  setTimeout(function() {
    console.error('❌ Could not close gracefully, forcing shutdown');
    process.exit(1);
  }, 5000);
}

// =============================================
// EXPORT FOR TESTING
// =============================================
module.exports = { app, server, database };