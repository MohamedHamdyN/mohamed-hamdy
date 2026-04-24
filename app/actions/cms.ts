'use server'

import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { getImageUrl } from '@/lib/image-utils'

// ==================== PROFILE ====================

export async function getProfile() {
  try {
    const result = await db.query('SELECT * FROM profile LIMIT 1')
    return result?.[0] || null
  } catch (error) {
    console.error('[cms] getProfile error:', error)
    return null
  }
}

export async function updateProfile(data: any) {
  try {
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

    await db.query(
      `UPDATE profile SET
        name = $1,
        job_title_1 = $2,
        job_title_2 = $3,
        email = $4,
        phone_number = $5,
        location = $6,
        hero_description = $7,
        description = $8,
        special_description = $9,
        quote = $10,
        resume_url = $11,
        calendly_url = $12,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = 1`,
      [
        name,
        job_title_1,
        job_title_2,
        email,
        phone_number || '00',
        location || '00',
        hero_description,
        description,
        special_description,
        quote,
        resume_url,
        calendly_url || '00',
      ]
    )
    revalidatePath('/')
    revalidatePath('/admin/profile')
    return { success: true }
  } catch (error) {
    console.error('[cms] updateProfile error:', error)
    return { error: 'Failed to update profile' }
  }
}

// ==================== SETTINGS ====================

export async function getSettings() {
  try {
    const result = await db.query('SELECT * FROM settings LIMIT 1')
    return result?.[0] || null
  } catch (error) {
    console.error('[cms] getSettings error:', error)
    return null
  }
}

export async function updateSettings(data: any) {
  try {
    const {
      admin_limit,
      dashboard_status,
      open_to_work,
      official_color_id,
      notifications,
    } = data

    await db.query(
      `UPDATE settings SET
        admin_limit = $1,
        dashboard_status = $2,
        open_to_work = $3,
        official_color_id = $4,
        notifications = $5,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = 1`,
      [
        admin_limit || 2,
        dashboard_status !== false,
        open_to_work !== false,
        official_color_id || 1,
        notifications ? JSON.stringify(notifications) : null,
      ]
    )
    revalidatePath('/')
    revalidatePath('/admin/settings')
    return { success: true }
  } catch (error) {
    console.error('[cms] updateSettings error:', error)
    return { error: 'Failed to update settings' }
  }
}

// ==================== COLORS ====================

export async function getColors() {
  try {
    const result = await db.query('SELECT * FROM colors ORDER BY id')
    return result || []
  } catch (error) {
    console.error('[cms] getColors error:', error)
    return []
  }
}

export async function getColorById(id: number) {
  try {
    const result = await db.query('SELECT * FROM colors WHERE id = $1', [id])
    return result?.[0] || null
  } catch (error) {
    console.error('[cms] getColorById error:', error)
    return null
  }
}

export async function createColor(data: any) {
  try {
    const { name, code } = data
    await db.query(
      'INSERT INTO colors (name, code) VALUES ($1, $2)',
      [name, code]
    )
    revalidatePath('/admin/colors')
    return { success: true }
  } catch (error) {
    console.error('[cms] createColor error:', error)
    return { error: 'Failed to create color' }
  }
}

export async function updateColor(id: number, data: any) {
  try {
    const { name, code } = data
    await db.query(
      'UPDATE colors SET name = $1, code = $2 WHERE id = $3',
      [name, code, id]
    )
    revalidatePath('/admin/colors')
    return { success: true }
  } catch (error) {
    console.error('[cms] updateColor error:', error)
    return { error: 'Failed to update color' }
  }
}

export async function deleteColor(id: number) {
  try {
    await db.query('DELETE FROM colors WHERE id = $1', [id])
    revalidatePath('/admin/colors')
    return { success: true }
  } catch (error) {
    console.error('[cms] deleteColor error:', error)
    return { error: 'Failed to delete color' }
  }
}

// ==================== MEDIA ====================

export async function getMedia() {
  try {
    const result = await db.query('SELECT * FROM media LIMIT 1')
    const media = result?.[0]
    if (media) {
      return {
        ...media,
        logo: getImageUrl(media.logo),
        avatar: getImageUrl(media.avatar),
        defaultProjectImage: getImageUrl(media.defaultProjectImage),
        defaultClientLogo: getImageUrl(media.defaultClientLogo),
      }
    }
    return null
  } catch (error) {
    console.error('[cms] getMedia error:', error)
    return null
  }
}

