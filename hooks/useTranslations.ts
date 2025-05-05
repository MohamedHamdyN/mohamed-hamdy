"use client"

import { useLanguage } from "@/context/language-context"
import { translations } from "@/lib/translations"

export function useTranslations() {
  const { language } = useLanguage()

  // Return translations based on the selected language
  // Fallback to English if the selected language is not available
  return translations[language] || translations.en
}
