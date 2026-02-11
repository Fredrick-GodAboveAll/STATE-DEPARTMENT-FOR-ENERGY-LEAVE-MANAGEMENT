const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leave.controller');
const { requireLogin } = require('../middleware/auth.middleware');

// Add multer for file uploads
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create uploads directory if it doesn't exist
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'leave-types-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept CSV files
    if (file.mimetype === 'text/csv' || 
        file.mimetype === 'application/vnd.ms-excel' ||
        file.originalname.toLowerCase().endsWith('.csv')) {
      cb(null, true);
    } else {
      cb(new Error('Only CSV files are allowed'), false);
    }
  }
});

router.use(requireLogin);

// View routes
router.get('/leave_types', leaveController.getLeaveTypes);
router.get('/holidays', leaveController.getHolidays);

// API routes for leave types CRUD
router.get('/leave_types/:id', leaveController.getLeaveTypeById);
router.post('/leave_types', leaveController.createLeaveType);
router.put('/leave_types/:id', leaveController.updateLeaveType);
router.delete('/leave_types/:id', leaveController.deleteLeaveType);

// Additional leave type operations
router.patch('/leave_types/:id/toggle-status', leaveController.toggleLeaveTypeStatus);
router.get('/leave_types/search', leaveController.searchLeaveTypes);

// NEW: Bulk upload routes
router.post('/leave_types/bulk-upload', upload.single('csvFile'), leaveController.bulkUploadLeaveTypes);
router.get('/leave_types/template', leaveController.downloadTemplate);

// NEW: Leave limits page
router.get('/leave_limits', leaveController.getLeaveLimits);

// NEW: Bulk leave import page
router.get('/leave_bulk', leaveController.getLeaveBulk);

// NEW: Leave applications page
router.get('/leave_applications', leaveController.getLeaveApplications);

// API routes for leave applications CRUD
router.get('/leave_applications/:id', leaveController.getLeaveApplicationById);
router.post('/leave_applications', leaveController.createLeaveApplication);
router.put('/leave_applications/:id', leaveController.updateLeaveApplication);
router.delete('/leave_applications/:id', leaveController.deleteLeaveApplication);
router.patch('/leave_applications/:id/status', leaveController.updateLeaveApplicationStatus);

// NEW: API endpoints for leave application modal
router.get('/api/employees/search', leaveController.searchEmployees);
router.get('/api/holidays/validation', leaveController.getHolidaysForValidation);
router.get('/api/leave-types', leaveController.getLeaveTypesForForm);

module.exports = router;