export async function updateMedia(data: any) {
  try {
    const { logo, avatar, defaultProjectImage, defaultClientLogo } = data
    await db.query(
      `UPDATE media SET
        logo = $1,
        avatar = $2,
        defaultProjectImage = $3,
        defaultClientLogo = $4
      WHERE id = 1`,
      [logo, avatar, defaultProjectImage, defaultClientLogo]
    )
    revalidatePath('/')
    revalidatePath('/admin')
    return { success: true }
  } catch (error) {
    console.error('[cms] updateMedia error:', error)
    return { error: 'Failed to update media' }
  }
}

// ==================== CATEGORIES ====================

export async function getCategories() {
  try {
    const result = await db.query(
      'SELECT * FROM categories WHERE status = true ORDER BY sort_order, created_at'
    )
    return result || []
  } catch (error) {
    console.error('[cms] getCategories error:', error)
    return []
  }
}

export async function getAllCategories() {
  try {
    const result = await db.query(
      'SELECT * FROM categories ORDER BY sort_order, created_at'
    )
    return result || []
  } catch (error) {
    console.error('[cms] getAllCategories error:', error)
    return []
  }
}

export async function createCategory(data: any) {
  try {
    const { name, slug, description, sort_order, color_id } = data
    await db.query(
      `INSERT INTO categories (name, slug, description, sort_order, color_id)
       VALUES ($1, $2, $3, $4, $5)`,
      [name, slug, description || null, sort_order || 0, color_id || 1]
    )
    revalidatePath('/admin/categories')
    revalidatePath('/projects')
    return { success: true }
  } catch (error) {
    console.error('[cms] createCategory error:', error)
    return { error: 'Failed to create category' }
  }
}

export async function updateCategory(id: number, data: any) {
  try {
    const { name, slug, description, sort_order, color_id, status } = data
    await db.query(
      `UPDATE categories SET
        name = $1,
        slug = $2,
        description = $3,
        sort_order = $4,
        color_id = $5,
        status = $6,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $7`,
      [name, slug, description || null, sort_order || 0, color_id || 1, status !== false, id]
    )
    revalidatePath('/admin/categories')
    revalidatePath('/projects')
    return { success: true }
  } catch (error) {
    console.error('[cms] updateCategory error:', error)
    return { error: 'Failed to update category' }
  }
}

export async function deleteCategory(id: number) {
  try {
    await db.query('DELETE FROM categories WHERE id = $1', [id])
    revalidatePath('/admin/categories')
    revalidatePath('/projects')
    return { success: true }
  } catch (error) {
    console.error('[cms] deleteCategory error:', error)
    return { error: 'Failed to delete category' }
  }
}

// ==================== PROJECTS ====================

export async function getProjects() {
  try {
    const result = await db.query(`
      SELECT p.*, c.name as category_name, c.color_id as category_color_id
      FROM projects p
      LEFT JOIN categories c ON p.category_id = c.id
      ORDER BY p.sort_order, p.created_at DESC
    `)
    return (result || []).map(p => ({
      ...p,
      image_url: getImageUrl(p.image_url)
    }))
  } catch (error) {
    console.error('[cms] getProjects error:', error)
    return []
  }
}

export async function getFeaturedProjects() {
  try {
    const result = await db.query(`
      SELECT p.*, c.name as category_name
      FROM projects p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.featured = true
      ORDER BY p.sort_order, p.created_at DESC
    `)
    return (result || []).map(p => ({
      ...p,
      image_url: getImageUrl(p.image_url)
    }))
  } catch (error) {
    console.error('[cms] getFeaturedProjects error:', error)
    return []
  }
}

export async function getProjectById(id: number) {
  try {
    const result = await db.query(
      `SELECT p.*, c.name as category_name
       FROM projects p
       LEFT JOIN categories c ON p.category_id = c.id
       WHERE p.id = $1`,
      [id]
    )
    const project = result?.[0]
    if (project) {
      project.image_url = getImageUrl(project.image_url)
    }
    return project || null
  } catch (error) {
    console.error('[cms] getProjectById error:', error)
    return null
  }
}

