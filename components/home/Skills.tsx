"use client"

import InfiniteSlider from "@/components/shared/InfiniteSlider"
import { useTranslations } from "@/hooks/useTranslations"
import { useSkillsData } from "@/hooks/useSkillsData"
import type { Skill } from "@/lib/db"

// لو InfiniteSlider عنده type SliderItem مُصدّر استورده بدل اللي تحت
type SliderItem = {
  id?: string | number
  title: string
  description?: string
  icon?: string
  color?: string
}

function toSliderItem(skill: Skill): SliderItem {
  return {
    id: (skill as any).id,
    title: (skill as any).title ?? (skill as any).name ?? "Skill",
    description: (skill as any).description ?? "",
    icon: (skill as any).icon ?? "",
    color: (skill as any).color ?? "",
  }
}

export default function Skills() {
  const t = useTranslations()
  const { skills, isLoading } = useSkillsData()

  if (isLoading) return <div className="py-20 text-center text-slate-400">Loading skills...</div>
  if (!skills.length) return null

  const sliderItems: SliderItem[] = skills.map(toSliderItem)

  return (
    <InfiniteSlider
      items={sliderItems}
      title={t?.skills?.title || "My Skills"}
      description={t?.skills?.description || "Specialized expertise in data analysis and financial accounting"}
      autoplaySpeed={3000}
      pauseOnHover={true}
      reverseDirection={false}
    />
  )
}