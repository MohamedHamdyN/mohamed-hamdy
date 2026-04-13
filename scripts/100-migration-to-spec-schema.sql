-- ============================================
-- COMPREHENSIVE DATABASE MIGRATION
-- From Current Schema to Specification Schema
-- ============================================

-- ============================================
-- 1. CREATE MASTER TABLES (No Dependencies)
-- ============================================

-- Colors Table
CREATE TABLE IF NOT EXISTS colors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  code VARCHAR(7) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default colors from old schema
INSERT INTO colors (name, code) VALUES
  ('Blue', '#3B82F6'),
  ('Red', '#EF4444'),
  ('Green', '#10B981'),
  ('Purple', '#A855F7'),
  ('Yellow', '#FBBF24'),
  ('Pink', '#EC4899'),
  ('Cyan', '#06B6D4'),
  ('Orange', '#F97316'),
  ('Slate', '#64748B'),
  ('Indigo', '#4F46E5')
ON CONFLICT DO NOTHING;

-- Page Status Table
CREATE TABLE IF NOT EXISTS page_status (
  id SERIAL PRIMARY KEY,
  key VARCHAR(100) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  status BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO page_status (key, name, status) VALUES
  ('home', 'Home', true),
  ('about', 'About', true),
  ('projects', 'Projects', true),
  ('services', 'Services', true),
  ('contact', 'Contact', true),
  ('blog', 'Blog', false)
ON CONFLICT DO NOTHING;

-- ============================================
-- 2. RECREATE PROFILE TABLE (Exact Spec)
-- ============================================

-- Drop old profile if exists
DROP TABLE IF EXISTS profile CASCADE;

CREATE TABLE profile (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  job_title_1 VARCHAR(255),
  job_title_2 VARCHAR(255),
  email VARCHAR(255),
  phone_number VARCHAR(20),
  location VARCHAR(255),
  hero_description TEXT,
  description TEXT,
  special_description TEXT,
  quote TEXT,
  resume_url VARCHAR(2048),
  calendly_url VARCHAR(2048),
  avatar_url VARCHAR(2048),
  og_image_url VARCHAR(2048),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Migrate data from old profile
INSERT INTO profile (
  name, job_title_1, job_title_2, email, phone_number, location,
  hero_description, description, special_description, quote,
  resume_url, calendly_url, avatar_url, og_image_url
) 
SELECT 
  name, 
  title as job_title_1,
  short_title as job_title_2,
  email,
  phone as phone_number,
  location,
  hero_description,
  bio as description,
  about_intro as special_description,
  NULL as quote,
  resume_url,
  calendly_url,
  avatar_url,
  og_image_url
FROM profile
WHERE id = (SELECT id FROM profile ORDER BY id ASC LIMIT 1)
ON CONFLICT DO NOTHING;

-- ============================================
-- 3. CATEGORIES TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  status BOOLEAN DEFAULT true,
  color_id INTEGER REFERENCES colors(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Migrate from project_categories
INSERT INTO categories (name, slug, description, sort_order, status)
SELECT name, slug, description, "order" as sort_order, enabled as status
FROM project_categories
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- 4. TECHNOLOGIES TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS technologies (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  slug VARCHAR(255) NOT NULL UNIQUE,
  icon VARCHAR(255),
  color_id INTEGER REFERENCES colors(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert common technologies
INSERT INTO technologies (name, slug, icon) VALUES
  ('React', 'react', 'react'),
  ('TypeScript', 'typescript', 'typescript'),
  ('SQL', 'sql', 'database'),
  ('Python', 'python', 'python'),
  ('Power BI', 'power-bi', 'chart-bar'),
  ('Excel', 'excel', 'table'),
  ('Next.js', 'nextjs', 'nextjs'),
  ('PostgreSQL', 'postgresql', 'database'),
  ('Node.js', 'nodejs', 'nodejs'),
  ('JavaScript', 'javascript', 'javascript')
ON CONFLICT (name) DO NOTHING;

-- ============================================
-- 5. ENTITY_TECHNOLOGIES TABLE (Flexible Relations)
-- ============================================

CREATE TABLE IF NOT EXISTS entity_technologies (
  id SERIAL PRIMARY KEY,
  entity_type VARCHAR(50) NOT NULL, -- 'project', 'experience'
  entity_id INTEGER NOT NULL,
  technology_id INTEGER NOT NULL REFERENCES technologies(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_entity_tech UNIQUE(entity_type, entity_id, technology_id)
);

-- ============================================
-- 6. PROJECTS TABLE
-- ============================================

DROP TABLE IF EXISTS projects CASCADE;

CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  hero_description TEXT,
  category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  project_url VARCHAR(2048),
  linkedin_url VARCHAR(2048),
  presentation_url VARCHAR(2048),
  project_date DATE,
  featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  image_url VARCHAR(2048),
  status BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category_id);
CREATE INDEX IF NOT EXISTS idx_projects_date ON projects(project_date);

-- ============================================
-- 7. SKILLS TABLE
-- ============================================

DROP TABLE IF EXISTS skills CASCADE;

CREATE TABLE skills (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  color_id INTEGER REFERENCES colors(id) ON DELETE SET NULL,
  icon VARCHAR(255),
  status BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Migrate from resume_skills
INSERT INTO skills (title, status, sort_order)
SELECT name, enabled, "order"
FROM resume_skills
ON CONFLICT DO NOTHING;

-- ============================================
-- 8. STATS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS stats (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  value VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(255),
  color_id INTEGER REFERENCES colors(id) ON DELETE SET NULL,
  sort_order INTEGER DEFAULT 0,
  status BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default stats
INSERT INTO stats (title, value, description, icon) VALUES
  ('Projects Completed', '50+', 'Successful projects delivered', 'briefcase'),
  ('Clients Served', '30+', 'Happy and satisfied clients', 'users'),
  ('Years Experience', '5+', 'Years in data analytics', 'calendar'),
  ('Skills Mastered', '15+', 'Technical skills and tools', 'star')
ON CONFLICT DO NOTHING;

-- ============================================
-- 9. SERVICES TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS services (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(255),
  color_id INTEGER REFERENCES colors(id) ON DELETE SET NULL,
  features TEXT[] DEFAULT ARRAY[]::TEXT[],
  status BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Migrate from old services table
INSERT INTO services (title, description, icon, status, sort_order)
SELECT title, description, icon, enabled, "order"
FROM services
ON CONFLICT DO NOTHING;

-- ============================================
-- 10. EXPERIENCE TABLE
-- ============================================

DROP TABLE IF EXISTS experience CASCADE;

CREATE TABLE experience (
  id SERIAL PRIMARY KEY,
  job_title VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  description TEXT,
  start_date DATE,
  end_date DATE,
  logo VARCHAR(2048),
  status BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Migrate from experiences
INSERT INTO experience (job_title, description, start_date, status, sort_order)
SELECT title, details, NULL, enabled, "order"
FROM experiences
ON CONFLICT DO NOTHING;

-- ============================================
-- 11. EDUCATION TABLE
-- ============================================

DROP TABLE IF EXISTS education CASCADE;

CREATE TABLE education (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  university VARCHAR(255),
  degree VARCHAR(255),
  start_date DATE,
  end_date DATE,
  status BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Migrate from educations
INSERT INTO education (title, university, degree, status, sort_order)
SELECT degree, institution, degree, enabled, "order"
FROM educations
ON CONFLICT DO NOTHING;

-- ============================================
-- 12. CERTIFICATIONS TABLE
-- ============================================

DROP TABLE IF EXISTS certifications CASCADE;

CREATE TABLE certifications (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  issuer VARCHAR(255),
  issuer_date DATE,
  url VARCHAR(2048),
  description TEXT,
  status BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Migrate from old certifications
INSERT INTO certifications (title, issuer, issuer_date, url, description, status, sort_order)
SELECT title, issuer, issue_date::DATE, credential_url, description, enabled, "order"
FROM certifications
ON CONFLICT DO NOTHING;

-- ============================================
-- 13. CLIENTS TABLE
-- ============================================

DROP TABLE IF EXISTS clients CASCADE;

CREATE TABLE clients (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  website VARCHAR(2048),
  rating INTEGER,
  logo VARCHAR(2048),
  description TEXT,
  status BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Migrate from old clients
INSERT INTO clients (name, website, rating, logo, description, status, sort_order)
SELECT name, website, rating, logo_url, testimonial, enabled, "order"
FROM clients
ON CONFLICT DO NOTHING;

-- ============================================
-- 14. SOCIAL_MEDIA TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS social_media (
  id SERIAL PRIMARY KEY,
  platform VARCHAR(255) NOT NULL UNIQUE,
  url VARCHAR(2048),
  color_id INTEGER REFERENCES colors(id) ON DELETE SET NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Migrate from social_links
INSERT INTO social_media (platform, url, sort_order)
SELECT platform, url, "order"
FROM social_links
ON CONFLICT (platform) DO NOTHING;

-- ============================================
-- 15. BLOG TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS blog (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  hero_description TEXT,
  description TEXT,
  background VARCHAR(2048),
  color_id INTEGER REFERENCES colors(id) ON DELETE SET NULL,
  status BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 16. SETTINGS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS settings (
  id SERIAL PRIMARY KEY,
  admin_limit INTEGER DEFAULT 1,
  dashboard_status BOOLEAN DEFAULT true,
  open_to_work BOOLEAN DEFAULT false,
  official_color_id INTEGER REFERENCES colors(id) ON DELETE SET NULL,
  notifications JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default settings
INSERT INTO settings (admin_limit, dashboard_status, open_to_work)
VALUES (1, true, true)
ON CONFLICT DO NOTHING;

-- ============================================
-- 17. ADMINS TABLE (Already exists)
-- ============================================
-- Structure preserved from original

-- ============================================
-- 18. ADMIN_SESSIONS TABLE (Already exists)
-- ============================================
-- Structure preserved from original

-- ============================================
-- CREATE INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX IF NOT EXISTS idx_categories_status ON categories(status);
CREATE INDEX IF NOT EXISTS idx_categories_color ON categories(color_id);
CREATE INDEX IF NOT EXISTS idx_skills_status ON skills(status);
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category_id);
CREATE INDEX IF NOT EXISTS idx_skills_color ON skills(color_id);
CREATE INDEX IF NOT EXISTS idx_stats_status ON stats(status);
CREATE INDEX IF NOT EXISTS idx_stats_color ON stats(color_id);
CREATE INDEX IF NOT EXISTS idx_services_status ON services(status);
CREATE INDEX IF NOT EXISTS idx_services_color ON services(color_id);
CREATE INDEX IF NOT EXISTS idx_experience_status ON experience(status);
CREATE INDEX IF NOT EXISTS idx_education_status ON education(status);
CREATE INDEX IF NOT EXISTS idx_certifications_status ON certifications(status);
CREATE INDEX IF NOT EXISTS idx_clients_status ON clients(status);
CREATE INDEX IF NOT EXISTS idx_blog_status ON blog(status);
CREATE INDEX IF NOT EXISTS idx_page_status_key ON page_status(key);
CREATE INDEX IF NOT EXISTS idx_entity_technologies ON entity_technologies(entity_type, entity_id);

-- ============================================
-- VERIFY FOREIGN KEY CONSTRAINTS
-- ============================================

ALTER TABLE categories ADD CONSTRAINT fk_categories_color FOREIGN KEY (color_id) REFERENCES colors(id) ON DELETE SET NULL;
ALTER TABLE projects ADD CONSTRAINT fk_projects_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL;
ALTER TABLE skills ADD CONSTRAINT fk_skills_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL;
ALTER TABLE skills ADD CONSTRAINT fk_skills_color FOREIGN KEY (color_id) REFERENCES colors(id) ON DELETE SET NULL;
ALTER TABLE stats ADD CONSTRAINT fk_stats_color FOREIGN KEY (color_id) REFERENCES colors(id) ON DELETE SET NULL;
ALTER TABLE services ADD CONSTRAINT fk_services_color FOREIGN KEY (color_id) REFERENCES colors(id) ON DELETE SET NULL;
ALTER TABLE social_media ADD CONSTRAINT fk_social_color FOREIGN KEY (color_id) REFERENCES colors(id) ON DELETE SET NULL;
ALTER TABLE blog ADD CONSTRAINT fk_blog_color FOREIGN KEY (color_id) REFERENCES colors(id) ON DELETE SET NULL;
ALTER TABLE settings ADD CONSTRAINT fk_settings_color FOREIGN KEY (official_color_id) REFERENCES colors(id) ON DELETE SET NULL;

-- ============================================
-- MIGRATION COMPLETE
-- ============================================

SELECT 'Migration to specification schema completed successfully!' as status;
