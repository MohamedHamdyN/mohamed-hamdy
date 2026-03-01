import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AdminAboutPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-2">About Page</h1>
        <p className="text-slate-400 mb-8">
          Manage About content (stats, experience, education, certifications, long bio).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/admin/about/bio" className="block">
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:bg-slate-700 transition">
              <h3 className="text-white font-semibold">Long Bio</h3>
              <p className="text-slate-400 text-sm mt-1">Manage full about text</p>
            </div>
          </Link>

          <Link href="/admin/about/stats" className="block">
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:bg-slate-700 transition">
              <h3 className="text-white font-semibold">Stats</h3>
              <p className="text-slate-400 text-sm mt-1">Years, followers, courses</p>
            </div>
          </Link>

          <Link href="/admin/about/experience" className="block">
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:bg-slate-700 transition">
              <h3 className="text-white font-semibold">Experience</h3>
              <p className="text-slate-400 text-sm mt-1">Timeline / jobs</p>
            </div>
          </Link>

          <Link href="/admin/about/education" className="block">
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:bg-slate-700 transition">
              <h3 className="text-white font-semibold">Education</h3>
              <p className="text-slate-400 text-sm mt-1">Degrees / institutions</p>
            </div>
          </Link>

          <Link href="/admin/about/certifications" className="block">
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:bg-slate-700 transition">
              <h3 className="text-white font-semibold">Certifications</h3>
              <p className="text-slate-400 text-sm mt-1">Certificates list</p>
            </div>
          </Link>
        </div>

        <div className="mt-8">
          <Link href="/admin/dashboard">
            <Button variant="outline" className="border-slate-600 text-slate-200 hover:bg-slate-800">
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}