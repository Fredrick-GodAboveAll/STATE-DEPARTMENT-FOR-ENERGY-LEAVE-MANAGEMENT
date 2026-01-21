# Staff Table Update - Quick Reference Guide

## What Changed?

### New Database Columns
1. **`date_of_birth`** - Auto-calculates age (format: YYYY-MM-DD or DD/MM/YYYY)
2. **`disability`** - New field (values: 0 or 4 only)

### Updated Defaults
- **`retirement_date`** → Defaults to 'NA' (was NULL)
- **`department_id`** → Defaults to 'NA' for bulk uploads (was NULL)

### Enhanced Validations
- **`gender`** → Must be M or F (strict validation)
- **`age`** → Must be 18-120 (auto-calculated from date_of_birth if not provided)
- **`disability`** → Only 0 or 4 allowed

---

## CSV Upload Template

### Download Template
Go to: **Employees → Bulk Upload → Download Template**

### Example Valid Row:
```csv
19337,MR JULIUS ODHIAMBO MBOGAH,11684,M,,Deputy Director HRM,R,0 - Active,,Permanent,1961-05-12,0,
```
*Note: Age left empty - will auto-calculate to 63 from DOB*

### Column Order (13 Required):
1. payroll_number (numeric, unique)
2. full_name (required)
3. id_number (numeric, unique)
4. gender (M or F)
5. age (18-120, auto-calculated if blank)
6. designation (required)
7. job_group (optional)
8. status (e.g., "0 - Active")
9. retirement_date (DD/MM/YYYY, defaults to NA)
10. employment_status (e.g., "Permanent")
11. date_of_birth (YYYY-MM-DD or DD/MM/YYYY)
12. disability (0 or 4)
13. department_id (leave blank for NA)

---

## Validation Rules

| Field | Valid Values | Error Message |
|-------|-------------|---------------|
| gender | M, F | "gender must be M or F" |
| age | 18-120 | "age must be a number between 18 and 120" |
| disability | 0, 4 | "disability must be 0 or 4" |
| payroll_number | numeric | "payroll_number must be numeric" |
| id_number | numeric | "id_number must be numeric" |
| date_of_birth | YYYY-MM-DD or DD/MM/YYYY | "Invalid date_of_birth format" |

---

## Working with Departments

### Bulk Upload Behavior
- Department_id automatically set to **NA** during bulk upload
- No departments assigned initially
- Use: **Employees → Assign Departments** to assign later

### Assign Departments After Upload
1. Go to: **Employees → Assign Departments**
2. Select department from dropdown
3. Select employees to assign
4. Click "Assign"
5. Register view will show department name

---

## Register View Display

### Table Columns (14 Total):
1. Checkbox
2. Payroll Number
3. Full Name
4. ID Number
5. Gender (badge: Male/Female)
6. Age (number)
7. Designation
8. Job Group (badge)
9. Status (badge with icon)
10. Retirement Date (text: shows NA if not set)
11. Employment Status (badge)
12. Department (badge: shows NA if not assigned)
13. Disability (badge: "No Disability"/"With Disability"/-)
14. Actions (View/Edit/Delete)

### Department Display
- **Assigned:** Shows department name in blue badge
- **Unassigned:** Shows "NA" in orange badge

### Disability Display
- **Value 0:** "No Disability" (green badge)
- **Value 4:** "With Disability" (blue badge)
- **Not set:** "-" (gray badge)

---

## Database Queries

### Get All Employees with Department
```sql
SELECT e.*, d.name as department_name 
FROM employees e 
LEFT JOIN departments d ON e.department_id = d.id 
ORDER BY e.full_name
```

### Get Unassigned Employees
```sql
SELECT * FROM employees WHERE department_id IS NULL ORDER BY full_name
```

### Get Employees by Department
```sql
SELECT e.*, d.name as department_name 
FROM employees e 
LEFT JOIN departments d ON e.department_id = d.id 
WHERE e.department_id = ? 
ORDER BY e.full_name
```

