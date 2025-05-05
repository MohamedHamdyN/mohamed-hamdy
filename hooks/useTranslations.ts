"use client"

import { useState, useEffect } from "react"
import { getTranslations, getCurrentLanguage, setLanguage as setLang, type Language } from "@/lib/language-utils"

export function useTranslations() {
  const [translations, setTranslations] = useState(getTranslations())

  useEffect(() => {
    // تحديث الترجمات عند تحميل المكون
    setTranslations(getTranslations())

    // الاستماع لأحداث التخزين (في حالة تغيير اللغة في علامة تبويب أخرى)
    const handleStorageChange = () => {
      setTranslations(getTranslations())
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  return translations
}

// خطاف للحصول على اللغة وتعيينها
export function useLanguage() {
  const [language, setLangState] = useState<Language>(getCurrentLanguage())
  const [isRTL, setIsRTL] = useState(language === "ar")

  useEffect(() => {
    // تحديث الحالة عند تحميل المكون
    const currentLang = getCurrentLanguage()
    setLangState(currentLang)
    setIsRTL(currentLang === "ar")

    // الاستماع لأحداث التخزين (في حالة تغيير اللغة في علامة تبويب أخرى)
    const handleStorageChange = () => {
      const newLang = getCurrentLanguage()
      setLangState(newLang)
      setIsRTL(newLang === "ar")
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const setLanguage = (newLang: Language) => {
    setLang(newLang)
    setLangState(newLang)
    setIsRTL(newLang === "ar")
  }

  return { language, setLanguage, isRTL }
}
