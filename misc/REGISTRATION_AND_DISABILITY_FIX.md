# Registration & Disability Display - Bug Fixes
**Date:** January 29, 2026  
**Status:** ✅ RESOLVED

---

## Issues Fixed

### 1. **Disability Field Display Issue** 🎯
**Problem:** Employees with disability value `0` (no disability) were showing "-" instead of "NO"

**Root Cause:** 
- Database was storing disability as STRING (`"0"`, `"4"`) not numbers
- JavaScript `parseInt()` wasn't being applied correctly
- Falsy value check was causing issues

**Solution:**
- Updated [views/employees/register.ejs](views/employees/register.ejs#L458-L472) to convert disability to number using `parseInt()`
- Changed display from "No Disability"/"With Disability" to "NO"/"YES"
- Added explicit check with `!isNaN()` to handle null values

**Result:**
```javascript
const disabilityValue = parseInt(employee.disability);

if (!isNaN(disabilityValue)) {
  if (disabilityValue === 0) {
    disabilityText = 'NO';
    disabilityBadgeClass = 'badge-subtle-success';
  } else if (disabilityValue === 4) {
    disabilityText = 'YES';
    disabilityBadgeClass = 'badge-subtle-info';
  }
}
```

✅ Disability `0` → Shows "NO" (green badge)  
✅ Disability `4` → Shows "YES" (info badge)  
✅ Null/empty → Shows "-" (secondary badge)

---

### 2. **Browser Autocomplete Auto-Filling Email** 🔴
**Problem:** Browser was silently auto-filling the email field during registration
- Users entered form data
- Email field auto-filled with old email from history (silently)
- User didn't notice and clicked "Register"
- Database rejected with "Email already exists" error

**Solution:**
Changed [views/auth/register.ejs](views/auth/register.ejs#L37) email field from:
```html
<input autocomplete="on" ... />
```
To:
```html
<input autocomplete="off" ... />
```

**Result:**
✅ Email field no longer auto-fills  
✅ User has full control over what's entered  
✅ Clear visibility of what email is being submitted

---

### 3. **Duplicate Email Registration Constraint** 📧
**Problem:** Registration would fail with error if email already existed

**Solution:**
Added pre-check in [controllers/auth.controller.js](controllers/auth.controller.js#L110-L115) before inserting:
```javascript
// Check if email already exists first
const existingUser = await db.connection.get('SELECT id FROM users WHERE LOWER(email) = ?', [trimmedEmail]);
if (existingUser) {
  console.log('❌ Email already exists in database:', trimmedEmail);
  req.flash('error_msg', 'Email already registered. Please log in or use a different email.');
  return res.redirect('/sign-up');
}
```

**Result:**
✅ Early detection of duplicate emails  
✅ Better user feedback  
✅ Prevents database constraint errors

---

### 4. **Double-Submission on Registration** 🔁
**Problem:** Form was submitting twice when user clicked "Register" button
- First submission succeeded
- Second submission failed with "Email already exists"
- User could accidentally click button twice

**Solution:**
Added form submission handler in [views/auth/register.ejs](views/auth/register.ejs#L25) to disable button:
```html
<form onsubmit="disableSubmitBtn(event)">
  ...
  <button type="submit" id="registerBtn">Register</button>
</form>

<script>
  function disableSubmitBtn(event) {
    const btn = document.getElementById('registerBtn');
    btn.disabled = true;
    btn.innerText = 'Registering...';
    return true; // Allow form to submit
  }
</script>
```

**Result:**
✅ Button disabled after first click  
✅ Shows "Registering..." feedback  
✅ Prevents accidental double-clicks  
✅ Form still submits successfully

---

### 5. **User Seeding Conflict** 👤
**Problem:** Database seed was creating default `admin@example.com` user
- New users couldn't register with that email
- Caused confusion during testing

**Solution:**
Updated [database/seed.js](database/seed.js#L31-L34) to skip user seeding:
```javascript
async seedUsers() {
  // Skip user seeding - allow users to register themselves
  console.log('⏭️ Skipping user seeding - register new users via sign-up');
  return;
}
```

**Result:**
✅ No pre-existing users to conflict with  
✅ Fresh start for every user registration  
✅ No hidden email conflicts

---

## Files Modified

| File | Changes |
|------|---------|
| [views/employees/register.ejs](views/employees/register.ejs#L458-L472) | Fixed disability display logic (parseInt, NO/YES text) |
| [views/auth/register.ejs](views/auth/register.ejs#L37) | Disabled email autocomplete |
| [views/auth/register.ejs](views/auth/register.ejs#L25) | Added form submission handler |
| [views/auth/register.ejs](views/auth/register.ejs#L59-L71) | Added button disable on submit script |
| [controllers/auth.controller.js](controllers/auth.controller.js#L66-L130) | Added email pre-check + logging |
| [database/seed.js](database/seed.js#L31-L34) | Disabled user seeding |

---

## Testing Results

✅ **Disability Display:**
- Employees with disability 0 show "NO" ✅
- Employees with disability 4 show "YES" ✅
- Console debug shows correct types: `string`

✅ **Registration:**
- First registration works: `j@gmail.com` ✅
- Second registration works: `payroll370@gmail.com` ✅
- Third registration works: `fredrickmuasya553@gmail.com` ✅
- Duplicate attempt blocked correctly ✅
- No double-submission ✅

✅ **Database:**
- Users table starts at 0 (no pre-seeded users) ✅
- New registrations appear in users table ✅
- Employees table shows correct disability values ✅

---

## Deployment Notes

- **Database:** Delete `auth.db` to start fresh with no pre-existing users
- **Browser:** Clear autocomplete cache if needed
- **Testing:** All registration flows should work smoothly now

