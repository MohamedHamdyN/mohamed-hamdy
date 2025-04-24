"use client"

import { useState, useRef } from "react"
import { motion, useScroll, useSpring, useInView } from "framer-motion"
import { profile } from "@/admin/profile"
import { useTranslations } from "@/hooks/useTranslations"
import { Calendar, GraduationCap, Briefcase } from "lucide-react"

export default function Journey() {
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const t = useTranslations()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Filter journey events by type
  const experiences = profile.journey.filter(
    (event) => !event.title.includes("Degree") && !event.title.includes("Certification"),
  )

  const education = profile.journey.filter(
    (event) => event.title.includes("Degree") || event.title.includes("Certification"),
  )

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
          <h2 className="text-3xl font-bold mb-4">{t.about.journey}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">My professional path and key milestones</p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary/50 via-primary/20 to-secondary/30 rounded-full"
            style={{ scaleY }}
          />

          <div className="space-y-16">
            {/* Experience Section */}
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
                  key={event.year}
                  event={event}
                  index={index}
                  isExpanded={expandedEvent === index}
                  onToggle={() => setExpandedEvent(expandedEvent === index ? null : index)}
                  type="experience"
                />
              ))}
            </div>

            {/* Education Section */}
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

              {education.map((event, index) => (
                <JourneyEvent
                  key={event.year}
                  event={event}
                  index={index + experiences.length}
                  isExpanded={expandedEvent === index + experiences.length}
                  onToggle={() =>
                    setExpandedEvent(expandedEvent === index + experiences.length ? null : index + experiences.length)
                  }
                  type="education"
                />
              ))}
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
  event: (typeof profile.journey)[0]
  index: number
  isExpanded: boolean
  onToggle: () => void
  type: "experience" | "education"
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  const colorClass = type === "experience" ? "primary" : "secondary"

  return (
    <motion.div
      ref={ref}
      className={`mb-12 flex justify-between items-start w-full ${index % 2 === 0 ? "flex-row-reverse" : ""}`}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
    >
      <div className="w-5/12" />
      <div className="z-20">
        <div className={`flex items-center justify-center w-8 h-8 bg-${colorClass} rounded-full`}>
          <div className="w-3 h-3 bg-background rounded-full" />
        </div>
      </div>
      <motion.div
        className="w-5/12 cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onToggle}
      >
        <div
          className={`p-6 bg-card rounded-lg shadow-md border border-${colorClass}/10 hover:border-${colorClass}/30 transition-all duration-300`}
        >
          <div className="flex items-center gap-2 mb-2">
            <Calendar className={`h-4 w-4 text-${colorClass}`} />
            <span className={`font-bold text-${colorClass}`}>{event.year}</span>
          </div>
          <h3 className="text-lg font-semibold mb-1">{event.title}</h3>
          <p className="text-muted-foreground">{event.description}</p>
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="mt-4 text-sm text-muted-foreground border-t border-border pt-4">{event.details}</p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}
