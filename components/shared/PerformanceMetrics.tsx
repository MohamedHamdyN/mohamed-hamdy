"use client"

import { useEffect, useState } from "react"

interface PerformanceData {
  fcp?: number
  lcp?: number
  cls?: number
  fid?: number
  ttfb?: number
}

export default function PerformanceMetrics() {
  const [performanceData, setPerformanceData] = useState<PerformanceData>({})
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    // Only run performance monitoring in development
    if (process.env.NODE_ENV !== "development") return

    const measurePerformance = () => {
      try {
        // Check if performance API is available
        if (typeof window === "undefined" || !window.performance) return

        const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming
        const paint = performance.getEntriesByType("paint")

        const data: PerformanceData = {}

        // First Contentful Paint
        const fcp = paint.find((entry) => entry.name === "first-contentful-paint")
        if (fcp) data.fcp = Math.round(fcp.startTime)

        // Time to First Byte
        if (navigation) {
          data.ttfb = Math.round(navigation.responseStart - navigation.requestStart)
        }

        // Largest Contentful Paint (requires observer)
        if ("PerformanceObserver" in window) {
          try {
            const lcpObserver = new PerformanceObserver((list) => {
              const entries = list.getEntries()
              const lastEntry = entries[entries.length - 1] as any
              if (lastEntry) {
                setPerformanceData((prev) => ({
                  ...prev,
                  lcp: Math.round(lastEntry.startTime),
                }))
              }
            })
            lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] })

            // Cumulative Layout Shift
            const clsObserver = new PerformanceObserver((list) => {
              let clsValue = 0
              for (const entry of list.getEntries()) {
                if (!(entry as any).hadRecentInput) {
                  clsValue += (entry as any).value
                }
              }
              setPerformanceData((prev) => ({
                ...prev,
                cls: Math.round(clsValue * 1000) / 1000,
              }))
            })
            clsObserver.observe({ entryTypes: ["layout-shift"] })
          } catch (error) {
            console.warn("Performance Observer not supported:", error)
          }
        }

        setPerformanceData(data)
      } catch (error) {
        console.warn("Performance measurement failed:", error)
      }
    }

    // Delay measurement to ensure page is loaded
    const timer = setTimeout(measurePerformance, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Don't render on server or in production
  if (!isClient || process.env.NODE_ENV !== "development") {
    return null
  }

  return (
    <div className="fixed bottom-4 left-4 bg-black/80 text-white p-3 rounded-lg text-xs font-mono z-50 max-w-xs">
      <div className="font-bold mb-2">Performance Metrics</div>
      <div className="space-y-1">
        {performanceData.fcp && <div>FCP: {performanceData.fcp}ms</div>}
        {performanceData.lcp && <div>LCP: {performanceData.lcp}ms</div>}
        {performanceData.cls !== undefined && <div>CLS: {performanceData.cls}</div>}
        {performanceData.ttfb && <div>TTFB: {performanceData.ttfb}ms</div>}
      </div>
    </div>
  )
}
