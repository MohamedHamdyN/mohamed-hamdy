import { db } from '@/lib/db'

/**
 * SAFE QUERY HELPERS
 * All queries use parameterized parameters - NO string interpolation
 * Prevents SQL injection and ensures consistent filtering
 */

// ============================================
// HOME PAGE - Single Aggregated Query
// ============================================

export async function loadHomeData() {
  try {
    const result = await db.query`
      SELECT 
        (SELECT row_to_json(p) FROM profile p LIMIT 1) as profile,
        (SELECT COALESCE(json_agg(json_build_object(
          'id', id,
          'title', title,
          'value', value,
          'description', description,
          'icon', icon
        ) ORDER BY "order"), '[]'::json)
         FROM about_stats WHERE status = true) as stats,
        (SELECT COALESCE(json_agg(json_build_object(
          'id', id,
          'name', name,
          'color', color
        ) ORDER BY "order"), '[]'::json)
         FROM resume_skills WHERE enabled = true) as skills,
        (SELECT COALESCE(json_agg(json_build_object(
          'id', id,
          'name', name,
          'website', website,
          'rating', rating,
          'logo_url', logo_url
        ) ORDER BY "order"), '[]'::json)
         FROM clients WHERE enabled = true) as clients,
        (SELECT COALESCE(json_agg(json_build_object(
          'id', id,
          'title', title,
          'description', description,
          'image_url', image_url,
          'category_id', category_id
        ) ORDER BY "order"), '[]'::json)
         FROM projects WHERE draft = false AND featured = true LIMIT 3) as featured_projects
    `
    return result[0] || {}
  } catch (error) {
    console.error('Error loading home data:', error)
    return {}
  }
}

// ============================================
// PROJECTS - Optimized with Technologies
// ============================================

export async function loadProjectsData(categoryId?: number) {
  try {
    if (categoryId) {
      return await db.query`
        SELECT 
          p.id,
          p.title,
          p.description,
          p.image_url,
          p.category_id,
          p.project_url,
          p.linkedin_url,
          p.presentation_url,
          p.project_date,
          p.featured,
          p."order",
          pc.id as category_id_ref,
          pc.name as category_name,
          pc.slug as category_slug,
          COALESCE(json_agg(json_build_object(
            'id', t.id,
            'name', t.name,
            'slug', t.slug
          )) FILTER (WHERE t.id IS NOT NULL), '[]'::json) as technologies
        FROM projects p
        LEFT JOIN project_categories pc ON p.category_id = pc.id
        LEFT JOIN entity_technologies et ON et.entity_type = 'project' AND et.entity_id = p.id
        LEFT JOIN technologies t ON et.technology_id = t.id
        WHERE p.draft = false AND p.category_id = $1
        GROUP BY p.id, pc.id
        ORDER BY p.featured DESC, p."order" ASC
      `, [categoryId]
    }

    return await db.query`
      SELECT 
        p.id,
        p.title,
        p.description,
        p.image_url,
        p.category_id,
        p.project_url,
        p.linkedin_url,
        p.presentation_url,
        p.project_date,
        p.featured,
        p."order",
        pc.id as category_id_ref,
        pc.name as category_name,
        pc.slug as category_slug,
        COALESCE(json_agg(json_build_object(
          'id', t.id,
          'name', t.name,
          'slug', t.slug
        )) FILTER (WHERE t.id IS NOT NULL), '[]'::json) as technologies
      FROM projects p
      LEFT JOIN project_categories pc ON p.category_id = pc.id
      LEFT JOIN entity_technologies et ON et.entity_type = 'project' AND et.entity_id = p.id
      LEFT JOIN technologies t ON et.technology_id = t.id
      WHERE p.draft = false
      GROUP BY p.id, pc.id
      ORDER BY p.featured DESC, p."order" ASC
    `
  } catch (error) {
    console.error('Error loading projects:', error)
    return []
  }
}

// ============================================
// SERVICES
// ============================================

export async function getPublicServices() {
  try {
    return await db.query`
      SELECT * FROM services 
      WHERE enabled = true 
      ORDER BY "order" ASC
    `
  } catch (error) {
    console.error('Error getting services:', error)
    return []
  }
}

// ============================================
// SKILLS
// ============================================

export async function getPublicSkills() {
  try {
    return await db.query`
      SELECT * FROM resume_skills 
      WHERE enabled = true 
      ORDER BY "order" ASC
    `
  } catch (error) {
    console.error('Error getting skills:', error)
    return []
  }
}

// ============================================
// CLIENTS
// ============================================

export async function getPublicClients() {
  try {
    return await db.query`
      SELECT * FROM clients 
      WHERE enabled = true 
      ORDER BY "order" ASC
    `
  } catch (error) {
    console.error('Error getting clients:', error)
    return []
  }
}

// ============================================
// EXPERIENCES
// ============================================

export async function getPublicExperiences() {
  try {
    return await db.query`
      SELECT * FROM experiences 
      WHERE enabled = true 
      ORDER BY "order" ASC
    `
  } catch (error) {
    console.error('Error getting experiences:', error)
    return []
  }
}

// ============================================
// EDUCATIONS
// ============================================

export async function getPublicEducations() {
  try {
    return await db.query`
      SELECT * FROM educations 
      WHERE enabled = true 
      ORDER BY "order" ASC
    `
  } catch (error) {
    console.error('Error getting educations:', error)
    return []
  }
}

// ============================================
// CERTIFICATIONS
// ============================================

export async function getPublicCertifications() {
  try {
    return await db.query`
      SELECT * FROM certifications 
      WHERE enabled = true 
      ORDER BY "order" ASC
    `
  } catch (error) {
    console.error('Error getting certifications:', error)
    return []
  }
}

// ============================================
// CATEGORIES
// ============================================

export async function getProjectCategories() {
  try {
    return await db.query`
      SELECT * FROM project_categories 
      WHERE enabled = true 
      ORDER BY "order" ASC
    `
  } catch (error) {
    console.error('Error getting categories:', error)
    return []
  }
}
