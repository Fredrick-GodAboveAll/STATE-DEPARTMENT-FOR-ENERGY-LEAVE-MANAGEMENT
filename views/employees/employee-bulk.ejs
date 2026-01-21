<div class="card bg-body-tertiary dark__bg-opacity-50 mb-3">
  <div class="card-body p-3">
    <p class="fs-10 mb-0">
      <a href="https://prium.github.io/falcon/v3.25.0/widgets.html#!">
        Bulk Upload, <strong><%= userFirstName %></strong> <%= userLastName %>
      </a>
    </p>
    <span id="session-timer"><%= locals.sessionInfo ? locals.sessionInfo.timeRemaining : '1h' %> remaining</span>
    <strong><%= new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) %></strong>
  </div>
</div>

<div class="d-flex mb-4 mt-3">
  <span class="fa-stack me-2 ms-n1">
    <i class="fas fa-circle fa-stack-2x text-300"></i>
    <i class="fa-inverse fa-stack-1x text-primary fas fa-users"></i>
  </span>

  <div class="col">
    <h5 class="mb-0 text-primary position-relative">
      <span class="bg-200 dark__bg-1100 pe-3">Employee Management Bulk Upload</span>
      <span class="border position-absolute top-50 translate-middle-y w-100 start-0 z-n1"></span>
    </h5>
    <p class="mb-0">Upload multiple employees at once using CSV files</p>
  </div>
</div>

