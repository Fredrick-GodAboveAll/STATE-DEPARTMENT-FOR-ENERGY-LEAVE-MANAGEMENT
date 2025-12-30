# Project Structure — leave-management

This document summarizes the repository layout, key files, and recommended next steps after recent changes (move of `leave_types` UI and adding `carry_forward_days`). It’s intended to be a quick reference for contributors and to help you plan follow-up work.

---

## Full project tree (generated) 🌳
```text
leave-management/
├── .env
├── .env.example
├── .git/
├── .gitignore
├── add.staff.txt
├── app.js
├── auth.db
├── database.js
├── debug-exports.js
├── dp.js
├── employee.csv
├── holiday.csv
├── leavetypes.csv
├── leave_management@1.0.0
├── migration-template.js/
├── new.html
├── node
├── node_modules/
├── npm
├── package-lock.json
├── package.json
├── public/
├── Readme.md
├── routes/
│   ├── api.routes.js
│   ├── app.routes.js
│   ├── auth.routes.js
│   ├── dashboard.routes.js
│   ├── departments.routes.js
│   ├── employee.routes.js
│   ├── holidaysRoutes.js
│   └── leave.routes.js
├── services/
│   └── email.service.js
├── session.js
├── structure.md
├── test files/
│   ├── check-repositories.js
│   ├── database.md
│   ├── myoh.js
│   ├── realdb.js
│   ├── setup-project.js
│   ├── test-database.js
│   └── verify-structure.js
├── test_routes.js
├── uploads/
│   ├── 4ac0891f0d20eb5b8c74f3f71c3578eb/
│   └── cf1def80ea75c0faa7ed5026c8e10344/
├── utils/
│   └── validators.js
├── views/
│   ├── apps/
│   │   ├── calender.ejs
│   │   └── chat.ejs
│   ├── auth/
│   │   ├── check-mail.ejs
│   │   ├── forgot-password.ejs
│   │   ├── login.ejs
│   │   ├── register.ejs
│   │   └── reset-password.ejs
│   ├── dashboard/
│   │   ├── analytics.ejs
│   │   ├── index.ejs
│   │   └── leave_types.ejs (stale copy)
│   ├── departments/
│   │   ├── d-overview.ejs
│   │   └── d-structure.ejs
│   ├── employees/
│   │   ├── add-employee.ejs
│   │   ├── employee-bulk.ejs
│   │   └── register.ejs
│   ├── error/
│   │   ├── 404.ejs
│   │   └── 500.ejs
│   ├── layouts/
│   │   ├── apps_layout.ejs
│   │   ├── auth.ejs
│   │   └── main.ejs
│   ├── leave_management/
│   │   ├── holidays.ejs
│   │   ├── leave_applications.ejs
│   │   ├── leave_bulk.ejs
│   │   ├── leave_limits.ejs
│   │   └── leave_types.ejs
│   └── user/
│       ├── profile.ejs
│       ├── settings.ejs
│       └── use.html
├── controllers/
│   ├── api.controller.js
│   ├── app.controller.js
│   ├── auth.controller.js
│   ├── dashboard.controller.js
│   ├── department.controller.js
│   ├── employee.controller.js
│   ├── holidaysController.js
│   └── leave.controller.js
└── database/
    ├── check-after-first-migration.js
    ├── check-final-results.js
    ├── check-tables-simple.js
    ├── cleanup-duplicate.js
    ├── connection.js
    ├── final-verification.js
    ├── index.js
    ├── migrate.js
    ├── migrations.js
    ├── migrate.js
    ├── rename-migrations.js
    ├── seed.js
    ├── simple-migrate.js
    ├── test-db-info.js
    ├── test-fresh-db.js
    ├── test-migration-file.js
    ├── test-runner-basic.js
    ├── schemas/
    │   ├── department.schema.js
    │   ├── employee.schema.js
    │   ├── holiday.schema.js
    │   ├── index.js
    │   ├── leavetype.schema.js
    │   └── reset.schema.js
    ├── repositories/
    │   ├── DepartmentRepository.js
    │   ├── EmployeeRepository.js
    │   ├── HolidayRepository.js
{
## Quick facts ✅
- Main entry: `app.js` (start with `npm start` / `node app.js`).
- Database: SQLite (via `sqlite3`) with a migrations runner at `database/migrations.js`.
- Templating: EJS views located in `views/` (moved Leave Types into `views/leave_management`).

---

## Top-level layout

- `app.js` — Application entry point
- `package.json` — Dependencies & `start` script (`node app.js`)
- `database.js` — DB wrapper and bootstrapping
- `session.js` — Session setup
- `Readme.md` — Project README (project overview & running notes)
- `.env` (not checked in) — env vars

Directories
- `config/` — configuration (e.g. `constants.js`, `email.config.js`)
- `controllers/` — controllers for routes and API logic (e.g. `leave.controller.js`)
- `routes/` — route definitions (e.g. `leave.routes.js`, `api.routes.js`)
- `database/` — DB layer, migrations, repositories, schema files
  - `migrations/` — migration files (e.g. `003_create_leavetypes_table.js`, `009_add_carry_forward_days_to_leavetypes.js`)
  - `repositories/` — data access layer (e.g. `LeaveTypeRepository.js`)
  - `schemas/` — model SQL (e.g. `leavetype.schema.js`)
  - `migrations.js` — migration runner
- `views/` — EJS view templates
  - `leave_management/` — leave pages: `leave_types.ejs`, `leave_limits.ejs`, `leave_bulk.ejs`, `leave_applications.ejs`
  - `dashboard/`, `employees/`, `auth/`, etc.
- `public/` — static assets
- `utils/` — helpers and validators
- `test files/` — test helpers and scripts (e.g. `realdb.js`)

---

## Leave Management (recent changes)
- UI moved to: `views/leave_management/leave_types.ejs` (was formerly under `views/dashboard/`)
- Controller: `controllers/leave.controller.js` — renders the page and exposes API endpoints for create/read/update/delete
- Repository: `database/repositories/LeaveTypeRepository.js` — DB access for leave_types
- Schema: `database/schemas/leavetype.schema.js` — SQL queries and table column list
- Seed: `database/seed.js` — initial seed rows updated to include `carry_forward_days`
- Migrations:
  - `database/migrations/003_create_leavetypes_table.js` — updated to include `carry_forward_days INTEGER` (ensures fresh DBs include column)
  - `database/migrations/009_add_carry_forward_days_to_leavetypes.js` — present and safe for older DBs (idempotent ALTER TABLE)
- Views/UI changes done for: displaying `carry_forward_days`, adding inputs to Add/Edit modals, and CSV export/import instructions (bulk page updated to mention `carry_forward_days` column)

---

## Important files to inspect / update after recent work
- `database/migrations/003_create_leavetypes_table.js` — updated to include `carry_forward_days` (already edited)
- `database/migrations/009_add_carry_forward_days_to_leavetypes.js` — keeps backward compatibility for existing DBs
- `database/schemas/leavetype.schema.js` — check that `INSERT` and `UPDATE` statements include `carry_forward_days`
- `database/seed.js` — ensure seeded rows have `carry_forward_days` column values (or `null`)
- `database/repositories/LeaveTypeRepository.js` — verify `create()` and `update()` accept and persist `carry_forward_days`
- `views/leave_management/leave_types.ejs` — ensure table header, rows, add/edit modal fields, and client-side JS (form submissions and export) include `carry_forward_days`
- `test files/realdb.js` — must be updated to reflect the CREATE TABLE and queries for `carry_forward_days` (unit/integration tests depend on this)

---

## How to run migrations
- Show status: `node database/migrate.js status`
- Run pending migrations: `node database/migrate.js up`
- Alternative (direct call):
  - `node -e "require('./database/migrations').createTables()"`

---

## Suggested next steps / checklist ✅
- Update test helper: add `carry_forward_days` to `test files/realdb.js` (CREATE / INSERT / UPDATE queries). 🎯
- Confirm `leavetype.schema.js` and `LeaveTypeRepository.js` fully include `carry_forward_days` for all operations. 🔍
- Add automated tests:
  - Unit tests for the repository & controller logic around carry forward.
  - E2E/Integration test for the Leave Types page (create/edit/export/import). Consider Playwright or Cypress.
- Add CI workflow (GitHub Actions) to run lint, run migration, and run tests in PRs. 🤖
- Add small migration test that runs `node database/migrate.js up` on a temporary DB and inspects schema.
- Clean up duplicates: verify only one copy of `leave_types.ejs` exists (moved file in `views/dashboard/` may still be present) and remove the stale one to avoid confusion.
- Document the CSV template columns in `Readme.md` or a dedicated doc and keep the download template endpoint in sync.

---

## Quick recommendations (UX & robustness)
- Server-side input validation for `carry_forward_days` to ensure numeric and non-negative values.
- Clear UI indication for `N/A` vs `0 days` vs blank to avoid user confusion.
- Logging around bulk uploads (store each bulk-row error) and show an upload summary to the user.
- Add a small smoke-test script (node or curl) that calls `/health`, `/leave_types`, and `/leave_limits` to confirm the critical endpoints. ✅

---

If you want, I can:
- Update `test files/realdb.js` to include `carry_forward_days` now, and add a CI action to run migrations + tests; or
- Create a short `STRUCTURE.md` in `docs/` for more detailed onboarding guidance.

Would you like me to apply the `realdb.js` update and add a migration test next? 🔧
