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
            className="relative group overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card to-card/50 p-8 hover:border-primary/50 transition-all duration-300"
            whileHover={{ y: -4, boxShadow: "0 20px 40px -10px rgba(59, 130, 246, 0.15)" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Years of Experience</h3>
              </div>
              <motion.div
                className="text-6xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {stats.years_of_experience}
                <span className="text-2xl ml-2">+</span>
              </motion.div>
              <p className="text-muted-foreground mt-2">Professional experience in data analysis and finance</p>
            </div>
          </motion.div>

          <motion.div
            className="relative group overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card to-card/50 p-8 hover:border-primary/50 transition-all duration-300"
            whileHover={{ y: -4, boxShadow: "0 20px 40px -10px rgba(59, 130, 246, 0.15)" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">LinkedIn Followers</h3>
              </div>
              <motion.div
                className="text-6xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent tabular-nums"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {stats.linkedin_followers.toLocaleString()}
              </motion.div>
              <p className="text-muted-foreground mt-2">Growing professional network on LinkedIn</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
