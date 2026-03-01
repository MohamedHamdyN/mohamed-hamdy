"use client"

import { useState, useRef, useMemo } from "react"
import { motion, useScroll, useSpring, useInView } from "framer-motion"
import { useProfileSafe } from "@/context/useProfileSafe"
import { useTranslations } from "@/hooks/useTranslations"
import { Calendar, GraduationCap, Briefcase } from "lucide-react"

type JourneyItem = {
  year?: string
  title?: string
  description?: string
  details?: string
}

const COLOR = {
  experience: {
    dotBg: "bg-primary",
    border: "border-primary/10 hover:border-primary/30",
    year: "text-primary",
    icon: "text-primary",
    line: "from-primary/50 via-primary/20 to-secondary/30",
  },
  education: {
    dotBg: "bg-secondary",
    border: "border-secondary/10 hover:border-secondary/30",
    year: "text-secondary",
    icon: "text-secondary",
    line: "from-primary/50 via-primary/20 to-secondary/30",
  },
} as const

export default function Journey() {
  const profile = useProfileSafe()
  const t = useTranslations()

  const [expandedEvent, setExpandedEvent] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const journey: JourneyItem[] = (profile as any)?.journey ?? (profile as any)?.timeline ?? []

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const { experiences, education } = useMemo(() => {
    const exp = journey.filter((e) => !(e.title || "").includes("Degree") && !(e.title || "").includes("Certification"))
    const edu = journey.filter((e) => (e.title || "").includes("Degree") || (e.title || "").includes("Certification"))
    return { experiences: exp, education: edu }
  }, [journey])

  if (!journey || journey.length === 0) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          No journey items to display
        </div>
      </section>
    )
  }

  return (
    <section ref={containerRef} className="py-20 bg-gradient-to-b from-background to-background/50 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4">{t?.about?.journey || "Journey"}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">My professional path and key milestones</p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <motion.div
            className={`absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b ${COLOR.experience.line} rounded-full`}
            style={{ scaleY }}
          />

          <div className="space-y-16">
            <div>
              <motion.div
                className="flex items-center justify-center gap-3 mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Briefcase className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Professional Experience</h3>
              </motion.div>

              {experiences.map((event, index) => (
                <JourneyEvent
                  key={`${event.year || "y"}-${index}`}
                  event={event}
                  index={index}
                  isExpanded={expandedEvent === index}
                  onToggle={() => setExpandedEvent(expandedEvent === index ? null : index)}
                  type="experience"
                />
              ))}
            </div>

            <div>
              <motion.div
                className="flex items-center justify-center gap-3 mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold">Education</h3>
              </motion.div>

              {education.map((event, index) => {
                const realIndex = index + experiences.length
                return (
                  <JourneyEvent
                    key={`${event.year || "y"}-${realIndex}`}
                    event={event}
                    index={realIndex}
                    isExpanded={expandedEvent === realIndex}
                    onToggle={() => setExpandedEvent(expandedEvent === realIndex ? null : realIndex)}
                    type="education"
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function JourneyEvent({
  event,
  index,
  isExpanded,
  onToggle,
  type,
}: {
  event: JourneyItem
  index: number
  isExpanded: boolean
  onToggle: () => void
  type: "experience" | "education"
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  const c = COLOR[type]

  return (
    <motion.div
      ref={ref}
      className={`mb-12 flex justify-between items-start w-full ${index % 2 === 0 ? "flex-row-reverse" : ""}`}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: index * 0.06 }}
    >
      <div className="w-5/12" />

      <div className="z-20">
        <div className={`flex items-center justify-center w-8 h-8 ${c.dotBg} rounded-full`}>
          <div className="w-3 h-3 bg-background rounded-full" />
        </div>
      </div>

      <motion.div className="w-5/12 cursor-pointer" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} onClick={onToggle}>
        <div className={`p-6 bg-card rounded-lg shadow-md border ${c.border} transition-all duration-300`}>
          <div className="flex items-center gap-2 mb-2">
            <Calendar className={`h-4 w-4 ${c.icon}`} />
            <span className={`font-bold ${c.year}`}>{event.year || ""}</span>
          </div>
          <h3 className="text-lg font-semibold mb-1">{event.title || "Untitled"}</h3>
          <p className="text-muted-foreground">{event.description || ""}</p>

          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            {!!event.details && <p className="mt-4 text-sm text-muted-foreground border-t border-border pt-4">{event.details}</p>}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}