export async function createProject(data: any) {
  try {
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
    } = data

    const result = await db.query(
      `INSERT INTO projects (
        title, slug, description, hero_description, category_id,
        project_url, linkedin_url, project_date, featured,
        sort_order, image_url, presentation_url
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING id`,
      [
        title,
        slug,
        description,
        hero_description || null,
        category_id,
        project_url || null,
        linkedin_url || null,
        project_date || null,
        featured || false,
        sort_order || 0,
        image_url || null,
        presentation_url || null,
      ]
    )
    revalidatePath('/projects')
    revalidatePath('/admin/projects')
    return { success: true, id: result?.[0]?.id }
  } catch (error) {
    console.error('[cms] createProject error:', error)
    return { error: 'Failed to create project' }
  }
}

export async function updateProject(id: number, data: any) {
  try {
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
    } = data

    await db.query(
      `UPDATE projects SET
        title = $1, slug = $2, description = $3, hero_description = $4,
        category_id = $5, project_url = $6, linkedin_url = $7,
        project_date = $8, featured = $9, sort_order = $10,
        image_url = $11, presentation_url = $12,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $13`,
      [
        title,
        slug,
        description,
        hero_description || null,
        category_id,
        project_url || null,
        linkedin_url || null,
        project_date || null,
        featured || false,
        sort_order || 0,
        image_url || null,
        presentation_url || null,
        id,
      ]
    )
    revalidatePath('/projects')
    revalidatePath('/admin/projects')
    return { success: true }
  } catch (error) {
    console.error('[cms] updateProject error:', error)
    return { error: 'Failed to update project' }
  }
}

export async function deleteProject(id: number) {
  try {
    await db.query('DELETE FROM entity_technologies WHERE project_id = $1', [id])
    await db.query('DELETE FROM projects WHERE id = $1', [id])
    revalidatePath('/projects')
    revalidatePath('/admin/projects')
    return { success: true }
  } catch (error) {
    console.error('[cms] deleteProject error:', error)
    return { error: 'Failed to delete project' }
  }
}

// ==================== TECHNOLOGIES ====================

export async function getTechnologies() {
  try {
    const result = await db.query('SELECT * FROM technologies ORDER BY name')
    return result || []
  } catch (error) {
    console.error('[cms] getTechnologies error:', error)
    return []
  }
}

export async function createTechnology(data: any) {
  try {
    const { name, slug, icon, color_id } = data
    await db.query(
      `INSERT INTO technologies (name, slug, icon, color_id)
       VALUES ($1, $2, $3, $4)`,
      [name, slug, icon || null, color_id || 1]
    )
    revalidatePath('/admin/projects')
    return { success: true }
  } catch (error) {
    console.error('[cms] createTechnology error:', error)
    return { error: 'Failed to create technology' }
  }
}

export async function updateTechnology(id: number, data: any) {
  try {
    const { name, slug, icon, color_id } = data
    await db.query(
      `UPDATE technologies SET
        name = $1, slug = $2, icon = $3, color_id = $4
      WHERE id = $5`,
      [name, slug, icon || null, color_id || 1, id]
    )
    revalidatePath('/admin/projects')
    return { success: true }
  } catch (error) {
    console.error('[cms] updateTechnology error:', error)
    return { error: 'Failed to update technology' }
  }
}

export async function deleteTechnology(id: number) {
  try {
    await db.query('DELETE FROM entity_technologies WHERE technology_id = $1', [id])
    await db.query('DELETE FROM technologies WHERE id = $1', [id])
    revalidatePath('/admin/projects')
    return { success: true }
  } catch (error) {
    console.error('[cms] deleteTechnology error:', error)
    return { error: 'Failed to delete technology' }
  }
}

// ==================== ENTITY TECHNOLOGIES ====================

export async function getProjectTechnologies(projectId: number) {
  try {
    const result = await db.query(
      `SELECT t.* FROM technologies t
       JOIN entity_technologies et ON t.id = et.technology_id
       WHERE et.project_id = $1`,
      [projectId]
    )
    return result || []
  } catch (error) {
    console.error('[cms] getProjectTechnologies error:', error)
    return []
  }
}

