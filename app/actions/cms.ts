'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'
import { getAdminFromSession } from '@/lib/auth'

// ==================== HELPERS ====================

async function requireAdmin() {
  const admin = await getAdminFromSession()
  if (!admin) throw new Error('Unauthorized')
  return admin
}

function revalidatePublic() {
  revalidatePath('/')
  revalidatePath('/projects')
  revalidatePath('/about')
  revalidatePath('/services')
  revalidatePath('/contact')
}

// ==================== PROFILE ====================

export async function getProfile() {
  try {
    const result = await db.query('SELECT * FROM profile LIMIT 1')
    return result[0] || {}
  } catch (error) {
    console.error('[cms] getProfile error:', error)
    return {}
  }
}

export async function updateProfile(data: any) {
  try {
    await requireAdmin()
    const {
      name,
      job_title_1,
      job_title_2,
      email,
      phone_number,
      location,
      hero_description,
      description,
      special_description,
      quote,
      resume_url,
      calendly_url,
    } = data

    const result = await db.query(
      `INSERT INTO profile (name, job_title_1, job_title_2, email, phone_number, location, 
        hero_description, description, special_description, quote, resume_url, calendly_url) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
       ON CONFLICT (id) DO UPDATE SET
        name = $1, job_title_1 = $2, job_title_2 = $3, email = $4, phone_number = $5,
        location = $6, hero_description = $7, description = $8, special_description = $9,
        quote = $10, resume_url = $11, calendly_url = $12, updated_at = CURRENT_TIMESTAMP
       RETURNING *`,
      [
        name,
        job_title_1,
        job_title_2,
        email,
        phone_number,
        location,
        hero_description,
        description,
        special_description,
        quote,
        resume_url,
        calendly_url,
      ]
    )

    revalidatePublic()
    revalidatePath('/admin/profile')
    return { success: true, data: result[0] }
  } catch (error) {
    console.error('[cms] updateProfile error:', error)
    return { error: 'Failed to update profile' }
  }
}

// ==================== PROJECTS ====================

export async function getProjects() {
  try {
    const result = await db.query(
      `SELECT p.*, c.name as category_name,
        COALESCE(ARRAY_AGG(json_build_object('id', t.id, 'name', t.name, 'icon', t.icon, 'color_id', t.color_id)) 
          FILTER (WHERE t.id IS NOT NULL), ARRAY[]::json[]) as technologies
       FROM projects p
       LEFT JOIN categories c ON p.category_id = c.id
       LEFT JOIN entity_technologies et ON et.entity_type = 'project' AND et.entity_id = p.id
       LEFT JOIN technologies t ON et.technology_id = t.id
       GROUP BY p.id, c.id
       ORDER BY p.sort_order ASC, p.created_at DESC`
    )
    return result || []
  } catch (error) {
    console.error('[cms] getProjects error:', error)
    return []
  }
}

export async function createProject(data: any) {
  try {
    await requireAdmin()
    const {
      title,
      slug,
      description,
      hero_description,
      category_id,
      project_url,
      linkedin_url,
      project_date,
      featured,
      sort_order,
      image_url,
      presentation_url,
      technologies,
    } = data

    const projectResult = await db.query(
      `INSERT INTO projects 
       (title, slug, description, hero_description, category_id, project_url, linkedin_url, 
        project_date, featured, sort_order, image_url, presentation_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
       RETURNING *`,
      [
        title,
        slug,
        description,
        hero_description,
        category_id,
        project_url,
        linkedin_url,
        project_date,
        featured,
        sort_order,
        image_url,
        presentation_url,
      ]
    )

    const project = projectResult[0]

    if (technologies && Array.isArray(technologies) && technologies.length > 0) {
      for (const tech_id of technologies) {
        await db.query(
          `INSERT INTO entity_technologies (entity_type, entity_id, technology_id)
           VALUES ($1, $2, $3)
           ON CONFLICT (entity_type, entity_id, technology_id) DO NOTHING`,
          ['project', project.id, tech_id]
        )
      }
    }

    revalidatePublic()
    revalidatePath('/admin/projects')
    return { success: true, data: project }
  } catch (error) {
    console.error('[cms] createProject error:', error)
    return { error: 'Failed to create project' }
  }
}

