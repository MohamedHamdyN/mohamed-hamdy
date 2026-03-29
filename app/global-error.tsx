"use client"

import { useEffect } from "react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // ده أهم سطر: هيظهر الخطأ الحقيقي في Console
    console.error("GLOBAL ERROR:", error)
    console.error("DIGEST:", error.digest)
  }, [error])

  return (
    <html>
      <body style={{ padding: 24, fontFamily: "system-ui" }}>
        <h2>Something went wrong!</h2>
        <p style={{ opacity: 0.8 }}>
          Digest: <code>{error.digest || "N/A"}</code>
        </p>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  )
}