import { getSetting } from "@/lib/settings"
import { notFound } from "next/navigation"
import ServicesGrid from "@/components/services/ServicesGrid"
import PaymentMethods from "@/components/services/PaymentMethods"
import ContactCTA from "@/components/shared/ContactCTA"
import PageHero from "@/components/shared/PageHero"
import { Briefcase } from "lucide-react"

export default async function ServicesPage() {
  // Check if services page is enabled
  const servicesEnabled = await getSetting("services_page")

  if (!servicesEnabled) {
    notFound()
  }

  return (
    <>
      <PageHero
        title="Services"
        description="Professional data analysis and financial services"
        icon={<Briefcase className="h-4 w-4" />}
      />
      <ServicesGrid />
      <PaymentMethods />
      <ContactCTA />
    </>
  )
}