<div class="row g-3">
  <!-- Main Upload Card with Tabs -->
  <div class="col-xxl-8">
    <div class="card mb-3">
      <div class="bg-holder d-none d-lg-block bg-card" style="background-image:url(../../assets/img/icons/spot-illustrations/corner-4.png);"></div>
      
      <div class="card-body">
        <!-- Tab Navigation -->
        <ul class="nav nav-tabs" id="bulkUploadTabs" role="tablist">
          <li class="nav-item" role="presentation">
            <button class="nav-link active" id="employees-tab" data-bs-toggle="tab" data-bs-target="#employees" type="button" role="tab" aria-controls="employees" aria-selected="true">
              <i class="fas fa-users me-2"></i>Employees
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="instructions-tab" data-bs-toggle="tab" data-bs-target="#instructions" type="button" role="tab" aria-controls="instructions" aria-selected="false">
              <i class="fas fa-info-circle me-2"></i>Instructions
            </button>
          </li>
        </ul>

        <!-- Tab Content -->
        <div class="tab-content mt-4" id="bulkUploadTabsContent">
          <!-- Employees Tab -->
          <div class="tab-pane fade show active" id="employees" role="tabpanel" aria-labelledby="employees-tab">
            <div class="d-flex align-items-center mb-4">
              <div class="flex-1">
                <h5 class="mb-0">Employee Bulk Upload</h5>
                <p class="text-600 mb-0">Upload multiple employees at once</p>
              </div>
              <div class="ms-2">
                <span class="fas fa-users text-primary fa-2x"></span>
              </div>
            </div>

            <div class="alert alert-info mb-4">
              <div class="d-flex">
                <div class="me-3">
                  <i class="fas fa-info-circle fa-2x"></i>
                </div>
                <div>
                  <h6 class="alert-heading mb-2">How to upload employees in bulk</h6>
                  <ol class="mb-0 ps-3">
                    <li>Download the CSV template below</li>
                    <li>Fill in your employee data (you can leave department empty)</li>
                    <li>Upload the completed CSV file</li>
                    <li>We'll process and add all employees automatically</li>
                  </ol>
                </div>
              </div>
            </div>

            <!-- Department Assignment Note -->
            <div class="alert alert-warning mb-4">
              <div class="d-flex">
                <div class="me-3">
                  <i class="fas fa-lightbulb fa-2x"></i>
                </div>
                <div>
                  <h6 class="alert-heading mb-2">
                    <i class="fas fa-building me-2"></i>Department Assignment
                  </h6>
                  <p class="mb-1">The <strong>department column is optional</strong> during upload. You can:</p>
                  <ul class="mb-0 ps-3">
                    <li>Leave department empty and assign it later (recommended)</li>
                    <li>Or fill in department IDs if you have them</li>
                  </ul>
                  <p class="mb-0 mt-2">
                    <strong>After upload:</strong> Go to 
                    <a href="/employee-departments" class="alert-link fw-bold">
                      <i class="fas fa-sitemap me-1"></i>Employee Departments
                    </a> 
                    to assign or bulk assign departments to employees.
                  </p>
                </div>
              </div>
            </div>

            <!-- Template Download Section -->
            <div class="card border border-200 mb-4">
              <div class="card-body">
                <h6 class="mb-3">
                  <i class="fas fa-download text-success me-2"></i>
                  Download Template
                </h6>
                <p class="text-600 mb-3">Use our pre-formatted CSV template to ensure proper formatting</p>
                <button class="btn btn-success btn-sm" id="downloadEmployeeTemplateBtn">
                  <span class="fas fa-download me-2"></span>Download Employee Template
                </button>
                <small class="text-muted d-block mt-2"><i>Template includes all required fields with correct column order</i></small>
              </div>
            </div>

            <!-- File Upload Section -->
            <div class="card border border-200 mb-4">
              <div class="card-body">
                <h6 class="mb-3">
                  <i class="fas fa-upload text-primary me-2"></i>
                  Upload CSV File
                </h6>
                <p class="text-600 mb-3">Upload your completed CSV file (max 5MB)</p>
                
                <form id="employeeUploadForm" class="upload-form" enctype="multipart/form-data">
                  <div class="file-drop-area mb-3" id="employeeFileDropArea">
                    <span class="file-msg">Drag & drop your CSV file here or click to browse</span>
                    <input class="file-input" id="employeeCsvFile" type="file" name="csvFile" accept=".csv" required>
                  </div>
                  
                  <div id="employeeFileName" class="mb-3 text-success fw-semi-bold d-none"></div>
                  
                  <div class="progress mb-3 d-none" id="employeeUploadProgress">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" 
                         role="progressbar" 
                         style="width: 0%"
                         aria-valuenow="0" 
                         aria-valuemin="0" 
                         aria-valuemax="100">
                      0%
                    </div>
                  </div>
                  
                  <button class="btn btn-primary" type="submit" id="employeeUploadButton">
                    <span class="fas fa-upload me-2"></span>Upload and Process Employees
                  </button>
                </form>
              </div>
            </div>

            <!-- Results Section -->
            <div id="employeeUploadResult" class="d-none">
              <div class="card border border-200">
                <div class="card-body">
                  <h6 class="mb-3">
                    <i class="fas fa-chart-bar text-info me-2"></i>
                    Employee Upload Results
                  </h6>
                  
                  <div class="alert alert-success d-none" id="employeeSuccessResult">
                    <div class="d-flex align-items-center">
                      <div class="me-3">
                        <i class="fas fa-check-circle fa-2x"></i>
                      </div>
                      <div>
                        <h6 class="alert-heading mb-1" id="employeeSuccessMessage"></h6>
                        <p class="mb-0" id="employeeSuccessDescription"></p>
                      </div>
                    </div>
                  </div>
                  
                  <div class="alert alert-danger d-none" id="employeeErrorResult">
                    <div class="d-flex align-items-center">
                      <div class="me-3">
                        <i class="fas fa-exclamation-circle fa-2x"></i>
                      </div>
                      <div>
                        <h6 class="alert-heading mb-1">Upload Failed</h6>
                        <p class="mb-0" id="employeeErrorMessage"></p>
                      </div>
                    </div>
                  </div>
                  
                  <div id="employeeResultDetails" class="mt-3 d-none">
                    <!-- Will be populated with detailed results -->
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Instructions Tab -->
          <div class="tab-pane fade" id="instructions" role="tabpanel" aria-labelledby="instructions-tab">
            <div class="d-flex align-items-center mb-4">
              <div class="flex-1">
                <h5 class="mb-0">Upload Instructions</h5>
                <p class="text-600 mb-0">Complete guide for bulk employee upload</p>
              </div>
              <div class="ms-2">
                <span class="fas fa-info-circle text-info fa-2x"></span>
              </div>
            </div>

            <div class="card border border-200 mb-4">
              <div class="card-body">
                <h6 class="mb-3">
                  <i class="fas fa-table me-2"></i>
                  CSV Format Requirements
                </h6>
                
                <div class="table-responsive">
                  <table class="table table-sm table-bordered">
                    <thead class="bg-200">
                      <tr>
                        <th>Column Name</th>
                        <th>Required</th>
                        <th>Format/Example</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><code>payroll_number</code></td>
                        <td><span class="badge bg-success">Required</span></td>
                        <td>19337, 19338</td>
                        <td>Unique payroll number (numeric)</td>
                      </tr>
                      <tr>
                        <td><code>full_name</code></td>
                        <td><span class="badge bg-success">Required</span></td>
                        <td>MR JULIUS ODHIAMBO MBOGAH</td>
                        <td>Employee's full name</td>
                      </tr>
                      <tr>
                        <td><code>id_number</code></td>
                        <td><span class="badge bg-success">Required</span></td>
                        <td>11684, 11685</td>
                        <td>National ID number (numeric, unique)</td>
                      </tr>
                      <tr>
                        <td><code>gender</code></td>
                        <td><span class="badge bg-success">Required</span></td>
                        <td>M, F</td>
                        <td>Gender (M or F only)</td>
                      </tr>
                      <tr>
                        <td><code>age</code></td>
                        <td><span class="badge bg-success">Required</span></td>
                        <td>63, 45, 52</td>
                        <td>Age (18-120)</td>
                      </tr>
                      <tr>
                        <td><code>designation</code></td>
                        <td><span class="badge bg-success">Required</span></td>
                        <td>Deputy Director - HRM & Development</td>
                        <td>Job title/position</td>
                      </tr>
                      <tr>
                        <td><code>job_group</code></td>
                        <td><span class="badge bg-warning">Optional</span></td>
                        <td>R, S, T</td>
                        <td>Job group (single letter A-Z)</td>
                      </tr>
                      <tr>
                        <td><code>status</code></td>
                        <td><span class="badge bg-warning">Optional</span></td>
                        <td>0 - Active, 1 - Inactive, 2 - Retired</td>
                        <td>Employee status</td>
                      </tr>
                      <tr>
                        <td><code>retirement_date</code></td>
                        <td><span class="badge bg-warning">Optional</span></td>
                        <td>04/11/2026 (DD/MM/YYYY)</td>
                        <td>Retirement date in DD/MM/YYYY format</td>
                      </tr>
                      <tr>
                        <td><code>employment_status</code></td>
                        <td><span class="badge bg-warning">Optional</span></td>
                        <td>Permanent, Contract, Probation, Temporary</td>
                        <td>Employment type</td>
                      </tr>
                      <!-- NEW: Department ID Column -->
                      <tr>
                        <td><code>department_id</code></td>
                        <td><span class="badge bg-warning">Optional</span></td>
                        <td>1, 2, 3 (or leave empty)</td>
                        <td>Department ID (from departments table) - leave empty for unassigned</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <!-- Department ID Reference Card -->
            <div class="card border border-info mb-4">
              <div class="card-header bg-info-subtle">
                <h6 class="mb-0">
                  <i class="fas fa-building me-2"></i>
                  Department ID Reference
                </h6>
              </div>
              <div class="card-body">
                <p class="text-600 mb-3">Available department IDs (use these in the department_id column):</p>
                
                <div class="row">
                  <% if (departments && departments.length > 0) { %>
                    <% departments.forEach(dept => { %>
                    <div class="col-md-6 mb-2">
                      <div class="d-flex align-items-center p-2 border rounded">
                        <span class="badge bg-info me-2"><%= dept.id %></span>
                        <div>
                          <span class="fw-semi-bold"><%= dept.name %></span>
                          <small class="text-muted d-block">Code: <%= dept.code %></small>
                        </div>
                      </div>
                    </div>
                    <% }); %>
                  <% } else { %>
                    <div class="col-12">
                      <div class="alert alert-warning mb-0">
                        <i class="fas fa-exclamation-triangle me-2"></i>
                        No departments found. Create departments first.
                      </div>
                    </div>
                  <% } %>
                </div>
                
                <div class="mt-3">
                  <p class="mb-0 text-muted">
                    <i class="fas fa-info-circle me-1"></i>
                    Leave <code>department_id</code> empty or blank for unassigned employees
                  </p>
                </div>
              </div>
            </div>

            <div class="card border border-200">
              <div class="card-body">
                <h6 class="mb-3">
                  <i class="fas fa-exclamation-triangle text-warning me-2"></i>
                  Important Notes
                </h6>
                
                <ul class="mb-0">
                  <li class="mb-2">The first row must contain column headers exactly as shown above</li>
                  <li class="mb-2">Required fields must be filled in for all records</li>
                  <li class="mb-2">Duplicate payroll numbers will be skipped</li>
                  <li class="mb-2">Duplicate ID numbers will be skipped</li>
                  <li class="mb-2">Department ID must match an existing department or be left empty</li>
                  <li class="mb-2">File must be saved in CSV (Comma Separated Values) format</li>
                  <li class="mb-2">Maximum file size is 5MB</li>
                  <li class="mb-2">Use the template to ensure proper formatting</li>
                  <li>Special characters in names are allowed</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Right Sidebar - Quick Tips -->
  <div class="col-xxl-4">
    <!-- Quick Tips Card -->
    <div class="card mb-3">
      <div class="card-body">
        <h5 class="mb-3">
          <i class="fas fa-lightbulb text-warning me-2"></i>
          Quick Tips
        </h5>
        
        <div class="mb-4">
          <h6 class="mb-2">Before Uploading</h6>
          <ul class="list-unstyled mb-0">
            <li class="mb-2">
              <span class="fas fa-check-circle text-success me-2"></span>
              Verify all required fields are filled
            </li>
            <li class="mb-2">
              <span class="fas fa-check-circle text-success me-2"></span>
              Check for duplicate payroll numbers
            </li>
            <li class="mb-2">
              <span class="fas fa-check-circle text-success me-2"></span>
              Ensure dates are in DD/MM/YYYY format
            </li>
            <li>
              <span class="fas fa-check-circle text-success me-2"></span>
              Validate gender is M or F only
            </li>
          </ul>
        </div>
        
        <div class="mb-4">
          <h6 class="mb-2">Data Validation (Updated)</h6>
          <ul class="list-unstyled mb-0">
            <li class="mb-2">
              <strong>Payroll Number:</strong> Must be unique and numeric
            </li>
            <li class="mb-2">
              <strong>ID Number:</strong> Must be unique and numeric
            </li>
            <li class="mb-2">
              <strong>Age:</strong> Must be between 18 and 120
            </li>
            <li class="mb-2">
              <strong>Gender:</strong> Must be M or F
            </li>
            <li>
              <strong>Department ID:</strong> Must exist in system or be empty
            </li>
          </ul>
        </div>
        
        <div class="alert alert-warning">
          <h6 class="alert-heading mb-2">
            <i class="fas fa-exclamation-triangle me-2"></i>
            Error Handling
          </h6>
          <ul class="mb-0 ps-3">
            <li>Rows with errors will be skipped</li>
            <li>Detailed error report will be provided</li>
            <li>Valid rows will be processed successfully</li>
            <li>You can fix errors and re-upload</li>
          </ul>
        </div>
        
        <div class="mt-4">
          <h6 class="mb-2">Need Help?</h6>
          <p class="text-600 mb-0">Contact HR department for assistance with employee data formatting.</p>
        </div>
      </div>
    </div>
    
    <!-- Sample Data Card -->
    <div class="card mb-3">
      <div class="card-body">
        <h5 class="mb-3">
          <i class="fas fa-file-csv text-secondary me-2"></i>
          Sample CSV Data (Updated)
        </h5>
        
        <div class="mb-3">
          <p class="text-600 mb-2">Example of correct CSV format with department_id:</p>
          <pre class="bg-light p-3 rounded fs-9 mb-0">
