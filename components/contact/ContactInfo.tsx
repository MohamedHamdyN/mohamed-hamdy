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

  // Helper function to check if value is valid (not "0", "00", or empty)
  const isValidField = (value: any): boolean => {
    if (!value) return false
    const str = String(value).trim()
    if (!str) return false
    if (str === "0" || str === "00") return false
    return true
  }

  const showEmail = isValidField(email)
  const showPhone = isValidField(phone) && ((profile as any)?.show_phone ?? true)
  const showResume = isValidField((profile as any)?.resume_url ?? '') && ((profile as any)?.show_resume ?? true)
  const showCalendly = isValidField(calendlyUrl) && ((profile as any)?.show_calendly ?? true) && toggleSettings.calendly_feature
  const showLocation = isValidField((profile as any)?.location ?? '') && ((profile as any)?.show_location ?? true)

  // لو مفيش أي بيانات خالص
  if (!showEmail && !showPhone && !showCalendly && !showResume) {
    return (
      <div className="bg-card p-8 rounded-xl border border-border shadow-lg">
        <p className="text-muted-foreground">No contact information available.</p>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Section Title */}
      <div className="text-center mb-12">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {t?.contact?.getInTouch || "Get in Touch"}
        </motion.h2>
        <motion.p
          className="text-muted-foreground text-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Multiple ways to reach me and stay connected
        </motion.p>
      </div>

      {/* Contact Methods Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {showEmail && (
          <motion.a
            href={`mailto:${email}`}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 hover:border-primary/50 transition-all duration-300"
            whileHover={{ y: -4, boxShadow: "0 20px 40px -10px rgba(59, 130, 246, 0.15)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative">
              <div className="p-4 rounded-xl bg-primary/10 group-hover:bg-primary/20 w-fit mb-4 transition-colors">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-muted-foreground break-all text-sm hover:text-primary transition-colors">
                {email}
              </p>
            </div>
          </motion.a>
        )}

        {showPhone && (
          <motion.a
            href={`tel:${phone}`}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 hover:border-primary/50 transition-all duration-300"
            whileHover={{ y: -4, boxShadow: "0 20px 40px -10px rgba(59, 130, 246, 0.15)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative">
              <div className="p-4 rounded-xl bg-primary/10 group-hover:bg-primary/20 w-fit mb-4 transition-colors">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Phone</h3>
              <p className="text-muted-foreground text-sm hover:text-primary transition-colors">
                {phone}
              </p>
            </div>
          </motion.a>
        )}

        {showResume && (
          <motion.a
            href={(profile as any)?.resume_url || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 hover:border-primary/50 transition-all duration-300"
            whileHover={{ y: -4, boxShadow: "0 20px 40px -10px rgba(59, 130, 246, 0.15)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative">
              <div className="p-4 rounded-xl bg-primary/10 group-hover:bg-primary/20 w-fit mb-4 transition-colors">
                <ExternalLink className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Resume</h3>
              <p className="text-muted-foreground text-sm">
                {t?.contact?.viewResume || "Download my resume"}
              </p>
            </div>
          </motion.a>
        )}

        {showCalendly && (
          <motion.button
            onClick={() => window.open(calendlyUrl, "_blank", "noopener noreferrer")}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 hover:border-primary/50 transition-all duration-300 text-left"
            whileHover={{ y: -4, boxShadow: "0 20px 40px -10px rgba(59, 130, 246, 0.15)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative">
              <div className="p-4 rounded-xl bg-primary/10 group-hover:bg-primary/20 w-fit mb-4 transition-colors">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Schedule a Call</h3>
              <p className="text-muted-foreground text-sm">
                {t?.about?.preferToSchedule || "Book a time that works for you"}
              </p>
            </div>
          </motion.button>
        )}
      </div>

      {/* Social Links Section */}
      <motion.div
        className="rounded-2xl border border-border bg-card/50 p-8 md:p-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h3 className="text-2xl font-bold mb-6">
          {t?.contact?.connectWithMe || "Connect with Me"}
        </h3>
        <div className="flex justify-center">
          <SocialLinks size="lg" />
        </div>
      </motion.div>
    </motion.div>
  )
}
