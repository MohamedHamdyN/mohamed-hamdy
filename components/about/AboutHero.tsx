"use client"

import { motion } from "framer-motion"
import { profile } from "@/admin/profile"
import { useTranslations } from "@/hooks/useTranslations"
import Image from "next/image"
import { Quote, Clock, Briefcase } from "lucide-react"
import { projects } from "@/admin/projects"

export default function AboutHero() {
  const t = useTranslations()

  // Calculate the actual number of projects if projectsCount is "00"
  const projectsNumber = profile.projectsCount === "00" ? projects.length : Number.parseInt(profile.projectsCount)

  const boxVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  }

  const experienceBoxes = [
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      value: `${profile.experienceYears}+`,
      label: t.about.yearsOfExperience,
      color: "from-blue-500/20 to-blue-600/5",
    },
    {
      icon: <Briefcase className="h-6 w-6 text-purple-500" />,
      value: `${projectsNumber}+`,
      label: t.about.completedProjects,
      color: "from-purple-500/20 to-purple-600/5",
    },
  ]

  // تقسيم النص إلى فقرات
  const bioParagraphs = profile.longBio.split("\n\n")

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
                "Transforming complex data into actionable insights that drive business decisions."
              </p>
            </motion.div>

            {/* Experience Boxes */}
            <motion.div initial="hidden" animate="visible" className="grid grid-cols-2 gap-4 mt-8">
              {experienceBoxes.map((box, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={boxVariants}
                  className={`relative overflow-hidden rounded-xl border border-border/50 bg-gradient-to-br ${box.color} p-4 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1`}
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-background/50 p-2 backdrop-blur-sm">{box.icon}</div>
                    <div>
                      <h3 className="text-2xl font-bold">{box.value}</h3>
                      <p className="text-muted-foreground text-xs">{box.label}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
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
                    MH
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
      </div>
    </section>
  )
}
