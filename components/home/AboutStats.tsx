"use client"

import { useEffect, useState } from "react"
import { getAboutStats } from "@/app/actions/cms"
import { Users, Briefcase } from "lucide-react"

type AboutStats = {
  years_of_experience: number
  linkedin_followers: number
}

export default function AboutStats() {
  const [stats, setStats] = useState<AboutStats | null>(null)

  useEffect(() => {
    ; (async () => {
      const data = await getAboutStats()
      if (data) {
        setStats({
          years_of_experience: data.years_of_experience ?? 0,
          linkedin_followers: data.linkedin_followers ?? 0,
        })
      }
    })()
  }, [])

  if (!stats) return null

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Briefcase className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Years of Experience</h3>
            </div>
            <div className="text-4xl font-bold text-primary tabular-nums">
              {stats.years_of_experience}
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Users className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">LinkedIn Followers</h3>
            </div>
            <div className="text-4xl font-bold text-primary tabular-nums">
              {stats.linkedin_followers.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}