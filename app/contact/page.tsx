import { toggleSettings } from "@/admin/toggle"
import { notFound } from "next/navigation"
import ContactForm from "@/components/contact/ContactForm"
import ContactInfo from "@/components/contact/ContactInfo"
import PageHero from "@/components/shared/PageHero"
import { Mail } from "lucide-react"

export default function ContactPage() {
  // If contact page is disabled, return 404
  if (!toggleSettings.contact_page) {
    notFound()
  }

  return (
    <>
      <PageHero
        title="Contact"
        description="Get in touch with me for inquiries or collaborations"
        icon={<Mail className="h-4 w-4" />}
      />
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          <ContactForm />
          <ContactInfo />
        </div>
      </div>
    </>
  )
}