---

## Common Bulk Upload Errors

| Error | Cause | Fix |
|-------|-------|-----|
| "gender must be M or F" | Gender not M or F | Use M or F exactly |
| "age must be a number between 18 and 120" | Age outside range or non-numeric | Provide age 18-120 or leave blank to auto-calculate from DOB |
| "disability must be 0 or 4" | Disability has wrong value | Use 0 or 4, or leave blank |
| "Duplicate payroll number" | Payroll already exists | Check payroll numbers are unique |
| "Duplicate ID number" | ID number already exists | Check ID numbers are unique |
| "Invalid date_of_birth" | Date format incorrect | Use YYYY-MM-DD or DD/MM/YYYY |

---

## Code Implementation Details

### Auto-Calculate Age from DOB
```javascript
// In controller or repository
const empSchema = require('../database/schemas').employee;
const age = empSchema.calculateAgeFromDOB('1961-05-12'); // Returns 63
```

### Validate Disability
```javascript
const empSchema = require('../database/schemas').employee;
if (!empSchema.validateDisability(4)) {
  throw new Error('Invalid disability value');
}
```

### Create Employee with Auto-Age
```javascript
const employee = await db.employees.create({
  payroll_number: '19337',
  full_name: 'JULIUS ODHIAMBO',
  id_number: '11684',
  gender: 'M',
  // age omitted - will be auto-calculated
  date_of_birth: '1961-05-12',
  designation: 'Deputy Director',
  retirement_date: 'NA', // Auto-set if omitted
  department_id: 'NA' // Auto-set if omitted
});
```

---

## Migration/Update Steps

### To Apply Changes:

```bash
# 1. Backup database
cp database.db database.db.backup

# 2. Run migration
npm run migrate
# or
node database/migrate.js

# 3. Verify success
sqlite3 database.db "PRAGMA table_info(employees);"

# 4. Restart application
npm start
```

---

## Endpoints Affected

### API Endpoints
- `POST /api/employees` - Create employee (updated parameters)
- `PUT /api/employees/:id` - Update employee (updated parameters)
- `POST /api/employees/bulk-upload` - Bulk upload (new CSV format)
- `GET /api/employees/template` - Download CSV template (updated columns)

### View Endpoints
- `GET /register` - Employee list (new column order)
- `GET /employee-departments` - Department assignment (works with new defaults)

---

## Database Constraints Applied

All constraints are enforced at database level:

```sql
CHECK(gender IN ('M', 'F'))
CHECK(age >= 18 AND age <= 120)
CHECK(disability IN (0, 4))
UNIQUE(payroll_number)
UNIQUE(id_number)
DEFAULT 'NA' FOR retirement_date
DEFAULT 'NA' FOR department_id
FOREIGN KEY(department_id) REFERENCES departments(id) ON DELETE SET NULL
```

---

## Backward Compatibility Notes

- ✅ Existing employees not affected
- ✅ New columns optional for existing records
- ✅ age auto-calculated from existing date_of_birth if available
- ✅ retirement_date defaults to 'NA' for records without values
- ✅ department_id remains NULL/NA until assigned
- ⚠️ API clients must handle new columns in responses

---

## Questions?

### How is age auto-calculated?
From date_of_birth. If date_of_birth is provided but age is not, age is automatically calculated. The calculated age must be 18-120.

### Can I leave age blank?
Yes, only if you provide date_of_birth. Otherwise age is required.

### What does disability value mean?
- **0** = No disability
- **4** = With disability
- **Empty/NULL** = Not specified

### How do I assign departments after bulk upload?
Use: **Employees → Assign Departments** menu option. Select department and employees, then assign.

### What if I upload with department_id specified?
If department_id is a valid department ID in your system, it will be assigned. If blank or 'NA', defaults to 'NA'.

---

**Last Updated:** January 21, 2026
**Version:** 1.0
