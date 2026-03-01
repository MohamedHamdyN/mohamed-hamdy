"use client"

import { motion } from "framer-motion"
import { useTranslations } from "@/hooks/useTranslations"
import { FileText, Calendar, Briefcase, GraduationCap, FileDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Skill } from "@/lib/db"

type Experience = {
  id: number
  year: string
  title: string
  details: string
  enabled?: boolean
  order?: number
}

type Education = {
  id: number
  year: string
  degree: string
  institution: string
  details: string
  enabled?: boolean
  order?: number
}

function sortByOrder<T extends { order?: number; id: number }>(items: T[]) {
  return [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0) || a.id - b.id)
}

export default function AboutResume({
  resumeUrl,
  experiences,
  educations,
  skills,
}: {
  resumeUrl: string
  experiences: Experience[]
  educations: Education[]
  skills: Skill[]
}) {
  const t = useTranslations()

  const exp = sortByOrder((experiences ?? []).filter((x) => x.enabled !== false))
  const edu = sortByOrder((educations ?? []).filter((x) => x.enabled !== false))
  const sk = sortByOrder((skills ?? []).filter((s) => (s as any).enabled !== false))

  return (
    <section className="py-16 bg-gradient-to-b from-background/50 to-background relative overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-secondary/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6"
          >
            <FileText className="h-4 w-4" />
            <span className="text-sm font-medium">{t.resume.title}</span>
          </motion.div>

          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t.resume.title}
          </motion.h2>

          {resumeUrl ? (
            <motion.div
              className="flex justify-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link href={resumeUrl} target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  className="group relative overflow-hidden rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-all duration-300 hover:shadow-primary/25 hover:shadow-xl"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <FileDown className="h-5 w-5" />
                    {t.about.downloadResume}
                  </span>
                  <span className="absolute inset-0 z-0 bg-gradient-to-r from-primary via-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                </Button>
              </Link>
            </motion.div>
          ) : null}
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Experience */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">{t.resume.experience}</h3>
            </div>

            {exp.map((x, i) => (
              <motion.div
                key={x.id}
                className="border-l-2 border-primary/30 pl-4 ml-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              >
                <div className="relative">
                  <div className="absolute w-3 h-3 bg-primary rounded-full -left-[1.4rem] top-1.5"></div>
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="text-primary font-medium">{x.year}</span>
                  </div>
                  <h4 className="text-xl font-bold">{x.title}</h4>
                  <p className="text-muted-foreground mt-2">{x.details}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Education + Skills */}
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold">{t.resume.education}</h3>
              </div>

              {edu.map((x, i) => (
                <motion.div
                  key={x.id}
                  className="border-l-2 border-secondary/30 pl-4 ml-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                >
                  <div className="relative">
                    <div className="absolute w-3 h-3 bg-secondary rounded-full -left-[1.4rem] top-1.5"></div>
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="h-4 w-4 text-secondary" />
                      <span className="text-secondary font-medium">{x.year}</span>
                    </div>
                    <h4 className="text-xl font-bold">{x.degree}</h4>
                    <p className="text-muted-foreground mt-1">{x.institution}</p>
                    <p className="text-muted-foreground mt-2">{x.details}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h3 className="text-2xl font-bold mb-6 text-primary">{t.skills.title}</h3>
              <div className="grid grid-cols-2 gap-4">
                {sk.map((skill) => (
                  <div key={skill.id} className="flex items-center gap-2">
                    <div className={`${skill.color ?? "text-primary"} rounded-full p-1`}>
                      <div className="w-2 h-2 bg-current rounded-full"></div>
                    </div>
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}