'use server'

import { sql } from '@neondatabase/serverless'
import { getAdminFromSession } from '@/lib/auth'
import { Profile, Skill, Project, Service, Client, SocialLink, SiteSettings } from '@/lib/db'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set')
}

// Helper function to check admin auth
async function requireAdmin() {
  const admin = await getAdminFromSession()
  if (!admin) {
    throw new Error('Unauthorized')
  }
  return admin
}

// Generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

// ============= PROFILE CRUD =============

export async function getProfile(): Promise<Profile | null> {
  try {
    const result = await sql`
      SELECT * FROM profiles LIMIT 1
    `
    return result.rows[0] as Profile | undefined || null
  } catch (error) {
    console.error('Error getting profile:', error)
    return null
  }
}

export async function updateProfile(data: Partial<Profile>) {
  try {
    await requireAdmin()

    const result = await sql`
      UPDATE profiles 
      SET 
        name = COALESCE(${data.name}, name),
        title = COALESCE(${data.title}, title),
        email = COALESCE(${data.email}, email),
        bio = COALESCE(${data.bio}, bio),
        avatar_url = COALESCE(${data.avatar_url}, avatar_url),
        resume_url = COALESCE(${data.resume_url}, resume_url),
        calendly_url = COALESCE(${data.calendly_url}, calendly_url),
        location = COALESCE(${data.location}, location),
        phone = COALESCE(${data.phone}, phone),
        updated_at = NOW()
      WHERE id = (SELECT id FROM profiles LIMIT 1)
      RETURNING *
    `

    return { success: true, data: result.rows[0] }
  } catch (error) {
    console.error('Error updating profile:', error)
    return { error: 'Failed to update profile' }
  }
}

// ============= SKILLS CRUD =============

export async function getSkills(): Promise<Skill[]> {
  try {
    const result = await sql`
      SELECT * FROM skills ORDER BY "order" ASC
    `
    return result.rows as Skill[]
  } catch (error) {
    console.error('Error getting skills:', error)
    return []
  }
}

export async function createSkill(data: Omit<Skill, 'id' | 'created_at' | 'updated_at'>) {
  try {
    await requireAdmin()

    const result = await sql`
      INSERT INTO skills (name, description, icon, color, enabled, "order")
      VALUES (${data.name}, ${data.description}, ${data.icon}, ${data.color}, ${data.enabled}, ${data.order})
      RETURNING *
    `

    return { success: true, data: result.rows[0] }
  } catch (error) {
    console.error('Error creating skill:', error)
    return { error: 'Failed to create skill' }
  }
}

export async function updateSkill(id: number, data: Partial<Skill>) {
  try {
    await requireAdmin()

    const result = await sql`
      UPDATE skills 
      SET 
        name = COALESCE(${data.name}, name),
        description = COALESCE(${data.description}, description),
        icon = COALESCE(${data.icon}, icon),
        color = COALESCE(${data.color}, color),
        enabled = COALESCE(${data.enabled}, enabled),
        "order" = COALESCE(${data.order}, "order"),
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `

    return { success: true, data: result.rows[0] }
  } catch (error) {
    console.error('Error updating skill:', error)
    return { error: 'Failed to update skill' }
  }
}

export async function deleteSkill(id: number) {
  try {
    await requireAdmin()

    await sql`
      DELETE FROM skills WHERE id = ${id}
    `

    return { success: true }
  } catch (error) {
    console.error('Error deleting skill:', error)
    return { error: 'Failed to delete skill' }
  }
}

// ============= PROJECTS CRUD =============

export async function getProjects(includeDraft = false): Promise<Project[]> {
  try {
    let query = sql`SELECT * FROM projects`

    if (!includeDraft) {
      query = sql`SELECT * FROM projects WHERE draft = false`
    }

    query = sql`${query} ORDER BY "order" DESC, date DESC`
    const result = await query

    return result.rows as Project[]
  } catch (error) {
    console.error('Error getting projects:', error)
    return []
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const result = await sql`
      SELECT * FROM projects WHERE slug = ${slug} LIMIT 1
    `
    return result.rows[0] as Project | undefined || null
  } catch (error) {
    console.error('Error getting project:', error)
    return null
  }
}

