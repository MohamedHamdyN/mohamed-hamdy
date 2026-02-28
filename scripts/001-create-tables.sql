-- Create profile table
CREATE TABLE IF NOT EXISTS profile (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  job_title VARCHAR(255),
  short_title VARCHAR(255),
  hero_description TEXT,
  hero_image_type VARCHAR(50) CHECK (hero_image_type IN ('personal', 'logo')) DEFAULT 'logo',
  hero_image_url VARCHAR(2048),
  location VARCHAR(255),
  open_to_work BOOLEAN DEFAULT false,
  email VARCHAR(255),
  phone VARCHAR(20),
  bio TEXT,
  short_bio TEXT,
  long_bio TEXT,
  resume_url VARCHAR(2048),
  calendly_url VARCHAR(2048),
  avatar_url VARCHAR(2048),
  og_image_url VARCHAR(2048),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create social_links table
CREATE TABLE IF NOT EXISTS social_links (
  id SERIAL PRIMARY KEY,
  platform_name VARCHAR(100) NOT NULL,
  url VARCHAR(2048) NOT NULL,
  icon_name VARCHAR(100),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create about_sections table
CREATE TABLE IF NOT EXISTS about_sections (
  id SERIAL PRIMARY KEY,
  type VARCHAR(50) CHECK (type IN ('short', 'full')) NOT NULL,
  content TEXT NOT NULL,
  language VARCHAR(10) CHECK (language IN ('en', 'ar')) DEFAULT 'en',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
  id SERIAL PRIMARY KEY,
  category VARCHAR(100) NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  level VARCHAR(50) CHECK (level IN ('beginner', 'intermediate', 'advanced')) DEFAULT 'intermediate',
  icon_name VARCHAR(100),
  color VARCHAR(100),
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  short_description TEXT,
  description TEXT,
  category VARCHAR(100) NOT NULL,
  tools_summary TEXT,
  featured BOOLEAN DEFAULT false,
  status VARCHAR(50) CHECK (status IN ('draft', 'published')) DEFAULT 'draft',
  image_url VARCHAR(2048),
  project_url VARCHAR(2048),
  linkedin_url VARCHAR(2048),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create project_details table
CREATE TABLE IF NOT EXISTS project_details (
  id SERIAL PRIMARY KEY,
  project_id INTEGER NOT NULL UNIQUE,
  problem TEXT,
  data_used TEXT,
  analysis_process TEXT,
  business_insights TEXT,
  outcome TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- Create project_images table
CREATE TABLE IF NOT EXISTS project_images (
  id SERIAL PRIMARY KEY,
  project_id INTEGER NOT NULL,
  image_url VARCHAR(2048) NOT NULL,
  order_index INTEGER DEFAULT 0,
  is_cover BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- Create site_settings table (single row only)
CREATE TABLE IF NOT EXISTS site_settings (
  id SERIAL PRIMARY KEY,
  site_status VARCHAR(50) CHECK (site_status IN ('online', 'maintenance')) DEFAULT 'online',
  default_theme VARCHAR(50) CHECK (default_theme IN ('dark', 'light')) DEFAULT 'dark',
  allow_theme_toggle BOOLEAN DEFAULT true,
  default_language VARCHAR(10) CHECK (default_language IN ('en', 'ar')) DEFAULT 'en',
  allow_language_toggle BOOLEAN DEFAULT false,
  meta_title VARCHAR(255),
  meta_description TEXT,
  og_image_url VARCHAR(2048),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category);
CREATE INDEX IF NOT EXISTS idx_social_links_active ON social_links(is_active);
CREATE INDEX IF NOT EXISTS idx_project_images_project ON project_images(project_id);

-- Insert default site settings (only one row)
INSERT INTO site_settings (id, site_status, default_theme, allow_theme_toggle, default_language, allow_language_toggle, meta_title, meta_description, og_image_url)
VALUES (1, 'online', 'dark', true, 'en', false, 'Mohamed Hamdy - Data Analyst', 'Data Analyst & Financial Accountant Portfolio', 'https://i.imgur.com/zziw256.png')
ON CONFLICT (id) DO NOTHING;
