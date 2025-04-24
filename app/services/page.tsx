import { toggleSettings } from "@/admin/toggle"
import { notFound } from "next/navigation"
import ServicesHero from "@/components/services/ServicesHero"
import ServicesGrid from "@/components/services/ServicesGrid"
import PaymentMethods from "@/components/services/PaymentMethods"
import ContactCTA from "@/components/shared/ContactCTA"

export default function ServicesPage() {
  // إذا كانت صفحة الخدمات معطلة، قم بتوجيه المستخدم إلى صفحة 404
  if (!toggleSettings.services_page) {
    notFound()
    return null
  }

  return (
    <>
      <ServicesHero />
      <ServicesGrid />
      <PaymentMethods />
      <ContactCTA />
    </>
  )
}
