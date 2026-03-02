"use client"

import { getTranslations, type Translations } from "@/lib/translations"

export function useTranslations(): Translations {
  return getTranslations() // English-only
}