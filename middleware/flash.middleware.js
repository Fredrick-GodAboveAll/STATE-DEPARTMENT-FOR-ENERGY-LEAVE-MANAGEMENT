// This file handles flash messages for success/error notifications
// Purpose: Centralize flash message handling across all routes

function flashMessages(req, res, next) {
  // Initialize toasts array for all views
  res.locals.toasts = [];
  
  // Process success messages
  const successMessages = req.flash('success_msg');
  if (successMessages.length) {
    successMessages.forEach(function(msg) {
      res.locals.toasts.push({ type: 'success', message: msg });
    });
  }
  
  // Process error messages
  const errorMessages = req.flash('error_msg');
  if (errorMessages.length) {
    errorMessages.forEach(function(msg) {
      res.locals.toasts.push({ type: 'danger', message: msg });
    });
  }
  
  // Process warning messages (if you add them later)
  const warningMessages = req.flash('warning_msg');
  if (warningMessages.length) {
    warningMessages.forEach(function(msg) {
      res.locals.toasts.push({ type: 'warning', message: msg });
    });
  }
  
  // Process info messages (if you add them later)
  const infoMessages = req.flash('info_msg');
  if (infoMessages.length) {
    infoMessages.forEach(function(msg) {
      res.locals.toasts.push({ type: 'info', message: msg });
    });
  }
  
  next();
}

module.exports = flashMessages;