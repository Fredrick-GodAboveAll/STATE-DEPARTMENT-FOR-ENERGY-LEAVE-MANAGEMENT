// =============================================
// LEAVE MANAGEMENT CONTROLLER - COMPLETE FIXED
// =============================================

const { db } = require('../database');

const leaveController = {
  /**
   * Display leave types management page
   */
  getLeaveTypes: async function(req, res) {
    try {
      db.connection.get('SELECT email, first_name, last_name FROM users WHERE id = ?', [req.session.userId])
        .then(async function(user) {
          if (!user) {
            req.flash('error_msg', 'User not found');
            return res.redirect('/');
          }
          
          // FIXED: Use db.leaveTypes.findAll() instead of getAllLeaveTypes()
          const leaveTypes = await db.leaveTypes.findAll();
          
          res.render('leave_management/leave_types', {
            activeShow: 'leave_types',
            activePage: 'leave_types',
            userFirstName: user.first_name,
            userLastName: user.last_name,
            userEmail: user.email,
            leaveTypes: leaveTypes,
            totalLeaveTypes: leaveTypes ? leaveTypes.length : 0,
            activeLeaveTypes: leaveTypes ? leaveTypes.filter(lt => lt.status === 'Active').length : 0
          });
        })
        .catch(function(err) {
          console.error('Error fetching user:', err);
          req.flash('error_msg', 'User not found');
          return res.redirect('/');
        });
    } catch (error) {
      console.error('Error fetching leave types:', error);
      req.flash('error_msg', 'Error loading leave types data');
      res.redirect('/dashboard');
    }
  },

  /**
   * Display holidays management page
   */
  getHolidays: async function(req, res) {
    try {
      db.connection.get('SELECT email, first_name, last_name FROM users WHERE id = ?', [req.session.userId])
        .then(async function(user) {
          if (!user) {
            req.flash('error_msg', 'User not found');
            return res.redirect('/');
          }
          
          // FIXED: Use the correct repository methods
          const allHolidays = await db.holidays.findAll();
          const upcomingHolidays = await db.holidays.findUpcoming();
          const currentYear = new Date().getFullYear();
          const currentYearHolidays = await db.holidays.findByYear(currentYear);
          
          // Format dates for display
          const formattedHolidays = allHolidays ? allHolidays.map(function(holiday) {
            const date = new Date(holiday.holiday_date);
            return {
              ...holiday,
              formattedDate: date.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }),
              day: date.getDate(),
              month: date.toLocaleDateString('en-US', { month: 'short' }),
              year: date.getFullYear()
            };
          }) : [];
          
          // Group holidays by month for better display
          const holidaysByMonth = {};
          if (formattedHolidays) {
            formattedHolidays.forEach(function(holiday) {
              const month = new Date(holiday.holiday_date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
              if (!holidaysByMonth[month]) {
                holidaysByMonth[month] = [];
              }
              holidaysByMonth[month].push(holiday);
            });
          }
          
          res.render('leave_management/holidays', {
            activeShow: 'leave_types',
            activePage: 'holidays',
            userFirstName: user.first_name,
            userLastName: user.last_name,
            userEmail: user.email,
            holidays: formattedHolidays,
            upcomingHolidays: upcomingHolidays || [],
            currentYearHolidays: currentYearHolidays || [],
            holidaysByMonth: holidaysByMonth,
            totalHolidays: formattedHolidays ? formattedHolidays.length : 0,
            currentYear: currentYear
          });
        })
        .catch(function(err) {
          console.error('Error fetching user:', err);
          req.flash('error_msg', 'User not found');
          return res.redirect('/');
        });
    } catch (error) {
      console.error('Error fetching holidays:', error);
      req.flash('error_msg', 'Error loading holidays data');
      res.redirect('/dashboard');
    }
  },

  /**
   * Get single leave type by ID (for editing)
   */
  getLeaveTypeById: async function(req, res) {
    try {
      const { id } = req.params;
      const leaveType = await db.leaveTypes.findById(id);
      
      if (!leaveType) {
        return res.status(404).json({
          success: false,
          message: 'Leave type not found'
        });
      }
      
      res.json({
        success: true,
        leaveType: leaveType
      });
    } catch (error) {
      console.error('Error fetching leave type:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching leave type'
      });
    }
  },

  /**
   * Create new leave type
   */
  createLeaveType: async function(req, res) {
    try {
      const {
        leave_name,
        color,
        entitled_days,
        gender_restriction,
        description,
        status
      } = req.body;

      // Basic validation
      if (!leave_name || !entitled_days) {
        return res.status(400).json({
          success: false,
          message: 'Leave name and entitled days are required'
        });
      }

      // Validate carry_forward_days if provided
      if (typeof req.body.carry_forward_days !== 'undefined' && req.body.carry_forward_days !== '') {
        const cf = parseInt(req.body.carry_forward_days);
        if (isNaN(cf) || cf < 0) {
          return res.status(400).json({ success: false, message: 'carry_forward_days must be a non-negative number' });
        }
      }

      // Check if leave type with same name already exists
      const existingLeaveTypes = await db.leaveTypes.findAll();
      const duplicate = existingLeaveTypes.find(
        lt => lt.leave_name.toLowerCase() === leave_name.toLowerCase()
      );
      
      if (duplicate) {
        return res.status(400).json({
          success: false,
          message: 'A leave type with this name already exists'
        });
      }

      const newLeaveType = await db.leaveTypes.create({
        leave_name: leave_name.trim(),
        color: color || 'primary',
        entitled_days: parseInt(entitled_days),
        gender_restriction: gender_restriction || 'All',
        description: description || '',
        carry_forward_days: (typeof req.body.carry_forward_days !== 'undefined' && req.body.carry_forward_days !== '') ? parseInt(req.body.carry_forward_days) : null,
        status: status || 'Active'
      });

      res.json({
        success: true,
        message: 'Leave type created successfully',
        leaveType: newLeaveType
      });
    } catch (error) {
      console.error('Error creating leave type:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Error creating leave type'
      });
    }
  },

  /**
   * Update existing leave type
   */
  updateLeaveType: async function(req, res) {
    try {
      const { id } = req.params;
      const {
        leave_name,
        color,
        entitled_days,
        gender_restriction,
        description,
        carry_forward_days,
        status
      } = req.body;

      // Check if leave type exists
      const existingLeaveType = await db.leaveTypes.findById(id);
      if (!existingLeaveType) {
        return res.status(404).json({
          success: false,
          message: 'Leave type not found'
        });
      }

      // Validate carry_forward_days if provided
      if (typeof req.body.carry_forward_days !== 'undefined' && req.body.carry_forward_days !== '') {
        const cf = parseInt(req.body.carry_forward_days);
        if (isNaN(cf) || cf < 0) {
          return res.status(400).json({ success: false, message: 'carry_forward_days must be a non-negative number' });
        }
      }

      // Determine updated values (allow partial updates)
      const newName = (typeof leave_name !== 'undefined' && leave_name !== null && leave_name !== '') ? leave_name.trim() : existingLeaveType.leave_name;
      const newColor = color || existingLeaveType.color || 'primary';
      const newEntitledDays = (typeof entitled_days !== 'undefined' && entitled_days !== '') ? parseInt(entitled_days) : existingLeaveType.entitled_days;
      const newGender = gender_restriction || existingLeaveType.gender_restriction || 'All';
      const newDescription = (typeof description !== 'undefined') ? description : existingLeaveType.description;
      const newCarryForward = (typeof carry_forward_days !== 'undefined' && carry_forward_days !== '') ? parseInt(carry_forward_days) : existingLeaveType.carry_forward_days;
      const newStatus = status || existingLeaveType.status || 'Active';

      // Check if another leave type has the same name (excluding current one)
      const allLeaveTypes = await db.leaveTypes.findAll();
      const duplicate = allLeaveTypes.find(
        lt => lt.id !== parseInt(id) && lt.leave_name && lt.leave_name.toLowerCase() === newName.toLowerCase()
      );
      
      if (duplicate) {
        return res.status(400).json({
          success: false,
          message: 'Another leave type with this name already exists'
        });
      }

      const updatedLeaveType = await db.leaveTypes.update(id, {
        leave_name: newName,
        color: newColor,
        entitled_days: newEntitledDays,
        gender_restriction: newGender,
        description: newDescription,
        carry_forward_days: (typeof newCarryForward !== 'undefined' && newCarryForward !== null) ? newCarryForward : null,
        status: newStatus
      });

      if (!updatedLeaveType) {
        return res.status(400).json({
          success: false,
          message: 'Failed to update leave type'
        });
      }

      res.json({
        success: true,
        message: 'Leave type updated successfully',
        leaveType: updatedLeaveType
      });
    } catch (error) {
      console.error('Error updating leave type:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Error updating leave type'
      });
    }
  },

  /**
   * Delete leave type
   */
  deleteLeaveType: async function(req, res) {
    try {
      const { id } = req.params;
      
      // Check if leave type exists
      const existingLeaveType = await db.leaveTypes.findById(id);
      if (!existingLeaveType) {
        return res.status(404).json({
          success: false,
          message: 'Leave type not found'
        });
      }

      // Check if this leave type is being used in any leave applications
      // (Optional: Add this check once you have leave applications table)
      /*
      const usedInApplications = await db.connection.get(
        'SELECT COUNT(*) as count FROM leave_applications WHERE leave_type_id = ?',
        [id]
      );
      
      if (usedInApplications && usedInApplications.count > 0) {
        return res.status(400).json({
          success: false,
          message: 'Cannot delete leave type that is being used in leave applications'
        });
      }
      */

      const deleted = await db.leaveTypes.delete(id);
      
      if (!deleted) {
        return res.status(400).json({
          success: false,
          message: 'Failed to delete leave type'
        });
      }

      res.json({
        success: true,
        message: 'Leave type deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting leave type:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Error deleting leave type'
      });
    }
  },

  /**
   * Toggle leave type status (Active/Inactive)
   */
  toggleLeaveTypeStatus: async function(req, res) {
    try {
      const { id } = req.params;
      
      const existingLeaveType = await db.leaveTypes.findById(id);
      if (!existingLeaveType) {
        return res.status(404).json({
          success: false,
          message: 'Leave type not found'
        });
      }

      const updatedLeaveType = await db.leaveTypes.toggleStatus(id);
      
      res.json({
        success: true,
        message: 'Leave type status updated successfully',
        leaveType: updatedLeaveType
      });
    } catch (error) {
      console.error('Error toggling leave type status:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Error updating leave type status'
      });
    }
  },

  /**
   * Search leave types
   */
  searchLeaveTypes: async function(req, res) {
    try {
      const { query } = req.query;
      
      if (!query || query.trim().length < 2) {
        return res.json({
          success: true,
          leaveTypes: []
        });
      }

      const results = await db.leaveTypes.search(query);
      
      res.json({
        success: true,
        leaveTypes: results
      });
    } catch (error) {
      console.error('Error searching leave types:', error);
      res.status(500).json({
        success: false,
        message: 'Error searching leave types'
      });
    }
  },

  /**
   * NEW: Bulk upload leave types from CSV
   */
  bulkUploadLeaveTypes: async function(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No CSV file uploaded'
        });
      }

      const fs = require('fs');
      const path = require('path');
      const Papa = require('papaparse');

      // Read the uploaded file
      const filePath = req.file.path;
      const csvData = fs.readFileSync(filePath, 'utf8');

      // Parse CSV
      const results = Papa.parse(csvData, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (header) => {
          if (!header) return '';
          return header.trim().toLowerCase().replace(/\s+/g, '_');
        }
      });

      if (results.errors.length > 0) {
        // Clean up uploaded file
        fs.unlinkSync(filePath);
        
        return res.status(400).json({
          success: false,
          message: 'CSV parsing error',
          errors: results.errors
        });
      }

      const leaveTypes = results.data;
      const totalRecords = leaveTypes.length;
      
      if (totalRecords === 0) {
        fs.unlinkSync(filePath);
        return res.status(400).json({
          success: false,
          message: 'CSV file is empty'
        });
      }

      // Validate required columns
      const requiredColumns = ['leave_name', 'entitled_days'];
      const csvHeaders = Object.keys(leaveTypes[0] || {});
      
      for (const column of requiredColumns) {
        if (!csvHeaders.includes(column)) {
          fs.unlinkSync(filePath);
          return res.status(400).json({
            success: false,
            message: `Missing required column: ${column}. Please use the template file.`
          });
        }
      }

      const processedResults = {
        success: [],
        failed: [],
        total: totalRecords
      };

      // Get all existing leave types for duplicate check
      const allLeaveTypes = await db.leaveTypes.findAll();
      
      // Process each record
      for (const [index, record] of leaveTypes.entries()) {
        try {
          // Skip empty rows
          if (!record.leave_name && !record.entitled_days) {
            continue;
          }

          // Validate record
          if (!record.leave_name || !record.entitled_days) {
            throw new Error('Missing required fields: leave_name and entitled_days are required');
          }

          // Convert entitled_days to number
          const entitledDays = parseInt(record.entitled_days);
          if (isNaN(entitledDays) || entitledDays < 0) {
            throw new Error('entitled_days must be a non-negative number');
          }

          // Prepare leave type data
          const leaveData = {
            leave_name: record.leave_name.toString().trim(),
            color: record.color || 'primary',
            entitled_days: entitledDays,
            gender_restriction: record.gender_restriction || 'All',
            description: record.description || '',
            carry_forward_days: (typeof record.carry_forward_days !== 'undefined' && record.carry_forward_days !== '') ? parseInt(record.carry_forward_days) : null,
            status: record.status || 'Active'
          };

          // Validate gender_restriction
          const validGenders = ['All', 'Male', 'Female', 'Other', 'None'];
          if (leaveData.gender_restriction && !validGenders.includes(leaveData.gender_restriction)) {
            throw new Error(`Invalid gender_restriction. Must be one of: ${validGenders.join(', ')}`);
          }

          // Validate status
          const validStatuses = ['Active', 'Inactive', 'Archived'];
          if (leaveData.status && !validStatuses.includes(leaveData.status)) {
            throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
          }

          // Check for duplicate leave name
          const duplicate = allLeaveTypes.find(
            lt => lt.leave_name.toLowerCase() === leaveData.leave_name.toLowerCase()
          );

          if (duplicate) {
            throw new Error(`Leave type '${leaveData.leave_name}' already exists`);
          }

          // Create leave type
          const newLeaveType = await db.leaveTypes.create(leaveData);
          
          processedResults.success.push({
            row: index + 2, // +2 because of header row and 0-index
            data: leaveData,
            result: newLeaveType
          });

        } catch (error) {
          processedResults.failed.push({
            row: index + 2,
            data: record,
            error: error.message
          });
        }
      }

      // Clean up uploaded file
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      // Prepare response
      const successCount = processedResults.success.length;
      const failedCount = processedResults.failed.length;

      res.json({
        success: true,
        message: `Bulk upload completed. Success: ${successCount}, Failed: ${failedCount}`,
        summary: {
          total: processedResults.total,
          success: successCount,
          failed: failedCount
        },
        details: {
          success: processedResults.success,
          failed: processedResults.failed
        }
      });

    } catch (error) {
      console.error('Error in bulk upload:', error);
      
      // Clean up file if it exists
      if (req.file && req.file.path) {
        const fs = require('fs');
        try {
          if (fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
          }
        } catch (e) {
          // Ignore cleanup errors
        }
      }

      res.status(500).json({
        success: false,
        message: error.message || 'Error processing CSV file'
      });
    }
  },

  // Add after your existing functions, before module.exports:

