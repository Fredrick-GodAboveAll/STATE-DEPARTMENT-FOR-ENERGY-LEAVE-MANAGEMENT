// =============================================
// LEAVE MANAGEMENT CONTROLLER - COMPLETE FIXED
// =============================================

const { 
  getAllLeaveTypes,
  getAllHolidays,
  getUpcomingHolidays,
  getHolidaysByYear,
  getHolidayById,
  db  // ADD THIS IMPORT
} = require('../database');

const leaveController = {
  /**
   * Display leave types management page
   */
  getLeaveTypes: async function(req, res) {
    try {
      db.get('SELECT email, first_name, last_name FROM users WHERE id = ?', [req.session.userId], async function(err, user) {
        if (err || !user) {
          req.flash('error_msg', 'User not found');
          return res.redirect('/');
        }
        
        const leaveTypes = await getAllLeaveTypes();
        
        res.render('dashboard/leave_types', {
          activeShow: 'leave_types',
          activePage: 'leave_types',
          userFirstName: user.first_name,
          userLastName: user.last_name,
          userEmail: user.email,
          leaveTypes: leaveTypes,
          totalLeaveTypes: leaveTypes.length,
          activeLeaveTypes: leaveTypes.filter(lt => lt.status === 'Active').length
        });
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
      db.get('SELECT email, first_name, last_name FROM users WHERE id = ?', [req.session.userId], async function(err, user) {
        if (err || !user) {
          req.flash('error_msg', 'User not found');
          return res.redirect('/');
        }
        
        // Fetch all holidays and upcoming holidays
        const allHolidays = await getAllHolidays();
        const upcomingHolidays = await getUpcomingHolidays();
        const currentYear = new Date().getFullYear();
        const currentYearHolidays = await getHolidaysByYear(currentYear);
        
        // Format dates for display
        const formattedHolidays = allHolidays.map(function(holiday) {
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
        });
        
        // Group holidays by month for better display
        const holidaysByMonth = formattedHolidays.reduce(function(acc, holiday) {
          const month = new Date(holiday.holiday_date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
          if (!acc[month]) {
            acc[month] = [];
          }
          acc[month].push(holiday);
          return acc;
        }, {});
        
        res.render('leave_management/holidays', {
          activeShow: 'leave_types',
          activePage: 'holidays',
          userFirstName: user.first_name,
          userLastName: user.last_name,
          userEmail: user.email,
          holidays: formattedHolidays,
          upcomingHolidays: upcomingHolidays,
          currentYearHolidays: currentYearHolidays,
          holidaysByMonth: holidaysByMonth,
          totalHolidays: formattedHolidays.length,
          currentYear: currentYear
        });
      });
    } catch (error) {
      console.error('Error fetching holidays:', error);
      req.flash('error_msg', 'Error loading holidays data');
      res.redirect('/dashboard');
    }
  }
};

module.exports = leaveController;