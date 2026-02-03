# Staff/Employees Table Update - Implementation Summary

## Overview
This document details all changes made to update the staff/employees table structure with proper validations, auto-calculations, and handling of bulk uploads according to the specified requirements.

---

## Changes Made

### 1. Database Migration (NEW)
**File:** `database/migrations/012_restructure_employees_table.js`

This migration adds and configures the new columns:
- ✅ Adds `disability` column with CHECK constraint (only 0 or 4 allowed)
- ✅ Adds `date_of_birth` column for age auto-calculation
- ✅ Sets `retirement_date` default to 'NA' for existing records
- ✅ Sets `department_id` to NULL/NA for records without assignment
- ✅ Validates age constraints (18-120)
- ✅ Enforces gender validation (M/F only)

**To run this migration:**
```bash
npm run migrate
# or
node database/migrate.js
```

---

### 2. Database Schema Updates
**File:** `database/schemas/employee.schema.js`

**Changes:**
- Updated `CREATE_TABLE` with new column order and constraints
- Modified `INSERT_EMPLOYEE` query to include 13 parameters:
  1. payroll_number
  2. full_name
  3. id_number
  4. gender
  5. age
  6. designation
  7. job_group
  8. status
  9. retirement_date (defaults to 'NA')
  10. employment_status
  11. date_of_birth
  12. disability (0 or 4 only)
  13. department_id (defaults to 'NA')

- Updated `UPDATE_EMPLOYEE` query with all new columns
- Added validation helper functions:
  - `validateGender()` - Ensures M or F only
  - `validateAge()` - Ensures 18-120 range
  - `validateDisability()` - Ensures 0 or 4 only
  - `calculateAgeFromDOB()` - Auto-calculates age from date of birth
  - `formatDateToISO()` - Converts date formats to ISO standard

---

### 3. Employee Repository Updates
**File:** `database/repositories/EmployeeRepository.js`

**Changes:**
- Updated `create()` method:
  - Now handles 13 parameters including `date_of_birth` and `disability`
  - Auto-calculates age from `date_of_birth` if age not provided
  - Sets `retirement_date` to 'NA' if not provided
  - Sets `department_id` to 'NA' for bulk uploads by default

- Updated `update()` method:
  - Same parameter handling as `create()`
  - Auto-calculates age from DOB if needed

- Updated `bulkInsert()` method:
  - Processes all new fields
  - Auto-calculates age from DOB for batch operations
  - Sets defaults for retirement_date and department_id

---

### 4. Employee Controller Updates
**File:** `controllers/employee.controller.js`

**Bulk Upload Validation Enhancements:**
- Added validation for `date_of_birth`:
  - Accepts formats: YYYY-MM-DD or DD/MM/YYYY
  - Auto-calculates age if not provided
  - Validates resulting age is 18-120

- Added validation for `disability`:
  - Only accepts values 0 or 4
  - Rejects other values with clear error message
  - Optional field (can be omitted)

- Updated CSV template download:
  - New template includes all 13 columns
  - Provides example data with proper formats
  - Includes comprehensive instructions
  - Lists available department IDs with names and codes

- Updated CSV parsing logic:
  - Now processes 13 columns (was 11)
  - Column order: payroll_number, full_name, id_number, gender, age, designation, job_group, status, retirement_date, employment_status, date_of_birth, disability, department_id

- Enhanced `department_id` handling:
  - **Defaults to 'NA'** for bulk uploads
  - Optional to specify in CSV
  - Validates department exists if provided
  - Allows users to assign departments later via the department assignment feature

---

### 5. Frontend View Updates
**File:** `views/employees/register.ejs`

**Table Structure Changes:**
- Updated table header with new column order:
  1. Checkbox (select)
  2. Payroll Number
  3. Full Name
  4. ID Number
  5. Gender
  6. Age
  7. Designation
  8. Job Group
  9. Status
  10. Retirement Date
  11. Employment Status
  12. Department
  13. Disability
  14. Actions

- Updated table body rendering:
  - Displays all 14 columns with proper formatting
  - Department shows as 'NA' badge if not assigned
  - Disability displays as:
    - "No Disability" (green badge) for value 0
    - "With Disability" (blue badge) for value 4
    - "-" (gray badge) if not specified

- Updated colspan for empty state message from 13 to 14

---

## Validation Rules Summary

### Gender
- ✅ **Rule:** Must be 'M' or 'F' (case-insensitive)
- ✅ **Error:** "gender must be M or F"
- ✅ **Database Constraint:** CHECK(gender IN ('M', 'F'))

### Age
- ✅ **Rule:** Must be integer between 18 and 120
- ✅ **Auto-Calculate:** Calculated from `date_of_birth` if not provided
- ✅ **Error:** "age must be a number between 18 and 120"
- ✅ **Database Constraint:** CHECK(age >= 18 AND age <= 120)

### Date of Birth
- ✅ **Format:** YYYY-MM-DD or DD/MM/YYYY
- ✅ **Usage:** Auto-calculates age if age field is empty
- ✅ **Validation:** Resulting age must be valid (18-120)

### Disability
- ✅ **Rule:** Only 0 or 4 allowed
- ✅ **Meaning:** 0 = No disability, 4 = With disability
- ✅ **Error:** "disability must be 0 or 4"
- ✅ **Database Constraint:** CHECK(disability IN (0, 4))
- ✅ **Optional:** Can be omitted/NULL

