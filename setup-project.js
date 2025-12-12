// setup-project.js
const fs = require('fs');
const path = require('path');

console.log('🚀 Creating Leave Management System Structure...\n');

// Define the folder structure
const structure = {
  'config': [
    'constants.js',
    'email.config.js'
  ],
  'routes': [
    'index.js',
    'auth.routes.js',
    'dashboard.routes.js',
    'leave.routes.js',
    'employee.routes.js',
    'api.routes.js',
    'app.routes.js'
  ],
  'controllers': [
    'auth.controller.js',
    'dashboard.controller.js',
    'leave.controller.js',
    'employee.controller.js',
    'api.controller.js',
    'app.controller.js'
  ],
  'middleware': [
    'auth.middleware.js',
    'flash.middleware.js',
    'user.middleware.js',
    'error.middleware.js'
  ],
  'services': [
    'email.service.js',
    'leave.service.js',
    'employee.service.js'
  ],
  'utils': [
    'validators.js',
    'dateHelpers.js',
    'fileHelpers.js'
  ]
};

// Create folders and files
Object.keys(structure).forEach(folder => {
  // Create folder
  const folderPath = path.join(__dirname, folder);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
    console.log(`📁 Created folder: ${folder}/`);
  }

  // Create files in folder
  structure[folder].forEach(file => {
    const filePath = path.join(folderPath, file);
    
    // Only create if file doesn't exist
    if (!fs.existsSync(filePath)) {
      // Add basic content based on file type
      let content = '';
      
      switch(file) {
        // Config files
        case 'constants.js':
          content = `// Application constants
module.exports = {
  APP_NAME: 'Leave Management System',
  APP_VERSION: '1.0.0',
  PORT: process.env.PORT || 3000,
  
  SESSION_SECRET: process.env.SESSION_SECRET || 'your-secret-key',
  SESSION_MAX_AGE: 24 * 60 * 60 * 1000,
  
  MAX_LEAVE_DAYS: 30,
  MIN_LEAVE_NOTICE_DAYS: 3,
  
  EMPLOYMENT_STATUSES: ['Permanent', 'Contract', 'Probation', 'Intern'],
  JOB_GROUPS: ['A', 'B', 'C', 'D', 'E']
};`;
          break;
          
        case 'email.config.js':
          content = `// Email configuration
const nodemailer = require('nodemailer');
const constants = require('./constants');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

// Test connection
transporter.verify(function(error) {
  if (error) {
    console.log('Email connection error:', error);
  } else {
    console.log('Email server ready');
  }
});

module.exports = transporter;`;
          break;

        // Route files
        case 'index.js':
          content = `// Main route aggregator
const express = require('express');
const router = express.Router();

// Import routes
const authRoutes = require('./auth.routes');
const dashboardRoutes = require('./dashboard.routes');
const leaveRoutes = require('./leave.routes');
const employeeRoutes = require('./employee.routes');
const apiRoutes = require('./api.routes');
const appRoutes = require('./app.routes');

// Mount routes
router.use('/', authRoutes);
router.use('/', dashboardRoutes);
router.use('/', leaveRoutes);
router.use('/', employeeRoutes);
router.use('/api', apiRoutes);
router.use('/', appRoutes);

module.exports = router;`;
          break;

        case 'auth.routes.js':
          content = `// Authentication routes
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// GET Routes
router.get('/', authController.getLogin);
router.get('/sign-up', authController.getRegister);
router.get('/forgot-pass', authController.getForgotPassword);
router.get('/reset-password/:token', authController.getResetPassword);
router.get('/check-mail', authController.getCheckMail);
router.get('/logout', authController.logout);

// POST Routes
router.post('/sign-up', authController.postRegister);
router.post('/login', authController.postLogin);
router.post('/forgot-pass', authController.postForgotPassword);
router.post('/reset-password/:token', authController.postResetPassword);

module.exports = router;`;
          break;

        case 'dashboard.routes.js':
          content = `// Dashboard routes
const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.controller');
const { requireLogin } = require('../middleware/auth.middleware');

// Protect all dashboard routes
router.use(requireLogin);

router.get('/dashboard', dashboardController.getDashboard);
router.get('/analytics', dashboardController.getAnalytics);
router.get('/overview', dashboardController.getOverview);

module.exports = router;`;
          break;

        case 'leave.routes.js':
          content = `// Leave management routes
const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leave.controller');
const { requireLogin } = require('../middleware/auth.middleware');

// Protect all leave routes
router.use(requireLogin);

router.get('/leave_types', leaveController.getLeaveTypes);
router.get('/holidays', leaveController.getHolidays);

module.exports = router;`;
          break;

        case 'employee.routes.js':
          content = `// Employee management routes
const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee.controller');
const { requireLogin } = require('../middleware/auth.middleware');

// Protect all employee routes
router.use(requireLogin);

router.get('/register', employeeController.getEmployees); // Employee list
router.get('/add-employee', employeeController.getAddEmployee); // Add employee form

module.exports = router;`;
          break;

        case 'api.routes.js':
          content = `// API routes (AJAX endpoints)
const express = require('express');
const router = express.Router();
const apiController = require('../controllers/api.controller');
const { requireLogin } = require('../middleware/auth.middleware');

// Protect all API routes
router.use(requireLogin);

// Holidays API
router.route('/holidays')
  .post(apiController.addHoliday);

router.route('/holidays/:id')
  .get(apiController.getHoliday)
  .put(apiController.updateHoliday)
  .delete(apiController.deleteHoliday);

// Leave Types API
router.route('/leave_types')
  .post(apiController.addLeaveType);

router.route('/leave_types/:id')
  .get(apiController.getLeaveType)
  .put(apiController.updateLeaveType)
  .delete(apiController.deleteLeaveType);

// Employees API
router.route('/employees')
  .post(apiController.addEmployee);

router.route('/employees/:id')
  .get(apiController.getEmployee)
  .put(apiController.updateEmployee)
  .delete(apiController.deleteEmployee);

module.exports = router;`;
          break;

        case 'app.routes.js':
          content = `// Apps routes (Calendar, Chat, etc.)
const express = require('express');
const router = express.Router();
const appController = require('../controllers/app.controller');
const { requireLogin } = require('../middleware/auth.middleware');

// Protect all app routes
router.use(requireLogin);

router.get('/chat', appController.getChat);
router.get('/calender', appController.getCalendar);

module.exports = router;`;
          break;

        // Middleware files
        case 'auth.middleware.js':
          content = `// Authentication middleware
function requireLogin(req, res, next) {
  if (!req.session.userId) {
    req.flash('error_msg', 'Please log in to access this page');
    return res.redirect('/');
  }
  next();
}

function requireAdmin(req, res, next) {
  // TODO: Implement admin check
  next();
}

module.exports = {
  requireLogin,
  requireAdmin
};`;
          break;

        case 'flash.middleware.js':
          content = `// Flash messages middleware
function flashMessages(req, res, next) {
  res.locals.toasts = [];
  
  const successMessages = req.flash('success_msg');
  if (successMessages.length) {
    successMessages.forEach(function(msg) {
      res.locals.toasts.push({ type: 'success', message: msg });
    });
  }
  
  const errorMessages = req.flash('error_msg');
  if (errorMessages.length) {
    errorMessages.forEach(function(msg) {
      res.locals.toasts.push({ type: 'danger', message: msg });
    });
  }
  
  next();
}

module.exports = flashMessages;`;
          break;

        case 'error.middleware.js':
          content = `// Error handling middleware
function errorHandler(err, req, res, next) {
  console.error('Error:', err.message);
  
  if (req.xhr || req.path.startsWith('/api/')) {
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  } else {
    res.status(500).render('error/500', {
      error: err.message
    });
  }
}

function notFoundHandler(req, res, next) {
  res.status(404).render('error/404');
}

module.exports = {
  errorHandler,
  notFoundHandler
};`;
          break;

        // Controller files
        case 'auth.controller.js':
          content = `// Authentication controller
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { db } = require('../database');
const { sendResetEmail } = require('../services/email.service');

module.exports = {
  // GET Requests
  getLogin: function(req, res) {
    if (req.session.userId) return res.redirect('/dashboard');
    res.render('auth/login', { layout: 'layouts/auth' });
  },

  getRegister: function(req, res) {
    if (req.session.userId) return res.redirect('/dashboard');
    res.render('auth/register', { layout: 'layouts/auth' });
  },

  getForgotPassword: function(req, res) {
    res.render('auth/forgot-password', { layout: 'layouts/auth' });
  },

  getResetPassword: function(req, res) {
    res.render('auth/reset-password', { 
      layout: 'layouts/auth', 
      token: req.params.token 
    });
  },

  getCheckMail: function(req, res) {
    res.render('auth/check-mail', { layout: 'layouts/auth' });
  },

  logout: function(req, res) {
    req.session.destroy(function(err) {
      if (err) console.error('Session error:', err);
      res.redirect('/');
    });
  },

  // POST Requests
  postRegister: function(req, res) {
    // TODO: Copy register logic from app.js
    req.flash('success_msg', 'Register function needs implementation');
    res.redirect('/sign-up');
  },

  postLogin: function(req, res) {
    // TODO: Copy login logic from app.js
    req.flash('success_msg', 'Login function needs implementation');
    res.redirect('/');
  },

  postForgotPassword: function(req, res) {
    // TODO: Copy forgot password logic from app.js
    req.flash('success_msg', 'Forgot password function needs implementation');
    res.redirect('/forgot-pass');
  },

  postResetPassword: function(req, res) {
    // TODO: Copy reset password logic from app.js
    req.flash('success_msg', 'Reset password function needs implementation');
    res.redirect('/');
  }
};`;
          break;

        case 'dashboard.controller.js':
          content = `// Dashboard controller
const { db } = require('../database');

module.exports = {
  getDashboard: function(req, res) {
    db.get('SELECT first_name, last_name, email FROM users WHERE id = ?', 
      [req.session.userId], 
      function(err, user) {
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
      }
    );
  },

  getAnalytics: function(req, res) {
    db.get('SELECT first_name, last_name FROM users WHERE id = ?', 
      [req.session.userId], 
      function(err, user) {
        if (err || !user) {
          req.flash('error_msg', 'User not found');
          return res.redirect('/');
        }
        
        res.render('dashboard/analytics', {
          activeShow: 'dashboard',
          activePage: 'analytics',
          userFirstName: user.first_name,
          userLastName: user.last_name
        });
      }
    );
  },

  getOverview: function(req, res) {
    db.get('SELECT first_name, last_name FROM users WHERE id = ?', 
      [req.session.userId], 
      function(err, user) {
        if (err || !user) {
          req.flash('error_msg', 'User not found');
          return res.redirect('/');
        }
        
        res.render('dashboard/overview', {
          activeShow: 'overview',
          activePage: 'overview',
          userFirstName: user.first_name,
          userLastName: user.last_name
        });
      }
    );
  }
};`;
          break;

        case 'leave.controller.js':
          content = `// Leave management controller
const { 
  getAllLeaveTypes,
  getAllHolidays,
  getUpcomingHolidays,
  getHolidaysByYear 
} = require('../database');

module.exports = {
  getLeaveTypes: async function(req, res) {
    try {
      const leaveTypes = await getAllLeaveTypes();
      
      res.render('dashboard/leave_types', {
        activeShow: 'leave_types',
        activePage: 'leave_types',
        leaveTypes: leaveTypes,
        totalLeaveTypes: leaveTypes.length
      });
    } catch (error) {
      console.error('Error fetching leave types:', error);
      req.flash('error_msg', 'Error loading leave types');
      res.redirect('/dashboard');
    }
  },

  getHolidays: async function(req, res) {
    try {
      const [allHolidays, upcomingHolidays] = await Promise.all([
        getAllHolidays(),
        getUpcomingHolidays()
      ]);
      
      res.render('leave_management/holidays', {
        activeShow: 'leave_types',
        activePage: 'holidays',
        holidays: allHolidays,
        upcomingHolidays: upcomingHolidays,
        totalHolidays: allHolidays.length
      });
    } catch (error) {
      console.error('Error fetching holidays:', error);
      req.flash('error_msg', 'Error loading holidays');
      res.redirect('/dashboard');
    }
  }
};`;
          break;

        case 'employee.controller.js':
          content = `// Employee management controller
const { 
  getAllEmployees,
  getEmployeeStatistics 
} = require('../database');

module.exports = {
  getEmployees: async function(req, res) {
    try {
      const [employees, statistics] = await Promise.all([
        getAllEmployees(),
        getEmployeeStatistics()
      ]);
      
      res.render('employees/register', {
        activeShow: 'employees',
        activePage: 'register',
        employees: employees,
        totalEmployees: employees.length,
        statistics: statistics
      });
    } catch (error) {
      console.error('Error fetching employees:', error);
      req.flash('error_msg', 'Error loading employees');
      res.redirect('/dashboard');
    }
  },

  getAddEmployee: function(req, res) {
    res.render('employees/add-employee', {
      activeShow: 'employees',
      activePage: 'add-employee'
    });
  }
};`;
          break;

        case 'app.controller.js':
          content = `// Apps controller (Calendar, Chat, etc.)
const { db } = require('../database');

module.exports = {
  getChat: function(req, res) {
    db.get('SELECT first_name, last_name FROM users WHERE id = ?', 
      [req.session.userId], 
      function(err, user) {
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
      }
    );
  },

  getCalendar: function(req, res) {
    db.get('SELECT first_name, last_name FROM users WHERE id = ?', 
      [req.session.userId], 
      function(err, user) {
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
      }
    );
  }
};`;
          break;

        // Service files
        case 'email.service.js':
          content = `// Email service
const transporter = require('../config/email.config');
const constants = require('../config/constants');

module.exports = {
  sendResetEmail: function(email, resetLink) {
    const mailOptions = {
      from: `"${constants.APP_NAME}" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Password Reset Request',
      text: \`You requested a password reset. Use this link within 1 hour:\\n\\n\${resetLink}\\n\\nIf you didn't request this, please ignore this email.\`,
      html: \`
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2>Password Reset Request</h2>
          <p>Click the link below to reset your password:</p>
          <a href="\${resetLink}">\${resetLink}</a>
          <p>This link expires in 1 hour.</p>
        </div>
      \`
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.error('Email error:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  }
};`;
          break;

        // Default template for other files
        default:
          content = `// ${file}\n// TODO: Add implementation`;
      }
      
      fs.writeFileSync(filePath, content);
      console.log(`   📄 Created: ${folder}/${file}`);
    }
  });
});

