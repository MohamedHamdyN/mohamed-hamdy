import Link from "next/link"
import { notFound } from "next/navigation"
import { getAdminFromSession } from "@/lib/auth"

async function requireAdmin() {
  const admin = await getAdminFromSession()
  if (!admin) notFound()
  return admin
}

export default async function AdminAboutHomePage() {
  await requireAdmin()

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="container mx-auto px-4 py-8">
        <Link href="/admin/dashboard" className="text-slate-300 hover:text-white">
          ← Back to Dashboard
        </Link>

        <h1 className="text-3xl font-bold text-white mt-4">About Management</h1>
        <p className="text-slate-400 mt-2">Manage About page content from one place.</p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/admin/about/bio" className="block p-4 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 transition">
            <h3 className="font-semibold text-white">Bio (Long/Short)</h3>
            <p className="text-sm text-slate-400 mt-1">Edit about_sections content</p>
          </Link>

          <Link href="/admin/about/stats" className="block p-4 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 transition">
            <h3 className="font-semibold text-white">Stats</h3>
            <p className="text-sm text-slate-400 mt-1">Years / Followers / Courses</p>
          </Link>

          <Link href="/admin/about/experience" className="block p-4 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 transition">
            <h3 className="font-semibold text-white">Experience</h3>
            <p className="text-sm text-slate-400 mt-1">Add/Edit experience timeline</p>
          </Link>

          <Link href="/admin/about/education" className="block p-4 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 transition">
            <h3 className="font-semibold text-white">Education</h3>
            <p className="text-sm text-slate-400 mt-1">Add/Edit education records</p>
          </Link>

          <Link href="/admin/about/certifications" className="block p-4 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 transition">
            <h3 className="font-semibold text-white">Certifications</h3>
            <p className="text-sm text-slate-400 mt-1">Add/Edit certifications</p>
          </Link>
        </div>
      </div>
    </div>
  )
}