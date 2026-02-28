'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'
import { getAdminFromSession } from '@/lib/auth'
import { Profile, Skill, Project, Service, Client, SocialLink } from '@/lib/db'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set')
}

// ---------- helpers ----------
async function requireAdmin() {
  const admin = await getAdminFromSession()
  if (!admin) throw new Error('Unauthorized')
  return admin
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

// عدّل/قلّل المسارات حسب صفحاتك الفعلية
function revalidatePublic() {
  revalidatePath('/')
  revalidatePath('/projects')
  revalidatePath('/about')
  revalidatePath('/services')
  revalidatePath('/contact')
}

// ============= PROFILE CRUD =============

export async function getProfile(): Promise<Profile | null> {
  try {
    const result = await db.query`SELECT * FROM profiles LIMIT 1`
    return (result[0] as Profile | undefined) ?? null
  } catch (error) {
    console.error('Error getting profile:', error)
    return null
  }
}

export async function updateProfile(data: Partial<Profile>) {
  try {
    await requireAdmin()

    const result = await db.query`
      UPDATE profiles
      SET
        name = COALESCE(${data.name ?? null}, name),
        title = COALESCE(${data.title ?? null}, title),
        email = COALESCE(${data.email ?? null}, email),
        bio = COALESCE(${data.bio ?? null}, bio),
        avatar_url = COALESCE(${data.avatar_url ?? null}, avatar_url),
        resume_url = COALESCE(${data.resume_url ?? null}, resume_url),
        calendly_url = COALESCE(${data.calendly_url ?? null}, calendly_url),
        location = COALESCE(${data.location ?? null}, location),
        phone = COALESCE(${data.phone ?? null}, phone),
        updated_at = NOW()
      WHERE id = (SELECT id FROM profiles LIMIT 1)
      RETURNING *
    `

    revalidatePublic()
    return { success: true, data: result[0] }
  } catch (error) {
    console.error('Error updating profile:', error)
    return { error: error instanceof Error ? error.message : 'Failed to update profile' }
  }
}

// ============= SKILLS CRUD =============

export async function getSkills(): Promise<Skill[]> {
  try {
    const result = await db.query`SELECT * FROM skills ORDER BY "order" ASC`
    return result as Skill[]
  } catch (error) {
    console.error('Error getting skills:', error)
    return []
  }
}

export async function createSkill(data: Omit<Skill, 'id' | 'created_at' | 'updated_at'>) {
  try {
    await requireAdmin()

    const result = await db.query`
      INSERT INTO skills (name, description, icon, color, enabled, "order")
      VALUES (${data.name}, ${data.description}, ${data.icon}, ${data.color}, ${data.enabled}, ${data.order})
      RETURNING *
    `

    revalidatePublic()
    return { success: true, data: result[0] }
  } catch (error) {
    console.error('Error creating skill:', error)
    return { error: error instanceof Error ? error.message : 'Failed to create skill' }
  }
}

export async function updateSkill(id: number, data: Partial<Skill>) {
  try {
    await requireAdmin()

    const result = await db.query`
      UPDATE skills
      SET
        name = COALESCE(${data.name ?? null}, name),
        description = COALESCE(${data.description ?? null}, description),
        icon = COALESCE(${data.icon ?? null}, icon),
        color = COALESCE(${data.color ?? null}, color),
        enabled = COALESCE(${data.enabled ?? null}, enabled),
        "order" = COALESCE(${data.order ?? null}, "order"),
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `

    revalidatePublic()
    return { success: true, data: result[0] }
  } catch (error) {
    console.error('Error updating skill:', error)
    return { error: error instanceof Error ? error.message : 'Failed to update skill' }
  }
}

export async function deleteSkill(id: number) {
  try {
    await requireAdmin()

    await db.query`DELETE FROM skills WHERE id = ${id}`

    revalidatePublic()
    return { success: true }
  } catch (error) {
    console.error('Error deleting skill:', error)
    return { error: error instanceof Error ? error.message : 'Failed to delete skill' }
  }
}

// ============= PROJECTS CRUD =============

export async function getProjects(includeDraft = false): Promise<Project[]> {
  try {
    const result = includeDraft
      ? await db.query`SELECT * FROM projects ORDER BY "order" DESC, date DESC`
      : await db.query`SELECT * FROM projects WHERE draft = false ORDER BY "order" DESC, date DESC`

    return result as Project[]
  } catch (error) {
    console.error('Error getting projects:', error)
    return []
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const result = await db.query`SELECT * FROM projects WHERE slug = ${slug} LIMIT 1`
    return (result[0] as Project | undefined) ?? null
  } catch (error) {
    console.error('Error getting project:', error)
    return null
  }
}

export async function createProject(
  data: Omit<Project, 'id' | 'slug' | 'created_at' | 'updated_at' | 'order'>
) {
  try {
    await requireAdmin()

    const slug = generateSlug(data.title)

    const existing = await db.query`SELECT id FROM projects WHERE slug = ${slug} LIMIT 1`
    if (existing.length > 0) return { error: 'A project with this title already exists' }

    // ✅ technologies: array مباشرة
    const result = await db.query`
      INSERT INTO projects (
        title, slug, description, short_description, category_id, image_url,
        project_url, linkedin_url, technologies, date, featured, draft, "order"
      )
      VALUES (
        ${data.title}, ${slug}, ${data.description}, ${data.short_description}, ${data.category_id}, ${data.image_url},
        ${data.project_url}, ${data.linkedin_url}, ${data.technologies}, ${data.date}, ${data.featured}, ${data.draft}, 0
      )
      RETURNING *
    `

    revalidatePublic()
    return { success: true, data: result[0] }
  } catch (error) {
    console.error('Error creating project:', error)
    return { error: error instanceof Error ? error.message : 'Failed to create project' }
  }
}

export async function updateProject(id: number, data: Partial<Project>) {
  try {
    await requireAdmin()

    const result = await db.query`
      UPDATE projects
      SET
        title = COALESCE(${data.title ?? null}, title),
        description = COALESCE(${data.description ?? null}, description),
        short_description = COALESCE(${data.short_description ?? null}, short_description),
        category_id = COALESCE(${data.category_id ?? null}, category_id),
        image_url = COALESCE(${data.image_url ?? null}, image_url),
        project_url = COALESCE(${data.project_url ?? null}, project_url),
        linkedin_url = COALESCE(${data.linkedin_url ?? null}, linkedin_url),
        technologies = COALESCE(${data.technologies ?? null}, technologies),
        date = COALESCE(${data.date ?? null}, date),
        featured = COALESCE(${data.featured ?? null}, featured),
        draft = COALESCE(${data.draft ?? null}, draft),
        "order" = COALESCE(${data.order ?? null}, "order"),
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `

    revalidatePublic()
    return { success: true, data: result[0] }
  } catch (error) {
    console.error('Error updating project:', error)
    return { error: error instanceof Error ? error.message : 'Failed to update project' }
  }
}

export async function deleteProject(id: number) {
  try {
    await requireAdmin()

    await db.query`DELETE FROM projects WHERE id = ${id}`

    revalidatePublic()
    return { success: true }
  } catch (error) {
    console.error('Error deleting project:', error)
    return { error: error instanceof Error ? error.message : 'Failed to delete project' }
  }
}

// ============= SERVICES CRUD =============

export async function getServices(): Promise<Service[]> {
  try {
    const result = await db.query`SELECT * FROM services ORDER BY "order" ASC`
    return result as Service[]
  } catch (error) {
    console.error('Error getting services:', error)
    return []
  }
}

export async function createService(data: Omit<Service, 'id' | 'created_at' | 'updated_at'>) {
  try {
    await requireAdmin()

    // ✅ features: array مباشرة
    const result = await db.query`
      INSERT INTO services (title, description, icon, color, features, enabled, "order")
      VALUES (${data.title}, ${data.description}, ${data.icon}, ${data.color}, ${data.features}, ${data.enabled}, ${data.order})
      RETURNING *
    `

    revalidatePublic()
    return { success: true, data: result[0] }
  } catch (error) {
    console.error('Error creating service:', error)
    return { error: error instanceof Error ? error.message : 'Failed to create service' }
  }
}

export async function updateService(id: number, data: Partial<Service>) {
  try {
    await requireAdmin()

    const result = await db.query`
      UPDATE services
      SET
        title = COALESCE(${data.title ?? null}, title),
        description = COALESCE(${data.description ?? null}, description),
        icon = COALESCE(${data.icon ?? null}, icon),
        color = COALESCE(${data.color ?? null}, color),
        features = COALESCE(${data.features ?? null}, features),
        enabled = COALESCE(${data.enabled ?? null}, enabled),
        "order" = COALESCE(${data.order ?? null}, "order"),
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `

    revalidatePublic()
    return { success: true, data: result[0] }
  } catch (error) {
    console.error('Error updating service:', error)
    return { error: error instanceof Error ? error.message : 'Failed to update service' }
  }
}

export async function deleteService(id: number) {
  try {
    await requireAdmin()

    await db.query`DELETE FROM services WHERE id = ${id}`

    revalidatePublic()
    return { success: true }
  } catch (error) {
    console.error('Error deleting service:', error)
    return { error: error instanceof Error ? error.message : 'Failed to delete service' }
  }
}

// ============= CLIENTS CRUD =============

export async function getClients(): Promise<Client[]> {
  try {
    const result = await db.query`SELECT * FROM clients ORDER BY "order" ASC`
    return result as Client[]
  } catch (error) {
    console.error('Error getting clients:', error)
    return []
  }
}

export async function createClient(data: Omit<Client, 'id' | 'created_at' | 'updated_at'>) {
  try {
    await requireAdmin()

    const result = await db.query`
      INSERT INTO clients (name, logo_url, testimonial, rating, website, enabled, "order")
      VALUES (${data.name}, ${data.logo_url}, ${data.testimonial}, ${data.rating}, ${data.website}, ${data.enabled}, ${data.order})
      RETURNING *
    `

    revalidatePublic()
    return { success: true, data: result[0] }
  } catch (error) {
    console.error('Error creating client:', error)
    return { error: error instanceof Error ? error.message : 'Failed to create client' }
  }
}

export async function updateClient(id: number, data: Partial<Client>) {
  try {
    await requireAdmin()

    const result = await db.query`
      UPDATE clients
      SET
        name = COALESCE(${data.name ?? null}, name),
        logo_url = COALESCE(${data.logo_url ?? null}, logo_url),
        testimonial = COALESCE(${data.testimonial ?? null}, testimonial),
        rating = COALESCE(${data.rating ?? null}, rating),
        website = COALESCE(${data.website ?? null}, website),
        enabled = COALESCE(${data.enabled ?? null}, enabled),
        "order" = COALESCE(${data.order ?? null}, "order"),
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `

    revalidatePublic()
    return { success: true, data: result[0] }
  } catch (error) {
    console.error('Error updating client:', error)
    return { error: error instanceof Error ? error.message : 'Failed to update client' }
  }
}

export async function deleteClient(id: number) {
  try {
    await requireAdmin()

    await db.query`DELETE FROM clients WHERE id = ${id}`

    revalidatePublic()
    return { success: true }
  } catch (error) {
    console.error('Error deleting client:', error)
    return { error: error instanceof Error ? error.message : 'Failed to delete client' }
  }
}

// ============= SOCIAL LINKS CRUD =============

export async function getSocialLinks(): Promise<SocialLink[]> {
  try {
    const result = await db.query`SELECT * FROM social_links ORDER BY "order" ASC`
    return result as SocialLink[]
  } catch (error) {
    console.error('Error getting social links:', error)
    return []
  }
}

export async function createSocialLink(data: Omit<SocialLink, 'id' | 'created_at' | 'updated_at'>) {
  try {
    await requireAdmin()

    const result = await db.query`
      INSERT INTO social_links (platform, url, enabled, "order")
      VALUES (${data.platform}, ${data.url}, ${data.enabled}, ${data.order})
      RETURNING *
    `

    revalidatePublic()
    return { success: true, data: result[0] }
  } catch (error) {
    console.error('Error creating social link:', error)
    return { error: error instanceof Error ? error.message : 'Failed to create social link' }
  }
}

export async function updateSocialLink(id: number, data: Partial<SocialLink>) {
  try {
    await requireAdmin()

    const result = await db.query`
      UPDATE social_links
      SET
        platform = COALESCE(${data.platform ?? null}, platform),
        url = COALESCE(${data.url ?? null}, url),
        enabled = COALESCE(${data.enabled ?? null}, enabled),
        "order" = COALESCE(${data.order ?? null}, "order"),
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `

    revalidatePublic()
    return { success: true, data: result[0] }
  } catch (error) {
    console.error('Error updating social link:', error)
    return { error: error instanceof Error ? error.message : 'Failed to update social link' }
  }
}

export async function deleteSocialLink(id: number) {
  try {
    await requireAdmin()

    await db.query`DELETE FROM social_links WHERE id = ${id}`

    revalidatePublic()
    return { success: true }
  } catch (error) {
    console.error('Error deleting social link:', error)
    return { error: error instanceof Error ? error.message : 'Failed to delete social link' }
  }
}

// ============= SITE SETTINGS CRUD =============

export async function getSiteSettings(): Promise<Record<string, any>> {
  try {
    const result = await db.query`SELECT key, value, type FROM site_settings`

    const settings: Record<string, any> = {}
    result.forEach((row: any) => {
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

export async function updateSiteSettings(
  key: string,
  value: any,
  type: 'string' | 'json' | 'boolean' = 'string'
) {
  try {
    await requireAdmin()

    const stringValue =
      type === 'json' ? JSON.stringify(value) :
        type === 'boolean' ? String(Boolean(value)) :
          String(value)

    const result = await db.query`
      INSERT INTO site_settings (key, value, type, updated_at)
      VALUES (${key}, ${stringValue}, ${type}, NOW())
      ON CONFLICT (key)
      DO UPDATE SET value = EXCLUDED.value, type = EXCLUDED.type, updated_at = NOW()
      RETURNING *
    `

    revalidatePublic()
    return { success: true, data: result[0] }
  } catch (error) {
    console.error('Error updating site settings:', error)
    return { error: error instanceof Error ? error.message : 'Failed to update site settings' }
  }
}