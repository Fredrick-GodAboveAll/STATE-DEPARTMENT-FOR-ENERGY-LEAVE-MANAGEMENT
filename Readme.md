leave-management-system/
├── 📄 app.js
├── 📄 package.json
├── 📄 database.js
├── 📄 session.js
├── 📄 .env
├── 📄 .gitignore
│
├── 📂 database/
│   ├── 📄 index.js                    # Main database entry point
│   ├── 📄 connection.js               # Database connection setup
│   ├── 📄 migrations.js               # RENAMED: Migration runner (executes migration files)
│   ├── 📄 seed.js                     # Sample data insertion
│   ├── 📄 schema-manager.js           # NEW: Manages schema creation from schemas/ folder
│   │
│   ├── 📂 repositories/               # Data access layer
│   │   ├── 📄 UserRepository.js
│   │   ├── 📄 HolidayRepository.js
│   │   ├── 📄 LeaveTypeRepository.js
│   │   ├── 📄 EmployeeRepository.js   # WILL UPDATE for new columns
│   │   └── 📄 ResetRepository.js
│   │
│   ├── 📂 schemas/                    # SQL queries organized by model
│   │   ├── 📄 user.schema.js
│   │   ├── 📄 holiday.schema.js
│   │   ├── 📄 leavetype.schema.js
│   │   ├── 📄 employee.schema.js      # UPDATED with date_of_birth & disability
│   │   └── 📄 reset.schema.js
│   │
│   └── 📂 migrations/                 # NEW: Migration files folder
│       ├── 📄 001_create_users_table.js
│       ├── 📄 002_create_holidays_table.js
│       ├── 📄 003_create_leavetypes_table.js
│       ├── 📄 004_create_employees_table.js
│       ├── 📄 005_create_resets_table.js
│       ├── 📄 006_add_employee_columns.js       # NEW: date_of_birth & disability
│       └── 📄 migration-template.js
│
├── 📂 config/
│   ├── 📄 constants.js
│   └── 📄 email.config.js
│
├── 📂 routes/
│   ├── 📄 index.js
│   ├── 📄 auth.routes.js
│   ├── 📄 dashboard.routes.js
│   ├── 📄 leave.routes.js
│   ├── 📄 employee.routes.js          # WILL ADD: POST /employees/add route
│   ├── 📄 api.routes.js
│   └── 📄 app.routes.js
│
├── 📂 controllers/
│   ├── 📄 auth.controller.js
│   ├── 📄 dashboard.controller.js
│   ├── 📄 leave.controller.js
│   ├── 📄 employee.controller.js      # WILL ADD: addEmployee function
│   ├── 📄 api.controller.js
│   └── 📄 app.controller.js
│
├── 📂 middleware/
│   ├── 📄 auth.middleware.js
│   ├── 📄 flash.middleware.js
│   ├── 📄 user.middleware.js
│   └── 📄 error.middleware.js
│
├── 📂 services/
│   └── 📄 email.service.js
│
├── 📂 utils/
│   ├── 📄 validators.js               # WILL ADD: employee validation
│   ├── 📄 dateHelpers.js              # WILL UPDATE: date calculations
│   └── 📄 fileHelpers.js
│
├── 📂 public/
│   ├── 📂 css/
│   ├── 📂 js/                         # WILL ADD: employee-form.js for AJAX
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
        └── 📄 leave_bulk.ejs
    │   └── 📄 leave_limits.ejs

    │
    └── 📂 user/                (User settings)
        ├── 📄 profile.ejs
        └── 📄 settings.
        

[![Node.js](https://img.shields.io/badge/Node.js-16.x-green)](https://nodejs.org/) 
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/Fredrick-GodAboveAll/STATE-DEPARTMENT-FOR-ENERGY-LEAVE-MANAGEMENT)](https://github.com/Fredrick-GodAboveAll/STATE-DEPARTMENT-FOR-ENERGY-LEAVE-MANAGEMENT/issues)

---

## 🌟 Features

- 🔐 **Authentication**: Login, registration, password reset  
- 📊 **Dashboard**: Analytics, leave summaries, department overviews  
- 🗓️ **Leave Management**: Apply, approve, track employee leave  
- 👥 **Employee Management**: Add, edit, view employee details  
- 🏖️ **Holiday Management**: Track gazetted holidays, leave calculations  
- 📧 **Email Notifications**: Automatic alerts for leave and password resets  
- ⚙️ **Custom Middleware**: Auth protection, flash messages, error handling  
- 🧰 **Helper Utilities**: Validation, date helpers, file operations  

---

## 📁 Project Structure
leave-management-system/
├── app.js # Main entry point
├── package.json # Dependencies
├── database.js # Database wrapper
├── session.js # Session config
├── .env # Environment variables (ignored)
├── .gitignore # Git ignore file
├── migrate-database.js # Optional migration script
├── config/ # Configuration files
├── routes/ # Route definitions
├── controllers/ # Business logic
├── middleware/ # Custom middleware
├── services/ # Business services
├── utils/ # Helper functions
├── public/ # CSS, JS, images
└── views/ # EJS templates


---

## ⚙️ Installation

1. **Clone the repository**  
```bash
git clone https://github.com/Fredrick-GodAboveAll/STATE-DEPARTMENT-FOR-ENERGY-LEAVE-MANAGEMENT.git
cd leave-management-system
npm install

# Example
DB_HOST=localhost
DB_USER=root
DB_PASS=password
SESSION_SECRET=your_secret_here
GOOGLE_CLIENT_ID=your_id_here
GOOGLE_CLIENT_SECRET=your_secret_here

node app.js

🛠 Tech Stack

Backend: Node.js, Express.js

Frontend: EJS, Bootstrap 5

Database: MySQL / SQLite (configurable via database.js)

Utilities: Custom middleware, helpers, email services

📸 Screenshots / Demo

Add images or GIFs of your dashboard, leave management pages, employee views here.

⚠️ Notes

Modular database structure for maintainability

All sensitive data (like .env) is not tracked in Git

.env.example provided as reference for required variables

📄 License

MIT License © 2025 Fredrick Muasya


        