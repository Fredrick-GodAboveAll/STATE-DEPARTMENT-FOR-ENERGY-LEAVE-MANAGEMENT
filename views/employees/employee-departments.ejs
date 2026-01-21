<!-- views/employees/employee-departments.ejs -->
<div class="d-flex mb-4 mt-3">
  <span class="fa-stack me-2 ms-n1">
    <i class="fas fa-circle fa-stack-2x text-300"></i>
    <i class="fa-inverse fa-stack-1x text-primary fas fa-sitemap"></i>
  </span>
  <div class="col">
    <h5 class="mb-0 text-primary position-relative">
      <span class="bg-200 dark__bg-1100 pe-3">Department Management</span>
      <span class="border position-absolute top-50 translate-middle-y w-100 start-0 z-n1"></span>
    </h5>
    <p class="mb-0">Manage department assignments and organizational structure</p>
  </div>
</div>

<!-- Main Header Card with Stats -->
<div class="card overflow-hidden mb-4">
  <div class="bg-holder bg-card" style="background-image:url(/assets/img/icons/spot-illustrations/corner-4.png);"></div>
  <div class="card-body position-relative">
    <div class="row align-items-center">
      <div class="col">
        <h4 class="mb-2 text-1100">Department Assignments</h4>
        <p class="text-700 mb-0">
          Welcome back, <strong><%= userFirstName %></strong> <%= userLastName %>! 
          Manage your team organization and department rosters.
        </p>
      </div>
      <div class="col-auto">
        <button class="btn btn-falcon-primary" type="button" onclick="location.href='/departments'">
          <span class="fas fa-plus me-1" data-fa-transform="shrink-3"></span>
          <span class="d-none d-sm-inline-block">Add Department</span>
        </button>
      </div>
    </div>
  </div>
</div>

<!-- Stats Cards - Enhanced from tools reference -->
<div class="row g-3 mb-4">
  <div class="col-sm-6 col-md-3">
    <div class="card overflow-hidden" style="min-width: 12rem">
      <div class="bg-holder bg-card" style="background-image:url(assets/img/icons/spot-illustrations/corner-1.png);"></div>
      <div class="card-body position-relative">
        <h6 class="text-700">Total Employees<span class="badge badge-subtle-primary rounded-pill ms-2"><span class="fas fa-users"></span></span></h6>
        <div class="display-4 fs-5 mb-2 fw-normal font-sans-serif text-primary" id="totalEmployeesCount"><%= totalEmployees || 0 %></div>
        <a class="fw-semi-bold fs-10 text-nowrap" href="#!">All staff<span class="fas fa-angle-right ms-1" data-fa-transform="down-1"></span></a>
      </div>
    </div>
  </div>
  
  <div class="col-sm-6 col-md-3">
    <div class="card overflow-hidden" style="min-width: 12rem">
      <div class="bg-holder bg-card" style="background-image:url(assets/img/icons/spot-illustrations/corner-2.png);"></div>
      <div class="card-body position-relative">
        <h6 class="text-700">Assigned<span class="badge badge-subtle-success rounded-pill ms-2"><span class="fas fa-check-circle"></span></span></h6>
        <div class="display-4 fs-5 mb-2 fw-normal font-sans-serif text-success" id="assignedCount"><%= assignedCount || 0 %></div>
        <a class="fw-semi-bold fs-10 text-nowrap" href="#!">With department<span class="fas fa-angle-right ms-1" data-fa-transform="down-1"></span></a>
      </div>
    </div>
  </div>
  
  <div class="col-sm-6 col-md-3">
    <div class="card overflow-hidden" style="min-width: 12rem">
      <div class="bg-holder bg-card" style="background-image:url(assets/img/icons/spot-illustrations/corner-3.png);"></div>
      <div class="card-body position-relative">
        <h6 class="text-700">Unassigned<span class="badge badge-subtle-warning rounded-pill ms-2"><span class="fas fa-exclamation-triangle"></span></span></h6>
        <div class="display-4 fs-5 mb-2 fw-normal font-sans-serif text-warning" id="unassignedCountDisplay"><%= unassignedCount || 0 %></div>
        <a class="fw-semi-bold fs-10 text-nowrap" href="#unassignedTable">Assign now<span class="fas fa-angle-right ms-1" data-fa-transform="down-1"></span></a>
      </div>
    </div>
  </div>
  
  <div class="col-sm-6 col-md-3">
    <div class="card overflow-hidden" style="min-width: 12rem">
      <div class="bg-holder bg-card" style="background-image:url(assets/img/icons/spot-illustrations/corner-4.png);"></div>
      <div class="card-body position-relative">
        <h6 class="text-700">Completion<span class="badge badge-subtle-info rounded-pill ms-2"><%= assignedPercentage || 0 %>%</span></h6>
        <div class="display-4 fs-5 mb-2 fw-normal font-sans-serif" id="assignedPercentageDisplay"><%= assignedPercentage || 0 %>%</div>
        <a class="fw-semi-bold fs-10 text-nowrap" href="#distributionTable">View progress<span class="fas fa-angle-right ms-1" data-fa-transform="down-1"></span></a>
      </div>
    </div>
  </div>
