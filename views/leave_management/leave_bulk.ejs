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
    <i class="fa-inverse fa-stack-1x text-primary fas fa-file-upload"></i>
  </span>

  <div class="col">
    <h5 class="mb-0 text-primary position-relative">
      <span class="bg-200 dark__bg-1100 pe-3">Leave Management Bulk Upload</span>
      <span class="border position-absolute top-50 translate-middle-y w-100 start-0 z-n1"></span>
    </h5>
    <p class="mb-0">Upload multiple leave types and holidays at once using CSV files</p>
  </div>
</div>

<div class="row g-3">
  <!-- Main Content Area -->
  <div class="col-xxl-8">
    <!-- Leave Types Upload Section -->
    <div class="card mb-4">
      <div class="bg-holder d-none d-lg-block bg-card" style="background-image:url(../../assets/img/icons/spot-illustrations/corner-4.png);"></div>
      
      <div class="card-body">
        <div class="d-flex align-items-center mb-4">
          <div class="flex-1">
            <h5 class="mb-0 text-primary">
              <i class="fas fa-clipboard-list me-2"></i>Leave Types Bulk Upload
            </h5>
            <p class="text-600 mb-0">Upload multiple leave types at once</p>
          </div>
          <div class="ms-2">
            <span class="fas fa-clipboard-list text-primary fa-2x"></span>
          </div>
        </div>

        <div class="alert alert-info mb-4">
          <div class="d-flex">
            <div class="me-3">
              <i class="fas fa-info-circle fa-2x"></i>
            </div>
            <div>
              <h6 class="alert-heading mb-2">How to upload leave types in bulk</h6>
              <ol class="mb-0 ps-3">
                <li>Download the CSV template below</li>
                <li>Fill in your leave types data</li>
                <li>Upload the completed CSV file</li>
                <li>We'll process and add all leave types automatically</li>
              </ol>
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
            <a href="/leave_types/template" class="btn btn-success btn-sm" id="downloadLeaveTemplateBtn">
              <span class="fas fa-download me-2"></span>Download Leave Types Template
            </a>
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
            
            <form id="leaveTypesUploadForm" class="upload-form" enctype="multipart/form-data" data-type="leave_types">
              <div class="file-drop-area mb-3" id="leaveTypesFileDropArea">
                <span class="file-msg">Drag & drop your CSV file here or click to browse</span>
                <input class="file-input" id="leaveTypesCsvFile" type="file" name="csvFile" accept=".csv" required>
              </div>
              
              <div id="leaveTypesFileName" class="mb-3 text-success fw-semi-bold d-none"></div>
              
              <div class="progress mb-3 d-none" id="leaveTypesUploadProgress">
                <div class="progress-bar progress-bar-striped progress-bar-animated" 
                     role="progressbar" 
                     style="width: 0%"
                     aria-valuenow="0" 
                     aria-valuemin="0" 
                     aria-valuemax="100">
                  0%
                </div>
              </div>
              
              <button class="btn btn-primary" type="submit" id="leaveTypesUploadButton">
                <span class="fas fa-upload me-2"></span>Upload and Process Leave Types
              </button>
            </form>
          </div>
        </div>

        <!-- Results Section -->
        <div id="leaveTypesUploadResult" class="d-none">
          <div class="card border border-200">
            <div class="card-body">
              <h6 class="mb-3">
                <i class="fas fa-chart-bar text-info me-2"></i>
                Leave Types Upload Results
              </h6>
              
              <div class="alert alert-success d-none" id="leaveTypesSuccessResult">
                <div class="d-flex align-items-center">
                  <div class="me-3">
                    <i class="fas fa-check-circle fa-2x"></i>
                  </div>
                  <div>
                    <h6 class="alert-heading mb-1" id="leaveTypesSuccessMessage"></h6>
                    <p class="mb-0" id="leaveTypesSuccessDescription"></p>
                  </div>
                </div>
              </div>
              
              <div class="alert alert-danger d-none" id="leaveTypesErrorResult">
                <div class="d-flex align-items-center">
                  <div class="me-3">
                    <i class="fas fa-exclamation-circle fa-2x"></i>
                  </div>
                  <div>
                    <h6 class="alert-heading mb-1">Upload Failed</h6>
                    <p class="mb-0" id="leaveTypesErrorMessage"></p>
                  </div>
                </div>
              </div>
              
              <div id="leaveTypesResultDetails" class="mt-3 d-none">
                <!-- Will be populated with detailed results -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Holidays Upload Section -->
    <div class="card">
      <div class="card-body">
        <div class="d-flex align-items-center mb-4">
          <div class="flex-1">
            <h5 class="mb-0 text-warning">
              <i class="fas fa-calendar-alt me-2"></i>Holidays Bulk Upload
            </h5>
            <p class="text-600 mb-0">Upload multiple holidays at once</p>
          </div>
          <div class="ms-2">
            <span class="fas fa-calendar-alt text-warning fa-2x"></span>
          </div>
        </div>

        <div class="alert alert-info mb-4">
          <div class="d-flex">
            <div class="me-3">
              <i class="fas fa-info-circle fa-2x"></i>
            </div>
            <div>
              <h6 class="alert-heading mb-2">How to upload holidays in bulk</h6>
              <ol class="mb-0 ps-3">
                <li>Download the CSV template below</li>
                <li>Fill in your holidays data</li>
                <li>Upload the completed CSV file</li>
                <li>We'll process and add all holidays automatically</li>
              </ol>
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
            <a href="/api/holidays/template" class="btn btn-success btn-sm" id="downloadHolidayTemplateBtn">
              <span class="fas fa-download me-2"></span>Download Holidays Template
            </a>
          </div>
        </div>

        <!-- File Upload Section -->
        <div class="card border border-200 mb-4">
          <div class="card-body">
            <h6 class="mb-3">
              <i class="fas fa-upload text-warning me-2"></i>
              Upload CSV File
            </h6>
            <p class="text-600 mb-3">Upload your completed CSV file (max 5MB)</p>
            
            <form id="holidaysUploadForm" class="upload-form" enctype="multipart/form-data" data-type="holidays">
              <div class="file-drop-area mb-3" id="holidaysFileDropArea">
                <span class="file-msg">Drag & drop your CSV file here or click to browse</span>
                <input class="file-input" id="holidaysCsvFile" type="file" name="csvFile" accept=".csv" required>
              </div>
              
              <div id="holidaysFileName" class="mb-3 text-success fw-semi-bold d-none"></div>
              
              <div class="progress mb-3 d-none" id="holidaysUploadProgress">
                <div class="progress-bar progress-bar-striped progress-bar-animated bg-warning" 
                     role="progressbar" 
                     style="width: 0%"
                     aria-valuenow="0" 
                     aria-valuemin="0" 
                     aria-valuemax="100">
                  0%
                </div>
              </div>
              
              <button class="btn btn-warning" type="submit" id="holidaysUploadButton">
                <span class="fas fa-upload me-2"></span>Upload and Process Holidays
              </button>
            </form>
          </div>
        </div>

        <!-- Results Section -->
        <div id="holidaysUploadResult" class="d-none">
          <div class="card border border-200">
            <div class="card-body">
              <h6 class="mb-3">
                <i class="fas fa-chart-bar text-info me-2"></i>
                Holidays Upload Results
              </h6>
              
              <div class="alert alert-success d-none" id="holidaysSuccessResult">
                <div class="d-flex align-items-center">
                  <div class="me-3">
                    <i class="fas fa-check-circle fa-2x"></i>
                  </div>
                  <div>
                    <h6 class="alert-heading mb-1" id="holidaysSuccessMessage"></h6>
                    <p class="mb-0" id="holidaysSuccessDescription"></p>
                  </div>
                </div>
              </div>
              
              <div class="alert alert-danger d-none" id="holidaysErrorResult">
                <div class="d-flex align-items-center">
                  <div class="me-3">
                    <i class="fas fa-exclamation-circle fa-2x"></i>
                  </div>
                  <div>
                    <h6 class="alert-heading mb-1">Upload Failed</h6>
                    <p class="mb-0" id="holidaysErrorMessage"></p>
                  </div>
                </div>
              </div>
              
              <div id="holidaysResultDetails" class="mt-3 d-none">
                <!-- Will be populated with detailed results -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Right Sidebar - Instructions -->
  <div class="col-xxl-4">
    <!-- Leave Types Instructions Card -->
    <div class="card mb-3">
      <div class="card-body">
        <h5 class="mb-3">
          <i class="fas fa-clipboard-list text-primary me-2"></i>
          Leave Types Instructions
        </h5>
        
        <div class="mb-4">
          <h6 class="mb-2">CSV Format Requirements</h6>
          <ul class="list-unstyled mb-0">
            <li class="mb-1">
              <span class="fas fa-check-circle text-success me-2"></span>
              Required columns: <code>leave_name</code>, <code>entitled_days</code> (optional: <code>carry_forward_days</code>)
            </li>
            <li class="mb-1">
              <span class="fas fa-check-circle text-success me-2"></span>
              Optional columns: <code>color</code>, <code>gender_restriction</code>, <code>description</code>, <code>status</code>
            </li>
            <li class="mb-1">
              <span class="fas fa-check-circle text-success me-2"></span>
              File must be in CSV format
            </li>
            <li class="mb-1">
              <span class="fas fa-check-circle text-success me-2"></span>
              Maximum file size: 5MB
            </li>
          </ul>
        </div>
        
        <div class="mb-4">
          <h6 class="mb-2">Valid Values</h6>
          <ul class="list-unstyled mb-0">
            <li class="mb-1">
              <strong>gender_restriction:</strong> All, Male, Female, Other, None
            </li>
            <li class="mb-1">
              <strong>status:</strong> Active, Inactive, Archived
            </li>
            <li class="mb-1">
              <strong>color:</strong> primary, secondary, success, danger, warning, info, dark, light
            </li>
            <li class="mb-1">
              <strong>entitled_days:</strong> Number (0 or greater)
            </li>
          </ul>
        </div>
        
        <div class="alert alert-warning">
          <h6 class="alert-heading mb-2">
            <i class="fas fa-exclamation-triangle me-2"></i>
            Important Notes
          </h6>
          <ul class="mb-0 ps-3">
            <li>Duplicate leave types will be skipped</li>
            <li>Invalid rows will be reported in the results</li>
            <li>Valid rows will be processed and added to the system</li>
            <li>You can upload the same file multiple times after fixing errors</li>
          </ul>
        </div>
      </div>
    </div>
    
    <!-- Holidays Instructions Card -->
    <div class="card mb-3">
      <div class="card-body">
        <h5 class="mb-3">
          <i class="fas fa-calendar-alt text-warning me-2"></i>
          Holidays Instructions
        </h5>
        
        <div class="mb-4">
          <h6 class="mb-2">CSV Format Requirements</h6>
          <ul class="list-unstyled mb-0">
            <li class="mb-1">
              <span class="fas fa-check-circle text-success me-2"></span>
              Required columns: <code>holiday_name</code>, <code>holiday_date</code>, <code>holiday_type</code>, <code>year</code>
            </li>
            <li class="mb-1">
              <span class="fas fa-check-circle text-success me-2"></span>
              Optional columns: <code>recurring</code>, <code>description</code>
            </li>
            <li class="mb-1">
              <span class="fas fa-check-circle text-success me-2"></span>
              File must be in CSV format
            </li>
            <li class="mb-1">
              <span class="fas fa-check-circle text-success me-2"></span>
              Maximum file size: 5MB
            </li>
          </ul>
        </div>
        
        <div class="mb-4">
          <h6 class="mb-2">Valid Values</h6>
          <ul class="list-unstyled mb-0">
            <li class="mb-1">
              <strong>holiday_type:</strong> Public Holiday, Company Holiday, Optional Holiday, Special Day
            </li>
            <li class="mb-1">
              <strong>year:</strong> Number (e.g., 2024)
            </li>
            <li class="mb-1">
              <strong>holiday_date:</strong> YYYY-MM-DD format
            </li>
            <li class="mb-1">
              <strong>recurring:</strong> 0 (no) or 1 (yes)
            </li>
          </ul>
        </div>
        
        <div class="alert alert-warning">
          <h6 class="alert-heading mb-2">
            <i class="fas fa-exclamation-triangle me-2"></i>
            Important Notes
          </h6>
          <ul class="mb-0 ps-3">
            <li>Duplicate holidays will be skipped</li>
            <li>Invalid rows will be reported in the results</li>
            <li>Valid rows will be processed and added to the system</li>
            <li>You can upload the same file multiple times after fixing errors</li>
          </ul>
        </div>
      </div>
    </div>
    
    <!-- Coming Soon Section -->
    <div class="card mb-3">
      <div class="card-body">
        <h5 class="mb-3">
          <i class="fas fa-clock text-secondary me-2"></i>
          Coming Soon
        </h5>
        
        <div class="mb-3">
          <div class="d-flex align-items-center mb-2">
            <div class="me-2">
              <span class="fas fa-users text-muted"></span>
            </div>
            <div>
              <h6 class="mb-0">Leave Records</h6>
              <p class="text-600 mb-0 fs-9">Upload leave applications in bulk</p>
            </div>
          </div>
        </div>
        
        <div class="mb-3">
          <div class="d-flex align-items-center mb-2">
            <div class="me-2">
              <span class="fas fa-balance-scale text-muted"></span>
            </div>
            <div>
              <h6 class="mb-0">Leave Balances</h6>
              <p class="text-600 mb-0 fs-9">Update employee leave balances</p>
            </div>
          </div>
        </div>
        
        <div>
          <div class="d-flex align-items-center mb-2">
            <div class="me-2">
              <span class="fas fa-calendar-check text-muted"></span>
            </div>
            <div>
              <h6 class="mb-0">Leave Limits</h6>
              <p class="text-600 mb-0 fs-9">Set and update leave limits in bulk</p>
            </div>
          </div>
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
  
  /* Card header styling */
  .card .card-body h5 {
    border-bottom: 2px solid #e9ecef;
    padding-bottom: 10px;
    margin-bottom: 20px;
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

  // Generic File drag and drop functionality
  function setupFileDragDrop(fileDropAreaId, fileInputId, fileNameId, fileMsgSelector) {
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
        if (!fileInput.disabled) {
          fileInput.click();
        }
      });
      
      // Handle file selection via browse
      fileInput.addEventListener('change', function() {
        handleFiles(this.files, fileName, fileDropArea, fileMsgSelector);
      });
    }
    
    function preventDefaults(e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    function highlight() {
      if (!fileInput.disabled) {
        fileDropArea.classList.add('highlight');
      }
    }
    
    function unhighlight() {
      fileDropArea.classList.remove('highlight');
    }
    
    function handleDrop(e) {
      if (fileInput.disabled) return;
      
      const dt = e.dataTransfer;
      const files = dt.files;
      handleFiles(files, fileName, fileDropArea, fileMsgSelector);
    }
    
    function handleFiles(files, fileNameElement, dropArea, msgSelector) {
      if (files.length > 0) {
        const file = files[0];
        
        // Validate file type
        if (!file.name.toLowerCase().endsWith('.csv') && 
            file.type !== 'text/csv' && 
            file.type !== 'application/vnd.ms-excel') {
          showToast('error', 'Please select a CSV file');
          return;
        }
        
        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
          showToast('error', 'File size must be less than 5MB');
          return;
        }
        
        fileInput.files = files;
        const fileMsg = dropArea.querySelector(msgSelector || '.file-msg');
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

  // Bulk Upload Functionality for Leave Types
  document.addEventListener('DOMContentLoaded', function() {
    // Setup leave types file drag & drop
    setupFileDragDrop('leaveTypesFileDropArea', 'leaveTypesCsvFile', 'leaveTypesFileName', '.file-msg');
    
    const leaveTypesUploadForm = document.getElementById('leaveTypesUploadForm');
    const leaveTypesUploadProgress = document.getElementById('leaveTypesUploadProgress');
    const leaveTypesUploadResult = document.getElementById('leaveTypesUploadResult');
    const leaveTypesSuccessResult = document.getElementById('leaveTypesSuccessResult');
    const leaveTypesErrorResult = document.getElementById('leaveTypesErrorResult');
    const leaveTypesSuccessMessage = document.getElementById('leaveTypesSuccessMessage');
    const leaveTypesErrorMessage = document.getElementById('leaveTypesErrorMessage');
    const leaveTypesResultDetails = document.getElementById('leaveTypesResultDetails');
    const leaveTypesUploadButton = document.getElementById('leaveTypesUploadButton');
    const downloadLeaveTemplateBtn = document.getElementById('downloadLeaveTemplateBtn');

    if (leaveTypesUploadForm) {
      leaveTypesUploadForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const fileInput = document.getElementById('leaveTypesCsvFile');
        
        if (!fileInput.files[0]) {
          showToast('error', 'Please select a CSV file to upload');
          return;
        }
        
        // Reset states
        leaveTypesUploadResult.classList.add('d-none');
        leaveTypesSuccessResult.classList.add('d-none');
        leaveTypesErrorResult.classList.add('d-none');
        leaveTypesResultDetails.classList.add('d-none');
        leaveTypesUploadProgress.classList.remove('d-none');
        leaveTypesUploadProgress.querySelector('.progress-bar').style.width = '0%';
        leaveTypesUploadProgress.querySelector('.progress-bar').textContent = '0%';
        
        const originalButtonText = leaveTypesUploadButton.innerHTML;
        leaveTypesUploadButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Uploading...';
        leaveTypesUploadButton.disabled = true;
        
        try {
          // Simulate progress
          const progressInterval = setInterval(() => {
            const progressBar = leaveTypesUploadProgress.querySelector('.progress-bar');
            const currentWidth = parseInt(progressBar.style.width);
            if (currentWidth < 90) {
              const newWidth = currentWidth + 10;
              progressBar.style.width = `${newWidth}%`;
              progressBar.textContent = `${newWidth}%`;
            }
          }, 200);
          
          // Send request
          const response = await fetch('/leave_types/bulk-upload', {
            method: 'POST',
            body: formData
          });
          
          clearInterval(progressInterval);
          leaveTypesUploadProgress.querySelector('.progress-bar').style.width = '100%';
          leaveTypesUploadProgress.querySelector('.progress-bar').textContent = '100%';
          
          const result = await response.json();
          
          setTimeout(() => {
            leaveTypesUploadProgress.classList.add('d-none');
            leaveTypesUploadResult.classList.remove('d-none');
            
            if (result.success) {
              leaveTypesSuccessResult.classList.remove('d-none');
              leaveTypesErrorResult.classList.add('d-none');
              leaveTypesSuccessMessage.textContent = result.message;
              
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
              if (result.details.failed.length > 0) {
                detailsHtml += `
                  <div class="mt-3">
                    <h6>Failed Records:</h6>
                    <div class="table-responsive">
                      <table class="table table-sm table-bordered">
                        <thead>
                          <tr>
                            <th>Row</th>
                            <th>Leave Name</th>
                            <th>Error</th>
                          </tr>
                        </thead>
                        <tbody>
                `;
                
                result.details.failed.forEach(failed => {
                  detailsHtml += `
                    <tr>
                      <td>${failed.row}</td>
                      <td>${failed.data.leave_name || 'N/A'}</td>
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
              
              leaveTypesResultDetails.innerHTML = detailsHtml;
              leaveTypesResultDetails.classList.remove('d-none');
              
              // Show toast message
              if (result.summary.failed === 0) {
                showToast('success', 'All leave types imported successfully!');
              } else {
                showToast('warning', `Import completed with ${result.summary.failed} errors.`);
              }
              
            } else {
              leaveTypesSuccessResult.classList.add('d-none');
              leaveTypesErrorResult.classList.remove('d-none');
              leaveTypesErrorMessage.textContent = result.message || 'Upload failed';
              
              // Show detailed errors if available
              if (result.errors) {
                let errorsHtml = '<ul class="mb-0 mt-2">';
                result.errors.forEach(error => {
                  errorsHtml += `<li>${error.message || error}</li>`;
                });
                errorsHtml += '</ul>';
                leaveTypesErrorMessage.innerHTML += errorsHtml;
              }
              
              showToast('error', 'Upload failed. Please check the errors and try again.');
            }
          }, 500);
          
        } catch (error) {
          console.error('Upload error:', error);
          leaveTypesUploadProgress.classList.add('d-none');
          leaveTypesUploadResult.classList.remove('d-none');
          leaveTypesSuccessResult.classList.add('d-none');
          leaveTypesErrorResult.classList.remove('d-none');
          leaveTypesErrorMessage.textContent = 'Network error. Please try again.';
          showToast('error', 'Upload failed. Please try again.');
        } finally {
          leaveTypesUploadButton.innerHTML = originalButtonText;
          leaveTypesUploadButton.disabled = false;
        }
      });
    }

    // Download template button
    if (downloadLeaveTemplateBtn) {
      downloadLeaveTemplateBtn.addEventListener('click', function(e) {
        showToast('info', 'Downloading leave types template file...');
      });
    }
  });

  // Bulk Upload Functionality for Holidays
  document.addEventListener('DOMContentLoaded', function() {
    // Setup holidays file drag & drop
    setupFileDragDrop('holidaysFileDropArea', 'holidaysCsvFile', 'holidaysFileName', '.file-msg');
    
    const holidaysUploadForm = document.getElementById('holidaysUploadForm');
    const holidaysUploadProgress = document.getElementById('holidaysUploadProgress');
    const holidaysUploadResult = document.getElementById('holidaysUploadResult');
    const holidaysSuccessResult = document.getElementById('holidaysSuccessResult');
    const holidaysErrorResult = document.getElementById('holidaysErrorResult');
    const holidaysSuccessMessage = document.getElementById('holidaysSuccessMessage');
    const holidaysErrorMessage = document.getElementById('holidaysErrorMessage');
    const holidaysResultDetails = document.getElementById('holidaysResultDetails');
    const holidaysUploadButton = document.getElementById('holidaysUploadButton');
    const downloadHolidayTemplateBtn = document.getElementById('downloadHolidayTemplateBtn');

    if (holidaysUploadForm) {
      holidaysUploadForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const fileInput = document.getElementById('holidaysCsvFile');
        
        if (!fileInput.files[0]) {
          showToast('error', 'Please select a CSV file to upload');
          return;
        }
        
        // Reset states
        holidaysUploadResult.classList.add('d-none');
        holidaysSuccessResult.classList.add('d-none');
        holidaysErrorResult.classList.add('d-none');
        holidaysResultDetails.classList.add('d-none');
        holidaysUploadProgress.classList.remove('d-none');
        holidaysUploadProgress.querySelector('.progress-bar').style.width = '0%';
        holidaysUploadProgress.querySelector('.progress-bar').textContent = '0%';
        
        const originalButtonText = holidaysUploadButton.innerHTML;
        holidaysUploadButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Uploading...';
        holidaysUploadButton.disabled = true;
        
        try {
          // Simulate progress
          const progressInterval = setInterval(() => {
            const progressBar = holidaysUploadProgress.querySelector('.progress-bar');
            const currentWidth = parseInt(progressBar.style.width);
            if (currentWidth < 90) {
              const newWidth = currentWidth + 10;
              progressBar.style.width = `${newWidth}%`;
              progressBar.textContent = `${newWidth}%`;
            }
          }, 200);
          
          // Send request to holidays bulk upload endpoint
          const response = await fetch('/api/holidays/bulk-upload', {
            method: 'POST',
            body: formData
          });
          
          clearInterval(progressInterval);
          holidaysUploadProgress.querySelector('.progress-bar').style.width = '100%';
          holidaysUploadProgress.querySelector('.progress-bar').textContent = '100%';
          
          const result = await response.json();
          
          setTimeout(() => {
            holidaysUploadProgress.classList.add('d-none');
            holidaysUploadResult.classList.remove('d-none');
            
            if (result.success) {
              holidaysSuccessResult.classList.remove('d-none');
              holidaysErrorResult.classList.add('d-none');
              holidaysSuccessMessage.textContent = result.message;
              
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
              if (result.details && result.details.failed && result.details.failed.length > 0) {
                detailsHtml += `
                  <div class="mt-3">
                    <h6>Failed Records:</h6>
                    <div class="table-responsive">
                      <table class="table table-sm table-bordered">
                        <thead>
                          <tr>
                            <th>Row</th>
                            <th>Holiday Name</th>
                            <th>Error</th>
                          </tr>
                        </thead>
                        <tbody>
                `;
                
                result.details.failed.forEach(failed => {
                  detailsHtml += `
                    <tr>
                      <td>${failed.row}</td>
                      <td>${failed.data.holiday_name || 'N/A'}</td>
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
              
              holidaysResultDetails.innerHTML = detailsHtml;
              holidaysResultDetails.classList.remove('d-none');
              
              // Show toast message
              if (result.summary && result.summary.failed === 0) {
                showToast('success', 'All holidays imported successfully!');
              } else {
                showToast('warning', `Import completed with ${result.summary?.failed || 0} errors.`);
              }
              
            } else {
              holidaysSuccessResult.classList.add('d-none');
              holidaysErrorResult.classList.remove('d-none');
              holidaysErrorMessage.textContent = result.message || 'Upload failed';
              
              // Show detailed errors if available
              if (result.errors) {
                let errorsHtml = '<ul class="mb-0 mt-2">';
                result.errors.forEach(error => {
                  errorsHtml += `<li>${error.message || error}</li>`;
                });
                errorsHtml += '</ul>';
                holidaysErrorMessage.innerHTML += errorsHtml;
              }
              
              showToast('error', 'Upload failed. Please check the errors and try again.');
            }
          }, 500);
          
        } catch (error) {
          console.error('Upload error:', error);
          holidaysUploadProgress.classList.add('d-none');
          holidaysUploadResult.classList.remove('d-none');
          holidaysSuccessResult.classList.add('d-none');
          holidaysErrorResult.classList.remove('d-none');
          holidaysErrorMessage.textContent = 'Network error. Please try again.';
          showToast('error', 'Upload failed. Please try again.');
        } finally {
          holidaysUploadButton.innerHTML = originalButtonText;
          holidaysUploadButton.disabled = false;
        }
      });
    }

    // Download template button for holidays
    if (downloadHolidayTemplateBtn) {
      downloadHolidayTemplateBtn.addEventListener('click', function(e) {
        showToast('info', 'Downloading holidays template file...');
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