export async function addProjectTechnology(projectId: number, technologyId: number) {
  try {
    const tech = await db.query('SELECT * FROM technologies WHERE id = $1', [technologyId])
    if (!tech?.[0]) return { error: 'Technology not found' }

    await db.query(
      `INSERT INTO entity_technologies (entity_type, entity_id, technology_id, project_id)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT DO NOTHING`,
      ['technology', technologyId, technologyId, projectId]
    )
    revalidatePath('/admin/projects')
    return { success: true }
  } catch (error) {
    console.error('[cms] addProjectTechnology error:', error)
    return { error: 'Failed to add technology' }
  }
}

export async function removeProjectTechnology(projectId: number, technologyId: number) {
  try {
    await db.query(
      'DELETE FROM entity_technologies WHERE project_id = $1 AND technology_id = $2',
      [projectId, technologyId]
    )
    revalidatePath('/admin/projects')
    return { success: true }
  } catch (error) {
    console.error('[cms] removeProjectTechnology error:', error)
    return { error: 'Failed to remove technology' }
  }
}

// ==================== PAGE STATUS ====================

export async function getPageStatus() {
  try {
    const result = await db.query('SELECT * FROM page_status')
    const pages = result || []
    return Object.fromEntries(pages.map(p => [p.key, p.status]))
  } catch (error) {
    console.error('[cms] getPageStatus error:', error)
    return {}
  }
}

export async function isPageEnabled(key: string) {
  try {
    const result = await db.query(
      'SELECT status FROM page_status WHERE key = $1',
      [key]
    )
    return result?.[0]?.status ?? true
  } catch (error) {
    console.error('[cms] isPageEnabled error:', error)
    return true
  }
}

export async function updatePageStatus(key: string, status: boolean) {
  try {
    await db.query(
      'UPDATE page_status SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE key = $2',
      [status, key]
    )
    revalidatePath('/')
    revalidatePath('/admin')
    return { success: true }
  } catch (error) {
    console.error('[cms] updatePageStatus error:', error)
    return { error: 'Failed to update page status' }
  }
}

// ==================== SERVICES ====================

export async function getServices() {
  try {
    const result = await db.query(
      'SELECT * FROM services WHERE status = true ORDER BY sort_order'
    )
    return result || []
  } catch (error) {
    console.error('[cms] getServices error:', error)
    return []
  }
}

export async function getAllServices() {
  try {
    const result = await db.query('SELECT * FROM services ORDER BY sort_order')
    return result || []
  } catch (error) {
    console.error('[cms] getAllServices error:', error)
    return []
  }
}

export async function createService(data: any) {
  try {
    const { title, description, icon, color_id, features, sort_order } = data
    await db.query(
      `INSERT INTO services (title, description, icon, color_id, features, sort_order)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        title,
        description || null,
        icon || null,
        color_id || 1,
        features ? JSON.stringify(features) : null,
        sort_order || 0,
      ]
    )
    revalidatePath('/services')
    revalidatePath('/admin/services')
    return { success: true }
  } catch (error) {
    console.error('[cms] createService error:', error)
    return { error: 'Failed to create service' }
  }
}

export async function updateService(id: number, data: any) {
  try {
    const { title, description, icon, color_id, features, status, sort_order } = data
    await db.query(
      `UPDATE services SET
        title = $1, description = $2, icon = $3, color_id = $4,
        features = $5, status = $6, sort_order = $7,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $8`,
      [
        title,
        description || null,
        icon || null,
        color_id || 1,
        features ? JSON.stringify(features) : null,
        status !== false,
        sort_order || 0,
        id,
      ]
    )
    revalidatePath('/services')
    revalidatePath('/admin/services')
    return { success: true }
  } catch (error) {
    console.error('[cms] updateService error:', error)
    return { error: 'Failed to update service' }
  }
}

export async function deleteService(id: number) {
  try {
    await db.query('DELETE FROM services WHERE id = $1', [id])
    revalidatePath('/services')
    revalidatePath('/admin/services')
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
      `SELECT s.*, c.name as color_name, c.code as color_code
       FROM skills s
       LEFT JOIN colors c ON s.color_id = c.id
       WHERE s.status = true
       ORDER BY s.sort_order, s.created_at`
    )
    return result || []
  } catch (error) {
    console.error('[cms] getSkills error:', error)
    return []
  }
}

export async function getAllSkills() {
  try {
    const result = await db.query(
      `SELECT s.*, c.name as color_name, c.code as color_code
       FROM skills s
       LEFT JOIN colors c ON s.color_id = c.id
       ORDER BY s.sort_order, s.created_at`
    )
    return result || []
  } catch (error) {
    console.error('[cms] getAllSkills error:', error)
    return []
  }
}

export async function createSkill(data: any) {
  try {
    const { title, description, category_id, color_id, icon, sort_order } = data
    await db.query(
      `INSERT INTO skills (title, description, category_id, color_id, icon, sort_order)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [title, description || null, category_id || null, color_id || 1, icon || null, sort_order || 0]
    )
    revalidatePath('/admin/skills')
    return { success: true }
  } catch (error) {
    console.error('[cms] createSkill error:', error)
    return { error: 'Failed to create skill' }
  }
}

