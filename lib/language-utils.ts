"use client"

import { languageSettings } from "@/admin/profile"
import { translations } from "@/lib/translations"

export type Language = "en" | "ar"

// الحصول على اللغة الحالية من localStorage أو استخدام اللغة الافتراضية
export function getCurrentLanguage(): Language {
  if (typeof window === "undefined") {
    return (languageSettings.defaultLanguage as Language) || "en"
  }

  try {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "ar")) {
      return savedLanguage
    }
  } catch (error) {
    console.error("Error accessing localStorage:", error)
  }

  return (languageSettings.defaultLanguage as Language) || "en"
}

// تعيين اللغة في localStorage وتحديث خصائص المستند
export function setLanguage(language: Language): void {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem("language", language)

    // تحديث سمة dir في HTML
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr"

    // تحديث عائلة الخط بناءً على اللغة
    if (language === "ar") {
      document.documentElement.classList.add("font-cairo")
      document.documentElement.classList.remove("font-inter")
    } else {
      document.documentElement.classList.add("font-inter")
      document.documentElement.classList.remove("font-cairo")
    }
  } catch (error) {
    console.error("Error saving to localStorage:", error)
  }
}

// التحقق مما إذا كانت اللغة الحالية هي RTL
export function isRTL(): boolean {
  return getCurrentLanguage() === "ar"
}

// الحصول على الترجمات للغة الحالية
export function getTranslations() {
  const language = getCurrentLanguage()
  return translations[language] || translations.en
}