payroll_number,full_name,id_number,gender,age,designation,job_group,status,retirement_date,employment_status,department_id
19337,MR JULIUS ODHIAMBO MBOGAH,11684,M,63,Deputy Director - HRM & Development,R,0 - Active,04/11/2026,Permanent,1
19338,JANE WANGUI KAMAU,11685,F,45,Senior HR Officer,S,0 - Active,15/08/2030,Permanent,2
19339,PETER OMONDI OTIENO,11686,M,52,Finance Manager,T,0 - Active,22/05/2028,Contract,
</pre>
        </div>
        
        <div class="mt-3">
          <h6 class="mb-2">Common Issues (Updated)</h6>
          <ul class="mb-0 ps-3">
            <li>Missing commas between fields</li>
            <li>Incorrect date format (must be DD/MM/YYYY)</li>
            <li>Duplicate payroll or ID numbers</li>
            <li>Invalid gender (must be M or F)</li>
            <li>Invalid department_id (must be a number or empty)</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Department Assignment Card -->
    <div class="card mb-3">
      <div class="card-body">
        <h5 class="mb-3">
          <i class="fas fa-building text-info me-2"></i>
          Department Assignment
        </h5>
        
        <div class="mb-3">
          <h6 class="mb-2">Assign Departments Later</h6>
          <p class="text-600 mb-2">If you leave department_id empty, you can assign departments later:</p>
          <a href="/employee-departments" class="btn btn-info btn-sm">
            <span class="fas fa-building me-1"></span>
            Go to Department Assignment
          </a>
        </div>
        
        <div>
          <h6 class="mb-2">Quick Stats</h6>
          <ul class="list-unstyled mb-0">
            <li class="mb-1">
              <span class="fas fa-users me-2"></span>
              Total Departments: <%= departments ? departments.length : 0 %>
            </li>
            <li>
              <span class="fas fa-question-circle me-2"></span>
              Leave empty for unassigned
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Toast Container -->
<div class="position-fixed top-0 end-0 p-3" style="z-index: 1100;">
  <div id="toastContainer"></div>
