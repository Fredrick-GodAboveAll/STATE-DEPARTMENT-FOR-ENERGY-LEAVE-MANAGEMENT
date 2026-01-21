// controllers/employee.controller.js
const { db } = require('../database');
const fs = require('fs');
const csv = require('csv-parser');

const employeeController = {
  /**
   * Display employee list page
   */
  getEmployees: async function(req, res) {
    try {
      const user = await db.users.findById(req.session.userId);
      
      if (!user) {
        req.flash('error_msg', 'User not found');
        return res.redirect('/');
      }
      
      const employees = await db.employees.findAll();
      const statistics = await db.employees.getStatistics();
      const departments = await db.departments.findAll(); // NEW: Get departments for dropdown
      
      const totalEmployees = employees ? employees.length : 0;
      const activeEmployees = employees ? employees.filter(emp => emp.status && emp.status.includes('Active')).length : 0;
      const retiredEmployees = employees ? employees.filter(emp => emp.status && emp.status.includes('Retired')).length : 0;
      const inactiveEmployees = employees ? employees.filter(emp => emp.status && emp.status.includes('Inactive')).length : 0;
      const unassignedEmployees = employees ? employees.filter(emp => emp.department_id === null || emp.department_name === null).length : 0;
      
      const employmentStats = {};
      if (employees) {
        employees.forEach(emp => {
          const status = emp.employment_status || 'Unassigned';
          employmentStats[status] = (employmentStats[status] || 0) + 1;
        });
      }
      
      const employmentPercentages = {};
      Object.keys(employmentStats).forEach(status => {
        employmentPercentages[status] = Math.round((employmentStats[status] / totalEmployees) * 100);
      });
      
      const genderStats = {
        male: employees ? employees.filter(emp => emp.gender === 'M').length : 0,
        female: employees ? employees.filter(emp => emp.gender === 'F').length : 0
      };
      
      // NEW: Department distribution
      const departmentStats = {};
      if (employees) {
        employees.forEach(emp => {
          const deptName = emp.department_name || 'Unassigned';
          departmentStats[deptName] = (departmentStats[deptName] || 0) + 1;
        });
      }
      
      res.render('employees/register', {
        activeShow: 'employees',
        activePage: 'register',
        userFirstName: user.first_name,
        userLastName: user.last_name,
        userEmail: user.email,
        employees: employees || [],
        departments: departments || [], // NEW: Pass departments to view
        totalEmployees,
        activeEmployees,
        retiredEmployees,
        inactiveEmployees,
        unassignedEmployees, // NEW
        employmentStats,
        employmentPercentages,
        genderStats,
        departmentStats, // NEW
        statistics: statistics || {}
      });
    } catch (error) {
      console.error('Error fetching employees:', error);
      req.flash('error_msg', 'Error loading employee data');
      res.redirect('/dashboard');
    }
  },

  /**
   * Display department assignment page
   */
  getDepartmentAssignments: async function(req, res) {
    try {
      const user = await db.users.findById(req.session.userId);
      
      if (!user) {
        req.flash('error_msg', 'User not found');
        return res.redirect('/');
      }
      
      // Get all employees with departments
      const employees = await db.employees.findAll();
      
      // Get unassigned employees
      const unassignedEmployees = await db.employees.getUnassignedEmployees();
      
      // Get department statistics
      const departmentStats = await db.employees.getDepartmentStats();
      
      // Get all departments for dropdowns
      const departments = await db.departments.findAll();
      
      // Calculate statistics
      const totalEmployees = employees ? employees.length : 0;
      const assignedCount = employees ? employees.filter(emp => emp.department_id !== null).length : 0;
      const unassignedCount = employees ? employees.filter(emp => emp.department_id === null).length : 0;
      
      res.render('employees/employee-departments', {
        activeShow: 'employees',
        activePage: 'employee-departments',
        userFirstName: user.first_name,
        userLastName: user.last_name,
        userEmail: user.email,
        employees: employees || [],
        unassignedEmployees: unassignedEmployees || [],
        departmentStats: departmentStats || [],
        departments: departments || [],
        totalEmployees,
        assignedCount,
        unassignedCount,
        assignedPercentage: totalEmployees > 0 ? Math.round((assignedCount / totalEmployees) * 100) : 0,
        unassignedPercentage: totalEmployees > 0 ? Math.round((unassignedCount / totalEmployees) * 100) : 0
      });
    } catch (error) {
      console.error('Error loading department assignments:', error);
      req.flash('error_msg', 'Error loading department assignments');
      res.redirect('/dashboard');
    }
  },

  /**
   * Update employee department (API endpoint)
   */
  updateEmployeeDepartment: async function(req, res) {
    try {
      const user = await db.users.findById(req.session.userId);
      
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'User not found'
        });
      }
      
      const { id } = req.params;
      const { department_id } = req.body;
      
      if (!id) {
        return res.status(400).json({
          success: false,
          message: 'Employee ID is required'
        });
      }
      
      // Convert department_id to null if it's "null" or empty
      const deptId = department_id === "null" || department_id === "" ? null : parseInt(department_id);
      
      // Update the department
      const success = await db.employees.updateDepartment(id, deptId);
      
      if (success) {
        // Get updated employee data
        const employee = await db.employees.findById(id);
        
        res.json({
          success: true,
          message: 'Department updated successfully',
          employee
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'Employee not found'
        });
      }
    } catch (error) {
      console.error('Error updating employee department:', error);
      res.status(500).json({
        success: false,
        message: 'Error updating department',
        error: error.message
      });
    }
  },

  /**
   * Bulk update employee departments (API endpoint)
   */
  bulkUpdateDepartments: async function(req, res) {
    try {
      const user = await db.users.findById(req.session.userId);
      
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'User not found'
        });
      }
      
      const { employee_ids, department_id } = req.body;
      
      if (!employee_ids || !Array.isArray(employee_ids) || employee_ids.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'No employees selected'
        });
      }
      
      if (!department_id && department_id !== null) {
        return res.status(400).json({
          success: false,
          message: 'Department ID is required'
        });
      }
      
      // Convert department_id to null if it's "null" or empty
      const deptId = department_id === "null" || department_id === "" ? null : parseInt(department_id);
      
      // Bulk update departments
      const result = await db.employees.bulkUpdateDepartments(employee_ids, deptId);
      
      res.json({
        success: true,
        message: `Updated ${result.successCount} employees successfully`,
        result
      });
    } catch (error) {
      console.error('Error bulk updating departments:', error);
      res.status(500).json({
        success: false,
        message: 'Error bulk updating departments',
        error: error.message
      });
    }
  },

  /**
   * Display add employee form page
   */
  getAddEmployee: async function(req, res) {
    try {
      const user = await db.users.findById(req.session.userId);
      
      if (!user) {
        req.flash('error_msg', 'User not found');
        return res.redirect('/');
      }
      
      // NEW: Get departments for dropdown
      const departments = await db.departments.findAll();
      
      res.render('employees/add-employee', {
        activeShow: 'employees',
        activePage: 'add-employees',
        userFirstName: user.first_name,
        userLastName: user.last_name,
        userEmail: user.email,
        departments: departments || [] // NEW: Pass departments to view
      });
    } catch (error) {
      console.error('Error fetching user for add employee:', error);
      req.flash('error_msg', 'Error loading page');
      res.redirect('/dashboard');
    }
  },

    /**
   * Display add employee-department page
   */

 getEmployeeDepartment: async function(req, res) {
  try {
    const user = await db.users.findById(req.session.userId);
    
    if (!user) {
      req.flash('error_msg', 'User not found');
      return res.redirect('/');
    }
    
    // FETCH THE DATA:
    const employees = await db.employees.findAll();
    const departments = await db.departments.findAll();
    const unassignedCount = employees.filter(e => !e.department_id).length;
    
    res.render('employees/employee-departments', {
      activeShow: 'employees',
      activePage: 'employee-departments',
      userFirstName: user.first_name,
      userLastName: user.last_name,
      userEmail: user.email,
      employees: employees || [],
      departments: departments || [],
      unassignedCount: unassignedCount,
      totalEmployees: employees.length
    });
  } catch (error) {
    console.error('Error loading department page:', error);
    req.flash('error_msg', 'Error loading page');
    res.redirect('/dashboard');
  }
},

  
  /**
   * Display bulk employee centralized upload page
   */
  getEmployeeBulk: async function(req, res) {
    try {
      const user = await db.users.findById(req.session.userId);
      
      if (!user) {
        req.flash('error_msg', 'User not found');
        return res.redirect('/');
      }
      
      // NEW: Get departments for dropdown in bulk upload
      const departments = await db.departments.findAll();
      
      res.render('employees/employee-bulk', {
        activeShow: 'employee-bulk',
        activePage: 'employee-bulk',
        userFirstName: user.first_name,
        userLastName: user.last_name,
        userEmail: user.email,
        departments: departments || [] // NEW: Pass departments to view
      });
    } catch (error) {
      console.error('Error fetching user for bulk upload:', error);
      req.flash('error_msg', 'Error loading page');
      res.redirect('/dashboard');
    }
  },

  /**
   * Download employee CSV template - UPDATED with department_id
   */
  downloadEmployeeTemplate: async function(req, res) {
    try {
      const user = await db.users.findById(req.session.userId);
      
      if (!user) {
        req.flash('error_msg', 'User not found');
        return res.redirect('/');
      }
      
      // Get departments for template
      const departments = await db.departments.findAll();
      
      const template = `payroll_number,full_name,id_number,gender,age,designation,job_group,status,retirement_date,employment_status,department_id
19337,MR JULIUS ODHIAMBO MBOGAH,11684,M,63,Deputy Director - HRM & Development,R,0 - Active,04/11/2026,Permanent,
19338,JANE WANGUI KAMAU,11685,F,45,Senior HR Officer,S,0 - Active,15/08/2030,Permanent,
19339,PETER OMONDI OTIENO,11686,M,52,Finance Manager,T,0 - Active,22/05/2028,Contract,

# Available department IDs:
${departments.map(dept => `# ${dept.id}: ${dept.name} (${dept.code})`).join('\n')}

# Instructions:
# 1. Required columns: payroll_number, full_name, id_number, gender, age, designation
# 2. Optional columns: job_group, status, retirement_date, employment_status, department_id
# 3. payroll_number and id_number must be unique and numeric
# 4. gender must be M or F
# 5. age must be between 18 and 120
# 6. retirement_date must be in DD/MM/YYYY format
# 7. status format: "0 - Active", "1 - Inactive", "2 - Retired"
# 8. employment_status: Permanent, Contract, Probation, Temporary
# 9. department_id: Use the ID from the departments list above (leave empty for unassigned)
# 10. Remove this instruction row before uploading`;

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=employee_template.csv');
      res.send(template);
    } catch (error) {
      console.error('Error downloading template:', error);
      req.flash('error_msg', 'Error downloading template');
      res.redirect('/employee/employee-bulk');
    }
  },

  /**
   * Bulk upload employees from CSV - UPDATED for department_id
   */
  bulkUploadEmployees: async function(req, res) {
    try {
      const user = await db.users.findById(req.session.userId);
      
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'User not found'
        });
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No CSV file uploaded'
        });
      }

      // Read the CSV file line by line
      const csvData = await new Promise((resolve, reject) => {
        const rows = [];
        const fileContent = fs.readFileSync(req.file.path, 'utf8');
        const lines = fileContent.split('\n');
        
        for (const line of lines) {
          const trimmedLine = line.trim();
          // Skip empty lines and comment lines
          if (!trimmedLine || trimmedLine.startsWith('#')) {
            continue;
          }
          
          // Parse CSV line
          const columns = trimmedLine.split(',').map(col => col.trim());
          
          // Check if this might be a header row
          if (columns[0] === 'payroll_number' || 
              columns[1] === 'full_name' || 
              columns[2] === 'id_number') {
            continue; // Skip header row
          }
          
          // We need at least 6 required columns (department_id is optional)
          if (columns.length >= 6) {
            const row = {
              payroll_number: columns[0] || '',
              full_name: columns[1] || '',
              id_number: columns[2] || '',
              gender: columns[3] || '',
              age: columns[4] || '',
              designation: columns[5] || '',
              job_group: columns[6] || '',
              status: columns[7] || '',
              retirement_date: columns[8] || '',
              employment_status: columns[9] || '',
              department_id: columns[10] || '' // NEW: department_id
            };
            rows.push(row);
          }
        }
        resolve(rows);
      });

      if (csvData.length === 0) {
        fs.unlinkSync(req.file.path);
        return res.status(400).json({
          success: false,
          message: 'CSV file is empty or contains no valid data'
        });
      }

      const processedResults = {
        success: [],
        failed: [],
        total: csvData.length
      };

      // Get all existing employees for duplicate check
      const allEmployees = await db.employees.findAll();
      
      // Process each record
      for (let index = 0; index < csvData.length; index++) {
        const record = csvData[index];
        try {
          // Skip if all required fields are empty
          if (!record.payroll_number && !record.full_name && !record.id_number) {
            continue;
          }

          // Validate required fields
          if (!record.payroll_number) {
            throw new Error('payroll_number is required');
          }
          if (!record.full_name) {
            throw new Error('full_name is required');
          }
          if (!record.id_number) {
            throw new Error('id_number is required');
          }
          if (!record.gender) {
            throw new Error('gender is required');
          }
          if (!record.age) {
            throw new Error('age is required');
          }
          if (!record.designation) {
            throw new Error('designation is required');
          }

          // Validate payroll number (numeric)
          if (!/^\d+$/.test(record.payroll_number.toString().trim())) {
            throw new Error(`payroll_number must be numeric`);
          }

          // Validate ID number (numeric)
          if (!/^\d+$/.test(record.id_number.toString().trim())) {
            throw new Error(`id_number must be numeric`);
          }

          // Validate gender
          const gender = record.gender.toString().toUpperCase();
          if (!['M', 'F'].includes(gender)) {
            throw new Error(`gender must be M or F`);
          }

          // Validate age
          const age = parseInt(record.age);
          if (isNaN(age) || age < 18 || age > 120) {
            throw new Error(`age must be a number between 18 and 120`);
          }

          // Validate department_id if provided
          let departmentId = null;
          if (record.department_id && record.department_id.toString().trim() !== '') {
            const deptId = parseInt(record.department_id.toString().trim());
            if (isNaN(deptId) || deptId < 1) {
              throw new Error(`department_id must be a positive number`);
            }
            
            // Check if department exists
            const department = await db.departments.findById(deptId);
            if (!department) {
              throw new Error(`Department with ID ${deptId} does not exist`);
            }
            
            departmentId = deptId;
          }

          // Check for duplicate payroll number in database
          const existingByPayroll = allEmployees.find(emp => 
            emp.payroll_number === record.payroll_number.toString().trim()
          );
          if (existingByPayroll) {
            throw new Error(`Duplicate payroll number: ${record.payroll_number}`);
          }

          // Check for duplicate ID number in database
          const existingById = allEmployees.find(emp => 
            emp.id_number === record.id_number.toString().trim()
          );
          if (existingById) {
            throw new Error(`Duplicate ID number: ${record.id_number}`);
          }

          // Parse status from "0 - Active" to "Active"
          let status = 'Active';
          if (record.status && record.status.toString().trim() !== '') {
            const statusStr = record.status.toString().trim();
            if (statusStr.includes('-')) {
              const statusParts = statusStr.split('-');
              status = statusParts.length > 1 ? statusParts[1].trim() : statusStr;
            } else {
              status = statusStr;
            }
          }

          // Convert retirement date from DD/MM/YYYY to YYYY-MM-DD
          let retirementDate = null;
          if (record.retirement_date && record.retirement_date.toString().trim() !== '') {
            const dateStr = record.retirement_date.toString().trim();
            const parts = dateStr.split('/');
            if (parts.length === 3) {
              const day = parts[0].padStart(2, '0');
              const month = parts[1].padStart(2, '0');
              const year = parts[2];
              
              const dayNum = parseInt(day);
              const monthNum = parseInt(month);
              const yearNum = parseInt(year);
              
              if (isNaN(dayNum) || isNaN(monthNum) || isNaN(yearNum) || 
                  dayNum < 1 || dayNum > 31 || 
                  monthNum < 1 || monthNum > 12 || 
                  yearNum < 1900 || yearNum > 2100) {
                throw new Error(`Invalid retirement_date: ${dateStr}. Must be DD/MM/YYYY format`);
              }
              
              retirementDate = `${year}-${month}-${day}`;
            } else {
              throw new Error(`Invalid date format: ${dateStr}. Must be DD/MM/YYYY`);
            }
          }

          // Prepare employee data
          const employeeData = {
            payroll_number: record.payroll_number.toString().trim(),
            full_name: record.full_name.toString().trim(),
            id_number: record.id_number.toString().trim(),
            gender: gender,
            age: age,
            designation: record.designation.toString().trim(),
            job_group: record.job_group ? record.job_group.toString().trim().toUpperCase() : null,
            status: status,
            retirement_date: retirementDate,
            employment_status: record.employment_status ? record.employment_status.toString().trim() : 'Permanent',
            department_id: departmentId  // NEW: department_id
          };

          // Create employee using repository
          const newEmployee = await db.employees.create(employeeData);
          
          // Add to allEmployees for duplicate checking within the same file
          allEmployees.push(newEmployee);
          
          processedResults.success.push({
            row: index + 1,
            data: employeeData,
            result: newEmployee
          });

        } catch (error) {
          processedResults.failed.push({
            row: index + 1,
            data: record,
            error: error.message
          });
        }
      }

      // Clean up uploaded file
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
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
      
      // Clean up uploaded file if it exists
      if (req.file && req.file.path && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      
      res.status(500).json({
        success: false,
        message: error.message || 'Error processing CSV file'
      });
    }
  }
};

module.exports = employeeController;