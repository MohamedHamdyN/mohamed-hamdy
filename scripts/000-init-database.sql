-- Drop existing tables if they exist
DROP TABLE IF EXISTS admin_sessions CASCADE;
DROP TABLE IF EXISTS admins CASCADE;
DROP TABLE IF EXISTS project_images CASCADE;
DROP TABLE IF EXISTS project_details CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS clients CASCADE;
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS social_links CASCADE;
DROP TABLE IF EXISTS skills CASCADE;
DROP TABLE IF EXISTS about_sections CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
DROP TABLE IF EXISTS site_settings CASCADE;

-- Create profiles table
CREATE TABLE profiles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  title VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(20),
  location VARCHAR(255),
  bio TEXT,
  avatar_url VARCHAR(2048),
  resume_url VARCHAR(2048),
  calendly_url VARCHAR(2048),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create admin table
CREATE TABLE admins (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create admin sessions table
CREATE TABLE admin_sessions (
  id SERIAL PRIMARY KEY,
  admin_id INTEGER NOT NULL,
  token VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE CASCADE
);

-- Create social_links table
CREATE TABLE social_links (
  id SERIAL PRIMARY KEY,
  platform VARCHAR(100) NOT NULL,
  url VARCHAR(2048) NOT NULL,
  enabled BOOLEAN DEFAULT true,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create skills table
CREATE TABLE skills (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(100),
  color VARCHAR(100),
  enabled BOOLEAN DEFAULT true,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create projects table
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  short_description TEXT,
  description TEXT,
  category_id INTEGER NOT NULL,
  image_url VARCHAR(2048),
  project_url VARCHAR(2048),
  linkedin_url VARCHAR(2048),
  technologies TEXT[],
  date VARCHAR(10),
  featured BOOLEAN DEFAULT false,
  draft BOOLEAN DEFAULT false,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create services table
CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(100),
  color VARCHAR(100),
  features TEXT[],
  enabled BOOLEAN DEFAULT true,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create clients table
CREATE TABLE clients (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  logo_url VARCHAR(2048),
  testimonial TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  website VARCHAR(2048),
  enabled BOOLEAN DEFAULT true,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create site_settings table
CREATE TABLE site_settings (
  id SERIAL PRIMARY KEY,
  key VARCHAR(255) UNIQUE NOT NULL,
  value TEXT,
  type VARCHAR(50) DEFAULT 'string',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_featured ON projects(featured);
CREATE INDEX idx_projects_draft ON projects(draft);
CREATE INDEX idx_social_links_enabled ON social_links(enabled);
CREATE INDEX idx_skills_enabled ON skills(enabled);
CREATE INDEX idx_clients_enabled ON clients(enabled);
CREATE INDEX idx_services_enabled ON services(enabled);
CREATE INDEX idx_site_settings_key ON site_settings(key);

-- Seed profile data
INSERT INTO profiles (name, title, email, bio, avatar_url, resume_url, calendly_url, location, phone)
VALUES (
  'Mohamed Hamdy',
  'Data Analyst & Financial Accountant',
  'muhamedhamdynour@gmail.com',
  'I''m a dedicated Data Analyst and Financial Accountant with a passion for transforming complex financial data into actionable insights that drive business decisions.',
  'https://i.imgur.com/zziw256.png',
  'https://drive.google.com/file/d/18GP_gCewc2svPC0-F62o_Nm0VwtlcK0k/view?usp=drive_link',
  'https://calendly.com/mohamedhamdynour/30min',
  '',
  ''
);

-- Seed social links
INSERT INTO social_links (platform, url, enabled, "order")
VALUES
  ('LinkedIn', 'https://linkedin.com/in/mohamedhamdynour', true, 1),
  ('GitHub', 'https://github.com/mohamedhamdynour', true, 2),
  ('Twitter', 'https://twitter.com/MoBinHamdy', true, 3),
  ('Instagram', 'https://instagram.com/mohamedhamdyn', true, 4),
  ('DataCamp', 'https://www.datacamp.com/portfolio/mohamedhamdynour', true, 5),
  ('Facebook', 'https://facebook.com/mohamedhamdyn', true, 6);

-- Seed skills
INSERT INTO skills (name, description, icon, color, enabled, "order")
VALUES
  ('Financial Data Analysis', 'Analyzing financial statements and business data', 'BarChart2', 'text-blue-500', true, 1),
  ('Data Visualization', 'Creating insightful financial dashboards', 'PieChart', 'text-purple-500', true, 2),
  ('Accounting Analytics', 'Applying analytics to financial reporting and auditing', 'FileText', 'text-green-500', true, 3),
  ('Statistical Analysis', 'Using statistical methods for financial forecasting', 'LineChart', 'text-yellow-500', true, 4),
  ('SQL for Finance', 'Querying financial databases for insights', 'Database', 'text-red-500', true, 5),
  ('Python for Accounting', 'Automating financial analysis and reporting', 'Code', 'text-cyan-500', true, 6),
  ('Power BI', 'Building interactive financial dashboards', 'TrendingUp', 'text-orange-500', true, 7),
  ('Cost and Budget Analysis', 'Analyzing budgets and cost structures', 'DollarSign', 'text-indigo-500', true, 8),
  ('Financial Forecasting', 'Predicting financial trends using data models', 'Activity', 'text-teal-500', true, 9),
  ('Risk Analysis', 'Assessing financial risks through data analytics', 'Shield', 'text-gray-500', true, 10);

-- Seed projects
INSERT INTO projects (title, slug, short_description, description, category_id, image_url, project_url, linkedin_url, technologies, date, featured, draft, "order")
VALUES
  (
    'E-commerce Sales Dashboard',
    'ecommerce-sales-dashboard',
    'Interactive dashboard analyzing sales trends',
    'Developed an interactive dashboard using Power BI to analyze e-commerce sales trends, customer behavior, and product performance. The dashboard provides actionable insights that helped increase revenue by 15% and optimize marketing strategies.',
    1,
    'https://imgur.com/BJcBweu.png',
    'https://example.com/project1',
    'https://linkedin.com/in/mohamedhamdynour/project1',
    ARRAY['Power BI', 'SQL', 'Excel', 'DAX'],
    '2023-05',
    true,
    false,
    1
  ),
  (
    'Customer Churn Prediction Model',
    'customer-churn-prediction',
    'ML model to predict customer churn',
    'Built a machine learning model to predict customer churn for a telecommunications company. The model achieved 87% accuracy and helped the company implement targeted retention strategies, reducing churn rate by 23%.',
    2,
    '',
    '',
    '',
    ARRAY['Python', 'Scikit-learn', 'TensorFlow', 'Pandas', 'Matplotlib'],
    '2023-03',
    true,
    false,
    2
  ),
  (
    'Financial Performance Analysis',
    'financial-performance-analysis',
    'Comprehensive financial data analysis',
    'Conducted a comprehensive analysis of financial data for a multinational corporation. Identified key trends, anomalies, and opportunities for cost reduction, resulting in savings of over $500,000 annually.',
    3,
    '',
    '',
    'https://linkedin.com/in/mohamedhamdynour/project3',
    ARRAY['Tableau', 'Excel', 'SQL', 'R'],
    '2023-01',
    true,
    false,
    3
  ),
  (
    'Market Research Statistical Analysis',
    'market-research-analysis',
    'Statistical analysis of market research data',
    'Performed statistical analysis on market research data to identify consumer preferences and market trends. The insights guided product development and marketing strategies, contributing to a 20% increase in market share.',
    4,
    '',
    'https://example.com/project4',
    '',
    ARRAY['R', 'SPSS', 'Python', 'Pandas', 'NumPy'],
    '2022-11',
    true,
    false,
    4
  );

-- Seed services
INSERT INTO services (title, description, icon, color, features, enabled, "order")
VALUES
  (
    'Data Analysis',
    'Comprehensive analysis of your data to extract valuable insights',
    'BarChart2',
    'bg-blue-500',
    ARRAY['Exploratory data analysis', 'Pattern recognition', 'Trend identification', 'Anomaly detection', 'Correlation analysis'],
    true,
    1
  ),
  (
    'Data Visualization',
    'Transform complex data into clear, compelling visual stories',
    'PieChart',
    'bg-purple-500',
    ARRAY['Interactive dashboards', 'Custom charts and graphs', 'Infographics', 'Real-time data visualization', 'Executive reports'],
    true,
    2
  ),
  (
    'Business Intelligence',
    'Transform raw data into actionable business insights',
    'Activity',
    'bg-yellow-500',
    ARRAY['KPI development and tracking', 'Performance analytics', 'Competitive analysis', 'Market research', 'Strategic recommendations'],
    true,
    3
  ),
  (
    'Machine Learning Solutions',
    'Custom machine learning models to solve complex business problems',
    'Brain',
    'bg-cyan-500',
    ARRAY['Classification models', 'Regression models', 'Clustering algorithms', 'Natural language processing', 'Computer vision solutions'],
    true,
    4
  );

-- Seed clients
INSERT INTO clients (name, logo_url, testimonial, rating, website, enabled, "order")
VALUES
  (
    'NovaTech Solutions',
    'https://i.imgur.com/zziw256.png',
    'The data analysis provided crucial insights that helped us refine our digital transformation strategy.',
    5,
    'https://novatech-solutions.com',
    true,
    1
  ),
  (
    'Skyline Finance',
    'https://i.imgur.com/zziw256.png',
    'The financial forecasting models helped us optimize our risk management and investment planning.',
    5,
    'https://skyline-finance.com',
    true,
    2
  ),
  (
    'SwiftRetail',
    'https://i.imgur.com/zziw256.png',
    'The customer segmentation analysis significantly improved our targeted marketing campaigns.',
    4,
    'https://swift-retail.com',
    true,
    3
  ),
  (
    'MediCare Innovations',
    'https://i.imgur.com/zziw256.png',
    'Predictive analytics enabled us to enhance patient care and optimize resource allocation.',
    5,
    'https://medicare-innovations.com',
    true,
    4
  ),
  (
    'BrightLearn Academy',
    'https://i.imgur.com/zziw256.png',
    'The learning analytics provided valuable insights that improved student engagement and performance.',
    4,
    'https://brightlearn-academy.com',
    true,
    5
  );

-- Seed site settings
INSERT INTO site_settings (key, value, type)
VALUES
  ('site_title', 'Mohamed Hamdy - Data Analyst & Financial Accountant', 'string'),
  ('site_description', 'Data Analyst & Financial Accountant with expertise in transforming complex data into actionable insights.', 'string'),
  ('og_image', 'https://i.imgur.com/zziw256.png', 'string'),
  ('site_url', 'https://yourdomain.com', 'string'),
  ('maintenance_mode', 'false', 'boolean');