</div>

<!-- Department Distribution Chart Card -->
<div class="card mb-4">
  <div class="card-header bg-body-tertiary d-flex flex-between-center py-2">
    <h6 class="mb-0">Department Distribution</h6>
    <div class="dropdown font-sans-serif btn-reveal-trigger">
      <button class="btn btn-link text-600 btn-sm dropdown-toggle dropdown-caret-none btn-reveal" type="button" 
              data-bs-toggle="dropdown" data-boundary="viewport" aria-haspopup="true" aria-expanded="false">
        <span class="fas fa-ellipsis-h fs-11"></span>
      </button>
      <div class="dropdown-menu dropdown-menu-end border py-2">
        <a class="dropdown-item" href="#!" onclick="exportDistributionData()">Export</a>
        <a class="dropdown-item" href="#!" id="refreshDistribution">Refresh</a>
        <div class="dropdown-divider"></div>
        <a class="dropdown-item text-danger" href="#!" onclick="resetAssignments()">Reset All</a>
      </div>
    </div>
  </div>
  <div class="card-body">
    <div class="row">
      <div class="col-md-8">
        <!-- Bar Chart for Department Distribution -->
        <div class="echart-bar-department-distribution" style="height:250px" data-echart-responsive="true"></div>
      </div>
      <div class="col-md-4 mt-3 mt-md-0">
        <div class="fs-11">
          <% let totalAssigned = 0; %>
          <% if (departments && departments.length > 0) { %>
            <% departments.forEach(dept => { 
              const deptEmployees = employees ? employees.filter(emp => emp.department_id == dept.id) : [];
              const percentage = totalEmployees > 0 ? Math.round((deptEmployees.length / totalEmployees) * 100) : 0;
              totalAssigned += deptEmployees.length;
            %>
            <div class="d-flex flex-between-center mb-2">
              <div class="d-flex align-items-center">
                <span class="dot bg-primary"></span>
                <span class="fw-semi-bold ms-2"><%= dept.name %></span>
              </div>
              <div><%= deptEmployees.length %> (<%= percentage %>%)</div>
            </div>
            <% }); %>
          <% } %>
          <div class="d-flex flex-between-center mb-2">
            <div class="d-flex align-items-center">
              <span class="dot bg-warning"></span>
              <span class="fw-semi-bold ms-2">Unassigned</span>
            </div>
            <div><%= unassignedCount %> (<%= unassignedPercentage %>%)</div>
          </div>
          <hr class="my-3" />
          <div class="d-flex flex-between-center fw-bold">
            <span>Total Employees</span>
            <span><%= totalEmployees %></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


            
            
              <div class="card h-100 mb-4">
                <div class="card-header bg-body-tertiary d-flex flex-between-center py-2">
                  <h6 class="mb-0">Course Enrollment</h6>
                  <div class="ms-auto"><select class="form-select form-select-sm">
                      <option value="week" selected="selected">Last 7 days</option>
                      <option value="month">Last month</option>
                    </select></div>
                </div>
                <div class="card-body"><!-- Find the JS file for the following chart at: src/js/charts/echarts/course-enrollments.js--><!-- If you are not using gulp based workflow, you can find the transpiled code at: public/assets/js/theme.js-->
                  <div class="echart-bar-course-enrollments" data-echart-responsive="true" _echarts_instance_="ec_1767436008296" style="user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); position: relative;"><div style="position: relative; width: 381px; height: 250px; padding: 0px; margin: 0px; border-width: 0px; cursor: default;"><canvas data-zr-dom-id="zr_0" width="420" height="276" style="position: absolute; left: 0px; top: 0px; width: 381px; height: 250px; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); padding: 0px; margin: 0px; border-width: 0px;"></canvas></div><div class="" style="position: absolute; display: none; border-style: solid; white-space: nowrap; z-index: 9999999; box-shadow: rgba(0, 0, 0, 0.2) 1px 2px 10px; background-color: rgb(249, 250, 253); border-width: 1px; border-radius: 4px; color: rgb(11, 23, 39); font: 14px / 21px &quot;Microsoft YaHei&quot;; padding: 7px 10px; top: 0px; left: 0px; transform: translate3d(77px, 136px, 0px); border-color: rgb(44, 123, 229); pointer-events: none;"><div class="fw-semibold">Paid Course</div><div class="fs-10 text-600"><strong>Sun:</strong> 8500</div></div></div>
                
                
                
                
                </div>
              </div>
          

