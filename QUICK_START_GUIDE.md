# Staff Table Update - Quick Start Guide

## ⚡ Quick Start (5 Steps)

### Step 1: Apply Database Migration
```bash
npm run migrate
```
**Expected output:**
```
📋 Restructuring employees table with new schema...
✅ Added disability column with CHECK constraint (0 or 4)
✅ Added date_of_birth column
✅ Updated retirement_date defaults
✅ Employees table restructuring complete!
```

### Step 2: Restart Application
```bash
npm start
```

### Step 3: Access Application
- Open browser: `http://localhost:3000` (or your configured port)

### Step 4: Test Changes
1. Go to: **Employees → Staff Register**
2. You should see 14 columns (including new Disability column)
3. Department column should show 'NA' for unassigned employees

### Step 5: Test Bulk Upload
1. Go to: **Employees → Bulk Upload**
2. Click "Download Template"
3. You'll get CSV with 13 columns including:
   - date_of_birth
   - disability
4. Open in Excel/Spreadsheet editor and review new format

---

## 🔧 Commands Reference

### Database Operations
```bash
# Run all pending migrations
npm run migrate

# Check migration status
npm run migrate -- --status

# Run specific migration
npm run migrate -- 012

# Rollback (if needed)
npm run migrate -- --rollback
```

### Application Operations
```bash
# Start application
npm start

# Start with debug logging
DEBUG=* npm start

# Start in development mode
npm run dev

# Stop application
Ctrl+C
```

### Database Inspection
```bash
# Connect to database
sqlite3 database.db

# View table structure
.tables
PRAGMA table_info(employees);

# Count employees
SELECT COUNT(*) FROM employees;

# View all columns and types
.schema employees

# Exit
.quit
```

---

## 📊 What You'll See

### Register View - New Columns
```
Payroll # | Full Name | ID # | Gender | Age | Designation | Job | Status | Ret.Date | Empl.Sts | Dept | Disability | Actions
────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
19337     | Julius    | 11684| Male   | 63  | Deputy Dir  | R   | Active | NA       | Permanent| NA   | No Disab.  | ✎ ✘
19338     | Jane      | 11685| Female | 45  | HR Officer  | S   | Active | NA       | Permanent| NA   | -          | ✎ ✘
```

### CSV Template Download
When you download the template, you'll get:
```csv
payroll_number,full_name,id_number,gender,age,designation,job_group,status,retirement_date,employment_status,date_of_birth,disability,department_id
19337,MR JULIUS ODHIAMBO MBOGAH,11684,M,63,Deputy Director - HRM & Development,R,0 - Active,04/11/2026,Permanent,1961-05-12,0,
19338,JANE WANGUI KAMAU,11685,F,45,Senior HR Officer,S,0 - Active,15/08/2030,Permanent,1979-08-25,,
19339,PETER OMONDI OTIENO,11686,M,52,Finance Manager,T,0 - Active,22/05/2028,Contract,1972-03-18,4,
```

---

## 🧪 Test Scenarios

### Test 1: View Register Page
```
1. Login to application
2. Navigate to: Employees → Staff Register
3. Verify columns visible:
   ✓ Payroll Number
   ✓ Full Name
   ✓ ID Number
   ✓ Gender (with badge)
   ✓ Age
   ✓ Designation
   ✓ Job Group
   ✓ Status
   ✓ Retirement Date
   ✓ Employment Status
   ✓ Department (shows NA)
   ✓ Disability (shows -, 0, or 4)
   ✓ Actions
```

### Test 2: Auto-Calculate Age
```
CSV Content:
19999,TEST USER,99999,M,,Test Manager,R,0-Active,,Permanent,1980-05-15,,

Expected Result:
- Age field: 45 (auto-calculated from DOB)
- No error message
```

### Test 3: Validate Disability
```
CSV Content (Valid):
19999,TEST USER,99999,M,45,Test Manager,R,0-Active,,Permanent,1980-05-15,0,

CSV Content (Invalid):
19999,TEST USER,99999,M,45,Test Manager,R,0-Active,,Permanent,1980-05-15,5,

Expected: Error "disability must be 0 or 4"
```

### Test 4: Validate Gender
```
CSV Content (Valid):
payroll_number: 19999
gender: M
OR gender: F

CSV Content (Invalid):
payroll_number: 19999
gender: X

Expected: Error "gender must be M or F"
```

### Test 5: Department Assignment
```
1. Upload employees with department_id left empty
2. All employees should show department: NA
3. Go to: Employees → Assign Departments
4. Select department and employees
5. Click Assign
6. Go back to Register
7. Department should now show assigned department name
```

