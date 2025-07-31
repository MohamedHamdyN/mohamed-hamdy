-- Create profile table
CREATE TABLE IF NOT EXISTS profile (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL DEFAULT 'Mohamed Hamdy',
    title VARCHAR(255) NOT NULL DEFAULT 'Data Analyst',
    title2 VARCHAR(255) NOT NULL DEFAULT 'Financial Accountant',
    bio TEXT DEFAULT 'Transforming complex data into actionable insights that drive business decisions.',
    short_bio TEXT DEFAULT 'Data Analyst & Financial Accountant',
    long_bio TEXT DEFAULT '',
    email VARCHAR(255) DEFAULT 'muhamedhamdynour@gmail.com',
    phone VARCHAR(50) DEFAULT '',
    location VARCHAR(255) DEFAULT '',
    logo TEXT DEFAULT '',
    favicon TEXT DEFAULT '',
    avatar TEXT DEFAULT '',
    default_project_image TEXT DEFAULT '',
    default_client_logo TEXT DEFAULT '',
    default_platform_logo TEXT DEFAULT '',
    og_image TEXT DEFAULT '',
    resume_url TEXT DEFAULT '',
    calendly_url TEXT DEFAULT '',
    social_links JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    icon VARCHAR(100) DEFAULT 'code',
    color VARCHAR(100) DEFAULT 'text-blue-500',
    enabled BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create work_reasons table
CREATE TABLE IF NOT EXISTS work_reasons (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    icon VARCHAR(100) DEFAULT 'lightbulb',
    color VARCHAR(100) DEFAULT 'text-blue-500',
    enabled BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create clients table
CREATE TABLE IF NOT EXISTS clients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    logo TEXT DEFAULT '',
    website TEXT DEFAULT '',
    testimonial TEXT DEFAULT '',
    rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    last_project TEXT DEFAULT '',
    enabled BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create project_categories table
CREATE TABLE IF NOT EXISTS project_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT DEFAULT '',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    short_description TEXT,
    long_description TEXT,
    image TEXT DEFAULT '',
    images TEXT[] DEFAULT '{}',
    technologies TEXT[] DEFAULT '{}',
    project_url TEXT DEFAULT '',
    github_url TEXT DEFAULT '',
    linkedin_url TEXT DEFAULT '',
    category_id INTEGER REFERENCES project_categories(id),
    featured BOOLEAN DEFAULT false,
    enabled BOOLEAN DEFAULT true,
    date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    icon VARCHAR(100) DEFAULT 'briefcase',
    price VARCHAR(100) DEFAULT '',
    features TEXT[] DEFAULT '{}',
    enabled BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create settings table
CREATE TABLE IF NOT EXISTS settings (
    id SERIAL PRIMARY KEY,
    key VARCHAR(255) UNIQUE NOT NULL,
    value BOOLEAN DEFAULT true,
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
INSERT INTO profile (id, name, title, title2, bio, short_bio, email) 
VALUES (1, 'Mohamed Hamdy', 'Data Analyst', 'Financial Accountant', 
        'Transforming complex data into actionable insights that drive business decisions.',
        'Data Analyst & Financial Accountant', 'muhamedhamdynour@gmail.com')
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    title = EXCLUDED.title,
    title2 = EXCLUDED.title2,
    bio = EXCLUDED.bio,
    short_bio = EXCLUDED.short_bio,
    email = EXCLUDED.email,
    updated_at = NOW();

-- Insert default skills
INSERT INTO skills (name, description, icon, color, enabled) VALUES
('Data Analysis', 'Advanced data analysis using Python, R, and SQL', 'bar-chart', 'text-blue-500', true),
('Financial Modeling', 'Creating comprehensive financial models and forecasts', 'calculator', 'text-green-500', true),
('Database Management', 'Expert in SQL, PostgreSQL, and database optimization', 'database', 'text-purple-500', true),
('Statistical Analysis', 'Advanced statistical methods and hypothesis testing', 'trending-up', 'text-red-500', true),
('Data Visualization', 'Creating compelling visualizations with Tableau and Power BI', 'pie-chart', 'text-yellow-500', true),
('Excel Mastery', 'Advanced Excel functions, VBA, and automation', 'file-spreadsheet', 'text-indigo-500', true)
ON CONFLICT DO NOTHING;

-- Insert default work reasons
INSERT INTO work_reasons (title, description, icon, color, enabled) VALUES
('Expert Analysis', 'Deep expertise in data analysis and financial modeling with proven track record', 'bar-chart-3', 'text-blue-500', true),
('Reliable Results', 'Consistent delivery of accurate and actionable insights that drive business growth', 'calculator', 'text-green-500', true),
('Clear Communication', 'Complex data presented in clear, understandable formats for all stakeholders', 'message-circle', 'text-purple-500', true),
('Innovative Solutions', 'Creative approaches to solving complex business problems through data', 'lightbulb', 'text-yellow-500', true)
ON CONFLICT DO NOTHING;

-- Insert default clients
INSERT INTO clients (name, logo, website, testimonial, rating, last_project, enabled) VALUES
('Tech Solutions Inc', '/placeholder.svg?height=64&width=64', 'https://example.com', 
 'Excellent data analysis and insights provided. Mohamed helped us increase our revenue by 25%.', 
 5, 'https://example.com/project1', true),
('Financial Corp', '/placeholder.svg?height=64&width=64', 'https://example.com', 
 'Outstanding financial modeling work. Very professional and delivered on time.', 
 5, 'https://example.com/project2', true),
('Data Insights LLC', '/placeholder.svg?height=64&width=64', 'https://example.com', 
 'Great collaboration on our analytics project. Highly recommend Mohamed for data work.', 
 5, 'https://example.com/project3', true)
ON CONFLICT DO NOTHING;

-- Insert default project categories
INSERT INTO project_categories (name, slug, description) VALUES
('Data Analysis', 'data-analysis', 'Comprehensive data analysis and insights projects'),
('Financial Modeling', 'financial-modeling', 'Advanced financial modeling and forecasting projects'),
('Dashboard Development', 'dashboard-development', 'Interactive dashboards and visualization projects'),
('Business Intelligence', 'business-intelligence', 'BI solutions and reporting systems')
ON CONFLICT (slug) DO NOTHING;

-- Insert default projects
INSERT INTO projects (title, short_description, long_description, image, technologies, project_url, category_id, featured, enabled, date) VALUES
('Sales Performance Dashboard', 
 'Interactive dashboard analyzing sales performance across multiple regions and time periods',
 'Comprehensive sales analysis dashboard built with Python, Tableau, and SQL. Features real-time data updates, regional comparisons, and predictive analytics for future sales trends.',
 '/placeholder.svg?height=200&width=400',
 ARRAY['Python', 'Tableau', 'SQL', 'Pandas'],
 'https://example.com/sales-dashboard',
 3, true, true, '2024-01-15'),

('Financial Forecast Model', 
 'Advanced 5-year financial forecasting model for budget planning and strategic decisions',
 'Sophisticated financial model incorporating multiple scenarios, risk analysis, and sensitivity testing. Built using Excel VBA and Python for automated reporting.',
 '/placeholder.svg?height=200&width=400',
 ARRAY['Excel', 'Python', 'VBA', 'Monte Carlo'],
 'https://example.com/financial-model',
 2, true, true, '2024-02-01'),

('Customer Segmentation Analysis',
 'Machine learning-based customer segmentation for targeted marketing campaigns',
 'Advanced customer segmentation using clustering algorithms to identify high-value customer groups and optimize marketing strategies.',
 '/placeholder.svg?height=200&width=400',
 ARRAY['Python', 'Scikit-learn', 'Pandas', 'Matplotlib'],
 'https://example.com/customer-segmentation',
 1, true, true, '2024-01-30'),

('Inventory Optimization System',
 'Data-driven inventory management system reducing costs by 30%',
 'Comprehensive inventory analysis and optimization system using statistical forecasting and machine learning to minimize holding costs while maintaining service levels.',
 '/placeholder.svg?height=200&width=400',
 ARRAY['Python', 'SQL', 'Power BI', 'Statistics'],
 'https://example.com/inventory-system',
 4, false, true, '2024-01-10')
ON CONFLICT DO NOTHING;

-- Insert default services
INSERT INTO services (title, description, icon, price, features, enabled) VALUES
('Data Analysis & Insights', 
 'Comprehensive data analysis services to uncover actionable business insights',
 'bar-chart', '$500 - $2000',
 ARRAY['Data cleaning and preparation', 'Statistical analysis', 'Trend identification', 'Custom reporting', 'Data visualization'],
 true),

('Financial Modeling', 
 'Advanced financial modeling and forecasting for strategic planning',
 'calculator', '$800 - $3000',
 ARRAY['Budget planning', '5-year forecasting', 'Scenario analysis', 'Risk assessment', 'ROI calculations'],
 true),

('Dashboard Development', 
 'Interactive dashboards and business intelligence solutions',
 'monitor', '$1000 - $4000',
 ARRAY['Custom dashboard design', 'Real-time data integration', 'Interactive visualizations', 'Mobile responsive', 'Training included'],
 true),

('Database Optimization', 
 'Database performance tuning and optimization services',
 'database', '$600 - $2500',
 ARRAY['Query optimization', 'Index tuning', 'Performance monitoring', 'Data architecture review', 'Documentation'],
 true)
ON CONFLICT DO NOTHING;

-- Insert default settings
INSERT INTO settings (key, value) VALUES
('website', true),
('projects_page', true),
('services_page', true),
('about_page', true),
('contact_page', true),
('resume_page', true),
('projects_home', true),
('services_home', true),
('about_home', true),
('skills', true),
('why_work_with_me', true),
('clients', true),
('contact_home', true),
('freelance_platforms', true),
('payment_methods', true),
('contact_form', true),
('calendly_feature', true)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Insert default language settings
INSERT INTO language_settings (id, enable_language_toggle, default_language) 
VALUES (1, false, 'en')
ON CONFLICT (id) DO UPDATE SET
    enable_language_toggle = EXCLUDED.enable_language_toggle,
    default_language = EXCLUDED.default_language;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_skills_enabled ON skills(enabled);
CREATE INDEX IF NOT EXISTS idx_work_reasons_enabled ON work_reasons(enabled);
CREATE INDEX IF NOT EXISTS idx_clients_enabled ON clients(enabled);
CREATE INDEX IF NOT EXISTS idx_projects_enabled ON projects(enabled);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category_id);
CREATE INDEX IF NOT EXISTS idx_services_enabled ON services(enabled);
CREATE INDEX IF NOT EXISTS idx_settings_key ON settings(key);
