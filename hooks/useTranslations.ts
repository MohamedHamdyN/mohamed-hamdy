"use client"

import { getTranslations, type Translations } from "@/lib/translations"

export function useTranslations(): Translations {
  // Always return English-only translations (no context, no localStorage, no RTL)
  return getTranslations()
}