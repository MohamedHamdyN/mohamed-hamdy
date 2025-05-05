"use client"

import { Button } from "@/components/ui/button"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
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
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
          <p className="mb-6">We're sorry, but there was a critical error loading the application.</p>
          <Button onClick={handleReset} className="bg-primary hover:bg-primary/90">
            Try again
          </Button>
        </div>
      </body>
    </html>
  )
}
