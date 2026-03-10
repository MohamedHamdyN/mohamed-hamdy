import Link from "next/link"
import { notFound } from "next/navigation"
import { getAdminFromSession } from "@/lib/auth"
import AdminAboutClient from "./AdminAboutClient"

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
        <p className="text-slate-400 mt-2">
          Manage About page content from one place (Stats / Experience / Education / Certifications).
        </p>

        <div className="mt-8">
          <AdminAboutClient />
        </div>
      </div>
    </div>
  )
}