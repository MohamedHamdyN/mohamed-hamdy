-- Create profile table
CREATE TABLE IF NOT EXISTS profile (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  title2 VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  location VARCHAR(255),
  bio TEXT,
  short_bio TEXT,
  long_bio TEXT,
  logo TEXT,
  favicon TEXT,
  avatar TEXT,
  default_project_image TEXT,
  default_client_logo TEXT,
  default_platform_logo TEXT,
  og_image TEXT,
  resume_url TEXT,
  calendly_url TEXT,
  social_links JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(100),
  color VARCHAR(50),
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create work_reasons table
CREATE TABLE IF NOT EXISTS work_reasons (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(100),
  color VARCHAR(50),
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create clients table
CREATE TABLE IF NOT EXISTS clients (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  logo TEXT,
  testimonial TEXT,
  rating INTEGER DEFAULT 5,
  website TEXT,
  last_project TEXT,
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create project_categories table
CREATE TABLE IF NOT EXISTS project_categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  short_description TEXT,
  category_id INTEGER REFERENCES project_categories(id),
  image TEXT,
  project_url TEXT,
  linkedin_url TEXT,
  technologies TEXT[] DEFAULT '{}',
  date DATE,
  featured BOOLEAN DEFAULT false,
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(100),
  color VARCHAR(50),
  features TEXT[] DEFAULT '{}',
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create education table
CREATE TABLE IF NOT EXISTS education (
  id SERIAL PRIMARY KEY,
  year VARCHAR(20),
  institution VARCHAR(255),
  degree VARCHAR(255),
  details TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create journey table
CREATE TABLE IF NOT EXISTS journey (
  id SERIAL PRIMARY KEY,
  year VARCHAR(20),
  title VARCHAR(255),
  description TEXT,
  details TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create certifications table
CREATE TABLE IF NOT EXISTS certifications (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  issuer VARCHAR(255),
  date DATE,
  credential_url TEXT,
  description TEXT,
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create stats table
CREATE TABLE IF NOT EXISTS stats (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  value VARCHAR(100),
  icon VARCHAR(100),
  color VARCHAR(50),
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create about_features table
CREATE TABLE IF NOT EXISTS about_features (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(100),
  color VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create freelance_platforms table
CREATE TABLE IF NOT EXISTS freelance_platforms (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  profile_url TEXT,
  logo TEXT,
  color VARCHAR(50),
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create payment_methods table
CREATE TABLE IF NOT EXISTS payment_methods (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  icon VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create settings table
CREATE TABLE IF NOT EXISTS settings (
  id SERIAL PRIMARY KEY,
  key VARCHAR(255) UNIQUE NOT NULL,
  value BOOLEAN DEFAULT true,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create language_settings table
CREATE TABLE IF NOT EXISTS language_settings (
  id SERIAL PRIMARY KEY,
  enable_language_toggle BOOLEAN DEFAULT false,
  default_language VARCHAR(10) DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default profile data
INSERT INTO profile (name, title, title2, email, bio, short_bio) VALUES 
('Mohamed Hamdy', 'Data Analyst', 'Financial Accountant', 'muhamedhamdynour@gmail.com', 
'Transforming complex data into actionable insights that drive business decisions and financial growth.', 
'Data Analyst & Financial Accountant')
ON CONFLICT (id) DO NOTHING;

-- Insert skills data
INSERT INTO skills (name, description, icon, color, enabled) VALUES 
('Data Analysis', 'Advanced data analysis using Python, R, and SQL for comprehensive insights', 'bar-chart', 'text-blue-500', true),
('Financial Modeling', 'Creating sophisticated financial models and forecasts for strategic planning', 'calculator', 'text-green-500', true),
('Database Management', 'Expert in SQL, PostgreSQL, and database optimization for efficient data handling', 'database', 'text-purple-500', true),
('Data Visualization', 'Creating compelling visualizations using Tableau, Power BI, and Python libraries', 'pie-chart', 'text-orange-500', true),
('Statistical Analysis', 'Advanced statistical methods and hypothesis testing for data-driven decisions', 'trending-up', 'text-red-500', true),
('Excel & VBA', 'Advanced Excel modeling with VBA automation for complex financial calculations', 'file-spreadsheet', 'text-indigo-500', true),
('Python Programming', 'Proficient in Python for data analysis, automation, and machine learning', 'code', 'text-yellow-500', true),
('Business Intelligence', 'Developing BI solutions and dashboards for strategic business insights', 'brain', 'text-pink-500', true)
ON CONFLICT (id) DO NOTHING;

-- Insert work reasons data
INSERT INTO work_reasons (title, description, icon, color, enabled) VALUES 
('Expert Analysis', 'Deep expertise in data analysis and financial modeling with proven track record', 'bar-chart-3', 'text-blue-500', true),
('Reliable Results', 'Consistent delivery of accurate and actionable insights that drive business growth', 'target', 'text-green-500', true),
('Fast Turnaround', 'Quick project completion without compromising quality or accuracy', 'clock', 'text-orange-500', true),
('Clear Communication', 'Complex data presented in clear, understandable formats for all stakeholders', 'message-circle', 'text-purple-500', true),
('Cost Effective', 'High-quality analysis at competitive rates with excellent value proposition', 'dollar-sign', 'text-red-500', true),
('Continuous Support', 'Ongoing support and consultation to ensure long-term success', 'headphones', 'text-indigo-500', true)
ON CONFLICT (id) DO NOTHING;

-- Insert clients data
INSERT INTO clients (name, logo, testimonial, rating, website, last_project, enabled) VALUES 
('TechCorp Solutions', '/placeholder.svg?height=64&width=64', 'Mohamed provided exceptional data analysis that helped us increase revenue by 25%. His insights were invaluable.', 5, 'https://techcorp.com', 'https://linkedin.com/project1', true),
('Financial Partners Ltd', '/placeholder.svg?height=64&width=64', 'Outstanding financial modeling work. The forecasts were accurate and helped us secure major funding.', 5, 'https://finpartners.com', 'https://linkedin.com/project2', true),
('DataDriven Inc', '/placeholder.svg?height=64&width=64', 'Professional, reliable, and delivers results. The dashboard he created transformed our decision-making process.', 5, 'https://datadriven.com', 'https://linkedin.com/project3', true),
('Global Analytics', '/placeholder.svg?height=64&width=64', 'Excellent communication and technical skills. Mohamed understood our complex requirements perfectly.', 5, 'https://globalanalytics.com', 'https://linkedin.com/project4', true)
ON CONFLICT (id) DO NOTHING;

-- Insert project categories data
INSERT INTO project_categories (name, slug, enabled) VALUES 
('Data Analysis', 'data-analysis', true),
('Financial Modeling', 'financial-modeling', true),
('Business Intelligence', 'business-intelligence', true),
('Data Visualization', 'data-visualization', true)
ON CONFLICT (slug) DO NOTHING;

-- Insert projects data
INSERT INTO projects (title, description, short_description, category_id, image, project_url, linkedin_url, technologies, date, featured, enabled) VALUES 
('Sales Performance Dashboard', 'Comprehensive sales analysis dashboard built with Python and Tableau, providing real-time insights into sales performance, customer behavior, and revenue trends.', 'Interactive dashboard for sales performance analysis and forecasting', 1, '/placeholder.svg?height=200&width=400', 'https://example.com/sales-dashboard', 'https://linkedin.com/project/sales', ARRAY['Python', 'Tableau', 'SQL', 'Pandas'], '2024-01-15', true, true),
('Financial Forecast Model', 'Advanced 5-year financial forecasting model with scenario analysis, built in Excel with VBA automation for dynamic budget planning and risk assessment.', 'Advanced financial forecasting model for strategic budget planning', 2, '/placeholder.svg?height=200&width=400', 'https://example.com/forecast-model', 'https://linkedin.com/project/forecast', ARRAY['Excel', 'VBA', 'Python', 'Monte Carlo'], '2024-02-20', true, true),
('Customer Analytics Platform', 'End-to-end customer analytics solution using Python and Power BI, analyzing customer lifetime value, churn prediction, and segmentation strategies.', 'Complete customer analytics solution with predictive modeling', 3, '/placeholder.svg?height=200&width=400', 'https://example.com/customer-analytics', 'https://linkedin.com/project/customer', ARRAY['Python', 'Power BI', 'SQL', 'Machine Learning'], '2024-03-10', true, true),
('Inventory Optimization System', 'Data-driven inventory management system that reduced costs by 30% through predictive analytics and automated reorder point calculations.', 'Inventory optimization using predictive analytics and automation', 1, '/placeholder.svg?height=200&width=400', 'https://example.com/inventory', 'https://linkedin.com/project/inventory', ARRAY['Python', 'SQL', 'Tableau', 'Statistics'], '2024-04-05', false, true),
('Risk Assessment Dashboard', 'Comprehensive risk assessment dashboard for financial institutions, incorporating stress testing and regulatory compliance metrics.', 'Financial risk assessment with stress testing capabilities', 2, '/placeholder.svg?height=200&width=400', 'https://example.com/risk-dashboard', 'https://linkedin.com/project/risk', ARRAY['R', 'Shiny', 'SQL', 'Monte Carlo'], '2024-05-12', false, true),
('Market Research Analysis', 'In-depth market research analysis combining primary and secondary data sources to identify growth opportunities and competitive positioning.', 'Comprehensive market research with competitive analysis', 4, '/placeholder.svg?height=200&width=400', 'https://example.com/market-research', 'https://linkedin.com/project/market', ARRAY['Python', 'R', 'Tableau', 'Statistical Analysis'], '2024-06-18', false, true)
ON CONFLICT (id) DO NOTHING;

-- Insert services data
INSERT INTO services (title, description, icon, color, features, enabled) VALUES 
('Data Analysis & Insights', 'Comprehensive data analysis services to uncover hidden patterns and actionable insights from your business data.', 'bar-chart', 'text-blue-500', ARRAY['Data cleaning and preparation', 'Statistical analysis', 'Trend identification', 'Performance metrics', 'Custom reporting'], true),
('Financial Modeling', 'Advanced financial modeling and forecasting services for strategic planning and investment decisions.', 'calculator', 'text-green-500', ARRAY['Financial forecasting', 'Scenario analysis', 'Valuation models', 'Budget planning', 'Risk assessment'], true),
('Business Intelligence', 'Complete BI solutions including dashboard development and automated reporting systems.', 'brain', 'text-purple-500', ARRAY['Dashboard development', 'Automated reporting', 'KPI tracking', 'Data integration', 'Performance monitoring'], true),
('Data Visualization', 'Creating compelling visualizations and interactive dashboards that make complex data easy to understand.', 'pie-chart', 'text-orange-500', ARRAY['Interactive dashboards', 'Custom charts', 'Infographics', 'Executive summaries', 'Mobile-friendly designs'], true),
('Database Optimization', 'Database design, optimization, and management services for improved performance and reliability.', 'database', 'text-red-500', ARRAY['Database design', 'Query optimization', 'Performance tuning', 'Data migration', 'Backup strategies'], true),
('Consulting & Training', 'Expert consulting and training services to help your team leverage data effectively.', 'users', 'text-indigo-500', ARRAY['Strategic consulting', 'Team training', 'Best practices', 'Tool selection', 'Process optimization'], true)
ON CONFLICT (id) DO NOTHING;

-- Insert settings data
INSERT INTO settings (key, value, description) VALUES 
('website', true, 'Enable/disable entire website'),
('projects_page', true, 'Show projects page'),
('services_page', true, 'Show services page'),
('about_page', true, 'Show about page'),
('contact_page', true, 'Show contact page'),
('resume_page', true, 'Show resume page'),
('projects_home', true, 'Show projects section on home page'),
('services_home', true, 'Show services section on home page'),
('about_home', true, 'Show about section on home page'),
('skills', true, 'Show skills section'),
('why_work_with_me', true, 'Show why work with me section'),
('clients', true, 'Show clients section'),
('contact_home', true, 'Show contact section on home page'),
('freelance_platforms', true, 'Show freelance platforms'),
('payment_methods', true, 'Show payment methods'),
('contact_form', true, 'Enable contact form'),
('calendly_feature', true, 'Enable Calendly integration')
ON CONFLICT (key) DO NOTHING;

-- Insert language settings
INSERT INTO language_settings (enable_language_toggle, default_language) VALUES 
(false, 'en')
ON CONFLICT (id) DO NOTHING;

-- Insert education data
INSERT INTO education (year, institution, degree, details) VALUES 
('2020-2024', 'Cairo University', 'Bachelor of Commerce - Accounting', 'Specialized in Financial Accounting and Data Analysis'),
('2023', 'Google', 'Google Data Analytics Certificate', 'Comprehensive program covering data analysis tools and techniques'),
('2024', 'Microsoft', 'Microsoft Excel Expert Certification', 'Advanced Excel skills including VBA and financial modeling')
ON CONFLICT (id) DO NOTHING;

-- Insert journey data
INSERT INTO journey (year, title, description, details) VALUES 
('2024', 'Senior Data Analyst', 'Leading data analysis projects for major clients', 'Specialized in financial modeling and business intelligence solutions'),
('2023', 'Financial Data Analyst', 'Focused on financial data analysis and reporting', 'Developed automated reporting systems and financial dashboards'),
('2022', 'Junior Data Analyst', 'Started career in data analysis', 'Learned advanced Excel, SQL, and Python for data analysis'),
('2021', 'Accounting Intern', 'Gained experience in financial accounting', 'Worked with financial statements and accounting software')
ON CONFLICT (id) DO NOTHING;

-- Insert certifications data
INSERT INTO certifications (title, issuer, date, credential_url, description, enabled) VALUES 
('Google Data Analytics Certificate', 'Google', '2023-06-15', 'https://coursera.org/verify/certificate', 'Comprehensive data analysis program covering tools and techniques', true),
('Microsoft Excel Expert', 'Microsoft', '2024-01-20', 'https://microsoft.com/verify/certificate', 'Advanced Excel skills including VBA and financial modeling', true),
('Tableau Desktop Specialist', 'Tableau', '2023-09-10', 'https://tableau.com/verify/certificate', 'Data visualization and dashboard creation certification', true),
('Python for Data Science', 'IBM', '2023-12-05', 'https://ibm.com/verify/certificate', 'Python programming for data analysis and machine learning', true)
ON CONFLICT (id) DO NOTHING;

-- Insert stats data
INSERT INTO stats (name, value, icon, color, enabled) VALUES 
('Projects Completed', '50+', 'briefcase', 'text-blue-500', true),
('Happy Clients', '25+', 'users', 'text-green-500', true),
('Years Experience', '3+', 'calendar', 'text-purple-500', true),
('Data Points Analyzed', '1M+', 'database', 'text-orange-500', true)
ON CONFLICT (id) DO NOTHING;

-- Insert about features data
INSERT INTO about_features (title, description, icon, color) VALUES 
('Data-Driven Decisions', 'Transform raw data into actionable insights that drive strategic business decisions', 'bar-chart', 'text-blue-500'),
('Financial Expertise', 'Deep understanding of financial principles combined with analytical skills', 'calculator', 'text-green-500'),
('Technical Proficiency', 'Proficient in modern data analysis tools and programming languages', 'code', 'text-purple-500'),
('Clear Communication', 'Ability to present complex findings in clear, understandable formats', 'message-circle', 'text-orange-500'),
('Problem Solving', 'Strong analytical thinking and creative problem-solving approach', 'lightbulb', 'text-red-500'),
('Continuous Learning', 'Committed to staying updated with latest trends and technologies', 'book-open', 'text-indigo-500')
ON CONFLICT (id) DO NOTHING;

-- Insert freelance platforms data
INSERT INTO freelance_platforms (name, profile_url, logo, color, enabled) VALUES 
('Upwork', 'https://upwork.com/freelancers/mohamedhamdy', '/placeholder.svg?height=32&width=32', 'text-green-500', true),
('Freelancer', 'https://freelancer.com/u/mohamedhamdy', '/placeholder.svg?height=32&width=32', 'text-blue-500', true),
('Fiverr', 'https://fiverr.com/mohamedhamdy', '/placeholder.svg?height=32&width=32', 'text-green-400', true)
ON CONFLICT (id) DO NOTHING;

-- Insert payment methods data
INSERT INTO payment_methods (name, icon) VALUES 
('PayPal', 'credit-card'),
('Bank Transfer', 'building-2'),
('Wise', 'globe'),
('Cryptocurrency', 'coins')
ON CONFLICT (id) DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_skills_enabled ON skills(enabled);
CREATE INDEX IF NOT EXISTS idx_work_reasons_enabled ON work_reasons(enabled);
CREATE INDEX IF NOT EXISTS idx_clients_enabled ON clients(enabled);
CREATE INDEX IF NOT EXISTS idx_projects_enabled ON projects(enabled);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_services_enabled ON services(enabled);
CREATE INDEX IF NOT EXISTS idx_certifications_enabled ON certifications(enabled);
CREATE INDEX IF NOT EXISTS idx_stats_enabled ON stats(enabled);
CREATE INDEX IF NOT EXISTS idx_freelance_platforms_enabled ON freelance_platforms(enabled);
CREATE INDEX IF NOT EXISTS idx_settings_key ON settings(key);
