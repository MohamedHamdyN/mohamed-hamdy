"use client"

import { motion } from "framer-motion"
import { useTranslations } from "@/hooks/useTranslations"
import { profile } from "@/admin/profile"
import { toggleSettings } from "@/admin/toggle"
import Link from "next/link"
import Image from "next/image"
import SocialLinks from "@/components/shared/SocialLinks"

export default function Footer() {
  const t = useTranslations()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="col-span-1 lg:col-span-2"
          >
            <Link href="/" className="inline-block mb-4">
              {profile.logo ? (
                <Image
                  src={profile.logo || "/placeholder.svg"}
                  alt={profile.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                  unoptimized
                />
              ) : (
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-primary">MH</span>
                </div>
              )}
            </Link>
            <p className="text-muted-foreground mb-4 max-w-md">{profile.shortBio}</p>
            <SocialLinks className="text-muted-foreground" />
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-4">{t?.footer?.quickLinks || "Quick Links"}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  {t?.nav?.home || "Home"}
                </Link>
              </li>
              {toggleSettings.projects_page && (
                <li>
                  <Link href="/projects" className="text-muted-foreground hover:text-primary transition-colors">
                    {t?.nav?.projects || "Projects"}
                  </Link>
                </li>
              )}
              {toggleSettings.services_page && (
                <li>
                  <Link href="/services" className="text-muted-foreground hover:text-primary transition-colors">
                    {t?.nav?.services || "Services"}
                  </Link>
                </li>
              )}
              {toggleSettings.about_page && (
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                    {t?.nav?.about || "About"}
                  </Link>
                </li>
              )}
              {toggleSettings.contact_page && (
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                    {t?.nav?.contact || "Contact"}
                  </Link>
                </li>
              )}
            </ul>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-4">{t?.footer?.contactInfo || "Contact Info"}</h3>
            <ul className="space-y-2">
              <li className="text-muted-foreground">
                <a href={`mailto:${profile.email}`} className="hover:text-primary transition-colors">
                  {profile.email}
                </a>
              </li>
              {profile.phone && (
                <li className="text-muted-foreground">
                  <a href={`tel:${profile.phone}`} className="hover:text-primary transition-colors">
                    {profile.phone}
                  </a>
                </li>
              )}
              {profile.location && <li className="text-muted-foreground">{profile.location}</li>}
            </ul>
          </motion.div>
        </div>

        <div className="border-t border-border mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {currentYear} {profile.name}. {t?.footer?.rightsReserved || "All rights reserved"}
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              {t?.footer?.privacyPolicy || "Privacy Policy"}
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              {t?.footer?.terms || "Terms"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
