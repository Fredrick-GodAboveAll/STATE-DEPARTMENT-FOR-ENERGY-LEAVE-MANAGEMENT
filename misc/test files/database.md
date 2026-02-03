leave-management-system/
├── 📂 database/                  # Database module
│   ├── 📄 index.js              # Main entry point
│   ├── 📄 connection.js         # DB connection setup
│   ├── 📄 migrations.js         # Table creation
│   ├── 📄 seed.js              # Sample data insertion
│   │
│   ├── 📂 repositories/         # Data access layer
│   │   ├── 📄 UserRepository.js
│   │   ├── 📄 HolidayRepository.js
│   │   ├── 📄 LeaveTypeRepository.js
│   │   ├── 📄 EmployeeRepository.js
│   │   └── 📄 ResetRepository.js
│   │
│   └── 📂 schemas/              # SQL queries & table definitions
│       ├── 📄 user.schema.js
│       ├── 📄 holiday.schema.js
│       ├── 📄 leavetype.schema.js
│       ├── 📄 employee.schema.js
│       └── 📄 reset.schema.js