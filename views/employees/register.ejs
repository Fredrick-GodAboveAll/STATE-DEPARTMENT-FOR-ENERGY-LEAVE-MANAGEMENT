<div class="card overflow-hidden mb-3">
  <div class="row g-0">
    <div class="col-md-8">
      <div class="card-body p-3">
        <p class="fs-10 mb-0">Employee Dashboard, <strong><%= userFirstName %></strong> <%= userLastName %></p>
        <div class="d-flex justify-content-between align-items-start mt-2">
          <div>
            <h5 class="mb-0">Employee Overview</h5>
            <p class="text-muted mb-0">Manage employees, add new staff and view statistics.</p>
          </div>
          <div class="d-none d-md-block">
            <button class="btn btn-falcon-default btn-sm" type="button" onclick="location.href='/employees/add-employee'">
              <span class="fas fa-user-plus" data-fa-transform="shrink-3 down-2"></span>
              <span class="d-none d-sm-inline-block ms-1">Add Employee</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-4 bg-primary text-white d-flex align-items-center">
      <div class="p-3 w-100 text-center">
        <div class="avatar avatar-xl rounded-3 bg-white-subtle text-white mx-auto mb-2">
          <span class="fas fa-users text-primary" style="font-size: 22px;"></span>
        </div>
        <div style="height:90px;">
          <canvas id="employeesRegisterChart" width="200" height="90" style="max-width:100%;"></canvas>
        </div>
        <div class="mt-2 text-white-50 fs--1">
          <small>Keep your team details up to date.</small>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Summary Cards Section -->

<script>
  // Small placeholder drawing for employeesRegisterChart canvas
  document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('employeesRegisterChart');
    if (canvas && canvas.getContext) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.fillStyle = 'rgba(255,255,255,0.12)';
      for (let i = 0; i < 4; i++) {
        ctx.fillRect(15 + i*45, canvas.height - 30 - i*6, 25, 30 + i*6);
      }
      ctx.fillStyle = 'rgba(255,255,255,0.9)';
      ctx.font = '12px Arial';
      ctx.fillText('Team Snapshot', 14, 14);
    }
  });

  // Set progress bar widths based on data-percentage attributes
  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.progress-bar[data-percentage]').forEach(function(el) {
      const p = parseFloat(el.getAttribute('data-percentage')) || 0;
      el.style.width = p + '%';
      el.setAttribute('aria-valuenow', p);
    });
  });
</script>

