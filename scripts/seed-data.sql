-- Insert profile data
INSERT INTO profile (
  name, title, title2, email, phone, location, bio, short_bio, long_bio,
  logo, favicon, avatar, default_project_image, default_client_logo, 
  default_platform_logo, og_image, resume_url, calendly_url, social_links
) VALUES (
  'Mohamed Hamdy',
  'Data Analyst',
  'Financial Accountant',
  'muhamedhamdynour@gmail.com',
  '',
  '',
  'Data Analyst & Financial Accountant with expertise in transforming complex data into actionable insights.',
  'Aspiring Data Analyst with a focus on financial data and business insights.',
  'I''m a dedicated Data Analyst and Financial Accountant with a passion for transforming complex financial data into actionable insights that drive business decisions.

With a strong foundation in financial accounting and advanced data analysis techniques, I help businesses understand their financial health, identify growth opportunities, and optimize their operations through data-driven strategies.

My approach combines technical expertise with clear communication, ensuring that complex data insights are accessible and valuable to stakeholders at all levels of the organization.',
  'https://i.imgur.com/zziw256.png',
  'https://i.postimg.cc/DzW8X6mX/apple-touch-icon.png',
  'https://i.imgur.com/zziw256.png',
  'https://i.imgur.com/zziw256.png',
  'https://i.imgur.com/zziw256.png',
  'https://i.imgur.com/zziw256.png',
  'https://i.imgur.com/zziw256.png',
  'https://drive.google.com/file/d/18GP_gCewc2svPC0-F62o_Nm0VwtlcK0k/view?usp=drive_link',
  'https://calendly.com/mohamedhamdynour/30min',
  '{"linkedin": "https://linkedin.com/in/mohamedhamdynour", "github": "https://github.com/mohamedhamdynour", "twitter": "https://twitter.com/MoBinHamdy", "instagram": "https://instagram.com/mohamedhamdyn", "datacamp": "https://www.datacamp.com/portfolio/mohamedhamdynour", "facebook": "https://facebook.com/mohamedhamdyn"}'
);

-- Insert skills data
INSERT INTO skills (name, description, icon, color, enabled) VALUES
('Financial Data Analysis', 'Analyzing financial statements and business data', 'BarChart2', 'text-blue-500', true),
('Data Visualization', 'Creating insightful financial dashboards', 'PieChart', 'text-purple-500', true),
('Accounting Analytics', 'Applying analytics to financial reporting and auditing', 'FileText', 'text-green-500', true),
('Statistical Analysis', 'Using statistical methods for financial forecasting', 'LineChart', 'text-yellow-500', true),
('SQL for Finance', 'Querying financial databases for insights', 'Database', 'text-red-500', true),
('Python for Accounting', 'Automating financial analysis and reporting', 'Code', 'text-cyan-500', true),
('Power BI', 'Building interactive financial dashboards', 'TrendingUp', 'text-orange-500', true),
('Cost and Budget Analysis', 'Analyzing budgets and cost structures', 'DollarSign', 'text-indigo-500', true),
('Financial Forecasting', 'Predicting financial trends using data models', 'Activity', 'text-teal-500', true),
('Risk Analysis', 'Assessing financial risks through data analytics', 'Shield', 'text-gray-500', true);

-- Insert work reasons data
INSERT INTO work_reasons (title, description, icon, color, enabled) VALUES
('Strategic Data Insights', 'Turning raw data into meaningful financial and business strategies', 'BarChart3', 'text-yellow-500', true),
('Advanced Technical Skills', 'Expertise in Python, SQL, Power BI, and financial analytics', 'Cpu', 'text-blue-500', true),
('Analytical Problem Solver', 'Applying logic and data-driven approaches to complex challenges', 'BrainCircuit', 'text-green-500', true),
('Effective Data Storytelling', 'Communicating insights clearly through compelling visualizations', 'Presentation', 'text-purple-500', true),
('Impact-Driven Mindset', 'Focused on delivering data-backed solutions with real business value', 'TrendingUp', 'text-red-500', true),
('Lifelong Learner', 'Continuously evolving with the latest trends in data and finance', 'GraduationCap', 'text-cyan-500', true);

-- Insert clients data
INSERT INTO clients (name, logo, testimonial, rating, website, last_project, enabled) VALUES
('NovaTech Solutions', 'https://i.imgur.com/zziw256.png', 'The data analysis provided crucial insights that helped us refine our digital transformation strategy.', 5, 'https://novatech-solutions.com', 'https://example.com/novatech-project', true),
('Skyline Finance', 'https://i.imgur.com/zziw256.png', 'The financial forecasting models helped us optimize our risk management and investment planning.', 5, 'https://skyline-finance.com', 'https://example.com/skyline-project', true),
('SwiftRetail', 'https://i.imgur.com/zziw256.png', 'The customer segmentation analysis significantly improved our targeted marketing campaigns.', 4, 'https://swift-retail.com', '', true),
('MediCare Innovations', 'https://i.imgur.com/zziw256.png', 'Predictive analytics enabled us to enhance patient care and optimize resource allocation.', 5, '', 'https://example.com/medicare-project', true),
('BrightLearn Academy', 'https://i.imgur.com/zziw256.png', 'The learning analytics provided valuable insights that improved student engagement and performance.', 4, 'https://brightlearn-academy.com', '', true);

