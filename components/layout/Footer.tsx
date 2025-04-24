"use client"

import Link from "next/link"
import { useTranslations } from "@/hooks/useTranslations"
import { profile } from "@/admin/profile"
import SocialLinks from "@/components/shared/SocialLinks"
import { Heart } from "lucide-react"

export default function Footer() {
  const t = useTranslations()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-background border-t border-border">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-12 sm:py-16 lg:px-8">
        <div className="mb-8 flex justify-center">
          <SocialLinks size="md" />
        </div>

        <nav className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
          <div className="pb-6">
            <Link href="/" className="text-sm leading-6 text-muted-foreground hover:text-foreground">
              {t.nav.home}
            </Link>
          </div>
          <div className="pb-6">
            <Link href="/projects" className="text-sm leading-6 text-muted-foreground hover:text-foreground">
              {t.nav.projects}
            </Link>
          </div>
          <div className="pb-6">
            <Link href="/about" className="text-sm leading-6 text-muted-foreground hover:text-foreground">
              {t.nav.about}
            </Link>
          </div>
          <div className="pb-6">
            <Link href="/services" className="text-sm leading-6 text-muted-foreground hover:text-foreground">
              {t.nav.services}
            </Link>
          </div>
          <div className="pb-6">
            <Link href="/contact" className="text-sm leading-6 text-muted-foreground hover:text-foreground">
              {t.nav.contact}
            </Link>
          </div>
          <div className="pb-6">
            <Link href="/resume" className="text-sm leading-6 text-muted-foreground hover:text-foreground">
              {t.nav.resume}
            </Link>
          </div>
        </nav>

        <div className="mt-10 flex flex-col items-center">
          <p className="text-center text-sm leading-5 text-muted-foreground">
            &copy; {currentYear} {profile.name}. {t.footer.rights}
          </p>
          <p className="mt-2 text-center text-sm leading-5 text-muted-foreground flex items-center">
            {t.footer.madeWith} <Heart className="h-4 w-4 mx-1 text-red-500" />{" "}
            {t.footer.madeWith === "Made with" ? "by" : "بواسطة"} Mohamed Hamdy
          </p>
        </div>
      </div>
    </footer>
  )
}
