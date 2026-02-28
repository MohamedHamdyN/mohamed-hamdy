-- Seed profile data
INSERT INTO profile (full_name, job_title, short_title, hero_description, hero_image_type, hero_image_url, location, open_to_work, email, phone, short_bio, long_bio, resume_url, calendly_url, avatar_url, og_image_url)
VALUES (
  'Mohamed Hamdy',
  'Data Analyst',
  'Financial Accountant',
  'Data Analyst & Financial Accountant with expertise in transforming complex data into actionable insights.',
  'logo',
  'https://i.imgur.com/zziw256.png',
  '',
  true,
  'muhamedhamdynour@gmail.com',
  '',
  'Aspiring Data Analyst with a focus on financial data and business insights.',
  'I''m a dedicated Data Analyst and Financial Accountant with a passion for transforming complex financial data into actionable insights that drive business decisions.

With a strong foundation in financial accounting and advanced data analysis techniques, I help businesses understand their financial health, identify growth opportunities, and optimize their operations through data-driven strategies.

My approach combines technical expertise with clear communication, ensuring that complex data insights are accessible and valuable to stakeholders at all levels of the organization.',
  'https://drive.google.com/file/d/18GP_gCewc2svPC0-F62o_Nm0VwtlcK0k/view?usp=drive_link',
  'https://calendly.com/mohamedhamdynour/30min',
  'https://i.imgur.com/zziw256.png',
  'https://i.imgur.com/zziw256.png'
) ON CONFLICT DO NOTHING;

-- Seed social links
INSERT INTO social_links (platform_name, url, icon_name, is_active)
VALUES
  ('LinkedIn', 'https://linkedin.com/in/mohamedhamdynour', 'Linkedin', true),
  ('GitHub', 'https://github.com/mohamedhamdynour', 'Github', true),
  ('Twitter', 'https://twitter.com/MoBinHamdy', 'Twitter', true),
  ('Instagram', 'https://instagram.com/mohamedhamdyn', 'Instagram', true),
  ('DataCamp', 'https://www.datacamp.com/portfolio/mohamedhamdynour', 'TrendingUp', true),
  ('Facebook', 'https://facebook.com/mohamedhamdyn', 'Facebook', true)
ON CONFLICT DO NOTHING;

-- Seed skills
INSERT INTO skills (category, name, description, level, icon_name, color, enabled)
VALUES
  ('Analytics', 'Financial Data Analysis', 'Analyzing financial statements and business data', 'advanced', 'BarChart2', 'text-blue-500', true),
  ('Visualization', 'Data Visualization', 'Creating insightful financial dashboards', 'advanced', 'PieChart', 'text-purple-500', true),
  ('Analytics', 'Accounting Analytics', 'Applying analytics to financial reporting and auditing', 'advanced', 'FileText', 'text-green-500', true),
  ('Analytics', 'Statistical Analysis', 'Using statistical methods for financial forecasting', 'advanced', 'LineChart', 'text-yellow-500', true),
  ('Database', 'SQL for Finance', 'Querying financial databases for insights', 'intermediate', 'Database', 'text-red-500', true),
  ('Programming', 'Python for Accounting', 'Automating financial analysis and reporting', 'intermediate', 'Code', 'text-cyan-500', true),
  ('Tools', 'Power BI', 'Building interactive financial dashboards', 'advanced', 'TrendingUp', 'text-orange-500', true),
  ('Analytics', 'Cost and Budget Analysis', 'Analyzing budgets and cost structures', 'intermediate', 'DollarSign', 'text-indigo-500', true),
  ('Analytics', 'Financial Forecasting', 'Predicting financial trends using data models', 'intermediate', 'Activity', 'text-teal-500', true),
  ('Analytics', 'Risk Analysis', 'Assessing financial risks through data analytics', 'intermediate', 'Shield', 'text-gray-500', true)
ON CONFLICT DO NOTHING;

-- Seed projects
INSERT INTO projects (title, slug, short_description, description, category, tools_summary, featured, status, image_url, project_url)
VALUES
  (
    'E-commerce Sales Dashboard',
    'ecommerce-sales-dashboard',
    'Interactive dashboard analyzing sales trends',
    'Developed an interactive dashboard using Power BI to analyze e-commerce sales trends, customer behavior, and product performance. The dashboard provides actionable insights that helped increase revenue by 15% and optimize marketing strategies.',
    'Data Visualization',
    'Power BI, SQL, Excel, DAX',
    true,
    'published',
    'https://imgur.com/BJcBweu.png',
    'https://example.com/project1'
  ),
  (
    'Customer Churn Prediction Model',
    'customer-churn-prediction',
    'ML model to predict customer churn',
    'Built a machine learning model to predict customer churn for a telecommunications company. The model achieved 87% accuracy and helped the company implement targeted retention strategies, reducing churn rate by 23%.',
    'Machine Learning',
    'Python, Scikit-learn, TensorFlow, Pandas, Matplotlib',
    true,
    'published',
    '',
    ''
  ),
  (
    'Financial Performance Analysis',
    'financial-performance-analysis',
    'Comprehensive financial data analysis',
    'Conducted a comprehensive analysis of financial data for a multinational corporation. Identified key trends, anomalies, and opportunities for cost reduction, resulting in savings of over $500,000 annually.',
    'Business Intelligence',
    'Tableau, Excel, SQL, R',
    true,
    'published',
    '',
    ''
  ),
  (
    'Market Research Statistical Analysis',
    'market-research-analysis',
    'Statistical analysis of market research data',
    'Performed statistical analysis on market research data to identify consumer preferences and market trends. The insights guided product development and marketing strategies, contributing to a 20% increase in market share.',
    'Statistical Analysis',
    'R, SPSS, Python, Pandas, NumPy',
    true,
    'published',
    '',
    'https://example.com/project4'
  )
ON CONFLICT (slug) DO NOTHING;

-- Seed project details
INSERT INTO project_details (project_id, problem, data_used, analysis_process, business_insights, outcome)
VALUES
  (
    1,
    'E-commerce company needed to understand sales trends and customer behavior',
    'Sales transactions, customer demographics, product data',
    'Cleaned and transformed data using SQL, created interactive visualizations in Power BI, performed trend analysis',
    'Identified peak sales periods and customer segments with highest lifetime value',
    'Increased revenue by 15% through targeted marketing strategies'
  ),
  (
    2,
    'Telecommunications company was losing customers at high rates',
    'Customer usage patterns, billing history, customer support interactions',
    'Built classification models using Python, trained on historical churn data',
    'Identified key factors driving customer churn early in customer lifecycle',
    'Reduced churn rate by 23% through proactive retention strategies'
  ),
  (
    3,
    'Corporation needed insight into financial health and cost optimization opportunities',
    'Financial statements, departmental budgets, operational costs',
    'Performed comprehensive financial ratio analysis and trend analysis',
    'Found significant cost reduction opportunities in multiple departments',
    'Achieved $500,000 annual savings through cost optimization'
  ),
  (
    4,
    'Company wanted to understand market trends and consumer preferences',
    'Survey responses, market research datasets, competitor analysis data',
    'Conducted statistical tests and performed clustering analysis',
    'Identified emerging market segments and customer preferences',
    'Increased market share by 20% through targeted product development'
  )
ON CONFLICT DO NOTHING;