<!-- Unassigned Employees Card with Progress -->
<div class="card mb-4">
  <div class="card-header bg-body-tertiary d-flex flex-between-center py-2">
    <div class="d-flex align-items-center">
      <span class="fas fa-users text-warning me-2"></span>
      <h6 class="mb-0">Unassigned Employees</h6>
      <span class="badge rounded-pill bg-warning ms-2"><%= unassignedCount %></span>
    </div>
    <div class="d-flex align-items-center">
      <select class="form-select form-select-sm me-2" id="bulkAssignDept" style="width: auto;">
        <option value="">Select department...</option>
        <% if (departments && departments.length > 0) { %>
          <% departments.forEach(dept => { %>
          <option value="<%= dept.id %>"><%= dept.name %></option>
          <% }); %>
        <% } %>
      </select>
      <button class="btn btn-falcon-primary btn-sm" id="bulkAssignBtn" disabled>
        <span class="fas fa-users me-1" data-fa-transform="shrink-3"></span>
        <span class="d-none d-sm-inline-block">Assign Selected</span>
      </button>
    </div>
  </div>
  <div class="card-body">
    <% if (unassignedEmployees && unassignedEmployees.length > 0) { %>
      <div class="table-responsive">
        <table class="table table-sm mb-0 overflow-hidden data-table fs-10" 
               id="unassignedTable">
          <thead class="bg-200">
            <tr>
              <th class="text-900 no-sort white-space-nowrap" style="width: 40px;">
                <div class="form-check mb-0 d-flex align-items-center">
                  <input class="form-check-input" id="selectAllUnassigned" type="checkbox" />
                </div>
              </th>
              <th class="text-900 sort white-space-nowrap">Employee Details</th>
              <th class="text-900 sort white-space-nowrap">Payroll No.</th>
              <th class="text-900 sort white-space-nowrap">Designation</th>
              <th class="text-900 sort white-space-nowrap">Status</th>
              <th class="text-900 no-sort white-space-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody class="list">
            <% unassignedEmployees.forEach(employee => { 
              let statusClass = 'badge-subtle-success';
              let statusText = employee.status || 'Unknown';
              
              if (statusText && statusText.includes('Active')) {
                statusClass = 'badge-subtle-success';
              } else if (statusText && (statusText.includes('Retired') || statusText.includes('Retirement'))) {
                statusClass = 'badge-subtle-warning';
              } else if (statusText && statusText.includes('Terminated')) {
                statusClass = 'badge-subtle-danger';
              } else if (statusText && (statusText.includes('Inactive') || statusText.includes('In-active'))) {
                statusClass = 'badge-subtle-secondary';
              }
            %>
            <tr class="btn-reveal-trigger">
              <td class="align-middle">
                <div class="form-check mb-0">
                  <input class="form-check-input employee-checkbox" type="checkbox" value="<%= employee.id %>" />
                </div>
              </td>
              <td class="align-middle white-space-nowrap fw-semi-bold">
                <a href="#!" class="text-primary">
                  <%= employee.full_name || 'Not specified' %>
                </a>
                <br>
                <small class="text-muted"><%= employee.id_number || 'N/A' %></small>
              </td>
              <td class="align-middle white-space-nowrap">
                <span class="fw-semi-bold"><%= employee.payroll_number || '-' %></span>
              </td>
              <td class="align-middle" style="max-width: 200px;">
                <div class="text-truncate">
                  <%= employee.designation || 'Not specified' %>
                </div>
              </td>
              <td class="align-middle white-space-nowrap">
                <span class="badge <%= statusClass %> rounded-pill">
                  <%= statusText %>
                </span>
              </td>
              <td class="align-middle white-space-nowrap">
                <div class="dropdown">
                  <button class="btn btn-falcon-default btn-sm dropdown-toggle" type="button" 
                          data-bs-toggle="dropdown" aria-expanded="false">
                    <span class="fas fa-building"></span>
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end">
                    <% if (departments && departments.length > 0) { %>
                      <% departments.forEach(dept => { %>
                      <li>
                        <a class="dropdown-item assign-single" href="#" 
                           data-employee-id="<%= employee.id %>" 
                           data-department-id="<%= dept.id %>">
                          <span class="fas fa-plus me-2"></span><%= dept.name %>
                        </a>
                      </li>
                      <% }); %>
                    <% } else { %>
                      <li><a class="dropdown-item disabled" href="#">No departments</a></li>
                    <% } %>
                  </ul>
                </div>
              </td>
            </tr>
            <% }); %>
          </tbody>
        </table>
      </div>
    <% } else { %>
      <div class="text-center py-5">
        <div class="icon-circle icon-circle-success mb-3">
          <span class="fas fa-check text-success fs-4"></span>
        </div>
        <h5 class="mb-1">All Employees Assigned!</h5>
        <p class="text-600 mb-3">Every employee has been assigned to a department.</p>
        <button class="btn btn-falcon-primary btn-sm" onclick="location.href='/departments'">
          <span class="fas fa-plus me-1"></span> Create New Department
        </button>
      </div>
    <% } %>
  </div>