/**
 * NEW: Display leave limits management page
 */
getLeaveLimits: async function(req, res) {
  try {
    // Get user info
    const user = await db.connection.get('SELECT email, first_name, last_name FROM users WHERE id = ?', [req.session.userId]);
    
    if (!user) {
      req.flash('error_msg', 'User not found');
      return res.redirect('/');
    }
    
    // Fetch leave types to manage carry forward values
    const leaveTypes = await db.leaveTypes.findAll();

    // Render leave limits page
    res.render('leave_management/leave_limits', {
      activeShow: 'leave_types', // This keeps the "leave items" dropdown open
      activePage: 'leave_limits', // This highlights the "Limits" menu item
      userFirstName: user.first_name,
      userLastName: user.last_name,
      userEmail: user.email,
      pageTitle: 'Leave Limits',
      leaveTypes: leaveTypes || []
    });
  } catch (error) {
    console.error('Error loading leave limits page:', error);
    req.flash('error_msg', 'Error loading leave limits page');
    res.redirect('/dashboard');
  }
},

/**
 * NEW: Display bulk leave import page
 */
getLeaveBulk: async function(req, res) {
  try {
    // Get user info
    const user = await db.connection.get('SELECT email, first_name, last_name FROM users WHERE id = ?', [req.session.userId]);
    
    if (!user) {
      req.flash('error_msg', 'User not found');
      return res.redirect('/');
    }
    
    // Render bulk leave page
    res.render('leave_management/leave_bulk', {
      activeShow: 'leave_types', // This keeps the "leave items" dropdown open
      activePage: 'leave_bulk', // This highlights the "Bulk Leave Import" menu item
      userFirstName: user.first_name,
      userLastName: user.last_name,
      userEmail: user.email,
      pageTitle: 'Bulk Leave Import'
    });
  } catch (error) {
    console.error('Error loading bulk leave page:', error);
    req.flash('error_msg', 'Error loading bulk leave page');
    res.redirect('/dashboard');
  }
},

  /**
   * NEW: Display leave applications page
   */
  getLeaveApplications: async function(req, res) {
    try {
      // Get user info
      const user = await db.connection.get('SELECT email, first_name, last_name FROM users WHERE id = ?', [req.session.userId]);

      if (!user) {
        req.flash('error_msg', 'User not found');
        return res.redirect('/');
      }

      // Get leave applications from database
      const leaveApplications = await db.leaveApplications.findAll();
      
      // Get summary counts
      const totalApplications = await db.leaveApplications.count();
      const pendingCount = await db.leaveApplications.countByStatus('Pending');
      const approvedCount = await db.leaveApplications.countByStatus('Approved');
      const rejectedCount = await db.leaveApplications.countByStatus('Rejected');
      const cancelledCount = await db.leaveApplications.countByStatus('Cancelled');

      // Get total number of employees as capacity
      const allEmployees = await db.employees.findAll();
      const totalEmployees = allEmployees ? allEmployees.length : 0;
      const capacity = totalEmployees || 0;
      const onLeave = approvedCount; // Assuming approved means currently on leave

      res.render('leave_management/leave_applications', {
        activeShow: 'leave_types',
        activePage: 'leave_applications',
        userFirstName: user.first_name,
        userLastName: user.last_name,
        userEmail: user.email,
        pageTitle: 'Leave Applications',
        leaveApplications: leaveApplications,
        totalApplications: totalApplications,
        capacity: capacity,
        onLeave: onLeave,
        revoked: rejectedCount + cancelledCount
      });
    } catch (error) {
      console.error('Error loading leave applications page:', error);
      req.flash('error_msg', 'Error loading leave applications page');
      res.redirect('/dashboard');
    }
  },

  // Leave Applications CRUD operations
  getLeaveApplicationById: async function(req, res) {
    try {
      const { id } = req.params;
      const leaveApplication = await db.leaveApplications.findById(id);
      
      if (!leaveApplication) {
        return res.status(404).json({ success: false, message: 'Leave application not found' });
      }
      
      res.json({ success: true, data: leaveApplication });
    } catch (error) {
      console.error('Error fetching leave application:', error);
      res.status(500).json({ success: false, message: 'Error fetching leave application' });
    }
  },

  createLeaveApplication: async function(req, res) {
    try {
      const leaveApplicationData = req.body;
      const result = await db.leaveApplications.create(leaveApplicationData);
      
      res.status(201).json({ success: true, data: result, message: 'Leave application created successfully' });
    } catch (error) {
      console.error('Error creating leave application:', error);
      res.status(500).json({ success: false, message: 'Error creating leave application' });
    }
  },

  updateLeaveApplication: async function(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      
      // For now, just update status if provided
      if (updateData.status) {
        await db.leaveApplications.updateStatus(id, updateData.status);
      }
      
      res.json({ success: true, message: 'Leave application updated successfully' });
    } catch (error) {
      console.error('Error updating leave application:', error);
      res.status(500).json({ success: false, message: 'Error updating leave application' });
    }
  },

  deleteLeaveApplication: async function(req, res) {
    try {
      const { id } = req.params;
      await db.leaveApplications.delete(id);
      
      res.json({ success: true, message: 'Leave application deleted successfully' });
    } catch (error) {
      console.error('Error deleting leave application:', error);
      res.status(500).json({ success: false, message: 'Error deleting leave application' });
    }
  },

  updateLeaveApplicationStatus: async function(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      await db.leaveApplications.updateStatus(id, status);
      
      res.json({ success: true, message: 'Leave application status updated successfully' });
    } catch (error) {
      console.error('Error updating leave application status:', error);
      res.status(500).json({ success: false, message: 'Error updating leave application status' });
    }
  },

  /**
   * NEW: Download CSV template
   */
  downloadTemplate: function(req, res) {
    try {
      const template = `leave_name,color,entitled_days,gender_restriction,description,carry_forward_days,status
Annual Leave,primary,21,All,Annual leave with pay,,Active
Sick Leave,success,14,All,Sick leave with pay,,Active
Maternity Leave,danger,180,Female,Maternity leave,,Active
Paternity Leave,warning,7,Male,Paternity leave,,Active
Casual Leave,info,7,All,Casual leave,,Active
Bereavement Leave,secondary,3,All,Bereavement leave,,Active

# Instructions:
# 1. Required fields: leave_name, entitled_days
# 2. Optional fields: color, gender_restriction, description, carry_forward_days, status
# 3. gender_restriction: All, Male, Female, Other, or None
# 4. status: Active, Inactive, or Archived
# 5. entitled_days and carry_forward_days must be numbers (0 or greater)
# 6. If carry_forward_days is blank, it will be treated as 'N/A' for existing leave types
# 7. Remove this instruction row before uploading`;

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=leave_types_template.csv');
      res.send(template);
    } catch (error) {
      console.error('Error downloading template:', error);
      res.status(500).json({
        success: false,
        message: 'Error downloading template'
      });
    }
  },

  /**
   * API: Search employees for leave application modal
   */
  searchEmployees: async function(req, res) {
    res.set('Content-Type', 'application/json');
    try {
      const employees = await db.connection.all(
        `SELECT e.id, e.payroll_number, e.full_name, e.department_id, d.name as department_name
         FROM employees e
         LEFT JOIN departments d ON e.department_id = d.id
         ORDER BY e.full_name`
      );

      res.json({
        success: true,
        employees: employees || []
      });
    } catch (error) {
      console.error('Error searching employees:', error);
      res.status(500).json({
        success: false,
        message: 'Error searching employees',
        error: error.message
      });
    }
  },

  /**
   * API: Get all holidays for date validation
   */
  getHolidaysForValidation: async function(req, res) {
    res.set('Content-Type', 'application/json');
    try {
      let holidays = [];
      try {
        holidays = await db.holidays.findAll();
      } catch (dbError) {
        console.error('Database error in getHolidaysForValidation:', dbError);
        holidays = [];
      }
      
      // Format holidays as simple date array for client-side validation
      const holidayDates = (holidays || []).map(h => {
        // Handle date safely - database might return string or Date
        const dateStr = h.holiday_date || h.date;
        let isoDate = dateStr;
        
        // If it's a full date object or has time component, extract just the date part
        if (dateStr && dateStr.includes('-')) {
          isoDate = dateStr.split('T')[0]; // Handle ISO format dates
        } else if (dateStr) {
          const dateObj = new Date(dateStr);
          isoDate = dateObj.toISOString().split('T')[0];
        }
        
        return {
          date: dateStr,
          isoDate: isoDate,
          name: h.holiday_name || 'Holiday'
        };
      });

      console.log('✅ Returning', holidayDates.length, 'holidays:', holidayDates.map(h => h.isoDate).join(', '));

      res.json({
        success: true,
        holidays: holidayDates
      });
    } catch (error) {
      console.error('Error getting holidays:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching holidays',
        error: error.message
      });
    }
  },

  /**
   * API: Get all active leave types for form dropdown
   */
  getLeaveTypesForForm: async function(req, res) {
    res.set('Content-Type', 'application/json');
    try {
      let leaveTypes = [];
      try {
        leaveTypes = await db.leaveTypes.findAll();
      } catch (dbError) {
        console.error('Database error in getLeaveTypesForForm:', dbError);
        leaveTypes = [];
      }
      
      // Filter only active leave types
      const activeLeaveTypes = (leaveTypes || []).filter(lt => lt.status === 'Active');

      res.json({
        success: true,
        leaveTypes: activeLeaveTypes
      });
    } catch (error) {
      console.error('Error getting leave types:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching leave types',
        error: error.message
      });
    }
  }
};

module.exports = leaveController;