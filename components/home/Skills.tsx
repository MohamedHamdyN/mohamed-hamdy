"use client"

import { useEffect, useState } from "react"
import { skillsService } from "@/lib/database"
import { useTranslations } from "@/hooks/useTranslations"
import InfiniteSlider from "@/components/shared/InfiniteSlider"
import type { Skill } from "@/lib/supabase"

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const t = useTranslations()

  useEffect(() => {
    async function fetchSkills() {
      try {
        const data = await skillsService.getEnabledSkills()
        setSkills(data)
      } catch (error) {
        console.error("Error fetching skills:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSkills()
  }, [])

  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-8 bg-muted animate-pulse rounded mb-4 max-w-md mx-auto"></div>
            <div className="h-4 bg-muted animate-pulse rounded max-w-lg mx-auto"></div>
          </div>
          <div className="flex gap-6 overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex-shrink-0 w-64 p-4 rounded-xl border border-border bg-card">
                <div className="h-6 bg-muted animate-pulse rounded mb-3"></div>
                <div className="h-4 bg-muted animate-pulse rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (skills.length === 0) {
    return null
  }

  return (
    <InfiniteSlider
      items={skills}
      title={t?.skills?.title || "My Skills"}
      description={t?.skills?.description || "Specialized expertise in data analysis"}
      autoplaySpeed={3000}
      pauseOnHover={true}
      reverseDirection={false}
    />
  )
}
