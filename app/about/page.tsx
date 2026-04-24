import { CACHE_REVALIDATE } from "@/lib/constants/cache"

export const revalidate = CACHE_REVALIDATE.ABOUT

import { toggleSettings } from "@/admin/toggle"
import { notFound } from "next/navigation"
import PageHero from "@/components/shared/PageHero"
import AboutHero from "@/components/about/AboutHero"
import AboutResume from "@/components/about/AboutResume"
import Certifications from "@/components/about/Certifications"
import SocialLinks from "@/components/shared/SocialLinks"
import ContactCTA from "@/components/shared/ContactCTA"
import { User } from "lucide-react"

import {
  getProfile,
  getProjects,
  getSkills,
  getStats,
  getExperiences,
  getEducation,
  getCertifications,
} from "@/app/actions/cms"

export default async function AboutPage() {
  if (!toggleSettings.about_page) notFound()

  const [
    profile,
    projects,
    skills,
    stats,
    experiences,
    educations,
    certifications,
  ] = await Promise.all([
    getProfile(),
    getProjects(),
    getSkills(),
    getStats(),
    getExperiences(),
    getEducation(),
    getCertifications(),
  ])

  return (
    <>
      <PageHero
        title="About"
        description="Learn more about my background, skills, and experience"
        icon={<User className="h-4 w-4" />}
      />

      <AboutHero
        profile={profile}
        stats={stats || []}
      />

      <AboutResume
        resumeUrl={profile?.resume_url ?? ""}
        experiences={experiences as any}
        educations={educations as any}
        skills={skills as any}
      />

      <Certifications items={certifications as any} />

      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-6">Connect With Me</h2>
        <SocialLinks size="lg" centered />
      </div>

      <ContactCTA />
    </>
  )
}
