"use client"

import React from "react"

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error details
    console.error("ErrorBoundary caught an error:", error, errorInfo)

    // Don't log Speed Insights errors as they're not critical
    if (error.message?.includes("speed-insights") || error.stack?.includes("vercel")) {
      console.warn("Non-critical Vercel service error:", error.message)
      return
    }
  }

  render() {
    if (this.state.hasError) {
      // Don't show error UI for Speed Insights failures
      if (this.state.error?.message?.includes("speed-insights") || this.state.error?.stack?.includes("vercel")) {
        return this.props.children
      }

      // Fallback UI for other errors
      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
            <p className="text-muted-foreground mb-4">
              We apologize for the inconvenience. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Refresh Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
