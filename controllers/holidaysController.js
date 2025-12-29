// controllers/holidaysController.js
const holidayRepository = require('../database/repositories/HolidayRepository');
const { db } = require('../database');

// For bulk upload
const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');

class HolidaysController {
  constructor() {
    // Bind all methods
    this.renderHolidaysPage = this.renderHolidaysPage.bind(this);
    this.getAllHolidays = this.getAllHolidays.bind(this);
    this.getHolidayById = this.getHolidayById.bind(this);
    this.createHoliday = this.createHoliday.bind(this);
    this.updateHoliday = this.updateHoliday.bind(this);
    this.deleteHoliday = this.deleteHoliday.bind(this);
    this.searchHolidays = this.searchHolidays.bind(this);
    this.getHolidayStatistics = this.getHolidayStatistics.bind(this);
    this.getUpcomingHolidays = this.getUpcomingHolidays.bind(this);
    this.getHolidaysByYear = this.getHolidaysByYear.bind(this);
    this.getHolidaysByMonth = this.getHolidaysByMonth.bind(this);
    this.getHolidaysByTypeAndYear = this.getHolidaysByTypeAndYear.bind(this);
    this.exportHolidaysToCSV = this.exportHolidaysToCSV.bind(this);
    this.downloadTemplate = this.downloadTemplate.bind(this);
    this.bulkUploadHolidays = this.bulkUploadHolidays.bind(this);
  }

  /**
   * Render holidays page with data - COMPATIBLE WITH Node.js v13
   */
  async renderHolidaysPage(req, res) {
    try {
      // Get user info from database
      const user = await db.connection.get(
        'SELECT email, first_name, last_name FROM users WHERE id = ?', 
        [req.session.userId]
      );
      
      if (!user) {
        req.flash('error_msg', 'User not found');
        return res.redirect('/');
      }
      
      const holidays = await holidayRepository.findAll();
      const upcomingHolidays = await holidayRepository.findUpcoming();
      
      // Get current year holidays count
      const currentYear = new Date().getFullYear();
      const yearHolidays = await holidayRepository.findByYear(currentYear);
      
      // Format dates for display
      const formattedHolidays = holidays.map(function(holiday) {
        const date = new Date(holiday.holiday_date);
        return {
          ...holiday,
          formatted_date: date.toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })
        };
      });

      // Prepare data for calendar
      const calendarEvents = holidays.map(function(holiday) {
        return {
          id: holiday.id,
          title: holiday.holiday_name,
          start: holiday.holiday_date,
          end: holiday.holiday_date,
          className: this.getHolidayTypeClass(holiday.holiday_type),
          description: holiday.description,
          type: holiday.holiday_type,
          allDay: true
        };
      }.bind(this));

