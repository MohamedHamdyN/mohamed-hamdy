## Quick Data Structure Reference - Neon PostgreSQL Schema

### Profile Table
```typescript
interface Profile {
  id: number
  name: string
  job_title_1: string          // Primary job title
  job_title_2: string          // Secondary job title
  email: string
  phone_number: string         // Hidden if "00"
  location: string             // Hidden if "00"
  hero_description: string     // Shown under job titles on homepage
  description: string          // About page main description
  special_description: string  // About page opening description
  quote: string                // Featured quote (max 150 chars)
  resume_url: string           // URL to PDF/document
  calendly_url: string         // Hidden if "00"
  updated_at: Date
}
```

### Settings Table
```typescript
interface Settings {
  id: number
  admin_limit: number          // Max admins allowed (default: 2)
  dashboard_status: boolean    // If false, shows maintenance page
  open_to_work: boolean        // Hiring status indicator
  official_color_id: number    // Default color (FK to colors table)
  notifications: {             // JSONB - urgent messages
    message?: string
    type?: 'warning' | 'info' | 'success' | 'error'
    visible?: boolean
  }
  updated_at: Date
}
```

### Colors Table (Palette)
```typescript
interface Color {
  id: number
  name: string                 // "Blue", "Red", "Green", etc
  code: string                 // "#RRGGBB" hex code
}

// Used by: categories, projects, skills, services, social_media, stats
// Default color_id: 1
```

### Categories Table (Project Categories)
```typescript
interface Category {
  id: number
  name: string                 // Unique name
  slug: string                 // URL-friendly slug (unique)
  description: string
  sort_order: number           // Display order (unique)
  status: boolean              // Active/hidden
  color_id: number             // FK to colors
  created_at: Date
  updated_at: Date
}
```

### Projects Table
```typescript
interface Project {
  id: number
  title: string                // Project name
  slug: string                 // URL slug (unique)
  description: string          // Full description
  hero_description: string     // Short card description
  category_id: number          // FK to categories
  project_url: string          // Live project URL
  linkedin_url: string         // LinkedIn post URL
  project_date: Date           // When was it created
  featured: boolean            // Show on homepage
  sort_order: number           // Display order (unique)
  image_url: string            // Project image (fallback: /public/images/default-project.jpg)
  presentation_url: string     // PowerPoint/slides URL
  technologies: Technology[]   // Via entity_technologies
  created_at: Date
  updated_at: Date
}
```

### Technologies Table
```typescript
interface Technology {
  id: number
  name: string                 // "React", "TypeScript", "PostgreSQL", etc
  slug: string                 // URL slug (unique)
  icon: string                 // Icon name or SVG path
  color_id: number             // FK to colors
  created_at: Date
}
```

### Entity Technologies (Bridge Table)
```typescript
interface EntityTechnology {
  id: number
  entity_type: string          // Always "project"
  entity_id: number            // Project ID
  technology_id: number        // FK to technologies
  project_id: number           // FK to projects
  // Unique constraint: (entity_type, entity_id, technology_id)
}
```

### Skills Table
```typescript
interface Skill {
  id: number
  title: string                // Skill name (takes color)
  description: string
  category_id: number          // FK to categories
  color_id: number             // FK to colors
  icon: string                 // Icon name (takes color)
  status: boolean              // Visible/hidden
  sort_order: number           // Display order (unique)
  created_at: Date
  updated_at: Date
}
```

### Services Table
```typescript
interface Service {
  id: number
  title: string                // Service name
  description: string          // Service description
  icon: string                 // Icon name
  color_id: number             // FK to colors
  features: string[]           // Array of feature bullets
  status: boolean              // Visible/hidden
  sort_order: number           // Display order (unique)
  created_at: Date
  updated_at: Date
}
```

### Social Media Table
```typescript
interface SocialMedia {
  id: number
  platform: string             // "LinkedIn", "GitHub", "Twitter", etc
  url: string                  // Profile URL
  color_id: number             // FK to colors
  sort_order: number           // Display order (unique)
  updated_at: Date
}
```

### Clients Table
```typescript
interface Client {
  id: number
  name: string                 // Client company name
  website: string              // Company website URL
  rating: number               // 1-5 stars (default: 5)
  logo: string                 // Company logo (fallback: /public/images/default-client-logo.jpg)
  description: string          // Testimonial or description
  status: boolean              // Visible/hidden
}
```

### Education Table
```typescript
interface Education {
  id: number
  title: string                // Degree/qualification name
  university: string           // School/university name
  degree: string               // "Bachelor", "Master", "Diploma", etc
  start_date: Date             // When studies started
  end_date: Date               // When studies ended
  status: boolean              // Visible/hidden
  created_at: Date
  updated_at: Date
}
```

### Experience Table
```typescript
interface Experience {
  id: number
  job_title: string            // Position/title
  company: string              // Company name
  description: string          // Job description/achievements
  start_date: Date             // Employment start date
  end_date: Date               // Employment end date (null if current)
  logo: string                 // Company logo
  status: boolean              // Visible/hidden
  created_at: Date
  updated_at: Date
}
```

### Certifications Table
```typescript
interface Certification {
  id: number
  title: string                // Certification name
  issuer: string               // Issuing organization
  issuer_date: Date            // When issued
  url: string                  // Credential URL
  description: string          // Details/notes
  status: boolean              // Visible/hidden
  sort_order: number           // Display order (unique)
  created_at: Date
  updated_at: Date
}
```