export async function updateProject(id: number, data: any) {
  try {
    await requireAdmin()
    const {
      title,
      slug,
      description,
      hero_description,
      category_id,
      project_url,
      linkedin_url,
      project_date,
      featured,
      sort_order,
      image_url,
      presentation_url,
      technologies,
    } = data

    const result = await db.query(
      `UPDATE projects SET 
        title = $1, slug = $2, description = $3, hero_description = $4, category_id = $5,
        project_url = $6, linkedin_url = $7, project_date = $8, featured = $9, sort_order = $10,
        image_url = $11, presentation_url = $12, updated_at = CURRENT_TIMESTAMP
       WHERE id = $13 RETURNING *`,
      [
        title,
        slug,
        description,
        hero_description,
        category_id,
        project_url,
        linkedin_url,
        project_date,
        featured,
        sort_order,
        image_url,
        presentation_url,
        id,
      ]
    )

    if (technologies && Array.isArray(technologies)) {
      await db.query(
        `DELETE FROM entity_technologies WHERE entity_type = $1 AND entity_id = $2`,
        ['project', id]
      )
      for (const tech_id of technologies) {
        await db.query(
          `INSERT INTO entity_technologies (entity_type, entity_id, technology_id)
           VALUES ($1, $2, $3)`,
          ['project', id, tech_id]
        )
      }
    }

    revalidatePublic()
    revalidatePath('/admin/projects')
    return { success: true, data: result[0] }
  } catch (error) {
    console.error('[cms] updateProject error:', error)
    return { error: 'Failed to update project' }
  }
}

export async function deleteProject(id: number) {
  try {
    await requireAdmin()
    await db.query('DELETE FROM entity_technologies WHERE entity_type = $1 AND entity_id = $2', [
      'project',
      id,
    ])
    await db.query('DELETE FROM projects WHERE id = $1', [id])
    revalidatePublic()
    revalidatePath('/admin/projects')
    return { success: true }
  } catch (error) {
    console.error('[cms] deleteProject error:', error)
    return { error: 'Failed to delete project' }
  }
}

// ==================== CATEGORIES ====================

export async function getCategories() {
  try {
    const result = await db.query(
      `SELECT c.*, col.code as color_code FROM categories c
       LEFT JOIN colors col ON c.color_id = col.id
       WHERE c.status = true
       ORDER BY c.sort_order ASC`
    )
    return result || []
  } catch (error) {
    console.error('[cms] getCategories error:', error)
    return []
  }
}

export async function createCategory(data: any) {
  try {
    await requireAdmin()
    const { name, slug, description, sort_order, status, color_id } = data

    const result = await db.query(
      `INSERT INTO categories (name, slug, description, sort_order, status, color_id)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [name, slug, description, sort_order, status ?? true, color_id ?? 1]
    )
    revalidatePath('/admin/categories')
    return { success: true, data: result[0] }
  } catch (error) {
    console.error('[cms] createCategory error:', error)
    return { error: 'Failed to create category' }
  }
}

export async function updateCategory(id: number, data: any) {
  try {
    await requireAdmin()
    const { name, slug, description, sort_order, status, color_id } = data

    const result = await db.query(
      `UPDATE categories SET 
        name = $1, slug = $2, description = $3, sort_order = $4, status = $5, color_id = $6,
        updated_at = CURRENT_TIMESTAMP
       WHERE id = $7 RETURNING *`,
      [name, slug, description, sort_order, status, color_id, id]
    )
    revalidatePath('/admin/categories')
    revalidatePublic()
    return { success: true, data: result[0] }
  } catch (error) {
    console.error('[cms] updateCategory error:', error)
    return { error: 'Failed to update category' }
  }
}

// ==================== TECHNOLOGIES ====================

export async function getTechnologies() {
  try {
    const result = await db.query(
      `SELECT t.*, c.code as color_code FROM technologies t
       LEFT JOIN colors c ON t.color_id = c.id
       ORDER BY t.name ASC`
    )
    return result || []
  } catch (error) {
    console.error('[cms] getTechnologies error:', error)
    return []
  }
}

export async function createTechnology(data: any) {
  try {
    await requireAdmin()
    const { name, slug, icon, color_id } = data

    const result = await db.query(
      `INSERT INTO technologies (name, slug, icon, color_id)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [name, slug || name.toLowerCase().replace(/\s+/g, '-'), icon, color_id]
    )
    revalidatePath('/admin/technologies')
    return { success: true, data: result[0] }
  } catch (error) {
    console.error('[cms] createTechnology error:', error)
    return { error: 'Failed to create technology' }
  }
}

