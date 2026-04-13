-- ============================================
-- PHASE 1: SECURITY & DATA INTEGRITY
-- Critical Constraints & Indexes
-- ============================================

-- ============================================
-- 1. UNIQUE CONSTRAINTS
-- ============================================

-- Prevent duplicate technologies per project
ALTER TABLE entity_technologies ADD CONSTRAINT IF NOT EXISTS unique_entity_tech 
  UNIQUE(entity_type, entity_id, technology_id);

-- Unique slugs for categories
ALTER TABLE project_categories ADD CONSTRAINT IF NOT EXISTS unique_category_slug UNIQUE(slug);

-- Unique slugs for projects (if slug column exists)
ALTER TABLE projects ADD CONSTRAINT IF NOT EXISTS unique_project_slug UNIQUE(slug);

-- ============================================
-- 2. COMPOSITE INDEXES (Status First!)
-- Critical for filtering queries
-- ============================================

-- Projects: Filter by draft status, then sort by featured/order
CREATE INDEX IF NOT EXISTS idx_projects_draft_featured_order 
  ON projects(draft, featured, "order");

-- Projects: Filter by category AND draft status
CREATE INDEX IF NOT EXISTS idx_projects_category_draft_order
  ON projects(category_id, draft, "order");

-- Services: Filter by enabled status
CREATE INDEX IF NOT EXISTS idx_services_enabled_order
  ON services(enabled, "order");

-- Skills: Filter by enabled status
CREATE INDEX IF NOT EXISTS idx_resume_skills_enabled_order
  ON resume_skills(enabled, "order");

-- Clients: Filter by enabled status
CREATE INDEX IF NOT EXISTS idx_clients_enabled_order
  ON clients(enabled, "order");

-- Experiences: Filter by enabled status
CREATE INDEX IF NOT EXISTS idx_experiences_enabled_order
  ON experiences(enabled, "order");

-- Educations: Filter by enabled status
CREATE INDEX IF NOT EXISTS idx_educations_enabled_order
  ON educations(enabled, "order");

-- Certifications: Filter by enabled status
CREATE INDEX IF NOT EXISTS idx_certifications_enabled_order
  ON certifications(enabled, "order");

-- ============================================
-- 3. FOREIGN KEY RELATIONSHIPS
-- Ensure referential integrity
-- ============================================

-- Projects to Categories (already exists, verify)
ALTER TABLE projects DROP CONSTRAINT IF EXISTS fk_projects_category;
ALTER TABLE projects ADD CONSTRAINT fk_projects_category 
  FOREIGN KEY (category_id) REFERENCES project_categories(id) ON DELETE SET NULL;

-- Entity Technologies (technologies must exist)
ALTER TABLE entity_technologies DROP CONSTRAINT IF EXISTS fk_entity_tech_technology;
ALTER TABLE entity_technologies ADD CONSTRAINT fk_entity_tech_technology
  FOREIGN KEY (technology_id) REFERENCES technologies(id) ON DELETE CASCADE;

-- ============================================
-- 4. PERFORMANCE INDEXES (Additional)
-- ============================================

-- Index for technology lookups
CREATE INDEX IF NOT EXISTS idx_technologies_slug
  ON technologies(slug);

-- Index for entity_technologies lookups
CREATE INDEX IF NOT EXISTS idx_entity_technologies_entity
  ON entity_technologies(entity_type, entity_id);

-- Index for profile lookups (single record)
CREATE INDEX IF NOT EXISTS idx_profile_primary
  ON profile(id);

-- ============================================
-- VERIFICATION
-- ============================================

SELECT 'Constraints migration completed successfully!' as status;
