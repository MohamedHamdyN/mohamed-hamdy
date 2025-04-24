"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { FileSearch } from "lucide-react"

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-background text-foreground">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <FileSearch className="text-blue-500 w-24 h-24" />
            </div>
            <h1 className="text-4xl font-bold mb-4 text-blue-500">Something went wrong</h1>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              We're sorry, but there was an error loading this page.
            </p>
            <Button
              onClick={() => (window.location.href = "/")}
              size="lg"
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Back to Home
            </Button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
