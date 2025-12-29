// database/schemas/index.js
const userSchema = require('./user.schema');
const holidaySchema = require('./holiday.schema');
const leavetypeSchema = require('./leavetype.schema');
const employeeSchema = require('./employee.schema');
const resetSchema = require('./reset.schema');
const departmentSchema = require('./department.schema');  // Add this line

module.exports = {
    user: userSchema,
    holiday: holidaySchema,
    leavetype: leavetypeSchema,
    employee: employeeSchema,
    reset: resetSchema,
    department: departmentSchema  // Add this line
};