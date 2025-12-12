// This file handles all email sending functionality
// Purpose: Separate email logic from controllers

const transporter = require('../config/email.config');
const constants = require('../config/constants');

const emailService = {
  // Send password reset email
  sendResetEmail: function(email, resetLink) {
    const mailOptions = {
      from: `"${constants.APP_NAME}" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Password Reset Request',
      text: `You requested a password reset. Use this link within 1 hour:\n\n${resetLink}\n\nIf you didn't request this, please ignore this email.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff8f1; border-radius: 8px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h2 style="color: #333;">Password Reset Request</h2>
          </div>
          <p>Hello,</p>
          <p>You requested to reset your password for ${constants.APP_NAME}. Click the button below to proceed:</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" 
               style="display: inline-block; padding: 12px 24px; background-color: #fc0038; color: white; text-decoration: none; border-radius: 4px; font-weight: bold;">
              Reset Password
            </a>
          </div>
          
          <p>Or copy and paste this URL into your browser:</p>
          <p style="word-break: break-all; background-color: #f8f9fa; padding: 10px; border-radius: 4px;">
            ${resetLink}
          </p>
          
          <p style="margin-top: 30px; font-size: 0.9em; color: #666;">
            <strong>Security notice:</strong> This link expires in 1 hour. If you didn't request this, 
            your account might be compromised - please contact support immediately.
          </p>
          
          <p style="margin-top: 20px; font-size: 0.8em; color: #999;">
            This is an automated message from ${constants.APP_NAME}.
          </p>
        </div>
      `
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.error('Error sending reset email:', error);
      } else {
        console.log('Reset email sent:', info.response);
      }
    });
  },

  // Send leave approval notification (for future use)
  sendLeaveNotification: function(email, leaveDetails) {
    // Implementation for leave notifications
    console.log('Leave notification would be sent to:', email);
  },

  // Send holiday announcement (for future use)
  sendHolidayAnnouncement: function(email, holidayDetails) {
    // Implementation for holiday announcements
    console.log('Holiday announcement would be sent to:', email);
  }
};

module.exports = emailService;