"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Quote } from "lucide-react"
import * as LucideIcons from "lucide-react"
import { useTranslations } from "@/hooks/useTranslations"
import type { Profile } from "@/lib/db"

type AboutHeroStats = {
  years: number
  completedProjects: number
  linkedinFollowers: number
  completedCourses: number
}

export default function AboutHero({
  profile,
  longBio,
  stats,
}: {
  profile: Profile | null
  longBio: string
  stats: AboutHeroStats
}) {
  const t = useTranslations()

  const bioParagraphs = longBio ? String(longBio).split("\n\n") : []
  const name = profile?.name ?? "Portfolio"
  const avatarUrl = profile?.avatar_url ?? null

  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName] || LucideIcons.Info
    return <Icon className="h-6 w-6" />
  }

  const enabledStats = [
    { id: "years", name: "Years of Experience", value: String(stats.years), icon: "Clock", color: "from-primary/10 to-primary/5" },
    { id: "projects", name: "Completed Projects", value: String(stats.completedProjects), icon: "FolderKanban", color: "from-secondary/10 to-secondary/5" },
    { id: "followers", name: "LinkedIn Followers", value: String(stats.linkedinFollowers), icon: "Users", color: "from-primary/10 to-secondary/5" },
    { id: "courses", name: "Completed Courses", value: String(stats.completedCourses), icon: "GraduationCap", color: "from-secondary/10 to-primary/5" },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-background to-background/50 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
          {/* Bio */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {bioParagraphs.length ? (
                bioParagraphs.map((p, i) => (
                  <motion.p
                    key={i}
                    className="mb-4 text-muted-foreground"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  >
                    {p}
                  </motion.p>
                ))
              ) : (
                <p className="text-muted-foreground">{profile?.bio ?? ""}</p>
              )}
            </div>

            <motion.div
              className="mt-8 bg-card border border-border/50 rounded-xl p-6 relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Quote className="absolute text-primary/20 h-12 w-12 -top-6 -left-6" />
              <p className="text-lg italic text-muted-foreground">
                "Transforming complex data into actionable insights that drive business decisions."
              </p>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
            <div className="relative w-full max-w-md mx-auto rounded-full overflow-hidden aspect-square border-4 border-white shadow-xl">
              {avatarUrl ? (
                <Image
                  src={avatarUrl || "/placeholder.svg"}
                  alt={name}
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <motion.span className="text-6xl font-bold text-primary" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}>
                    MH
                  </motion.span>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 mb-16" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
          {enabledStats.map((stat, i) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
              className={`relative overflow-hidden rounded-xl border border-border/50 bg-gradient-to-br ${stat.color} p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1`}
            >
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-background/50 p-3 backdrop-blur-sm">{getIcon(stat.icon)}</div>
                <div>
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                  <p className="text-muted-foreground text-sm">{stat.name}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}