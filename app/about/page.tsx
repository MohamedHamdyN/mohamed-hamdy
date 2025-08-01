import { getSetting } from "@/lib/settings"
import { notFound } from "next/navigation"
import AboutHero from "@/components/about/AboutHero"
import AboutFeatures from "@/components/about/AboutFeatures"
import SocialLinks from "@/components/shared/SocialLinks"
import ContactCTA from "@/components/shared/ContactCTA"
import AboutResume from "@/components/about/AboutResume"
import Certifications from "@/components/about/Certifications"
import PageHero from "@/components/shared/PageHero"
import { User } from "lucide-react"

export default async function AboutPage() {
  // Check if about page is enabled
  const aboutEnabled = await getSetting("about_page")

  if (!aboutEnabled) {
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
      <Certifications />
      <AboutFeatures />
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-6">Connect With Me</h2>
        <SocialLinks size="lg" centered />
      </div>
      <ContactCTA />
    </>
  )
}
