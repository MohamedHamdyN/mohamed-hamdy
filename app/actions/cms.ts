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

// ✅ مهم: تحويل JS array إلى Postgres text[] literal
function toPgTextArray(value: unknown): string | null {
  if (value == null) return null

  if (typeof value === 'string') {
    const trimmed = value.trim()
    if (!trimmed) return '{}'

    if (trimmed.startsWith('[')) {
      try {
        const parsed = JSON.parse(trimmed)
        if (Array.isArray(parsed)) return toPgTextArray(parsed)
      } catch { }
    }

    if (trimmed.startsWith('{') && trimmed.endsWith('}')) return trimmed
    return `{${escapePgArrayItem(trimmed)}}`
  }

  if (Array.isArray(value)) {
    const items = value
      .filter((x) => x !== undefined && x !== null)
      .map((x) => String(x))
    return `{${items.map(escapePgArrayItem).join(',')}}`
  }

  return `{${escapePgArrayItem(String(value))}}`
}

function escapePgArrayItem(item: string): string {
  const escaped = item.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
  return `"${escaped}"`
}

// ===================== ABOUT TYPES =====================

export type AboutLang = 'en' | 'ar'

export type AboutStats = {
  id: number
  years_of_experience: number
  linkedin_followers: number
  completed_courses: number
  created_at?: string
  updated_at?: string
}

export interface Experience {
  id: number
  year: string
  title: string
  details: string
  enabled: boolean
  order: number
  created_at: string
  updated_at: string
}

export interface Education {
  id: number
  year: string
  degree: string
  institution: string
  details: string
  enabled: boolean
  order: number
  created_at: string
  updated_at: string
}

export type Certification = {
  id: number
  title: string
  issuer: string
  issue_date?: string | null
  description?: string | null
  credential_url?: string | null
  enabled?: boolean
  order?: number
  created_at?: string
  updated_at?: string
}

// ============= PROFILE CRUD =============

export async function getProfile(): Promise<Profile | null> {
  try {
    const result = await db.query`SELECT * FROM profile ORDER BY id ASC LIMIT 1`
    return (result[0] as Profile | undefined) ?? null
  } catch (e) {
    console.error("Error getting profile:", e)
    return null
  }
}

export async function upsertProfile(data: Partial<Profile>) {
  await requireAdmin()

  const existing = await db.query`SELECT id FROM profile ORDER BY id ASC LIMIT 1`

  let result: any[]
  if (existing.length > 0) {
    result = await db.query`
      UPDATE profile
      SET
        name = COALESCE(${data.name ?? null}, name),
        title = COALESCE(${data.title ?? null}, title),
        short_title = COALESCE(${data.short_title ?? null}, short_title),

        hero_description = COALESCE(${data.hero_description ?? null}, hero_description),
        hero_image_type = COALESCE(${data.hero_image_type ?? null}, hero_image_type),
        hero_image_url = COALESCE(${data.hero_image_url ?? null}, hero_image_url),

        location = COALESCE(${data.location ?? null}, location),
        open_to_work = COALESCE(${data.open_to_work ?? null}, open_to_work),
        email = COALESCE(${data.email ?? null}, email),
        phone = COALESCE(${data.phone ?? null}, phone),

        bio = COALESCE(${data.bio ?? null}, bio),
        short_bio = COALESCE(${data.short_bio ?? null}, short_bio),
        long_bio = COALESCE(${data.long_bio ?? null}, long_bio),
        about_intro = COALESCE(${data.about_intro ?? null}, about_intro),

        resume_url = COALESCE(${data.resume_url ?? null}, resume_url),
        calendly_url = COALESCE(${data.calendly_url ?? null}, calendly_url),
        avatar_url = COALESCE(${data.avatar_url ?? null}, avatar_url),
        og_image_url = COALESCE(${data.og_image_url ?? null}, og_image_url),

        updated_at = NOW()
      WHERE id = ${existing[0].id}
      RETURNING *
    `
  } else {
    result = await db.query`
      INSERT INTO profile (
        name, title, short_title, hero_description, hero_image_type, hero_image_url,
        location, open_to_work, email, phone,
        bio, short_bio, long_bio, about_intro,
        resume_url, calendly_url, avatar_url, og_image_url,
        updated_at
      )
      VALUES (
        ${data.name ?? "Portfolio"},
        ${data.title ?? null},
        ${data.short_title ?? null},
        ${data.hero_description ?? null},
        ${data.hero_image_type ?? "logo"},
        ${data.hero_image_url ?? null},
        ${data.location ?? null},
        ${data.open_to_work ?? false},
        ${data.email ?? null},
        ${data.phone ?? null},
        ${data.bio ?? null},
        ${data.short_bio ?? null},
        ${data.long_bio ?? null},
        ${data.about_intro ?? null},
        ${data.resume_url ?? null},
        ${data.calendly_url ?? null},
        ${data.avatar_url ?? null},
        ${data.og_image_url ?? null},
        NOW()
      )
      RETURNING *
    `
  }

  revalidatePath("/")
  revalidatePath("/about")
  revalidatePath("/contact")
  revalidatePath("/admin/profile")

  return { success: true, data: result[0] }
}

