"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { getStats } from "@/app/actions/cms"
import { Users, Briefcase } from "lucide-react"

type Stat = {
  id: number
  label: string
  value: string
  description?: string
}

export default function AboutStats() {
  const [stats, setStats] = useState<Stat[] | null>(null)

  useEffect(() => {
    ; (async () => {
      const data = await getStats()
      if (data) {
        setStats(data)
      }
    })()
  }, [])

  if (!stats) return null

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats?.map((stat, index) => (
            <motion.div
              key={stat.id}
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
                  <h3 className="text-sm font-semibold text-foreground">{stat.label}</h3>
                </div>
                <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-300 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                {stat.description && (
                  <p className="text-xs text-muted-foreground mt-2">{stat.description}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