      // Render the page with user info
      res.render('holidays', {
        title: 'Holidays & Events',
        holidays: formattedHolidays,
        upcomingHolidays: upcomingHolidays,
        yearHolidays: yearHolidays,
        calendarEvents: JSON.stringify(calendarEvents),
        currentYear: currentYear,
        userFirstName: user.first_name || 'User',
        userLastName: user.last_name || '',
        sessionInfo: {
          totalSeconds: 3600,
          timeRemaining: '1h'
        }
      });
    } catch (error) {
      console.error('Error rendering holidays page:', error);
      res.status(500).render('error', {
        message: 'Failed to load holidays page',
        error: process.env.NODE_ENV === 'development' ? error : {}
      });
    }
  }

  /**
   * Get all holidays (API endpoint)
   */
  async getAllHolidays(req, res) {
    try {
      const holidays = await holidayRepository.findAll();
      
      // Format dates for API response
      const formattedHolidays = holidays.map(function(holiday) {
        const date = new Date(holiday.holiday_date);
        return {
          ...holiday,
          formatted_date: date.toISOString().split('T')[0]
        };
      });
      
      res.json({
        success: true,
        holidays: formattedHolidays,
        count: formattedHolidays.length
      });
    } catch (error) {
      console.error('Error getting all holidays:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch holidays',
        error: error.message
      });
    }
  }

  /**
   * Get holiday by ID
   */
  async getHolidayById(req, res) {
    try {
      const id = req.params.id;
      
      if (!id) {
        return res.status(400).json({
          success: false,
          message: 'Holiday ID is required'
        });
      }

      const holiday = await holidayRepository.findById(id);
      
      if (!holiday) {
        return res.status(404).json({
          success: false,
          message: 'Holiday not found'
        });
      }

      // Format date for frontend
      if (holiday.holiday_date) {
        const date = new Date(holiday.holiday_date);
        holiday.formatted_date = date.toISOString().split('T')[0];
      }

      res.json({
        success: true,
        holiday: holiday
      });
    } catch (error) {
      console.error('Error getting holiday by ID:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch holiday',
        error: error.message
      });
    }
  }

  /**
   * Create new holiday
   */
  async createHoliday(req, res) {
    try {
      const holidayData = req.body;
      const holiday_name = holidayData.holiday_name;
      const holiday_date = holidayData.holiday_date;
      const holiday_type = holidayData.holiday_type;
      const year = holidayData.year;
      const recurring = holidayData.recurring;
      const description = holidayData.description;

      // Validation
      const errors = [];
      if (!holiday_name || holiday_name.trim().length === 0) {
        errors.push('Holiday name is required');
      }
      if (!holiday_date) {
        errors.push('Holiday date is required');
      }
      if (!holiday_type || !['Public Holiday', 'Company Holiday', 'Optional Holiday', 'Special Day'].includes(holiday_type)) {
        errors.push('Valid holiday type is required');
      }
      if (!year || isNaN(parseInt(year))) {
        errors.push('Valid year is required');
      }

      if (errors.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors
        });
      }

      const holidayDataToCreate = {
        holiday_name: holiday_name.trim(),
        holiday_date: holiday_date,
        holiday_type: holiday_type,
        year: parseInt(year),
        recurring: recurring === 'true' || recurring === true || recurring === 1 ? 1 : 0,
        description: description || null,
        created_by: req.session.userId || 1
      };

      const newHoliday = await holidayRepository.create(holidayDataToCreate);
      
      res.status(201).json({
        success: true,
        message: 'Holiday created successfully',
        holidayId: newHoliday.id,
        holiday: newHoliday
      });
    } catch (error) {
      console.error('Error creating holiday:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create holiday',
        error: error.message
      });
    }
  }

  /**
   * Update holiday
   */
  async updateHoliday(req, res) {
    try {
      const id = req.params.id;
      const holidayData = req.body;
      const holiday_name = holidayData.holiday_name;
      const holiday_date = holidayData.holiday_date;
      const holiday_type = holidayData.holiday_type;
      const year = holidayData.year;
      const recurring = holidayData.recurring;
      const description = holidayData.description;

      // Check if holiday exists
      const existingHoliday = await holidayRepository.findById(id);
      if (!existingHoliday) {
        return res.status(404).json({
          success: false,
          message: 'Holiday not found'
        });
      }

      // Validation
      const errors = [];
      if (!holiday_name || holiday_name.trim().length === 0) {
        errors.push('Holiday name is required');
      }
      if (!holiday_date) {
        errors.push('Holiday date is required');
      }
      if (!holiday_type || !['Public Holiday', 'Company Holiday', 'Optional Holiday', 'Special Day'].includes(holiday_type)) {
        errors.push('Valid holiday type is required');
      }
      if (!year || isNaN(parseInt(year))) {
        errors.push('Valid year is required');
      }

      if (errors.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors
        });
      }

      const holidayDataToUpdate = {
        holiday_name: holiday_name.trim(),
        holiday_date: holiday_date,
        holiday_type: holiday_type,
        year: parseInt(year),
        recurring: recurring === 'true' || recurring === true || recurring === 1 ? 1 : 0,
        description: description || null
      };

      const updatedHoliday = await holidayRepository.update(id, holidayDataToUpdate);
      
      if (!updatedHoliday) {
        return res.status(404).json({
          success: false,
          message: 'Holiday not found or could not be updated'
        });
      }

      res.json({
        success: true,
        message: 'Holiday updated successfully',
        holiday: updatedHoliday
      });
    } catch (error) {
      console.error('Error updating holiday:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update holiday',
        error: error.message
      });
    }
  }

  /**
   * Delete holiday
   */
  async deleteHoliday(req, res) {
    try {
      const id = req.params.id;
      
      if (!id) {
        return res.status(400).json({
          success: false,
          message: 'Holiday ID is required'
        });
      }

      const deleted = await holidayRepository.delete(id);
      
      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: 'Holiday not found'
        });
      }

      res.json({
        success: true,
        message: 'Holiday deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting holiday:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete holiday',
        error: error.message
      });
    }
  }

  /**
   * Search holidays
   */
  async searchHolidays(req, res) {
    try {
      const query = req.query.query;
      
      if (!query || query.trim().length < 2) {
        return res.json({
          success: true,
          holidays: [],
          count: 0
        });
      }

      const results = await holidayRepository.search(query.trim());
      
      res.json({
        success: true,
        holidays: results,
        count: results.length
      });
    } catch (error) {
      console.error('Error searching holidays:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to search holidays',
        error: error.message
      });
    }
  }

  /**
   * Get holiday statistics
   */
  async getHolidayStatistics(req, res) {
    try {
      const statistics = await holidayRepository.getStatistics();
      
      res.json({
        success: true,
        statistics: statistics
      });
    } catch (error) {
      console.error('Error getting holiday statistics:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch holiday statistics',
        error: error.message
      });
    }
  }

  /**
   * Get upcoming holidays
   */
  async getUpcomingHolidays(req, res) {
    try {
      const holidays = await holidayRepository.findUpcoming();
      
      res.json({
        success: true,
        holidays: holidays,
        count: holidays.length
      });
    } catch (error) {
      console.error('Error getting upcoming holidays:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch upcoming holidays',
        error: error.message
      });
    }
  }

  /**
   * Get holidays by year
   */
  async getHolidaysByYear(req, res) {
    try {
      const year = req.params.year;
      
      if (!year || isNaN(parseInt(year))) {
        return res.status(400).json({
          success: false,
          message: 'Valid year is required'
        });
      }

      const holidays = await holidayRepository.findByYear(parseInt(year));
      
      res.json({
        success: true,
        holidays: holidays,
        count: holidays.length,
        year: parseInt(year)
      });
    } catch (error) {
      console.error('Error getting holidays by year:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch holidays by year',
        error: error.message
      });
    }
  }

  /**
   * Get holidays by month
   */
  async getHolidaysByMonth(req, res) {
    try {
      const yearMonth = req.params.yearMonth;
      
      if (!yearMonth || !/^\d{4}-\d{2}$/.test(yearMonth)) {
        return res.status(400).json({
          success: false,
          message: 'Valid year-month format is required (YYYY-MM)'
        });
      }

      const holidays = await holidayRepository.findByMonth(yearMonth);
      
      res.json({
        success: true,
        holidays: holidays,
        count: holidays.length,
        yearMonth: yearMonth
      });
    } catch (error) {
      console.error('Error getting holidays by month:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch holidays by month',
        error: error.message
      });
    }
  }

  /**
   * Get holidays by type and year
   */
  async getHolidaysByTypeAndYear(req, res) {
    try {
      const type = req.params.type;
      const year = req.params.year;
      
      if (!type || !['Public Holiday', 'Company Holiday', 'Optional Holiday', 'Special Day'].includes(type)) {
        return res.status(400).json({
          success: false,
          message: 'Valid holiday type is required'
        });
      }

      if (!year || isNaN(parseInt(year))) {
        return res.status(400).json({
          success: false,
          message: 'Valid year is required'
        });
      }

      const holidays = await holidayRepository.findByTypeAndYear(type, parseInt(year));
      
      res.json({
        success: true,
        holidays: holidays,
        count: holidays.length,
        type: type,
        year: parseInt(year)
      });
    } catch (error) {
      console.error('Error getting holidays by type and year:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch holidays by type and year',
        error: error.message
      });
    }
  }

  /**
   * Helper method to get CSS class for holiday type
   */
  getHolidayTypeClass(type) {
    const typeClasses = {
      'Public Holiday': 'bg-success text-white',
      'Company Holiday': 'bg-info text-white',
      'Optional Holiday': 'bg-warning text-dark',
      'Special Day': 'bg-secondary text-white'
    };
    return typeClasses[type] || 'bg-primary text-white';
  }

  /**
   * Export holidays to CSV
   */
  async exportHolidaysToCSV(req, res) {
    try {
      const holidays = await holidayRepository.findAll();
      
      // Create CSV headers
      const headers = ['ID', 'Holiday Name', 'Date', 'Type', 'Year', 'Recurring', 'Description', 'Created At'];
      
      // Create CSV rows
      const rows = holidays.map(function(holiday) {
        const date = new Date(holiday.holiday_date);
        return [
          holiday.id,
          '"' + holiday.holiday_name + '"',
          date.toISOString().split('T')[0],
          holiday.holiday_type,
          holiday.year,
          holiday.recurring ? 'Yes' : 'No',
          '"' + (holiday.description || '') + '"',
          holiday.created_at
        ];
      });

      const csvContent = [
        headers.join(','),
        ...rows.map(function(row) { return row.join(','); })
      ].join('\n');

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=holidays_export.csv');
      res.send(csvContent);
    } catch (error) {
      console.error('Error exporting holidays:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to export holidays'
      });
    }
  }

  /**
   * Download holidays CSV template
   */
  async downloadTemplate(req, res) {
    try {
      const template = `holiday_name,holiday_date,holiday_type,year,recurring,description
New Year's Day,2024-01-01,Public Holiday,2024,1,First day of the year
Good Friday,2024-03-29,Public Holiday,2024,0,Christian holiday
Easter Monday,2024-04-01,Public Holiday,2024,0,Christian holiday
Labour Day,2024-05-01,Public Holiday,2024,1,International Workers' Day
Madaraka Day,2024-06-01,Public Holiday,2024,1,Kenya's self-governance day
Company Anniversary,2024-07-15,Company Holiday,2024,1,Company founding day
Optional Holiday,2024-08-12,Optional Holiday,2024,0,Optional day off
Christmas Day,2024-12-25,Public Holiday,2024,1,Christmas celebration
Boxing Day,2024-12-26,Public Holiday,2024,1,Day after Christmas
Special Event,2024-10-10,Special Day,2024,0,Company special event

# Instructions:
# 1. Required fields: holiday_name, holiday_date, holiday_type, year
# 2. Optional fields: recurring, description
# 3. holiday_type: Public Holiday, Company Holiday, Optional Holiday, Special Day
# 4. recurring: 0 (no) or 1 (yes)
# 5. holiday_date: YYYY-MM-DD format
# 6. year: must match the year in holiday_date
# 7. Remove this instruction row before uploading`;

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=holidays_template.csv');
      res.send(template);
    } catch (error) {
      console.error('Error downloading template:', error);
      res.status(500).json({
        success: false,
        message: 'Error downloading template'
      });
    }
  }

  /**
   * Bulk upload holidays from CSV
   */
  async bulkUploadHolidays(req, res) {
    try {
      // Check if file was uploaded
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No CSV file uploaded'
        });
      }

      // Read the uploaded file
      const filePath = req.file.path;
      const csvData = fs.readFileSync(filePath, 'utf8');

      // Parse CSV
      const results = Papa.parse(csvData, {
        header: true,
        skipEmptyLines: true,
        transformHeader: function(header) {
          if (!header) return '';
          return header.trim().toLowerCase().replace(/\s+/g, '_');
        }
      });

      if (results.errors && results.errors.length > 0) {
        // Clean up uploaded file
        fs.unlinkSync(filePath);
        
        return res.status(400).json({
          success: false,
          message: 'CSV parsing error',
          errors: results.errors
        });
      }

      const holidays = results.data || [];
      const totalRecords = holidays.length;
      
      if (totalRecords === 0) {
        fs.unlinkSync(filePath);
        return res.status(400).json({
          success: false,
          message: 'CSV file is empty'
        });
      }

      // Validate required columns
      const requiredColumns = ['holiday_name', 'holiday_date', 'holiday_type', 'year'];
      const csvHeaders = Object.keys(holidays[0] || {});
      
      for (const column of requiredColumns) {
        if (!csvHeaders.includes(column)) {
          fs.unlinkSync(filePath);
          return res.status(400).json({
            success: false,
            message: 'Missing required column: ' + column + '. Please use the template file.'
          });
        }
      }

      const processedResults = {
        success: [],
        failed: [],
        total: totalRecords
      };

      // Get all existing holidays for duplicate check
      const allHolidays = await holidayRepository.findAll();
      
      // Process each record
      for (let index = 0; index < holidays.length; index++) {
        const record = holidays[index];
        try {
          // Skip empty rows
          if (!record.holiday_name && !record.holiday_date && !record.holiday_type && !record.year) {
            continue;
          }

          // Validate record
          if (!record.holiday_name || !record.holiday_date || !record.holiday_type || !record.year) {
            throw new Error('Missing required fields: holiday_name, holiday_date, holiday_type, and year are required');
          }

          // Validate holiday_type
          const validTypes = ['Public Holiday', 'Company Holiday', 'Optional Holiday', 'Special Day'];
          if (!validTypes.includes(record.holiday_type)) {
            throw new Error('Invalid holiday_type. Must be one of: ' + validTypes.join(', '));
          }

          // Validate year
          const year = parseInt(record.year);
          if (isNaN(year) || year < 2000 || year > 2100) {
            throw new Error('year must be a valid year between 2000 and 2100');
          }

          // Validate date format (YYYY-MM-DD)
          const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
          if (!dateRegex.test(record.holiday_date)) {
            throw new Error('holiday_date must be in YYYY-MM-DD format');
          }

          // Check if date is valid
          const holidayDate = new Date(record.holiday_date);
          if (isNaN(holidayDate.getTime())) {
            throw new Error('Invalid date');
          }

          // Check if year matches date year
          if (holidayDate.getFullYear() !== year) {
            throw new Error('Year in holiday_date does not match the year field');
          }

          // Convert recurring to 0 or 1
          let recurring = 0;
          if (record.recurring !== undefined && record.recurring !== null && record.recurring !== '') {
            const recurringStr = record.recurring.toString().toLowerCase();
            if (recurringStr === '1' || recurringStr === 'true' || recurringStr === 'yes') {
              recurring = 1;
            }
          }

          // Prepare holiday data
          const holidayData = {
            holiday_name: record.holiday_name.toString().trim(),
            holiday_date: record.holiday_date,
            holiday_type: record.holiday_type,
            year: year,
            recurring: recurring,
            description: record.description || '',
            created_by: req.session.userId || 1
          };

          // Check for duplicate holiday (same name and date)
          let duplicate = false;
          for (let i = 0; i < allHolidays.length; i++) {
            const h = allHolidays[i];
            if (h.holiday_name.toLowerCase() === holidayData.holiday_name.toLowerCase() && 
                h.holiday_date === holidayData.holiday_date) {
              duplicate = true;
              break;
            }
          }

          if (duplicate) {
            throw new Error('Holiday \'' + holidayData.holiday_name + '\' on ' + holidayData.holiday_date + ' already exists');
          }

          // Create holiday
          const newHoliday = await holidayRepository.create(holidayData);
          
          processedResults.success.push({
            row: index + 2, // +2 because of header row and 0-index
            data: holidayData,
            result: newHoliday
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
        message: 'Bulk upload completed. Success: ' + successCount + ', Failed: ' + failedCount,
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
  }
}

module.exports = new HolidaysController();