export async function updateProfile(input: Record<string, any>) {
  // await db.profile.update({ where: { id: 1 }, data: input })

  // revalidate pages that depend on profile
  revalidatePath("/")
  revalidatePath("/about")
  revalidatePath("/contact")
  return { ok: true }
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
    revalidatePath('/admin/skills')
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
    revalidatePath('/admin/skills')
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
    revalidatePath('/admin/skills')
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

    const technologiesPg = toPgTextArray(data.technologies)

    const result = await db.query`
      INSERT INTO projects (
        title, slug, description, short_description, category_id, image_url,
        project_url, linkedin_url, technologies, date, featured, draft, "order"
      )
      VALUES (
        ${data.title}, ${slug}, ${data.description}, ${data.short_description}, ${data.category_id}, ${data.image_url},
        ${data.project_url ?? null}, ${data.linkedin_url ?? null}, ${technologiesPg}::text[], ${data.date}, ${data.featured}, ${data.draft}, 0
      )
      RETURNING *
    `

    revalidatePublic()
    revalidatePath('/admin/projects')
    return { success: true, data: result[0] }
  } catch (error) {
    console.error('Error creating project:', error)
    return { error: error instanceof Error ? error.message : 'Failed to create project' }
  }
}

export async function updateProject(id: number, data: Partial<Project>) {
  try {
    await requireAdmin()

    const technologiesPg = data.technologies === undefined ? undefined : toPgTextArray(data.technologies)

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
        technologies = COALESCE(${technologiesPg ?? null}::text[], technologies),
        date = COALESCE(${data.date ?? null}, date),
        featured = COALESCE(${data.featured ?? null}, featured),
        draft = COALESCE(${data.draft ?? null}, draft),
        "order" = COALESCE(${data.order ?? null}, "order"),
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `

    revalidatePublic()
    revalidatePath('/admin/projects')
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
    revalidatePath('/admin/projects')
    return { success: true }
  } catch (error) {
    console.error('Error deleting project:', error)
    return { error: error instanceof Error ? error.message : 'Failed to create project' }
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

    const featuresPg = toPgTextArray((data as any).features)

    const result = await db.query`
      INSERT INTO services (title, description, icon, color, features, enabled, "order")
      VALUES (${data.title}, ${data.description}, ${data.icon}, ${data.color}, ${featuresPg}::text[], ${data.enabled}, ${data.order})
      RETURNING *
    `

    revalidatePublic()
    revalidatePath('/admin/services')
    return { success: true, data: result[0] }
  } catch (error) {
    console.error('Error creating service:', error)
    return { error: error instanceof Error ? error.message : 'Failed to create service' }
  }
}

export async function updateService(id: number, data: Partial<Service>) {
  try {
    await requireAdmin()

    const featuresPg = (data as any).features === undefined ? undefined : toPgTextArray((data as any).features)

    const result = await db.query`
      UPDATE services
      SET
        title = COALESCE(${data.title ?? null}, title),
        description = COALESCE(${data.description ?? null}, description),
        icon = COALESCE(${data.icon ?? null}, icon),
        color = COALESCE(${data.color ?? null}, color),
        features = COALESCE(${featuresPg ?? null}::text[], features),
        enabled = COALESCE(${data.enabled ?? null}, enabled),
        "order" = COALESCE(${data.order ?? null}, "order"),
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `

    revalidatePublic()
    revalidatePath('/admin/services')
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
    revalidatePath('/admin/services')
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
      VALUES (${data.name}, ${data.logo_url}, ${data.testimonial ?? null}, ${data.rating}, ${data.website ?? null}, ${data.enabled}, ${data.order})
      RETURNING *
    `

    revalidatePublic()
    revalidatePath('/admin/clients')
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
    revalidatePath('/admin/clients')
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
    revalidatePath('/admin/clients')
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
    revalidatePath('/admin/social')
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
    revalidatePath('/admin/social')
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
    revalidatePath('/admin/social')
    return { success: true }
  } catch (error) {
    console.error('Error deleting social link:', error)
    return { error: error instanceof Error ? error.message : 'Failed to delete social link' }
  }
}

