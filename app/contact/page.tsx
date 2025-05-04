import type { Metadata } from "next"
import { profile } from "@/admin/profile"
import ContactHero from "@/components/contact/ContactHero"
import ContactInfo from "@/components/contact/ContactInfo"
import ContactCircle from "@/components/contact/ContactCircle"

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${profile.name} for collaborations or inquiries.`,
}

export default function ContactPage() {
  return (
    <div className="container max-w-7xl mx-auto px-4 py-12">
      <ContactHero />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
        <ContactInfo />
        <ContactCircle />
      </div>
    </div>
  )
}
