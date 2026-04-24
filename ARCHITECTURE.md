# System Architecture - Neon PostgreSQL Integration

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (Next.js)                        │
│  ┌──────────────┬──────────────┬──────────────┬─────────────┐   │
│  │   Homepage   │  About Page  │ Projects    │  Services   │   │
│  │              │  Skills Page │ Page        │  Contact    │   │
│  └──────────────┴──────────────┴──────────────┴─────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                     ADMIN DASHBOARD (14 Pages)                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐   │
│  │ Dashboard│  │ Profile  │  │Settings  │  │Categories   │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────────┘   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐   │
│  │ Projects │  │ Skills   │  │Services  │  │Colors        │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────────┘   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐   │
│  │ Social   │  │ Clients  │  │About     │  │Pages (Vis.)  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────────┘   │
│  ┌──────────┐  ┌──────────┐                                      │
│  │ Setup    │  │ Login    │                                      │
│  └──────────┘  └──────────┘                                      │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    CMS LAYER (cms.ts)                            │
│              Server Actions - Database Operations                │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ getProfile() | updateProfile() | getSettings() | etc.     │ │
│  │ 50+ functions covering all 17 database tables             │ │
│  │ Error handling | Image fallbacks | ISR revalidation       │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                 DATABASE LAYER (Neon PostgreSQL)                │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    17 Tables                             │  │
│  │                                                          │  │
│  │  Core Tables:                                           │  │
│  │  • profile          • settings        • colors          │  │
│  │  • media            • page_status                       │  │
│  │                                                          │  │
│  │  Content Tables:                                        │  │
│  │  • categories       • projects        • skills          │  │
│  │  • services         • technologies    • social_media    │  │
│  │  • clients                                              │  │
│  │                                                          │  │
│  │  Personal Tables:                                       │  │
│  │  • stats            • education       • experience      │  │
│  │  • certifications                                       │  │
│  │                                                          │  │
│  │  Relationship Tables:                                   │  │
│  │  • entity_technologies  (projects ↔ technologies)       │  │
│  │                                                          │  │
│  │  Auth Tables:                                           │  │
│  │  • admins           • admin_sessions                    │  │
│  │                                                          │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Data Flow Diagram

### Write Operation (Admin Creating/Updating Data)

```
Admin Panel Input Form
        ↓
Form Submission (POST)
        ↓
Server Action (cms.ts)
        ├─ Validate input
        ├─ Hash passwords if needed
        ├─ Handle arrays/special types
        ↓
Database Query (Parameterized)
        ├─ INSERT / UPDATE / DELETE
        ├─ Handle constraints
        ├─ Transaction management
        ↓
Response + ISR Revalidation
        ├─ Revalidate affected routes
        ├─ Clear Next.js cache
        ↓
UI Update
        └─ Show success/error message
```

### Read Operation (Frontend Displaying Data)

```
Frontend Page Request
        ↓
Next.js Server Component
        ├─ Call CMS function
        ├─ cms.ts → Database query
        ├─ Handle errors gracefully
        ↓
Image Fallback Processing
        ├─ Check if URL is valid
        ├─ If "00" or missing → use /public/images/
        ↓
Conditional Rendering
        ├─ Check status field (visible/hidden)
        ├─ Check page_status (page visibility)
        ├─ Hide phone if "00", location if "00", etc.
        ↓
HTML Response (with ISR cache)
        ├─ Cache for specified TTL
        ├─ Revalidate on data change
        ↓
Browser Rendering
        └─ Display to user
```

---

## Table Relationships

```
┌────────────────────────────────────────────────────────────┐
│                      COLORS (Palette)                       │
│  id (PK) | name | code                                      │
│  ─────────────────────────────────────────────────────────  │
│  Referenced by:                                             │
│  • categories.color_id                                      │
│  • projects.color_id (optional)                             │
│  • skills.color_id                                          │
│  • services.color_id                                        │
│  • social_media.color_id                                    │
│  • stats.color_id                                           │
│  • technologies.color_id                                    │
│  • settings.official_color_id                               │
└────────────────────────────────────────────────────────────┘
         ↑         ↑         ↑         ↑         ↑
         │         │         │         │         │
   ┌─────┴────┬────┴─────┬────┴────┬────┴────┬────┴──────┐
   │           │          │         │         │            │
┌──┴───┐  ┌────┴────┐ ┌───┴───┐ ┌──┴────┐ ┌─┴────┐ ┌──────┴───┐
│STATS │  │CATEGORIES│ │SKILLS │ │SERVICES│ │SOCIAL│ │TECHNOLOGIES│
│─────│  │─────────│ │───────│ │────────│ │──────│ │──────────│
│id   │  │id       │ │id     │ │id      │ │id    │ │id        │
│title│  │name ────┼─┤title  │ │title   │ │plat. │ │name ─────┼┐
│value│  │slug     │ │desc   │ │desc    │ │url   │ │slug      ││
│desc │  │color_id ├─┤cat_id ├─┤icon    │ │color│ │icon      ││
│icon │  │sort_ord │ │color_│ │color_id│ │sort │ │color_id ├┘
│color├──│status   │ │icon   │ │features│ │stat │ │created_at│
│sort │  │created_at │status  │ │status  │ │upd  │ │          │
│stat │  │updated_at │sort_ord│ │sort_ord│ │    │ └──────────┘
│upd  │  │          │ │upd    │ │created │ │    │
└─────┘  └──────────┘ └───────┘ └────────┘ └────┘
                                                    
                      ┌─────────────────────┐
                      │ PROJECTS            │
                      │─────────────────────│
                      │id                   │
                      │title                │
                      │slug                 │
                      │description          │
                      │category_id ─────────┼──→ CATEGORIES
                      │image_url            │
                      │featured             │
                      │sort_order           │
                      │created_at           │
                      │updated_at           │
                      └─────────────────────┘
                              │
                              │ (many-to-many)
                              ↓
                      ┌─────────────────────┐
                      │ ENTITY_TECHNOLOGIES │
                      │─────────────────────│
                      │id                   │
                      │entity_type          │
                      │entity_id            │
                      │technology_id ──────→ TECHNOLOGIES
                      │project_id ─────────→ PROJECTS
                      └─────────────────────┘
```

