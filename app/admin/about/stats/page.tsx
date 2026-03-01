import { notFound } from "next/navigation"
import { getAdminFromSession } from "@/lib/auth"
import { getAboutStats } from "@/app/actions/cms"

async function requireAdmin() {
  const admin = await getAdminFromSession()
  if (!admin) notFound()
  return admin
}

export default async function AboutStatsAdminPage() {
  await requireAdmin()
  const stats = await getAboutStats()

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-white">About Stats</h1>

        {stats ? (
          <div className="mt-6 bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-900/40 rounded-lg">
                <p className="text-slate-400 text-sm">Years of Experience</p>
                <p className="text-white text-2xl font-bold">{stats.years_of_experience}</p>
              </div>
              <div className="p-4 bg-slate-900/40 rounded-lg">
                <p className="text-slate-400 text-sm">LinkedIn Followers</p>
                <p className="text-white text-2xl font-bold">{stats.linkedin_followers}</p>
              </div>
              <div className="p-4 bg-slate-900/40 rounded-lg">
                <p className="text-slate-400 text-sm">Completed Courses</p>
                <p className="text-white text-2xl font-bold">{stats.completed_courses}</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-slate-400 mt-4">
            No stats row found yet in <code className="text-slate-200">about_stats</code>.
          </p>
        )}
      </div>
    </div>
  )
}