export async function updateSkill(id: number, data: any) {
  try {
    const { title, description, category_id, color_id, icon, status, sort_order } = data
    await db.query(
      `UPDATE skills SET
        title = $1, description = $2, category_id = $3, color_id = $4,
        icon = $5, status = $6, sort_order = $7,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $8`,
      [title, description || null, category_id || null, color_id || 1, icon || null, status !== false, sort_order || 0, id]
    )
    revalidatePath('/admin/skills')
    return { success: true }
  } catch (error) {
    console.error('[cms] updateSkill error:', error)
    return { error: 'Failed to update skill' }
  }
}

export async function deleteSkill(id: number) {
  try {
    await db.query('DELETE FROM skills WHERE id = $1', [id])
    revalidatePath('/admin/skills')
    return { success: true }
  } catch (error) {
    console.error('[cms] deleteSkill error:', error)
    return { error: 'Failed to delete skill' }
  }
}

// ==================== STATS ====================

export async function getStats() {
  try {
    const result = await db.query(
      `SELECT s.*, c.name as color_name, c.code as color_code
       FROM stats s
       LEFT JOIN colors c ON s.color_id = c.id
       WHERE s.status = true
       ORDER BY s.sort_order`
    )
    return result || []
  } catch (error) {
    console.error('[cms] getStats error:', error)
    return []
  }
}

export async function getAllStats() {
  try {
    const result = await db.query(
      `SELECT s.*, c.name as color_name, c.code as color_code
       FROM stats s
       LEFT JOIN colors c ON s.color_id = c.id
       ORDER BY s.sort_order`
    )
    return result || []
  } catch (error) {
    console.error('[cms] getAllStats error:', error)
    return []
  }
}

