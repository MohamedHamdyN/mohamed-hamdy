"use client"

import { skills } from "@/admin/skills"
import { useTranslations } from "@/hooks/useTranslations"
import InfiniteSlider from "@/components/shared/InfiniteSlider"

export default function Skills() {
  const t = useTranslations()

  // Filter enabled skills
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
