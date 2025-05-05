import type { Metadata } from "next"
import ContactHero from "@/components/contact/ContactHero"
import ContactInfo from "@/components/contact/ContactInfo"
import ContactForm from "@/components/contact/ContactForm"
import ContactCircle from "@/components/contact/ContactCircle"
import { toggleSettings } from "@/admin/toggle"

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with me for collaborations or inquiries",
}

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <ContactHero />
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {toggleSettings.contact_form ? <ContactForm /> : <ContactInfo />}
            <ContactCircle />
          </div>
        </div>
      </section>
    </main>
  )
}
