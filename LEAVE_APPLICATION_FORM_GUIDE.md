# Leave Application Form Implementation Guide

## Overview
This document outlines the Leave Application Modal implementation, including form validation, date calculations, holiday handling, and system architecture.

---

## 📋 What Was Implemented

### 1. **Leave Application Modal Form**
**Location:** `views/leave_management/leave_applications.ejs` (Lines 318-495)

**Form Fields (All Required):**
- **Employee Selection** - Dropdown populated from employees table
- **Personal Number** - Auto-filled from selected employee (read-only)
- **Department** - Auto-filled from selected employee (read-only)
- **Leave Type** - Dropdown dynamically loaded from database
- **Start Date** - Date picker with validation (disabled until holidays load)
- **Duration (Days)** - Number input for working days only
- **End Date** - Auto-calculated (read-only)
- **Back On Date** - Auto-calculated (read-only)
- **Folio Number** - Manual entry for filing reference
- **Reference Number** - Auto-generated as `{employee_payroll}/{folio}`
- **Applied On** - Date picker (defaults to today)
- **Letter Date** - Date picker
- **Reason** - Text area for leave reason

---

## 🔧 Key Features & How They Work

### **1. Holiday Skipping Logic**
**File:** `views/leave_management/leave_applications.ejs` (Lines 680-750)

**How it works:**
```javascript
// Loads holidays from database
fetch('/api/holidays/validation')
  
// Checks each day against holiday list
function isHoliday(date) {
  // Formats date as YYYY-MM-DD in local timezone
  // Compares against allHolidays array
}

// Calculates working days, skipping weekends (Sat/Sun) + holidays
function calculateDates() {
  // Iterates through dates starting from start_date
  // Counts only days where isWorkingDay() = true
  // Stores result as isoDate in data attribute (not displayed)
}
```

**Important:** Dates are stored in ISO format (`YYYY-MM-DD`) in data attributes and submitted to database in ISO format, while the UI displays human-readable format.

---

### **2. Date Handling (Timezone Safe)**
**Critical Issue Fixed:** JavaScript's `toISOString()` converts to UTC, shifting dates backward by timezone hours.

**Solution:**
```javascript
// WRONG (causes timezone shift):
const isoDate = date.toISOString().split('T')[0];

// CORRECT (local timezone):
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, '0');
const day = String(date.getDate()).padStart(2, '0');
const isoDate = `${year}-${month}-${day}`;
```

**Date Formatting Functions:**
- `formatDateForDisplay(date)` → Human-readable: "April 2, 2026"
- `formatDateForDatabase(date)` → ISO format: "2026-04-02"

---

### **3. Dynamic Data Loading**

#### **Employees**
```javascript
loadEmployees() // Fetches from /api/employees
populateEmployees(data) // Populates dropdown
fillEmployeeDetails() // Auto-fills on selection
```

#### **Leave Types**
```javascript
loadLeaveTypes() // Fetches from /api/leave-types
populateLeaveTypes(data) // Populates dropdown (active only)
```

#### **Holidays**
```javascript
loadHolidays() // Fetches from /api/holidays/validation
// Waits max 5s for holidays to load before enabling date input
```

---

### **4. Form Submission**
**Location:** `views/leave_management/leave_applications.ejs` (Lines 820-877)

**Process:**
1. User fills form and clicks "Save Application"
2. Form validates all required fields client-side
3. Converts form data to JSON with ISO dates
4. POSTs to `/leave_applications` endpoint
5. On success: Shows toast notification, closes modal, reloads page
6. On error: Shows error message in toast

**Endpoint:** `/leave_applications` (routes/leave.routes.js, line 76)

---

## 🗂️ Files Modified

| File | Location | Changes |
|------|----------|---------|
| `views/leave_management/leave_applications.ejs` | Lines 318-877 | Form HTML, date calculation JS, API calls |
| `controllers/leave.controller.js` | Lines 888-906 | New endpoint: `getLeaveTypesForForm()` |
| `routes/leave.routes.js` | Line 84 | New route: `GET /api/leave-types` |
| `middleware/error.middleware.js` | Line 24 | Fixed 404 handler to recognize `/api/*` paths |

---

## 📌 Error Handling

### **Validation Errors**
- **Client-side:** HTML5 `required` attributes prevent empty form submission
- **Validation toast notifications** for missing fields

### **Database Constraints**
- **UNIQUE ref_no:** Each `{employee_payroll}/{folio}` combination must be unique
  - Use different folio numbers for multiple applications
  - Example: EMP001/001, EMP001/002, EMP001/003

### **Holiday Conflicts**
- If all days in range are holidays/weekends, modal disables submission
- Console logs show exactly which dates are skipped