</div>

<!-- Department Assignments Card -->
<div class="card mb-4">
  <div class="card-header bg-body-tertiary d-flex flex-between-center py-2">
    <div class="d-flex align-items-center">
      <span class="fas fa-sitemap text-primary me-2"></span>
      <h6 class="mb-0">Department Assignments</h6>
    </div>
    <div class="d-flex">
      <button class="btn btn-falcon-default btn-sm me-2" type="button" onclick="location.href='/departments'">
        <span class="fas fa-plus me-1" data-fa-transform="shrink-3"></span>
        <span class="d-none d-sm-inline-block">Add Department</span>
      </button>
      <div class="dropdown font-sans-serif btn-reveal-trigger">
        <button class="btn btn-link text-600 btn-sm dropdown-toggle dropdown-caret-none btn-reveal" type="button" 
                data-bs-toggle="dropdown" data-boundary="viewport" aria-haspopup="true" aria-expanded="false">
          <span class="fas fa-ellipsis-h fs-11"></span>
        </button>
        <div class="dropdown-menu dropdown-menu-end border py-2">
          <a class="dropdown-item" href="#!" onclick="exportDepartmentData()">Export Data</a>
          <a class="dropdown-item" href="#!" onclick="printReport()">Print Report</a>
        </div>
      </div>
    </div>
  </div>
  <div class="card-body">
    <% if (departments && departments.length > 0) { %>
      <div class="table-responsive">
        <table class="table table-sm mb-0 overflow-hidden data-table fs-10" 
               id="departmentsTable">
          <thead class="bg-200">
            <tr>
              <th class="text-900 sort white-space-nowrap">Department</th>
              <th class="text-900 sort white-space-nowrap">Code</th>
              <th class="text-900 sort white-space-nowrap">Employee Count</th>
              <th class="text-900 sort white-space-nowrap">Progress</th>
              <th class="text-900 no-sort white-space-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody class="list">
            <% departments.forEach(dept => { 
              const deptEmployees = employees ? employees.filter(emp => emp.department_id == dept.id) : [];
            %>
            <tr class="btn-reveal-trigger">
              <td class="align-middle white-space-nowrap fw-semi-bold">
                <div class="d-flex align-items-center">
                  <div class="avatar avatar-sm rounded-circle bg-soft-primary text-primary d-flex align-items-center justify-content-center me-2">
                    <span class="fas fa-building"></span>
                  </div>
                  <div>
                    <a href="#!" class="text-primary">
                      <%= dept.name || 'Not specified' %>
                    </a>
                    <% if (dept.description) { %>
                      <br><small class="text-muted"><%= dept.description %></small>
                    <% } %>
                  </div>
                </div>
              </td>
              <td class="align-middle white-space-nowrap">
                <span class="badge badge-subtle-info rounded-pill">
                  <%= dept.code || '-' %>
                </span>
              </td>
              <td class="align-middle white-space-nowrap">
                <h6 class="mb-0"><%= deptEmployees.length %> employees</h6>
                <small class="text-600"><%= Math.round((deptEmployees.length / totalEmployees) * 100) || 0 %>% of total</small>
              </td>
              <td class="align-middle" style="width: 150px;">
                <div class="progress-stacked rounded-3" style="height: 8px;">
                  <div class="progress" style="width: <%= Math.round((deptEmployees.length / totalEmployees) * 100) || 0 %>%" 
                       role="progressbar" aria-valuenow="<%= Math.round((deptEmployees.length / totalEmployees) * 100) || 0 %>" 
                       aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar bg-progress-gradient"></div>
                  </div>
                </div>
              </td>
              <td class="align-middle white-space-nowrap">
                <div class="btn-group btn-group-sm" role="group">
                  <button type="button" class="btn btn-falcon-primary btn-sm add-to-dept" 
                          data-department-id="<%= dept.id %>" title="Add employees">
                    <span class="fas fa-plus"></span>
                  </button>
                  <button type="button" class="btn btn-falcon-default btn-sm dropdown-toggle" 
                          data-bs-toggle="dropdown" aria-expanded="false">
                    <span class="fas fa-ellipsis-v"></span>
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end">
                    <li><h6 class="dropdown-header">Department Actions</h6></li>
                    <li>
                      <a class="dropdown-item text-primary view-dept-employees" href="#" 
                         data-bs-toggle="modal" data-bs-target="#viewDeptModal" 
                         data-dept-id="<%= dept.id %>">
                        <span class="fas fa-eye me-2"></span>View Employees
                      </a>
                    </li>
                    <% if (deptEmployees.length > 0) { %>
                    <li>
                      <a class="dropdown-item text-success" href="#" data-bs-toggle="modal" 
                         data-bs-target="#transferModal" data-dept-id="<%= dept.id %>"
                         data-dept-name="<%= dept.name %>">
                        <span class="fas fa-exchange-alt me-2"></span>Transfer
                      </a>
                    </li>
                    <li><hr class="dropdown-divider"></li>
                    <li>
                      <a class="dropdown-item text-danger clear-dept" href="#" 
                         data-dept-id="<%= dept.id %>" data-dept-name="<%= dept.name %>">
                        <span class="fas fa-times me-2"></span>Clear All
                      </a>
                    </li>
                    <% } %>
                  </ul>
                </div>
              </td>
            </tr>
            <% }); %>
          </tbody>
        </table>
      </div>
    <% } else { %>
      <div class="text-center py-5">
        <div class="icon-circle icon-circle-info mb-3">
          <span class="fas fa-building text-info fs-4"></span>
        </div>
        <h5 class="mb-1">No Departments Found</h5>
        <p class="text-600 mb-3">Create departments first to assign employees.</p>
        <a href="/departments" class="btn btn-primary">
          <span class="fas fa-plus me-1"></span> Create Departments
        </a>
      </div>
    <% } %>
  </div>
