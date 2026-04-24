# Quick Start Guide - Admin Dashboard

## 5-Minute Setup

### Step 1: Start Dev Server (1 min)

```bash
cd /vercel/share/v0-project
npm run dev
```

Open: http://localhost:3000/admin/login

### Step 2: Create Admin Account (1 min)

If no admin exists, you'll be prompted to create one:
- Email: your-email@example.com
- Password: strong-password

**Note**: In production, you need to set DATABASE_URL first!

### Step 3: Create Colors (1 min)

Go to: http://localhost:3000/admin/colors

Click "Add New Color":
1. Name: `Blue`
2. Code: `#0066CC`
3. Click "Add Color"

Add at least 2-3 colors (they're referenced everywhere).

### Step 4: Configure Your Profile (1 min)

Go to: http://localhost:3000/admin/profile

Fill in:
- Name: Your name
- Job Title 1: Your primary job title
- Email: Your email
- (Other fields optional)

Click "Save"

### Step 5: Add First Project (1 min)

Go to: http://localhost:3000/admin/projects

Click "Add New Project":
1. Title: "My First Project"
2. Description: "Project description"
3. Category: (Create one in categories first)
4. Click "Create Project"

**Done!** Your admin is now set up.

---

## Common Admin Tasks

### Add a New Project

1. Go to `/admin/projects`
2. Click "Add New Project"
3. Fill in:
   - **Title**: Project name
   - **Description**: Full description
   - **Hero Description**: Short card text
   - **Category**: Select from dropdown
   - **Project URL**: https://example.com
   - **Featured**: Toggle if it should show on homepage
   - **Image**: Upload project image
   - **Technologies**: Select tech stack
4. Click "Create Project"

### Edit Existing Project

1. Go to `/admin/projects`
2. Click edit icon on any project
3. Modify fields
4. Click "Update Project"

### Delete a Project

1. Go to `/admin/projects`
2. Click delete icon (trash)
3. Confirm deletion

### Add a Skill

1. Go to `/admin/skills`
2. Click "Add New Skill"
3. Fill in:
   - **Title**: Skill name
   - **Description**: What it is
   - **Category**: If applicable
   - **Color**: Visual color
   - **Icon**: Icon name
4. Click "Create Skill"

### Add a Service

1. Go to `/admin/services`
2. Click "Add New Service"
3. Fill in:
   - **Title**: Service name
   - **Description**: What you offer
   - **Icon**: Service icon
   - **Color**: Visual color
   - **Features**: Add feature list (click "+ Add Feature")
4. Click "Create Service"

### Add a Certification

1. Go to `/admin/about`
2. Go to "Certifications" section
3. Click "Add Certification"
4. Fill in:
   - **Title**: Certification name
   - **Issuer**: Organization that issued it
   - **Date**: When issued
   - **URL**: Link to credential
5. Click "Add"

### Add Work Experience

1. Go to `/admin/about`
2. Go to "Experience" section
3. Click "Add Experience"
4. Fill in:
   - **Job Title**: Your position
   - **Company**: Company name
   - **Start Date**: When you started
   - **End Date**: When you left (leave blank if current)
   - **Description**: Your achievements
5. Click "Add"

### Add Education

1. Go to `/admin/about`
2. Go to "Education" section
3. Click "Add Education"
4. Fill in:
   - **Title**: Degree type
   - **University**: School name
   - **Degree**: Degree level
   - **Start Date**: When you started
   - **End Date**: When you graduated
5. Click "Add"

### Add Statistics

1. Go to `/admin/about`
2. Go to "Stats" section
3. Click "Add Stat"
4. Fill in:
   - **Title**: Stat name (e.g., "Years of Experience")
   - **Value**: The number (e.g., "5")
   - **Icon**: Icon name
   - **Color**: Visual color
   - **Description**: What it means
5. Click "Add"

### Add Social Media Link

1. Go to `/admin/social`
2. Click "Add Social Link"
3. Fill in:
   - **Platform**: LinkedIn, GitHub, Twitter, etc.
   - **URL**: Your profile URL
   - **Color**: Visual color
4. Click "Add"

### Add a Client

1. Go to `/admin/clients`
2. Click "Add New Client"
3. Fill in:
   - **Name**: Client company name
   - **Website**: Company website
   - **Rating**: 1-5 stars
   - **Logo**: Company logo image
   - **Description**: Testimonial
4. Click "Create Client"

### Hide a Field (Set to "00")

Some fields hide when set to "00":
- **Phone Number**: Set to "00" to hide phone
- **Location**: Set to "00" to hide location
- **Calendly URL**: Set to "00" to hide booking button

Example:
1. Go to `/admin/profile`
2. Set "phone_number" to "00"
3. Click Save
4. Phone will no longer display on website

### Toggle Page Visibility

1. Go to `/admin/pages`
2. Toggle status for any page/section
3. Status = ON → Page visible
4. Status = OFF → Page hidden

Example: Hide "Services" section:
1. Find "services_page" in list
2. Click toggle to OFF
3. Services section no longer visible on website

### Configure Site Settings

1. Go to `/admin/settings`
2. Set:
   - **Admin Limit**: How many admins allowed
   - **Dashboard Status**: ON = website visible, OFF = maintenance mode
   - **Open to Work**: ON = show "I'm available", OFF = "Not available"
   - **Official Color**: Default color used throughout site
3. Click "Save"

---

## Field Reference Quick Guide

### Profile Fields
| Field | Purpose | Example |
|-------|---------|---------|
| Name | Your name | "Mohamed Hamdy" |
| Job Title 1 | Primary role | "Full Stack Developer" |
| Job Title 2 | Secondary role | "UI/UX Designer" |
| Email | Contact email | "email@example.com" |
| Phone | Contact phone (hide if "00") | "+20 1234567890" |
| Location | Your location (hide if "00") | "Cairo, Egypt" |
| Hero Description | Homepage subtitle | "I build amazing web apps" |
| Special Description | About page intro | "Passionate about..." |
| Quote | Featured quote | "Quality is..." |
| Resume URL | PDF link | "https://..." |
| Calendly URL | Booking link (hide if "00") | "https://calendly.com/..." |

### Project Fields
| Field | Purpose |
|-------|---------|
| Title | Project name |
| Slug | URL-friendly name (auto from title) |
| Description | Full project description |
| Hero Description | Card display text |
| Category | Which category it belongs to |
| Project URL | Link to live project |
| LinkedIn URL | LinkedIn post link |
| Featured | Show on homepage |
| Image | Project image (fallback: default-project.jpg) |
| Sort Order | Display order (1, 2, 3...) |

### Skill Fields
| Field | Purpose |
|-------|---------|
| Title | Skill name |
| Description | What it is |
| Category | Skill category |
| Color | Visual color from palette |
| Icon | Icon name |
| Sort Order | Display order |
| Status | Visible (true) or hidden (false) |

---

## Color System

All colors are managed in `/admin/colors`.

These colors are used by:
- Categories
- Projects
- Skills
- Services
- Social Media
- Stats
- Technologies

**Set Default Color**: In Settings, choose `official_color_id` (usually 1).

Example color palette:
1. Blue (#0066CC) - Primary
2. Red (#FF0000) - Alert
3. Green (#00CC00) - Success
4. Orange (#FFAA00) - Warning
5. Purple (#9900CC) - Secondary
6. Gray (#666666) - Neutral
7. Teal (#00CCCC) - Accent
8. Pink (#FF00CC) - Alternative

---

## Sort Order System

Most tables have a "Sort Order" field to control display order:

```
sort_order = 1  → Display first
sort_order = 2  → Display second
sort_order = 3  → Display third
...
```

This applies to:
- Categories
- Projects
- Skills
- Services
- Certifications
- Social Media
- Stats

**Tip**: Use multiples of 10 for easy reordering:
- 10, 20, 30, 40 → Easy to insert new items between

---

## Image Management

### Supported Image Types
- PNG (.png)
- JPG (.jpg, .jpeg)
- WebP (.webp)
- GIF (.gif)

### Image Fallbacks
If an image is missing or URL is invalid:
- **Avatar**: Falls back to `/public/images/default-avatar.jpg`
- **Project**: Falls back to `/public/images/default-project.jpg`
- **Client**: Falls back to `/public/images/default-client-logo.jpg`

### Setting to "00"
Some images automatically use fallback if:
- URL is literally "00"
- URL is empty
- URL is null

---

## Visibility Controls

### Status Field (Most Tables)
- **Status = true** → Item is visible
- **Status = false** → Item is hidden

### Page Status (Global)
Controls entire sections:
- homepage_page
- about_page
- projects_page
- skills_page
- services_page
- contact_page

### Dashboard Status (Settings)
- **On** → Website visible (normal)
- **Off** → Shows maintenance page

---

## Troubleshooting

### I can't login
- Make sure DATABASE_URL is set (in production)
- Check admin account exists in database
- Verify password is correct

### Images not showing
- Check image URL is valid
- Make sure image file exists
- Try uploading again
- Images fall back to defaults if missing

### Changes not appearing on website
- Changes require 1-hour cache refresh (ISR)
- Or manually revalidate in Vercel
- Hard refresh browser (Ctrl+Shift+R)

### "Cannot connect to database"
- Verify DATABASE_URL environment variable is set
- Check Neon project is not paused
- Test connection in Neon console
- Check Vercel logs for errors

### Sort order not working
- Make sure sort_order values are unique
- Use values like 10, 20, 30 (not duplicates)
- Reorder will fail if duplicates exist

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| Ctrl + S | Save form (if supported) |
| Escape | Close modal/form |
| Tab | Navigate form fields |
| Enter | Submit form |
| Ctrl + / | Focus search (if available) |

---

## Best Practices

1. **Backup**: Neon auto-backups (check console for restore)
2. **Validation**: All fields are validated before saving
3. **Order**: Use sort_order to control display
4. **Colors**: Keep colors consistent across site
5. **Images**: Optimize before uploading
6. **Descriptions**: Write clear, concise descriptions
7. **URLs**: Always include http:// or https://
8. **Dates**: Use YYYY-MM-DD format
9. **Status**: Hide old items instead of deleting
10. **Review**: Check changes in preview before publishing

---

## Support & Documentation

- **Data Structure**: See `/DATA_STRUCTURE_REFERENCE.md`
- **Field Mapping**: See `/ADMIN_PAGES_VERIFICATION.md`
- **Deployment**: See `/DEPLOYMENT_CHECKLIST.md`
- **Architecture**: See `/ARCHITECTURE.md`
- **Full Summary**: See `/IMPLEMENTATION_SUMMARY.md`

---

## What's Next?

After basic setup:

1. Add more projects and skills
2. Write detailed descriptions
3. Add quality images
4. Configure about section (education, experience)
5. Add statistics and achievements
6. Test all pages on website
7. Deploy to production
8. Add admin users if needed

---

**Everything is ready to use!** 🚀

Start with `/admin/login` and build from there.
