"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  const handleReset = () => {
    try {
      // Check if reset is a function before calling it
      if (typeof reset === "function") {
        reset()
      } else {
        // Fallback if reset is not a function
        window.location.reload()
      }
    } catch (e) {
      console.error("Error during reset:", e)
      // Fallback to page reload if reset fails
      window.location.reload()
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-4 text-center">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-muted-foreground mb-6">We're sorry, but there was an error loading this page.</p>
      <Button onClick={handleReset} className="bg-primary hover:bg-primary/90">
        Try again
      </Button>
    </div>
  )
}