// Create new app.js with the new structure
const newAppContent = `// Updated app.js with modular structure
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');

// Import modules
const { initializeDatabase } = require('./database');
const { SESSION_CONFIG } = require('./session');
const routes = require('./routes');

// Import middleware
const flashMiddleware = require('./middleware/flash.middleware');
const { errorHandler, notFoundHandler } = require('./middleware/error.middleware');

// Initialize database
initializeDatabase().then(() => {
  console.log('Database setup completed');
}).catch(err => {
  console.error('Database setup failed:', err);
});

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Session
app.use(session(SESSION_CONFIG));
app.use(flash());

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layouts/main');

// Custom middleware
app.use(flashMiddleware);

// Routes
app.use('/', routes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(\`Server running on http://localhost:\${PORT}\`);
});`;

const newAppPath = path.join(__dirname, 'app-new.js');
if (!fs.existsSync(newAppPath)) {
  fs.writeFileSync(newAppPath, newAppContent);
  console.log('\n📄 Created: app-new.js (new modular app)');
}

console.log('\n✅ Project structure created successfully!');
console.log('\n📋 Next steps:');
console.log('   1. Copy your existing code from app.js into the new controllers');
console.log('   2. Start with auth.controller.js (copy login/register logic)');
console.log('   3. Test using: node app-new.js');
console.log('   4. Keep your original app.js as backup');
console.log('\n🚀 Happy coding!');