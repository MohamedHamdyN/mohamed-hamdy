"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            className="relative group overflow-hidden rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-950/20 via-card to-card/50 p-8 hover:border-blue-500/50 transition-all duration-300"
            whileHover={{ y: -4, boxShadow: "0 20px 40px -10px rgba(59, 130, 246, 0.2)" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute -right-20 -top-20 w-40 h-40 rounded-full bg-blue-500/10 blur-3xl group-hover:bg-blue-500/20 transition-all duration-300" />
            <div className="relative">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors">
                  <Briefcase className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Years of Experience</h3>
              </div>
              <div
                className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-300 bg-clip-text text-transparent"
              >
                {stats.years_of_experience}
                <span className="text-2xl ml-2">+</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="relative group overflow-hidden rounded-2xl border border-blue-600/20 bg-gradient-to-br from-blue-950/20 via-card to-card/50 p-8 hover:border-blue-600/50 transition-all duration-300"
            whileHover={{ y: -4, boxShadow: "0 20px 40px -10px rgba(0, 102, 204, 0.2)" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute -left-20 -bottom-20 w-40 h-40 rounded-full bg-blue-600/10 blur-3xl group-hover:bg-blue-600/20 transition-all duration-300" />
            <div className="relative">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-blue-600/20 group-hover:bg-blue-600/30 transition-colors">
                  <Users className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">LinkedIn Followers</h3>
              </div>
              <div
                className="text-6xl font-bold bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400 bg-clip-text text-transparent tabular-nums"
              >
                {stats.linkedin_followers.toLocaleString()}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
