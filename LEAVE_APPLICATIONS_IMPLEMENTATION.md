# Leave Applications Implementation Documentation

## Overview
This document outlines the complete implementation of the Leave Applications feature for the State Department for Energy Leave Management System. The feature allows employees to apply for leave, track applications, and manage leave requests through a comprehensive web interface.

## Implementation Timeline
- **Started**: February 3, 2026
- **Completed**: February 4, 2026
- **Status**: ✅ Fully Implemented and Functional

## Database Layer

### 1. Migration: `013_create_leave_applications_table.js`
**Location**: `database/migrations/013_create_leave_applications_table.js`

**Purpose**: Creates the `leave_applications` table with all necessary fields and relationships.

**Schema**:
```sql
CREATE TABLE leave_applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ref_no TEXT UNIQUE NOT NULL,
    employee_id INTEGER NOT NULL,
    leave_type_id INTEGER NOT NULL,
    start_date TEXT NOT NULL,
    end_date TEXT NOT NULL,
    back_on TEXT NOT NULL,
    duration_days INTEGER NOT NULL,
    applied_on TEXT NOT NULL,
    letter_date TEXT,
    status TEXT DEFAULT 'Pending' CHECK(status IN ('Pending', 'Approved', 'Rejected', 'Cancelled')),
    reason TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
    FOREIGN KEY (leave_type_id) REFERENCES leave_types(id) ON DELETE CASCADE
)
```

**Key Features**:
- Unique reference numbers for tracking
- Foreign key relationships to employees and leave types
- Status tracking with constraints
- Automatic timestamps

### 2. Schema: `leave_application.schema.js`
**Location**: `database/schemas/leave_application.schema.js`

**Purpose**: Contains all SQL queries for CRUD operations on leave applications.

**Key Queries**:
- `INSERT_LEAVE_APPLICATION`: Insert new applications
- `GET_ALL_LEAVE_APPLICATIONS`: Fetch all applications with joined employee/department/leave type data
- `GET_LEAVE_APPLICATION_BY_ID`: Fetch single application with details
- `UPDATE_LEAVE_APPLICATION_STATUS`: Update application status
- `DELETE_LEAVE_APPLICATION`: Remove applications
- Count queries for statistics

### 3. Repository: `LeaveApplicationRepository.js`
**Location**: `database/repositories/LeaveApplicationRepository.js`

**Purpose**: Provides a clean interface for database operations.

**Methods**:
- `create()`: Insert new leave applications
- `findAll()`: Retrieve all applications with joined data
- `findById()`: Get specific application
- `findByEmployee()`: Get applications for specific employee
- `updateStatus()`: Change application status
- `delete()`: Remove applications
- `count()`: Get total count
- `countByStatus()`: Get counts by status

## Application Layer

### 4. Controller Updates: `leave.controller.js`
**Location**: `controllers/leave.controller.js`

**New Methods**:
- `getLeaveApplications()`: Main page handler with statistics
- `getLeaveApplicationById()`: API endpoint for single application
- `createLeaveApplication()`: API endpoint for creating applications
- `updateLeaveApplication()`: API endpoint for updating applications
- `deleteLeaveApplication()`: API endpoint for deleting applications
- `updateLeaveApplicationStatus()`: API endpoint for status changes

**Features**:
- Fetches data from database instead of hardcoded values
- Calculates real-time statistics (total, capacity, on leave, revoked)
- Handles user authentication and error management

### 5. Route Configuration: `leave.routes.js`
**Location**: `routes/leave.routes.js`

**New Routes**:
```javascript
// Page route
router.get('/leave_applications', leaveController.getLeaveApplications);

// API routes
router.get('/leave_applications/:id', leaveController.getLeaveApplicationById);
router.post('/leave_applications', leaveController.createLeaveApplication);
router.put('/leave_applications/:id', leaveController.updateLeaveApplication);
router.delete('/leave_applications/:id', leaveController.deleteLeaveApplication);
router.patch('/leave_applications/:id/status', leaveController.updateLeaveApplicationStatus);
```

### 6. Database Integration: `database/index.js`
**Location**: `database/index.js`

**Changes**:
- Added `LeaveApplicationRepository` import
- Added `leaveApplications` instance to database object
- Added `leave_application` schema export

### 7. Schema Index: `database/schemas/index.js`
**Location**: `database/schemas/index.js`

**Changes**:
- Added `leaveApplicationSchema` import
- Added `leave_application` export

## Presentation Layer

### 8. EJS Template: `leave_applications.ejs`
**Location**: `views/leave_management/leave_applications.ejs`

**Major Updates**:
- **Dynamic Data**: Replaced hardcoded sample data with database-driven content
- **Statistics Cards**: Real-time counts from database queries
- **Data Table**: Loop through `leaveApplications` array
- **Empty State**: Proper handling when no applications exist
- **Action Buttons**: Functional dropdown menus for view/edit/delete

