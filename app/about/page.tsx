import { toggleSettings } from "@/admin/toggle"
import { notFound } from "next/navigation"
import AboutHero from "@/components/about/AboutHero"
import AboutFeatures from "@/components/about/AboutFeatures"
import SocialLinks from "@/components/shared/SocialLinks"
import ContactCTA from "@/components/shared/ContactCTA"
import AboutResume from "@/components/about/AboutResume"

export default function AboutPage() {
  // If about page is disabled, return 404
  if (!toggleSettings.about_page) {
    notFound()
  }

  return (
    <>
      <AboutHero />
      <AboutResume />
      <AboutFeatures />
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-6">Connect With Me</h2>
        <SocialLinks size="lg" centered />
      </div>
      <ContactCTA />
    </>
  )
}
