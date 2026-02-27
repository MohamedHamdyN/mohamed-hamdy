import prisma from "@/lib/db/client"
import { hash } from "bcryptjs"

async function main() {
  console.log("[v0] Starting database seed...")

  try {
    // Create admin user if it doesn't exist
    const adminEmail = "admin@portfolio.com"
    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminEmail },
    })

    if (!existingAdmin) {
      const hashedPassword = await hash("admin123", 12)
      await prisma.user.create({
        data: {
          email: adminEmail,
          name: "Admin",
          password: hashedPassword,
        },
      })
      console.log("[v0] Created admin user")
    } else {
      console.log("[v0] Admin user already exists")
    }

    // Create default profile if it doesn't exist
    const existingProfile = await prisma.profile.findFirst()

    if (!existingProfile) {
      const profile = await prisma.profile.create({
        data: {
          name: "Mohamed Hamdy",
          title: "Data Analyst",
          title2: "Financial Accountant",
          email: "muhamedhamdynour@gmail.com",
          phone: null,
          location: null,
          bio: "Data Analyst & Financial Accountant with expertise in transforming complex data into actionable insights.",
          shortBio: "Aspiring Data Analyst with a focus on financial data and business insights.",
          longBio: `I'm a dedicated Data Analyst and Financial Accountant with a passion for transforming complex financial data into actionable insights that drive business decisions.

With a strong foundation in financial accounting and advanced data analysis techniques, I help businesses understand their financial health, identify growth opportunities, and optimize their operations through data-driven strategies.

My approach combines technical expertise with clear communication, ensuring that complex data insights are accessible and valuable to stakeholders at all levels of the organization.`,
          logo: "https://i.imgur.com/zziw256.png",
          favicon: "https://i.postimg.cc/DzW8X6mX/apple-touch-icon.png",
          avatar: "https://i.imgur.com/zziw256.png",
          defaultProjectImage: "https://i.imgur.com/zziw256.png",
          defaultClientLogo: "https://i.imgur.com/zziw256.png",
          defaultPlatformLogo: "https://i.imgur.com/zziw256.png",
          ogImage: "https://i.imgur.com/zziw256.png",
          resumeUrl: "https://drive.google.com/file/d/18GP_gCewc2svPC0-F62o_Nm0VwtlcK0k/view?usp=drive_link",
          calendlyUrl: "https://calendly.com/mohamedhamdynour/30min",
        },
      })

      // Add social links
      await prisma.socialLink.createMany({
        data: [
          {
            profileId: profile.id,
            platform: "linkedin",
            url: "https://linkedin.com/in/mohamedhamdynour",
            isActive: true,
            order: 1,
          },
          {
            profileId: profile.id,
            platform: "github",
            url: "https://github.com/mohamedhamdynour",
            isActive: true,
            order: 2,
          },
          {
            profileId: profile.id,
            platform: "twitter",
            url: "https://twitter.com/MoBinHamdy",
            isActive: true,
            order: 3,
          },
          {
            profileId: profile.id,
            platform: "instagram",
            url: "https://instagram.com/mohamedhamdyn",
            isActive: true,
            order: 4,
          },
        ],
      })

      // Add stats
      await prisma.stat.createMany({
        data: [
          {
            profileId: profile.id,
            name: "Years of Experience",
            value: "1+",
            icon: "Clock",
            color: "from-blue-500/20 to-blue-600/5",
            enabled: true,
            order: 1,
          },
          {
            profileId: profile.id,
            name: "Completed Projects",
            value: "10+",
            icon: "Briefcase",
            color: "from-purple-500/20 to-purple-600/5",
            enabled: true,
            order: 2,
          },
          {
            profileId: profile.id,
            name: "LinkedIn Followers",
            value: "500+",
            icon: "Linkedin",
            color: "from-cyan-500/20 to-cyan-600/5",
            enabled: true,
            order: 3,
          },
          {
            profileId: profile.id,
            name: "Completed Courses",
            value: "15+",
            icon: "GraduationCap",
            color: "from-green-500/20 to-green-600/5",
            enabled: true,
            order: 4,
          },
        ],
      })

      // Add certifications
      await prisma.certification.createMany({
        data: [
          {
            profileId: profile.id,
            title: "Data Analysis Professional Certificate",
            issuer: "Google",
            date: "2023",
            credentialUrl: "https://www.credential.net/sample",
            description:
              "Comprehensive data analysis training covering SQL, R, and data visualization techniques.",
            enabled: true,
            order: 1,
          },
          {
            profileId: profile.id,
            title: "Financial Accounting Specialization",
            issuer: "University of Illinois",
            date: "2022",
            credentialUrl: "https://www.credential.net/sample",
            description: "Advanced financial accounting principles and practices for business analysis.",
            enabled: true,
            order: 2,
          },
          {
            profileId: profile.id,
            title: "Power BI Data Analyst Associate",
            issuer: "Microsoft",
            date: "2023",
            credentialUrl: "https://www.credential.net/sample",
            description:
              "Professional certification in creating and managing business intelligence solutions with Power BI.",
            enabled: true,
            order: 3,
          },
          {
            profileId: profile.id,
            title: "SQL for Data Science",
            issuer: "University of California, Davis",
            date: "2022",
            credentialUrl: "https://www.credential.net/sample",
            description: "Database querying and manipulation for data analysis and business intelligence.",
            enabled: true,
            order: 4,
          },
        ],
      })

      // Add journey entries
      await prisma.journeyEntry.createMany({
        data: [
          {
            profileId: profile.id,
            year: "2024",
            title: "Data Analysis Learning Journey",
            description: "Developing skills in data analysis and business intelligence",
            details:
              "Started studying data analysis in 2024, focusing on Excel, SQL, Python, and data visualization tools like Power BI. Continuously enhancing my analytical and problem-solving skills through online courses, projects, and hands-on practice. Aiming to integrate data analysis with accounting for better financial insights and decision-making.",
            order: 1,
          },
          {
            profileId: profile.id,
            year: "2022",
            title: "Enrollment at Mansoura University - Faculty of Commerce",
            description: "Began academic journey in accounting and finance",
            details:
              "Started my studies at the Faculty of Commerce, Mansoura University, specializing in Accounting. Developed a strong foundation in financial principles, managerial accounting, and business analytics. This academic experience laid the groundwork for my interest in data-driven financial decision-making and analysis.",
            order: 2,
          },
        ],
      })

      // Add education entries
      await prisma.educationEntry.createMany({
        data: [
          {
            profileId: profile.id,
            year: "2022 - Present",
            institution: "Mansoura University",
            degree: "Bachelor's in Commerce - Accounting",
            details: "Specializing in financial accounting, cost accounting, and business analytics.",
            order: 1,
          },
        ],
      })

      console.log("[v0] Created profile with related data")
    } else {
      console.log("[v0] Profile already exists")
    }

    // Create project categories if they don't exist
    const categories = [
      { id: 1, name: "Data Visualization", key: "dataVisualization" },
      { id: 2, name: "Machine Learning", key: "machineLeaning" },
      { id: 3, name: "Business Intelligence", key: "businessIntelligence" },
      { id: 4, name: "Statistical Analysis", key: "statisticalAnalysis" },
      { id: 5, name: "Data Engineering", key: "dataEngineering" },
    ]

    for (const category of categories) {
      const existing = await prisma.projectCategory.findUnique({
        where: { id: category.id },
      })

      if (!existing) {
        await prisma.projectCategory.create({
          data: category,
        })
      }
    }

    console.log("[v0] Project categories ensured")

    // Seed projects if none exist
    const existingProjects = await prisma.project.count()

    if (existingProjects === 0) {
      await prisma.project.createMany({
        data: [
          {
            title: "E-commerce Sales Dashboard",
            shortDescription: "Interactive dashboard analyzing sales trends",
            description:
              "Developed an interactive dashboard using Power BI to analyze e-commerce sales trends, customer behavior, and product performance. The dashboard provides actionable insights that helped increase revenue by 15% and optimize marketing strategies.",
            slug: "ecommerce-sales-dashboard",
            categoryId: 1,
            image: "https://imgur.com/BJcBweu.png",
            projectUrl: "https://example.com/project1",
            linkedinUrl: "https://linkedin.com/in/mohamed-hamdy/project1",
            technologies: ["Power BI", "SQL", "Excel", "DAX"],
            date: "2023-05",
            featured: true,
            status: "published",
          },
          {
            title: "Customer Churn Prediction Model",
            shortDescription: "ML model to predict customer churn",
            description:
              "Built a machine learning model to predict customer churn for a telecommunications company. The model achieved 87% accuracy and helped the company implement targeted retention strategies, reducing churn rate by 23%.",
            slug: "customer-churn-prediction",
            categoryId: 2,
            image: null,
            projectUrl: null,
            linkedinUrl: null,
            technologies: ["Python", "Scikit-learn", "TensorFlow", "Pandas", "Matplotlib"],
            date: "2023-03",
            featured: true,
            status: "published",
          },
          {
            title: "Financial Performance Analysis",
            shortDescription: "Comprehensive financial data analysis",
            description:
              "Conducted a comprehensive analysis of financial data for a multinational corporation. Identified key trends, anomalies, and opportunities for cost reduction, resulting in savings of over $500,000 annually.",
            slug: "financial-performance-analysis",
            categoryId: 3,
            image: null,
            projectUrl: null,
            linkedinUrl: "https://linkedin.com/in/mohamed-hamdy/project3",
            technologies: ["Tableau", "Excel", "SQL", "R"],
            date: "2023-01",
            featured: true,
            status: "published",
          },
          {
            title: "Market Research Statistical Analysis",
            shortDescription: "Statistical analysis of market research data",
            description:
              "Performed statistical analysis on market research data to identify consumer preferences and market trends. The insights guided product development and marketing strategies, contributing to a 20% increase in market share.",
            slug: "market-research-analysis",
            categoryId: 4,
            image: null,
            projectUrl: "https://example.com/project4",
            linkedinUrl: null,
            technologies: ["R", "SPSS", "Python", "Pandas", "NumPy"],
            date: "2022-11",
            featured: true,
            status: "published",
          },
        ],
      })

      console.log("[v0] Created projects")
    } else {
      console.log("[v0] Projects already exist")
    }

    // Seed skills if none exist
    const existingSkills = await prisma.skill.count()

    if (existingSkills === 0) {
      await prisma.skill.createMany({
        data: [
          {
            name: "Financial Data Analysis",
            description: "Analyzing financial statements and business data",
            icon: "BarChart2",
            color: "text-blue-500",
            enabled: true,
            order: 1,
          },
          {
            name: "Data Visualization",
            description: "Creating insightful financial dashboards",
            icon: "PieChart",
            color: "text-purple-500",
            enabled: true,
            order: 2,
          },
          {
            name: "Accounting Analytics",
            description: "Applying analytics to financial reporting and auditing",
            icon: "FileText",
            color: "text-green-500",
            enabled: true,
            order: 3,
          },
          {
            name: "Statistical Analysis",
            description: "Using statistical methods for financial forecasting",
            icon: "LineChart",
            color: "text-yellow-500",
            enabled: true,
            order: 4,
          },
          {
            name: "SQL for Finance",
            description: "Querying financial databases for insights",
            icon: "Database",
            color: "text-red-500",
            enabled: true,
            order: 5,
          },
          {
            name: "Python for Accounting",
            description: "Automating financial analysis and reporting",
            icon: "Code",
            color: "text-cyan-500",
            enabled: true,
            order: 6,
          },
          {
            name: "Power BI",
            description: "Building interactive financial dashboards",
            icon: "TrendingUp",
            color: "text-orange-500",
            enabled: true,
            order: 7,
          },
          {
            name: "Cost and Budget Analysis",
            description: "Analyzing budgets and cost structures",
            icon: "DollarSign",
            color: "text-indigo-500",
            enabled: true,
            order: 8,
          },
          {
            name: "Financial Forecasting",
            description: "Predicting financial trends using data models",
            icon: "Activity",
            color: "text-teal-500",
            enabled: true,
            order: 9,
          },
          {
            name: "Risk Analysis",
            description: "Assessing financial risks through data analytics",
            icon: "Shield",
            color: "text-gray-500",
            enabled: true,
            order: 10,
          },
        ],
      })

      console.log("[v0] Created skills")
    } else {
      console.log("[v0] Skills already exist")
    }

    // Seed clients if none exist
    const existingClients = await prisma.client.count()

    if (existingClients === 0) {
      await prisma.client.createMany({
        data: [
          {
            name: "NovaTech Solutions",
            logo: "https://i.imgur.com/zziw256.png",
            testimonial:
              "The data analysis provided crucial insights that helped us refine our digital transformation strategy.",
            rating: 5,
            website: "https://novatech-solutions.com",
            lastProject: "https://example.com/novatech-project",
            enabled: true,
            order: 1,
          },
          {
            name: "Skyline Finance",
            logo: "https://i.imgur.com/zziw256.png",
            testimonial:
              "The financial forecasting models helped us optimize our risk management and investment planning.",
            rating: 5,
            website: "https://skyline-finance.com",
            lastProject: "https://example.com/skyline-project",
            enabled: true,
            order: 2,
          },
          {
            name: "SwiftRetail",
            logo: "https://i.imgur.com/zziw256.png",
            testimonial:
              "The customer segmentation analysis significantly improved our targeted marketing campaigns.",
            rating: 4,
            website: "https://swift-retail.com",
            lastProject: null,
            enabled: true,
            order: 3,
          },
          {
            name: "MediCare Innovations",
            logo: "https://i.imgur.com/zziw256.png",
            testimonial:
              "Predictive analytics enabled us to enhance patient care and optimize resource allocation.",
            rating: 5,
            website: null,
            lastProject: "https://example.com/medicare-project",
            enabled: true,
            order: 4,
          },
          {
            name: "BrightLearn Academy",
            logo: "https://i.imgur.com/zziw256.png",
            testimonial:
              "The learning analytics provided valuable insights that improved student engagement and performance.",
            rating: 4,
            website: "https://brightlearn-academy.com",
            lastProject: null,
            enabled: true,
            order: 5,
          },
        ],
      })

      console.log("[v0] Created clients")
    } else {
      console.log("[v0] Clients already exist")
    }

    // Seed services if none exist
    const existingServices = await prisma.service.count()

    if (existingServices === 0) {
      await prisma.service.createMany({
        data: [
          {
            title: "Data Analysis",
            description: "Comprehensive analysis of your data to extract valuable insights",
            icon: "BarChart2",
            color: "bg-blue-500",
            features: [
              "Exploratory data analysis",
              "Pattern recognition",
              "Trend identification",
              "Anomaly detection",
              "Correlation analysis",
            ],
            enabled: true,
            order: 1,
          },
          {
            title: "Data Visualization",
            description: "Transform complex data into clear, compelling visual stories",
            icon: "PieChart",
            color: "bg-purple-500",
            features: [
              "Interactive dashboards",
              "Custom charts and graphs",
              "Infographics",
              "Real-time data visualization",
              "Executive reports",
            ],
            enabled: true,
            order: 2,
          },
          {
            title: "Predictive Analytics",
            description: "Forecast future trends and outcomes using advanced statistical models",
            icon: "TrendingUp",
            color: "bg-green-500",
            features: [
              "Forecasting models",
              "Risk assessment",
              "Market trend prediction",
              "Customer behavior prediction",
              "Scenario analysis",
            ],
            enabled: false,
            order: 3,
          },
          {
            title: "Business Intelligence",
            description: "Transform raw data into actionable business insights",
            icon: "Activity",
            color: "bg-yellow-500",
            features: [
              "KPI development and tracking",
              "Performance analytics",
              "Competitive analysis",
              "Market research",
              "Strategic recommendations",
            ],
            enabled: true,
            order: 4,
          },
          {
            title: "Data Cleaning & Preparation",
            description: "Ensure your data is accurate, consistent, and ready for analysis",
            icon: "Filter",
            color: "bg-red-500",
            features: [
              "Data cleaning and validation",
              "Missing data imputation",
              "Data transformation",
              "Feature engineering",
              "Dataset integration",
            ],
            enabled: false,
            order: 5,
          },
          {
            title: "Machine Learning Solutions",
            description: "Custom machine learning models to solve complex business problems",
            icon: "Brain",
            color: "bg-cyan-500",
            features: [
              "Classification models",
              "Regression models",
              "Clustering algorithms",
              "Natural language processing",
              "Computer vision solutions",
            ],
            enabled: true,
            order: 6,
          },
        ],
      })

      console.log("[v0] Created services")
    } else {
      console.log("[v0] Services already exist")
    }

    // Ensure site settings exist
    const existingSettings = await prisma.siteSettings.count()

    if (existingSettings === 0) {
      await prisma.siteSettings.create({
        data: {
          siteStatus: "active",
          defaultLanguage: "en",
          enableLanguageToggle: false,
          websiteEnabled: true,
          projectsPageEnabled: true,
          servicesPageEnabled: true,
          aboutPageEnabled: true,
          contactPageEnabled: true,
          resumePageEnabled: true,
          projectsHomeEnabled: true,
          servicesHomeEnabled: true,
          aboutHomeEnabled: true,
          skillsEnabled: true,
          whyWorkWithMeEnabled: true,
          clientsEnabled: true,
          contactHomeEnabled: true,
          freelancePlatformsEnabled: true,
          paymentMethodsEnabled: true,
          contactFormEnabled: true,
          calendlyFeatureEnabled: true,
        },
      })

      console.log("[v0] Created site settings")
    } else {
      console.log("[v0] Site settings already exist")
    }

    console.log("[v0] Seeding completed successfully")
    process.exit(0)
  } catch (error) {
    console.error("[v0] Seeding failed:", error)
    process.exit(1)
  }
}

main()