export async function updateTechnology(id: number, data: any) {
  try {
    await requireAdmin()
    const { name, slug, icon, color_id } = data

    const result = await db.query(
      `UPDATE technologies SET name = $1, slug = $2, icon = $3, color_id = $4
       WHERE id = $5 RETURNING *`,
      [name, slug, icon, color_id, id]
    )
    revalidatePath('/admin/technologies')
    return { success: true, data: result[0] }
  } catch (error) {
    console.error('[cms] updateTechnology error:', error)
    return { error: 'Failed to update technology' }
  }
}

// ==================== SERVICES ====================

export async function getServices() {
  try {
    const result = await db.query(
      `SELECT s.*, c.code as color_code FROM services s
       LEFT JOIN colors c ON s.color_id = c.id
       WHERE s.status = true
       ORDER BY s.sort_order ASC`
    )
    return result || []
  } catch (error) {
    console.error('[cms] getServices error:', error)
    return []
  }
}

export async function createService(data: any) {
  try {
    await requireAdmin()
    const { title, description, icon, color_id, features, sort_order, status } = data

    const result = await db.query(
      `INSERT INTO services (title, description, icon, color_id, features, sort_order, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [title, description, icon, color_id ?? 1, features || [], sort_order, status ?? true]
    )
    revalidatePath('/admin/services')
    revalidatePublic()
    return { success: true, data: result[0] }
  } catch (error) {
    console.error('[cms] createService error:', error)
    return { error: 'Failed to create service' }
  }
}

export async function updateService(id: number, data: any) {
  try {
    await requireAdmin()
    const { title, description, icon, color_id, features, sort_order, status } = data

    const result = await db.query(
      `UPDATE services SET 
        title = $1, description = $2, icon = $3, color_id = $4, features = $5, sort_order = $6,
        status = $7, updated_at = CURRENT_TIMESTAMP
       WHERE id = $8 RETURNING *`,
      [title, description, icon, color_id, features, sort_order, status, id]
    )
    revalidatePath('/admin/services')
    revalidatePublic()
    return { success: true, data: result[0] }
  } catch (error) {
    console.error('[cms] updateService error:', error)
    return { error: 'Failed to update service' }
  }
}

export async function deleteService(id: number) {
  try {
    await requireAdmin()
    await db.query('DELETE FROM services WHERE id = $1', [id])
    revalidatePath('/admin/services')
    revalidatePublic()
    return { success: true }
  } catch (error) {
    console.error('[cms] deleteService error:', error)
    return { error: 'Failed to delete service' }
  }
}

// ==================== SKILLS ====================

export async function getSkills() {
  try {
    const result = await db.query(
      `SELECT s.*, c.code as color_code FROM skills s
       LEFT JOIN colors c ON s.color_id = c.id
       WHERE s.status = true
       ORDER BY s.sort_order ASC`
    )
    return result || []
  } catch (error) {
    console.error('[cms] getSkills error:', error)
    return []
  }
}

export async function createSkill(data: any) {
  try {
    await requireAdmin()
    const { title, description, category_id, color_id, icon, sort_order, status } = data

    const result = await db.query(
      `INSERT INTO skills (title, description, category_id, color_id, icon, sort_order, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [title, description, category_id, color_id ?? 1, icon, sort_order, status ?? true]
    )
    revalidatePath('/admin/skills')
    revalidatePublic()
    return { success: true, data: result[0] }
  } catch (error) {
    console.error('[cms] createSkill error:', error)
    return { error: 'Failed to create skill' }
  }
}

export async function updateSkill(id: number, data: any) {
  try {
    await requireAdmin()
    const { title, description, category_id, color_id, icon, sort_order, status } = data

    const result = await db.query(
      `UPDATE skills SET 
        title = $1, description = $2, category_id = $3, color_id = $4, icon = $5, sort_order = $6,
        status = $7, updated_at = CURRENT_TIMESTAMP
       WHERE id = $8 RETURNING *`,
      [title, description, category_id, color_id, icon, sort_order, status, id]
    )
    revalidatePath('/admin/skills')
    revalidatePublic()
    return { success: true, data: result[0] }
  } catch (error) {
    console.error('[cms] updateSkill error:', error)
    return { error: 'Failed to update skill' }
  }
}

export async function deleteSkill(id: number) {
  try {
    await requireAdmin()
    await db.query('DELETE FROM skills WHERE id = $1', [id])
    revalidatePath('/admin/skills')
    revalidatePublic()
    return { success: true }
  } catch (error) {
    console.error('[cms] deleteSkill error:', error)
    return { error: 'Failed to delete skill' }
  }
}

// ==================== EXPERIENCE ====================

export async function getExperiences() {
  try {
    const result = await db.query(
      `SELECT * FROM experience
       WHERE status = true
       ORDER BY start_date DESC`
    )
    return result || []
  } catch (error) {
    console.error('[cms] getExperiences error:', error)
    return []
  }
}

export async function createExperience(data: any) {
  try {
    await requireAdmin()
    const { job_title, company, description, start_date, end_date, logo, status } = data

    const result = await db.query(
      `INSERT INTO experience (job_title, company, description, start_date, end_date, logo, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [job_title, company, description, start_date, end_date, logo, status ?? true]
    )
    revalidatePath('/admin/experience')
    revalidatePublic()
    return { success: true, data: result[0] }
  } catch (error) {
    console.error('[cms] createExperience error:', error)
    return { error: 'Failed to create experience' }
  }
}

export async function updateExperience(id: number, data: any) {
  try {
    await requireAdmin()
    const { job_title, company, description, start_date, end_date, logo, status } = data

    const result = await db.query(
      `UPDATE experience SET 
        job_title = $1, company = $2, description = $3, start_date = $4, end_date = $5,
        logo = $6, status = $7, updated_at = CURRENT_TIMESTAMP
       WHERE id = $8 RETURNING *`,
      [job_title, company, description, start_date, end_date, logo, status, id]
    )
    revalidatePath('/admin/experience')
    revalidatePublic()
    return { success: true, data: result[0] }
  } catch (error) {
    console.error('[cms] updateExperience error:', error)
    return { error: 'Failed to update experience' }
  }
}

export async function deleteExperience(id: number) {
  try {
    await requireAdmin()
    await db.query('DELETE FROM experience WHERE id = $1', [id])
    revalidatePath('/admin/experience')
    revalidatePublic()
    return { success: true }
  } catch (error) {
    console.error('[cms] deleteExperience error:', error)
    return { error: 'Failed to delete experience' }
  }
}

// ==================== EDUCATION ====================

export async function getEducation() {
  try {
    const result = await db.query(
      `SELECT * FROM education
       WHERE status = true
       ORDER BY start_date DESC`
    )
    return result || []
  } catch (error) {
    console.error('[cms] getEducation error:', error)
    return []
  }
}

export async function createEducationRecord(data: any) {
  try {
    await requireAdmin()
    const { title, university, degree, start_date, end_date, status } = data

    const result = await db.query(
      `INSERT INTO education (title, university, degree, start_date, end_date, status)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [title, university, degree, start_date, end_date, status ?? true]
    )
    revalidatePath('/admin/education')
    revalidatePublic()
    return { success: true, data: result[0] }
  } catch (error) {
    console.error('[cms] createEducationRecord error:', error)
    return { error: 'Failed to create education record' }
  }
}

export async function updateEducationRecord(id: number, data: any) {
  try {
    await requireAdmin()
    const { title, university, degree, start_date, end_date, status } = data

    const result = await db.query(
      `UPDATE education SET 
        title = $1, university = $2, degree = $3, start_date = $4, end_date = $5,
        status = $6, updated_at = CURRENT_TIMESTAMP
       WHERE id = $7 RETURNING *`,
      [title, university, degree, start_date, end_date, status, id]
    )
    revalidatePath('/admin/education')
    revalidatePublic()
    return { success: true, data: result[0] }
  } catch (error) {
    console.error('[cms] updateEducationRecord error:', error)
    return { error: 'Failed to update education record' }
  }
}

export async function deleteEducationRecord(id: number) {
  try {
    await requireAdmin()
    await db.query('DELETE FROM education WHERE id = $1', [id])
    revalidatePath('/admin/education')
    revalidatePublic()
    return { success: true }
  } catch (error) {
    console.error('[cms] deleteEducationRecord error:', error)
    return { error: 'Failed to delete education record' }
  }
}

// ==================== CERTIFICATIONS ====================

export async function getCertifications() {
  try {
    const result = await db.query(
      `SELECT * FROM certifications
       WHERE status = true
       ORDER BY sort_order ASC`
    )
    return result || []
  } catch (error) {
    console.error('[cms] getCertifications error:', error)
    return []
  }
}

export async function createCertification(data: any) {
  try {
    await requireAdmin()
    const { title, issuer, issuer_date, url, description, sort_order, status } = data

    const result = await db.query(
      `INSERT INTO certifications (title, issuer, issuer_date, url, description, sort_order, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [title, issuer, issuer_date, url, description, sort_order, status ?? true]
    )
    revalidatePath('/admin/certifications')
    return { success: true, data: result[0] }
  } catch (error) {
    console.error('[cms] createCertification error:', error)
    return { error: 'Failed to create certification' }
  }
}

export async function updateCertification(id: number, data: any) {
  try {
    await requireAdmin()
    const { title, issuer, issuer_date, url, description, sort_order, status } = data

    const result = await db.query(
      `UPDATE certifications SET 
        title = $1, issuer = $2, issuer_date = $3, url = $4, description = $5, sort_order = $6,
        status = $7, updated_at = CURRENT_TIMESTAMP
       WHERE id = $8 RETURNING *`,
      [title, issuer, issuer_date, url, description, sort_order, status, id]
    )
    revalidatePath('/admin/certifications')
    return { success: true, data: result[0] }
  } catch (error) {
    console.error('[cms] updateCertification error:', error)
    return { error: 'Failed to update certification' }
  }
}

// ==================== COLORS ====================

export async function getColors() {
  try {
    const result = await db.query('SELECT * FROM colors ORDER BY id ASC')
    return result || []
  } catch (error) {
    console.error('[cms] getColors error:', error)
    return []
  }
}

// ==================== STATS ====================

export async function getStats() {
  try {
    const result = await db.query(
      `SELECT s.*, c.code as color_code FROM stats s
       LEFT JOIN colors c ON s.color_id = c.id
       WHERE s.status = true
       ORDER BY s.sort_order ASC`
    )
    return result || []
  } catch (error) {
    console.error('[cms] getStats error:', error)
    return []
  }
}

export async function createStat(data: any) {
  try {
    await requireAdmin()
    const { title, value, description, icon, color_id, sort_order, status } = data

    const result = await db.query(
      `INSERT INTO stats (title, value, description, icon, color_id, sort_order, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [title, value, description, icon, color_id ?? 1, sort_order, status ?? true]
    )
    revalidatePath('/admin/stats')
    return { success: true, data: result[0] }
  } catch (error) {
    console.error('[cms] createStat error:', error)
    return { error: 'Failed to create stat' }
  }
}

// ==================== SOCIAL MEDIA ====================

export async function getSocialLinks() {
  try {
    const result = await db.query(
      `SELECT s.*, c.code as color_code FROM social_media s
       LEFT JOIN colors c ON s.color_id = c.id
       ORDER BY s.sort_order ASC`
    )
    return result || []
  } catch (error) {
    console.error('[cms] getSocialLinks error:', error)
    return []
  }
}

export async function updateSocialLink(id: number, data: any) {
  try {
    await requireAdmin()
    const { platform, url, color_id, sort_order } = data

    const result = await db.query(
      `UPDATE social_media SET platform = $1, url = $2, color_id = $3, sort_order = $4, updated_at = CURRENT_TIMESTAMP
       WHERE id = $5 RETURNING *`,
      [platform, url, color_id, sort_order, id]
    )
    revalidatePath('/admin/social')
    return { success: true, data: result[0] }
  } catch (error) {
    console.error('[cms] updateSocialLink error:', error)
    return { error: 'Failed to update social link' }
  }
}

// ==================== CLIENTS ====================

export async function getClients() {
  try {
    const result = await db.query(
      `SELECT * FROM clients
       WHERE status = true
       ORDER BY id ASC`
    )
    return result || []
  } catch (error) {
    console.error('[cms] getClients error:', error)
    return []
  }
}

export async function createClient(data: any) {
  try {
    await requireAdmin()
    const { name, website, rating, logo, description, status } = data

    const result = await db.query(
      `INSERT INTO clients (name, website, rating, logo, description, status)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [name, website, rating ?? 5, logo, description, status ?? true]
    )
    revalidatePath('/admin/clients')
    revalidatePublic()
    return { success: true, data: result[0] }
  } catch (error) {
    console.error('[cms] createClient error:', error)
    return { error: 'Failed to create client' }
  }
}

export async function updateClient(id: number, data: any) {
  try {
    await requireAdmin()
    const { name, website, rating, logo, description, status } = data

    const result = await db.query(
      `UPDATE clients SET name = $1, website = $2, rating = $3, logo = $4, description = $5, status = $6
       WHERE id = $7 RETURNING *`,
      [name, website, rating, logo, description, status, id]
    )
    revalidatePath('/admin/clients')
    revalidatePublic()
    return { success: true, data: result[0] }
  } catch (error) {
    console.error('[cms] updateClient error:', error)
    return { error: 'Failed to update client' }
  }
}

// ==================== SETTINGS ====================

export async function getSettings() {
  try {
    const result = await db.query('SELECT * FROM settings LIMIT 1')
    return result[0] || { admin_limit: 2, dashboard_status: true, open_to_work: true }
  } catch (error) {
    console.error('[cms] getSettings error:', error)
    return { admin_limit: 2, dashboard_status: true, open_to_work: true }
  }
}

export async function updateSettings(data: any) {
  try {
    await requireAdmin()
    const { admin_limit, dashboard_status, open_to_work, official_color_id } = data

    const result = await db.query(
      `INSERT INTO settings (admin_limit, dashboard_status, open_to_work, official_color_id)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (id) DO UPDATE SET
        admin_limit = $1, dashboard_status = $2, open_to_work = $3, official_color_id = $4, updated_at = CURRENT_TIMESTAMP
       RETURNING *`,
      [admin_limit, dashboard_status, open_to_work, official_color_id ?? 1]
    )
    revalidatePath('/admin/settings')
    return { success: true, data: result[0] }
  } catch (error) {
    console.error('[cms] updateSettings error:', error)
    return { error: 'Failed to update settings' }
  }
}

// ==================== PAGE STATUS ====================

export async function getPageStatus() {
  try {
    const result = await db.query('SELECT * FROM page_status ORDER BY id ASC')
    return result || []
  } catch (error) {
    console.error('[cms] getPageStatus error:', error)
    return []
  }
}

export async function updatePageStatus(id: number, status: boolean) {
  try {
    await requireAdmin()
    const result = await db.query(
      `UPDATE page_status SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *`,
      [status, id]
    )
    revalidatePublic()
    revalidatePath('/admin/settings')
    return { success: true, data: result[0] }
  } catch (error) {
    console.error('[cms] updatePageStatus error:', error)
    return { error: 'Failed to update page status' }
  }
}

export async function getSiteSettings() {
  try {
    const settings = await getSettings()
    const pageStatus = await getPageStatus()
    return { settings, pageStatus }
  } catch (error) {
    console.error('[cms] getSiteSettings error:', error)
    return { settings: {}, pageStatus: [] }
  }
}

// ==================== ADMINS ====================

export async function getAdminsCount() {
  try {
    const result = await db.query('SELECT COUNT(*) as count FROM admins')
    return { count: result[0]?.count || 0 }
  } catch (error) {
    console.error('[cms] getAdminsCount error:', error)
    return { error: 'Failed to get admins count', count: 0 }
  }
}
