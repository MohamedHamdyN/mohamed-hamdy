import { notFound } from "next/navigation"
import { getAdminFromSession } from "@/lib/auth"
import { getAboutSectionFull } from "@/app/actions/cms"

async function requireAdmin() {
  const admin = await getAdminFromSession()
  if (!admin) notFound()
  return admin
}

export default async function AboutBioAdminPage() {
  await requireAdmin()
  const longBio = await getAboutSectionFull("en") // غيّرها لو عايز ar

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-white">Long Bio</h1>

        {longBio ? (
          <div className="mt-6 bg-slate-800 border border-slate-700 rounded-lg p-6">
            <pre className="text-slate-200 whitespace-pre-wrap">{longBio}</pre>
          </div>
        ) : (
          <p className="text-slate-400 mt-4">
            No content yet in <code className="text-slate-200">about_sections</code> (type=full).
          </p>
        )}
      </div>
    </div>
  )
}