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
          
          res.render('dashboard/leave_types', {
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

      // Check if another leave type has the same name (excluding current one)
      const allLeaveTypes = await db.leaveTypes.findAll();
      const duplicate = allLeaveTypes.find(
        lt => lt.id !== parseInt(id) && 
              lt.leave_name.toLowerCase() === leave_name.toLowerCase()
      );
      
      if (duplicate) {
        return res.status(400).json({
          success: false,
          message: 'Another leave type with this name already exists'
        });
      }

      const updatedLeaveType = await db.leaveTypes.update(id, {
        leave_name: leave_name.trim(),
        color: color || 'primary',
        entitled_days: parseInt(entitled_days),
        gender_restriction: gender_restriction || 'All',
        description: description || '',
        status: status || 'Active'
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

  /**
   * NEW: Download CSV template
   */
  downloadTemplate: function(req, res) {
    try {
      const template = `leave_name,color,entitled_days,gender_restriction,description,status
Annual Leave,primary,21,All,Annual leave with pay,Active
Sick Leave,success,14,All,Sick leave with pay,Active
Maternity Leave,danger,180,Female,Maternity leave,Active
Paternity Leave,warning,7,Male,Paternity leave,Active
Casual Leave,info,7,All,Casual leave,Active
Bereavement Leave,secondary,3,All,Bereavement leave,Active

# Instructions:
# 1. Required fields: leave_name, entitled_days
# 2. Optional fields: color, gender_restriction, description, status
# 3. gender_restriction: All, Male, Female, Other, or None
# 4. status: Active, Inactive, or Archived
# 5. entitled_days must be a number (0 or greater)
# 6. Remove this instruction row before uploading`;

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
  }
};

module.exports = leaveController;