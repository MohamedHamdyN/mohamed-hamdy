"use client"

import { motion } from "framer-motion"
import { useTranslations } from "@/hooks/useTranslations"
import { FileText, Calendar, Briefcase, GraduationCap, FileDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type Experience = {
  id: number
  job_title: string
  company: string
  description: string
  status?: boolean
  sort_order?: number
  start_date?: string
  end_date?: string
  logo?: string
}

type Education = {
  id: number
  title: string
  degree: string
  university: string
  status?: boolean
  sort_order?: number
  start_date?: string
  end_date?: string
}

type Skill = {
  id: number
  title: string
  color_id?: number
  status?: boolean
  sort_order?: number
}

function sortByOrder<T extends { sort_order?: number; id: number }>(items: T[]) {
  return [...items].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0) || a.id - b.id)
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

  const exp = sortByOrder((experiences ?? []).filter((x) => x.status !== false))
  const edu = sortByOrder((educations ?? []).filter((x) => x.status !== false))

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
                  {x.start_date && (
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="text-primary font-medium">
                        {x.start_date} {x.end_date ? `- ${x.end_date}` : ''}
                      </span>
                    </div>
                  )}
                  <h4 className="text-xl font-bold">{x.job_title}</h4>
                  <p className="text-primary/80 font-medium">{x.company}</p>
                  <p className="text-muted-foreground mt-2">{x.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold">{t.resume.education}</h3>
            </div>

            {edu.map((x, i) => (
              <motion.div
                key={x.id}
                className="border-l-2 border-blue-500/30 pl-4 ml-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              >
                <div className="relative">
                  <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[1.4rem] top-1.5"></div>
                  {x.start_date && (
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="h-4 w-4 text-blue-500" />
                      <span className="text-blue-500 font-medium">
                        {x.start_date} {x.end_date ? `- ${x.end_date}` : ''}
                      </span>
                    </div>
                  )}
                  <h4 className="text-xl font-bold text-white">{x.degree}</h4>
                  <p className="text-blue-300 font-semibold mt-1">{x.university}</p>
                  <p className="text-muted-foreground mt-2">{x.title}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* My Skills Section */}
        {skills && skills.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-20 pt-12 border-t border-border/40"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">{t?.skills?.title || "My Skills"}</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {sortByOrder(skills.filter((s) => s.status !== false)).map((skill, idx) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 + idx * 0.05 }}
                  className="group"
                >
                  <div
                    className={`p-4 rounded-lg text-center transition-all duration-300 hover:scale-105 cursor-default`}
                    style={{
                      backgroundColor: '#3b82f6' + '15',
                      borderLeft: `3px solid #3b82f6`,
                    }}
                  >
                    <span
                      className="font-semibold text-sm md:text-base"
                      style={{
                        color: '#3b82f6',
                      }}
                    >
                      {skill.title}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
