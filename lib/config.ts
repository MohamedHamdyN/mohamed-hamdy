import { serverEnv } from "./env"

// تكوين الموقع المركزي
export const siteConfig = {
  // ميزات الموقع
  features: {
    websiteEnabled: !serverEnv.DISABLE_WEBSITE,
  },
}