// ===================== ABOUT (SECTIONS / STATS / LISTS) =====================

// ---- about_sections ----
// ✅ IMPORTANT: lang FIRST so pages can call getAboutSectionFull(LANG)
export async function getAboutSectionFull(language: AboutLang = 'en'): Promise<string | null> {
  try {
    const result = await db.query`
      SELECT content
      FROM about_sections
      WHERE type = 'full' AND language = ${language}
      ORDER BY updated_at DESC
      LIMIT 1
    `
    return (result[0]?.content as string | undefined) ?? null
  } catch (error) {
    console.error('Error getting about full section:', error)
    return null
  }
}

export async function getAboutSectionShort(language: AboutLang = 'en'): Promise<string | null> {
  try {
    const result = await db.query`
      SELECT content
      FROM about_sections
      WHERE type = 'short' AND language = ${language}
      ORDER BY updated_at DESC
      LIMIT 1
    `
    return (result[0]?.content as string | undefined) ?? null
  } catch (error) {
    console.error('Error getting about short section:', error)
    return null
  }
}

// ✅ IMPORTANT: (language, content) order so pages can call upsertAboutSectionFull(LANG, text)
export async function upsertAboutSectionFull(language: AboutLang, content: string) {
  try {
    await requireAdmin()

    const safeContent = String(content ?? '')

    const existing = await db.query`
      SELECT id FROM about_sections
      WHERE type = 'full' AND language = ${language}
      ORDER BY updated_at DESC
      LIMIT 1
    `

    let result: any[] = []

    if (existing.length > 0) {
      result = await db.query`
        UPDATE about_sections
        SET content = ${safeContent}, updated_at = NOW()
        WHERE id = ${existing[0].id}
        RETURNING *
      `
    } else {
      result = await db.query`
        INSERT INTO about_sections (type, content, language, created_at, updated_at)
        VALUES ('full', ${safeContent}, ${language}, NOW(), NOW())
        RETURNING *
      `
    }

    revalidatePublic()
    revalidatePath('/admin/about')
    revalidatePath('/admin/about/bio')
    return { success: true, data: result[0] }
  } catch (error) {
    console.error('Error updating about full section:', error)
    return { error: error instanceof Error ? error.message : 'Failed to update about section' }
  }
}

export async function upsertAboutSectionShort(language: AboutLang, content: string) {
  try {
    await requireAdmin()

    const safeContent = String(content ?? '')

    const existing = await db.query`
      SELECT id FROM about_sections
      WHERE type = 'short' AND language = ${language}
      ORDER BY updated_at DESC
      LIMIT 1
    `

    let result: any[] = []

    if (existing.length > 0) {
      result = await db.query`
        UPDATE about_sections
        SET content = ${safeContent}, updated_at = NOW()
        WHERE id = ${existing[0].id}
        RETURNING *
      `
    } else {
      result = await db.query`
        INSERT INTO about_sections (type, content, language, created_at, updated_at)
        VALUES ('short', ${safeContent}, ${language}, NOW(), NOW())
        RETURNING *
      `
    }

    revalidatePublic()
    revalidatePath('/admin/about')
    return { success: true, data: result[0] }
  } catch (error) {
    console.error('Error updating about short section:', error)
    return { error: error instanceof Error ? error.message : 'Failed to update about section' }
  }
}

// ---- about_stats ----
export async function getAboutStats(): Promise<AboutStats | null> {
  try {
    const result = await db.query`SELECT * FROM about_stats ORDER BY id ASC LIMIT 1`
    return (result[0] as AboutStats | undefined) ?? null
  } catch (error) {
    console.error('Error getting about stats:', error)
    return null
  }
}

