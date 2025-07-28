"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { cachedServices, statsService } from "@/lib/database"
import { useTranslations } from "@/hooks/useTranslations"
import Image from "next/image"
import { Quote } from "lucide-react"
import * as LucideIcons from "lucide-react"
import type { Profile, Stat } from "@/lib/supabase"

export default function AboutHero() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [stats, setStats] = useState<Stat[]>([])
  const [loading, setLoading] = useState(true)
  const t = useTranslations()

  useEffect(() => {
    async function fetchData() {
      try {
        const [profileData, statsData] = await Promise.all([
          cachedServices.getProfile(),
          statsService.getEnabledStats(),
        ])
        setProfile(profileData)
        setStats(statsData)
      } catch (error) {
        console.error("Error fetching about data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Get icon dynamically
  const getIcon = (iconName: string) => {
    const Icon = LucideIcons[iconName as keyof typeof LucideIcons] || LucideIcons.Info
    return <Icon className="h-6 w-6" />
  }

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-background to-background/50 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-4 bg-muted animate-pulse rounded w-full"></div>
                ))}
              </div>
              <div className="mt-8 bg-card border border-border/50 rounded-xl p-6">
                <div className="h-6 bg-muted animate-pulse rounded mb-4"></div>
                <div className="h-4 bg-muted animate-pulse rounded w-3/4"></div>
              </div>
            </div>
            <div className="relative">
              <div className="w-full max-w-md mx-auto rounded-full aspect-square bg-muted animate-pulse"></div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-card rounded-xl border border-border/50 p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-muted animate-pulse rounded-full"></div>
                  <div>
                    <div className="h-6 bg-muted animate-pulse rounded mb-2 w-16"></div>
                    <div className="h-4 bg-muted animate-pulse rounded w-20"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (!profile) {
    return null
  }

  // Split bio into paragraphs
  const bioParagraphs = profile.long_bio?.split("\n\n") || []

  return (
    <section className="py-20 bg-gradient-to-b from-background to-background/50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
          {/* Bio content */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {bioParagraphs.map((paragraph, index) => (
                <motion.p
                  key={index}
                  className="mb-4 text-muted-foreground"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Quote */}
            <motion.div
              className="mt-8 bg-card border border-border/50 rounded-xl p-6 relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Quote className="absolute text-primary/20 h-12 w-12 -top-6 -left-6" />
              <p className="text-lg italic text-muted-foreground">
                "{profile.bio || "Transforming complex data into actionable insights that drive business decisions."}"
              </p>
            </motion.div>
          </motion.div>

          {/* Profile image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full max-w-md mx-auto rounded-full overflow-hidden aspect-square border-4 border-white shadow-xl">
              {profile.logo ? (
                <Image
                  src={profile.logo || "/placeholder.svg"}
                  alt={profile.name}
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <motion.span
                    className="text-6xl font-bold text-primary"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  >
                    {profile.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </motion.span>
                </div>
              )}
            </div>

            {/* Decorative elements */}
            <motion.div
              className="absolute w-32 h-32 bg-primary/10 rounded-full -bottom-10 -left-10 z-[-1]"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
            <motion.div
              className="absolute w-24 h-24 bg-secondary/10 rounded-full -top-8 -right-8 z-[-1]"
              animate={{
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: 1,
              }}
            />
          </motion.div>
        </div>

        {/* Stats Section */}
        {stats.length > 0 && (
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
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
        )}
      </div>
    </section>
  )
}
