# ROOT STRUCTURE
├── 📄 .env                    # Environment variables
├── 📄 .env.example           # Environment template
├── 📄 .gitignore
├── 📄 .eslintrc.js           # Linting configuration
├── 📄 .prettierrc           # Code formatting
├── 📄 package.json
├── 📄 package-lock.json
├── 📄 README.md              # Project documentation
├── 📄 server.js              # Main application entry point
├── 📄 docker-compose.yml     # Container orchestration (optional)
├── 📄 Dockerfile             # Containerization (optional)
│
├── 📂 src/                   # Source code
│   ├── 📄 app.js            # Express app configuration
│   │
│   ├── 📂 config/           # Configuration files
│   │   ├── 📄 constants.js
│   │   ├── 📄 database.js   # Database configuration
│   │   ├── 📄 session.js    # Session configuration
│   │   ├── 📄 passport.js   # Authentication strategies
│   │   ├── 📄 email.js      # Email service configuration
│   │   └── 📄 upload.js     # File upload configuration
│   │
│   ├── 📂 database/         # Database layer
│   │   ├── 📄 connection.js     # DB connection pool
│   │   ├── 📄 migrations/       # Database migrations
│   │   │   ├── 📄 001_create_users_table.js
│   │   │   ├── 📄 002_create_employees_table.js
│   │   │   └── 📄 migration-runner.js
│   │   │
│   │   ├── 📂 schemas/          # Table definitions (optional, can be in migrations)
│   │   │   ├── 📄 user.schema.js
│   │   │   └── 📄 employee.schema.js
│   │   │
│   │   └── 📂 seeds/           # Seed data
│   │       ├── 📄 admin.seed.js
│   │       └── 📄 departments.seed.js
│   │
│   ├── 📂 models/           # Data models/entities
│   │   ├── 📄 User.model.js
│   │   ├── 📄 Employee.model.js
│   │   ├── 📄 Department.model.js
│   │   └── 📄 index.js      # Model exports
│   │
│   ├── 📂 repositories/     # Data access layer
│   │   ├── 📄 BaseRepository.js  # Common CRUD operations
│   │   ├── 📄 UserRepository.js
│   │   ├── 📄 EmployeeRepository.js
│   │   └── 📄 DepartmentRepository.js
│   │
│   ├── 📂 services/         # Business logic layer
│   │   ├── 📄 Auth.service.js
│   │   ├── 📄 Employee.service.js
│   │   ├── 📄 Leave.service.js
│   │   ├── 📄 Email.service.js
│   │   └── 📄 File.service.js
│   │
│   ├── 📂 controllers/      # Request handlers
│   │   ├── 📄 Auth.controller.js
│   │   ├── 📄 Employee.controller.js
│   │   ├── 📄 Leave.controller.js
│   │   ├── 📄 Dashboard.controller.js
│   │   └── 📄 Api.controller.js
│   │
│   ├── 📂 routes/          # Route definitions
│   │   ├── 📄 index.js              # Route aggregator
│   │   ├── 📄 web/                  # Web routes
│   │   │   ├── 📄 auth.routes.js
│   │   │   ├── 📄 employee.routes.js
│   │   │   └── 📄 dashboard.routes.js
│   │   │
│   │   └── 📄 api/                  # API routes (versioned)
│   │       ├── 📄 v1/
│   │       │   ├── 📄 auth.routes.js
│   │       │   └── 📄 employee.routes.js
│   │       └── 📄 v2/               # Future API version
│   │
│   ├── 📂 middleware/       # Custom middleware
│   │   ├── 📄 auth.js              # Authentication middleware
│   │   ├── 📄 validation.js        # Request validation
│   │   ├── 📄 errorHandler.js      # Error handling
│   │   ├── 📄 rateLimiter.js       # Rate limiting
│   │   ├── 📄 logger.js            # Request logging
│   │   └── 📄 upload.js            # File upload handling
│   │
│   ├── 📂 utils/            # Utility functions
│   │   ├── 📄 validators/          # Validation schemas
│   │   │   ├── 📄 employee.validator.js
│   │   │   ├── 📄 auth.validator.js
│   │   │   └── 📄 schemas.js       # Joi/Yup schemas
│   │   │
│   │   ├── 📄 helpers/             # Helper functions
│   │   │   ├── 📄 date.helper.js
│   │   │   ├── 📄 file.helper.js
│   │   │   ├── 📄 string.helper.js
│   │   │   └── 📄 response.helper.js
│   │   │
│   │   ├── 📄 logger.js            # Application logger (Winston/Bunyan)
│   │   └── 📄 constants.js         # Application constants
│   │
│   ├── 📂 lib/              # Third-party integrations
│   │   ├── 📄 email.js      # Email service wrapper
│   │   ├── 📄 sms.js        # SMS service wrapper
│   │   └── 📄 storage.js    # Cloud storage wrapper
│   │
│   └── 📂 types/            # TypeScript type definitions (if using TS)
│       ├── 📄 express.d.ts  # Extended Express types
│       └── 📄 custom.d.ts   # Custom type definitions
│
├── 📂 public/               # Static assets
│   ├── 📂 css/
│   │   ├── 📄 main.css
│   │   ├── 📄 dashboard.css
│   │   └── 📄 auth.css
│   │
│   ├── 📂 js/
│   │   ├── 📄 app.js        # Main frontend JS
│   │   ├── 📄 form-validation.js
│   │   └── 📄 charts.js     # Charting utilities
│   │
│   ├── 📂 images/           # Static images
│   │   ├── 📂 avatars/
│   │   ├── 📂 logos/
│   │   └── 📂 icons/
│   │
│   └── 📂 uploads/          # User uploads (gitignored)
│       ├── 📂 documents/
│       ├── 📂 profiles/
│       └── 📂 temp/
│
├── 📂 views/                # EJS templates
│   ├── 📂 layouts/          # Layout templates
│   │   ├── 📄 main.ejs
│   │   ├── 📄 auth.ejs
│   │   ├── 📄 admin.ejs
│   │   └── 📄 partials/     # Reusable partials
│   │       ├── 📄 header.ejs
│   │       ├── 📄 sidebar.ejs
│   │       └── 📄 footer.ejs
│   │
│   ├── 📂 auth/             # Authentication views
│   │   ├── 📄 login.ejs
│   │   ├── 📄 register.ejs
│   │   └── 📄 forgot-password.ejs
│   │
│   ├── 📂 dashboard/        # Dashboard views
│   │   ├── 📄 overview.ejs
│   │   ├── 📄 analytics.ejs
│   │   └── 📄 reports.ejs
│   │
│   ├── 📂 employees/        # Employee management
│   │   ├── 📄 list.ejs
│   │   ├── 📄 add.ejs
│   │   └── 📄 profile.ejs
│   │
│   ├── 📂 leave/            # Leave management
│   │   ├── 📄 applications.ejs
│   │   ├── 📄 calendar.ejs
│   │   └── 📄 types.ejs
│   │
│   ├── 📂 departments/      # Department management
│   │   ├── 📄 overview.ejs
│   │   └── 📄 structure.ejs
│   │
│   └── 📂 errors/           # Error pages
│       ├── 📄 404.ejs
│       ├── 📄 500.ejs
│       └── 📄 maintenance.ejs
│
├── 📂 tests/                # Test suite
│   ├── 📂 unit/             # Unit tests
│   │   ├── 📄 services/
│   │   │   ├── 📄 auth.service.test.js
│   │   │   └── 📄 employee.service.test.js
│   │   │
│   │   └── 📄 utils/
│   │       └── 📄 validators.test.js
│   │
│   ├── 📂 integration/      # Integration tests
│   │   ├── 📄 auth.test.js
│   │   ├── 📄 employee.test.js
│   │   └── 📄 database.test.js
│   │
│   ├── 📂 e2e/              # End-to-end tests
│   │   ├── 📄 auth.flow.test.js
│   │   └── 📄 employee.flow.test.js
│   │
│   ├── 📄 setup.js          # Test setup
│   ├── 📄 teardown.js       # Test teardown
│   └── 📄 jest.config.js    # Jest configuration
│
├── 📂 docs/                 # Documentation
│   ├── 📄 API.md           # API documentation
│   ├── 📄 ARCHITECTURE.md  # Architecture decisions
│   ├── 📄 DEPLOYMENT.md    # Deployment guide
│   └── 📂 diagrams/        # Architecture diagrams
│
├── 📂 scripts/              # Build/deployment scripts
│   ├── 📄 deploy.sh        # Deployment script
│   ├── 📄 backup-db.sh     # Database backup
│   └── 📄 seed-production.js
│
└── 📂 logs/                # Application logs (gitignored)
    ├── 📄 app.log
    ├── 📄 error.log
    └── 📄 access.log