-- Insert project categories data
INSERT INTO project_categories (name, slug, enabled) VALUES
('Data Visualization', 'data-visualization', true),
('Machine Learning', 'machine-learning', true),
('Business Intelligence', 'business-intelligence', true),
('Statistical Analysis', 'statistical-analysis', true),
('Data Engineering', 'data-engineering', true);

-- Insert projects data
INSERT INTO projects (title, description, short_description, category_id, image, project_url, linkedin_url, technologies, date, featured, enabled) VALUES
('E-commerce Sales Dashboard', 'Developed an interactive dashboard using Power BI to analyze e-commerce sales trends, customer behavior, and product performance. The dashboard provides actionable insights that helped increase revenue by 15% and optimize marketing strategies.', 'Interactive dashboard analyzing sales trends', 1, 'https://imgur.com/BJcBweu.png', 'https://example.com/project1', 'https://linkedin.com/in/mohamed-hamdy/project1', '{"Power BI", "SQL", "Excel", "DAX"}', '2023-05-01', true, true),
('Customer Churn Prediction Model', 'Built a machine learning model to predict customer churn for a telecommunications company. The model achieved 87% accuracy and helped the company implement targeted retention strategies, reducing churn rate by 23%.', 'ML model to predict customer churn', 2, '', '', '', '{"Python", "Scikit-learn", "TensorFlow", "Pandas", "Matplotlib"}', '2023-03-01', true, true),
('Financial Performance Analysis', 'Conducted a comprehensive analysis of financial data for a multinational corporation. Identified key trends, anomalies, and opportunities for cost reduction, resulting in savings of over $500,000 annually.', 'Comprehensive financial data analysis', 3, '', '', 'https://linkedin.com/in/mohamed-hamdy/project3', '{"Tableau", "Excel", "SQL", "R"}', '2023-01-01', true, true),
('Market Research Statistical Analysis', 'Performed statistical analysis on market research data to identify consumer preferences and market trends. The insights guided product development and marketing strategies, contributing to a 20% increase in market share.', 'Statistical analysis of market research data', 4, '', 'https://example.com/project4', '', '{"R", "SPSS", "Python", "Pandas", "NumPy"}', '2022-11-01', true, true);

-- Insert services data
INSERT INTO services (title, description, icon, color, features, enabled) VALUES
('Data Analysis', 'Comprehensive analysis of your data to extract valuable insights', 'BarChart2', 'bg-blue-500', '{"Exploratory data analysis", "Pattern recognition", "Trend identification", "Anomaly detection", "Correlation analysis"}', true),
('Data Visualization', 'Transform complex data into clear, compelling visual stories', 'PieChart', 'bg-purple-500', '{"Interactive dashboards", "Custom charts and graphs", "Infographics", "Real-time data visualization", "Executive reports"}', true),
('Predictive Analytics', 'Forecast future trends and outcomes using advanced statistical models', 'TrendingUp', 'bg-green-500', '{"Forecasting models", "Risk assessment", "Market trend prediction", "Customer behavior prediction", "Scenario analysis"}', false),
('Business Intelligence', 'Transform raw data into actionable business insights', 'Activity', 'bg-yellow-500', '{"KPI development and tracking", "Performance analytics", "Competitive analysis", "Market research", "Strategic recommendations"}', true),
('Data Cleaning & Preparation', 'Ensure your data is accurate, consistent, and ready for analysis', 'Filter', 'bg-red-500', '{"Data cleaning and validation", "Missing data imputation", "Data transformation", "Feature engineering", "Dataset integration"}', false),
('Machine Learning Solutions', 'Custom machine learning models to solve complex business problems', 'Brain', 'bg-cyan-500', '{"Classification models", "Regression models", "Clustering algorithms", "Natural language processing", "Computer vision solutions"}', true);

-- Insert education data
INSERT INTO education (year, institution, degree, details) VALUES
('2022 - Present', 'Mansoura University', 'Bachelor''s in Commerce - Accounting', 'Specializing in financial accounting, cost accounting, and business analytics.');