---

## Admin Authentication Flow

```
Admin Access Request
        ↓
Check /admin/login
        ├─ Not authenticated? → Show login form
        │
        └─ Submit credentials (POST)
                ↓
        Call loginAdmin(email, password)
                ├─ Hash provided password
                ├─ Compare with stored hash
                ├─ If match:
                │   ├─ Generate session token
                │   ├─ Store in admin_sessions
                │   ├─ Set secure cookie
                │   └─ Redirect to dashboard
                │
                └─ If no match:
                    └─ Show error message
                    
Admin Authenticated
        ├─ Cookie validated on each request
        ├─ Session checked against admin_sessions
        ├─ Redirect to /admin/login if expired
        │
        └─ Access granted to admin pages
```

---

## Image Fallback System

```
Image URL Provided in Database
        ↓
getImageUrl(url, type)
        │
        ├─ Is URL null/undefined/empty?
        │   └─ YES → Use default
        │
        ├─ Is URL === "00"?
        │   └─ YES → Use default
        │
        └─ Is URL valid?
                ├─ YES → Use provided URL
                └─ NO → Use default
                
Default Images (/public/images/):
├─ avatar: default-avatar.jpg
├─ project: default-project.jpg
└─ client: default-client-logo.jpg
```

---

## Database Schema Layers

### Layer 1: Core Configuration
```
profile       (user personal info)
settings      (site-wide settings)
colors        (color palette)
media         (media defaults)
page_status   (visibility control)
```

### Layer 2: Content Management
```
categories    (project categories)
projects      (project records)
skills        (skills showcase)
services      (service offerings)
social_media  (social links)
clients       (client info)
```

### Layer 3: Personal History
```
stats         (statistics/achievements)
education     (education records)
experience    (work experience)
certifications (professional certs)
```

### Layer 4: Relationships & Auth
```
technologies       (tech stack reference)
entity_technologies (project-tech mapping)
admins            (admin accounts)
admin_sessions    (session management)
```

---

## ISR Cache Strategy

```
Homepage
├─ Revalidate on: profile, settings, stats, projects, skills, services
├─ Cache duration: 1 hour
└─ Trigger: updateProfile(), updateSettings(), createProject(), etc.

Projects Page
├─ Revalidate on: projects, categories, technologies
├─ Cache duration: 1 hour
└─ Trigger: createProject(), updateProject(), deleteProject()

Skills Section
├─ Revalidate on: skills, stats
├─ Cache duration: 1 hour
└─ Trigger: createSkill(), updateSkill()

About Page
├─ Revalidate on: education, experience, certifications, stats
├─ Cache duration: 1 hour
└─ Trigger: createEducation(), updateExperience()
```

---

## API Endpoints (Server Actions)

### Profile Management
```
GET  /actions/cms?action=getProfile
PUT  /actions/cms?action=updateProfile
```

### Settings Management
```
GET  /actions/cms?action=getSettings
PUT  /actions/cms?action=updateSettings
```

### Content Management
```
GET  /actions/cms?action=getCategories     | POST with createCategory()
GET  /actions/cms?action=getProjects       | POST with createProject()
GET  /actions/cms?action=getSkills         | POST with createSkill()
GET  /actions/cms?action=getServices       | POST with createService()
GET  /actions/cms?action=getSocialLinks    | POST with createSocialLink()
GET  /actions/cms?action=getClients        | POST with createClient()
GET  /actions/cms?action=getColors         | POST with createColor()
```

### Personal History
```
GET  /actions/cms?action=getStats          | POST with createStat()
GET  /actions/cms?action=getEducation      | POST with createEducation()
GET  /actions/cms?action=getExperience     | POST with createExperience()
GET  /actions/cms?action=getCertifications | POST with createCertification()
```

