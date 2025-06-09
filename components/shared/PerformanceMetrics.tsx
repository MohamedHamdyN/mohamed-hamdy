"use client"

import { useEffect, useState } from "react"

interface PerformanceMetrics {
  fcp: number | null // First Contentful Paint
  lcp: number | null // Largest Contentful Paint
  fid: number | null // First Input Delay
  cls: number | null // Cumulative Layout Shift
  ttfb: number | null // Time to First Byte
}

export default function PerformanceMetrics() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null,
  })

  useEffect(() => {
    // Only run in development or when explicitly enabled
    if (process.env.NODE_ENV !== "development") return

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        switch (entry.entryType) {
          case "paint":
            if (entry.name === "first-contentful-paint") {
              setMetrics((prev) => ({ ...prev, fcp: entry.startTime }))
            }
            break
          case "largest-contentful-paint":
            setMetrics((prev) => ({ ...prev, lcp: entry.startTime }))
            break
          case "first-input":
            setMetrics((prev) => ({ ...prev, fid: entry.processingStart - entry.startTime }))
            break
          case "layout-shift":
            if (!(entry as any).hadRecentInput) {
              setMetrics((prev) => ({ ...prev, cls: (prev.cls || 0) + (entry as any).value }))
            }
            break
          case "navigation":
            const navEntry = entry as PerformanceNavigationTiming
            setMetrics((prev) => ({ ...prev, ttfb: navEntry.responseStart - navEntry.requestStart }))
            break
        }
      }
    })

    observer.observe({ entryTypes: ["paint", "largest-contentful-paint", "first-input", "layout-shift", "navigation"] })

    return () => observer.disconnect()
  }, [])

  if (process.env.NODE_ENV !== "development") return null

  return (
    <div className="fixed bottom-4 left-4 bg-black/80 text-white p-4 rounded-lg text-xs font-mono z-50">
      <div className="grid grid-cols-2 gap-2">
        <div>FCP: {metrics.fcp ? `${Math.round(metrics.fcp)}ms` : "..."}</div>
        <div>LCP: {metrics.lcp ? `${Math.round(metrics.lcp)}ms` : "..."}</div>
        <div>FID: {metrics.fid ? `${Math.round(metrics.fid)}ms` : "..."}</div>
        <div>CLS: {metrics.cls ? metrics.cls.toFixed(3) : "..."}</div>
        <div>TTFB: {metrics.ttfb ? `${Math.round(metrics.ttfb)}ms` : "..."}</div>
      </div>
    </div>
  )
}
