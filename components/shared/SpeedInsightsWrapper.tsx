"use client"

import { SpeedInsights } from "@vercel/speed-insights/next"
import { useEffect, useState } from "react"

export default function SpeedInsightsWrapper() {
  const [shouldLoad, setShouldLoad] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    // Only load in production and when not blocked
    const isProduction = process.env.NODE_ENV === "production"
    const isVercelEnv = process.env.VERCEL_ENV === "production"

    // Check if we're in a Vercel environment
    if (isProduction || isVercelEnv) {
      // Test if the script can be loaded
      const testScript = document.createElement("script")
      testScript.src = "/_vercel/speed-insights/script.js"
      testScript.onload = () => {
        setShouldLoad(true)
        document.head.removeChild(testScript)
      }
      testScript.onerror = () => {
        setHasError(true)
        document.head.removeChild(testScript)
        console.warn("Vercel Speed Insights blocked or unavailable")
      }

      // Add script to test loading
      document.head.appendChild(testScript)
    }
  }, [])

  // Don't render if there's an error or if it shouldn't load
  if (hasError || !shouldLoad) {
    return null
  }

  try {
    return <SpeedInsights />
  } catch (error) {
    console.warn("Speed Insights failed to render:", error)
    return null
  }
}
