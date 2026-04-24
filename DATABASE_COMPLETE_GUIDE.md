# Complete Database Integration Guide

## Overview
This application is fully integrated with Neon PostgreSQL database. All data flows are bidirectional between the admin dashboard and the frontend website.

## Database Connection
- **Connection**: Neon PostgreSQL via `DATABASE_URL` environment variable
- **Location**: `/lib/db.ts` - Manages all database queries
- **Authentication**: Server Action Functions in `/app/actions/cms.ts`

## Data Flow Architecture

```
Admin Dashboard (UI)
       ↓
Admin Pages (/admin/*)
       ↓
CMS Functions (getXxx, createXxx, updateXxx, deleteXxx)
       ↓
Database Connection (/lib/db.ts)
       ↓
Neon PostgreSQL Database
       ↑
Frontend Components
       ↓
Public Website Pages
```

## Complete Database Schema

### 1. PROFILE TABLE
**Purpose**: Store user profile information displayed on website
**Fields**:
- id: Primary key
- name: Full name (displayed on hero and about)
- job_title_1: Primary job title
- job_title_2: Secondary job title  
- email: Contact email
- phone_number: Phone (hidden if "00")
- location: City/Country (hidden if "00")
- hero_description: Description shown on home page
- description: Full bio shown on About page
- special_description: First section on About page
- quote: Inspirational quote (max 150 chars)
- resume_url: Link to PDF resume
- calendly_url: Calendar scheduling link (hidden if "00")
- updated_at: Last modification timestamp

**Admin Access**: `/admin/profile`
**Frontend Display**: Home page hero, About page header, Header/Footer

### 2. SETTINGS TABLE
**Purpose**: Global website configuration
**Fields**:
- id: Primary key (always 1)
- admin_limit: Max number of admin users (default: 2)
- dashboard_status: Enable/disable admin dashboard (boolean)
- open_to_work: Show availability status (boolean)
- official_color_id: Default color theme
- notifications: Emergency notification message (JSONB)
- updated_at: Last modification timestamp

**Admin Access**: `/admin/settings`
**Usage**: Controls admin access, website status, global settings

### 3. COLORS TABLE
**Purpose**: Color palette system used throughout website
**Fields**:
- id: Primary key (1-8 recommended)
- name: Color name (e.g., "Blue", "Purple", "Green")
- code: Hex color code (e.g., "#FF0000")

**Admin Access**: `/admin/colors`
**Used By**: Projects, Skills, Services, Categories, Technologies, Social Media, Stats

### 4. PROFILE CONTENT TABLES

#### STATS TABLE
**Purpose**: Statistics displayed on home and about pages
**Fields**:
- id: Primary key
- title: Stat name (e.g., "Years Experience")
- value: Numeric value
- description: Additional details
- icon: Icon name (lucide-react)
- color_id: Color reference
- sort_order: Display order (UNIQUE)
- status: Show/hide (boolean)
- updated_at: Timestamp

**Admin Access**: `/admin/about` (Stats section)
**Frontend Display**: Home page stats section, About page

#### EDUCATION TABLE
**Purpose**: Educational background
**Fields**:
- id: Primary key
- title: Degree name (e.g., "Bachelor of Science")
- university: University name
- degree: Degree type (e.g., "BS", "MS", "PhD")
- start_date: Start date
- end_date: Graduation date
- status: Show/hide
- created_at, updated_at: Timestamps

**Admin Access**: `/admin/about` (Education section)
**Frontend Display**: About page

#### EXPERIENCE TABLE
**Purpose**: Work experience history
**Fields**:
- id: Primary key
- job_title: Job title
- company: Company name
- description: Job description
- start_date: Start date
- end_date: End date (NULL if current)
- logo: Company logo URL (uses fallback from /public/images/)
- status: Show/hide
- created_at, updated_at: Timestamps

**Admin Access**: `/admin/about` (Experience section)
**Frontend Display**: About page

#### CERTIFICATIONS TABLE
**Purpose**: Professional certifications and credentials
**Fields**:
- id: Primary key
- title: Certification name
- issuer: Issuing organization
- issuer_date: Date issued
- url: Certificate or verification link
- description: Additional notes
- status: Show/hide
- sort_order: Display order
- created_at, updated_at: Timestamps

**Admin Access**: `/admin/about` (Certifications section)
**Frontend Display**: About page