export async function upsertAboutStats(data: {
  years_of_experience: number
  linkedin_followers: number
  completed_courses: number
}) {
  try {
    await requireAdmin()

    const years = Number.isFinite(Number(data.years_of_experience)) ? Number(data.years_of_experience) : 0
    const followers = Number.isFinite(Number(data.linkedin_followers)) ? Number(data.linkedin_followers) : 0
    const courses = Number.isFinite(Number(data.completed_courses)) ? Number(data.completed_courses) : 0

    const existing = await db.query`SELECT id FROM about_stats LIMIT 1`

    let result
    if (existing.length > 0) {
      result = await db.query`
        UPDATE about_stats
        SET
          years_of_experience = ${years},
          linkedin_followers = ${followers},
          completed_courses = ${courses},
          updated_at = NOW()
        WHERE id = ${existing[0].id}
        RETURNING *
      `
    } else {
      result = await db.query`
        INSERT INTO about_stats (years_of_experience, linkedin_followers, completed_courses, updated_at)
        VALUES (${years}, ${followers}, ${courses}, NOW())
        RETURNING *
      `
    }

    revalidatePublic()
    revalidatePath('/admin/about/stats')
    return { success: true, data: (result as any)[0] }
  } catch (error) {
    console.error('Error upserting about stats:', error)
    return { error: error instanceof Error ? error.message : 'Failed to save about stats' }
  }
}

// ===================== EXPERIENCES =====================

export async function getExperiences(): Promise<Experience[]> {
  try {
    const result = await db.query`
      SELECT * FROM experiences
      ORDER BY "order" ASC, id ASC
    `
    return result as Experience[]
  } catch (error) {
    console.error('Error getting experiences:', error)
    return []
  }
}

export async function createExperience(data: Omit<Experience, 'id' | 'created_at' | 'updated_at'>) {
  try {
    await requireAdmin()

    const result = await db.query`
      INSERT INTO experiences (year, title, details, enabled, "order")
      VALUES (${data.year}, ${data.title}, ${data.details}, ${data.enabled}, ${data.order})
      RETURNING *
    `

    revalidatePublic()
    revalidatePath('/admin/about/experience')
    return { success: true, data: result[0] }
  } catch (error) {
    console.error('Error creating experience:', error)
    return { error: error instanceof Error ? error.message : 'Failed to create experience' }
  }
}

export async function updateExperience(id: number, data: Partial<Experience>) {
  try {
    await requireAdmin()

    const result = await db.query`
      UPDATE experiences
      SET
        year = COALESCE(${data.year ?? null}, year),
        title = COALESCE(${data.title ?? null}, title),
        details = COALESCE(${data.details ?? null}, details),
        enabled = COALESCE(${data.enabled ?? null}, enabled),
        "order" = COALESCE(${data.order ?? null}, "order"),
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `

    revalidatePublic()
    revalidatePath('/admin/about/experience')
    return { success: true, data: result[0] }
  } catch (error) {
    console.error('Error updating experience:', error)
    return { error: error instanceof Error ? error.message : 'Failed to update experience' }
  }
}

export async function deleteExperience(id: number) {
  try {
    await requireAdmin()
    await db.query`DELETE FROM experiences WHERE id = ${id}`

    revalidatePublic()
    revalidatePath('/admin/about/experience')
    return { success: true }
  } catch (error) {
    console.error('Error deleting experience:', error)
    return { error: error instanceof Error ? error.message : 'Failed to delete experience' }
  }
}

// ===================== EDUCATIONS =====================

export async function getEducations(): Promise<Education[]> {
  try {
    const result = await db.query`
      SELECT * FROM educations
      ORDER BY "order" ASC, id ASC
    `
    return result as Education[]
  } catch (error) {
    console.error('Error getting educations:', error)
    return []
  }
}

export async function createEducation(data: Omit<Education, 'id' | 'created_at' | 'updated_at'>) {
  try {
    await requireAdmin()

    const result = await db.query`
      INSERT INTO educations (year, degree, institution, details, enabled, "order")
      VALUES (${data.year}, ${data.degree}, ${data.institution}, ${data.details}, ${data.enabled}, ${data.order})
      RETURNING *
    `

    revalidatePublic()
    revalidatePath('/admin/about/education')
    return { success: true, data: result[0] }
  } catch (error) {
    console.error('Error creating education:', error)
    return { error: error instanceof Error ? error.message : 'Failed to create education' }
  }
}

