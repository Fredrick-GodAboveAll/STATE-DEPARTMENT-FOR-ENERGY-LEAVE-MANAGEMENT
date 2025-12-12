// This file contains all constant values used across the application
// Purpose: Centralize configuration values for easy management

module.exports = {
  // Application settings
  APP_NAME: 'Leave Management System',
  APP_VERSION: '1.0.0',
  PORT: process.env.PORT || 3000,
  
  // Session settings
  SESSION_SECRET: process.env.SESSION_SECRET || 'your-secret-key-change-in-production',
  SESSION_MAX_AGE: 24 * 60 * 60 * 1000, // 24 hours
  
  // Email settings
  EMAIL_CONFIG: {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true
  },
  
  // Leave settings
  MAX_LEAVE_DAYS: 30,
  MIN_LEAVE_NOTICE_DAYS: 3,
  
  // Employee settings
  EMPLOYMENT_STATUSES: ['Permanent', 'Contract', 'Probation', 'Intern'],
  JOB_GROUPS: ['A', 'B', 'C', 'D', 'E'],
  
  // File upload settings
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_FILE_TYPES: ['image/jpeg', 'image/png', 'application/pdf']
};