export async function createStat(data: any) {
  try {
    const { title, value, description, icon, color_id, sort_order } = data
    await db.query(
      `INSERT INTO stats (title, value, description, icon, color_id, sort_order)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [title, value, description || null, icon || null, color_id || 1, sort_order || 0]
    )
    revalidatePath('/admin/about')
    return { success: true }
  } catch (error) {
    console.error('[cms] createStat error:', error)
    return { error: 'Failed to create stat' }
  }
}

export async function updateStat(id: number, data: any) {
  try {
    const { title, value, description, icon, color_id, status, sort_order } = data
    await db.query(
      `UPDATE stats SET
        title = $1, value = $2, description = $3, icon = $4,
        color_id = $5, status = $6, sort_order = $7,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $8`,
      [title, value, description || null, icon || null, color_id || 1, status !== false, sort_order || 0, id]
    )
    revalidatePath('/admin/about')
    return { success: true }
  } catch (error) {
    console.error('[cms] updateStat error:', error)
    return { error: 'Failed to update stat' }
  }
}

export async function deleteStat(id: number) {
  try {
    await db.query('DELETE FROM stats WHERE id = $1', [id])
    revalidatePath('/admin/about')
    return { success: true }
  } catch (error) {
    console.error('[cms] deleteStat error:', error)
    return { error: 'Failed to delete stat' }
  }
}

// ==================== SOCIAL MEDIA ====================

export async function getSocialLinks() {
  try {
    const result = await db.query(
      `SELECT s.*, c.name as color_name, c.code as color_code
       FROM social_media s
       LEFT JOIN colors c ON s.color_id = c.id
       ORDER BY s.sort_order`
    )
    return result || []
  } catch (error) {
    console.error('[cms] getSocialLinks error:', error)
    return []
  }
}

export async function createSocialLink(data: any) {
  try {
    const { platform, url, color_id, sort_order } = data
    await db.query(
      `INSERT INTO social_media (platform, url, color_id, sort_order)
       VALUES ($1, $2, $3, $4)`,
      [platform, url || null, color_id || 1, sort_order || 0]
    )
    revalidatePath('/admin/social')
    return { success: true }
  } catch (error) {
    console.error('[cms] createSocialLink error:', error)
    return { error: 'Failed to create social link' }
  }
}

export async function updateSocialLink(id: number, data: any) {
  try {
    const { platform, url, color_id, sort_order } = data
    await db.query(
      `UPDATE social_media SET
        platform = $1, url = $2, color_id = $3, sort_order = $4,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $5`,
      [platform, url || null, color_id || 1, sort_order || 0, id]
    )
    revalidatePath('/admin/social')
    return { success: true }
  } catch (error) {
    console.error('[cms] updateSocialLink error:', error)
    return { error: 'Failed to update social link' }
  }
}

export async function deleteSocialLink(id: number) {
  try {
    await db.query('DELETE FROM social_media WHERE id = $1', [id])
    revalidatePath('/admin/social')
    return { success: true }
  } catch (error) {
    console.error('[cms] deleteSocialLink error:', error)
    return { error: 'Failed to delete social link' }
  }
}

// ==================== CERTIFICATIONS ====================

export async function getCertifications() {
  try {
    const result = await db.query(
      'SELECT * FROM certifications WHERE status = true ORDER BY sort_order'
    )
    return result || []
  } catch (error) {
    console.error('[cms] getCertifications error:', error)
    return []
  }
}

export async function getAllCertifications() {
  try {
    const result = await db.query('SELECT * FROM certifications ORDER BY sort_order')
    return result || []
  } catch (error) {
    console.error('[cms] getAllCertifications error:', error)
    return []
  }
}

export async function createCertification(data: any) {
  try {
    const { title, issuer, issuer_date, url, description, sort_order } = data
    await db.query(
      `INSERT INTO certifications (title, issuer, issuer_date, url, description, sort_order)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [title, issuer || null, issuer_date || null, url || null, description || null, sort_order || 0]
    )
    revalidatePath('/admin/about')
    return { success: true }
  } catch (error) {
    console.error('[cms] createCertification error:', error)
    return { error: 'Failed to create certification' }
  }
}

export async function updateCertification(id: number, data: any) {
  try {
    const { title, issuer, issuer_date, url, description, status, sort_order } = data
    await db.query(
      `UPDATE certifications SET
        title = $1, issuer = $2, issuer_date = $3, url = $4,
        description = $5, status = $6, sort_order = $7,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $8`,
      [title, issuer || null, issuer_date || null, url || null, description || null, status !== false, sort_order || 0, id]
    )
    revalidatePath('/admin/about')
    return { success: true }
  } catch (error) {
    console.error('[cms] updateCertification error:', error)
    return { error: 'Failed to update certification' }
  }
}

export async function deleteCertification(id: number) {
  try {
    await db.query('DELETE FROM certifications WHERE id = $1', [id])
    revalidatePath('/admin/about')
    return { success: true }
  } catch (error) {
    console.error('[cms] deleteCertification error:', error)
    return { error: 'Failed to delete certification' }
  }
}

// ==================== EDUCATION ====================

export async function getEducation() {
  try {
    const result = await db.query(
      'SELECT * FROM education WHERE status = true ORDER BY start_date DESC'
    )
    return result || []
  } catch (error) {
    console.error('[cms] getEducation error:', error)
    return []
  }
}

export async function getAllEducation() {
  try {
    const result = await db.query('SELECT * FROM education ORDER BY start_date DESC')
    return result || []
  } catch (error) {
    console.error('[cms] getAllEducation error:', error)
    return []
  }
}

