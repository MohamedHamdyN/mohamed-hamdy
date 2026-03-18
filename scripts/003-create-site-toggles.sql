-- Create site_toggles table to store toggle settings in database instead of env vars
CREATE TABLE IF NOT EXISTS site_toggles (
  id SERIAL PRIMARY KEY,
  key VARCHAR(255) NOT NULL UNIQUE,
  value BOOLEAN DEFAULT true,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default toggle values
INSERT INTO site_toggles (key, value, description) VALUES
  ('website', true, 'Main website visibility'),
  ('projects_page', true, 'Projects page visibility'),
  ('services_page', true, 'Services page visibility'),
  ('about_page', true, 'About page visibility'),
  ('contact_page', true, 'Contact page visibility'),
  ('resume_page', true, 'Resume page visibility'),
  ('projects_home', true, 'Projects section on home page'),
  ('services_home', true, 'Services section on home page'),
  ('about_home', true, 'About section on home page'),
  ('skills', true, 'Skills section visibility'),
  ('why_work_with_me', true, 'Why work with me section'),
  ('clients', true, 'Clients section visibility'),
  ('contact_home', true, 'Contact section on home page'),
  ('freelance_platforms', true, 'Freelance platforms on services page'),
  ('payment_methods', true, 'Payment methods on services page'),
  ('contact_form', true, 'Contact form visibility'),
  ('calendly_feature', true, 'Calendly feature visibility')
ON CONFLICT (key) DO NOTHING;