</div>

<!-- Assignment Progress Card -->
<div class="card">
  <div class="card-header bg-body-tertiary py-2">
    <h6 class="mb-0">Assignment Completion Progress</h6>
  </div>
  <div class="card-body">
    <div class="row g-3">
      <div class="col-md-8">
        <div class="d-flex align-items-center">
          <div class="flex-1 me-4">
            <h6 class="mb-2">Overall Completion</h6>
            <div class="progress" style="height: 10px;">
              <div class="progress-bar bg-success" role="progressbar" 
                   style="width: <%- assignedPercentage %>%" 
                   aria-valuenow="<%- assignedPercentage %>" 
                   aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>
          <div class="text-center">
            <h5 class="mb-0"><%- assignedPercentage %>%</h5>
            <small class="text-600">Complete</small>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="d-flex justify-content-around text-center">
          <div>
            <h5 class="mb-0 text-success"><%- assignedCount %></h5>
            <small class="text-600">Assigned</small>
          </div>
          <div>
            <h5 class="mb-0 text-warning"><%- unassignedCount %></h5>
            <small class="text-600">Unassigned</small>
          </div>
          <div>
            <h5 class="mb-0 text-primary"><%- departments ? departments.length : 0 %></h5>
            <small class="text-600">Departments</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Modals (keep existing modals) -->
