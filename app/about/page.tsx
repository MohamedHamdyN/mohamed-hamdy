import { toggleSettings } from "@/admin/toggle"
import { notFound } from "next/navigation"
import AboutHero from "@/components/about/AboutHero"
import AboutFeatures from "@/components/about/AboutFeatures"
import SocialLinks from "@/components/shared/SocialLinks"
import ContactCTA from "@/components/shared/ContactCTA"
import AboutResume from "@/components/about/AboutResume"
import PageHero from "@/components/shared/PageHero"
import { User } from "lucide-react"

export default function AboutPage() {
  // If about page is disabled, return 404
  if (!toggleSettings.about_page) {
    notFound()
  }

  return (
    <>
      <PageHero
        title="About"
        description="Learn more about my background, skills, and experience"
        icon={<User className="h-4 w-4" />}
      />
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