---

## 📝 Sample CSV for Testing

Save this as `test_employees.csv` and upload:

```csv
payroll_number,full_name,id_number,gender,age,designation,job_group,status,retirement_date,employment_status,date_of_birth,disability,department_id
20001,PETER KIPCHOGE BETT,20001,M,,Senior Manager,A,0 - Active,,Permanent,1970-03-15,0,
20002,LUCY NJOKI KARIUKI,20002,F,42,HR Specialist,B,0 - Active,30/06/2030,Permanent,1982-07-20,,
20003,DAVID OMONDI KIPCHOGE,20003,M,,Finance Officer,C,0 - Active,,Contract,1985-11-10,4,
20004,ROSE WANGARI KINYUA,20004,F,,Administrative Officer,D,0 - Active,,Temporary,1990-01-25,,
```

---

## ✅ Verification Checklist

After running migration:

- [ ] Migration completed without errors
- [ ] Application started successfully
- [ ] Register page loads with 14 columns
- [ ] Database table has new columns:
  - [ ] date_of_birth
  - [ ] disability
- [ ] CSV template includes new columns
- [ ] Can upload CSV with auto-calculated age
- [ ] Age validates 18-120 range
- [ ] Disability validates 0 or 4
- [ ] Gender validates M/F
- [ ] Department shows NA when not assigned
- [ ] Can assign departments afterward

---

## 🐛 Troubleshooting

### Issue: Migration fails to run

**Solution:**
```bash
# Check database exists
ls -la database.db

# Try manual migration
sqlite3 database.db < database/migrations/012_restructure_employees_table.js

# Check for errors
npm run migrate -- --verbose
```

### Issue: Column not appearing in register view

**Solution:**
```bash
# Clear browser cache
# Ctrl+Shift+Delete in most browsers

# Verify column in database
sqlite3 database.db "PRAGMA table_info(employees);"

# Should show: disability and date_of_birth columns
```

### Issue: Age not auto-calculating

**Solution:**
- Check date_of_birth format (must be YYYY-MM-DD or DD/MM/YYYY)
- Age field must be empty (not provided)
- Calculated age must be 18-120
- Check console for error messages

### Issue: Disability field rejects valid value

**Solution:**
- Only 0 and 4 are valid
- Cannot be other numbers
- Can be left empty/blank
- Check CSV cell is not formatted as text

---

## 📞 Support Information

### Check Logs
```bash
# View application logs
tail -f logs/app.log

# View error logs
tail -f logs/error.log

# Search for specific error
grep "disability" logs/app.log
```

### Database Backup
```bash
# Before migration
cp database.db database.db.backup

# After issues
cp database.db.backup database.db
```

### Common Errors and Solutions

| Error | Cause | Fix |
|-------|-------|-----|
| "Cannot find module" | Migration failed to load | Run `npm install` first |
| "PRAGMA table_info failed" | Database not found | Ensure `database.db` exists in root |
| "Column already exists" | Migration already ran | Check PRAGMA table_info(employees) |
| "Syntax error in SQL" | Database corrupted | Restore from backup and retry |

---

## 📚 Documentation Files

Created for your reference:

1. **DEPLOYMENT_READY.md** - Full implementation summary
2. **STAFF_TABLE_UPDATE_IMPLEMENTATION.md** - Technical details
3. **STAFF_TABLE_QUICK_REFERENCE.md** - Developer quick reference
4. **STAFF_TABLE_VISUAL_GUIDE.md** - Diagrams and visual flows
5. **QUICK_START_GUIDE.md** - This file

---

## ⏱️ Estimated Timings

| Task | Time |
|------|------|
| Run migration | < 1 minute |
| Restart application | < 2 minutes |
| Test register view | < 2 minutes |
| Test bulk upload | < 5 minutes |
| Full verification | < 15 minutes |

**Total Setup Time: ~15-20 minutes**

---

## 🎯 Success Indicators

You'll know it's working when:

✅ Application starts without errors
✅ Register page shows 14 columns
✅ New "Disability" column is visible
✅ CSV template downloads with 13 columns
✅ Can upload CSV and see employees
✅ Age auto-calculates from DOB
✅ Department shows NA when unassigned
✅ All validations work (gender, age, disability)
✅ Can assign departments after upload

---

## 🚀 Ready to Deploy?

1. **Run:** `npm run migrate`
2. **Run:** `npm start`
3. **Test:** Register page → Verify columns
4. **Confirm:** All items in success indicators above
5. **Done!** ✅

---

**Last Updated:** January 21, 2026
**Node.js Version:** v22.22
**Status:** Ready for Production 🎉
