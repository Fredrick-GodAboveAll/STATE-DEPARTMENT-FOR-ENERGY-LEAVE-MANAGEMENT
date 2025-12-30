<!-- <div class="card bg-body-tertiary dark__bg-opacity-50 mb-3">
  <div class="card-body p-3">
    <p class="fs-10 mb-0">
      <a href="https://prium.github.io/falcon/v3.25.0/widgets.html#!">
        Leave Types, <strong><%= userFirstName %></strong> <%= userLastName %>
      </a>. 
      <span id="session-timer"><%= locals.sessionInfo ? locals.sessionInfo.timeRemaining : '1h' %> remaining </span>
      <strong><%= new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) %></strong>
    </p>
  </div>
</div> -->

<!-- CARRIED FORWARD  -->

<div class="d-flex mb-4 mt-3">
  <span class="fa-stack me-2 ms-n1">
    <i class="fas fa-circle fa-stack-2x text-300"></i>
    <i class="fa-inverse fa-stack-1x text-primary fas fa-cocktail"></i>
  </span>

  <div class="col">
    <h5 class="mb-0 text-primary position-relative">
      <span class="bg-200 dark__bg-1100 pe-3">Leave Types</span>
      <span class="border position-absolute top-50 translate-middle-y w-100 start-0 z-n1"></span>
    </h5>
    <p class="mb-0"> leave types to be utilized </p>
  </div>
</div>