<!-- View Department Employees Modal -->
<div class="modal fade" id="viewDeptModal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Department Employees</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div id="deptEmployeesList"></div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

<!-- Toast Container -->
<div class="position-fixed top-0 end-0 p-3" style="z-index: 1100;">
  <div id="toastContainer"></div>
</div>

<script>
// Global variables
let unassignedTable, departmentsTable;

document.addEventListener('DOMContentLoaded', function() {
  // Initialize DataTables
  initializeDataTables();
  
  // Initialize count-up animations
  initializeCountUps();
  
  // Initialize ECharts chart (if available)
  setTimeout(() => {
    if (typeof echarts !== 'undefined') {
      initializeDepartmentChart();
    }
  }, 500);
  
  // Set up event handlers
  setupEventHandlers();
});

function initializeDataTables() {
  // Check if DataTables is already initialized
  if (!$.fn.DataTable.isDataTable('#unassignedTable')) {
    unassignedTable = $('#unassignedTable').DataTable({
      responsive: true,
      pagingType: 'simple_numbers',
      lengthChange: true,
      pageLength: 10,
      searching: true,
      bDeferRender: true,
      serverSide: false,
      language: {
        info: "_START_ to _END_ of _TOTAL_ unassigned employees",
        search: "Search unassigned:",
        searchPlaceholder: "Search by name, payroll..."
      },
      order: [[1, 'asc']],
      columnDefs: [
        { orderable: false, targets: [0, 5] }
      ],
      initComplete: function() {
        // Select all checkbox functionality
        $('#selectAllUnassigned').on('change', function() {
          const isChecked = this.checked;
          $('.employee-checkbox').prop('checked', isChecked);
          updateBulkAssignButton();
        });
        
        // Individual checkbox functionality
        $('#unassignedTable tbody').on('change', '.employee-checkbox', function() {
          updateBulkAssignButton();
          
          // Update select all checkbox state
          const totalCheckboxes = $('.employee-checkbox').length;
          const checkedCheckboxes = $('.employee-checkbox:checked').length;
          $('#selectAllUnassigned').prop('checked', totalCheckboxes === checkedCheckboxes);
        });
      }
    });
  }
  
  if (!$.fn.DataTable.isDataTable('#departmentsTable')) {
    departmentsTable = $('#departmentsTable').DataTable({
      responsive: true,
      pagingType: 'simple_numbers',
      lengthChange: true,
      pageLength: 5,
      searching: true,
      bDeferRender: true,
      serverSide: false,
      language: {
        info: "_START_ to _END_ of _TOTAL_ departments",
        search: "Search departments:",
        searchPlaceholder: "Search by name, code..."
      },
      order: [[0, 'asc']],
      columnDefs: [
        { orderable: false, targets: [4] }
      ]
    });
  }
}

