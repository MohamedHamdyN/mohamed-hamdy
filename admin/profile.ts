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
  resumeUrl: "https://drive.google.com/file/d/170bD9hOyw6qSMxOcWJw40pt2_fOL3TaE/view?usp=drive_link",
  calendlyUrl: "https://calendly.com/mohamedhamdynour/30min",

  // إحصائيات
  experienceYears: "2",
  projectsCount: "00", // سيتم حساب العدد تلقائيًا من مصفوفة المشاريع

  // وسائل التواصل الاجتماعي
  socialLinks: {
    linkedin: "https://linkedin.com/in/mohamedhamdynour",
    github: "https://github.com/mohamedhamdynour",
    twitter: "https://twitter.com/mohamedhamdy15_",
    instagram: "https://instagram.com/muhamedhamdy15",
    datacamp: "https://www.datacamp.com/portfolio/mohamedhamdynour",
    facebook: "",
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
  enableLanguageToggle: true,
  defaultLanguage: "en", // en, ar
}
