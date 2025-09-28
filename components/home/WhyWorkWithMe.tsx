"use client"

import { reasons } from "@/admin/work-reasons"
import { useTranslations } from "@/hooks/useTranslations"
import InfiniteSlider from "@/components/shared/InfiniteSlider"

export default function WhyWorkWithMe() {
  const t = useTranslations()

  // Filter enabled reasons
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
