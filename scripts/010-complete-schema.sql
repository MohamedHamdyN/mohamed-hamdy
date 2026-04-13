-- Complete Database Schema for Portfolio Website
-- Created according to full specifications

-- Colors table (MASTER - must be created first)
CREATE TABLE IF NOT EXISTS colors (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  code CHAR(7) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Profile table
CREATE TABLE IF NOT EXISTS profile (
  id SERIAL PRIMARY KEY,
  name TEXT,
  job_title_1 TEXT,
  job_title_2 TEXT,
  email VARCHAR(100),
  phone_number VARCHAR(20),
  location TEXT,
  hero_description TEXT,
  description TEXT,
  special_description TEXT,
  quote VARCHAR(150),
  resume_url VARCHAR,
  calendly_url VARCHAR,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  sort_order INTEGER UNIQUE,
  status BOOLEAN DEFAULT true,
  color_id INTEGER DEFAULT 1 REFERENCES colors(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Technologies table
CREATE TABLE IF NOT EXISTS technologies (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT UNIQUE,
  icon TEXT,
  color_id INTEGER REFERENCES colors(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT NOT NULL,
  hero_description TEXT,
  category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE SET NULL,
  project_url TEXT,
  linkedin_url TEXT,
  presentation_url TEXT,
  project_date DATE,
  featured BOOLEAN DEFAULT false,
  sort_order INTEGER UNIQUE,
  image_url TEXT,
  status BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Entity Technologies relation table
CREATE TABLE IF NOT EXISTS entity_technologies (
  id SERIAL PRIMARY KEY,
  entity_type TEXT NOT NULL,
  entity_id INTEGER NOT NULL,
  technology_id INTEGER NOT NULL REFERENCES technologies(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(entity_type, entity_id, technology_id)
);

-- Skills table
CREATE TABLE IF NOT EXISTS skills (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category_id INTEGER REFERENCES categories(id),
  color_id INTEGER DEFAULT 1 REFERENCES colors(id),
  icon TEXT,
  status BOOLEAN DEFAULT true,
  sort_order INTEGER UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Services table
CREATE TABLE IF NOT EXISTS services (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(100),
  color_id INTEGER DEFAULT 1 REFERENCES colors(id),
  features TEXT[],
  status BOOLEAN DEFAULT true,
  sort_order INTEGER UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Experience table
CREATE TABLE IF NOT EXISTS experience (
  id SERIAL PRIMARY KEY,
  job_title TEXT NOT NULL,
  company TEXT NOT NULL,
  description TEXT,
  start_date DATE NOT NULL,
  end_date DATE,
  logo TEXT,
  status BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Education table
CREATE TABLE IF NOT EXISTS education (
  id SERIAL PRIMARY KEY,
  title TEXT,
  university TEXT,
  degree VARCHAR(50),
  start_date DATE NOT NULL,
  end_date DATE,
  status BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Certifications table
CREATE TABLE IF NOT EXISTS certifications (
  id SERIAL PRIMARY KEY,
  title TEXT,
  issuer TEXT,
  issuer_date DATE,
  url TEXT,
  description TEXT,
  status BOOLEAN DEFAULT true,
  sort_order INTEGER UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Blog table
CREATE TABLE IF NOT EXISTS blog (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  hero_description VARCHAR(200),
  description TEXT,
  background TEXT,
  status BOOLEAN DEFAULT true,
  color_id INTEGER DEFAULT 1 REFERENCES colors(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Clients table
CREATE TABLE IF NOT EXISTS clients (
  id SERIAL PRIMARY KEY,
  name TEXT,
  website TEXT,
  rating INTEGER DEFAULT 5,
  logo TEXT,
  status BOOLEAN DEFAULT true,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Social Media table
CREATE TABLE IF NOT EXISTS social_media (
  id SERIAL PRIMARY KEY,
  platform TEXT NOT NULL,
  url TEXT,
  color_id INTEGER DEFAULT 1 REFERENCES colors(id),
  sort_order INTEGER UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Stats table
CREATE TABLE IF NOT EXISTS stats (
  id SERIAL PRIMARY KEY,
  title TEXT,
  value INTEGER,
  description TEXT,
  icon TEXT,
  color_id INTEGER DEFAULT 1 REFERENCES colors(id),
  sort_order INTEGER UNIQUE,
  status BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Page Status table (Feature Flags)
CREATE TABLE IF NOT EXISTS page_status (
  id SERIAL PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  name TEXT,
  status BOOLEAN DEFAULT true,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Admins table
CREATE TABLE IF NOT EXISTS admins (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Admin Sessions table
CREATE TABLE IF NOT EXISTS admin_sessions (
  id SERIAL PRIMARY KEY,
  admin_id INTEGER NOT NULL REFERENCES admins(id) ON DELETE CASCADE,
  token VARCHAR(255) NOT NULL UNIQUE,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Settings table
CREATE TABLE IF NOT EXISTS settings (
  id SERIAL PRIMARY KEY,
  admin_limit INTEGER DEFAULT 2,
  dashboard_status BOOLEAN DEFAULT true,
  open_to_work BOOLEAN DEFAULT true,
  official_color_id INTEGER DEFAULT 1 REFERENCES colors(id),
  notifications JSONB,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Indexes for performance
CREATE INDEX IF NOT EXISTS idx_projects_category_id ON projects(category_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_skills_status ON skills(status);
CREATE INDEX IF NOT EXISTS idx_skills_category_id ON skills(category_id);
CREATE INDEX IF NOT EXISTS idx_entity_technologies_lookup ON entity_technologies(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_entity_technologies_technology_id ON entity_technologies(technology_id);
CREATE INDEX IF NOT EXISTS idx_categories_status ON categories(status);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_admin_id ON admin_sessions(admin_id);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_token ON admin_sessions(token);

-- Insert default color if not exists
INSERT INTO colors (name, code) VALUES ('Blue', '#3b82f6') 
ON CONFLICT DO NOTHING;

-- Insert page status entries if not exists
INSERT INTO page_status (key, name, status) VALUES
  ('home', 'Home', true),
  ('about', 'About', true),
  ('projects', 'Projects', true),
  ('services', 'Services', true),
  ('blog', 'Blog', true),
  ('contact', 'Contact', true)
ON CONFLICT DO NOTHING;

-- Insert default settings if not exists
INSERT INTO settings (admin_limit, dashboard_status, open_to_work) 
SELECT 2, true, true
WHERE NOT EXISTS (SELECT 1 FROM settings);
