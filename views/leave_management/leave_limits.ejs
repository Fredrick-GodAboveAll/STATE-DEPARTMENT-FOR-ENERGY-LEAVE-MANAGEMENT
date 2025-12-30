<div class="d-flex mb-4 mt-3">
  <div class="col">
    <h5 class="mb-0 text-primary">Leave Limits — Carry Forward</h5>
    <p class="mb-0">Set the number of days that can be carried forward to the next financial year.</p>
  </div>
</div>

<!-- Toast container -->
<div class="position-fixed top-0 end-0 p-3" style="z-index: 1100;">
  <div id="toastContainer"></div>
</div>

<div class="card">
  <div class="card-body">
    <table class="table table-sm" id="leaveLimitsTable">
      <thead>
        <tr>
          <th>Leave Type</th>
          <th>Entitled Days</th>
          <th>Carry Forward (days)</th>
          <th class="text-end">Actions</th>
        </tr>
      </thead>
      <tbody>
        <% if (leaveTypes && leaveTypes.length > 0) { %>
          <% leaveTypes.forEach(lt => { %>
            <tr data-id="<%= lt.id %>">
              <td><%= lt.leave_name %></td>
              <td><%= lt.entitled_days %></td>
              <td>
                <input type="number" min="0" class="form-control form-control-sm carry-input" name="carry_forward_days" value="<%= (lt.carry_forward_days !== null && typeof lt.carry_forward_days !== 'undefined') ? lt.carry_forward_days : '' %>" placeholder="N/A">
              </td>
              <td class="text-end">
                <button class="btn btn-sm btn-primary save-carry" data-id="<%= lt.id %>">Save</button>
              </td>
            </tr>
          <% }) %>
        <% } else { %>
          <tr>
            <td colspan="4" class="text-center py-4">No leave types available</td>
          </tr>
        <% } %>
      </tbody>
    </table>
  </div>
</div>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.save-carry').forEach(btn => {
      btn.addEventListener('click', async function() {
        const id = this.getAttribute('data-id');
        const row = this.closest('tr');
        const input = row.querySelector('.carry-input');
        const value = input.value;

        // UI feedback
        const originalText = this.innerHTML;
        this.disabled = true;
        this.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Saving...';

        try {
          const res = await fetch(`/leave_types/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ carry_forward_days: value === '' ? null : parseInt(value) })
          });

          const result = await res.json();
          if (result.success) {
            showToast('success', 'Carry forward updated');
          } else {
            showToast('error', result.message || 'Error saving');
          }
        } catch (err) {
          console.error(err);
          showToast('error', 'Error saving carry forward');
        } finally {
          this.disabled = false;
          this.innerHTML = originalText;
        }
      });
    });

    function showToast(type, msg) {
      const container = document.getElementById('toastContainer');
      if (!container) return;

      // Map custom types to Bootstrap background classes
      let bgType = type;
      if (type === 'error') bgType = 'danger';
      if (type === 'info') bgType = 'primary';

      const id = 't-' + Date.now();
      const toastHtml = `
        <div id="${id}" class="toast align-items-center text-bg-${bgType} border-0" role="alert" aria-live="assertive" aria-atomic="true">
          <div class="d-flex">
            <div class="toast-body">${msg}</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        </div>
      `;

      container.insertAdjacentHTML('beforeend', toastHtml);
      const el = document.getElementById(id);
      const bs = new bootstrap.Toast(el, { delay: 3000 });
      bs.show();
      el.addEventListener('hidden.bs.toast', () => el.remove());
    }
  });
</script>