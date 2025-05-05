export const serverEnv = {
  // Site URL
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",

  // Toggle Features
  disableWebsite: process.env.DISABLE_WEBSITE === "true",
  disableSkills: process.env.DISABLE_SKILLS === "true",
  disableWhyWorkWithMe: process.env.DISABLE_WHY_WORK_WITH_ME === "true",
  disableClients: process.env.DISABLE_CLIENTS === "true",
  disableProjectsHome: process.env.DISABLE_PROJECTS_HOME === "true",
  disableContactHome: process.env.DISABLE_CONTACT_HOME === "true",

  // Email Configuration
  resendApiKey: process.env.RESEND_API_KEY,
  resendFromEmail: process.env.RESEND_FROM_EMAIL,
  resendToEmail: process.env.RESEND_TO_EMAIL,
}
