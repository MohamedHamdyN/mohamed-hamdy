// تعريف متغيرات البيئة المتاحة للعميل
export const clientEnv = {
  // متغيرات البيئة العامة التي يمكن استخدامها في جانب العميل
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "https://yourwebsite.com",
}

// تعريف متغيرات البيئة المتاحة للخادم فقط
export const serverEnv = {
  // متغيرات تعطيل الميزات
  DISABLE_WEBSITE: process.env.DISABLE_WEBSITE === "true",
}
