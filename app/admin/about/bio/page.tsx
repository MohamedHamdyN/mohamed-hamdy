'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  getAboutSectionFull,
  upsertAboutSectionFull,
  type AboutLang,
} from '@/app/actions/cms'
const LANG: AboutLang = "en" // غيّرها لاحقًا حسب نظام اللغات عندك

export default function AboutBioAdminPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [ok, setOk] = useState<string | null>(null)

  const [fullBio, setFullBio] = useState('')

  async function load() {
    try {
      setLoading(true)
      setError(null)
      const data = await getAboutSectionFull(LANG)
      setFullBio(data ?? '')
    } catch {
      setError('Failed to load bio')
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

      const res = await upsertAboutSectionFull(LANG, fullBio)

      await upsertAboutSectionFull(LANG, fullBio)

      if ((res as any)?.error) {
        setError((res as any).error)
        return
      }

      setOk('Saved ✅')
      setTimeout(() => setOk(null), 1500)
    } catch {
      setError('Failed to save')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="container mx-auto px-4 py-8">

        <Link href="/admin/dashboard" className="text-slate-300 hover:text-white">
          ← Back to Dashboard
        </Link>

        <h1 className="text-3xl font-bold text-white mt-4">About Bio (Full)</h1>

        {error && <p className="text-red-400 mt-4">{error}</p>}
        {ok && <p className="text-green-400 mt-4">{ok}</p>}

        {loading ? (
          <p className="text-slate-400 mt-6">Loading...</p>
        ) : (
          <div className="mt-6 bg-slate-800 border border-slate-700 rounded-lg p-6">
            <textarea
              value={fullBio}
              onChange={(e) => setFullBio(e.target.value)}
              className="w-full min-h-[260px] rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-slate-100"
            />

            <Button
              onClick={save}
              disabled={saving}
              className="mt-4 bg-green-600 hover:bg-green-700"
            >
              {saving ? 'Saving...' : 'Save'}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}