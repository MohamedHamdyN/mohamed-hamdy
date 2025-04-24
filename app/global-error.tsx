"use client"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body className="flex items-center justify-center min-h-screen bg-black text-white p-4 text-center">
        <div>
          <h1 className="text-3xl font-bold mb-4">Something went wrong!</h1>
          <p className="mb-6">We're sorry, but there was a critical error loading the application.</p>
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
