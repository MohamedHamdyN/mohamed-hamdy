"use client"

import { useEffect } from "react"

export default function AlternativeAnalytics() {
  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== "production") return

    // Simple performance tracking as fallback
    const trackPerformance = () => {
      try {
        if (typeof window !== "undefined" && window.performance) {
          const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming
          const paint = performance.getEntriesByType("paint")

          const metrics = {
            loadTime: navigation.loadEventEnd - navigation.navigationStart,
            domContentLoaded: navigation.domContentLoadedEventEnd - navigation.navigationStart,
            firstPaint: paint.find((entry) => entry.name === "first-paint")?.startTime || 0,
            firstContentfulPaint: paint.find((entry) => entry.name === "first-contentful-paint")?.startTime || 0,
          }

          // Log metrics (you can send to your analytics service)
          console.log("Performance Metrics:", metrics)

          // Optional: Send to your own analytics endpoint
          // fetch('/api/analytics', {
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify(metrics)
          // }).catch(() => {})
        }
      } catch (error) {
        console.warn("Performance tracking failed:", error)
      }
    }

    // Track after page load
    if (document.readyState === "complete") {
      setTimeout(trackPerformance, 1000)
    } else {
      window.addEventListener("load", () => {
        setTimeout(trackPerformance, 1000)
      })
    }
  }, [])

  return null
}
