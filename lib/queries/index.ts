import { db } from '@/lib/db'

// ==================== PUBLIC QUERIES ====================

export async function getPublicProfile() {
  try {
    return await db.query('SELECT * FROM profile LIMIT 1')
  } catch (error) {
    console.error('[queries] getPublicProfile error:', error)
    return []
  }
}

export async function getPublicProjects() {
  try {
    return await db.query(
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
  } catch (error) {
    console.error('[queries] getPublicProjects error:', error)
    return []
  }
}

export async function getPublicProjectsByCategory(categoryId: number) {
  try {
    return await db.query(
      `SELECT p.*, c.name as category_name,
        COALESCE(ARRAY_AGG(json_build_object('id', t.id, 'name', t.name, 'icon', t.icon)) 
          FILTER (WHERE t.id IS NOT NULL), ARRAY[]::json[]) as technologies
       FROM projects p
       LEFT JOIN categories c ON p.category_id = c.id
       LEFT JOIN entity_technologies et ON et.entity_type = 'project' AND et.entity_id = p.id
       LEFT JOIN technologies t ON et.technology_id = t.id
       WHERE p.category_id = $1
       GROUP BY p.id, c.id
       ORDER BY p.sort_order ASC`,
      [categoryId]
    )
  } catch (error) {
    console.error('[queries] getPublicProjectsByCategory error:', error)
    return []
  }
}

export async function getPublicCategories() {
  try {
    return await db.query(
      `SELECT c.*, col.code as color_code FROM categories c
       LEFT JOIN colors col ON c.color_id = col.id
       WHERE c.status = true
       ORDER BY c.sort_order ASC`
    )
  } catch (error) {
    console.error('[queries] getPublicCategories error:', error)
    return []
  }
}

export async function getPublicSkills() {
  try {
    return await db.query(
      `SELECT s.*, c.code as color_code FROM skills s
       LEFT JOIN colors c ON s.color_id = c.id
       WHERE s.status = true
       ORDER BY s.sort_order ASC`
    )
  } catch (error) {
    console.error('[queries] getPublicSkills error:', error)
    return []
  }
}

export async function getPublicServices() {
  try {
    return await db.query(
      `SELECT s.*, c.code as color_code FROM services s
       LEFT JOIN colors c ON s.color_id = c.id
       WHERE s.status = true
       ORDER BY s.sort_order ASC`
    )
  } catch (error) {
    console.error('[queries] getPublicServices error:', error)
    return []
  }
}

export async function getPublicExperience() {
  try {
    return await db.query(
      `SELECT * FROM experience
       WHERE status = true
       ORDER BY start_date DESC`
    )
  } catch (error) {
    console.error('[queries] getPublicExperience error:', error)
    return []
  }
}

export async function getPublicEducation() {
  try {
    return await db.query(
      `SELECT * FROM education
       WHERE status = true
       ORDER BY start_date DESC`
    )
  } catch (error) {
    console.error('[queries] getPublicEducation error:', error)
    return []
  }
}

export async function getPublicStats() {
  try {
    return await db.query(
      `SELECT s.*, c.code as color_code FROM stats s
       LEFT JOIN colors c ON s.color_id = c.id
       WHERE s.status = true
       ORDER BY s.sort_order ASC`
    )
  } catch (error) {
    console.error('[queries] getPublicStats error:', error)
    return []
  }
}

export async function getPublicSocialLinks() {
  try {
    return await db.query(
      `SELECT s.*, c.code as color_code FROM social_media s
       LEFT JOIN colors c ON s.color_id = c.id
       ORDER BY s.sort_order ASC`
    )
  } catch (error) {
    console.error('[queries] getPublicSocialLinks error:', error)
    return []
  }
}

export async function getPublicClients() {
  try {
    return await db.query(
      `SELECT * FROM clients
       WHERE status = true
       ORDER BY id ASC`
    )
  } catch (error) {
    console.error('[queries] getPublicClients error:', error)
    return []
  }
}

export async function getColors() {
  try {
    return await db.query('SELECT * FROM colors ORDER BY id ASC')
  } catch (error) {
    console.error('[queries] getColors error:', error)
    return []
  }
}

export async function getPageStatus() {
  try {
    return await db.query('SELECT * FROM page_status ORDER BY id ASC')
  } catch (error) {
    console.error('[queries] getPageStatus error:', error)
    return []
  }
}

export async function isPageEnabled(pageKey: string): Promise<boolean> {
  try {
    const result = await db.query('SELECT status FROM page_status WHERE key = $1 LIMIT 1', [
      pageKey,
    ])
    return result[0]?.status ?? true
  } catch (error) {
    console.error('[queries] isPageEnabled error:', error)
    return true
  }
}

// ==================== HOME PAGE DATA ====================

export async function getHomeData() {
  try {
    const [profile, stats, skills, services, projects, clients] = await Promise.all([
      db.query('SELECT * FROM profile LIMIT 1'),
      db.query(
        `SELECT s.*, c.code as color_code FROM stats s
         LEFT JOIN colors c ON s.color_id = c.id
         WHERE s.status = true ORDER BY s.sort_order ASC`
      ),
      db.query(
        `SELECT s.*, c.code as color_code FROM skills s
         LEFT JOIN colors c ON s.color_id = c.id
         WHERE s.status = true ORDER BY s.sort_order ASC`
      ),
      db.query(
        `SELECT s.*, c.code as color_code FROM services s
         LEFT JOIN colors c ON s.color_id = c.id
         WHERE s.status = true ORDER BY s.sort_order ASC LIMIT 3`
      ),
      db.query(
        `SELECT p.*, c.name as category_name,
          COALESCE(ARRAY_AGG(json_build_object('id', t.id, 'name', t.name)) 
            FILTER (WHERE t.id IS NOT NULL), ARRAY[]::json[]) as technologies
         FROM projects p
         LEFT JOIN categories c ON p.category_id = c.id
         LEFT JOIN entity_technologies et ON et.entity_type = 'project' AND et.entity_id = p.id
         LEFT JOIN technologies t ON et.technology_id = t.id
         WHERE p.featured = true
         GROUP BY p.id, c.id
         ORDER BY p.sort_order ASC LIMIT 3`
      ),
      db.query('SELECT * FROM clients WHERE status = true ORDER BY id ASC LIMIT 5'),
    ])

    return {
      profile: profile[0],
      stats,
      skills,
      services,
      projects,
      clients,
    }
  } catch (error) {
    console.error('[queries] getHomeData error:', error)
    return {
      profile: null,
      stats: [],
      skills: [],
      services: [],
      projects: [],
      clients: [],
    }
  }
}

// ==================== ABOUT PAGE DATA ====================

export async function getAboutData() {
  try {
    const [profile, experience, education, skills, certifications] = await Promise.all([
      db.query('SELECT * FROM profile LIMIT 1'),
      db.query('SELECT * FROM experience WHERE status = true ORDER BY start_date DESC'),
      db.query('SELECT * FROM education WHERE status = true ORDER BY start_date DESC'),
      db.query(
        `SELECT s.*, c.code as color_code FROM skills s
         LEFT JOIN colors c ON s.color_id = c.id
         WHERE s.status = true ORDER BY s.sort_order ASC`
      ),
      db.query(
        'SELECT * FROM certifications WHERE status = true ORDER BY sort_order ASC'
      ),
    ])

    return {
      profile: profile[0],
      experience,
      education,
      skills,
      certifications,
    }
  } catch (error) {
    console.error('[queries] getAboutData error:', error)
    return {
      profile: null,
      experience: [],
      education: [],
      skills: [],
      certifications: [],
    }
  }
}

// ==================== DASHBOARD DATA ====================

export async function getDashboardStats() {
  try {
    const [projectsCount, skillsCount, servicesCount, experienceCount, educationCount] =
      await Promise.all([
        db.query('SELECT COUNT(*) as count FROM projects'),
        db.query('SELECT COUNT(*) as count FROM skills WHERE status = true'),
        db.query('SELECT COUNT(*) as count FROM services WHERE status = true'),
        db.query('SELECT COUNT(*) as count FROM experience WHERE status = true'),
        db.query('SELECT COUNT(*) as count FROM education WHERE status = true'),
      ])

    return {
      projects: projectsCount[0]?.count || 0,
      skills: skillsCount[0]?.count || 0,
      services: servicesCount[0]?.count || 0,
      experience: experienceCount[0]?.count || 0,
      education: educationCount[0]?.count || 0,
    }
  } catch (error) {
    console.error('[queries] getDashboardStats error:', error)
    return {
      projects: 0,
      skills: 0,
      services: 0,
      experience: 0,
      education: 0,
    }
  }
}
