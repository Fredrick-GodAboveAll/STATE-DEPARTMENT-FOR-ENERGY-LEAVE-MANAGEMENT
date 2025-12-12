<div class="card bg-body-tertiary dark__bg-opacity-50 mb-3">
  <div class="card-body p-3">
    <p class="fs-10 mb-0">
      <a href="https://prium.github.io/falcon/v3.25.0/widgets.html#!">
          
       analytics, <strong> <%= userFirstName %></strong> <%= userLastName %></a>. 
       Your work is ready for you <strong>Monday, September <b>4<sup>th</sup></b> </strong></p>
  </div>
</div>

<div class="card mb-3">
  <div class="bg-holder d-none d-lg-block bg-card" style="background-image:url(../assets/img/icons/spot-illustrations/corner-4.png);"></div>
  <div class="card-body position-relative">
    <div class="row">
      <div class="col-lg-8">

        <h3>Session Management System</h3>
        <p class="mb-4">Fast, small, and feature-rich JavaScript library.</p>

        <a href="/analytics">analytics</a>
        
        <div class="mb-4">
          <h4>Welcome, <%= userFirstName %> <%= userLastName %></h4>
          <h5 class="text-muted"><%= userEmail %></h5>
          <p class="mt-2">You're successfully logged in to your account</p>
        </div>
        
        <!-- Simple session info -->
        <div class="alert alert-info mb-4 d-flex justify-content-between align-items-center">
          <div>
            <small class="text-muted">Session expires after 1 hour of inactivity</small>
          </div>
          <div class="text-end">
            <small class="fw-bold">Time remaining: <span id="session-timer"><%= locals.sessionInfo ? locals.sessionInfo.timeRemaining : '1h' %></span></small>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="card-footer text-muted text-center">
    Session Management System &copy; <%= new Date().getFullYear() %>
  </div>
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
</script>