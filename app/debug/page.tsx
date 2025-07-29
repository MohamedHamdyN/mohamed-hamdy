// app/debug/page.tsx أو pages/debug.tsx لو بتستخدم Next.js 13 أو أقل

"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function DebugPage() {
  const [skills, setSkills] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSkills = async () => {
      const { data, error } = await supabase.from("skills").select("*")

      if (error) {
        console.error("❌ Error fetching skills:", error)
      } else {
        console.log("✅ Fetched skills:", data)
        setSkills(data || [])
      }

      setLoading(false)
    }

    fetchSkills()
  }, [])

  if (loading) return <p>Loading...</p>

  return (
    <div>
      <h1>Skills Debug</h1>
      <pre>{JSON.stringify(skills, null, 2)}</pre>
    </div>
  )
}