### 5. PROJECTS TABLE
**Purpose**: Portfolio projects showcase
**Fields**:
- id: Primary key
- title: Project name
- slug: URL-friendly name (UNIQUE)
- description: Full project description
- hero_description: Short description for card
- category_id: Category reference
- project_url: Live project link
- linkedin_url: LinkedIn post link
- project_date: Project completion date
- featured: Featured project flag
- sort_order: Display order (UNIQUE)
- image_url: Project screenshot/image
- presentation_url: Presentation/demo link
- created_at, updated_at: Timestamps

**Admin Access**: `/admin/projects`
**Frontend Display**: Home page featured projects, Projects page

**Related**: ENTITY_TECHNOLOGIES (link to technologies used)

### 6. TECHNOLOGIES TABLE
**Purpose**: Tech stack and tools library
**Fields**:
- id: Primary key
- name: Technology name (UNIQUE)
- slug: URL-friendly name (UNIQUE)
- icon: Icon name (lucide-react)
- color_id: Color reference
- created_at: Timestamp

**Admin Access**: Technologies managed within project edit
**Frontend Display**: Projects page (shows tech icons/colors)

**Linking**: Via ENTITY_TECHNOLOGIES table - many-to-many relationship with projects

### 7. ENTITY_TECHNOLOGIES TABLE
**Purpose**: Link projects with their technologies
**Fields**:
- id: Primary key
- entity_type: Always "project"
- entity_id: Project ID
- technology_id: Technology ID
- project_id: Project ID (for filtering)

**Constraint**: UNIQUE(entity_type, entity_id, technology_id)

### 8. CATEGORIES TABLE
**Purpose**: Project categorization
**Fields**:
- id: Primary key
- name: Category name (UNIQUE)
- slug: URL-friendly name (UNIQUE)
- description: Category description
- sort_order: Display order (UNIQUE)
- status: Show/hide
- color_id: Color reference
- created_at, updated_at: Timestamps

**Admin Access**: `/admin/categories`
**Frontend Display**: Projects page (filters and tags)

### 9. SERVICES TABLE
**Purpose**: Service offerings
**Fields**:
- id: Primary key
- title: Service name
- description: Full description
- icon: Icon name
- color_id: Color reference
- features: Array of feature descriptions (text[])
- status: Show/hide
- sort_order: Display order (UNIQUE)
- created_at, updated_at: Timestamps

**Admin Access**: `/admin/services`
**Frontend Display**: Home page services section, Services page

### 10. SKILLS TABLE
**Purpose**: Skills and expertise showcase
**Fields**:
- id: Primary key
- title: Skill name
- description: Skill details
- category_id: Category reference
- color_id: Color reference
- icon: Icon name
- status: Show/hide
- sort_order: Display order (UNIQUE)
- created_at, updated_at: Timestamps

**Admin Access**: `/admin/skills`
**Frontend Display**: Home page skills section, About page

### 11. SOCIAL_MEDIA TABLE
**Purpose**: Social media links and profiles
**Fields**:
- id: Primary key
- platform: Platform name (e.g., "LinkedIn", "GitHub")
- url: Profile URL
- color_id: Color reference
- sort_order: Display order (UNIQUE)
- updated_at: Timestamp

**Admin Access**: `/admin/social`
**Frontend Display**: Header, Footer, Social links sections

### 12. MEDIA TABLE
**Purpose**: Fallback images for missing assets
**Fields**:
- id: Primary key (always 1)
- logo: Site logo URL
- avatar: Profile avatar URL
- defaultProjectImage: Fallback project image
- defaultClientLogo: Fallback client logo

**Usage**: Image fallback system in `/lib/image-utils.ts`

### 13. PAGE_STATUS TABLE
**Purpose**: Control page visibility
**Fields**:
- id: Primary key
- key: Unique identifier (e.g., "about_page", "services_page")
- name: Display name
- status: Show/hide page (boolean)
- updated_at: Timestamp

**Admin Access**: `/admin/pages`
**Usage**: Toggle entire pages on/off

### 14. CLIENTS TABLE
**Purpose**: Client/testimonial information
**Fields**:
- id: Primary key
- name: Client name
- website: Client website URL
- rating: Rating (1-5)
- logo: Client logo URL (uses fallback)
- description: Testimonial/description
- status: Show/hide

**Admin Access**: `/admin/clients`
**Frontend Display**: About page or dedicated Clients section

### 15. ADMIN_SESSIONS TABLE
**Purpose**: Track active admin sessions
**Fields**:
- id: Primary key
- admin_id: Admin user ID
- token: Session token (UNIQUE)
- expires_at: Expiration timestamp
- created_at: Session creation timestamp

**Usage**: Session management in `/lib/auth.ts`

