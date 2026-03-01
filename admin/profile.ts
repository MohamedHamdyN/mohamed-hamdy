// معلومات الملف الشخصي
export const profile = {
  // المعلومات الأساسية
  name: "Mohamed Hamdy",
  title: "Data Analyst",
  title2: "Financial Accountant",
  email: "muhamedhamdynour@gmail.com",
  phone: "", // إذا كان فارغًا سيتم إخفاؤه
  location: "", // إذا كان فارغًا سيتم إخفاؤه

  // السيرة الذاتية
  bio: "Data Analyst & Financial Accountant with expertise in transforming complex data into actionable insights.",
  shortBio: "Aspiring Data Analyst with a focus on financial data and business insights.",
  longBio: `I'm a dedicated Data Analyst and Financial Accountant with a passion for transforming complex financial data into actionable insights that drive business decisions.

With a strong foundation in financial accounting and advanced data analysis techniques, I help businesses understand their financial health, identify growth opportunities, and optimize their operations through data-driven strategies.

My approach combines technical expertise with clear communication, ensuring that complex data insights are accessible and valuable to stakeholders at all levels of the organization.`,

  // الصور
  logo: "https://i.imgur.com/zziw256.png",
  favicon: "https://i.postimg.cc/DzW8X6mX/apple-touch-icon.png",
  avatar: "https://i.imgur.com/zziw256.png",
  defaultProjectImage: "https://i.imgur.com/zziw256.png",
  defaultClientLogo: "https://i.imgur.com/zziw256.png",
  defaultPlatformLogo: "https://i.imgur.com/zziw256.png",
  ogImage: "https://i.imgur.com/zziw256.png",

  // روابط
  resumeUrl: "https://drive.google.com/file/d/18GP_gCewc2svPC0-F62o_Nm0VwtlcK0k/view?usp=drive_link",
  calendlyUrl: "https://calendly.com/mohamedhamdynour/30min",

  // إحصائيات قابلة للتخصيص
  stats: [
    {
      id: 1,
      name: "Years of Experience",
      value: "1+",
      icon: "Clock",
      color: "from-blue-500/20 to-blue-600/5",
      enabled: true,
    },
    {
      id: 2,
      name: "Completed Projects",
      value: "10+",
      icon: "Briefcase",
      color: "from-purple-500/20 to-purple-600/5",
      enabled: true,
    },
    {
      id: 3,
      name: "LinkedIn Followers",
      value: "500+",
      icon: "Linkedin",
      color: "from-cyan-500/20 to-cyan-600/5",
      enabled: true,
    },
    {
      id: 4,
      name: "Completed Courses",
      value: "15+",
      icon: "GraduationCap",
      color: "from-green-500/20 to-green-600/5",
      enabled: true,
    },
  ],

  // الشهادات
  certifications: [
    {
      id: 1,
      title: "Data Analysis Professional Certificate",
      issuer: "Google",
      date: "2023",
      credentialUrl: "https://www.credential.net/sample",
      description: "Comprehensive data analysis training covering SQL, R, and data visualization techniques.",
      enabled: true,
    },
    {
      id: 2,
      title: "Financial Accounting Specialization",
      issuer: "University of Illinois",
      date: "2022",
      credentialUrl: "https://www.credential.net/sample",
      description: "Advanced financial accounting principles and practices for business analysis.",
      enabled: true,
    },
    {
      id: 3,
      title: "Power BI Data Analyst Associate",
      issuer: "Microsoft",
      date: "2023",
      credentialUrl: "https://www.credential.net/sample",
      description: "Professional certification in creating and managing business intelligence solutions with Power BI.",
      enabled: true,
    },
    {
      id: 4,
      title: "SQL for Data Science",
      issuer: "University of California, Davis",
      date: "2022",
      credentialUrl: "https://www.credential.net/sample",
      description: "Database querying and manipulation for data analysis and business intelligence.",
      enabled: true,
    },
  ],

  // وسائل التواصل الاجتماعي
  socialLinks: {
    linkedin: "https://linkedin.com/in/mohamedhamdynour",
    github: "https://github.com/mohamedhamdynour",
    twitter: "https://twitter.com/MoBinHamdy",
    instagram: "https://instagram.com/mohamedhamdyn",
    datacamp: "https://www.datacamp.com/portfolio/mohamedhamdynour",
    facebook: "https://facebook.com/mohamedhamdyn",
    // يمكن إضافة المزيد من المواقع هنا
  },

  // التعليم والخبرة
  journey: [
    {
      year: "2024",
      title: "Data Analysis Learning Journey",
      description: "Developing skills in data analysis and business intelligence",
      details:
        "Started studying data analysis in 2024, focusing on Excel, SQL, Python, and data visualization tools like Power BI. Continuously enhancing my analytical and problem-solving skills through online courses, projects, and hands-on practice. Aiming to integrate data analysis with accounting for better financial insights and decision-making.",
    },
    {
      year: "2022",
      title: "Enrollment at Mansoura University - Faculty of Commerce",
      description: "Began academic journey in accounting and finance",
      details:
        "Started my studies at the Faculty of Commerce, Mansoura University, specializing in Accounting. Developed a strong foundation in financial principles, managerial accounting, and business analytics. This academic experience laid the groundwork for my interest in data-driven financial decision-making and analysis.",
    },
  ],

  // التعليم
  education: [
    {
      year: "2022 - Present",
      institution: "Mansoura University",
      degree: "Bachelor's in Commerce - Accounting",
      details: "Specializing in financial accounting, cost accounting, and business analytics.",
    },
  ],
}

// إعدادات اللغة
export const languageSettings = {
  enableLanguageToggle: false,
  defaultLanguage: "en", // en, ar
}
