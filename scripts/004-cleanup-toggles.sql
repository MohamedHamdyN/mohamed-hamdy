-- Remove unnecessary toggles from site_toggles table
DELETE FROM site_toggles 
WHERE key IN ('contact_form', 'services_home', 'why_work_with_me');

-- Ensure all necessary toggles exist with default values
INSERT INTO site_toggles (key, value, updated_at)
VALUES 
  ('maintenance_mode', false, NOW()),
  ('about_page', true, NOW()),
  ('projects_page', true, NOW()),
  ('services_page', true, NOW()),
  ('contact_page', true, NOW()),
  ('blog_section', true, NOW()),
  ('certifications_section', true, NOW()),
  ('experience_section', true, NOW()),
  ('education_section', true, NOW()),
  ('clients_section', true, NOW()),
  ('featured_projects', true, NOW()),
  ('skills_section', true, NOW()),
  ('testimonials_section', true, NOW())
ON CONFLICT (key) DO NOTHING;
