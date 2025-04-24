import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines class names with Tailwind CSS classes
 * @param inputs - Class names to combine
 * @returns Combined class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a date string to a localized format
 * @param dateString - Date string to format
 * @param locale - Locale to use for formatting
 * @returns Formatted date string
 */
export function formatDate(dateString: string, locale = "en-US"): string {
  const date = new Date(dateString)

  // Check if date is valid
  if (isNaN(date.getTime())) {
    return dateString
  }

  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
  }).format(date)
}

/**
 * Truncates text to a specified length
 * @param text - Text to truncate
 * @param maxLength - Maximum length of the truncated text
 * @returns Truncated text
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + "..."
}

/**
 * Counts projects by category
 * @param projects - Array of projects
 * @returns Object with category counts
 */
export function countProjectsByCategory(projects: any[]): Record<string, number> {
  return projects.reduce((acc, project) => {
    const category = project.category
    acc[category] = (acc[category] || 0) + 1
    return acc
  }, {})
}
