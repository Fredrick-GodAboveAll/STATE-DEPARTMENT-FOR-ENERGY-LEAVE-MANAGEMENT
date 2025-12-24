<!-- views/departments/d-overview.ejs -->
<div class="card bg-body-tertiary dark__bg-opacity-50 mb-3">
  <div class="card-body p-3">
    <p class="fs-10 mb-0">
      <a href="/dashboard">
        Departments Overview, <strong><%= userFirstName %></strong> <%= userLastName %>
      </a>. 
      <span id="session-timer"><%= locals.sessionInfo ? locals.sessionInfo.timeRemaining : '1h' %> remaining </span>
      <strong><%= new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) %></strong>
    </p>
  </div>
</div>

<!-- HEADER SECTION -->
<div class="d-flex mb-4 mt-3">
  <span class="fa-stack me-2 ms-n1">
    <i class="fas fa-circle fa-stack-2x text-300"></i>
    <i class="fa-inverse fa-stack-1x text-primary fas fa-sitemap"></i>
  </span>

  <div class="col">
    <h5 class="mb-0 text-primary position-relative">
      <span class="bg-200 dark__bg-1100 pe-3">Departments</span>
      <span class="border position-absolute top-50 translate-middle-y w-100 start-0 z-n1"></span>
    </h5>
    <p class="mb-0">Manage organizational departments and structure</p>
  </div>
</div>

<!-- Department Summary Cards -->
<div class="row mb-4 g-3">
  <div class="col-md-3 col-6">
    <div class="card border-start border-3 border-primary h-100">
      <div class="card-body p-3">
        <div class="d-flex align-items-center">
          <div class="flex-1">
            <h6 class="text-600 mb-1">Total Departments</h6>
            <h4 class="mb-0"><%= totalDepartments || 0 %></h4>
          </div>
          <div class="ms-2">
            <span class="fas fa-building text-primary fa-2x"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="col-md-3 col-6">
    <div class="card border-start border-3 border-success h-100">
      <div class="card-body p-3">
        <div class="d-flex align-items-center">
          <div class="flex-1">
            <h6 class="text-600 mb-1">Active</h6>
            <h4 class="mb-0"><%= activeCount || 0 %></h4>
          </div>
          <div class="ms-2">
            <span class="fas fa-check-circle text-success fa-2x"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="col-md-3 col-6">
    <div class="card border-start border-3 border-warning h-100">
      <div class="card-body p-3">
        <div class="d-flex align-items-center">
          <div class="flex-1">
            <h6 class="text-600 mb-1">Inactive</h6>
            <h4 class="mb-0"><%= inactiveCount || 0 %></h4>
          </div>
          <div class="ms-2">
            <span class="fas fa-pause-circle text-warning fa-2x"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="col-md-3 col-6">
    <div class="card border-start border-3 border-secondary h-100">
      <div class="card-body p-3">
        <div class="d-flex align-items-center">
          <div class="flex-1">
            <h6 class="text-600 mb-1">Archived</h6>
            <h4 class="mb-0"><%= archivedCount || 0 %></h4>
          </div>
          <div class="ms-2">
            <span class="fas fa-archive text-secondary fa-2x"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- MAIN CONTENT SECTION -->
