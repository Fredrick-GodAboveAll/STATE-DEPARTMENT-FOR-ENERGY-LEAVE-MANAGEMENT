# Staff Table Update - Visual Guide

## Register View - New Column Layout

### Before (Old Layout)
```
┌──┬─────────┬──────────┬──────┬──────┬────┬──────────┬────┬────────┬──────────┬─────────┬────┐
│☑ │Payroll# │Full Name │ ID # │Gender│Age │Desig.   │Job │Status  │Dept      │Retire   │Act │
├──┼─────────┼──────────┼──────┼──────┼────┼──────────┼────┼────────┼──────────┼─────────┼────┤
│  │19337    │Julius O. │11684 │Male  │63  │Deputy Dir│R   │Active  │Unassigned│04/11/26 │✎✘ │
│  │19338    │Jane W.   │11685 │Female│45  │HR Officer│S   │Active  │HR        │15/08/30 │✎✘ │
└──┴─────────┴──────────┴──────┴──────┴────┴──────────┴────┴────────┴──────────┴─────────┴────┘
```

### After (New Layout - 14 Columns)
```
┌──┬─────────┬──────────┬──────┬──────┬────┬──────────┬────┬────────┬──────────┬─────────┬──────┬───────────┬────┐
│☑ │Payroll# │Full Name │ ID # │Gender│Age │Desig.   │Job │Status  │Ret.Date  │Empl.Sts │Dept  │Disability │Act │
├──┼─────────┼──────────┼──────┼──────┼────┼──────────┼────┼────────┼──────────┼─────────┼──────┼───────────┼────┤
│  │19337    │Julius O. │11684 │Male  │63  │Deputy Dir│R   │Active  │NA        │Permanent│NA    │No Disab.  │✎✘ │
│  │19338    │Jane W.   │11685 │Female│45  │HR Officer│S   │Active  │NA        │Permanent│NA    │-          │✎✘ │
└──┴─────────┴──────────┴──────┴──────┴────┴──────────┴────┴────────┴──────────┴─────────┴──────┴───────────┴────┘
```

## CSV Template - New Format

### Old Template (11 columns)
```csv
payroll_number,full_name,id_number,gender,age,designation,job_group,status,retirement_date,employment_status,department_id
19337,JULIUS,11684,M,63,Director,R,0-Active,04/11/2026,Permanent,
```

### New Template (13 columns + improvements)
```csv
payroll_number,full_name,id_number,gender,age,designation,job_group,status,retirement_date,employment_status,date_of_birth,disability,department_id
19337,JULIUS,11684,M,,Director,R,0-Active,,Permanent,1961-05-12,0,
19338,JANE,11685,F,45,Officer,S,0-Active,15/08/2030,Permanent,1979-08-25,,
```

**Key Changes:**
- Added `date_of_birth` column (for auto-age calculation)
- Added `disability` column (0 or 4 only)
- Age can be left blank if DOB provided (auto-calculates)
- Both new columns optional for data entry

## Validation Flow

### Age Calculation & Validation
```
┌─────────────────────────────────────────────────────────────┐
│ CSV Row Input                                               │
│ payroll_number, full_name, ..., age, date_of_birth, ...   │
└────────────────────┬────────────────────────────────────────┘
                     │
          ┌──────────▼──────────┐
          │ Age provided?       │
          └──────┬──────────┬───┘
                 │          │
            YES  │          │ NO
                 │          │
      ┌──────────▼─┐  ┌─────▼───────────────┐
      │ Validate   │  │ DOB provided?       │
      │ 18-120     │  └──┬──────────────┬───┘
      │ Check      │     │              │
      └──────┬─────┘    YES            NO
             │           │              │
             │    ┌──────▼──────┐      │
             │    │ Calculate   │      │
             │    │ age from    │      │
             │    │ DOB         │      │
             │    └──────┬──────┘      │
             │           │            │
             │    ┌──────▼──────┐     │
             │    │ Validate    │     │
             │    │ 18-120      │     │
             │    │ range       │     │
             │    └──────┬──────┘     │
             │           │           │
             └───────────┼───────────┘
                         │
                    ┌────▼─────┐
                    │ Valid?    │
                    └─┬───────┬─┘
                     YES      NO
                      │        │
              ┌───────▼──┐  ┌──▼──────────────┐
              │ Create   │  │ Reject with     │
              │ Employee │  │ error message   │
              └──────────┘  └─────────────────┘
```

### Disability Validation
```
┌──────────────────────────────────┐
│ disability field value           │
└────────┬─────────────────────┬───┘
         │                     │
    Provided                Not Provided
         │                     │
    ┌────▼────┐               │
    │ Value? │                │
    └─┬──┬──┬─┘                │
     0│ 4│ X                   │
      │ │ │                   │
    ✅ ✅ ❌           ✅ (Optional)
      │ │ │                   │
      │ │ └─────────────┬─────┘
      │ │               │
      └─┴───────────────┴─→ Continue Processing
```

### Gender Validation
```
Input Gender
     ↓
┌─────────────────┐
│ Normalize to    │ (uppercase)
│ uppercase       │
└────────┬────────┘
         ↓
    Is it 'M'
    or 'F'?
    /       \
  YES        NO
  ↓          ↓
✅        ❌ Error
  │       "gender must be
  │        M or F"
  └─────────────→ Continue/Reject
```

