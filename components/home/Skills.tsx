"use client"

import { useTranslations } from "@/hooks/useTranslations"
import InfiniteSlider from "@/components/shared/InfiniteSlider"
import type { SkillWithCategory } from "@/lib/queries/other"

interface SkillsProps {
  skills?: SkillWithCategory[]
}

export default function Skills({ skills = [] }: SkillsProps) {
  const t = useTranslations()

  // Filter enabled skills (all skills from DB are enabled by default)
  const enabledSkills = skills.filter((skill) => skill.enabled !== false)

  return (
    <InfiniteSlider
      items={enabledSkills}
      title={t?.skills?.title || "My Skills"}
      description={t?.skills?.description || "Specialized expertise in data analysis"}
      autoplaySpeed={3000}
      pauseOnHover={true}
      reverseDirection={false}
    />
  )
}
