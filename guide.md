# Guide: Link Departments → Employees (View by Department)

Purpose
- Provide a minimal, safe, and reviewable plan to add a "View Employees" button on department rows that opens the Employees register page (`views/employees/register.ejs`) showing employees filtered by that department.

Recommended approach (preferred)
- Use a RESTful route: **GET /departments/:id/employees**
  - Rationale: clear semantics, bookmarkable URL, simpler access control and server-side handling.

Files to update (where and what to change)
1. views/departments/d-structure.ejs or d-overview.ejs
   - Add a button/link in the department row to open the employees list for that department.
   - Example snippet (EJS):

```html
<!-- Inside department row (replace <%= dept.id %> and <%= dept.name %> appropriately) -->
<a href="/departments/<%= dept.id %>/employees" class="btn btn-sm btn-primary" title="View employees">
  View Employees
</a>
```

2. routes/departments.routes.js
   - Add route to serve employees by department.

```js
// routes/departments.routes.js
router.get('/departments/:id/employees', departmentController.viewEmployees);
```

3. controllers/department.controller.js (or controllers/employee.controller.js)
   - Add a handler `viewEmployees(req, res)` that:
     - Validates department exists,
     - Uses repository method to fetch employees by department,
     - Renders `employees/register.ejs` with context: `employees`, `department` and optional `filter` metadata.

```js
// controllers/department.controller.js
const { db } = require('../database');

exports.viewEmployees = async function(req, res) {
  const deptId = req.params.id;

  // Basic validation
  const department = await db.departments.findById(deptId);
  if (!department) {
    req.flash('error_msg', 'Department not found');
    return res.redirect('/departments');
  }

  // Fetch employees for department
  const employees = await db.employees.findByDepartment(deptId);

  res.render('employees/register', {
    activePage: 'employees',
    employees,
    department
  });
};
```

4. database/repositories/EmployeeRepository.js
   - Add a method to fetch employees by department:

```js
// SELECT employees by department id
findByDepartment: `SELECT * FROM employees WHERE department_id = ? ORDER BY full_name`,
```

5. views/employees/register.ejs
   - Detect presence of `department` in locals and display a header / breadcrumb and a filter badge.
   - Example display change:

```ejs
<% if (typeof department !== 'undefined' && department) { %>
  <h4>Employees in <%= department.name %></h4>
  <a href="/departments" class="btn btn-link">← Back to Departments</a>
<% } else { %>
  <h4>All employees</h4>
<% } %>
```

Tests & validation (suggested)
- Manual test via browser: Click button on department row and confirm the page lists only employees in that department.
- Curl smoke test:

```bash
curl -i http://localhost:3000/departments/1/employees
```

- Unit / integration tests:
  - Controller test that `viewEmployees` renders `employees/register` with expected data (mock `db` repository).
  - Route test: request to `/departments/:id/employees` returns 200 and contains employee full names.

Security & edge cases
- Validate `deptId` exists and handle not-found (redirect with message).
- Apply auth checks if needed (e.g., only authorized users can view employees).
- If using query params alternative, sanitize params.

Alternative: Query parameter
- Instead of REST route, use: `/employees?department_id=123`.
- Pros: simpler server change if existing `/employees` already accepts filters.
- Cons: less RESTful, less clear bookmarking semantics and may require modifying `employee.controller` logic.

No schema changes required
- This change only adds routes and read path; no DB schema migrations necessary.

Rollback
- Revert the commit or branch if review finds issues. No data migration or irreversible changes occur.

Implementation notes
- Keep changes minimal and testable. Add small unit tests for `viewEmployees` and a route integration test.
- If you prefer the query-parameter approach I can provide the alternate code snippets.

---

If you approve this guide, I will implement the changes in a new branch and add tests; otherwise tell me any adjustments and I’ll update the guide. 