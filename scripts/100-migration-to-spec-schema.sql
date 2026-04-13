-- ============================================
-- SAFE DATABASE MIGRATION
-- Preserves all existing data and adds missing tables
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

-- Insert default colors
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

-- ============================================
-- 2. CREATE TECHNOLOGIES TABLE
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
-- 3. ENTITY_TECHNOLOGIES TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS entity_technologies (
  id SERIAL PRIMARY KEY,
  entity_type VARCHAR(50) NOT NULL,
  entity_id INTEGER NOT NULL,
  technology_id INTEGER NOT NULL REFERENCES technologies(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_entity_tech UNIQUE(entity_type, entity_id, technology_id)
);

-- ============================================
-- 4. ADD MISSING COLUMNS TO EXISTING TABLES
-- ============================================

-- Add missing columns to profile
ALTER TABLE profile ADD COLUMN IF NOT EXISTS show_location BOOLEAN DEFAULT true;
ALTER TABLE profile ADD COLUMN IF NOT EXISTS show_phone BOOLEAN DEFAULT true;
ALTER TABLE profile ADD COLUMN IF NOT EXISTS show_resume BOOLEAN DEFAULT true;
ALTER TABLE profile ADD COLUMN IF NOT EXISTS show_calendly BOOLEAN DEFAULT true;

-- Add missing columns to projects
ALTER TABLE projects ADD COLUMN IF NOT EXISTS slug VARCHAR(255);
ALTER TABLE projects ADD COLUMN IF NOT EXISTS short_description TEXT;

-- Add missing columns to resume_skills (for colors)
ALTER TABLE resume_skills ADD COLUMN IF NOT EXISTS color VARCHAR(7);

-- Add missing columns to services if needed
ALTER TABLE services ADD COLUMN IF NOT EXISTS color VARCHAR(7);

-- ============================================
-- 5. CREATE INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category_id);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_order ON projects("order");
CREATE INDEX IF NOT EXISTS idx_services_enabled ON services(enabled);
CREATE INDEX IF NOT EXISTS idx_services_order ON services("order");
CREATE INDEX IF NOT EXISTS idx_clients_enabled ON clients(enabled);
CREATE INDEX IF NOT EXISTS idx_clients_order ON clients("order");
CREATE INDEX IF NOT EXISTS idx_certifications_enabled ON certifications(enabled);
CREATE INDEX IF NOT EXISTS idx_certifications_order ON certifications("order");
CREATE INDEX IF NOT EXISTS idx_educations_enabled ON educations(enabled);
CREATE INDEX IF NOT EXISTS idx_educations_order ON educations("order");
CREATE INDEX IF NOT EXISTS idx_experiences_enabled ON experiences(enabled);
CREATE INDEX IF NOT EXISTS idx_experiences_order ON experiences("order");
CREATE INDEX IF NOT EXISTS idx_resume_skills_enabled ON resume_skills(enabled);
CREATE INDEX IF NOT EXISTS idx_resume_skills_order ON resume_skills("order");
CREATE INDEX IF NOT EXISTS idx_social_links_enabled ON social_links(enabled);
CREATE INDEX IF NOT EXISTS idx_social_links_order ON social_links("order");
CREATE INDEX IF NOT EXISTS idx_technologies_slug ON technologies(slug);
CREATE INDEX IF NOT EXISTS idx_entity_technologies_type_id ON entity_technologies(entity_type, entity_id);

-- ============================================
-- MIGRATION COMPLETE
-- ============================================

-- All tables are now ready for full application usage
-- Existing data has been preserved
-- New features and tables have been added
