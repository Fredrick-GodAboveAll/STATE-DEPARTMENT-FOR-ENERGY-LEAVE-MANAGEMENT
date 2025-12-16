leave-management-system/
├── 📄 app.js                    (Main entry point - modular)
├── 📄 package.json              (Dependencies)
├── 📄 database.js              (Database compatibility wrapper)
├── 📄 session.js               (Session configuration)
├── 📄 .env                     (Environment variables)
├── 📄 .gitignore               (Git ignore file)
├── 📄 migrate-database.js      (Database migration script - optional)
│
├── 📂 database/                ⬅️ NEW: MODULAR DATABASE STRUCTURE
│   ├── 📄 index.js             (Main database entry point)
│   ├── 📄 connection.js        (Database connection setup)
│   ├── 📄 migrations.js        (Table creation functions)
│   ├── 📄 seed.js              (Sample data insertion)
│   │
│   ├── 📂 repositories/        ⬅️ NEW: Data access layer
│   │   ├── 📄 UserRepository.js
│   │   ├── 📄 HolidayRepository.js
│   │   ├── 📄 LeaveTypeRepository.js
│   │   ├── 📄 EmployeeRepository.js
│   │   └── 📄 ResetRepository.js
│   │
│   └── 📂 schemas/             ⬅️ NEW: SQL queries organized by model
│       ├── 📄 user.schema.js
│       ├── 📄 holiday.schema.js
│       ├── 📄 leavetype.schema.js
│       ├── 📄 employee.schema.js
│       └── 📄 reset.schema.js
│
├── 📂 config/                  (Configuration files)
│   ├── 📄 constants.js         (App constants)
│   └── 📄 email.config.js      (Email configuration)
│
├── 📂 routes/                  (All route definitions)
│   ├── 📄 index.js             (Main router aggregator)
│   ├── 📄 auth.routes.js       (Authentication routes)
│   ├── 📄 dashboard.routes.js  (Dashboard routes)
│   ├── 📄 leave.routes.js      (Leave management routes)
│   ├── 📄 employee.routes.js   (Employee management routes)
│   ├── 📄 api.routes.js        (API endpoints)
│   └── 📄 app.routes.js        (Calendar, Chat apps)
│
├── 📂 controllers/             (Business logic - COMPLETE)
│   ├── 📄 auth.controller.js   ✅ FIXED (removed last_login issue)
│   ├── 📄 dashboard.controller.js
│   ├── 📄 leave.controller.js
│   ├── 📄 employee.controller.js
│   ├── 📄 api.controller.js
│   └── 📄 app.controller.js
│
├── 📂 middleware/              (Custom middleware)
│   ├── 📄 auth.middleware.js   (Login protection)
│   ├── 📄 flash.middleware.js  (Flash messages)
│   ├── 📄 user.middleware.js   (Attach user info to views)
│   └── 📄 error.middleware.js  (Error handling)
│
├── 📂 services/                (Business services)
│   └── 📄 email.service.js     (Email sending)
│
├── 📂 utils/                   (Helper functions)
│   ├── 📄 validators.js        (Input validation)
│   ├── 📄 dateHelpers.js       (Date utilities)
│   └── 📄 fileHelpers.js       (File operations)
│
├── 📂 public/                  (Static assets - YOUR EXISTING FILES)
│   ├── 📂 css/
│   ├── 📂 js/
│   └── 📂 images/
│
└── 📂 views/                   (EJS templates - YOUR EXISTING STRUCTURE)
    ├── 📂 apps/                (Calendar, Chat)
    │   ├── 📄 calender.ejs
    │   └── 📄 chat.ejs
    │
    ├── 📂 auth/                (Authentication pages)
    │   ├── 📄 login.ejs
    │   ├── 📄 register.ejs
    │   ├── 📄 forgot-password.ejs
    │   ├── 📄 reset-password.ejs
    │   └── 📄 check-mail.ejs
    │
    ├── 📂 dashboard/           (Dashboard pages)
    │   ├── 📄 index.ejs
    │   ├── 📄 analytics.ejs
    │   └── 📄 overview.ejs
    │
    ├── 📂 departments/         (Department management)
    │   ├── 📄 d-overview.ejs
    │   └── 📄 d-structure.ejs
    │
    ├── 📂 employees/           (Employee management)
    │   ├── 📄 add-employee.ejs
    │   └── 📄 register.ejs     (Employee list)
    │
    ├── 📂 layouts/             (Layout templates)
    │   ├── 📄 main.ejs
    │   ├── 📄 auth.ejs
    │   └── 📄 apps_layout.ejs
    │
    ├── 📂 leave_management/    (Leave management)
    │   └── 📄 holidays.ejs
    │
    └── 📂 user/                (User settings)
        ├── 📄 profile.ejs
        └── 📄 settings.ejs