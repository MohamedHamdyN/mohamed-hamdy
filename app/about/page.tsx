// app/about/page.ts
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
  getAboutSectionFull, // ✅ لازم تكون موجودة في cms.ts
} from "@/app/actions/cms"

function normalizeLongBio(value: any): string {
  if (!value) return ""
  if (typeof value === "string") return value
  // لو رجّعت object زي { content: "..." }
  if (typeof value === "object" && typeof value.content === "string") return value.content
  return String(value)
}

export default async function AboutPage() {
  if (!toggleSettings.about_page) notFound()

  const [profile, projects, skills, longBioRaw] = await Promise.all([
    getProfile(),
    getProjects(false),
    getSkills(),
    getAboutSectionFull("en"),
  ])

  const longBio = normalizeLongBio(longBioRaw)
  const effectiveLongBio = longBio ?? profile?.bio ?? ""
  // مؤقتًا لحد ما نعمل جدول about_stats
  const aboutStats = {
    years_of_experience: 0,
    linkedin_followers: 0,
    completed_courses: 0,
  }

  // مؤقتًا لحد ما نعمل جداول experiences/educations/certifications
  const experiences: any[] = []
  const educations: any[] = []
  const certifications: any[] = []

  return (
    <>
      <PageHero
        title="About"
        description="Learn more about my background, skills, and experience"
        icon={<User className="h-4 w-4" />}
      />

      <AboutHero
        profile={profile}
        longBio={effectiveLongBio}
        stats={{
          years: Number(aboutStats.years_of_experience) || 0,
          completedProjects: Array.isArray(projects) ? projects.length : 0,
          linkedinFollowers: Number(aboutStats.linkedin_followers) || 0,
          completedCourses: Number(aboutStats.completed_courses) || 0,
        }}
      />

      <AboutResume
        resumeUrl={profile?.resume_url ?? ""}
        experiences={experiences}
        educations={educations}
        skills={skills}
      />

      <Certifications items={certifications} />

      <AboutFeatures />

      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-6">Connect With Me</h2>
        <SocialLinks size="lg" centered />
      </div>

      <ContactCTA />
    </>
  )
}