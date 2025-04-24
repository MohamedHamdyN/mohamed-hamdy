"use client"

import { motion } from "framer-motion"
import { profile } from "@/admin/profile"
import { toggleSettings } from "@/admin/toggle"
import { Mail, Phone, MapPin, Calendar, ExternalLink } from "lucide-react"
import SocialLinks from "@/components/shared/SocialLinks"
import { useTranslations } from "@/hooks/useTranslations"
import { Button } from "@/components/ui/button"

export default function ContactInfo() {
  const t = useTranslations()

  // Determine if phone and location should be shown
  const showPhone = profile.phone !== "0" && profile.phone !== ""
  const showLocation = profile.location !== "0" && profile.location !== ""

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card p-8 rounded-xl border border-border shadow-lg"
    >
      <h3 className="text-2xl font-bold mb-6 text-primary">{t.contact.getInTouch}</h3>

      <div className="space-y-6 mb-8">
        <div className="flex items-start">
          <div className="bg-primary/10 p-3 rounded-full mr-4">
            <Mail className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h4 className="font-medium mb-1">Email</h4>
            <a href={`mailto:${profile.email}`} className="text-muted-foreground hover:text-primary transition-colors">
              {profile.email}
            </a>
          </div>
        </div>

        {showPhone && (
          <div className="flex items-start">
            <div className="bg-primary/10 p-3 rounded-full mr-4">
              <Phone className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h4 className="font-medium mb-1">Phone</h4>
              <a href={`tel:${profile.phone}`} className="text-muted-foreground hover:text-primary transition-colors">
                {profile.phone}
              </a>
            </div>
          </div>
        )}

        {showLocation && (
          <div className="flex items-start">
            <div className="bg-primary/10 p-3 rounded-full mr-4">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h4 className="font-medium mb-1">Location</h4>
              <p className="text-muted-foreground">{profile.location}</p>
            </div>
          </div>
        )}
      </div>

      <div>
        <h4 className="font-medium mb-4">{t.contact.connectWithMe}</h4>
        <SocialLinks size="lg" />
      </div>

      {profile.calendlyUrl && toggleSettings.calendly_feature && (
        <div className="mt-8 pt-8 border-t border-border">
          <h4 className="font-medium mb-4">{t.about.preferToSchedule}</h4>
          <Button
            variant="outline"
            className="inline-flex items-center gap-2 w-full justify-center"
            onClick={() => window.open(profile.calendlyUrl, "_blank", "noopener noreferrer")}
          >
            <Calendar className="h-4 w-4" />
            <span>{t.about.scheduleCall}</span>
            <ExternalLink className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}
    </motion.div>
  )
}
