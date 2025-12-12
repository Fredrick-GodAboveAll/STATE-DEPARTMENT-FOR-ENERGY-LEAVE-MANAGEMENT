// This file handles email configuration
// Purpose: Separate email setup from main application logic

const nodemailer = require('nodemailer');
const constants = require('./constants');

// Create email transporter
const transporter = nodemailer.createTransport({
  ...constants.EMAIL_CONFIG,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

// Test email connection on startup
transporter.verify(function(error, success) {
  if (error) {
    console.log('Email connection error:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

module.exports = transporter;