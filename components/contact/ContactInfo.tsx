"use client"

import { motion } from "framer-motion"
import { useProfile } from "@/context/profile-context"
import { toggleSettings } from "@/admin/toggle"
import { Mail, Phone, Calendar, ExternalLink } from "lucide-react"
import SocialLinks from "@/components/shared/SocialLinks"
import { useTranslations } from "@/hooks/useTranslations"
import { Button } from "@/components/ui/button"

export default function ContactInfo() {
  const t = useTranslations()
  const profile = useProfile()

  if (!profile) {
    return (
      <div className="bg-card p-8 rounded-xl border border-border shadow-lg">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  const email = (profile as any)?.email ?? (profile as any)?.email_address ?? ""
  const phone = (profile as any)?.phone ?? (profile as any)?.phone_number ?? ""
  const calendlyUrl = (profile as any)?.calendlyUrl ?? (profile as any)?.calendly_url ?? ""

  const showEmail = !!email && email !== "0"
  const showPhone = !!phone && phone !== "0"
  const showCalendly = !!calendlyUrl && toggleSettings.calendly_feature

  // لو مفيش أي بيانات خالص
  if (!showEmail && !showPhone && !showCalendly) {
    return (
      <div className="bg-card p-8 rounded-xl border border-border shadow-lg">
        <p className="text-muted-foreground">No contact information available.</p>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {/* Card 1: Email + Phone */}
      <div className="bg-card p-8 rounded-xl border border-border shadow-lg">
        <h3 className="text-2xl font-bold mb-6 text-primary">
          {t?.contact?.getInTouch || "Get in Touch"}
        </h3>

        <div className="space-y-6">
          {showEmail && (
            <div className="flex items-start">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="font-medium mb-1">Email</h4>
                <a href={`mailto:${email}`} className="text-muted-foreground hover:text-primary transition-colors break-all">
                  {email}
                </a>
              </div>
            </div>
          )}

          {showPhone && (
            <div className="flex items-start">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="font-medium mb-1">Phone</h4>
                <a href={`tel:${phone}`} className="text-muted-foreground hover:text-primary transition-colors">
                  {phone}
                </a>
              </div>
            </div>
          )}

          {!showEmail && !showPhone && (
            <p className="text-muted-foreground">No email/phone available.</p>
          )}
        </div>
      </div>

      {/* Card 2: Social + Calendly */}
      <div className="bg-card p-8 rounded-xl border border-border shadow-lg">
        <h3 className="text-2xl font-bold mb-6 text-primary">
          {t?.contact?.connectWithMe || "Connect with me"}
        </h3>

        <div className="mb-8">
          <SocialLinks size="lg" />
        </div>

        {showCalendly ? (
          <div className="pt-6 border-t border-border">
            <h4 className="font-medium mb-4">
              {t?.about?.preferToSchedule || "Prefer to schedule?"}
            </h4>

            <Button
              variant="outline"
              className="inline-flex items-center gap-2 w-full justify-center"
              onClick={() => window.open(calendlyUrl, "_blank", "noopener noreferrer")}
            >
              <Calendar className="h-4 w-4" />
              <span>{t?.about?.scheduleCall || "Schedule a Call"}</span>
              <ExternalLink className="h-4 w-4 ml-1" />
            </Button>
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">
            {/* اختياري */}
          </p>
        )}
      </div>
    </motion.div>
  )
}