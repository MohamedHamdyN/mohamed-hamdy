'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getAboutStats, upsertAboutStats } from '@/app/actions/cms'

export default function AboutStatsAdminPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [ok, setOk] = useState<string | null>(null)

  const [years, setYears] = useState<number>(0)
  const [followers, setFollowers] = useState<number>(0)
  const [courses, setCourses] = useState<number>(0)

  async function load() {
    try {
      setLoading(true)
      setError(null)

      const stats = await getAboutStats()
      setYears(stats?.years_of_experience ?? 0)
      setFollowers(stats?.linkedin_followers ?? 0)
      setCourses(stats?.completed_courses ?? 0)
    } catch {
      setError('Failed to load stats')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function save() {
    try {
      setSaving(true)
      setError(null)

      const res = await upsertAboutStats({
        years_of_experience: years,
        linkedin_followers: followers,
        completed_courses: courses,
      })

      if ((res as any)?.error) {
        setError((res as any).error)
        return
      }

      setOk('Saved ✅')
      setTimeout(() => setOk(null), 1500)
      // reload after save to reflect DB truth
      await load()
    } catch {
      setError('Failed to save')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="container mx-auto px-4 py-8">

        <div className="flex items-center justify-between">
          <Link href="/admin/dashboard" className="text-slate-300 hover:text-white">
            ← Back to Dashboard
          </Link>

          <Button
            onClick={save}
            disabled={saving || loading}
            className="bg-green-600 hover:bg-green-700"
          >
            {saving ? 'Saving...' : 'Save'}
          </Button>
        </div>

        <h1 className="text-3xl font-bold text-white mt-4">About Stats</h1>

        {error && <p className="text-red-400 mt-4">{error}</p>}
        {ok && <p className="text-green-400 mt-4">{ok}</p>}

        {loading ? (
          <p className="text-slate-400 mt-6">Loading...</p>
        ) : (
          <div className="mt-6 bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <div className="p-4 bg-slate-900/40 rounded-lg">
                <p className="text-slate-400 text-sm mb-2">Years of Experience</p>
                <input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-slate-100"
                  min={0}
                />
              </div>

              <div className="p-4 bg-slate-900/40 rounded-lg">
                <p className="text-slate-400 text-sm mb-2">LinkedIn Followers</p>
                <input
                  type="number"
                  value={followers}
                  onChange={(e) => setFollowers(Number(e.target.value))}
                  className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-slate-100"
                  min={0}
                />
              </div>

              <div className="p-4 bg-slate-900/40 rounded-lg">
                <p className="text-slate-400 text-sm mb-2">Completed Courses</p>
                <input
                  type="number"
                  value={courses}
                  onChange={(e) => setCourses(Number(e.target.value))}
                  className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-slate-100"
                  min={0}
                />
              </div>

            </div>

            <div className="mt-6 flex justify-end">
              <Button
                onClick={save}
                disabled={saving}
                className="bg-green-600 hover:bg-green-700"
              >
                {saving ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}