function initializeCountUps() {
  // Initialize count-up animations if CountUp library is available
  if (typeof CountUp !== 'undefined') {
    try {
      // Total Employees
      if ($('#totalEmployeesCount').length) {
        const totalEmployees = parseInt($('#totalEmployeesCount').text()) || 0;
        new CountUp('totalEmployeesCount', totalEmployees, {
          duration: 2,
          separator: ','
        }).start();
      }
      
      // Assigned Count
      if ($('#assignedCount').length) {
        const assignedCount = parseInt($('#assignedCount').text()) || 0;
        new CountUp('assignedCount', assignedCount, {
          duration: 2,
          separator: ','
        }).start();
      }
      
      // Unassigned Count
      if ($('#unassignedCountDisplay').length) {
        const unassignedCount = parseInt($('#unassignedCountDisplay').text()) || 0;
        new CountUp('unassignedCountDisplay', unassignedCount, {
          duration: 2,
          separator: ','
        }).start();
      }
    } catch (e) {
      console.log('CountUp initialization error:', e);
    }
  }
}

function initializeDepartmentChart() {
  const chartElement = document.querySelector('.echart-bar-department-distribution');
  if (!chartElement) return;
  
  try {
    const departments = <%- JSON.stringify(departments || []) %>;
    const employees = <%- JSON.stringify(employees || []) %>;
    const totalEmployees = <%- totalEmployees || 0 %>;
    
    const departmentNames = departments.map(d => d.name);
    const employeeCounts = departments.map(dept => {
      return (employees || []).filter(emp => emp.department_id == dept.id).length;
    });
    
    // Add unassigned
    departmentNames.push('Unassigned');
    employeeCounts.push(<%- unassignedCount || 0 %>);
    
    const chart = echarts.init(chartElement);
    const option = {
      tooltip: {
        trigger: 'axis',
        formatter: function(params) {
          const data = params[0];
          const percentage = totalEmployees > 0 ? ((data.value / totalEmployees) * 100).toFixed(1) : 0;
          return `${data.name}: ${data.value} employees (${percentage}%)`;
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '10%',
        top: '5%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: departmentNames,
        axisLabel: {
          rotate: 45,
          interval: 0
        }
      },
      yAxis: {
        type: 'value',
        name: 'Employees'
      },
      series: [{
        type: 'bar',
        data: employeeCounts,
        itemStyle: {
          color: function(params) {
            const colors = ['#2c7be5', '#00d97e', '#f6c343', '#e63757', '#39afd1', '#fd7e14'];
            return params.dataIndex === employeeCounts.length - 1 ? '#fd7e14' : colors[params.dataIndex % (colors.length - 1)];
          }
        },
        label: {
          show: true,
          position: 'top',
          formatter: '{c}'
        }
      }]
    };
    
    chart.setOption(option);
    
    // Handle window resize
    window.addEventListener('resize', function() {
      chart.resize();
    });
    
    // Refresh button
    $('#refreshDistribution').on('click', function() {
      chart.resize();
      showToast('info', 'Chart refreshed');
    });
    
  } catch (e) {
    console.log('Chart initialization error:', e);
  }
}

function setupEventHandlers() {
  // Update bulk assign button when department selection changes
  $('#bulkAssignDept').on('change', updateBulkAssignButton);
  
  // Bulk assign button click
  $('#bulkAssignBtn').on('click', handleBulkAssign);
  
  // Assign single employee
  $(document).on('click', '.assign-single', handleSingleAssign);
  
  // Add to department button
  $(document).on('click', '.add-to-dept', function() {
    const deptId = $(this).data('department-id');
    if (deptId) {
      $('#bulkAssignDept').val(deptId);
      showToast('info', 'Department selected. Now select employees and click "Assign Selected"');
      $('html, body').animate({
        scrollTop: $('#unassignedTable').offset().top - 100
      }, 500);
    }
  });
  
  // Clear department
  $(document).on('click', '.clear-dept', function(e) {
    e.preventDefault();
    const deptId = $(this).data('dept-id');
    const deptName = $(this).data('dept-name');
    
    if (!confirm(`Are you sure you want to remove all employees from "${deptName}"?`)) return;
    
    showToast('info', 'Clear department feature coming soon!');
  });
  
  // View department employees modal
  $('#viewDeptModal').on('show.bs.modal', function(event) {
    const button = $(event.relatedTarget);
    const deptId = button.data('dept-id');
    
    // Load department employees
    loadDepartmentEmployees(deptId);
  });
}

function updateBulkAssignButton() {
  const anyChecked = $('.employee-checkbox:checked').length > 0;
  const deptSelected = $('#bulkAssignDept').val() !== '';
  $('#bulkAssignBtn').prop('disabled', !(anyChecked && deptSelected));
}

async function handleBulkAssign() {
  const deptId = $('#bulkAssignDept').val();
  if (!deptId) {
    showToast('warning', 'Please select a department first');
    return;
  }
  
  const selectedEmployees = [];
  $('.employee-checkbox:checked').each(function() {
    selectedEmployees.push($(this).val());
  });
  
  if (selectedEmployees.length === 0) {
    showToast('warning', 'Please select at least one employee');
    return;
  }
  
  try {
    const response = await fetch('/api/employees/bulk-departments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        employee_ids: selectedEmployees,
        department_id: deptId
      })
    });
    
    const result = await response.json();
    
    if (result.success) {
      showToast('success', `Assigned ${result.result.successCount} employees successfully!`);
      setTimeout(() => location.reload(), 1500);
    } else {
      showToast('error', result.message || 'Failed to assign employees');
    }
  } catch (error) {
    console.error('Error:', error);
    showToast('error', 'Network error. Please try again.');
  }
}

