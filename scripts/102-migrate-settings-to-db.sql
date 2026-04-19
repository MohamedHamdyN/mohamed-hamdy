-- Migrate all site settings from admin/toggle.ts to site_settings table

-- Delete old settings if any exist
DELETE FROM site_settings WHERE key IN (
  'website', 'maintenance_mode', 'about_page', 'projects_page', 'services_page', 'contact_page',
  'skills', 'why_work_with_me', 'projects_home', 'clients', 'contact_home',
  'certifications_section', 'experience_section', 'education_section', 'testimonials_section', 'blog_section',
  'calendly_feature', 'freelance_platforms', 'payment_methods'
);

-- Insert all settings into database
INSERT INTO site_settings (key, type, value) VALUES
  -- Website status
  ('website', 'boolean', 'true'),
  ('maintenance_mode', 'boolean', 'false'),
  
  -- Page toggles
  ('about_page', 'boolean', 'true'),
  ('projects_page', 'boolean', 'true'),
  ('services_page', 'boolean', 'true'),
  ('contact_page', 'boolean', 'true'),
  
  -- Home page sections
  ('skills', 'boolean', 'true'),
  ('why_work_with_me', 'boolean', 'true'),
  ('projects_home', 'boolean', 'true'),
  ('clients', 'boolean', 'true'),
  ('contact_home', 'boolean', 'true'),
  
  -- Other sections
  ('certifications_section', 'boolean', 'true'),
  ('experience_section', 'boolean', 'true'),
  ('education_section', 'boolean', 'true'),
  ('testimonials_section', 'boolean', 'true'),
  ('blog_section', 'boolean', 'false'),
  
  -- Feature toggles
  ('calendly_feature', 'boolean', 'true'),
  ('freelance_platforms', 'boolean', 'false'),
  ('payment_methods', 'boolean', 'false'),
  
  -- Home sections order
  ('home_section_skills_order', 'integer', '1'),
  ('home_section_clients_order', 'integer', '2'),
  ('home_section_projects_order', 'integer', '3'),
  ('home_section_contact_order', 'integer', '4')
ON CONFLICT DO NOTHING;

-- Add index for faster lookups
CREATE INDEX IF NOT EXISTS idx_site_settings_key ON site_settings(key);

SELECT 'Site settings migrated successfully' as status;