<div class="card mb-3">
  <div class="bg-holder d-none d-lg-block bg-card" style="background-image:url(../../assets/img/icons/spot-illustrations/corner-4.png);"></div>
  <div class="card-body p-0">
    <div class="tab-content">
      <div class="tab-pane preview-tab-pane active" role="tabpanel">
        <div class="card shadow-none">
          <div class="card-header">
            <div class="row flex-between-center">
              <div class="col-6 col-sm-auto d-flex align-items-center pe-0">
                <h5 class="mb-0">Employee Overview</h5>
              </div>
              <div class="col-6 col-sm-auto ms-auto text-end ps-0">
                <button class="btn btn-falcon-default btn-sm" type="button" onclick="location.href='/employees/add-employee'">
                  <span class="fas fa-user-plus" data-fa-transform="shrink-3 down-2"></span>
                  <span class="d-none d-sm-inline-block ms-1">Add Employee</span>
                </button>
                
                <!-- NEW: Department Assignment Button -->
                <button class="btn btn-falcon-info btn-sm ms-2" type="button" onclick="location.href='/employee-departments'">
                  <span class="fas fa-building" data-fa-transform="shrink-3 down-2"></span>
                  <span class="d-none d-sm-inline-block ms-1">Assign Departments</span>
                </button>
              </div>
            </div>
          </div>
          
          <!-- Summary Cards Row -->
          <div class="card-body px-4 pt-4 pb-3">
            <!-- First Row: Main Statistics -->
            <div class="row g-3 mb-4">
              <div class="col-md-3">
                <div class="card h-100 shadow-sm">
                  <div class="card-body p-3 d-flex align-items-center">
                    <div class="me-3">
                      <div class="avatar rounded-circle bg-soft-primary text-primary d-flex align-items-center justify-content-center" style="width:48px;height:48px;">
                        <span class="fas fa-users fs-4"></span>
                      </div>
                    </div>
                    <div>
                      <h6 class="mb-0">Total Employees</h6>
                      <h3 class="fw-bold mb-0"><%= totalEmployees || 0 %></h3>
                      <small class="text-muted">All staff</small>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-md-3">
                <div class="card h-100 shadow-sm">
                  <div class="card-body p-3 d-flex align-items-center">
                    <div class="me-3">
                      <div class="avatar rounded-circle bg-soft-success text-success d-flex align-items-center justify-content-center" style="width:48px;height:48px;">
                        <span class="fas fa-user-check fs-4"></span>
                      </div>
                    </div>
                    <div>
                      <h6 class="mb-0">Active Employees</h6>
                      <h3 class="fw-bold mb-0"><%= activeEmployees || 0 %></h3>
                      <small class="text-muted">Currently active</small>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-md-3">
                <div class="card h-100 shadow-sm">
                  <div class="card-body p-3 d-flex align-items-center">
                    <div class="me-3">
                      <div class="avatar rounded-circle bg-soft-warning text-warning d-flex align-items-center justify-content-center" style="width:48px;height:48px;">
                        <span class="fas fa-user-clock fs-4"></span>
                      </div>
                    </div>
                    <div>
                      <h6 class="mb-0">Retired Employees</h6>
                      <h3 class="fw-bold mb-0"><%= retiredEmployees || 0 %></h3>
                      <small class="text-muted">Retired staff</small>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-md-3">
                <div class="card h-100 shadow-sm">
                  <div class="card-body p-3 d-flex align-items-center">
                    <div class="me-3">
                      <div class="avatar rounded-circle bg-soft-danger text-danger d-flex align-items-center justify-content-center" style="width:48px;height:48px;">
                        <span class="fas fa-user-slash fs-4"></span>
                      </div>
                    </div>
                    <div>
                      <h6 class="mb-0">Inactive Employees</h6>
                      <h3 class="fw-bold mb-0"><%= inactiveEmployees || 0 %></h3>
                      <small class="text-muted">Not active</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Second Row: Additional Statistics -->
            <div class="row g-3 mb-4">
              <!-- NEW: Unassigned Employees Card -->
              <div class="col-md-3">
                <div class="card h-100 shadow-sm">
                  <div class="card-body p-3 d-flex align-items-center">
                    <div class="me-3">
                      <div class="avatar rounded-circle bg-soft-info text-info d-flex align-items-center justify-content-center" style="width:48px;height:48px;">
                        <span class="fas fa-question-circle fs-4"></span>
                      </div>
                    </div>
                    <div>
                      <h6 class="mb-0">Unassigned</h6>
                      <h3 class="fw-bold mb-0"><%= unassignedEmployees || 0 %></h3>
                      <small class="text-muted">No department</small>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Placeholder for future stats -->
              <div class="col-md-9">
                <div class="card border h-100">
                  <div class="card-body p-3 d-flex align-items-center justify-content-center">
                    <div class="text-center">
                      <span class="fas fa-chart-pie text-muted fa-2x mb-2"></span>
                      <h6 class="mb-0 text-muted">Department Statistics</h6>
                      <p class="text-muted mb-0 small">Click "Assign Departments" to manage</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Third Row: Gender and Employment Statistics -->
            <div class="row g-3 mb-4">
              <div class="col-md-4">
                <div class="card border h-100">
                  <div class="card-header bg-light py-2">
                    <h6 class="mb-0">Gender Distribution</h6>
                  </div>
                  <div class="card-body p-3">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="d-flex align-items-center mb-3">
                          <span class="fas fa-male text-primary fs-3 me-3"></span>
                          <div>
                            <h5 class="mb-0"><%= genderStats && genderStats.male ? genderStats.male : 0 %></h5>
                            <small class="text-muted">Male Employees</small>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="d-flex align-items-center mb-3">
                          <span class="fas fa-female text-success fs-3 me-3"></span>
                          <div>
                            <h5 class="mb-0"><%= genderStats && genderStats.female ? genderStats.female : 0 %></h5>
                            <small class="text-muted">Female Employees</small>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="progress" style="height: 10px;">
                      <% 
                        const maleCount = genderStats && genderStats.male ? genderStats.male : 0;
                        const femaleCount = genderStats && genderStats.female ? genderStats.female : 0;
                        const genderTotal = maleCount + femaleCount;
                        const malePercentage = genderTotal > 0 ? Math.round((maleCount / genderTotal) * 100) : 0;
                        const femalePercentage = genderTotal > 0 ? Math.round((femaleCount / genderTotal) * 100) : 0;
                      %>
                      <div class="progress-bar bg-primary" role="progressbar" data-percentage="<%= malePercentage %>" title="Male: <%= malePercentage %>%"></div>
                      <div class="progress-bar bg-success" role="progressbar" data-percentage="<%= femalePercentage %>" title="Female: <%= femalePercentage %>%"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="col-md-8">
                <div class="card border h-100">
                  <div class="card-header bg-light py-2">
                    <h6 class="mb-0">Employment Type Distribution</h6>
                  </div>
                  <div class="card-body p-3">
                    <% if (Object.keys(employmentStats || {}).length > 0) { 
                      let total = 0;
                      Object.keys(employmentStats).forEach(status => {
                        total += employmentStats[status];
                      });
                    %>
                      <% Object.keys(employmentStats).forEach(status => { 
                        const count = employmentStats[status];
                        const percentage = employmentPercentages[status] || 0;
                        let barColor = 'bg-primary';
                        if (status === 'Permanent') barColor = 'bg-success';
                        else if (status === 'Contract') barColor = 'bg-info';
                        else if (status === 'Temporary') barColor = 'bg-warning';
                        else if (status === 'Probation') barColor = 'bg-secondary';
                        else if (status === 'Casual') barColor = 'bg-primary';
                      %>
                      <div class="mb-3">
                        <div class="d-flex justify-content-between mb-1">
                          <span class="text-600"><%= status %></span>
                          <span class="fw-semi-bold"><%= count %> (<%= percentage %>%)</span>
                        </div>
                        <div class="progress" style="height: 8px;">
                          <div class="progress-bar <%= barColor %>" role="progressbar" data-percentage="<%= percentage %>" aria-valuenow="<%= percentage %>" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                      </div>
                      <% }); %>
                    <% } else { %>
                      <p class="text-muted mb-0">No employment type data available</p>
                    <% } %>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- NEW: Fourth Row - Department Distribution -->
            <% if (Object.keys(departmentStats || {}).length > 0) { %>
            <div class="row g-3">
              <div class="col-md-12">
                <div class="card border h-100">
                  <div class="card-header bg-light py-2">
                    <h6 class="mb-0">Department Distribution</h6>
                  </div>
                  <div class="card-body p-3">
                    <div class="row">
                      <% 
                        const deptEntries = Object.entries(departmentStats || {});
                        let deptTotal = 0;
                        deptEntries.forEach(([dept, count]) => {
                          deptTotal += count;
                        });
                      %>
                      <% deptEntries.forEach(([deptName, count], index) => { 
                        const percentage = deptTotal > 0 ? Math.round((count / deptTotal) * 100) : 0;
                        const colors = ['primary', 'success', 'info', 'warning', 'danger', 'secondary', 'dark'];
                        const colorClass = `bg-${colors[index % colors.length]}`;
                      %>
                      <div class="col-md-4 mb-3">
                        <div class="d-flex align-items-center mb-2">
                          <span class="fas fa-building me-2 text-<%= colors[index % colors.length] %>"></span>
                          <div class="flex-grow-1">
                            <div class="d-flex justify-content-between">
                              <span class="fw-semi-bold"><%= deptName %></span>
                              <span class="text-600"><%= count %> (<%= percentage %>%)</span>
                            </div>
                            <div class="progress" style="height: 6px;">
                              <div class="progress-bar <%= colorClass %>" role="progressbar" data-percentage="<%= percentage %>" aria-valuenow="<%= percentage %>" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <% }); %>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <% } %>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Employee Table - UPDATED WITH DEPARTMENT COLUMN -->