async function handleSingleAssign(e) {
  e.preventDefault();
  const employeeId = $(this).data('employee-id');
  const departmentId = $(this).data('department-id');
  
  if (!employeeId || !departmentId) return;
  
  try {
    const response = await fetch(`/api/employees/${employeeId}/department`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ department_id: departmentId })
    });
    
    const result = await response.json();
    
    if (result.success) {
      showToast('success', 'Employee assigned successfully!');
      setTimeout(() => location.reload(), 1000);
    } else {
      showToast('error', result.message || 'Failed to assign employee');
    }
  } catch (error) {
    console.error('Error:', error);
    showToast('error', 'Network error. Please try again.');
  }
}

function loadDepartmentEmployees(deptId) {
  // This would typically make an AJAX call to get department employees
  // For now, we'll show a placeholder
  $('#deptEmployeesList').html(`
    <div class="text-center py-4">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-2">Loading department employees...</p>
    </div>
  `);
  
  // Simulate loading
  setTimeout(() => {
    $('#deptEmployeesList').html(`
      <div class="alert alert-info">
        <p>Department employees would be loaded here. This feature requires backend implementation.</p>
        <p class="mb-0">Department ID: ${deptId}</p>
      </div>
    `);
  }, 500);
}

// Export functions
function exportDistributionData() {
  showToast('info', 'Export feature coming soon!');
}

function resetAssignments() {
  if (confirm('Are you sure you want to reset all department assignments? This will move all employees to unassigned.')) {
    showToast('warning', 'Reset feature coming soon!');
  }
}

function exportDepartmentData() {
  showToast('info', 'Exporting department data...');
}

function printReport() {
  window.print();
}

// Toast function
function showToast(type, message, duration = 3000) {
  const toastContainer = $('#toastContainer');
  const toastId = 'toast-' + Date.now();
  
  const toastHtml = `
    <div id="${toastId}" class="toast align-items-center text-bg-${type} border-0" role="alert">
      <div class="d-flex">
        <div class="toast-body">${message}</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
      </div>
    </div>
  `;
  
  toastContainer.append(toastHtml);
  const toastElement = $(`#${toastId}`);
  const toast = new bootstrap.Toast(toastElement[0], { delay: duration });
  
  toast.show();
  
  toastElement.on('hidden.bs.toast', function() {
    $(this).remove();
  });
}
</script>