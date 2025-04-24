import { toggleSettings } from "@/admin/toggle"
import { notFound } from "next/navigation"
import ContactForm from "@/components/contact/ContactForm"
import ContactInfo from "@/components/contact/ContactInfo"
import ContactHero from "@/components/contact/ContactHero"
import ContactCircle from "@/components/contact/ContactCircle"

export default function ContactPage() {
  // If contact page is disabled, return 404
  if (!toggleSettings.contact_page) {
    notFound()
  }

  return (
    <>
      <ContactHero />
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          <ContactInfo />
          {toggleSettings.contact_form ? <ContactForm /> : <ContactCircle />}
        </div>
      </div>
    </>
  )
}
