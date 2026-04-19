import { CACHE_REVALIDATE } from "@/lib/constants/cache"

export const revalidate = CACHE_REVALIDATE.SERVICES

import { toggleSettings } from "@/admin/toggle"
import { notFound } from "next/navigation"
import ServicesGrid from "@/components/services/ServicesGrid"
import PageHero from "@/components/shared/PageHero"
import { Briefcase } from "lucide-react"

export default function ServicesPage() {
  // If services page is disabled, return 404
  if (!toggleSettings.services_page) {
    notFound()
  }

  return (
    <>
      <PageHero
        title="Services"
        description="Comprehensive data analysis and financial consulting solutions"
        icon={<Briefcase className="h-4 w-4" />}
      />
      <ServicesGrid />
    </>
  )
}