export async function createProject(data: Omit<Project, 'id' | 'slug' | 'created_at' | 'updated_at' | 'order'>) {
  try {
    await requireAdmin()

    const slug = generateSlug(data.title)

    // Check slug uniqueness
    const existing = await sql`
      SELECT id FROM projects WHERE slug = ${slug} LIMIT 1
    `

    if (existing.rows.length > 0) {
      return { error: 'A project with this title already exists' }
    }

    const result = await sql`
      INSERT INTO projects (title, slug, description, short_description, category_id, image_url, project_url, linkedin_url, technologies, date, featured, draft, "order")
      VALUES (${data.title}, ${slug}, ${data.description}, ${data.short_description}, ${data.category_id}, ${data.image_url}, ${data.project_url}, ${data.linkedin_url}, ${JSON.stringify(data.technologies)}, ${data.date}, ${data.featured}, ${data.draft}, 0)
      RETURNING *
    `

    return { success: true, data: result.rows[0] }
  } catch (error) {
    console.error('Error creating project:', error)
    return { error: 'Failed to create project' }
  }
}

export async function updateProject(id: number, data: Partial<Project>) {
  try {
    await requireAdmin()

    const result = await sql`
      UPDATE projects 
      SET 
        title = COALESCE(${data.title}, title),
        description = COALESCE(${data.description}, description),
        short_description = COALESCE(${data.short_description}, short_description),
        category_id = COALESCE(${data.category_id}, category_id),
        image_url = COALESCE(${data.image_url}, image_url),
        project_url = COALESCE(${data.project_url}, project_url),
        linkedin_url = COALESCE(${data.linkedin_url}, linkedin_url),
        technologies = COALESCE(${data.technologies ? JSON.stringify(data.technologies) : null}, technologies),
        date = COALESCE(${data.date}, date),
        featured = COALESCE(${data.featured}, featured),
        draft = COALESCE(${data.draft}, draft),
        "order" = COALESCE(${data.order}, "order"),
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `

    return { success: true, data: result.rows[0] }
  } catch (error) {
    console.error('Error updating project:', error)
    return { error: 'Failed to update project' }
  }
}

export async function deleteProject(id: number) {
  try {
    await requireAdmin()

    await sql`
      DELETE FROM projects WHERE id = ${id}
    `

    return { success: true }
  } catch (error) {
    console.error('Error deleting project:', error)
    return { error: 'Failed to delete project' }
  }
}

// ============= SERVICES CRUD =============

export async function getServices(): Promise<Service[]> {
  try {
    const result = await sql`
      SELECT * FROM services ORDER BY "order" ASC
    `
    return result.rows as Service[]
  } catch (error) {
    console.error('Error getting services:', error)
    return []
  }
}

export async function createService(data: Omit<Service, 'id' | 'created_at' | 'updated_at'>) {
  try {
    await requireAdmin()

    const result = await sql`
      INSERT INTO services (title, description, icon, color, features, enabled, "order")
      VALUES (${data.title}, ${data.description}, ${data.icon}, ${data.color}, ${JSON.stringify(data.features)}, ${data.enabled}, ${data.order})
      RETURNING *
    `

    return { success: true, data: result.rows[0] }
  } catch (error) {
    console.error('Error creating service:', error)
    return { error: 'Failed to create service' }
  }
}

export async function updateService(id: number, data: Partial<Service>) {
  try {
    await requireAdmin()

    const result = await sql`
      UPDATE services 
      SET 
        title = COALESCE(${data.title}, title),
        description = COALESCE(${data.description}, description),
        icon = COALESCE(${data.icon}, icon),
        color = COALESCE(${data.color}, color),
        features = COALESCE(${data.features ? JSON.stringify(data.features) : null}, features),
        enabled = COALESCE(${data.enabled}, enabled),
        "order" = COALESCE(${data.order}, "order"),
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `

    return { success: true, data: result.rows[0] }
  } catch (error) {
    console.error('Error updating service:', error)
    return { error: 'Failed to update service' }
  }
}

export async function deleteService(id: number) {
  try {
    await requireAdmin()

    await sql`
      DELETE FROM services WHERE id = ${id}
    `

    return { success: true }
  } catch (error) {
    console.error('Error deleting service:', error)
    return { error: 'Failed to delete service' }
  }
}

// ============= CLIENTS CRUD =============

export async function getClients(): Promise<Client[]> {
  try {
    const result = await sql`
      SELECT * FROM clients ORDER BY "order" ASC
    `
    return result.rows as Client[]
  } catch (error) {
    console.error('Error getting clients:', error)
    return []
  }
}