<div class="card mb-3">
  <div class="bg-holder d-none d-lg-block bg-card" style="background-image:url(../../assets/img/icons/spot-illustrations/corner-1.png); background-position: right bottom;"></div>
  <div class="card-body p-0">
    <div class="tab-content">
      <div class="tab-pane preview-tab-pane active" role="tabpanel">
        <div class="card shadow-none">
          <div class="card-header">
            <div class="row flex-between-center">
              <div class="col-6 col-sm-auto d-flex align-items-center pe-0">
                <h5 class="mb-0">All Employees</h5>
              </div>
              <div class="col-6 col-sm-auto ms-auto text-end ps-0">
                <button class="btn btn-falcon-success btn-sm" type="button" onclick="location.href='/employees/add-employee'">
                  <span class="fas fa-plus" data-fa-transform="shrink-3 down-2"></span>
                  <span class="d-none d-sm-inline-block ms-1">Add Employee</span>
                </button>
                
                <!-- NEW: Department Assignment Button -->
                <button class="btn btn-falcon-info btn-sm mx-2" type="button" onclick="location.href='/employee-departments'">
                  <span class="fas fa-building" data-fa-transform="shrink-3 down-2"></span>
                  <span class="d-none d-sm-inline-block ms-1">Assign Departments</span>
                </button>
                
                <button class="btn btn-falcon-default btn-sm" type="button" id="toggleFilters">
                  <span class="fas fa-filter" data-fa-transform="shrink-3 down-2"></span>
                  <span class="d-none d-sm-inline-block ms-1">Filter</span>
                </button>
                <button class="btn btn-falcon-default btn-sm" type="button" id="exportEmployees">
                  <span class="fas fa-external-link-alt" data-fa-transform="shrink-3 down-2"></span>
                  <span class="d-none d-sm-inline-block ms-1">Export</span>
                </button>
              </div>
            </div>
          </div>
          <div class="card-body px-0 pt-0">
            <table class="table table-sm mb-0 overflow-hidden data-table fs-10" 
              data-datatables='{"responsive":true,"pagingType":"simple","lengthChange":true,"pageLength":10,"searching":true,"bDeferRender":true,"serverSide":false,"language":{"info":"_START_ to _END_ of _TOTAL_ employees","search":"Search employees:","searchPlaceholder":"Search by name, payroll..."},"order":[[1,"asc"]],"columnDefs":[{"orderable":false,"targets":[0,14]}]}'>
              <thead class="bg-200">
                <tr>
                  <th class="text-900 no-sort white-space-nowrap" data-orderable="false">
                    <div class="form-check mb-0 d-flex align-items-center">
                      <input class="form-check-input" id="checkbox-bulk-item-select" type="checkbox" />
                    </div>
                  </th>
                  <th class="text-900 sort white-space-nowrap">Payroll Number</th>
                  <th class="text-900 sort white-space-nowrap">Full Name</th>
                  <th class="text-900 sort white-space-nowrap">ID Number</th>
                  <th class="text-900 sort white-space-nowrap">Gender</th>
                  <th class="text-900 sort white-space-nowrap">Age</th>
                  <th class="text-900 sort white-space-nowrap">Designation</th>
                  <th class="text-900 sort white-space-nowrap">Job Group</th>
                  <th class="text-900 sort white-space-nowrap">Status</th>
                  <th class="text-900 sort white-space-nowrap">Retirement Date</th>
                  <th class="text-900 sort white-space-nowrap">Employment Status</th>
                  <th class="text-900 sort white-space-nowrap">Date of Birth</th>
                  <th class="text-900 sort white-space-nowrap">Department</th>
                  <th class="text-900 sort white-space-nowrap">Disability</th>
                  <th class="text-900 sort white-space-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody class="list" id="table-simple-pagination-body">
                <% if (employees && employees.length > 0) { %>
                  <% employees.forEach((employee, index) => { 
                    // Fix 1: Status badge logic - check for text in status string
                    let statusClass = 'badge-subtle-success';
                    let statusIcon = 'fa-check';
                    let statusText = employee.status || 'Unknown';
                    
                    if (statusText && statusText.includes('Active')) {
                      statusClass = 'badge-subtle-success';
                      statusIcon = 'fa-check';
                    } else if (statusText && (statusText.includes('Retired') || statusText.includes('Retirement'))) {
                      statusClass = 'badge-subtle-warning';
                      statusIcon = 'fa-user-clock';
                    } else if (statusText && statusText.includes('Terminated')) {
                      statusClass = 'badge-subtle-danger';
                      statusIcon = 'fa-user-slash';
                    } else if (statusText && (statusText.includes('Inactive') || statusText.includes('In-active'))) {
                      statusClass = 'badge-subtle-secondary';
                      statusIcon = 'fa-pause';
                    }
                    
                    // Fix 2: Gender display - M/F to Male/Female
                    let genderDisplay = '-';
                    let genderBadgeClass = 'badge-subtle-secondary';
                    
                    if (employee.gender === 'M' || employee.gender === 'Male') {
                      genderDisplay = 'Male';
                      genderBadgeClass = 'badge-subtle-primary';
                    } else if (employee.gender === 'F' || employee.gender === 'Female') {
                      genderDisplay = 'Female';
                      genderBadgeClass = 'badge-subtle-success';
                    } else if (employee.gender === 'Other') {
                      genderDisplay = 'Other';
                      genderBadgeClass = 'badge-subtle-info';
                    }
                    
                    // Fix 3: Retirement date - display as-is in dd/mm/yyyy format
                    let retirementDisplay = employee.retirement_date || '-';
                    
                    // Fix 4: Employment status badge
                    let empStatusClass = 'badge-subtle-primary';
                    let empStatusText = employee.employment_status || '-';
                    
                    if (empStatusText === 'Permanent') {
                      empStatusClass = 'badge-subtle-success';
                    } else if (empStatusText === 'Contract') {
                      empStatusClass = 'badge-subtle-info';
                    } else if (empStatusText === 'Temporary') {
                      empStatusClass = 'badge-subtle-warning';
                    } else if (empStatusText === 'Probation') {
                      empStatusClass = 'badge-subtle-secondary';
                    } else if (empStatusText === 'Casual') {
                      empStatusClass = 'badge-subtle-primary';
                    }
                    
                    // NEW: Department badge - display NA if not assigned
                    let deptBadgeClass = 'badge-subtle-warning';
                    let deptIcon = 'fa-question-circle';
                    let deptText = 'NA';
                    
                    if (employee.department_id && employee.department_id !== 'NA' && employee.department_name) {
                      deptBadgeClass = 'badge-subtle-info';
                      deptIcon = 'fa-building';
                      deptText = employee.department_name;
                    }
                    
                    // NEW: Disability badge - Direct display of "yes"/"no"
                    let disabilityText = '-';
                    let disabilityBadgeClass = 'badge-subtle-secondary';
                    
                    const disabilityValue = employee.disability;
                    if (disabilityValue === 'yes') {
                      disabilityText = 'yes';
                      disabilityBadgeClass = 'badge-subtle-info';
                    } else if (disabilityValue === 'no') {
                      disabilityText = 'no';
                      disabilityBadgeClass = 'badge-subtle-success';
                    }
                  %>
                  <tr class="btn-reveal-trigger">
                    <td class="align-middle" style="width: 28px;">
                      <div class="form-check mb-0">
                        <input class="form-check-input" type="checkbox" id="employee-<%= index %>" />
                      </div>
                    </td>
                    <td class="align-middle white-space-nowrap fw-semi-bold">
                      <a href="#!" class="text-primary">
                        <%= employee.payroll_number || 'N/A' %>
                      </a>
                    </td>
                    <td class="align-middle white-space-nowrap fw-semi-bold">
                      <%= employee.full_name || 'Not specified' %>
                    </td>
                    <td class="align-middle white-space-nowrap">
                      <%= employee.id_number || 'N/A' %>
                    </td>
                    <td class="align-middle white-space-nowrap">
                      <span class="badge <%= genderBadgeClass %> rounded-pill">
                        <%= genderDisplay %>
                      </span>
                    </td>
                    <td class="align-middle white-space-nowrap">
                      <span class="fw-semi-bold"><%= employee.age || '-' %></span>
                    </td>
                    <td class="align-middle" style="max-width: 200px;">
                      <div class="text-truncate" title="<%= employee.designation || 'Not specified' %>">
                        <%= employee.designation || 'Not specified' %>
                      </div>
                    </td>
                    <td class="align-middle white-space-nowrap">
                      <span class="badge badge-subtle-warning rounded-pill">
                        <%= employee.job_group || '-' %>
                      </span>
                    </td>
                    <td class="align-middle white-space-nowrap">
                      <span class="badge <%= statusClass %> rounded-pill d-inline-flex align-items-center">
                        <%= statusText %>
                        <span class="ms-1 fas <%= statusIcon %>" data-fa-transform="shrink-2"></span>
                      </span>
                    </td>
                    <td class="align-middle white-space-nowrap">
                      <%= retirementDisplay %>
                    </td>
                    <td class="align-middle white-space-nowrap">
                      <span class="badge <%= empStatusClass %> rounded-pill">
                        <%= empStatusText %>
                      </span>
                    </td>
                    <td class="align-middle white-space-nowrap">
                      <%= employee.date_of_birth || '-' %>
                    </td>
                    <td class="align-middle white-space-nowrap">
                      <span class="badge <%= deptBadgeClass %> rounded-pill d-inline-flex align-items-center">
                        <span class="fas <%= deptIcon %> me-1" data-fa-transform="shrink-2"></span>
                        <%= deptText %>
                      </span>
                    </td>
                    <td class="align-middle white-space-nowrap">
                      <span class="badge <%= disabilityBadgeClass %> rounded-pill">
                        <%= disabilityText %>
                      </span>
                    </td>
                    <td class="align-middle white-space-nowrap text-end">
                      <div class="btn-group" role="group">
                        <button class="btn btn-sm btn-falcon-default view-employee" data-id="<%= employee.id %>" title="View">
                          <span class="fas fa-eye"></span>
                        </button>
                        <button class="btn btn-sm btn-falcon-default edit-employee" data-id="<%= employee.id %>" title="Edit">
                          <span class="fas fa-edit"></span>
                        </button>
                        <button class="btn btn-sm btn-falcon-default text-danger delete-employee" data-id="<%= employee.id %>" data-name="<%= employee.full_name %>" title="Delete">
                          <span class="fas fa-trash"></span>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <% }); %>
                <% } else { %>
                  <tr>
                    <td colspan="15" class="text-center py-5">
                      <div class="text-muted">
                        <span class="fas fa-users fa-3x mb-3"></span>
                        <h5 class="mb-1">No employees found</h5>
                        <p class="mb-0">Click "Add Employee" to create your first employee</p>
                      </div>
                    </td>
                  </tr>
                <% } %>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    // Simple button click handlers
    document.getElementById('exportEmployees')?.addEventListener('click', function() {
      alert('Export feature would be implemented here');
    });
    
    document.getElementById('toggleFilters')?.addEventListener('click', function() {
      alert('Filter feature would be implemented here');
    });
    
    // Employee action buttons
    document.querySelectorAll('.view-employee').forEach(button => {
      button.addEventListener('click', function() {
        const id = this.getAttribute('data-id');
        alert(`View employee ID: ${id}`);
      });
    });
    
    document.querySelectorAll('.edit-employee').forEach(button => {
      button.addEventListener('click', function() {
        const id = this.getAttribute('data-id');
        // Redirect to edit page or open modal
        // window.location.href = `/employees/edit/${id}`;
        alert(`Edit employee ID: ${id}`);
      });
    });
    
    document.querySelectorAll('.delete-employee').forEach(button => {
      button.addEventListener('click', function() {
        const id = this.getAttribute('data-id');
        const name = this.getAttribute('data-name');
        if (confirm(`Are you sure you want to delete "${name}"?`)) {
          alert(`Would delete employee ID: ${id}`);
        }
      });
    });
    
    // Bulk select checkbox
    const bulkSelectCheckbox = document.getElementById('checkbox-bulk-item-select');
    if (bulkSelectCheckbox) {
      bulkSelectCheckbox.addEventListener('change', function() {
        const checkboxes = document.querySelectorAll('tbody .form-check-input');
        checkboxes.forEach(checkbox => {
          checkbox.checked = this.checked;
        });
      });
    }
    
    // NEW: Quick department assignment (optional enhancement)
    // This can be added later for inline editing
    // For now, we just have the department column display
  });
</script>