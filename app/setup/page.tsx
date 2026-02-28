"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AlertCircle, CheckCircle, Loader } from "lucide-react"

export default function SetupPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")
  const [results, setResults] = useState<Record<string, string> | null>(null)

  const handleInitialize = async () => {
    setStatus("loading")
    setMessage("Initializing database...")
    
    try {
      const response = await fetch("/api/setup/init-db", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "both" }),
      })

      const data = await response.json()

      if (!response.ok) {
        setStatus("error")
        setMessage(data.error || "Failed to initialize database")
        return
      }

      setResults(data.results)
      setStatus("success")
      setMessage("Database initialized successfully! Redirecting...")
      
      // Redirect to home after 2 seconds
      setTimeout(() => {
        window.location.href = "/"
      }, 2000)
    } catch (error) {
      setStatus("error")
      setMessage(error instanceof Error ? error.message : "An error occurred")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="bg-slate-800 border-slate-700 shadow-2xl">
          <div className="p-8">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                {status === "loading" && <Loader className="w-6 h-6 animate-spin text-blue-400" />}
                {status === "success" && <CheckCircle className="w-6 h-6 text-green-400" />}
                {status === "error" && <AlertCircle className="w-6 h-6 text-red-400" />}
                {status === "idle" && <AlertCircle className="w-6 h-6 text-yellow-400" />}
              </div>
            </div>

            <h1 className="text-2xl font-bold text-white text-center mb-2">
              Database Setup Required
            </h1>
            
            <p className="text-slate-300 text-center mb-6">
              Your portfolio application needs to initialize the database. This is a one-time setup process.
            </p>

            <div className="space-y-4 mb-6">
              <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">Setup Steps:</h3>
                <ol className="text-sm text-slate-300 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold">1.</span>
                    <span>Create database schema using Prisma</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold">2.</span>
                    <span>Seed initial data from your profile</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold">3.</span>
                    <span>Redirect to your portfolio</span>
                  </li>
                </ol>
              </div>
            </div>

            {message && (
              <div className={`text-sm text-center mb-6 p-3 rounded-lg ${
                status === "error" ? "bg-red-500/20 text-red-300" :
                status === "success" ? "bg-green-500/20 text-green-300" :
                status === "loading" ? "bg-blue-500/20 text-blue-300" :
                "bg-yellow-500/20 text-yellow-300"
              }`}>
                {message}
              </div>
            )}

            {results && (
              <div className="space-y-2 mb-6 text-sm">
                {Object.entries(results).map(([key, value]) => (
                  <div key={key} className="bg-slate-700/50 p-2 rounded text-slate-300">
                    <span className="font-semibold capitalize">{key}:</span> {value}
                  </div>
                ))}
              </div>
            )}

            <Button
              onClick={handleInitialize}
              disabled={status === "loading" || status === "success"}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3"
            >
              {status === "loading" ? "Initializing..." : status === "success" ? "Redirecting..." : "Initialize Database"}
            </Button>

            <p className="text-xs text-slate-400 text-center mt-4">
              This process requires a properly configured DATABASE_URL environment variable.
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
