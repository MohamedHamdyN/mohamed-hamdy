-- Create profile table
CREATE TABLE IF NOT EXISTS profile (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL DEFAULT 'Mohamed Hamdy',
    title VARCHAR(255) NOT NULL DEFAULT 'Data Analyst',
    title2 VARCHAR(255) NOT NULL DEFAULT 'Financial Accountant',
    bio TEXT DEFAULT 'Transforming complex data into actionable insights that drive business decisions.',
    short_bio TEXT DEFAULT 'Data Analyst & Financial Accountant specializing in business intelligence',
    long_bio TEXT DEFAULT 'Experienced data analyst with expertise in financial modeling, statistical analysis, and business intelligence. Passionate about turning complex data into clear, actionable insights.',
    email VARCHAR(255) NOT NULL DEFAULT 'muhamedhamdynour@gmail.com',
    phone VARCHAR(50) DEFAULT '+20 123 456 7890',
    location VARCHAR(255) DEFAULT 'Cairo, Egypt',
    logo TEXT DEFAULT '/placeholder.svg?height=100&width=100',
    favicon TEXT DEFAULT '/favicon.svg',
    avatar TEXT DEFAULT '/placeholder.svg?height=200&width=200',
    default_project_image TEXT DEFAULT '/placeholder.svg?height=400&width=600',
    default_client_logo TEXT DEFAULT '/placeholder.svg?height=100&width=100',
    default_platform_logo TEXT DEFAULT '/placeholder.svg?height=50&width=50',
    og_image TEXT DEFAULT '/placeholder.svg?height=630&width=1200',
    resume_url TEXT DEFAULT '#',
    calendly_url TEXT DEFAULT '#',
    social_links JSONB DEFAULT '{"linkedin": "https://linkedin.com/in/mohamed-hamdy", "github": "https://github.com/mohamed-hamdy", "twitter": "https://twitter.com/mohamed_hamdy"}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    icon VARCHAR(100) DEFAULT 'bar-chart',
    color VARCHAR(50) DEFAULT 'text-blue-500',
    enabled BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create work_reasons table
CREATE TABLE IF NOT EXISTS work_reasons (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    icon VARCHAR(100) DEFAULT 'star',
    color VARCHAR(50) DEFAULT 'text-primary',
    enabled BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create clients table
CREATE TABLE IF NOT EXISTS clients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    logo TEXT DEFAULT '/placeholder.svg?height=100&width=100',
    website TEXT,
    testimonial TEXT,
    rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    last_project TEXT,
    enabled BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create project_categories table
CREATE TABLE IF NOT EXISTS project_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
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
    image TEXT DEFAULT '/placeholder.svg?height=400&width=600',
    project_url TEXT,
    linkedin_url TEXT,
    technologies TEXT[] DEFAULT '{}',
    date DATE DEFAULT CURRENT_DATE,
    featured BOOLEAN DEFAULT false,
    enabled BOOLEAN DEFAULT true,
    category_id INTEGER REFERENCES project_categories(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    icon VARCHAR(100) DEFAULT 'briefcase',
    color VARCHAR(50) DEFAULT 'text-primary',
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
    icon VARCHAR(100) DEFAULT 'trending-up',
    color VARCHAR(50) DEFAULT 'text-primary',
    enabled BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create about_features table
CREATE TABLE IF NOT EXISTS about_features (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    icon VARCHAR(100) DEFAULT 'check',
    color VARCHAR(50) DEFAULT 'text-primary',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create freelance_platforms table
CREATE TABLE IF NOT EXISTS freelance_platforms (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    profile_url TEXT,
    logo TEXT DEFAULT '/placeholder.svg?height=50&width=50',
    color VARCHAR(50) DEFAULT 'text-primary',
    enabled BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create payment_methods table
CREATE TABLE IF NOT EXISTS payment_methods (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    icon VARCHAR(100) DEFAULT 'credit-card',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create settings table
CREATE TABLE IF NOT EXISTS settings (
    id SERIAL PRIMARY KEY,
    key VARCHAR(255) NOT NULL UNIQUE,
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
INSERT INTO profile (id, name, title, title2, bio, short_bio, long_bio, email, phone, location, social_links) 
VALUES (1, 
    'Mohamed Hamdy', 
    'Data Analyst', 
    'Financial Accountant',
    'Transforming complex data into actionable insights that drive business decisions.',
    'Data Analyst & Financial Accountant specializing in business intelligence and financial modeling',
    'Experienced data analyst with over 5 years of expertise in financial modeling, statistical analysis, and business intelligence. I specialize in transforming complex datasets into clear, actionable insights that drive strategic business decisions. My background combines strong analytical skills with deep financial knowledge, enabling me to provide comprehensive solutions for data-driven organizations.',
    'muhamedhamdynour@gmail.com',
    '+20 123 456 7890',
    'Cairo, Egypt',
    '{"linkedin": "https://linkedin.com/in/mohamed-hamdy", "github": "https://github.com/mohamed-hamdy", "twitter": "https://twitter.com/mohamed_hamdy", "email": "muhamedhamdynour@gmail.com"}'
) ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    title = EXCLUDED.title,
    title2 = EXCLUDED.title2,
    bio = EXCLUDED.bio,
    short_bio = EXCLUDED.short_bio,
    long_bio = EXCLUDED.long_bio,
    email = EXCLUDED.email,
    phone = EXCLUDED.phone,
    location = EXCLUDED.location,
    social_links = EXCLUDED.social_links,
    updated_at = NOW();

-- Insert skills data
INSERT INTO skills (name, description, icon, color, enabled) VALUES
('Python Programming', 'Advanced Python programming for data analysis, automation, and machine learning', 'code', 'text-blue-500', true),
('Data Analysis', 'Expert in statistical analysis, data mining, and pattern recognition using various tools', 'bar-chart-3', 'text-green-500', true),
('SQL & Databases', 'Proficient in SQL, PostgreSQL, MySQL, and database optimization techniques', 'database', 'text-purple-500', true),
('Financial Modeling', 'Creating comprehensive financial models, forecasts, and budget planning systems', 'calculator', 'text-yellow-500', true),
('Data Visualization', 'Creating compelling visualizations using Tableau, Power BI, and Python libraries', 'pie-chart', 'text-red-500', true),
('Excel & Spreadsheets', 'Advanced Excel skills including VBA, pivot tables, and complex formulas', 'file-spreadsheet', 'text-orange-500', true),
('Statistical Analysis', 'Statistical modeling, hypothesis testing, and predictive analytics', 'trending-up', 'text-indigo-500', true),
('Business Intelligence', 'BI tools implementation, dashboard creation, and KPI development', 'brain', 'text-pink-500', true)
ON CONFLICT DO NOTHING;

-- Insert work reasons data
INSERT INTO work_reasons (title, description, icon, color, enabled) VALUES
('Expert Analysis', 'Deep expertise in data analysis with proven track record of delivering actionable insights', 'award', 'text-blue-500', true),
('Reliable Results', 'Consistent delivery of accurate, high-quality analysis within agreed timelines', 'shield-check', 'text-green-500', true),
('Business Focus', 'Strong understanding of business needs and ability to translate data into strategic recommendations', 'target', 'text-purple-500', true),
('Clear Communication', 'Excellent ability to present complex findings in clear, understandable formats for all stakeholders', 'message-circle', 'text-orange-500', true),
('Continuous Learning', 'Always staying updated with latest tools, techniques, and industry best practices', 'book-open', 'text-red-500', true),
('Problem Solving', 'Creative approach to solving complex data challenges and finding innovative solutions', 'lightbulb', 'text-yellow-500', true)
ON CONFLICT DO NOTHING;

-- Insert clients data
INSERT INTO clients (name, logo, website, testimonial, rating, last_project, enabled) VALUES
('TechCorp Solutions', '/placeholder.svg?height=100&width=100&text=TechCorp', 'https://techcorp.example.com', 'Mohamed provided excellent data analysis that helped us increase our revenue by 25%. His insights were invaluable for our strategic planning.', 5, 'https://example.com/project1', true),
('Financial Partners Ltd', '/placeholder.svg?height=100&width=100&text=FinPartners', 'https://finpartners.example.com', 'Outstanding financial modeling work. Mohamed helped us optimize our budget allocation and improve our forecasting accuracy significantly.', 5, 'https://example.com/project2', true),
('DataDriven Inc', '/placeholder.svg?height=100&width=100&text=DataDriven', 'https://datadriven.example.com', 'Professional, reliable, and delivers high-quality work. Mohamed transformed our raw data into actionable business intelligence.', 5, 'https://example.com/project3', true),
('Analytics Pro', '/placeholder.svg?height=100&width=100&text=Analytics', 'https://analyticspro.example.com', 'Exceptional analytical skills and attention to detail. Mohamed helped us identify key trends that improved our decision-making process.', 4, 'https://example.com/project4', true)
ON CONFLICT DO NOTHING;

-- Insert project categories
INSERT INTO project_categories (name, slug, description, enabled) VALUES
('Data Analysis', 'data-analysis', 'Comprehensive data analysis and statistical modeling projects', true),
('Financial Modeling', 'financial-modeling', 'Financial forecasting, budgeting, and economic analysis projects', true),
('Business Intelligence', 'business-intelligence', 'BI dashboard creation and business intelligence solutions', true),
('Data Visualization', 'data-visualization', 'Interactive dashboards and data visualization projects', true),
('Automation', 'automation', 'Process automation and workflow optimization projects', true)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    enabled = EXCLUDED.enabled;

-- Insert projects data
INSERT INTO projects (title, description, short_description, image, project_url, linkedin_url, technologies, date, featured, enabled, category_id) VALUES
('Sales Performance Dashboard', 'Comprehensive sales analysis dashboard built with Python and Tableau, providing real-time insights into sales performance, customer behavior, and revenue trends. The dashboard includes interactive visualizations, automated reporting, and predictive analytics capabilities.', 'Interactive dashboard for sales performance analysis with real-time insights', '/placeholder.svg?height=400&width=600&text=Sales+Dashboard', 'https://example.com/sales-dashboard', 'https://linkedin.com/in/mohamed-hamdy', ARRAY['Python', 'Tableau', 'SQL', 'Pandas'], '2024-01-15', true, true, 1),

('Financial Forecast Model', 'Advanced financial forecasting model for 5-year budget planning, incorporating multiple scenarios, risk analysis, and sensitivity testing. Built using Excel VBA and Python for automated data processing and model updates.', 'Advanced financial forecasting model for budget planning', '/placeholder.svg?height=400&width=600&text=Financial+Model', 'https://example.com/financial-model', 'https://linkedin.com/in/mohamed-hamdy', ARRAY['Excel', 'VBA', 'Python', 'Financial Modeling'], '2024-02-20', true, true, 2),

('Customer Segmentation Analysis', 'Machine learning-based customer segmentation analysis using clustering algorithms to identify distinct customer groups, analyze purchasing patterns, and develop targeted marketing strategies.', 'ML-based customer segmentation for targeted marketing', '/placeholder.svg?height=400&width=600&text=Customer+Segmentation', 'https://example.com/customer-segmentation', 'https://linkedin.com/in/mohamed-hamdy', ARRAY['Python', 'Scikit-learn', 'Pandas', 'Matplotlib'], '2024-03-10', true, true, 1),

('Executive BI Dashboard', 'Executive-level business intelligence dashboard providing key performance indicators, financial metrics, and operational insights. Features drill-down capabilities, automated alerts, and mobile-responsive design.', 'Executive BI dashboard with KPIs and financial metrics', '/placeholder.svg?height=400&width=600&text=BI+Dashboard', 'https://example.com/bi-dashboard', 'https://linkedin.com/in/mohamed-hamdy', ARRAY['Power BI', 'SQL Server', 'DAX', 'Power Query'], '2024-04-05', true, true, 3),

('Inventory Optimization System', 'Data-driven inventory optimization system that analyzes demand patterns, seasonal trends, and supplier performance to minimize costs while maintaining optimal stock levels.', 'Inventory optimization using demand forecasting', '/placeholder.svg?height=400&width=600&text=Inventory+System', 'https://example.com/inventory-system', 'https://linkedin.com/in/mohamed-hamdy', ARRAY['Python', 'SQL', 'Time Series Analysis', 'Optimization'], '2024-05-12', false, true, 1),

('Risk Assessment Model', 'Comprehensive risk assessment model for financial institutions, incorporating credit scoring, market risk analysis, and regulatory compliance reporting.', 'Financial risk assessment and credit scoring model', '/placeholder.svg?height=400&width=600&text=Risk+Model', 'https://example.com/risk-model', 'https://linkedin.com/in/mohamed-hamdy', ARRAY['R', 'Statistical Modeling', 'Risk Management', 'Regulatory Reporting'], '2024-06-18', false, true, 2)
ON CONFLICT DO NOTHING;

-- Insert services data
INSERT INTO services (title, description, icon, color, features, enabled) VALUES
('Data Analysis & Insights', 'Comprehensive data analysis services to transform your raw data into actionable business insights. I help organizations make data-driven decisions through statistical analysis, trend identification, and predictive modeling.', 'bar-chart-3', 'text-blue-500', ARRAY['Statistical Analysis', 'Data Mining', 'Trend Analysis', 'Predictive Modeling', 'Report Generation', 'Data Cleaning'], true),

('Financial Modeling & Forecasting', 'Professional financial modeling services including budget planning, financial forecasting, scenario analysis, and investment evaluation. Perfect for businesses looking to improve their financial planning and decision-making processes.', 'calculator', 'text-green-500', ARRAY['Budget Planning', 'Financial Forecasting', 'Scenario Analysis', 'Investment Evaluation', 'Risk Assessment', 'Sensitivity Analysis'], true),

('Business Intelligence Solutions', 'Custom BI dashboard development and implementation to help you monitor key performance indicators, track business metrics, and gain real-time insights into your operations.', 'brain', 'text-purple-500', ARRAY['Dashboard Development', 'KPI Tracking', 'Real-time Monitoring', 'Custom Reports', 'Data Integration', 'Performance Analytics'], true),

('Data Visualization', 'Create compelling and interactive data visualizations that make complex information easy to understand. From executive dashboards to detailed analytical reports, I help you tell your data story effectively.', 'pie-chart', 'text-orange-500', ARRAY['Interactive Dashboards', 'Custom Charts', 'Infographics', 'Executive Reports', 'Mobile-Responsive Design', 'Real-time Updates'], true),

('Process Automation', 'Automate repetitive data tasks and workflows to improve efficiency and reduce errors. From data collection to report generation, I help streamline your data processes using Python and other automation tools.', 'zap', 'text-yellow-500', ARRAY['Workflow Automation', 'Data Pipeline Creation', 'Automated Reporting', 'Task Scheduling', 'Error Reduction', 'Efficiency Improvement'], true),

('Training & Consultation', 'Provide training and consultation services to help your team develop data analysis skills, implement best practices, and build internal capabilities for ongoing data-driven decision making.', 'graduation-cap', 'text-red-500', ARRAY['Team Training', 'Best Practices', 'Tool Selection', 'Process Design', 'Skill Development', 'Ongoing Support'], true)
ON CONFLICT DO NOTHING;

-- Insert education data
INSERT INTO education (year, institution, degree, details) VALUES
('2018-2022', 'Cairo University', 'Bachelor of Commerce - Accounting', 'Specialized in Financial Accounting and Management Accounting with focus on financial analysis and reporting'),
('2022-2023', 'Coursera - Google', 'Google Data Analytics Certificate', 'Comprehensive program covering data analysis, visualization, and statistical analysis using various tools'),
('2023', 'edX - MIT', 'Introduction to Data Science', 'Advanced course in data science methodologies, machine learning, and statistical modeling')
ON CONFLICT DO NOTHING;

-- Insert journey data
INSERT INTO journey (year, title, description) VALUES
('2022', 'Started Data Analysis Journey', 'Began my career in data analysis, focusing on financial data and business intelligence'),
('2023', 'Freelance Data Analyst', 'Started working as a freelance data analyst, helping small and medium businesses with their data needs'),
('2024', 'Specialized in Financial Modeling', 'Expanded expertise to include advanced financial modeling and forecasting for various industries'),
('2024', 'Business Intelligence Expert', 'Developed expertise in BI tools and dashboard creation, serving enterprise clients')
ON CONFLICT DO NOTHING;

-- Insert certifications data
INSERT INTO certifications (title, issuer, date, credential_url, description, enabled) VALUES
('Google Data Analytics Certificate', 'Google', '2023-01-15', 'https://coursera.org/verify/certificate', 'Comprehensive certification in data analysis, visualization, and statistical analysis', true),
('Microsoft Excel Expert', 'Microsoft', '2022-11-20', 'https://microsoft.com/verify/certificate', 'Advanced Excel certification including VBA, pivot tables, and complex formulas', true),
('Tableau Desktop Specialist', 'Tableau', '2023-06-10', 'https://tableau.com/verify/certificate', 'Certification in data visualization and dashboard creation using Tableau', true),
('Python for Data Science', 'IBM', '2023-03-25', 'https://ibm.com/verify/certificate', 'Professional certification in Python programming for data analysis and machine learning', true)
ON CONFLICT DO NOTHING;

-- Insert stats data
INSERT INTO stats (name, value, icon, color, enabled) VALUES
('Projects Completed', '50+', 'briefcase', 'text-blue-500', true),
('Happy Clients', '25+', 'users', 'text-green-500', true),
('Years Experience', '3+', 'calendar', 'text-purple-500', true),
('Data Points Analyzed', '1M+', 'database', 'text-orange-500', true)
ON CONFLICT DO NOTHING;

-- Insert about features data
INSERT INTO about_features (title, description, icon, color) VALUES
('Data-Driven Approach', 'Every decision and recommendation is backed by thorough data analysis and statistical evidence', 'bar-chart-3', 'text-blue-500'),
('Business Understanding', 'Strong grasp of business operations and ability to translate technical findings into business value', 'briefcase', 'text-green-500'),
('Technical Expertise', 'Proficient in modern data analysis tools and programming languages including Python, R, and SQL', 'code', 'text-purple-500'),
('Clear Communication', 'Ability to present complex analytical findings in clear, understandable formats for all stakeholders', 'message-circle', 'text-orange-500'),
('Continuous Learning', 'Always staying updated with the latest tools, techniques, and industry best practices', 'book-open', 'text-red-500'),
('Problem Solving', 'Creative approach to solving complex data challenges and finding innovative analytical solutions', 'lightbulb', 'text-yellow-500')
ON CONFLICT DO NOTHING;

-- Insert freelance platforms data
INSERT INTO freelance_platforms (name, profile_url, logo, color, enabled) VALUES
('Upwork', 'https://upwork.com/freelancers/mohamed-hamdy', '/placeholder.svg?height=50&width=50&text=Upwork', 'text-green-500', true),
('Freelancer', 'https://freelancer.com/u/mohamed-hamdy', '/placeholder.svg?height=50&width=50&text=Freelancer', 'text-blue-500', true),
('Fiverr', 'https://fiverr.com/mohamed-hamdy', '/placeholder.svg?height=50&width=50&text=Fiverr', 'text-green-400', true),
('LinkedIn', 'https://linkedin.com/in/mohamed-hamdy', '/placeholder.svg?height=50&width=50&text=LinkedIn', 'text-blue-600', true)
ON CONFLICT DO NOTHING;

-- Insert payment methods data
INSERT INTO payment_methods (name, icon) VALUES
('PayPal', 'credit-card'),
('Bank Transfer', 'building-2'),
('Wise (TransferWise)', 'globe'),
('Cryptocurrency', 'coins')
ON CONFLICT DO NOTHING;

-- Insert settings data
INSERT INTO settings (key, value, description) VALUES
('website', true, 'Enable/disable entire website'),
('projects_page', true, 'Enable/disable projects page'),
('services_page', true, 'Enable/disable services page'),
('about_page', true, 'Enable/disable about page'),
('contact_page', true, 'Enable/disable contact page'),
('resume_page', true, 'Enable/disable resume page'),
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
ON CONFLICT (key) DO UPDATE SET
    value = EXCLUDED.value,
    description = EXCLUDED.description,
    updated_at = NOW();

-- Insert language settings data
INSERT INTO language_settings (id, enable_language_toggle, default_language) VALUES
(1, false, 'en')
ON CONFLICT (id) DO UPDATE SET
    enable_language_toggle = EXCLUDED.enable_language_toggle,
    default_language = EXCLUDED.default_language,
    updated_at = NOW();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_enabled ON projects(enabled);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category_id);
CREATE INDEX IF NOT EXISTS idx_skills_enabled ON skills(enabled);
CREATE INDEX IF NOT EXISTS idx_clients_enabled ON clients(enabled);
CREATE INDEX IF NOT EXISTS idx_services_enabled ON services(enabled);
CREATE INDEX IF NOT EXISTS idx_settings_key ON settings(key);
