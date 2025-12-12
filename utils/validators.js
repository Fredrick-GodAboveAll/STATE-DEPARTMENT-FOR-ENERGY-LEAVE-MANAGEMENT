// This file contains validation functions
// Purpose: Reusable validation logic across the application

const validators = {
  // Validate email format
  isValidEmail: function(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Validate password strength
  isValidPassword: function(password) {
    return password.length >= 8 &&
           /[A-Z]/.test(password) &&
           /[a-z]/.test(password) &&
           /\d/.test(password);
  },

  // Validate name (letters, spaces, hyphens, apostrophes)
  isValidName: function(name) {
    return /^[A-Za-z\s'-]{2,50}$/.test(name);
  },

  // Validate date format YYYY-MM-DD
  isValidDate: function(dateString) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) return false;
    
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
  },

  // Validate payroll number format
  isValidPayrollNumber: function(payroll) {
    // Example: ABC-12345
    return /^[A-Z]{3}-\d{5}$/.test(payroll);
  },

  // Validate ID number (Kenyan ID example)
  isValidIdNumber: function(idNumber) {
    // Kenyan ID: 8 digits
    return /^\d{8}$/.test(idNumber);
  },

  // Validate phone number (Kenyan format)
  isValidPhone: function(phone) {
    // Kenyan phone: +254712345678 or 0712345678
    return /^(?:\+254|0)[17]\d{8}$/.test(phone);
  }
};

module.exports = validators;