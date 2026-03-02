export const translations = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      services: "Services",
      projects: "Projects",
      resume: "Resume",
      contact: "Contact",
    },
    hero: {
      greeting: "Hello, I'm",
      title: "Data Analyst",
      title2: "Financial Accountant",
      description: "Transforming complex data into actionable insights that drive business decisions.",
      cta: "View My Work",
      secondaryCta: "About Me",
    },
    skills: {
      title: "My Skills",
      description: "Specialized expertise in data analysis and financial accounting",
    },
    whyWorkWithMe: {
      title: "Why Work With Me",
      description: "Benefits of collaborating with a dedicated data analyst",
    },
    projects: {
      title: "Projects",
      description: "Explore my data analysis work and case studies",
      allProjects: "All Projects",
      viewProject: "View Project",
      project: "Project",
      projects: "Projects",
      noProjectsFound: "No projects found",
      tryDifferentFilters: "Try different filters or search terms",
      searchProjects: "Search projects...",
      sort: "Sort",
      newest: "Newest",
      oldest: "Oldest",
      category: "Category",
      viewAll: "View All Projects",
      viewOnLinkedIn: "View on LinkedIn",
      lastProject: "Last Project",
      filters: {
        all: "All",
        dataVisualization: "Data Visualization",
        machineLeaning: "Machine Learning",
        businessIntelligence: "Business Intelligence",
        statisticalAnalysis: "Statistical Analysis",
        dataEngineering: "Data Engineering",
      },
    },
    about: {
      title: "About Me",
      description: "Learn more about my background and expertise",
      downloadResume: "Download CV",
      viewResume: "View Online",
      yearsOfExperience: "Years of Experience",
      completedProjects: "Completed Projects",
      journey: "My Journey",
      education: "Education",
      experience: "Experience",
      preferToSchedule: "Prefer to schedule a call?",
      scheduleCall: "Schedule a Call",
    },
    services: {
      title: "Services",
      description: "Professional data analysis and financial services",
      viewDetails: "View Details",
      getInTouch: "Get in Touch",
      paymentMethods: "Payment Methods",
      paymentDescription: "Flexible payment options for your convenience",
      features: "Features",
      cta: "Get in Touch",
      freelancePlatforms: "Freelance Platforms",
    },
    contact: {
      title: "Contact",
      description: "Get in touch for collaborations or inquiries",
      name: "Your Name",
      email: "Your Email",
      message: "Your Message",
      send: "Send Message",
      success: "Message sent successfully!",
      error: "Error sending message. Please try again.",
      getInTouch: "Get in Touch",
      connectWithMe: "Connect With Me",
      form: {
        name: "Name",
        email: "Email",
        subject: "Subject",
        message: "Message",
        submit: "Send Message",
      },
    },
    resume: {
      title: "Resume",
      description: "My professional background and qualifications",
      download: "Download PDF",
      skills: "Skills",
      experience: "Experience",
      education: "Education",
      certifications: "Certifications",
    },
    footer: {
      rights: "All rights reserved",
      madeWith: "Made with",
    },
    notFound: {
      title: "Page Not Found",
      description: "The page you are looking for does not exist",
      backHome: "Back to Home",
    },
    newsletter: {
      title: "Subscribe to my newsletter",
      description: "Stay up to date with the latest news and articles.",
      placeholder: "Enter your email",
      submit: "Subscribe",
      success: "Successfully subscribed!",
    },
  }
} as const

export type Language = "en"
export type Translations = typeof translations.en

export function getTranslations(_language?: Language): Translations {
  return translations.en
}