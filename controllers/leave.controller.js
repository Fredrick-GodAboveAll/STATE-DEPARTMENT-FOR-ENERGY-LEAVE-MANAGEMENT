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
  }
};

module.exports = leaveController;