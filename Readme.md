# 🚀 Leave Management System

A modern, **modular Leave Management System** built with **Node.js**, **Express**, and **EJS** templates.  
Designed for HR professionals to efficiently manage employees, leave, departments, and holidays.

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