### Page Management
```
GET  /actions/cms?action=getPageStatus
PUT  /actions/cms?action=updatePageStatus
```

---

## Deployment Architecture

```
GitHub Repository
        ↓
Push to Main/Feature Branch
        ↓
Vercel CI/CD Pipeline
        ├─ Install dependencies
        ├─ Run build (npm run build)
        ├─ Set environment variables
        ├─ Deploy to Edge Network
        └─ Distribute globally
        
Runtime Environment
        ├─ Vercel Functions
        │   └─ Server Actions (cms.ts)
        │
        ├─ Neon Database Connection
        │   └─ DATABASE_URL from env vars
        │
        ├─ Next.js Cache
        │   ├─ ISR revalidation
        │   ├─ On-demand revalidation
        │   └─ Static generation
        │
        └─ Image Optimization
            ├─ Next.js Image component
            ├─ Fallback to /public/images/
            └─ Automatic sizing
```

---

## Security Boundaries

```
┌────────────────────────────────────────────────────┐
│                    Public Routes                    │
│  /                                                  │
│  /about                                             │
│  /projects                                          │
│  /skills                                            │
│  /services                                          │
│  /contact                                           │
│  (No authentication required)                       │
└────────────────────────────────────────────────────┘
                        ↑
                   [Firewall]
                        ↓
┌────────────────────────────────────────────────────┐
│                  Protected Routes                   │
│  /admin/*                                           │
│  (Requires admin session token)                     │
│                                                    │
│  ┌───────────────────────────────────────────────┐ │
│  │      Database Operations (Server Actions)     │ │
│  │  • Parameter validation                       │ │
│  │  • Parameterized queries (SQL injection safe) │ │
│  │  • Password hashing (bcrypt)                  │ │
│  │  • Session token verification                 │ │
│  │  • Error handling (no data leaks)             │ │
│  └───────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────┘
                        ↓
┌────────────────────────────────────────────────────┐
│           Neon PostgreSQL Database                 │
│  • Row-level security (optional)                   │
│  • Connection pooling                              │
│  • Encrypted in transit (SSL/TLS)                  │
│  • Automated backups                               │
│  • Access logs                                     │
└────────────────────────────────────────────────────┘
```

---

## File Organization

```
/vercel/share/v0-project/
│
├── /app
│   ├── /actions
│   │   ├── cms.ts                    ← Core CMS layer (1,328 lines)
│   │   └── auth.ts                   ← Authentication functions
│   │
│   ├── /admin
│   │   ├── /dashboard
│   │   │   └── page.tsx
│   │   ├── /profile
│   │   │   └── page.tsx
│   │   ├── /settings
│   │   │   └── page.tsx
│   │   ├── /categories
│   │   │   └── page.tsx
│   │   ├── /projects
│   │   │   └── page.tsx
│   │   ├── /skills
│   │   │   └── page.tsx
│   │   ├── /services
│   │   │   └── page.tsx
│   │   ├── /colors
│   │   │   └── page.tsx
│   │   ├── /social
│   │   │   └── page.tsx
│   │   ├── /clients
│   │   │   └── page.tsx
│   │   ├── /about
│   │   │   └── page.tsx
│   │   ├── /pages
│   │   │   └── page.tsx
│   │   ├── /setup
│   │   │   └── page.tsx
│   │   └── /login
│   │       └── page.tsx
│   │
│   ├── /api
│   │   └── ... (API routes if any)
│   │
│   ├── layout.tsx                    ← Root layout with error handling
│   └── page.tsx                      ← Homepage
│
├── /lib
│   ├── db.ts                         ← Database connection
│   ├── auth.ts                       ← Auth utilities
│   ├── image-utils.ts                ← Image fallback system
│   └── ... (other utilities)
│
├── /public
│   ├── /images
│   │   ├── default-avatar.jpg
│   │   ├── default-project.jpg
│   │   └── default-client-logo.jpg
│   └── ... (other assets)
│
├── /scripts
│   ├── 200-migrate-to-new-schema.sql ← Database migration
│   └── ... (other scripts)
│
├── IMPLEMENTATION_SUMMARY.md         ← What was built
├── ADMIN_PAGES_VERIFICATION.md      ← Field verification
├── DATA_STRUCTURE_REFERENCE.md      ← Quick reference
├── DEPLOYMENT_CHECKLIST.md          ← How to deploy
├── ARCHITECTURE.md                  ← This file
└── PROJECT_COMPLETE.md              ← Overall status
```

---

This architecture ensures:
- ✅ Scalability (ISR caching, efficient queries)
- ✅ Security (parameterized queries, password hashing, session auth)
- ✅ Maintainability (clear separation of concerns)
- ✅ Reliability (error handling, fallbacks, validation)
- ✅ Performance (caching, optimization, lazy loading)
