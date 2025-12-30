


  <div class="d-flex mb-4 mt-3">
    <span class="fa-stack me-2 ms-n1">
      <i class="fas fa-circle fa-stack-2x text-300"></i>
      <i class="fa-inverse fa-stack-1x text-primary fas fa-plane"></i>
    </span>

    <div class="col">
      <h5 class="mb-0 text-primary position-relative">
        <span class="bg-200 dark__bg-1100 pe-3">Holidays &amp; Events</span>
        <span class="border position-absolute top-50 translate-middle-y w-100 start-0 z-n1"></span>
      </h5>
      <p class="mb-0"> explore holidays</p>
    </div>

  </div>



<!-- <div class="card bg-body-tertiary dark__bg-opacity-50 mb-3">
  <div class="card-body p-3">
    <p class="fs-10 mb-0">
      <a href="https://prium.github.io/falcon/v3.25.0/widgets.html#!">
        Holidays, <strong><%= userFirstName %></strong> <%= userLastName %>
      </a>. 
      <span id="session-timer"><%= locals.sessionInfo ? locals.sessionInfo.timeRemaining : '1h' %> remaining </span>
      <strong>Monday, September <b>4<sup>th</sup></b></strong>
    </p>
  </div>
</div> -->



<!-- Holiday Summary Cards -->
<div class="row mb-4">

  <div class="col-md-3 col-6">
    <div class="card border-start border-3 border-success h-100">
      <div class="card-body p-3">
        <div class="d-flex align-items-center">
          <div class="flex-1">
            <h6 class="text-600 mb-1">Total Holidays</h6>
            <h4 class="mb-0"><%= holidays ? holidays.length : 0 %></h4>
          </div>
          <div class="ms-2">
            <span class="fas fa-calendar-alt text-success fa-2x"></span>
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
            <h6 class="text-600 mb-1">This Year</h6>
            <% 
              const currentYear = new Date().getFullYear();
              const thisYearHolidays = holidays ? holidays.filter(h => h.year == currentYear).length : 0;
            %>
            <h4 class="mb-0"><%= thisYearHolidays %></h4>
          </div>
          <div class="ms-2">
            <span class="fas fa-calendar-day text-warning fa-2x"></span>
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
            <h6 class="text-600 mb-1">Public Holidays</h6>
            <% 
              const publicHolidays = holidays ? holidays.filter(h => h.holiday_type === 'Public Holiday').length : 0;
            %>
            <h4 class="mb-0"><%= publicHolidays %></h4>
          </div>
          <div class="ms-2">
            <span class="fas fa-flag text-info fa-2x"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="col-md-3 col-6">
    <div class="card border-start border-3 border-primary h-100">
      <div class="card-body p-3">
        <div class="d-flex align-items-center">
          <div class="flex-1">
            <h6 class="text-600 mb-1">Upcoming</h6>
            <% 
              const today = new Date();
              const upcomingHolidays = holidays ? holidays.filter(h => {
                const holidayDate = new Date(h.holiday_date);
                return holidayDate >= today;
              }).length : 0;
            %>
            <h4 class="mb-0"><%= upcomingHolidays %></h4>
          </div>
          <div class="ms-2">
            <span class="fas fa-bell text-primary fa-2x"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


