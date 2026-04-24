## Deployment Checklist - Neon PostgreSQL Integration

### Pre-Deployment Setup

#### 1. Environment Variables ✅ REQUIRED

Set these in your Vercel project settings > Environment Variables:

```
DATABASE_URL = postgresql://[user]:[password]@[host]:5432/[database]
```

**How to get DATABASE_URL from Neon:**
1. Go to Neon Console (https://console.neon.tech)
2. Select your project
3. Go to Connection strings
4. Copy the PostgreSQL connection string
5. Paste into Vercel environment variable

---

#### 2. Database Schema Verification ✅ REQUIRED

Ensure your Neon database has all required tables:

Run this SQL in Neon to verify schema exists:

```sql
-- Check all required tables exist
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Should return:
-- admin_sessions
-- admins
-- categories
-- certifications
-- clients
-- colors
-- education
-- experience
-- media
-- page_status
-- profile
-- projects
-- services
-- settings
-- skills
-- social_media
-- stats
-- technologies
-- entity_technologies
```

If tables are missing, run the migration SQL from `/scripts/200-migrate-to-new-schema.sql`

---

#### 3. Initial Data Setup ✅ REQUIRED

After deployment, you need to initialize data:

1. **Access Admin Panel**:
   - Navigate to `https://your-domain.com/admin/login`
   - Create first admin account or login with existing credentials

2. **Create Initial Colors** (`/admin/colors`):
   ```
   Required: At least 1 default color (id: 1)
   Example:
   - Blue (#0066CC)
   - Red (#FF0000)
   - Green (#00CC00)
   - etc. (up to 8 colors)
   ```

3. **Configure Profile** (`/admin/profile`):
   - Add your name
   - Add job titles
   - Add email/phone
   - Upload avatar (or use default)
   - Add descriptions

4. **Configure Settings** (`/admin/settings`):
   - Set admin_limit (how many admins allowed)
   - Toggle dashboard_status (true = website on, false = maintenance)
   - Toggle open_to_work status
   - Select official_color_id
   - Add any notifications if needed

5. **Create Categories** (`/admin/categories`):
   - Add project categories
   - Assign colors to each
   - Set display order

6. **Add Technologies** (if used):
   - Upload technology list
   - Assign icons and colors

7. **Add Projects** (`/admin/projects`):
   - Upload projects with images
   - Assign categories
   - Select technologies
   - Set featured projects for homepage

8. **Add Skills** (`/admin/skills`):
   - Add skills with icons
   - Assign colors
   - Set categories if applicable

9. **Add Services** (`/admin/services`):
   - Add service offerings
   - Add feature lists
   - Assign colors

10. **Add Social Links** (`/admin/social`):
    - Add LinkedIn, GitHub, Twitter, etc.
    - URLs will be displayed in footer/header

11. **Add About Section** (`/admin/about`):
    - **Stats**: Years of experience, projects completed, etc.
    - **Education**: University degrees and timeline
    - **Experience**: Work history and timeline
    - **Certifications**: Relevant certifications

12. **Configure Page Visibility** (`/admin/pages`):
    - Toggle visibility of pages/sections
    - Default: all visible (status = true)

---

### Build & Deployment Steps

#### 1. Build Locally ✅ TEST FIRST

```bash
# From project root
npm run build

# Should complete without errors
# Output: ✓ Compiled successfully
```

#### 2. Deploy to Vercel ✅ DEPLOY

```bash
# Option 1: Push to GitHub (if connected)
git add .
git commit -m "Complete Neon database integration"
git push

# Vercel will auto-deploy

# Option 2: Vercel CLI
vercel deploy --prod
```

#### 3. Set Environment Variables in Vercel ✅ CRITICAL

1. Go to Vercel project settings
2. Environment Variables section
3. Add `DATABASE_URL` from Neon
4. Make sure it's set for all environments (preview, development, production)
5. Redeploy after setting env vars

```
DATABASE_URL = postgresql://...
```

---

### Post-Deployment Verification

#### 1. Check Admin Pages Accessibility ✅ VERIFY

Test each URL returns 200 OK:

```bash
curl https://your-domain.com/admin/login        # Should return 200
curl https://your-domain.com/admin/dashboard    # Should return 200
curl https://your-domain.com/admin/profile      # Should return 200
curl https://your-domain.com/admin/settings     # Should return 200
curl https://your-domain.com/admin/categories   # Should return 200
curl https://your-domain.com/admin/projects     # Should return 200
curl https://your-domain.com/admin/skills       # Should return 200
curl https://your-domain.com/admin/services     # Should return 200
curl https://your-domain.com/admin/colors       # Should return 200
curl https://your-domain.com/admin/social       # Should return 200
curl https://your-domain.com/admin/clients      # Should return 200
curl https://your-domain.com/admin/about        # Should return 200
curl https://your-domain.com/admin/pages        # Should return 200
curl https://your-domain.com/admin/setup        # Should return 200
```

#### 2. Test Admin Login ✅ VERIFY

1. Navigate to `https://your-domain.com/admin/login`
2. Try logging in with credentials
3. Should redirect to `/admin/dashboard` on success

#### 3. Test Database Connectivity ✅ VERIFY

1. Go to `/admin/dashboard`
2. Check if page loads (means database connection works)
3. Look for any error messages

#### 4. Test CRUD Operations ✅ VERIFY

**Create:**
- Add a new color in `/admin/colors`
- Should appear in the list

**Read:**
- View the color you created
- Should display all fields correctly

**Update:**
- Edit the color
- Change name/code
- Save and verify changes appear

**Delete:**
- Delete the test color
- Should disappear from list

#### 5. Test Image Fallback ✅ VERIFY

1. Go to `/admin/profile`
2. Don't upload an avatar (leave default)
3. Check if default avatar appears (`/public/images/default-avatar.jpg`)

#### 6. Test Conditional Fields ✅ VERIFY

1. Go to `/admin/profile`
2. Set phone_number to "00"
3. Save
4. On homepage, phone should not display
5. Set it back to a real number
6. Phone should display again

#### 7. Check Logs ✅ VERIFY

In Vercel dashboard:
- Go to Deployments > Recent deploy
- Click "Runtime logs"
- Check for any errors
- Should show clean boot without DATABASE_URL errors

---

### Common Issues & Solutions

#### Issue: "DATABASE_URL not found"

**Solution:**
1. Verify DATABASE_URL is set in Vercel environment variables
2. Redeploy after setting env var
3. Check the DATABASE_URL is correct from Neon console

#### Issue: "Connection refused" to database

**Solution:**
1. Verify DATABASE_URL is correct
2. Check Neon project is not paused
3. Check Neon IP allowlist includes Vercel IPs
4. Test connection locally first

#### Issue: "Table does not exist" error

**Solution:**
1. Run migration script in Neon
2. Verify all tables created with correct schema
3. Check table names match exactly (lowercase, underscores)

#### Issue: Admin login not working

**Solution:**
1. Verify admins table exists
2. Check admin record exists in database
3. Verify password was hashed correctly
4. Check SESSION_SECRET env var if using cookie sessions

#### Issue: Images not loading, all showing defaults

**Solution:**
1. Check image URLs in database (should start with http:// or https://)
2. Verify /public/images/ directory has default images
3. Check image permissions are readable
4. Check CORS if using external CDN

#### Issue: Build fails with "Cannot find module"

**Solution:**
1. Run `npm install` to ensure all dependencies installed
2. Check package.json for missing dependencies
3. Run `npm run build` locally to debug
4. Check all imports are correct

---

### Monitoring & Maintenance

#### Regular Checks

1. **Weekly**:
   - Check Vercel logs for errors
   - Verify admin users can login
   - Test CRUD operations

2. **Monthly**:
   - Check database size in Neon console
   - Review and update content
   - Check for missing images

3. **Quarterly**:
   - Verify all pages visible and accessible
   - Check image quality
   - Review analytics

#### Backup Strategy

1. **Neon Automatic Backups**:
   - Neon keeps automated backups
   - Access via Neon console > Backups

2. **Manual Backups**:
   ```bash
   # Export database from Neon
   pg_dump postgresql://[connection-string] > backup.sql
   ```

3. **Archive Old Content**:
   - Regularly archive old projects/posts
   - Keep database lean

---

### Scaling Considerations

As your site grows:

1. **Database Optimization**:
   - Add indexes on frequently queried columns
   - Monitor query performance
   - Archive old records

2. **Image Optimization**:
   - Use image compression
   - Consider CDN for serving images
   - Lazy load images

3. **Cache Strategy**:
   - Enable ISR (Next.js built-in)
   - Cache homepage for 1 hour
   - Cache static content for longer

4. **Database Scaling**:
   - Neon auto-scales storage
   - Monitor connection limits
   - Consider read replicas if needed

---

### Rollback Plan

If deployment fails:

1. Check Vercel deployments page
2. Revert to previous working deployment
3. Fix issue locally
4. Test thoroughly
5. Redeploy

```bash
# Check deployment history
vercel deployments

# Promote previous deployment
vercel promote [DEPLOYMENT_ID]
```

---

### Security Checklist

- [ ] DATABASE_URL protected (not in source code)
- [ ] Admin passwords hashed (bcrypt)
- [ ] Sessions use secure cookies
- [ ] HTTPS enabled (Vercel default)
- [ ] No sensitive data in logs
- [ ] Admin email verified
- [ ] Rate limiting on login (if implemented)
- [ ] CORS configured properly
- [ ] SQL injection prevention (parameterized queries)
- [ ] XSS protection enabled

---

### Success Criteria

Deployment is successful when:

✅ All 14 admin pages load without errors
✅ Admin can login with valid credentials
✅ CRUD operations work (create/read/update/delete)
✅ Images display with fallbacks when missing
✅ Phone/location/calendly hidden when set to "00"
✅ Color system works across all pages
✅ Page visibility controls work
✅ Database queries run under 1 second
✅ No errors in Vercel runtime logs
✅ Build passes without warnings
✅ Preview deployment works
✅ Production deployment works

---

### Support Resources

- **Neon Documentation**: https://neon.tech/docs
- **Vercel Documentation**: https://vercel.com/docs
- **Next.js Documentation**: https://nextjs.org/docs
- **PostgreSQL Documentation**: https://www.postgresql.org/docs

---

**Deployment Date**: ________________
**Deployed By**: ________________
**Notes**: ________________
