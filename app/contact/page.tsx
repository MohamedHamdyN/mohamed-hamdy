import type { Metadata } from "next"
import { toggleSettings } from "@/admin/toggle"
import ContactInfo from "@/components/contact/ContactInfo"
import ContactForm from "@/components/contact/ContactForm"
import ContactCircle from "@/components/contact/ContactCircle"

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with me for collaborations or inquiries",
}

export default function ContactPage() {
  return (
    <main className="min-h-screen py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {/* الجانب الأيسر - معلومات الاتصال */}
          <div>
            <ContactInfo />
          </div>

          {/* الجانب الأيمن - نموذج الاتصال أو الشعار */}
          <div>{toggleSettings.contact_form ? <ContactForm /> : <ContactCircle />}</div>
        </div>
      </div>
    </main>
  )
}
