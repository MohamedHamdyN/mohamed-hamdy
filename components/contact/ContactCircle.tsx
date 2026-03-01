"use client"

import { motion } from "framer-motion"
import { useProfileSafe } from "@/context/useProfileSafe"
import { useTranslations } from "@/hooks/useTranslations"
import { Mail, Phone, MapPin } from "lucide-react"
import SocialLinks from "@/components/shared/SocialLinks"

export default function ContactCircle() {
  const t = useTranslations()
  const profile = useProfileSafe()

  const email = (profile as any)?.email ?? ""
  const phone = (profile as any)?.phone ?? ""
  const location = (profile as any)?.location ?? ""

  const items = [
    {
      enabled: !!email,
      icon: <Mail className="h-5 w-5" />,
      label: "Email",
      value: email,
      href: email ? `mailto:${email}` : undefined,
    },
    {
      enabled: !!phone && phone !== "0",
      icon: <Phone className="h-5 w-5" />,
      label: "Phone",
      value: phone,
      href: phone ? `tel:${phone}` : undefined,
    },
    {
      enabled: !!location && location !== "0",
      icon: <MapPin className="h-5 w-5" />,
      label: "Location",
      value: location,
    },
  ].filter((x) => x.enabled)

  if (items.length === 0) return null

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <h2 className="text-3xl font-bold mb-2">{t?.contact?.title || "Contact"}</h2>
          <p className="text-muted-foreground">{t.contact.description}</p>
        </motion.div>

        <div className="flex flex-wrap gap-6 justify-center">
          {items.map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              target={item.href?.startsWith("mailto:") || item.href?.startsWith("tel:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="w-56 bg-card border border-border rounded-2xl p-6 flex flex-col items-center text-center hover:border-primary/30 transition"
              whileHover={{ y: -6 }}
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3">
                {item.icon}
              </div>
              <div className="font-semibold">{item.label}</div>
              <div className="text-sm text-muted-foreground mt-1 break-words">{item.value}</div>
            </motion.a>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <SocialLinks size="lg" centered />
        </div>
      </div>
    </section>
  )
}