### 16. ADMINS TABLE
**Purpose**: Admin user accounts
**Fields**:
- id: Primary key
- email: Admin email (UNIQUE)
- password: Hashed password (bcrypt)
- created_at, updated_at: Timestamps

**Admin Access**: Created via setup page, max limit set in settings
**Usage**: Authentication for admin dashboard

## Admin Dashboard Navigation

The admin panel is accessible at `/admin` with full sidebar navigation:

```
Admin Dashboard
├── Dashboard (overview of stats)
├── Profile (edit profile information)
├── Projects (manage portfolio projects)
├── Skills (manage expertise areas)
├── Services (manage service offerings)
├── Categories (manage project categories)
├── Colors (manage color palette)
├── Clients (manage client information)
├── Social Media (manage social links)
├── About (manage stats, education, experience, certifications)
├── Pages (toggle page visibility)
└── Settings (site configuration)
```

## Data Display Logic

### Frontend Data Loading
All frontend pages use server components with automatic data fetching:

1. **Home Page** (`/app/page.tsx`)
   - Fetches: Profile, Services, Stats, Featured Projects, Skills
   - Displays hero, services, stats, featured projects

2. **About Page** (`/app/about/page.tsx`)
   - Fetches: Profile, Stats, Education, Experience, Certifications
   - Displays full biography and background

3. **Projects Page** (`/app/projects/page.tsx`)
   - Fetches: All projects, categories, technologies
   - Displays portfolio with filters

4. **Services Page** (`/app/services/page.tsx`)
   - Fetches: All services
   - Displays service offerings

5. **Contact Page** (`/app/contact/page.tsx`)
   - Fetches: Profile (for email/phone/location)
   - Displays contact form and info

## Image Fallback System

Located in `/lib/image-utils.ts`:

```javascript
getImageUrl(url, fallback) {
  // If URL missing or invalid, use fallback from /public/images/
  // Fallbacks:
  // - Profile images → /public/images/profile-fallback.jpg
  // - Project images → /public/images/project-default.jpg
  // - Client logos → /public/images/client-default.jpg
  // - Skills icons → Uses color coding system
}
```

## CMS Functions Reference

All database operations are in `/app/actions/cms.ts`:

### Read Operations (Get)
```typescript
getProfile()
getSettings()
getColors()
getCategories()
getProjects()
getSkills()
getServices()
getStats()
getSocialLinks()
getEducation()
getExperience()
getCertifications()
getClients()
getPageStatus()
getMedia()
```

### Write Operations (Create/Update/Delete)
```typescript
updateProfile(data)
updateSettings(data)
createCategory(data)
updateCategory(id, data)
deleteCategory(id)
// ... and similar for all entities
```

## Environment Variables

Required:
- `DATABASE_URL` - Neon PostgreSQL connection string

Optional but recommended:
- `NODE_ENV` - Set to "production" for deployment

## Deployment Checklist

1. **Database Setup**
   - Create Neon PostgreSQL project
   - Copy `DATABASE_URL` to Vercel environment variables
   - Ensure all tables exist (migration script in `/scripts/`)

2. **Admin Account**
   - Visit `/admin/setup` to create initial admin account
   - Limit number of admins in settings

3. **Initial Data**
   - Create at least one color in Colors page
   - Add profile information
   - Add categories for projects
   - Configure global settings

4. **Images**
   - Upload profile image to `/public/images/`
   - Ensure fallback images exist in `/public/images/`
   - Check all image URLs in database

5. **Publishing**
   - Deploy to Vercel
   - Test all admin pages
   - Verify data displays on frontend
   - Check image fallback system

## Troubleshooting

**Data not showing on frontend?**
1. Check database connection: `DATABASE_URL` environment variable
2. Verify data exists in database: Check via admin dashboard
3. Check status flags: Ensure items marked as active
4. Check page_status table: Ensure page is enabled
5. Check console logs: Look for database query errors

**Admin pages not loading?**
1. Verify admin authentication: Check session token
2. Check database connection: Run test query
3. Verify admin user exists: Check ADMINS table
4. Check permissions: Ensure admin account is not locked

**Images not displaying?**
1. Check image URL in database: Should be valid URL or path
2. Check fallback images: Should exist in `/public/images/`
3. Check image paths: May need to adjust for deployment environment
4. Use browser DevTools: Check network tab for 404 errors

## API Endpoints

All CMS operations use Server Actions (no REST API):
- Location: `/app/actions/cms.ts`
- Type: "use server" functions
- Security: CSRF protection built-in
- Authentication: Admin session verification