<!-- Leave Type Summary Cards -->
<div class="row mb-4 g-3">
  <div class="col-md-3 col-6">
    <div class="card border-start border-3 border-primary h-100">
      <div class="card-body p-3">
        <div class="d-flex align-items-center">
          <div class="flex-1">
            <h6 class="text-600 mb-1">Total Leave Types</h6>
            <h4 class="mb-0"><%= totalLeaveTypes || 0 %></h4>
          </div>
          <div class="ms-2">
            <span class="fas fa-clipboard-list text-primary fa-2x"></span>
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
            <h4 class="mb-0"><%= activeLeaveTypes || 0 %></h4>
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
            <h6 class="text-600 mb-1">Male Only</h6>
            <% 
              const maleLeaveTypes = leaveTypes ? leaveTypes.filter(lt => lt.gender_restriction === 'Male').length : 0;
            %>
            <h4 class="mb-0"><%= maleLeaveTypes %></h4>
          </div>
          <div class="ms-2">
            <span class="fas fa-male text-warning fa-2x"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="col-md-3 col-6">
    <div class="card border-start border-3 border-info h-100">
      <div class="card-body p-3">
        <div class="d-flex align-items-center">
          <div class="flex-1">
            <h6 class="text-600 mb-1">Female Only</h6>
            <% 
              const femaleLeaveTypes = leaveTypes ? leaveTypes.filter(lt => lt.gender_restriction === 'Female').length : 0;
            %>
            <h4 class="mb-0"><%= femaleLeaveTypes %></h4>
          </div>
          <div class="ms-2">
            <span class="fas fa-female text-info fa-2x"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="row g-3">
  <!-- Holiday calendar -->
  <div class="col-xxl-8">
    <div class="card mb-3">
      <div class="bg-holder d-none d-lg-block bg-card" style="background-image:url(../../assets/img/icons/spot-illustrations/corner-4.png);"></div>
      
      <div class="card-body p-0">
        <div class="tab-content">
          <div class="tab-pane preview-tab-pane active" role="tabpanel">
            <div class="card shadow-none">
              <div class="card-header">
                <div class="row flex-between-center">
                  <div class="col-6 col-sm-auto d-flex align-items-center pe-0">
                    <h5 class="mb-0">All Leave Types</h5>
                  </div>
                  <div class="col-6 col-sm-auto ms-auto text-end ps-0">
                    <button class="btn btn-falcon-success btn-sm" type="button" data-bs-toggle="modal" data-bs-target="#addLeaveTypeModal">
                      <span class="fas fa-plus" data-fa-transform="shrink-3 down-2"></span>
                      <span class="d-none d-sm-inline-block ms-1">Add Leave Type</span>
                    </button>
                    <button class="btn btn-falcon-default btn-sm mx-2" type="button" id="toggleFilters">
                      <span class="fas fa-filter" data-fa-transform="shrink-3 down-2"></span>
                      <span class="d-none d-sm-inline-block ms-1">Filter</span>
                    </button>
                    <button class="btn btn-falcon-default btn-sm" type="button" id="exportLeaveTypes">
                      <span class="fas fa-external-link-alt" data-fa-transform="shrink-3 down-2"></span>
                      <span class="d-none d-sm-inline-block ms-1">Export</span>
                    </button>
                  </div>
                </div>
              </div>
              <div class="card-body px-0 pt-0">
                <table class="table table-sm mb-0 overflow-hidden data-table fs-10 leave-types-table" 
                  data-datatables='{"responsive":true,"pagingType":"simple","lengthChange":true,"pageLength":10,"searching":true,"bDeferRender":true,"serverSide":false,"language":{"info":"_START_ to _END_ Items of _TOTAL_","search":"Search leave types:","searchPlaceholder":"Search by name, status..."},"order":[[1,"asc"]],"columnDefs":[{"orderable":false,"targets":[0,8]}]}'>
                  <thead class="bg-200">
                    <tr>
                      <th class="text-900 no-sort white-space-nowrap" data-orderable="false">
                        <div class="form-check mb-0 d-flex align-items-center">
                          <input class="form-check-input" id="checkbox-bulk-item-select" type="checkbox" data-bulk-select='{"body":"table-simple-pagination-body","actions":"table-simple-pagination-actions","replacedElement":"table-simple-pagination-replace-element"}' />
                        </div>
                      </th>
                      <th class="text-900 sort pe-1 align-middle white-space-nowrap">Leave Type</th>
                      <th class="text-900 sort pe-1 align-middle white-space-nowrap">Color</th>
                      <th class="text-900 sort pe-1 align-middle white-space-nowrap">Entitled Days</th>
                      <th class="text-900 sort pe-1 align-middle white-space-nowrap">Carry Forward</th>
                      <th class="text-900 sort pe-1 align-middle white-space-nowrap">Gender</th>
                      <th class="text-900 sort pe-1 align-middle white-space-nowrap">Description</th>
                      <th class="text-900 sort pe-1 align-middle white-space-nowrap">Status</th>
                      <th class="text-900 no-sort pe-1 align-middle data-table-row-action">Actions</th>
                    </tr>
                  </thead>
                  <tbody class="list" id="table-simple-pagination-body">
                    <% if (leaveTypes && leaveTypes.length > 0) { %>
                      <% leaveTypes.forEach((leave, index) => { %>
                        <tr class="btn-reveal-trigger" data-id="<%= leave.id %>">
                          <td class="align-middle" style="width: 28px;">
                            <div class="form-check mb-0">
                              <input class="form-check-input" type="checkbox" id="leave-<%= index %>" data-bulk-select-row="data-bulk-select-row" />
                            </div>
                          </td>
                          <td class="align-middle white-space-nowrap fw-semi-bold name">
                            <a href="#!" class="leave-name text-900" data-id="<%= leave.id %>" data-bs-toggle="modal" data-bs-target="#editLeaveTypeModal">
                              <%= leave.leave_name %>
                            </a>
                          </td>
                          <td class="align-middle white-space-nowrap">
                            <span class="badge bg-<%= leave.color || 'primary' %> rounded-pill">
                              <%= leave.color || 'primary' %>
                            </span>
                          </td>
                          <td class="align-middle amount">
                            <span class="fw-semi-bold"><%= leave.entitled_days %></span> days
                          </td>
                          <td class="align-middle amount">
                            <span class="fw-semi-bold"><%= (leave.carry_forward_days !== null && typeof leave.carry_forward_days !== 'undefined') ? leave.carry_forward_days + ' days' : 'N/A' %></span>
                          </td>
                          <td class="align-middle white-space-nowrap">
                            <% if (leave.gender_restriction === 'Male') { %>
                              <div class="d-flex align-items-center">
                                <i class="fas fa-male text-warning me-2"></i>
                                <span>Male Only</span>
                              </div>
                            <% } else if (leave.gender_restriction === 'Female') { %>
                              <div class="d-flex align-items-center">
                                <i class="fas fa-female text-info me-2"></i>
                                <span>Female Only</span>
                              </div>
                            <% } else if (leave.gender_restriction === 'All') { %>
                              <div class="d-flex align-items-center">
                                <i class="fas fa-venus-mars text-success me-2"></i>
                                <span>All Genders</span>
                              </div>
                            <% } else { %>
                              <div class="d-flex align-items-center">
                                <i class="far fa-circle text-secondary me-2"></i>
                                <span><%= leave.gender_restriction %></span>
                              </div>
                            <% } %>
                          </td>
                          <td class="align-middle white-space-nowrap">
                            <div class="text-truncate" style="max-width: 180px;" title="<%= leave.description || 'No description' %>">
                              <%= leave.description || '-' %>
                            </div>
                          </td>
                          <td class="align-middle white-space-nowrap">
                            <% if (leave.status === 'Active') { %>
                              <span class="badge badge-subtle-success rounded-pill d-inline-flex align-items-center">
                                <span class="fas fa-check me-1" data-fa-transform="shrink-2"></span>
                                <%= leave.status %>
                              </span>
                            <% } else if (leave.status === 'Inactive') { %>
                              <span class="badge badge-subtle-warning rounded-pill d-inline-flex align-items-center">
                                <span class="fas fa-pause me-1" data-fa-transform="shrink-2"></span>
                                <%= leave.status %>
                              </span>
                            <% } else { %>
                              <span class="badge badge-subtle-secondary rounded-pill d-inline-flex align-items-center">
                                <span class="fas fa-archive me-1" data-fa-transform="shrink-2"></span>
                                <%= leave.status %>
                              </span>
                            <% } %>
                          </td>
                          <td class="align-middle white-space-nowrap text-end">
                            <div class="btn-group" role="group">
                              <button class="btn btn-sm btn-falcon-default edit-leave-type" data-id="<%= leave.id %>" title="Edit">
                                <span class="fas fa-edit"></span>
                              </button>
                              <button class="btn btn-sm btn-falcon-default text-danger delete-leave-type" data-id="<%= leave.id %>" data-name="<%= leave.leave_name %>" title="Delete">
                                <span class="fas fa-trash"></span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      <% }); %>
                    <% } else { %>
                      <tr>
                        <td colspan="9" class="text-center py-5">
                          <div class="text-muted">
                            <span class="fas fa-clipboard-list fa-3x mb-3"></span>
                            <h5 class="mb-1">No leave types found</h5>
                            <p class="mb-0">Click "Add Leave Type" to create your first leave type</p>
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

<!-- Add Leave Type Modal -->
<div class="modal fade" id="addLeaveTypeModal" tabindex="-1" aria-labelledby="addLeaveTypeModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="addLeaveTypeModalLabel">Add New Leave Type</h5>
        <button class="btn p-1" type="button" data-bs-dismiss="modal" aria-label="Close">
          <span class="fas fa-times fs-9"></span>
        </button>
      </div>
      <form id="addLeaveTypeForm">
        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label" for="leaveName">Leave Name *</label>
            <input class="form-control" id="leaveName" type="text" name="leave_name" required>
          </div>
          <div class="row mb-3">
            <div class="col-md-4">
              <label class="form-label" for="leaveColor">Color</label>
              <select class="form-select" id="leaveColor" name="color">
                <option value="primary">Blue (Primary)</option>
                <option value="secondary">Gray (Secondary)</option>
                <option value="success">Green (Success)</option>
                <option value="danger">Red (Danger)</option>
                <option value="warning">Yellow (Warning)</option>
                <option value="info">Cyan (Info)</option>
                <option value="dark">Black (Dark)</option>
                <option value="light">Light Gray (Light)</option>
              </select>
            </div>
            <div class="col-md-4">
              <label class="form-label" for="entitledDays">Entitled Days *</label>
              <input class="form-control" id="entitledDays" type="number" name="entitled_days" min="0" required>
            </div>
            <div class="col-md-4">
              <label class="form-label" for="carryForwardDays">Carry Forward (to next financial year)</label>
              <input class="form-control" id="carryForwardDays" type="number" name="carry_forward_days" min="0" placeholder="Leave blank for N/A">
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" type="button" data-bs-dismiss="modal">Cancel</button>
          <button class="btn btn-primary" type="submit">Create Leave Type</button>
        </div>
      </form>
    </div>
  </div>
</div>

<!-- Edit Leave Type Modal -->
<div class="modal fade" id="editLeaveTypeModal" tabindex="-1" aria-labelledby="editLeaveTypeModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="editLeaveTypeModalLabel">Edit Leave Type</h5>
        <button class="btn p-1" type="button" data-bs-dismiss="modal" aria-label="Close">
          <span class="fas fa-times fs-9"></span>
        </button>
      </div>
      <form id="editLeaveTypeForm">
        <input type="hidden" id="editLeaveTypeId" name="id">
        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label" for="editLeaveName">Leave Name *</label>
            <input class="form-control" id="editLeaveName" type="text" name="leave_name" required>
          </div>
          <div class="row mb-3">
            <div class="col-md-6">
              <label class="form-label" for="editLeaveColor">Color</label>
              <select class="form-select" id="editLeaveColor" name="color">
                <option value="primary">Blue (Primary)</option>
                <option value="secondary">Gray (Secondary)</option>
                <option value="success">Green (Success)</option>
                <option value="danger">Red (Danger)</option>
                <option value="warning">Yellow (Warning)</option>
                <option value="info">Cyan (Info)</option>
                <option value="dark">Black (Dark)</option>
                <option value="light">Light Gray (Light)</option>
              </select>
            </div>
            <div class="col-md-6">
              <label class="form-label" for="editEntitledDays">Entitled Days *</label>
              <input class="form-control" id="editEntitledDays" type="number" name="entitled_days" min="0" required>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-md-6">
              <label class="form-label" for="editGenderRestriction">Gender Restriction</label>
              <select class="form-select" id="editGenderRestriction" name="gender_restriction">
                <option value="All">All Genders</option>
                <option value="Male">Male Only</option>
                <option value="Female">Female Only</option>
                <option value="Other">Other</option>
                <option value="None">No Restriction</option>
              </select>
            </div>
            <div class="col-md-6">
              <label class="form-label" for="editLeaveStatus">Status</label>
              <select class="form-select" id="editLeaveStatus" name="status">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label" for="editLeaveDescription">Description</label>
            <textarea class="form-control" id="editLeaveDescription" name="description" rows="3"></textarea>
          </div>
          <div class="mb-3">
            <label class="form-label" for="editCarryForwardDays">Carry Forward (to next financial year)</label>
            <input class="form-control" id="editCarryForwardDays" type="number" name="carry_forward_days" min="0" placeholder="Leave blank for N/A">
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" type="button" data-bs-dismiss="modal">Cancel</button>
          <button class="btn btn-primary" type="submit">Update Leave Type</button>
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

  // Leave Types CRUD Operations
  document.addEventListener('DOMContentLoaded', function() {
    // Add Leave Type Form Submission
    document.getElementById('addLeaveTypeForm')?.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Saving...';
      submitBtn.disabled = true;
      
      const formData = new FormData(this);
      const data = Object.fromEntries(formData.entries());
      
      try {
        const response = await fetch('/leave_types', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
          showToast('success', 'Leave type added successfully!');
          $('#addLeaveTypeModal').modal('hide');
          this.reset();
          setTimeout(() => location.reload(), 1000);
        } else {
          showToast('error', result.message || 'Error adding leave type');
        }
      } catch (error) {
        console.error('Error:', error);
        showToast('error', 'Error adding leave type. Please try again.');
      } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    });

    // Edit Leave Type - Load Data
    document.querySelectorAll('.edit-leave-type, .leave-name').forEach(btn => {
      btn.addEventListener('click', async function(e) {
        if (this.classList.contains('leave-name') && !e.target.closest('.edit-leave-type')) {
          return; // Don't trigger for view, only for edit
        }
        
        const leaveId = this.getAttribute('data-id');
        
        try {
          const response = await fetch(`/leave_types/${leaveId}`);
          const result = await response.json();
          
          if (result.success) {
            const leaveType = result.leaveType;
            
            document.getElementById('editLeaveTypeId').value = leaveType.id;
            document.getElementById('editLeaveName').value = leaveType.leave_name;
            document.getElementById('editLeaveColor').value = leaveType.color || 'primary';
            document.getElementById('editEntitledDays').value = leaveType.entitled_days;
            document.getElementById('editGenderRestriction').value = leaveType.gender_restriction || 'All';
            document.getElementById('editLeaveStatus').value = leaveType.status || 'Active';
            document.getElementById('editLeaveDescription').value = leaveType.description || '';
            document.getElementById('editCarryForwardDays').value = (leaveType.carry_forward_days !== null && typeof leaveType.carry_forward_days !== 'undefined') ? leaveType.carry_forward_days : '';
            
            $('#editLeaveTypeModal').modal('show');
          } else {
            showToast('error', result.message || 'Error loading leave type data');
          }
        } catch (error) {
          console.error('Error:', error);
          showToast('error', 'Error loading leave type data');
        }
      });
    });

    // Edit Leave Type Form Submission
    document.getElementById('editLeaveTypeForm')?.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Updating...';
      submitBtn.disabled = true;
      
      const formData = new FormData(this);
      const data = Object.fromEntries(formData.entries());
      const leaveId = data.id;
      
      try {
        const response = await fetch(`/leave_types/${leaveId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
          showToast('success', 'Leave type updated successfully!');
          $('#editLeaveTypeModal').modal('hide');
          setTimeout(() => location.reload(), 1000);
        } else {
          showToast('error', result.message || 'Error updating leave type');
        }
      } catch (error) {
        console.error('Error:', error);
        showToast('error', 'Error updating leave type');
      } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    });

    // Delete Leave Type
    document.querySelectorAll('.delete-leave-type').forEach(btn => {
      btn.addEventListener('click', function() {
        const leaveId = this.getAttribute('data-id');
        const leaveName = this.getAttribute('data-name');
        
        if (confirm(`Are you sure you want to delete "${leaveName}"? This action cannot be undone.`)) {
          deleteLeaveType(leaveId);
        }
      });
    });

    async function deleteLeaveType(id) {
      try {
        const response = await fetch(`/leave_types/${id}`, {
          method: 'DELETE'
        });
        
        const result = await response.json();
        
        if (result.success) {
          showToast('success', 'Leave type deleted successfully!');
          setTimeout(() => location.reload(), 1000);
        } else {
          showToast('error', result.message || 'Error deleting leave type');
        }
      } catch (error) {
        console.error('Error:', error);
        showToast('error', 'Error deleting leave type');
      }
    }

    // Filter button
    document.getElementById('toggleFilters')?.addEventListener('click', function() {
      const dataTable = $('.leave-types-table').DataTable();
      const searchBox = $('.dataTables_filter input');
      
      // Toggle visibility of the search box
      searchBox.focus().css('width', '200px');
    });

    // Export button
    document.getElementById('exportLeaveTypes')?.addEventListener('click', function() {
      const dataTable = $('.leave-types-table').DataTable();
      const data = dataTable.rows({search: 'applied'}).data();
      const leaveTypes = [];
      
      // Convert table data to array
      data.each(function(value, index) {
        leaveTypes.push({
          name: value[1],
          color: value[2],
          days: value[3],
          carryForward: value[4],
          gender: value[5],
          description: value[6],
          status: value[7]
        });
      });
      
      // Create CSV content
      let csvContent = "data:text/csv;charset=utf-8,";
      csvContent += "Leave Name,Color,Entitled Days,Carry Forward,Gender Restriction,Description,Status\n";
      
      leaveTypes.forEach(leave => {
        const row = [
          leave.name,
          leave.color,
          leave.days,
          leave.carryForward,
          leave.gender,
          leave.description,
          leave.status
        ].map(field => `"${field}"`).join(',');
        csvContent += row + "\n";
      });
      
      // Create download link
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "leave_types_export.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      showToast('success', 'Export completed!');
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

    // Clear form when modal is closed
    $('#addLeaveTypeModal').on('hidden.bs.modal', function () {
      document.getElementById('addLeaveTypeForm').reset();
    });

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

    // Listen for individual checkbox changes
    document.addEventListener('change', function(e) {
      if (e.target.matches('input[type="checkbox"][data-bulk-select-row]')) {
        toggleBulkActions();
      }
    });
  });
</script>
... (file continues)