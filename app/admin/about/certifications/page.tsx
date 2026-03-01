import { notFound } from "next/navigation"
import { getAdminFromSession } from "@/lib/auth"
import { getCertifications } from "@/app/actions/cms"

async function requireAdmin() {
  const admin = await getAdminFromSession()
  if (!admin) notFound()
  return admin
}

export default async function AboutCertificationsAdminPage() {
  await requireAdmin()
  const items = await getCertifications()

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-white">Certifications</h1>

        {items.length ? (
          <div className="mt-6 space-y-3">
            {items.map((x) => (
              <div key={x.id} className="bg-slate-800 border border-slate-700 rounded-lg p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-white font-semibold">{x.title}</p>
                    <p className="text-slate-400 text-sm">
                      {x.issuer}
                      {x.issue_date ? ` • ${String(x.issue_date).slice(0, 10)}` : ""}
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${x.enabled === false ? "bg-rose-900/40 text-rose-200" : "bg-emerald-900/40 text-emerald-200"}`}>
                    {x.enabled === false ? "Disabled" : "Enabled"}
                  </span>
                </div>

                {x.description ? <p className="text-slate-300 mt-3 whitespace-pre-line">{x.description}</p> : null}

                {x.credential_url ? (
                  <p className="text-slate-400 mt-3 text-sm">
                    Credential:{" "}
                    <a className="text-sky-300 hover:underline" href={x.credential_url} target="_blank" rel="noreferrer">
                      {x.credential_url}
                    </a>
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-400 mt-4">
            No items yet in <code className="text-slate-200">certifications</code>.
          </p>
        )}
      </div>
    </div>
  )
}