export async function createEducation(data: any) {
  try {
    const { title, university, degree, start_date, end_date } = data
    await db.query(
      `INSERT INTO education (title, university, degree, start_date, end_date)
       VALUES ($1, $2, $3, $4, $5)`,
      [title, university || null, degree || null, start_date, end_date || null]
    )
    revalidatePath('/admin/about')
    return { success: true }
  } catch (error) {
    console.error('[cms] createEducation error:', error)
    return { error: 'Failed to create education' }
  }
}

export async function updateEducation(id: number, data: any) {
  try {
    const { title, university, degree, start_date, end_date, status } = data
    await db.query(
      `UPDATE education SET
        title = $1, university = $2, degree = $3, start_date = $4,
        end_date = $5, status = $6, updated_at = CURRENT_TIMESTAMP
      WHERE id = $7`,
      [title, university || null, degree || null, start_date, end_date || null, status !== false, id]
    )
    revalidatePath('/admin/about')
    return { success: true }
  } catch (error) {
    console.error('[cms] updateEducation error:', error)
    return { error: 'Failed to update education' }
  }
}

export async function deleteEducation(id: number) {
  try {
    await db.query('DELETE FROM education WHERE id = $1', [id])
    revalidatePath('/admin/about')
    return { success: true }
  } catch (error) {
    console.error('[cms] deleteEducation error:', error)
    return { error: 'Failed to delete education' }
  }
}

// ==================== EXPERIENCE ====================

export async function getExperience() {
  try {
    const result = await db.query(
      'SELECT * FROM experience WHERE status = true ORDER BY start_date DESC'
    )
    return result || []
  } catch (error) {
    console.error('[cms] getExperience error:', error)
    return []
  }
}

export async function getAllExperience() {
  try {
    const result = await db.query('SELECT * FROM experience ORDER BY start_date DESC')
    return result || []
  } catch (error) {
    console.error('[cms] getAllExperience error:', error)
    return []
  }
}