**Key Features**:
- Responsive table with DataTables integration
- Status badges with appropriate colors
- Employee and department information display
- Reference number and date formatting

## Data Seeding

### 9. Seed Data Updates: `database/seed.js`
**Location**: `database/seed.js`

**Changes**:
- **Enhanced Leave Types**: Added comprehensive leave types (Annual, Sick, Maternity, Paternity, Casual, Bereavement)
- **Department Data**: Added sample departments (HR, IT, Finance, Operations)
- **Employee Updates**: Assigned departments to employees
- **Leave Applications Seed**: Dynamic seeding using actual database IDs

**Smart Seeding Logic**:
```javascript
// Query existing data
const employees = await connection.all('SELECT id, payroll_number, full_name FROM employees LIMIT 5');
const leaveTypes = await connection.all('SELECT id, leave_name FROM leave_types LIMIT 5');

// Use actual IDs to avoid foreign key violations
const leaveApplications = [
    {
        ref_no: 'LA/001/2026',
        employee_id: employees[0].id,  // Dynamic ID
        leave_type_id: leaveTypes[0].id,  // Dynamic ID
        // ... other fields
    }
];
```

## Issues Encountered and Resolutions

### Issue 1: Syntax Error in Seed File
**Problem**: `SyntaxError: Unexpected identifier 'seeder'` in `database/seed.js`
**Cause**: Multi-line SQL strings in template literals causing parsing issues
**Solution**: Converted to single-line SQL statements

### Issue 2: Missing Schema Export
**Problem**: `Cannot read properties of undefined (reading 'GET_ALL_LEAVE_APPLICATIONS')`
**Cause**: `leave_application` schema not exported in `schemas/index.js`
**Solution**: Added proper import and export

### Issue 3: Foreign Key Constraint Failures
**Problem**: Seeding failed with `SQLITE_CONSTRAINT: FOREIGN KEY constraint failed`
**Cause**: Hardcoded IDs in seed data didn't match existing database records
**Solution**: Implemented dynamic ID querying in seed function

### Issue 4: Invalid Seed Data
**Problem**: Existing invalid records in `leave_applications` table
**Solution**: Added `DELETE FROM leave_applications` before seeding to ensure clean data

## Features Implemented

### ✅ Core Functionality
- [x] Database table with proper relationships
- [x] CRUD operations via API
- [x] Web interface for viewing applications
- [x] Real-time statistics dashboard
- [x] Sample data seeding

### ✅ User Interface
- [x] Responsive data table
- [x] Status indicators and badges
- [x] Action menus (View, Edit, Delete, Revoke)
- [x] Modal dialogs for detailed views
- [x] Empty state handling

### ✅ Data Management
- [x] Foreign key relationships
- [x] Data validation
- [x] Status tracking
- [x] Audit trails (created_at/updated_at)

### ✅ Integration
- [x] User authentication
- [x] Department and employee linking
- [x] Leave type associations
- [x] Error handling and logging

## Testing and Validation

### Database Status
```
📋 Tables Summary:
   leave_applications  : 4 records
   employees          : 263 records
   leave_types        : 6 records
   departments        : 4 records
```

### Page Functionality
- ✅ Loads without errors
- ✅ Displays dynamic data
- ✅ Shows correct statistics
- ✅ Responsive design
- ✅ Interactive elements

## File Structure Summary

```
database/
├── migrations/013_create_leave_applications_table.js
├── schemas/
│   ├── leave_application.schema.js
│   └── index.js (updated)
├── repositories/
│   └── LeaveApplicationRepository.js
└── seed.js (updated)

controllers/
└── leave.controller.js (updated)

routes/
└── leave.routes.js (updated)

views/leave_management/
└── leave_applications.ejs (updated)
```

## Next Steps and Recommendations

### Potential Enhancements
1. **File Uploads**: Support for leave application attachments
2. **Email Notifications**: Automated notifications for status changes
3. **Approval Workflow**: Multi-level approval process
4. **Calendar Integration**: Visual calendar view of leave periods
5. **Reporting**: Advanced reporting and analytics

### Maintenance
- Regular backup of database
- Monitor foreign key constraints
- Update seed data as needed
- Test API endpoints regularly

## Conclusion

The Leave Applications feature has been successfully implemented with a complete database-driven solution. The system now provides:

- **Comprehensive tracking** of all leave applications
- **Real-time statistics** and reporting
- **User-friendly interface** for management
- **Robust data integrity** with proper relationships
- **Scalable architecture** for future enhancements

The implementation follows best practices for Node.js/Express applications with SQLite database integration, ensuring maintainability and extensibility.</content>
<parameter name="filePath">c:\Users\User\Desktop\STATE-DEPARTMENT-FOR-ENERGY-LEAVE-MANAGEMENT\LEAVE_APPLICATIONS_IMPLEMENTATION.md