## Department Assignment Flow

### Bulk Upload
```
┌──────────────────┐
│ CSV Upload       │
│ department_id=?  │
└────────┬─────────┘
         │
    ┌────▼────┐
    │ Provided?│
    └──┬────┬─┘
       │    │
      YES   NO
       │    │
    ┌──▼─┐ │  ┌─────────────┐
    │Valid?  │  │ Set to     │
    │Dept ID?│  │ 'NA'       │
    └──┬──┬─┘  └─────┬───────┘
       │  │          │
      ✅  ❌        │
       │   │        │
       │   Error    │
       │            │
       └────┬───────┘
            ↓
       ┌─────────────────────┐
       │ Employee Created    │
       │ (dept assigned or   │
       │ department_id='NA') │
       └────────┬────────────┘
                ↓
        ┌───────────────────┐
        │ Later: Use        │
        │ "Assign Depts"    │
        │ feature to assign  │
        └───────────────────┘
```

## Data Storage Examples

### Example 1: With Auto-Calculated Age
```csv
Input:
19337,JULIUS,11684,M,,Deputy Director,R,0-Active,,Permanent,1961-05-12,0,

Stored in Database:
payroll_number: 19337
full_name: JULIUS
id_number: 11684
gender: M
age: 63          ← Auto-calculated
designation: Deputy Director
date_of_birth: 1961-05-12
disability: 0
retirement_date: NA
department_id: NA
```

### Example 2: Full Data
```csv
Input:
19338,JANE,11685,F,45,HR Officer,S,0-Active,15/08/2030,Permanent,1979-08-25,4,1

Stored in Database:
payroll_number: 19338
full_name: JANE
id_number: 11685
gender: F
age: 45          ← As provided
designation: HR Officer
date_of_birth: 1979-08-25
disability: 4    ← With disability
retirement_date: 2030-08-15
department_id: 1 ← Assigned to dept 1
```

## Register View - Badge Display

### Gender Badge
```
┌───────────────┐
│ Gender: 'M'   │ → Display as blue badge: "Male"
└───────────────┘

┌───────────────┐
│ Gender: 'F'   │ → Display as green badge: "Female"
└───────────────┘
```

### Disability Badge
```
┌────────────────────┐
│ disability = 0     │ → Display: "No Disability" (green badge)
└────────────────────┘

┌────────────────────┐
│ disability = 4     │ → Display: "With Disability" (blue badge)
└────────────────────┘

┌────────────────────┐
│ disability = NULL  │ → Display: "-" (gray badge)
└────────────────────┘
```

### Department Badge
```
┌────────────────────────┐
│ department_id = 'NA'   │ → Display: "NA" (orange badge)
│ (or NULL)              │   with question icon
└────────────────────────┘

┌────────────────────────┐
│ department_id = 1      │ → Display: "HR" (blue badge)
│ department_name = "HR" │   with building icon
└────────────────────────┘
```

## Error Messages - Validation Reference

```
❌ "gender must be M or F"
   → User entered something other than M or F

❌ "age must be a number between 18 and 120"
   → Age outside range or non-numeric

❌ "disability must be 0 or 4"
   → Disability is not 0 or 4

❌ "Invalid date_of_birth: {date}"
   → Date format incorrect or can't calculate age

❌ "Duplicate payroll number: {number}"
   → Payroll already exists in database

❌ "Duplicate ID number: {number}"
   → ID number already exists in database

❌ "payroll_number must be numeric"
   → Payroll number contains non-numeric characters

❌ "id_number must be numeric"
   → ID number contains non-numeric characters
```

## Database Schema Diagram

```
employees Table
┌──────────────────────────────────────────────┐
│ COLUMN               │ TYPE      │ CONSTRAINT│
├──────────────────────┼───────────┼──────────┤
│ id                   │ INTEGER   │ PRIMARY  │
│ payroll_number       │ TEXT      │ UNIQUE   │
│ full_name            │ TEXT      │ NOT NULL │
│ id_number            │ TEXT      │ UNIQUE   │
│ gender               │ TEXT      │ M/F only │
│ age                  │ INTEGER   │ 18-120   │
│ designation          │ TEXT      │ NOT NULL │
│ job_group            │ TEXT      │          │
│ status               │ TEXT      │          │
│ retirement_date      │ TEXT      │ def:NA   │
│ employment_status    │ TEXT      │          │
│ date_of_birth ✨     │ TEXT      │          │
│ disability ✨        │ INTEGER   │ 0 or 4   │
│ department_id        │ INTEGER   │ FK, NA   │
│ created_at           │ DATETIME  │          │
│ updated_at           │ DATETIME  │          │
└──────────────────────┴───────────┴──────────┘

✨ = New columns
FK = Foreign key to departments table
NA = Defaults to 'NA' or NULL
```

---

This visual guide helps understand:
1. How the register view layout changed
2. How validations work step-by-step
3. What data gets stored in the database
4. How badges display on the frontend
5. The department assignment flow

For detailed technical information, see the implementation guide.
