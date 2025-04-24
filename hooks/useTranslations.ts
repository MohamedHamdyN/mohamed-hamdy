"use client"

import { useLanguage } from "@/context/language-context"
import { translations } from "@/lib/translations"

export function useTranslations() {
  const { language } = useLanguage()

  // استخدام الترجمات المناسبة حسب اللغة المحددة
  // مع الرجوع إلى اللغة الإنجليزية كاحتياطي
  return translations[language] || translations.en
}
