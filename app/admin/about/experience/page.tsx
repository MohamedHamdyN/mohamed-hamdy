import { notFound } from "next/navigation"
import { getAdminFromSession } from "@/lib/auth"
import { getExperiences } from "@/app/actions/cms"

async function requireAdmin() {
  const admin = await getAdminFromSession()
  if (!admin) notFound()
  return admin
}

export default async function AboutExperienceAdminPage() {
  await requireAdmin()
  const items = await getExperiences()

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-white">Experience</h1>

        {items.length ? (
          <div className="mt-6 space-y-3">
            {items.map((x) => (
              <div key={x.id} className="bg-slate-800 border border-slate-700 rounded-lg p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-white font-semibold">{x.title}</p>
                    <p className="text-slate-400 text-sm">{x.year}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${x.enabled === false ? "bg-rose-900/40 text-rose-200" : "bg-emerald-900/40 text-emerald-200"}`}>
                    {x.enabled === false ? "Disabled" : "Enabled"}
                  </span>
                </div>
                <p className="text-slate-300 mt-3 whitespace-pre-line">{x.details}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-400 mt-4">
            No items yet in <code className="text-slate-200">experiences</code>.
          </p>
        )}
      </div>
    </div>
  )
}