</div>

<!-- Styles for file drop area -->
<style>
  .file-drop-area {
    border: 2px dashed #dee2e6;
    border-radius: 5px;
    padding: 40px 20px;
    text-align: center;
    transition: border-color 0.3s ease;
    cursor: pointer;
    background-color: #f8f9fa;
  }
  .file-drop-area.highlight {
    border-color: #0d6efd;
    background-color: #e7f1ff;
  }
  .file-drop-area.disabled {
    cursor: not-allowed;
    background-color: #f8f9fa;
    opacity: 0.6;
  }
  .file-drop-area .file-msg {
    display: block;
    color: #6c757d;
    font-size: 16px;
    margin-bottom: 10px;
  }
  .file-input {
    display: none;
  }
  .file-drop-area:hover:not(.disabled) {
    border-color: #0d6efd;
  }
  
  /* Tab styling */
  .nav-tabs .nav-link {
    color: #6c757d;
    font-weight: 500;
  }
  .nav-tabs .nav-link.active {
    color: #0d6efd;
    border-bottom: 2px solid #0d6efd;
  }
  
  /* Code styling */
  code {
    background-color: #f8f9fa;
    padding: 2px 6px;
    border-radius: 3px;
    font-family: 'Courier New', monospace;
  }
</style>

<script>
  document.addEventListener('DOMContentLoaded', () => {
    <% if (locals.sessionInfo && locals.sessionInfo.totalSeconds > 0) { %>
      let remainingSeconds = <%= locals.sessionInfo.totalSeconds %>;
      
      const updateTimer = () => {
        if (remainingSeconds <= 0) {
          alert('Your session has expired. You will be logged out.');
          window.location.href = '/logout';
          return;
        }
        
        const hours = Math.floor(remainingSeconds / 3600);
        const minutes = Math.floor((remainingSeconds % 3600) / 60);
        const seconds = remainingSeconds % 60;
        
        let timeString;
        if (hours > 0) {
          timeString = `${hours}h ${minutes}m`;
        } else if (minutes > 0) {
          timeString = `${minutes}m`;
        } else {
          timeString = `${seconds}s`;
        }
        
        document.getElementById('session-timer').textContent = timeString;
        remainingSeconds--;
      };
      
      // Update timer every second
      updateTimer();
      const timerInterval = setInterval(updateTimer, 1000);
      
      // Reset timer on activity (rolling session)
      let lastActivity = Date.now();
      const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
      
      const updateActivity = () => {
        const now = Date.now();
        if (now - lastActivity > 5000) { // Only update if 5+ seconds since last activity
          lastActivity = now;
          remainingSeconds = 3600; // Reset to 1 hour
        }
      };
      
      // Add activity listeners
      activityEvents.forEach(event => {
        document.addEventListener(event, updateActivity, true);
      });
    <% } %>
  });

  // File drag and drop functionality
  function setupFileDragDrop(fileDropAreaId, fileInputId, fileNameId) {
    const fileDropArea = document.getElementById(fileDropAreaId);
    const fileInput = document.getElementById(fileInputId);
    const fileName = document.getElementById(fileNameId);
    
    if (fileDropArea && fileInput) {
      // Prevent default drag behaviors
      ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        fileDropArea.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
      });
      
      // Highlight drop area when item is dragged over it
      ['dragenter', 'dragover'].forEach(eventName => {
        fileDropArea.addEventListener(eventName, highlight, false);
      });
      
      ['dragleave', 'drop'].forEach(eventName => {
        fileDropArea.addEventListener(eventName, unhighlight, false);
      });
      
      // Handle dropped files
      fileDropArea.addEventListener('drop', handleDrop, false);
      
      // Handle click to browse
      fileDropArea.addEventListener('click', () => {
        fileInput.click();
      });
      
      // Handle file selection via browse
      fileInput.addEventListener('change', function() {
        handleFiles(this.files, fileName, fileDropArea);
      });
    }
    
    function preventDefaults(e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    function highlight() {
      fileDropArea.classList.add('highlight');
    }
    
    function unhighlight() {
      fileDropArea.classList.remove('highlight');
    }
    
    function handleDrop(e) {
      const dt = e.dataTransfer;
      const files = dt.files;
      handleFiles(files, fileName, fileDropArea);
    }
    
    function handleFiles(files, fileNameElement, dropArea) {
      if (files.length > 0) {
        const file = files[0];
        
        // Validate file type
        if (!file.name.toLowerCase().endsWith('.csv')) {
          showToast('error', 'Please select a CSV file');
          return;
        }
        
        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
          showToast('error', 'File size must be less than 5MB');
          return;
        }
        
        fileInput.files = files;
        const fileMsg = dropArea.querySelector('.file-msg');
        if (fileMsg) fileMsg.textContent = file.name;
        if (fileNameElement) {
          fileNameElement.textContent = `Selected file: ${file.name} (${formatFileSize(file.size)})`;
          fileNameElement.classList.remove('d-none');
        }
      }
    }
  }

  // Format file size
  function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Employee Upload Form Handling
  document.addEventListener('DOMContentLoaded', function() {
    // Setup file drag & drop
    setupFileDragDrop('employeeFileDropArea', 'employeeCsvFile', 'employeeFileName');
    
    const employeeUploadForm = document.getElementById('employeeUploadForm');
    const employeeUploadProgress = document.getElementById('employeeUploadProgress');
    const employeeUploadResult = document.getElementById('employeeUploadResult');
    const employeeSuccessResult = document.getElementById('employeeSuccessResult');
    const employeeErrorResult = document.getElementById('employeeErrorResult');
    const employeeSuccessMessage = document.getElementById('employeeSuccessMessage');
    const employeeErrorMessage = document.getElementById('employeeErrorMessage');
    const employeeResultDetails = document.getElementById('employeeResultDetails');
    const employeeUploadButton = document.getElementById('employeeUploadButton');
    const downloadEmployeeTemplateBtn = document.getElementById('downloadEmployeeTemplateBtn');

    // Form submission
    if (employeeUploadForm) {
      employeeUploadForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const fileInput = document.getElementById('employeeCsvFile');
        
        if (!fileInput.files[0]) {
          showToast('error', 'Please select a CSV file to upload');
          return;
        }
        
        // Show upload in progress
        employeeUploadResult.classList.add('d-none');
        employeeSuccessResult.classList.add('d-none');
        employeeErrorResult.classList.add('d-none');
        employeeResultDetails.classList.add('d-none');
        employeeUploadProgress.classList.remove('d-none');
        employeeUploadProgress.querySelector('.progress-bar').style.width = '0%';
        employeeUploadProgress.querySelector('.progress-bar').textContent = '0%';
        
        const originalButtonText = employeeUploadButton.innerHTML;
        employeeUploadButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Uploading...';
        employeeUploadButton.disabled = true;
        
        try {
          // Simulate progress
          const progressInterval = setInterval(() => {
            const progressBar = employeeUploadProgress.querySelector('.progress-bar');
            const currentWidth = parseInt(progressBar.style.width);
            if (currentWidth < 90) {
              const newWidth = currentWidth + 10;
              progressBar.style.width = `${newWidth}%`;
              progressBar.textContent = `${newWidth}%`;
            }
          }, 200);
          
          // Send request to employee bulk upload endpoint
          const response = await fetch('/bulk-upload', {
            method: 'POST',
            body: formData
          });
          
          clearInterval(progressInterval);
          employeeUploadProgress.querySelector('.progress-bar').style.width = '100%';
          employeeUploadProgress.querySelector('.progress-bar').textContent = '100%';
          
          const result = await response.json();
          
          setTimeout(() => {
            employeeUploadProgress.classList.add('d-none');
            employeeUploadResult.classList.remove('d-none');
            
            if (result.success) {
              employeeSuccessResult.classList.remove('d-none');
              employeeErrorResult.classList.add('d-none');
              employeeSuccessMessage.textContent = result.message;
              
              // Show detailed results
              let detailsHtml = `
                <hr>
                <div class="row mb-3">
                  <div class="col-md-4">
                    <div class="card bg-success text-white">
                      <div class="card-body text-center">
                        <h3 class="mb-0">${result.summary.success}</h3>
                        <p class="mb-0">Successful</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="card bg-danger text-white">
                      <div class="card-body text-center">
                        <h3 class="mb-0">${result.summary.failed}</h3>
                        <p class="mb-0">Failed</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="card bg-primary text-white">
                      <div class="card-body text-center">
                        <h3 class="mb-0">${result.summary.total}</h3>
                        <p class="mb-0">Total</p>
                      </div>
                    </div>
                  </div>
                </div>
              `;
              
              // Show failed rows if any
              if (result.details.failed && result.details.failed.length > 0) {
                detailsHtml += `
                  <div class="mt-3">
                    <h6>Failed Records:</h6>
                    <div class="table-responsive">
                      <table class="table table-sm table-bordered">
                        <thead>
                          <tr>
                            <th>Row</th>
                            <th>Payroll No</th>
                            <th>Name</th>
                            <th>Error</th>
                          </tr>
                        </thead>
                        <tbody>
                `;
                
                result.details.failed.forEach(failed => {
                  detailsHtml += `
                    <tr>
                      <td>${failed.row}</td>
                      <td>${failed.data.payroll_number || 'N/A'}</td>
                      <td>${failed.data.full_name || 'N/A'}</td>
                      <td class="text-danger">${failed.error}</td>
                    </tr>
                  `;
                });
                
                detailsHtml += `
                        </tbody>
                      </table>
                    </div>
                    <p class="text-muted mb-0">Note: You can fix these errors in your CSV file and upload again.</p>
                  </div>
                `;
              }
              
              employeeResultDetails.innerHTML = detailsHtml;
              employeeResultDetails.classList.remove('d-none');
              
              // Show toast message
              if (result.summary.failed === 0) {
                showToast('success', 'All employees imported successfully!');
              } else {
                showToast('warning', `Import completed with ${result.summary.failed} errors.`);
              }
              
            } else {
              employeeSuccessResult.classList.add('d-none');
              employeeErrorResult.classList.remove('d-none');
              employeeErrorMessage.textContent = result.message || 'Upload failed';
              
              // Show detailed errors if available
              if (result.errors) {
                let errorsHtml = '<ul class="mb-0 mt-2">';
                result.errors.forEach(error => {
                  errorsHtml += `<li>${error.message || error}</li>`;
                });
                errorsHtml += '</ul>';
                employeeErrorMessage.innerHTML += errorsHtml;
              }
              
              showToast('error', 'Upload failed. Please check the errors and try again.');
            }
          }, 500);
          
        } catch (error) {
          console.error('Upload error:', error);
          employeeUploadProgress.classList.add('d-none');
          employeeUploadResult.classList.remove('d-none');
          employeeSuccessResult.classList.add('d-none');
          employeeErrorResult.classList.remove('d-none');
          employeeErrorMessage.textContent = 'Network error. Please try again.';
          showToast('error', 'Upload failed. Please try again.');
        } finally {
          employeeUploadButton.innerHTML = originalButtonText;
          employeeUploadButton.disabled = false;
        }
      });
    }

    // Download template button
    if (downloadEmployeeTemplateBtn) {
      downloadEmployeeTemplateBtn.addEventListener('click', function(e) {
        e.preventDefault();
        // Redirect to download template endpoint
        window.location.href = '/employee/bulk-template';
      });
    }
  });

  // Toast notification function
  function showToast(type, message, duration = 3000) {
    const toastContainer = document.getElementById('toastContainer');
    
    // Create unique ID for toast
    const toastId = 'toast-' + Date.now();
    
    const toastHtml = `
      <div id="${toastId}" class="toast align-items-center text-bg-${type} border-0" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
          <div class="toast-body">
            ${message}
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
    `;
    
    toastContainer.insertAdjacentHTML('beforeend', toastHtml);
    const toastElement = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastElement, { delay: duration });
    
    toast.show();
    
    // Remove toast from DOM after it's hidden
    toastElement.addEventListener('hidden.bs.toast', function () {
      this.remove();
    });
  }
</script>