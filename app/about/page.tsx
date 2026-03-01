import { toggleSettings } from "@/admin/toggle"
import { notFound } from "next/navigation"
import PageHero from "@/components/shared/PageHero"
import AboutHero from "@/components/about/AboutHero"
import AboutResume from "@/components/about/AboutResume"
import Certifications from "@/components/about/Certifications"
import AboutFeatures from "@/components/about/AboutFeatures"
import SocialLinks from "@/components/shared/SocialLinks"
import ContactCTA from "@/components/shared/ContactCTA"
import { User } from "lucide-react"

import {
  getProfile,
  getProjects,
  getSkills,
  getAboutStats,
  getAboutSectionFull,
  getExperiences,
  getEducations,
  getCertifications,
} from "@/app/actions/cms"

import type { AboutLang } from "@/app/actions/cms"

export default async function AboutPage() {
  if (!toggleSettings.about_page) notFound()

  const LANG: AboutLang = "en" // لاحقًا تربطه بالـ locale

  const [
    profile,
    projects,
    skills,
    aboutStats,
    longBio,
    experiences,
    educations,
    certifications,
  ] = await Promise.all([
    getProfile(),
    getProjects(false),
    getSkills(),
    getAboutStats(),
    getAboutSectionFull(LANG),
    getExperiences(),
    getEducations(),
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
        longBio={longBio ?? ""}
        stats={{
          years: aboutStats?.years_of_experience ?? 0,
          completedProjects: projects.length,
          linkedinFollowers: aboutStats?.linkedin_followers ?? 0,
          completedCourses: aboutStats?.completed_courses ?? 0,
        }}
      />

      <AboutResume
        resumeUrl={profile?.resume_url ?? ""}
        experiences={experiences as any}
        educations={educations as any}
        skills={skills}
      />

      <Certifications items={certifications as any} />

      <AboutFeatures />

      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-6">Connect With Me</h2>
        <SocialLinks size="lg" centered />
      </div>

      <ContactCTA />
    </>
  )
}