-- Insert journey data
INSERT INTO journey (year, title, description, details) VALUES
('2024', 'Data Analysis Learning Journey', 'Developing skills in data analysis and business intelligence', 'Started studying data analysis in 2024, focusing on Excel, SQL, Python, and data visualization tools like Power BI. Continuously enhancing my analytical and problem-solving skills through online courses, projects, and hands-on practice. Aiming to integrate data analysis with accounting for better financial insights and decision-making.'),
('2022', 'Enrollment at Mansoura University - Faculty of Commerce', 'Began academic journey in accounting and finance', 'Started my studies at the Faculty of Commerce, Mansoura University, specializing in Accounting. Developed a strong foundation in financial principles, managerial accounting, and business analytics. This academic experience laid the groundwork for my interest in data-driven financial decision-making and analysis.');

-- Insert certifications data
INSERT INTO certifications (title, issuer, date, credential_url, description, enabled) VALUES
('Data Analysis Professional Certificate', 'Google', '2023', 'https://www.credential.net/sample', 'Comprehensive data analysis training covering SQL, R, and data visualization techniques.', true),
('Financial Accounting Specialization', 'University of Illinois', '2022', 'https://www.credential.net/sample', 'Advanced financial accounting principles and practices for business analysis.', true),
('Power BI Data Analyst Associate', 'Microsoft', '2023', 'https://www.credential.net/sample', 'Professional certification in creating and managing business intelligence solutions with Power BI.', true),
('SQL for Data Science', 'University of California, Davis', '2022', 'https://www.credential.net/sample', 'Database querying and manipulation for data analysis and business intelligence.', true);

-- Insert stats data
INSERT INTO stats (name, value, icon, color, enabled) VALUES
('Years of Experience', '1+', 'Clock', 'from-blue-500/20 to-blue-600/5', true),
('Completed Projects', '10+', 'Briefcase', 'from-purple-500/20 to-purple-600/5', true),
('LinkedIn Followers', '500+', 'Linkedin', 'from-cyan-500/20 to-cyan-600/5', true),
('Completed Courses', '15+', 'GraduationCap', 'from-green-500/20 to-green-600/5', true);

-- Insert about features data
INSERT INTO about_features (title, description, icon, color) VALUES
('Data-Driven Approach', 'I base all my decisions and strategies on thorough data analysis', 'Database', 'text-blue-500'),
('Financial Expertise', 'Deep understanding of financial metrics and business KPIs', 'DollarSign', 'text-green-500'),
('Visualization Skills', 'Transform complex data into clear, insightful visualizations', 'BarChart', 'text-purple-500'),
('Problem Solver', 'Identify patterns and solve business problems through analytics', 'PuzzlePiece', 'text-yellow-500'),
('Continuous Learning', 'Always expanding my knowledge of data tools and techniques', 'GraduationCap', 'text-cyan-500'),
('Effective Communication', 'Clearly explain technical findings to non-technical stakeholders', 'MessageSquare', 'text-red-500');

-- Insert freelance platforms data
INSERT INTO freelance_platforms (name, profile_url, logo, color, enabled) VALUES
('Upwork', 'https://www.upwork.com/freelancers/~01b209a44bb4f07b39', 'https://i.imgur.com/zziw256.png', 'border-green-500', true),
('Freelancer', 'https://www.freelancer.com/u/yourusername', 'https://i.imgur.com/zziw256.png', 'border-blue-500', true),
('Mostql', 'https://mostaql.com/u/yourusername', 'https://i.imgur.com/zziw256.png', 'border-yellow-500', true);

-- Insert payment methods data
INSERT INTO payment_methods (name, icon) VALUES
('Instapay', 'CreditCard'),
('Bank Transfer', 'Building'),
('Cryptocurrency', 'Bitcoin');

-- Insert settings data
INSERT INTO settings (key, value, description) VALUES
('website', true, 'Enable/disable the entire website'),
('projects_page', true, 'Enable/disable projects page'),
('services_page', true, 'Enable/disable services page'),
('about_page', true, 'Enable/disable about page'),
('contact_page', true, 'Enable/disable contact page'),
('resume_page', true, 'Enable/disable resume page'),
('projects_home', true, 'Enable/disable projects section on home page'),
('services_home', true, 'Enable/disable services section on home page'),
('about_home', true, 'Enable/disable about section on home page'),
('skills', true, 'Enable/disable skills section'),
('why_work_with_me', true, 'Enable/disable why work with me section'),
('clients', true, 'Enable/disable clients section'),
('contact_home', true, 'Enable/disable contact section on home page'),
('freelance_platforms', true, 'Enable/disable freelance platforms section'),
('payment_methods', true, 'Enable/disable payment methods section'),
('contact_form', true, 'Enable/disable contact form'),
('calendly_feature', true, 'Enable/disable Calendly integration');

-- Insert language settings data
INSERT INTO language_settings (enable_language_toggle, default_language) VALUES
(false, 'en');