export async function updateEducation(id: number, data: Partial<Education>) {
  try {
    await requireAdmin()

    const result = await db.query`
      UPDATE educations
      SET
        year = COALESCE(${data.year ?? null}, year),
        degree = COALESCE(${data.degree ?? null}, degree),
        institution = COALESCE(${data.institution ?? null}, institution),
        details = COALESCE(${data.details ?? null}, details),
        enabled = COALESCE(${data.enabled ?? null}, enabled),
        "order" = COALESCE(${data.order ?? null}, "order"),
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `

    revalidatePublic()
    revalidatePath('/admin/about/education')
    return { success: true, data: result[0] }
  } catch (error) {
    console.error('Error updating education:', error)
    return { error: error instanceof Error ? error.message : 'Failed to update education' }
  }
}

export async function deleteEducation(id: number) {
  try {
    await requireAdmin()
    await db.query`DELETE FROM educations WHERE id = ${id}`

    revalidatePublic()
    revalidatePath('/admin/about/education')
    return { success: true }
  } catch (error) {
    console.error('Error deleting education:', error)
    return { error: error instanceof Error ? error.message : 'Failed to delete education' }
  }
}

// ===================== CERTIFICATIONS =====================

export async function getCertifications(): Promise<Certification[]> {
  try {
    const result = await db.query`
      SELECT * FROM certifications
      ORDER BY "order" ASC, id ASC
    `
    return result as Certification[]
  } catch (error) {
    console.error('Error getting certifications:', error)
    return []
  }
}

export async function createCertification(data: Omit<Certification, 'id'>) {
  try {
    await requireAdmin()

    const result = await db.query`
      INSERT INTO certifications (title, issuer, issue_date, description, credential_url, enabled, "order")
      VALUES (
        ${data.title},
        ${data.issuer},
        ${data.issue_date ?? null},
        ${data.description ?? null},
        ${data.credential_url ?? null},
        ${data.enabled ?? true},
        ${data.order ?? 0}
      )
      RETURNING *
    `

    revalidatePublic()
    revalidatePath('/admin/about/certifications')
    return { success: true, data: result[0] }
  } catch (error) {
    console.error('Error creating certification:', error)
    return { error: error instanceof Error ? error.message : 'Failed to create certification' }
  }
}

export async function updateCertification(id: number, data: Partial<Certification>) {
  try {
    await requireAdmin()

    const result = await db.query`
      UPDATE certifications
      SET
        title = COALESCE(${data.title ?? null}, title),
        issuer = COALESCE(${data.issuer ?? null}, issuer),
        issue_date = COALESCE(${data.issue_date ?? null}, issue_date),
        description = COALESCE(${data.description ?? null}, description),
        credential_url = COALESCE(${data.credential_url ?? null}, credential_url),
        enabled = COALESCE(${data.enabled ?? null}, enabled),
        "order" = COALESCE(${data.order ?? null}, "order"),
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `

    revalidatePublic()
    revalidatePath('/admin/about/certifications')
    return { success: true, data: result[0] }
  } catch (error) {
    console.error('Error updating certification:', error)
    return { error: error instanceof Error ? error.message : 'Failed to update certification' }
  }
}

export async function deleteCertification(id: number) {
  try {
    await requireAdmin()
    await db.query`DELETE FROM certifications WHERE id = ${id}`

    revalidatePublic()
    revalidatePath('/admin/about/certifications')
    return { success: true }
  } catch (error) {
    console.error('Error deleting certification:', error)
    return { error: error instanceof Error ? error.message : 'Failed to delete certification' }
  }
}

// ============= SITE SETTINGS CRUD =============

export async function getSiteSettings(): Promise<Record<string, any>> {
  try {
    const result = await db.query`SELECT key, value, type FROM site_settings`

    const settings: Record<string, any> = {}
    result.forEach((row: any) => {
      const value = row.value
      if (row.type === 'json') settings[row.key] = JSON.parse(value)
      else if (row.type === 'boolean') settings[row.key] = value === 'true'
      else settings[row.key] = value
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
      type === 'json'
        ? JSON.stringify(value)
        : type === 'boolean'
          ? String(Boolean(value))
          : String(value)

    const result = await db.query`
      INSERT INTO site_settings (key, value, type, updated_at)
      VALUES (${key}, ${stringValue}, ${type}, NOW())
      ON CONFLICT (key)
      DO UPDATE SET value = EXCLUDED.value, type = EXCLUDED.type, updated_at = NOW()
      RETURNING *
    `

    revalidatePublic()
    revalidatePath('/admin/settings')
    return { success: true, data: result[0] }
  } catch (error) {
    console.error('Error updating site settings:', error)
    return { error: error instanceof Error ? error.message : 'Failed to update site settings' }
  }
}