### Page Status Table (Visibility Control)
```typescript
interface PageStatus {
  id: number
  key: string                  // "home_page", "about_page", "projects_page", etc (unique)
  name: string                 // Display name
  status: boolean              // Visible on website (default: true)
  updated_at: Date
}

// Common keys:
// - "home_page" - Homepage visibility
// - "about_page" - About page visibility
// - "projects_page" - Projects page visibility
// - "skills_page" - Skills section visibility
// - "services_page" - Services page visibility
// - "contact_page" - Contact page visibility
// - "stats_section" - Stats display
// - "social_section" - Social media links visibility
```

### Admins Table (Auth)
```typescript
interface Admin {
  id: number
  email: string                // Unique email
  password: string             // Hashed password
  created_at: Date
  updated_at: Date
}
```

### Admin Sessions Table (Auth)
```typescript
interface AdminSession {
  id: number
  admin_id: number             // FK to admins
  token: string                // Session token (unique)
  expires_at: Date             // Session expiration
  created_at: Date
}
```

### Media Table (Image Defaults)
```typescript
interface Media {
  id: number
  logo: string                 // Site logo
  avatar: string               // Default avatar
  defaultProjectImage: string  // Project placeholder
  defaultClientLogo: string    // Client logo placeholder
}
```

---

## Image Fallback Logic

**Function**: `getImageUrl(url: string, type: 'avatar' | 'project' | 'client'): string`

```typescript
// Returns fallback if:
// 1. URL is "00" (literal string)
// 2. URL is null/undefined
// 3. URL is empty string

// Fallbacks:
{
  avatar: '/public/images/default-avatar.jpg',
  project: '/public/images/default-project.jpg',
  client: '/public/images/default-client-logo.jpg',
}
```

---

## Conditional Visibility Rules

**Profile Fields** (Hidden if value === "00"):
- `phone_number` - Not displayed
- `location` - Not displayed
- `calendly_url` - Link not shown

**Booking Links** (Hidden if value === "00"):
- `calendly_url` - Don't show booking button

**Pages/Sections** (Controlled by page_status table):
- Check `dashboard_status` in settings
  - If `false`, show maintenance page
  - If `true`, show website normally

---

## Sort Order Rules

Fields with UNIQUE sort_order constraint:
- `categories.sort_order`
- `projects.sort_order`
- `skills.sort_order`
- `services.sort_order`
- `social_media.sort_order`
- `certifications.sort_order`
- `stats.sort_order`

Use these to control display order in UI.

---

## Status/Visibility Patterns

Most tables have a `status` boolean field:
- `status = true` → Visible on website
- `status = false` → Hidden from website

Exception: `dashboard_status` in settings controls entire site.

---

## Data Relationships

```
profile (1) ──┐
              │
settings (1) ──┼── colors (many)
              │
categories ───┤
projects ─────┤
skills ───────┤
services ─────┤
social_media ─┤
stats ────────┘

projects (many) ──── entity_technologies ──── technologies (many)

admin (1) ──── admin_sessions (many)
```

---

## Important Constraints

1. **UNIQUE Fields**:
   - email (admins)
   - name (categories)
   - slug (categories, projects, technologies)
   - token (admin_sessions)
   - key (page_status)
   - sort_order (categories, projects, skills, services, social_media, certifications, stats)

2. **NOT NULL Fields**:
   - name (categories)
   - slug (categories, projects, technologies)
   - title (projects, skills)
   - job_title (experience)
   - company (experience)
   - start_date (education, experience)
   - category_id (projects)
   - platform (social_media)

3. **DEFAULT VALUES**:
   - admin_limit: 2
   - dashboard_status: true
   - open_to_work: true
   - official_color_id: 1
   - featured (projects): false
   - status (most tables): true
   - rating (clients): 5

---

## API Functions Available

All functions in `/app/actions/cms.ts`:

**Profile**: getProfile, updateProfile
**Settings**: getSettings, updateSettings
**Colors**: getColors, createColor, updateColor, deleteColor
**Categories**: getCategories, createCategory, updateCategory, deleteCategory
**Projects**: getProjects, createProject, updateProject, deleteProject, linkProjectTechnologies
**Technologies**: getTechnologies, createTechnology, updateTechnology, deleteTechnology
**Skills**: getSkills, createSkill, updateSkill, deleteSkill
**Services**: getServices, createService, updateService, deleteService
**Social Media**: getSocialLinks, createSocialLink, updateSocialLink, deleteSocialLink
**Stats**: getStats, createStat, updateStat, deleteStat
**Education**: getEducation, createEducation, updateEducation, deleteEducation
**Experience**: getExperience, createExperience, updateExperience, deleteExperience
**Certifications**: getCertifications, createCertification, updateCertification, deleteCertification
**Page Status**: getPageStatus, updatePageStatus
**Clients**: getClients, createClient, updateClient, deleteClient
**Admins**: createAdmin, deleteAdmin, getAdminsCount
**Auth**: loginAdmin, logoutAdmin, getAdminFromSession

---

## Example Usage

```typescript
// Get profile with fallback avatar
const profile = await getProfile()
const avatarUrl = getImageUrl(profile.avatar, 'avatar')

// Get featured projects with their technologies
const projects = await getProjects()
const featured = projects.filter(p => p.featured)

// Get visible skills grouped by category
const skills = await getSkills()
const visibleSkills = skills.filter(s => s.status)

// Check if about page is visible
const pageStatus = await getPageStatus()
const aboutVisible = pageStatus.find(p => p.key === 'about_page')?.status
```