---

## 🚀 Testing Checklist

- [ ] Open Leave Applications page
- [ ] Click "New" to open modal
- [ ] Wait for start_date input to enable (holidays loading)
- [ ] Select employee → verifies personal number + department populate
- [ ] Select leave type → verifies dropdown shows active types from DB
- [ ] Select start date → opens date picker
- [ ] Enter duration → verify end date + back on auto-calculate
- [ ] Watch console (F12) for calculation logs:
  ```
  📊 2026-04-02: weekend=false, holiday=false, working=true ✓
  🚫 2026-04-03 is a HOLIDAY: Good Friday
  🚫 2026-04-06 is a HOLIDAY: Easter Monday
  📊 2026-04-07: working=true ✓ (back on)
  ```
- [ ] Enter folio → reference number auto-generates as `{payroll}/{folio}`
- [ ] Fill other fields (dates, reason)
- [ ] Click "Save Application"
- [ ] Verify toast shows success/error message
- [ ] Check database: `SELECT * FROM leave_applications ORDER BY created_at DESC LIMIT 1;`

---

## 📊 Database Schema

**Table:** `leave_applications`
```sql
id              INTEGER PRIMARY KEY
ref_no          TEXT UNIQUE NOT NULL       -- e.g., EMP001/74
employee_id     INTEGER NOT NULL (FK)
leave_type_id   INTEGER NOT NULL (FK)
start_date      TEXT NOT NULL              -- YYYY-MM-DD
end_date        TEXT NOT NULL              -- YYYY-MM-DD (calculated)
back_on         TEXT NOT NULL              -- YYYY-MM-DD (calculated)
duration_days   INTEGER NOT NULL           -- working days only
applied_on      TEXT NOT NULL
letter_date     TEXT                       -- optional
status          TEXT DEFAULT 'Pending'
reason          TEXT
created_at      DATETIME DEFAULT NOW()
updated_at      DATETIME DEFAULT NOW()
```

---

## 🔄 API Endpoints

| Method | Endpoint | Purpose | File |
|--------|----------|---------|------|
| GET | `/api/employees` | List all employees | `api.routes.js` |
| GET | `/api/holidays/validation` | List all holidays for validation | `leave.controller.js` |
| GET | `/api/leave-types` | List active leave types | `leave.controller.js` |
| POST | `/leave_applications` | Create new application | `leave.controller.js` |

---

## 📈 Capacity Display

**Location:** `controllers/leave.controller.js` (Lines 688-692)

Updated to show **total number of employees** instead of hardcoded value:
```javascript
const totalEmployees = await db.employees.count();
const capacity = totalEmployees || 0;
```

Display on Leave Applications page shows: "Capacity: {total_employees}"

---

## 🐛 Common Issues & Fixes

| Issue | Cause | Solution |
|-------|-------|----------|
| `UNIQUE constraint on ref_no` | Duplicate reference number | Use different folio number |
| Holidays not skipping | Timezone UTC conversion | Fixed: Now uses local date format |
| `activePage not defined` | Error handler rendering layout for API calls | Fixed: 404 handler checks for `/api/*` |
| Leave types dropdown empty | API not called before rendering | Fixed: Wait for load before showing modal |
| Start date shows future dates | Date timezone shift | Fixed: Use `Date(year, month-1, day)` not `toISOString()` |

---

## 📝 Quick Reference

**To test the form:**
```bash
npm start
# Navigate to http://localhost:3000/leave_applications
# Open browser console (F12 → Console tab)
# Click "New" button
# Fill form and submit
# Watch console for logs
```

**To debug dates:**
- Console logs show each date checked
- Format: `YYYY-04-02: weekend={false/true}, holiday={false/true}, working={true/false}`

**To add new holidays:**
- Go to Holidays page
- Add holiday with date in format: `YYYY-MM-DD`
- They auto-appear in leave form calculations

---

## ✅ Status

| Feature | Status |
|---------|--------|
| Form UI | ✅ Complete |
| Employee selection | ✅ Complete |
| Leave type loading | ✅ Complete |
| Holiday detection | ✅ Complete |
| Date calculation (working days) | ✅ Complete |
| Holiday skipping | ✅ Complete |
| Auto-fill fields | ✅ Complete |
| Form validation | ✅ Complete |
| Form submission | ✅ Complete |
| Toast notifications | ✅ Complete |
| Capacity display (employee count) | ✅ Complete |

---

## 📞 Support

For issues:
1. Check browser console (F12) for error messages
2. Check server terminal for database errors
3. Verify holidays exist in database
4. Ensure employee has valid payroll_number
5. Use unique folio numbers for each application