<div class="row g-3">

  <!-- Holiday calender -->
  <div class="col-xxl-8">
    <div class="card overflow-hidden h-100">
      <div class="card-body p-0 management-calendar">
        <div class="row g-3">
          <div class="col-md-7">
            <div class="p-x1">
              <div class="d-flex justify-content-between">
                <div class="order-md-1">
                  <button class="btn btn-sm border me-1 shadow-sm" type="button" data-event="prev" data-bs-toggle="tooltip" title="Previous">
                    <span class="fas fa-chevron-left"></span>
                  </button>
                  <button class="btn btn-sm text-secondary border px-sm-4 shadow-sm" type="button" data-event="today">Today</button>
                  <button class="btn btn-sm border ms-1 shadow-sm" type="button" data-event="next" data-bs-toggle="tooltip" title="Next">
                    <span class="fas fa-chevron-right"></span>
                  </button>
                </div>
                <button class="btn btn-sm text-primary border order-md-0 shadow-none" type="button" data-bs-toggle="modal" data-bs-target="#addEventModal"> 
                  <span class="fas fa-plus me-2"></span>New Holiday or Event
                </button>
              </div>
            </div><!-- Find the JS file for the following calendar at: src/js/calendar/management-calendar.js-->
            <!-- If you are not using gulp based workflow, you can find the transpiled code at: public/assets/js/theme.js-->
            <div class="calendar-outline px-3" id="managementAppCalendar" data-calendar-option='{"title":"management-calendar-title","day":"management-calendar-day","events":"management-calendar-events"}'></div>
          </div>
          <div class="col-md-5 bg-body-tertiary pt-3">
            <div class="px-3">
              <h4 class="mb-0 fs-9 fs-sm-8 fs-lg-7" id="management-calendar-title"></h4>
              <p class="text-500 mb-0" id="management-calendar-day"></p>
              <ul class="list-unstyled mt-3 scrollbar management-calendar-events" id="management-calendar-events"></ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Holiday table -->
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
                    <h5 class="mb-0">All Holidays</h5>
                  </div>
                  <div class="col-6 col-sm-auto ms-auto text-end ps-0">
                    <button class="btn btn-falcon-success btn-sm" type="button" data-bs-toggle="modal" data-bs-target="#addHolidayModal">
                      <span class="fas fa-plus" data-fa-transform="shrink-3 down-2"></span>
                      <span class="d-none d-sm-inline-block ms-1">Add Holiday</span>
                    </button>
                    <button class="btn btn-falcon-default btn-sm mx-2" type="button" id="toggleFilters">
                      <span class="fas fa-filter" data-fa-transform="shrink-3 down-2"></span>
                      <span class="d-none d-sm-inline-block ms-1">Filter</span>
                    </button>
                    <button class="btn btn-falcon-default btn-sm" type="button" id="exportHolidays">
                      <span class="fas fa-external-link-alt" data-fa-transform="shrink-3 down-2"></span>
                      <span class="d-none d-sm-inline-block ms-1">Export</span>
                    </button>
                  </div>
                </div>
              </div>
              <div class="card-body px-0 pt-0">
                <table class="table table-sm mb-0 overflow-hidden data-table fs-10 holidays-table" 
                  data-datatables='{"responsive":true,"pagingType":"simple","lengthChange":true,"pageLength":10,"searching":true,"bDeferRender":true,"serverSide":false,"language":{"info":"_START_ to _END_ of _TOTAL_ holidays","search":"Search holidays:","searchPlaceholder":"Search by name, type..."},"order":[[1,"asc"]],"columnDefs":[{"orderable":false,"targets":[0,5,7]}]}'>
                  <thead class="bg-200">
                    <tr>
                      <th class="text-900 no-sort white-space-nowrap" data-orderable="false">
                        <div class="form-check mb-0 d-flex align-items-center">
                          <input class="form-check-input" id="checkbox-bulk-item-select" type="checkbox" data-bulk-select='{"body":"table-simple-pagination-body","actions":"table-simple-pagination-actions","replacedElement":"table-simple-pagination-replace-element"}' />
                        </div>
                      </th>
                      <th class="text-900 sort white-space-nowrap">Holiday Name</th>
                      <th class="text-900 sort white-space-nowrap">Date</th>
                      <th class="text-900 sort white-space-nowrap">Type</th>
                      <th class="text-900 sort white-space-nowrap">Year</th>
                      <th class="text-900 sort white-space-nowrap">Recurring</th>
                      <th class="text-900 sort white-space-nowrap">Description</th>
                      <th class="text-900 sort white-space-nowrap">Actions</th>
                    </tr>
                  </thead>
                  <tbody class="list" id="table-simple-pagination-body">
                    <% if (holidays && holidays.length > 0) { %>
                      <% holidays.forEach((holiday, index) => { %>
                        <% const holidayDate = new Date(holiday.holiday_date); %>
                        <tr class="btn-reveal-trigger">
                          <td class="align-middle" style="width: 28px;">
                            <div class="form-check mb-0">
                              <input class="form-check-input" type="checkbox" id="holiday-<%= index %>" data-bulk-select-row="data-bulk-select-row" />
                            </div>
                          </td>
                          <td class="align-middle white-space-nowrap fw-semi-bold name">
                            <div class="d-flex align-items-center">
                              
                              <a href="#!" class="holiday-name text-900" data-id="<%= holiday.id %>" data-bs-toggle="modal" data-bs-target="#editHolidayModal">
                                <%= holiday.holiday_name %>
                              </a>
                            </div>
                          </td>
                          <td class="align-middle white-space-nowrap" data-order="<%= holidayDate.getTime() %>">
                            <div class="d-flex flex-column">
                              <span class="fw-semi-bold">
                                <%= holidayDate.toLocaleDateString('en-US', { 
                                  weekday: 'short', 
                                  month: 'short', 
                                  day: 'numeric' 
                                }) %>
                              </span>
                              <small class="text-500"><%= holiday.year %></small>
                            </div>
                          </td>

                          <td class="align-middle white-space-nowrap">
                            <span class="fw-semi-bold"><%= holiday.holiday_type %></span>
                          </td>

                          <td class="align-middle white-space-nowrap">
                            <span class="fw-semi-bold"><%= holiday.year %></span>
                          </td>
                          <td class="align-middle white-space-nowrap">
                            <% if (holiday.recurring) { %>
                              <span class="badge badge-subtle-success rounded-pill d-inline-flex align-items-center">
                                <span class="fas fa-sync-alt me-1" data-fa-transform="shrink-2"></span>
                                Yes
                              </span>
                            <% } else { %>
                              <span class="badge badge-subtle-secondary rounded-pill d-inline-flex align-items-center">
                                <span class="fas fa-times me-1" data-fa-transform="shrink-2"></span>
                                No
                              </span>
                            <% } %>
                          </td>
                          <td class="align-middle white-space-nowrap">
                            <div class="text-truncate" style="max-width: 180px;" title="<%= holiday.description || 'No description' %>">
                              <%= holiday.description || '-' %>
                            </div>
                          </td>
                          <td class="align-middle white-space-nowrap text-end">
                            <div class="btn-group" role="group">
                              <button class="btn btn-sm btn-falcon-default view-holiday" data-id="<%= holiday.id %>" title="View">
                                <span class="fas fa-eye"></span>
                              </button>
                              <button class="btn btn-sm btn-falcon-default edit-holiday" data-id="<%= holiday.id %>" title="Edit">
                                <span class="fas fa-edit"></span>
                              </button>
                              <button class="btn btn-sm btn-falcon-default text-danger delete-holiday" data-id="<%= holiday.id %>" data-name="<%= holiday.holiday_name %>" title="Delete">
                                <span class="fas fa-trash"></span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      <% }); %>
                    <% } else { %>
                      <tr>
                        <td colspan="8" class="text-center py-5">
                          <div class="text-muted">
                            <span class="fas fa-calendar-times fa-3x mb-3"></span>
                            <h5 class="mb-1">No holidays found</h5>
                            <p class="mb-0">Click "Add Holiday" to create your first holiday</p>
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







<!--==================================== M O D A L S  ==============================   -->

<!-- Calender modals  -->

<div class="modal fade" id="authentication-modal" tabindex="-1" role="dialog" aria-labelledby="authentication-modal-label" aria-hidden="true">
  <div class="modal-dialog mt-6" role="document">
    <div class="modal-content border-0">
      <div class="modal-header px-5 position-relative modal-shape-header bg-shape">
        <div class="position-relative z-1">
          <h4 class="mb-0 text-white" id="authentication-modal-label">Register</h4>
          <p class="fs-10 mb-0 text-white">Please create your free Falcon account</p>
        </div>
        <div data-bs-theme="dark"><button class="btn-close position-absolute top-0 end-0 mt-2 me-2" data-bs-dismiss="modal" aria-label="Close"></button></div>
      </div>
      <div class="modal-body py-4 px-5">
        <form>
          <div class="mb-3"><label class="form-label" for="modal-auth-name">Name</label><input class="form-control" type="text" autocomplete="on" id="modal-auth-name" /></div>
          <div class="mb-3"><label class="form-label" for="modal-auth-email">Email address</label><input class="form-control" type="email" autocomplete="on" id="modal-auth-email" /></div>
          <div class="row gx-2">
            <div class="mb-3 col-sm-6"><label class="form-label" for="modal-auth-password">Password</label><input class="form-control" type="password" autocomplete="on" id="modal-auth-password" /></div>
            <div class="mb-3 col-sm-6"><label class="form-label" for="modal-auth-confirm-password">Confirm Password</label><input class="form-control" type="password" autocomplete="on" id="modal-auth-confirm-password" /></div>
          </div>
          <div class="form-check"><input class="form-check-input" type="checkbox" id="modal-auth-register-checkbox" /><label class="form-label" for="modal-auth-register-checkbox">I accept the <a href="#!">terms </a>and <a class="white-space-nowrap" href="#!">privacy policy</a></label></div>
          <div class="mb-3"><button class="btn btn-primary d-block w-100 mt-3" type="submit" name="submit">Register</button></div>
        </form>
        <div class="position-relative mt-5">
          <hr />
          <div class="divider-content-center">or register with</div>
        </div>
        <div class="row g-2 mt-2">
          <div class="col-sm-6"><a class="btn btn-outline-google-plus btn-sm d-block w-100" href="#"><span class="fab fa-google-plus-g me-2" data-fa-transform="grow-8"></span> google</a></div>
          <div class="col-sm-6"><a class="btn btn-outline-facebook btn-sm d-block w-100" href="#"><span class="fab fa-facebook-square me-2" data-fa-transform="grow-8"></span> facebook</a></div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="eventDetailsModal" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content border"></div>
  </div>
</div>

<div class="modal fade" id="addEventModal" tabindex="-1">
<div class="modal-dialog">
  <div class="modal-content border">
    <form id="addEventForm" autocomplete="off">
      <div class="modal-header px-x1 bg-body-tertiary border-bottom-0">
        <h5 class="modal-title">Create Schedule</h5><button class="btn-close me-n1" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body p-x1">
        <div class="mb-3"><label class="fs-9" for="eventTitle">Title</label><input class="form-control" id="eventTitle" type="text" name="title" required="required" /></div>
        <div class="mb-3"><label class="fs-9" for="eventStartDate">Start Date</label><input class="form-control datetimepicker" id="eventStartDate" type="text" required="required" name="startDate" placeholder="yyyy/mm/dd hh:mm" data-options='{"static":"true","enableTime":"true","dateFormat":"Y-m-d H:i"}' /></div>
        <div class="mb-3"><label class="fs-9" for="eventEndDate">End Date</label><input class="form-control datetimepicker" id="eventEndDate" type="text" name="endDate" placeholder="yyyy/mm/dd hh:mm" data-options='{"static":"true","enableTime":"true","dateFormat":"Y-m-d H:i"}' /></div>
        <div class="form-check"><input class="form-check-input" type="checkbox" id="eventAllDay" name="allDay" /><label class="form-check-label" for="eventAllDay">All Day</label></div>
        <div class="mb-3"> <label class="fs-9">Schedule Meeting</label>
          <div><a class="btn badge-subtle-success btn-sm" href="#!"><span class="fas fa-video me-2"></span>Add video conference link</a></div>
        </div>
        <div class="mb-3"><label class="fs-9" for="eventDescription">Description</label><textarea class="form-control" rows="3" name="description" id="eventDescription"></textarea></div>
        <div class="mb-3"><label class="fs-9" for="eventLabel">Label</label><select class="form-select" id="eventLabel" name="label">
            <option value="" selected="selected">None</option>
            <option value="primary">Business</option>
            <option value="danger">Important</option>
            <option value="success">Personal</option>
            <option value="warning">Must Attend</option>
          </select></div>
      </div>
      <div class="modal-footer d-flex justify-content-end align-items-center bg-body-tertiary border-0"><a class="me-3 text-600" href="../app/events/create-an-event.html">More options</a><button class="btn btn-primary px-4" type="submit">Save</button></div>
    </form>
  </div>
</div>
</div>

<!-- Table modals  -->

<!-- Add Holiday Modal -->
<div class="modal fade" id="addHolidayModal" tabindex="-1" aria-labelledby="addHolidayModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="addHolidayModalLabel">Add New Holiday</h5>
        <button class="btn p-1" type="button" data-bs-dismiss="modal" aria-label="Close">
          <span class="fas fa-times fs-9"></span>
        </button>
      </div>
      <form id="addHolidayForm">
        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label" for="holidayName">Holiday Name *</label>
            <input class="form-control" id="holidayName" type="text" name="holiday_name" required>
          </div>
          <div class="mb-3">
            <label class="form-label" for="holidayDate">Date *</label>
            <input class="form-control" id="holidayDate" type="date" name="holiday_date" required>
          </div>
          <div class="row mb-3">
            <div class="col-md-6">
              <label class="form-label" for="holidayType">Type *</label>
              <select class="form-select" id="holidayType" name="holiday_type" required>
                <option value="Public Holiday">Public Holiday</option>
                <option value="Company Holiday">Company Holiday</option>
                <option value="Optional Holiday">Optional Holiday</option>
                <option value="Special Day">Special Day</option>
              </select>
            </div>
            <div class="col-md-6">
              <label class="form-label" for="holidayYear">Year *</label>
              <% 
                const modalCurrentYear = new Date().getFullYear();
              %>
              <select class="form-select" id="holidayYear" name="year" required>
                <% for(let year = modalCurrentYear - 1; year <= modalCurrentYear + 2; year++) { %>
                  <option value="<%= year %>" <%= year === modalCurrentYear ? 'selected' : '' %>><%= year %></option>
                <% } %>
              </select>
            </div>
          </div>
          <div class="mb-3">
            <div class="form-check">
              <input class="form-check-input" id="recurring" type="checkbox" name="recurring" value="true">
              <label class="form-check-label" for="recurring">Recurring Holiday</label>
            </div>
            <small class="text-muted">If checked, this holiday will repeat every year</small>
          </div>
          <div class="mb-3">
            <label class="form-label" for="holidayDescription">Description</label>
            <textarea class="form-control" id="holidayDescription" name="description" rows="3"></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" type="button" data-bs-dismiss="modal">Cancel</button>
          <button class="btn btn-primary" type="submit">Save Holiday</button>
        </div>
      </form>
    </div>
  </div>
</div>

<!-- Edit Holiday Modal -->
<div class="modal fade" id="editHolidayModal" tabindex="-1" aria-labelledby="editHolidayModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="editHolidayModalLabel">Edit Holiday</h5>
        <button class="btn p-1" type="button" data-bs-dismiss="modal" aria-label="Close">
          <span class="fas fa-times fs-9"></span>
        </button>
      </div>
      <form id="editHolidayForm">
        <input type="hidden" id="editHolidayId" name="id">
        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label" for="editHolidayName">Holiday Name *</label>
            <input class="form-control" id="editHolidayName" type="text" name="holiday_name" required>
          </div>
          <div class="mb-3">
            <label class="form-label" for="editHolidayDate">Date *</label>
            <input class="form-control" id="editHolidayDate" type="date" name="holiday_date" required>
          </div>
          <div class="row mb-3">
            <div class="col-md-6">
              <label class="form-label" for="editHolidayType">Type *</label>
              <select class="form-select" id="editHolidayType" name="holiday_type" required>
                <option value="Public Holiday">Public Holiday</option>
                <option value="Company Holiday">Company Holiday</option>
                <option value="Optional Holiday">Optional Holiday</option>
                <option value="Special Day">Special Day</option>
              </select>
            </div>
            <div class="col-md-6">
              <label class="form-label" for="editHolidayYear">Year *</label>
              <% 
                const editModalCurrentYear = new Date().getFullYear();
              %>
              <select class="form-select" id="editHolidayYear" name="year" required>
                <% for(let year = editModalCurrentYear - 1; year <= editModalCurrentYear + 2; year++) { %>
                  <option value="<%= year %>"><%= year %></option>
                <% } %>
              </select>
            </div>
          </div>
          <div class="mb-3">
            <div class="form-check">
              <input class="form-check-input" id="editRecurring" type="checkbox" name="recurring" value="true">
              <label class="form-check-label" for="editRecurring">Recurring Holiday</label>
            </div>
            <small class="text-muted">If checked, this holiday will repeat every year</small>
          </div>
          <div class="mb-3">
            <label class="form-label" for="editHolidayDescription">Description</label>
            <textarea class="form-control" id="editHolidayDescription" name="description" rows="3"></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" type="button" data-bs-dismiss="modal">Cancel</button>
          <button class="btn btn-primary" type="submit">Update Holiday</button>
        </div>
      </form>
    </div>
  </div>
</div>

<!-- message Toast Container -->
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

  // Holiday CRUD Operations
  document.addEventListener('DOMContentLoaded', function() {
    // Set today's date as default for date picker
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('holidayDate')?.setAttribute('min', today);
    document.getElementById('editHolidayDate')?.setAttribute('min', today);

    // Add Holiday Form Submission
    document.getElementById('addHolidayForm')?.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Saving...';
      submitBtn.disabled = true;
      
      const formData = new FormData(this);
      const data = Object.fromEntries(formData.entries());
      
      try {
        const response = await fetch('/api/holidays', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
          showToast('success', 'Holiday added successfully!');
          $('#addHolidayModal').modal('hide');
          this.reset();
          setTimeout(() => location.reload(), 1000);
        } else {
          showToast('error', result.message || 'Error adding holiday');
        }
      } catch (error) {
        console.error('Error:', error);
        showToast('error', 'Error adding holiday. Please try again.');
      } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    });

    // Edit Holiday - Load Data
    document.querySelectorAll('.edit-holiday, .holiday-name').forEach(btn => {
      btn.addEventListener('click', async function(e) {
        if (this.classList.contains('holiday-name') && !e.target.closest('.edit-holiday')) {
          return; // Don't trigger for view, only for edit
        }
        
        const holidayId = this.getAttribute('data-id');
        
        try {
          const response = await fetch(`/api/holidays/${holidayId}`);
          const result = await response.json();
          
          if (result.success) {
            const holiday = result.holiday;
            const holidayDate = new Date(holiday.holiday_date);
            
            // Format date for input field (YYYY-MM-DD)
            const formattedDate = holidayDate.toISOString().split('T')[0];
            
            document.getElementById('editHolidayId').value = holiday.id;
            document.getElementById('editHolidayName').value = holiday.holiday_name;
            document.getElementById('editHolidayDate').value = formattedDate;
            document.getElementById('editHolidayType').value = holiday.holiday_type;
            document.getElementById('editHolidayYear').value = holiday.year;
            document.getElementById('editRecurring').checked = holiday.recurring === 1;
            document.getElementById('editHolidayDescription').value = holiday.description || '';
            
            $('#editHolidayModal').modal('show');
          } else {
            showToast('error', result.message || 'Error loading holiday data');
          }
        } catch (error) {
          console.error('Error:', error);
          showToast('error', 'Error loading holiday data');
        }
      });
    });

    // Edit Holiday Form Submission
    document.getElementById('editHolidayForm')?.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Updating...';
      submitBtn.disabled = true;
      
      const formData = new FormData(this);
      const data = Object.fromEntries(formData.entries());
      const holidayId = data.id;
      
      try {
        const response = await fetch(`/api/holidays/${holidayId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
          showToast('success', 'Holiday updated successfully!');
          $('#editHolidayModal').modal('hide');
          setTimeout(() => location.reload(), 1000);
        } else {
          showToast('error', result.message || 'Error updating holiday');
        }
      } catch (error) {
        console.error('Error:', error);
        showToast('error', 'Error updating holiday');
      } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    });

    // Delete Holiday
    document.querySelectorAll('.delete-holiday').forEach(btn => {
      btn.addEventListener('click', function() {
        const holidayId = this.getAttribute('data-id');
        const holidayName = this.getAttribute('data-name');
        
        if (confirm(`Are you sure you want to delete "${holidayName}"? This action cannot be undone.`)) {
          deleteHoliday(holidayId);
        }
      });
    });

    async function deleteHoliday(id) {
      try {
        const response = await fetch(`/api/holidays/${id}`, {
          method: 'DELETE'
        });
        
        const result = await response.json();
        
        if (result.success) {
          showToast('success', 'Holiday deleted successfully!');
          setTimeout(() => location.reload(), 1000);
        } else {
          showToast('error', result.message || 'Error deleting holiday');
        }
      } catch (error) {
        console.error('Error:', error);
        showToast('error', 'Error deleting holiday');
      }
    }

    // View Holiday (Simple alert with details)
    document.querySelectorAll('.view-holiday').forEach(btn => {
      btn.addEventListener('click', async function() {
        const holidayId = this.getAttribute('data-id');
        
        try {
          const response = await fetch(`/api/holidays/${holidayId}`);
          const result = await response.json();
          
          if (result.success) {
            const holiday = result.holiday;
            const holidayDate = new Date(holiday.holiday_date);
            const formattedDate = holidayDate.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            });
            
            const message = `
              <strong>${holiday.holiday_name}</strong><br>
              <strong>Date:</strong> ${formattedDate}<br>
              <strong>Type:</strong> ${holiday.holiday_type}<br>
              <strong>Year:</strong> ${holiday.year}<br>
              <strong>Recurring:</strong> ${holiday.recurring ? 'Yes' : 'No'}<br>
              <strong>Description:</strong> ${holiday.description || 'No description'}
            `;
            
            showToast('info', message, 5000);
          } else {
            showToast('error', result.message || 'Error loading holiday details');
          }
        } catch (error) {
          console.error('Error:', error);
          showToast('error', 'Error loading holiday details');
        }
      });
    });

    // Filter button
    document.getElementById('toggleFilters')?.addEventListener('click', function() {
      const dataTable = $('.holidays-table').DataTable();
      const searchBox = $('.dataTables_filter input');
      
      // Toggle visibility of the search box if it's hidden by DataTables responsive
      searchBox.focus().css('width', '200px');
    });

    // Export button
    document.getElementById('exportHolidays')?.addEventListener('click', function() {
      const dataTable = $('.holidays-table').DataTable();
      const data = dataTable.rows({search: 'applied'}).data();
      const holidays = [];
      
      // Convert table data to array
      data.each(function(value, index) {
        holidays.push({
          name: value[1],
          date: value[2],
          type: value[3],
          year: value[4],
          recurring: value[5],
          description: value[6]
        });
      });
      
      // Create CSV content
      let csvContent = "data:text/csv;charset=utf-8,";
      csvContent += "Holiday Name,Date,Type,Year,Recurring,Description\n";
      
      holidays.forEach(holiday => {
        const row = [
          holiday.name,
          holiday.date,
          holiday.type,
          holiday.year,
          holiday.recurring,
          holiday.description
        ].map(field => `"${field}"`).join(',');
        csvContent += row + "\n";
      });
      
      // Create download link
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "holidays_export.csv");
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
    $('#addHolidayModal').on('hidden.bs.modal', function () {
      document.getElementById('addHolidayForm').reset();
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