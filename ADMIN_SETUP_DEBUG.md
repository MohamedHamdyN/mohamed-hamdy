# Admin Account Setup Debugging Guide

## Issue: Error when creating admin account on `/admin/setup`

### What was fixed:

1. **Cookie handling**: Fixed the `cookies()` function calls in `lib/auth.ts` to not await them (they're not async in the current Next.js version)

2. **Better error logging**: Added detailed console logs throughout the setup and login flow to help identify where failures occur

3. **Database connection testing**: Created an API endpoint at `/api/test-db` to verify database connectivity

4. **Improved UI feedback**: Added database connection status display on the setup page

### How to debug:

#### Step 1: Check Database Connection
1. Open browser DevTools (F12)
2. Go to the setup page: `http://localhost:3000/admin/setup`
3. Check the browser console for logs starting with `[v0]`
4. Look for the database connection status - it should show "Database connected"
5. You can also test directly at: `http://localhost:3000/api/test-db` (should return JSON with `success: true`)

#### Step 2: Check Environment Variables
Make sure your `.env.local` file has:
```
DATABASE_URL=your_neon_connection_string
```

#### Step 3: Monitor the Setup Process
1. Fill in the form with a test email and password (min 8 chars)
2. Click "Create Admin Account"
3. Watch the console for these logs in order:
   - `[v0] Checking database connection`
   - `[v0] Database connected:`
   - `[v0] Starting admin setup process`
   - `[v0] Calling initializeAdmin`
   - `[v0] Starting admin initialization for email: ...`
   - `[v0] Checking if admin already exists`
   - `[v0] Hashing password and creating admin account`
   - `[v0] Admin created successfully with ID: ...`
   - `[v0] Admin created successfully, attempting login`
   - `[v0] Calling loginAdmin`
   - `[v0] Attempting login for: ...`
   - `[v0] Login successful, redirecting to dashboard`

#### Step 4: Check for Specific Errors
If you see errors like:
- `Admin account already exists` - The admin was created, try logging in instead at `/admin/login`
- `DATABASE_URL is not set` - Set the environment variable
- `Password must be at least 8 characters` - Use a longer password
- `Passwords do not match` - Make sure confirm password matches

### Common Issues and Solutions:

**Issue**: "An error occurred while creating admin account"
- Check browser console (F12) for detailed error logsi
- Verify DATABASE_URL is set
- Test the `/api/test-db` endpoint directly

**Issue**: Admin account created but login fails
- The session cookie might not be set properly
- Clear browser cookies and try again
- Check that cookies are enabled

**Issue**: Stuck on "Creating Account..." button
- Check the console for any errors
- The request might be failing silently - look for network errors in DevTools Network tab
- Check if DATABASE_URL is properly configured

### Testing the complete flow:

1. Navigate to `/admin/setup`
2. Create account with email: `admin@example.com` and password: `testpassword123`
3. You should be redirected to `/admin/dashboard`
4. If not redirected, check console logs
5. If redirected but page is blank/error, the session might not be properly established

### To verify the admin was created:

You can run this SQL query in your Neon dashboard:
```sql
SELECT id, email, created_at FROM admins;
```

It should show your newly created admin account.

### Additional debugging commands:

In the browser console, you can run:
```javascript
// Check if cookies are being set
document.cookie

// Clear all cookies
document.cookie.split(";").forEach((c) => {
  document.cookie = c
    .replace(/^ +/, "")
    .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`)
})
```

## Next Steps

After successfully creating an admin account:
1. Go to `/admin/login` to sign in
2. Access the admin dashboard at `/admin/dashboard`
3. Create/edit portfolio content through the CMS interface
