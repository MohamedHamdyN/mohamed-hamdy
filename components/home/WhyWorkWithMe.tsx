"use client"

import { useTranslations } from "@/hooks/useTranslations"
import InfiniteSlider from "@/components/shared/InfiniteSlider"
import type { AboutSection } from "@/lib/queries/profile"

interface WhyWorkWithMeProps {
  reasons?: AboutSection[]
}

export default function WhyWorkWithMe({ reasons = [] }: WhyWorkWithMeProps) {
  const t = useTranslations()

  // Filter enabled reasons (all reasons from DB are enabled by default)
  const enabledReasons = reasons.filter((reason) => reason.enabled !== false)

  return (
    <InfiniteSlider
      items={enabledReasons}
      title={t?.whyWorkWithMe?.title || "Why Work With Me"}
      description={t?.whyWorkWithMe?.description || "Benefits of collaborating with a dedicated data analyst"}
      autoplaySpeed={3000}
      pauseOnHover={true}
      reverseDirection={true}
    />
  )
}