export async function createExperience(data: any) {
  try {
    const { job_title, company, description, start_date, end_date, logo } = data
    await db.query(
      `INSERT INTO experience (job_title, company, description, start_date, end_date, logo)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [job_title, company, description || null, start_date, end_date || null, logo || null]
    )
    revalidatePath('/admin/about')
    return { success: true }
  } catch (error) {
    console.error('[cms] createExperience error:', error)
    return { error: 'Failed to create experience' }
  }
}

export async function updateExperience(id: number, data: any) {
  try {
    const { job_title, company, description, start_date, end_date, logo, status } = data
    await db.query(
      `UPDATE experience SET
        job_title = $1, company = $2, description = $3, start_date = $4,
        end_date = $5, logo = $6, status = $7, created_at = CURRENT_TIMESTAMP
      WHERE id = $8`,
      [job_title, company, description || null, start_date, end_date || null, logo || null, status !== false, id]
    )
    revalidatePath('/admin/about')
    return { success: true }
  } catch (error) {
    console.error('[cms] updateExperience error:', error)
    return { error: 'Failed to update experience' }
  }
}

export async function deleteExperience(id: number) {
  try {
    await db.query('DELETE FROM experience WHERE id = $1', [id])
    revalidatePath('/admin/about')
    return { success: true }
  } catch (error) {
    console.error('[cms] deleteExperience error:', error)
    return { error: 'Failed to delete experience' }
  }
}

// ==================== CLIENTS ====================

export async function getClients() {
  try {
    const result = await db.query(
      `SELECT * FROM clients WHERE status = true ORDER BY id DESC`
    )
    return (result || []).map(c => ({
      ...c,
      logo: getImageUrl(c.logo)
    }))
  } catch (error) {
    console.error('[cms] getClients error:', error)
    return []
  }
}

export async function getAllClients() {
  try {
    const result = await db.query('SELECT * FROM clients ORDER BY id DESC')
    return (result || []).map(c => ({
      ...c,
      logo: getImageUrl(c.logo)
    }))
  } catch (error) {
    console.error('[cms] getAllClients error:', error)
    return []
  }
}

export async function createClient(data: any) {
  try {
    const { name, website, rating, logo, description } = data
    await db.query(
      `INSERT INTO clients (name, website, rating, logo, description)
       VALUES ($1, $2, $3, $4, $5)`,
      [name, website || null, rating || 5, logo || null, description || null]
    )
    revalidatePath('/admin/clients')
    return { success: true }
  } catch (error) {
    console.error('[cms] createClient error:', error)
    return { error: 'Failed to create client' }
  }
}

export async function updateClient(id: number, data: any) {
  try {
    const { name, website, rating, logo, description, status } = data
    await db.query(
      `UPDATE clients SET
        name = $1, website = $2, rating = $3, logo = $4,
        description = $5, status = $6
      WHERE id = $7`,
      [name, website || null, rating || 5, logo || null, description || null, status !== false, id]
    )
    revalidatePath('/admin/clients')
    return { success: true }
  } catch (error) {
    console.error('[cms] updateClient error:', error)
    return { error: 'Failed to update client' }
  }
}

export async function deleteClient(id: number) {
  try {
    await db.query('DELETE FROM clients WHERE id = $1', [id])
    revalidatePath('/admin/clients')
    return { success: true }
  } catch (error) {
    console.error('[cms] deleteClient error:', error)
    return { error: 'Failed to delete client' }
  }
}

// ==================== ADMIN MANAGEMENT ====================

export async function getAdminsCount() {
  try {
    const result = await db.query('SELECT COUNT(*) as count FROM admins')
    return result?.[0]?.count || 0
  } catch (error) {
    console.error('[cms] getAdminsCount error:', error)
    return 0
  }
}

export async function getAdminByEmail(email: string) {
  try {
    const result = await db.query('SELECT * FROM admins WHERE email = $1', [email])
    return result?.[0] || null
  } catch (error) {
    console.error('[cms] getAdminByEmail error:', error)
    return null
  }
}

export async function createAdmin(email: string, passwordHash: string) {
  try {
    await db.query(
      'INSERT INTO admins (email, password) VALUES ($1, $2)',
      [email, passwordHash]
    )
    revalidatePath('/admin/dashboard')
    return { success: true }
  } catch (error) {
    console.error('[cms] createAdmin error:', error)
    return { error: 'Failed to create admin' }
  }
}

export async function getAdminSessions(adminId: number) {
  try {
    const result = await db.query(
      'SELECT * FROM admin_sessions WHERE admin_id = $1',
      [adminId]
    )
    return result || []
  } catch (error) {
    console.error('[cms] getAdminSessions error:', error)
    return []
  }
}

export async function createAdminSession(adminId: number, token: string, expiresAt: Date) {
  try {
    await db.query(
      'INSERT INTO admin_sessions (admin_id, token, expires_at) VALUES ($1, $2, $3)',
      [adminId, token, expiresAt]
    )
    return { success: true }
  } catch (error) {
    console.error('[cms] createAdminSession error:', error)
    return { error: 'Failed to create session' }
  }
}

export async function validateAdminSession(token: string) {
  try {
    const result = await db.query(
      'SELECT as.*, a.id as admin_id FROM admin_sessions as JOIN admins a ON as.admin_id = a.id WHERE as.token = $1 AND as.expires_at > NOW()',
      [token]
    )
    return result?.[0] || null
  } catch (error) {
    console.error('[cms] validateAdminSession error:', error)
    return null
  }
}

export async function deleteAdminSession(token: string) {
  try {
    await db.query('DELETE FROM admin_sessions WHERE token = $1', [token])
    return { success: true }
  } catch (error) {
    console.error('[cms] deleteAdminSession error:', error)
    return { error: 'Failed to delete session' }
  }
}

// ==================== ALIAS FUNCTIONS (for compatibility) ====================

export async function getExperiences() {
  return await getExperience()
}

export async function getSiteSettings() {
  return await getSettings()
}

export async function updateSiteSettings(data: any) {
  return await updateSettings(data)
}

export async function createEducationRecord(data: any) {
  return await createEducation(data)
}

export async function updateEducationRecord(id: number, data: any) {
  return await updateEducation(id, data)
}

export async function deleteEducationRecord(id: number) {
  return await deleteEducation(id)
}