<div class="row g-3">
  <div class="col-xxl-12">
    <div class="card mb-3">
      <div class="bg-holder d-none d-lg-block bg-card" style="background-image:url(/assets/img/icons/spot-illustrations/corner-4.png);"></div>
      
      <div class="card-body p-0">
        <div class="tab-content">
          <div class="tab-pane preview-tab-pane active" role="tabpanel">
            <div class="card shadow-none">
              <div class="card-header">
                <div class="row flex-between-center">
                  <div class="col-6 col-sm-auto d-flex align-items-center pe-0">
                    <h5 class="mb-0">All Departments</h5>
                  </div>
                  <div class="col-6 col-sm-auto ms-auto text-end ps-0">
                    <button class="btn btn-falcon-success btn-sm" type="button" data-bs-toggle="modal" data-bs-target="#addDepartmentModal">
                      <span class="fas fa-plus" data-fa-transform="shrink-3 down-2"></span>
                      <span class="d-none d-sm-inline-block ms-1">Add Department</span>
                    </button>
                    <button class="btn btn-falcon-default btn-sm mx-2" type="button" id="toggleFilters">
                      <span class="fas fa-filter" data-fa-transform="shrink-3 down-2"></span>
                      <span class="d-none d-sm-inline-block ms-1">Filter</span>
                    </button>
                    <button class="btn btn-falcon-default btn-sm" type="button" id="exportDepartments">
                      <span class="fas fa-external-link-alt" data-fa-transform="shrink-3 down-2"></span>
                      <span class="d-none d-sm-inline-block ms-1">Export</span>
                    </button>
                  </div>
                </div>
              </div>
              <div class="card-body px-0 pt-0">
                <table class="table table-sm mb-0 overflow-hidden data-table fs-10 departments-table" 
                  data-datatables='{"responsive":true,"pagingType":"simple","lengthChange":true,"pageLength":10,"searching":true,"bDeferRender":true,"serverSide":false,"language":{"info":"_START_ to _END_ Items of _TOTAL_","search":"Search departments:","searchPlaceholder":"Search by name, code, status..."},"order":[[1,"asc"]],"columnDefs":[{"orderable":false,"targets":[0,5]}]}'>
                  <thead class="bg-200">
                    <tr>
                      <th class="text-900 no-sort white-space-nowrap" data-orderable="false">
                        <div class="form-check mb-0 d-flex align-items-center">
                          <input class="form-check-input" id="checkbox-bulk-item-select" type="checkbox" data-bulk-select='{"body":"table-simple-pagination-body","actions":"table-simple-pagination-actions","replacedElement":"table-simple-pagination-replace-element"}' />
                        </div>
                      </th>
                      <th class="text-900 sort pe-1 align-middle white-space-nowrap">Department Name</th>
                      <th class="text-900 sort pe-1 align-middle white-space-nowrap">Code</th>
                      <th class="text-900 sort pe-1 align-middle white-space-nowrap">Description</th>
                      <th class="text-900 sort pe-1 align-middle white-space-nowrap">Status</th>
                      <th class="text-900 no-sort pe-1 align-middle data-table-row-action">Actions</th>
                    </tr>
                  </thead>
                  <tbody class="list" id="table-simple-pagination-body">
                    <% if (departments && departments.length > 0) { %>
                      <% departments.forEach((dept, index) => { %>
                        <tr class="btn-reveal-trigger" data-id="<%= dept.id %>">
                          <td class="align-middle" style="width: 28px;">
                            <div class="form-check mb-0">
                              <input class="form-check-input" type="checkbox" id="dept-<%= index %>" data-bulk-select-row="data-bulk-select-row" />
                            </div>
                          </td>
                          <td class="align-middle white-space-nowrap fw-semi-bold name">
                            <a href="#!" class="department-name text-900" data-id="<%= dept.id %>" data-bs-toggle="modal" data-bs-target="#editDepartmentModal">
                              <%= dept.name %>
                            </a>
                          </td>
                          <td class="align-middle white-space-nowrap">
                            <span class="badge bg-primary rounded-pill">
                              <%= dept.code %>
                            </span>
                          </td>
                          <td class="align-middle white-space-nowrap">
                            <div class="text-truncate" style="max-width: 200px;" title="<%= dept.description || 'No description' %>">
                              <%= dept.description || '-' %>
                            </div>
                          </td>
                          <td class="align-middle white-space-nowrap">
                            <% if (dept.status === 'Active') { %>
                              <span class="badge badge-subtle-success rounded-pill d-inline-flex align-items-center">
                                <span class="fas fa-check me-1" data-fa-transform="shrink-2"></span>
                                <%= dept.status %>
                              </span>
                            <% } else if (dept.status === 'Inactive') { %>
                              <span class="badge badge-subtle-warning rounded-pill d-inline-flex align-items-center">
                                <span class="fas fa-pause me-1" data-fa-transform="shrink-2"></span>
                                <%= dept.status %>
                              </span>
                            <% } else { %>
                              <span class="badge badge-subtle-secondary rounded-pill d-inline-flex align-items-center">
                                <span class="fas fa-archive me-1" data-fa-transform="shrink-2"></span>
                                <%= dept.status %>
                              </span>
                            <% } %>
                          </td>
                          <td class="align-middle white-space-nowrap text-end">
                            <div class="btn-group" role="group">
                              <button class="btn btn-sm btn-falcon-default edit-department" data-id="<%= dept.id %>" title="Edit">
                                <span class="fas fa-edit"></span>
                              </button>
                              <button class="btn btn-sm btn-falcon-info toggle-department" data-id="<%= dept.id %>" data-name="<%= dept.name %>" title="Toggle Status">
                                <span class="fas fa-sync-alt"></span>
                              </button>
                              <button class="btn btn-sm btn-falcon-default text-danger delete-department" data-id="<%= dept.id %>" data-name="<%= dept.name %>" title="Delete">
                                <span class="fas fa-trash"></span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      <% }); %>
                    <% } else { %>
                      <tr>
                        <td colspan="6" class="text-center py-5">
                          <div class="text-muted">
                            <span class="fas fa-building fa-3x mb-3"></span>
                            <h5 class="mb-1">No departments found</h5>
                            <p class="mb-0">Click "Add Department" to create your first department</p>
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
  </div>
</div>

<!-- Add Department Modal -->
<div class="modal fade" id="addDepartmentModal" tabindex="-1" aria-labelledby="addDepartmentModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="addDepartmentModalLabel">Add New Department</h5>
        <button class="btn p-1" type="button" data-bs-dismiss="modal" aria-label="Close">
          <span class="fas fa-times fs-9"></span>
        </button>
      </div>
      <form id="addDepartmentForm">
        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label" for="departmentName">Department Name *</label>
            <input class="form-control" id="departmentName" type="text" name="name" required>
            <div class="invalid-feedback" id="nameError"></div>
          </div>
          <div class="mb-3">
            <label class="form-label" for="departmentCode">Department Code *</label>
            <input class="form-control" id="departmentCode" type="text" name="code" required>
            <small class="form-text text-muted">Unique code for the department (e.g., HR, IT, FIN)</small>
            <div class="invalid-feedback" id="codeError"></div>
          </div>
          <div class="mb-3">
            <label class="form-label" for="departmentDescription">Description</label>
            <textarea class="form-control" id="departmentDescription" name="description" rows="3"></textarea>
          </div>
          <div class="mb-3">
            <label class="form-label" for="departmentStatus">Status</label>
            <select class="form-select" id="departmentStatus" name="status">
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Archived">Archived</option>
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" type="button" data-bs-dismiss="modal">Cancel</button>
          <button class="btn btn-primary" type="submit">Save Department</button>
        </div>
      </form>
    </div>
  </div>
</div>

<!-- Edit Department Modal -->
<div class="modal fade" id="editDepartmentModal" tabindex="-1" aria-labelledby="editDepartmentModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="editDepartmentModalLabel">Edit Department</h5>
        <button class="btn p-1" type="button" data-bs-dismiss="modal" aria-label="Close">
          <span class="fas fa-times fs-9"></span>
        </button>
      </div>
      <form id="editDepartmentForm">
        <input type="hidden" id="editDepartmentId" name="id">
        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label" for="editDepartmentName">Department Name *</label>
            <input class="form-control" id="editDepartmentName" type="text" name="name" required>
            <div class="invalid-feedback" id="editNameError"></div>
          </div>
          <div class="mb-3">
            <label class="form-label" for="editDepartmentCode">Department Code *</label>
            <input class="form-control" id="editDepartmentCode" type="text" name="code" required>
            <small class="form-text text-muted">Unique code for the department</small>
            <div class="invalid-feedback" id="editCodeError"></div>
          </div>
          <div class="mb-3">
            <label class="form-label" for="editDepartmentDescription">Description</label>
            <textarea class="form-control" id="editDepartmentDescription" name="description" rows="3"></textarea>
          </div>
          <div class="mb-3">
            <label class="form-label" for="editDepartmentStatus">Status</label>
            <select class="form-select" id="editDepartmentStatus" name="status">
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Archived">Archived</option>
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" type="button" data-bs-dismiss="modal">Cancel</button>
          <button class="btn btn-primary" type="submit">Update Department</button>
        </div>
      </form>
    </div>
  </div>
</div>

<!-- Toast Container -->
<div class="position-fixed top-0 end-0 p-3" style="z-index: 1100;">
  <div id="toastContainer"></div>
</div>

<script>
  document.addEventListener('DOMContentLoaded', () => {
    // Session Timer (same as before)
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
      
      updateTimer();
      const timerInterval = setInterval(updateTimer, 1000);
      
      let lastActivity = Date.now();
      const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
      
      const updateActivity = () => {
        const now = Date.now();
        if (now - lastActivity > 5000) {
          lastActivity = now;
          remainingSeconds = 3600;
        }
      };
      
      activityEvents.forEach(event => {
        document.addEventListener(event, updateActivity, true);
      });
    <% } %>

    // ==================== DEPARTMENT CRUD OPERATIONS ====================

    // Add Department Form Submission
    document.getElementById('addDepartmentForm')?.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Saving...';
      submitBtn.disabled = true;
      
      // Clear previous errors
      clearErrors('add');
      
      const formData = new FormData(this);
      const data = Object.fromEntries(formData.entries());
      
      try {
        const response = await fetch('/api/departments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
          showToast('success', 'Department added successfully!');
          $('#addDepartmentModal').modal('hide');
          this.reset();
          setTimeout(() => location.reload(), 1000);
        } else {
          // Show validation errors if any
          if (result.message && result.message.includes('already exists')) {
            if (result.message.includes('code')) {
              showError('code', result.message, 'add');
            } else if (result.message.includes('name')) {
              showError('name', result.message, 'add');
            } else {
              showToast('error', result.message);
            }
          } else {
            showToast('error', result.message || 'Error adding department');
          }
        }
      } catch (error) {
        console.error('Error:', error);
        showToast('error', 'Error adding department. Please try again.');
      } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    });

    // Edit Department - Load Data
    document.querySelectorAll('.edit-department, .department-name').forEach(btn => {
      btn.addEventListener('click', async function(e) {
        e.preventDefault();
        const departmentId = this.getAttribute('data-id');
        
        try {
          const response = await fetch(`/api/departments/${departmentId}`);
          const result = await response.json();
          
          if (result.success) {
            const department = result.data;
            
            document.getElementById('editDepartmentId').value = department.id;
            document.getElementById('editDepartmentName').value = department.name;
            document.getElementById('editDepartmentCode').value = department.code;
            document.getElementById('editDepartmentDescription').value = department.description || '';
            document.getElementById('editDepartmentStatus').value = department.status || 'Active';
            
            // Clear previous errors
            clearErrors('edit');
            
            $('#editDepartmentModal').modal('show');
          } else {
            showToast('error', result.message || 'Error loading department data');
          }
        } catch (error) {
          console.error('Error:', error);
          showToast('error', 'Error loading department data');
        }
      });
    });

    // Edit Department Form Submission
    document.getElementById('editDepartmentForm')?.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Updating...';
      submitBtn.disabled = true;
      
      // Clear previous errors
      clearErrors('edit');
      
      const formData = new FormData(this);
      const data = Object.fromEntries(formData.entries());
      const departmentId = data.id;
      
      try {
        const response = await fetch(`/api/departments/${departmentId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
          showToast('success', 'Department updated successfully!');
          $('#editDepartmentModal').modal('hide');
          setTimeout(() => location.reload(), 1000);
        } else {
          // Show validation errors if any
          if (result.message && result.message.includes('already exists')) {
            if (result.message.includes('code')) {
              showError('code', result.message, 'edit');
            } else if (result.message.includes('name')) {
              showError('name', result.message, 'edit');
            } else {
              showToast('error', result.message);
            }
          } else {
            showToast('error', result.message || 'Error updating department');
          }
        }
      } catch (error) {
        console.error('Error:', error);
        showToast('error', 'Error updating department');
      } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    });

    // Delete Department
    document.querySelectorAll('.delete-department').forEach(btn => {
      btn.addEventListener('click', function() {
        const departmentId = this.getAttribute('data-id');
        const departmentName = this.getAttribute('data-name');
        
        if (confirm(`Are you sure you want to delete "${departmentName}"? This action cannot be undone.`)) {
          deleteDepartment(departmentId);
        }
      });
    });

    // Toggle Department Status
    document.querySelectorAll('.toggle-department').forEach(btn => {
      btn.addEventListener('click', async function() {
        const departmentId = this.getAttribute('data-id');
        const departmentName = this.getAttribute('data-name');
        
        try {
          // First get current status
          const response = await fetch(`/api/departments/${departmentId}`);
          const result = await response.json();
          
          if (result.success) {
            const department = result.data;
            let newStatus;
            
            if (department.status === 'Active') {
              newStatus = 'Inactive';
            } else if (department.status === 'Inactive') {
              newStatus = 'Archived';
            } else {
              newStatus = 'Active';
            }
            
            if (confirm(`Change status of "${departmentName}" from ${department.status} to ${newStatus}?`)) {
              await fetch(`/api/departments/${departmentId}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  name: department.name,
                  code: department.code,
                  description: department.description,
                  status: newStatus
                })
              });
              
              showToast('success', `Department status changed to ${newStatus}`);
              setTimeout(() => location.reload(), 1000);
            }
          }
        } catch (error) {
          console.error('Error:', error);
          showToast('error', 'Error toggling department status');
        }
      });
    });

    async function deleteDepartment(id) {
      try {
        const response = await fetch(`/api/departments/${id}`, {
          method: 'DELETE'
        });
        
        const result = await response.json();
        
        if (result.success) {
          showToast('success', 'Department deleted successfully!');
          setTimeout(() => location.reload(), 1000);
        } else {
          showToast('error', result.message || 'Error deleting department');
        }
      } catch (error) {
        console.error('Error:', error);
        showToast('error', 'Error deleting department');
      }
    }

    // Error handling functions
    function showError(field, message, formType) {
      const fieldMap = {
        'name': formType === 'add' ? 'departmentName' : 'editDepartmentName',
        'code': formType === 'add' ? 'departmentCode' : 'editDepartmentCode'
      };
      
      const errorField = formType === 'add' ? `${field}Error` : `edit${field.charAt(0).toUpperCase() + field.slice(1)}Error`;
      
      const input = document.getElementById(fieldMap[field]);
      const errorDiv = document.getElementById(errorField);
      
      if (input && errorDiv) {
        input.classList.add('is-invalid');
        errorDiv.textContent = message;
      }
    }

    function clearErrors(formType) {
      const fields = ['name', 'code'];
      fields.forEach(field => {
        const fieldMap = {
          'name': formType === 'add' ? 'departmentName' : 'editDepartmentName',
          'code': formType === 'add' ? 'departmentCode' : 'editDepartmentCode'
        };
        
        const errorField = formType === 'add' ? `${field}Error` : `edit${field.charAt(0).toUpperCase() + field.slice(1)}Error`;
        
        const input = document.getElementById(fieldMap[field]);
        const errorDiv = document.getElementById(errorField);
        
        if (input) {
          input.classList.remove('is-invalid');
        }
        if (errorDiv) {
          errorDiv.textContent = '';
        }
      });
    }

    // ==================== TABLE FUNCTIONALITY ====================

    // Filter button
    document.getElementById('toggleFilters')?.addEventListener('click', function() {
      const dataTable = $('.departments-table').DataTable();
      const searchBox = $('.dataTables_filter input');
      searchBox.focus().css('width', '200px');
    });

    // Export button
    document.getElementById('exportDepartments')?.addEventListener('click', function() {
      const dataTable = $('.departments-table').DataTable();
      const data = dataTable.rows({search: 'applied'}).data();
      const departments = [];
      
      data.each(function(value, index) {
        departments.push({
          name: value[1],
          code: value[2],
          description: value[3],
          status: value[4]
        });
      });
      
      let csvContent = "data:text/csv;charset=utf-8,";
      csvContent += "Department Name,Code,Description,Status\n";
      
      departments.forEach(dept => {
        const row = [
          dept.name,
          dept.code,
          dept.description,
          dept.status
        ].map(field => `"${field}"`).join(',');
        csvContent += row + "\n";
      });
      
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "departments_export.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      showToast('success', 'Export completed!');
    });

    // Toast notification function
    function showToast(type, message, duration = 3000) {
      const toastContainer = document.getElementById('toastContainer');
      
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
      
      toastElement.addEventListener('hidden.bs.toast', function () {
        this.remove();
      });
    }

    // Bulk select functionality
    document.getElementById('checkbox-bulk-item-select')?.addEventListener('change', function() {
      const checkboxes = document.querySelectorAll('input[type="checkbox"][data-bulk-select-row]');
      checkboxes.forEach(checkbox => {
        checkbox.checked = this.checked;
      });
      toggleBulkActions();
    });

    function toggleBulkActions() {
      const checkboxes = document.querySelectorAll('input[type="checkbox"][data-bulk-select-row]:checked');
      const bulkActions = document.getElementById('table-simple-pagination-actions');
      const replaceElement = document.getElementById('table-simple-pagination-replace-element');
      
      if (checkboxes.length > 0) {
        bulkActions?.classList.remove('d-none');
        replaceElement?.classList.add('d-none');
      } else {
        bulkActions?.classList.add('d-none');
        replaceElement?.classList.remove('d-none');
      }
    }

    document.addEventListener('change', function(e) {
      if (e.target.matches('input[type="checkbox"][data-bulk-select-row]')) {
        toggleBulkActions();
      }
    });

    // Clear form when modal is closed
    $('#addDepartmentModal').on('hidden.bs.modal', function () {
      document.getElementById('addDepartmentForm').reset();
      clearErrors('add');
    });
    
    $('#editDepartmentModal').on('hidden.bs.modal', function () {
      clearErrors('edit');
    });
  });
</script>