### Retirement Date
- ✅ **Default:** 'NA' (if not provided or empty)
- ✅ **Format:** DD/MM/YYYY (stored as YYYY-MM-DD)
- ✅ **Display:** Shows as-is in register view

### Department ID
- ✅ **Default:** 'NA' for bulk uploads
- ✅ **Handling:** Can be assigned later via department assignment feature
- ✅ **Validation:** If provided, must be valid department ID
- ✅ **Display:** Shows 'NA' in badge if not assigned

### Payroll Number & ID Number
- ✅ **Type:** Must be numeric
- ✅ **Unique:** UNIQUE constraints enforced
- ✅ **Error:** "Duplicate payroll number" or "Duplicate ID number"

---

## CSV Template Format

### Required Columns:
- payroll_number
- full_name
- id_number
- gender

### Optional Columns:
- age (auto-calculated from date_of_birth if omitted)
- designation (required for valid employee)
- job_group
- status (defaults to "0 - Active")
- retirement_date (defaults to "NA")
- employment_status (defaults to "Permanent")
- date_of_birth (YYYY-MM-DD or DD/MM/YYYY)
- disability (0 or 4)
- department_id (defaults to "NA")

### Example CSV Row:
```csv
19337,MR JULIUS ODHIAMBO MBOGAH,11684,M,63,Deputy Director - HRM & Development,R,0 - Active,04/11/2026,Permanent,1961-05-12,0,
```

---

## Database Column Order (New Structure)

```
Column Position | Column Name        | Type              | Constraints
1               | id                 | INTEGER           | PRIMARY KEY, AUTOINCREMENT
2               | payroll_number     | TEXT              | UNIQUE NOT NULL
3               | full_name          | TEXT              | NOT NULL
4               | id_number          | TEXT              | UNIQUE NOT NULL
5               | gender             | TEXT              | CHECK(gender IN ('M', 'F'))
6               | age                | INTEGER           | CHECK(age >= 18 AND age <= 120)
7               | designation        | TEXT              | NOT NULL
8               | job_group          | TEXT              | -
9               | status             | TEXT              | -
10              | retirement_date    | TEXT              | DEFAULT 'NA'
11              | employment_status  | TEXT              | -
12              | date_of_birth      | TEXT              | -
13              | disability         | INTEGER           | CHECK(disability IN (0, 4))
14              | department_id      | TEXT/INTEGER      | DEFAULT 'NA', FK → departments(id)
15              | created_at         | DATETIME          | DEFAULT CURRENT_TIMESTAMP
16              | updated_at         | DATETIME          | DEFAULT CURRENT_TIMESTAMP
```

---

## Node.js Version Compatibility

✅ **Node.js v22.22 Compatible**

All code uses standard Node.js features:
- No deprecated APIs
- Standard async/await patterns
- ES6 compatible
- No version-specific dependencies

---

## Testing Checklist

- [ ] Run migration: `npm run migrate`
- [ ] Test single employee creation with all new fields
- [ ] Test auto-age calculation from date_of_birth
- [ ] Test gender validation (M/F only)
- [ ] Test disability validation (0 or 4 only)
- [ ] Test bulk upload with CSV file
- [ ] Verify retirement_date defaults to 'NA'
- [ ] Verify department_id defaults to 'NA' for bulk uploads
- [ ] Check register.ejs displays all columns correctly
- [ ] Verify Department column shows 'NA' when not assigned
- [ ] Verify Disability column displays correctly
- [ ] Test department assignment via department module
- [ ] Verify age auto-calculation from DOB works

---

## Migration Steps for Production

1. **Backup Database:**
   ```bash
   cp database.db database.db.backup
   ```

2. **Run Migration:**
   ```bash
   npm run migrate
   ```

3. **Verify Data:**
   ```bash
   sqlite3 database.db "SELECT COUNT(*) FROM employees;"
   ```

4. **Test Bulk Upload:**
   - Download template
   - Upload test CSV with new fields
   - Verify data appears correctly in register view

5. **Monitor:**
   - Check application logs for any errors
   - Verify all employee records load correctly
   - Test department assignment workflow

---

## Rollback Plan

If issues arise:

1. **Stop Application**
2. **Restore Database:**
   ```bash
   cp database.db.backup database.db
   ```
3. **Restart Application**

Note: To completely remove new columns in SQLite requires table recreation. The migration can be modified if needed, but data restoration is the recommended approach.

---

## Files Modified

1. ✅ `database/migrations/012_restructure_employees_table.js` (NEW)
2. ✅ `database/schemas/employee.schema.js`
3. ✅ `database/repositories/EmployeeRepository.js`
4. ✅ `controllers/employee.controller.js`
5. ✅ `views/employees/register.ejs`

---

## Summary of Key Features

✅ **Auto-Age Calculation:** Age is automatically calculated from date_of_birth if age field is empty
✅ **Gender Validation:** Only M or F allowed (case-insensitive)
✅ **Age Range Validation:** Must be between 18 and 120 years
✅ **Disability Field:** Only accepts 0 (no disability) or 4 (with disability)
✅ **Retirement Date Default:** Automatically set to 'NA' if not provided
✅ **Department Assignment:** Defaults to 'NA' for bulk uploads, can be assigned later
✅ **Bulk Upload Support:** CSV template updated with all new fields and examples
✅ **Register View:** Displays all columns in correct order with proper formatting

---

**Implementation Date:** January 21, 2026
**Node.js Version:** v22.22
**Status:** ✅ Complete