export async function createClient(data: Omit<Client, 'id' | 'created_at' | 'updated_at'>) {
  try {
    await requireAdmin()

    const result = await sql`
      INSERT INTO clients (name, logo_url, testimonial, rating, website, enabled, "order")
      VALUES (${data.name}, ${data.logo_url}, ${data.testimonial}, ${data.rating}, ${data.website}, ${data.enabled}, ${data.order})
      RETURNING *
    `

    return { success: true, data: result.rows[0] }
  } catch (error) {
    console.error('Error creating client:', error)
    return { error: 'Failed to create client' }
  }
}

export async function updateClient(id: number, data: Partial<Client>) {
  try {
    await requireAdmin()

    const result = await sql`
      UPDATE clients 
      SET 
        name = COALESCE(${data.name}, name),
        logo_url = COALESCE(${data.logo_url}, logo_url),
        testimonial = COALESCE(${data.testimonial}, testimonial),
        rating = COALESCE(${data.rating}, rating),
        website = COALESCE(${data.website}, website),
        enabled = COALESCE(${data.enabled}, enabled),
        "order" = COALESCE(${data.order}, "order"),
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `

    return { success: true, data: result.rows[0] }
  } catch (error) {
    console.error('Error updating client:', error)
    return { error: 'Failed to update client' }
  }
}

export async function deleteClient(id: number) {
  try {
    await requireAdmin()

    await sql`
      DELETE FROM clients WHERE id = ${id}
    `

    return { success: true }
  } catch (error) {
    console.error('Error deleting client:', error)
    return { error: 'Failed to delete client' }
  }
}

// ============= SOCIAL LINKS CRUD =============

export async function getSocialLinks(): Promise<SocialLink[]> {
  try {
    const result = await sql`
      SELECT * FROM social_links ORDER BY "order" ASC
    `
    return result.rows as SocialLink[]
  } catch (error) {
    console.error('Error getting social links:', error)
    return []
  }
}

export async function createSocialLink(data: Omit<SocialLink, 'id' | 'created_at' | 'updated_at'>) {
  try {
    await requireAdmin()

    const result = await sql`
      INSERT INTO social_links (platform, url, enabled, "order")
      VALUES (${data.platform}, ${data.url}, ${data.enabled}, ${data.order})
      RETURNING *
    `

    return { success: true, data: result.rows[0] }
  } catch (error) {
    console.error('Error creating social link:', error)
    return { error: 'Failed to create social link' }
  }
}

export async function updateSocialLink(id: number, data: Partial<SocialLink>) {
  try {
    await requireAdmin()

    const result = await sql`
      UPDATE social_links 
      SET 
        platform = COALESCE(${data.platform}, platform),
        url = COALESCE(${data.url}, url),
        enabled = COALESCE(${data.enabled}, enabled),
        "order" = COALESCE(${data.order}, "order"),
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `

    return { success: true, data: result.rows[0] }
  } catch (error) {
    console.error('Error updating social link:', error)
    return { error: 'Failed to update social link' }
  }
}

export async function deleteSocialLink(id: number) {
  try {
    await requireAdmin()

    await sql`
      DELETE FROM social_links WHERE id = ${id}
    `

    return { success: true }
  } catch (error) {
    console.error('Error deleting social link:', error)
    return { error: 'Failed to delete social link' }
  }
}

// ============= SITE SETTINGS CRUD =============

export async function getSiteSettings(): Promise<Record<string, any>> {
  try {
    const result = await sql`
      SELECT key, value, type FROM site_settings
    `

    const settings: Record<string, any> = {}

    result.rows.forEach((row: any) => {
      const value = row.value
      if (row.type === 'json') {
        settings[row.key] = JSON.parse(value)
      } else if (row.type === 'boolean') {
        settings[row.key] = value === 'true'
      } else {
        settings[row.key] = value
      }
    })

    return settings
  } catch (error) {
    console.error('Error getting site settings:', error)
    return {}
  }
}

export async function updateSiteSettings(key: string, value: any, type: 'string' | 'json' | 'boolean' = 'string') {
  try {
    await requireAdmin()

    const stringValue = typeof value === 'string' ? value : JSON.stringify(value)

    const result = await sql`
      INSERT INTO site_settings (key, value, type, updated_at)
      VALUES (${key}, ${stringValue}, ${type}, NOW())
      ON CONFLICT (key)
      DO UPDATE SET value = EXCLUDED.value, type = EXCLUDED.type, updated_at = NOW()
      RETURNING *
    `

    return { success: true, data: result.rows[0] }
  } catch (error) {
    console.error('Error updating site settings:', error)
    return { error: 'Failed to update site settings' }
  }
}
