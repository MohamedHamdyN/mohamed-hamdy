import Link from "next/link"
import { notFound } from "next/navigation"
import { getAdminFromSession } from "@/lib/auth"
import {
  getAboutStats,
  getExperiences,
  getEducations,
  getCertifications,
  getAboutSectionFull,
} from "@/app/actions/cms"

async function requireAdmin() {
  const admin = await getAdminFromSession()
  if (!admin) notFound()
  return admin
}

export default async function AdminAboutPage() {
  await requireAdmin()

  const [stats, experiences, educations, certifications, longBio] = await Promise.all([
    getAboutStats(),
    getExperiences(),
    getEducations(),
    getCertifications(),
    getAboutSectionFull("en"),
  ])

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-white">About Page</h1>
        <p className="text-slate-400 mt-2">Overview of About data (read-only for now).</p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/admin/about/stats" className="block p-4 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 transition">
            <h2 className="text-white font-semibold">Stats</h2>
            <p className="text-slate-400 text-sm mt-1">
              {stats ? "✅ Loaded" : "⚠️ No row yet"}
            </p>
          </Link>

          <Link href="/admin/about/experience" className="block p-4 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 transition">
            <h2 className="text-white font-semibold">Experience</h2>
            <p className="text-slate-400 text-sm mt-1">
              {experiences.length ? `✅ ${experiences.length} items` : "⚠️ No items"}
            </p>
          </Link>

          <Link href="/admin/about/education" className="block p-4 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 transition">
            <h2 className="text-white font-semibold">Education</h2>
            <p className="text-slate-400 text-sm mt-1">
              {educations.length ? `✅ ${educations.length} items` : "⚠️ No items"}
            </p>
          </Link>

          <Link href="/admin/about/certifications" className="block p-4 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 transition">
            <h2 className="text-white font-semibold">Certifications</h2>
            <p className="text-slate-400 text-sm mt-1">
              {certifications.length ? `✅ ${certifications.length} items` : "⚠️ No items"}
            </p>
          </Link>

          <Link href="/admin/about/bio" className="block p-4 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 transition">
            <h2 className="text-white font-semibold">Long Bio</h2>
            <p className="text-slate-400 text-sm mt-1">
              {longBio ? "✅ Loaded" : "⚠️ Empty"}
            </p>
          </Link>
        </div>
      </div>
    </div>
  )
}