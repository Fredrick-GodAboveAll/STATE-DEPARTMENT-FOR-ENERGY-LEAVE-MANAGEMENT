# State Department for Energy – Leave Management System

[![Node.js](https://img.shields.io/badge/Node.js-16.x-green)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/Fredrick-GodAboveAll/STATE-DEPARTMENT-FOR-ENERGY-LEAVE-MANAGEMENT)](issues)

A modular, secure, and scalable **Leave Management System** designed for public sector HR operations.  
Built with Node.js and Express, the system supports employee records, leave processing, holidays, analytics, and email notifications.

---

## ✨ Features

- 🔐 Authentication (Login, Register, Password Reset)
- 👥 Employee & Department Management
- 🗓 Leave Application, Approval & Tracking
- 🎉 Gazetted Holiday Management
- 📊 Dashboard Analytics & Summaries
- 📧 Email Notifications
- ⚙️ Custom Middleware (Auth, Errors, Flash Messages)
- 🧰 Utility Helpers (Validation, Dates, Files)

---

## 🏗 Architecture Overview

This project follows a **clean, layered architecture** inspired by MVC principles:

- **Routes** – Define application endpoints
- **Controllers** – Handle business logic
- **Repositories** – Database access layer
- **Schemas & Migrations** – Database structure and versioning
- **Middleware** – Authentication and request handling
- **Views (EJS)** – Server-rendered UI templates

This structure promotes maintainability, scalability, and clarity.

---

## 📁 Project Structure

```text
leave-management-system/
├── app.js
├── package.json
├── session.js
├── database.js
├── .env.example
├── .gitignore
│
├── config/
│   ├── constants.js
│   └── email.config.js
│
├── database/
│   ├── connection.js
│   ├── index.js
│   ├── migrations.js
│   ├── seed.js
│   │
│   ├── migrations/
│   │   ├── 001_users.js
│   │   ├── 002_holidays.js
│   │   ├── 003_leave_types.js
│   │   ├── 004_employees.js
│   │   └── 005_password_resets.js
│   │
│   ├── repositories/
│   │   ├── UserRepository.js
│   │   ├── EmployeeRepository.js
│   │   ├── LeaveTypeRepository.js
│   │   ├── HolidayRepository.js
│   │   └── ResetRepository.js
│   │
│   └── schemas/
│       ├── user.schema.js
│       ├── employee.schema.js
│       ├── leavetype.schema.js
│       ├── holiday.schema.js
│       └── reset.schema.js
│
├── routes/
│   ├── index.js
│   ├── auth.routes.js
│   ├── dashboard.routes.js
│   ├── employee.routes.js
│   ├── leave.routes.js
│   └── api.routes.js
│
├── controllers/
│   ├── auth.controller.js
│   ├── dashboard.controller.js
│   ├── employee.controller.js
│   ├── leave.controller.js
│   └── api.controller.js
│
├── middleware/
│   ├── auth.middleware.js
│   ├── user.middleware.js
│   ├── flash.middleware.js
│   └── error.middleware.js
│
├── services/
│   └── email.service.js
│
├── utils/
│   ├── validators.js
│   ├── dateHelpers.js
│   └── fileHelpers.js
│
├── public/
│   ├── css/
│   ├── js/
│   └── images/
│
└── views/
    ├── layouts/
    ├── auth/
    ├── dashboard/
    ├── employees/
    ├── departments/
    ├── leave_management/
    ├── apps/
    └── user/
