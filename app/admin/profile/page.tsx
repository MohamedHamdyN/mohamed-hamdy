'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { getProfile, upsertProfile } from '@/app/actions/cms'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { Profile } from '@/lib/db'

type FormState = {
  // identity
  name: string
  title: string
  short_title: string
  open_to_work: boolean
  location: string

  // hero
  hero_description: string
  hero_image_type: string
  hero_image_url: string

  // contact
  email: string
  phone: string
  resume_url: string
  calendly_url: string
  avatar_url: string

  // about (bios)
  short_bio: string
  long_bio: string
  about_intro: string

  // legacy/general
  bio: string

  // seo
  og_image_url: string
}

const emptyForm: FormState = {
  name: '',
  title: '',
  short_title: '',
  open_to_work: false,
  location: '',

  hero_description: '',
  hero_image_type: 'logo',
  hero_image_url: '',

  email: '',
  phone: '',
  resume_url: '',
  calendly_url: '',
  avatar_url: '',

  short_bio: '',
  long_bio: '',
  about_intro: '',

  bio: '',

  og_image_url: '',
}

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [formData, setFormData] = useState<FormState>(emptyForm)

  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const previewHeroImage = useMemo(() => {
    const url = formData.hero_image_url?.trim()
    return url ? url : ''
  }, [formData.hero_image_url])

  const previewAvatar = useMemo(() => {
    const url = formData.avatar_url?.trim()
    return url ? url : ''
  }, [formData.avatar_url])

  useEffect(() => {
    loadProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function loadProfile() {
    setIsLoading(true)
    setError('')
    setSuccess('')
    try {
      const data = await getProfile()
      setProfile(data)

      if (data) {
        setFormData({
          name: data.name ?? '',
          title: data.title ?? '',
          short_title: data.short_title ?? '',
          open_to_work: Boolean((data as any).open_to_work),
          location: data.location ?? '',

          hero_description: (data as any).hero_description ?? '',
          hero_image_type: (data as any).hero_image_type ?? 'logo',
          hero_image_url: (data as any).hero_image_url ?? '',

          email: data.email ?? '',
          phone: data.phone ?? '',
          resume_url: data.resume_url ?? '',
          calendly_url: data.calendly_url ?? '',
          avatar_url: data.avatar_url ?? '',

          short_bio: (data as any).short_bio ?? '',
          long_bio: (data as any).long_bio ?? '',
          about_intro: (data as any).about_intro ?? '',

          bio: (data as any).bio ?? '',

          og_image_url: (data as any).og_image_url ?? '',
        })
      } else {
        setFormData(emptyForm)
      }
    } catch (e) {
      console.error('Error loading profile:', e)
      setError('Failed to load profile')
    } finally {
      setIsLoading(false)
    }
  }

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess('')
    setIsSaving(true)

    try {
      // Basic sanity
      if (!formData.name.trim()) throw new Error('Name is required')
      if (!formData.title.trim()) throw new Error('Title is required')

      const result = await upsertProfile({
        name: formData.name.trim(),
        title: formData.title.trim(),
        short_title: formData.short_title.trim() || null,

        open_to_work: formData.open_to_work,
        location: formData.location.trim() || null,

        hero_description: formData.hero_description.trim() || null,
        hero_image_type: formData.hero_image_type || 'logo',
        hero_image_url: formData.hero_image_url.trim() || null,

        email: formData.email.trim() || null,
        phone: formData.phone.trim() || null,
        resume_url: formData.resume_url.trim() || null,
        calendly_url: formData.calendly_url.trim() || null,
        avatar_url: formData.avatar_url.trim() || null,

        short_bio: formData.short_bio.trim() || null,
        long_bio: formData.long_bio.trim() || null,
        about_intro: formData.about_intro.trim() || null,

        bio: formData.bio.trim() || null,

        og_image_url: formData.og_image_url.trim() || null,
      } as Partial<Profile>)

      if ((result as any)?.error) {
        setError((result as any).error)
      } else {
        setSuccess('Profile updated successfully!')
        setProfile((result as any)?.data ?? null)
      }
    } catch (e) {
      console.error('Error updating profile:', e)
      setError(e instanceof Error ? e.message : 'Failed to update profile')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <header className="border-b border-slate-700 bg-slate-800/50">
        <div className="container mx-auto px-4 py-6">
          <Link href="/admin/dashboard" className="text-slate-400 hover:text-slate-200 mb-4 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-white">Edit Profile</h1>
          <p className="text-slate-400 mt-1 text-sm">
            Everything here is tied to the <code className="text-slate-200">profile</code> table.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {isLoading ? (
          <div className="text-center text-slate-400">Loading profile...</div>
        ) : (
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {error && (
                <div className="bg-red-500/10 border border-red-500 rounded-md p-3">
                  <p className="text-red-500 text-sm">{error}</p>
                </div>
              )}

              {success && (
                <div className="bg-green-500/10 border border-green-500 rounded-md p-3">
                  <p className="text-green-500 text-sm">{success}</p>
                </div>
              )}

              {/* ===== Identity ===== */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-white">Identity</h2>
                  <span className="text-xs text-slate-400">name / title / short_title</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-slate-200">
                      Name (Header)
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setField('name', e.target.value)}
                      required
                      className="bg-slate-900 border-slate-600 text-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="title" className="text-slate-200">
                      Title (Main)
                    </Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setField('title', e.target.value)}
                      required
                      className="bg-slate-900 border-slate-600 text-white"
                      placeholder="e.g., Data Analyst"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="short_title" className="text-slate-200">
                      Short Title (Secondary)
                    </Label>
                    <Input
                      id="short_title"
                      value={formData.short_title}
                      onChange={(e) => setField('short_title', e.target.value)}
                      className="bg-slate-900 border-slate-600 text-white"
                      placeholder="e.g., Financial Accountant"
                    />
                  </div>

                  <div className="flex items-end gap-4">
                    <label className="flex items-center gap-2 text-slate-200">
                      <input
                        type="checkbox"
                        checked={formData.open_to_work}
                        onChange={(e) => setField('open_to_work', e.target.checked)}
                        className="w-4 h-4"
                      />
                      Open to work
                    </label>
                  </div>
                </div>

                <div>
                  <Label htmlFor="location" className="text-slate-200">
                    Location
                  </Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setField('location', e.target.value)}
                    className="bg-slate-900 border-slate-600 text-white"
                    placeholder="e.g., Cairo, Egypt"
                  />
                </div>
              </section>

              <div className="border-t border-slate-700" />

              {/* ===== Hero ===== */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-white">Hero</h2>
                  <span className="text-xs text-slate-400">hero_description / hero_image_*</span>
                </div>

                <div>
                  <Label htmlFor="hero_description" className="text-slate-200">
                    Hero Description (shown under titles)
                  </Label>
                  <textarea
                    id="hero_description"
                    value={formData.hero_description}
                    onChange={(e) => setField('hero_description', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-600 text-white rounded-md p-2"
                    rows={3}
                    placeholder="Strong, motivational line about you."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="hero_image_type" className="text-slate-200">
                      Hero Image Type
                    </Label>
                    <select
                      id="hero_image_type"
                      value={formData.hero_image_type}
                      onChange={(e) => setField('hero_image_type', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-600 text-white rounded-md p-2"
                    >
                      <option value="logo">logo</option>
                      <option value="avatar">avatar</option>
                      <option value="image">image</option>
                      <option value="none">none</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="hero_image_url" className="text-slate-200">
                      Hero Image URL
                    </Label>
                    <Input
                      id="hero_image_url"
                      value={formData.hero_image_url}
                      onChange={(e) => setField('hero_image_url', e.target.value)}
                      className="bg-slate-900 border-slate-600 text-white"
                      placeholder="https://..."
                    />
                    {previewHeroImage ? (
                      <p className="text-xs text-slate-400 mt-2 break-all">
                        Preview: <span className="text-slate-200">{previewHeroImage}</span>
                      </p>
                    ) : null}
                  </div>
                </div>
              </section>

              <div className="border-t border-slate-700" />

              {/* ===== About (Bios) ===== */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-white">About (Bios)</h2>
                  <span className="text-xs text-slate-400">short_bio / long_bio / about_intro</span>
                </div>

                <div>
                  <Label htmlFor="short_bio" className="text-slate-200">
                    Short Bio (1–2 lines)
                  </Label>
                  <textarea
                    id="short_bio"
                    value={formData.short_bio}
                    onChange={(e) => setField('short_bio', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-600 text-white rounded-md p-2"
                    rows={2}
                    placeholder="Simple one-liner definition."
                  />
                </div>

                <div>
                  <Label htmlFor="long_bio" className="text-slate-200">
                    Long Bio (About page main text)
                  </Label>
                  <textarea
                    id="long_bio"
                    value={formData.long_bio}
                    onChange={(e) => setField('long_bio', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-600 text-white rounded-md p-2"
                    rows={6}
                    placeholder="Write multiple paragraphs (use blank lines between paragraphs)."
                  />
                  <p className="text-xs text-slate-400 mt-2">
                    Tip: Use a blank line between paragraphs to render cleanly.
                  </p>
                </div>

                <div>
                  <Label htmlFor="about_intro" className="text-slate-200">
                    About Intro (optional)
                  </Label>
                  <textarea
                    id="about_intro"
                    value={formData.about_intro}
                    onChange={(e) => setField('about_intro', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-600 text-white rounded-md p-2"
                    rows={3}
                    placeholder="Optional intro text before long bio."
                  />
                </div>

                <details className="bg-slate-900/40 border border-slate-700 rounded-lg p-4">
                  <summary className="cursor-pointer text-slate-200 text-sm">
                    Legacy field: bio (use only if some old component still reads it)
                  </summary>
                  <div className="mt-3">
                    <Label htmlFor="bio" className="text-slate-200">
                      bio (legacy)
                    </Label>
                    <textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => setField('bio', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-600 text-white rounded-md p-2"
                      rows={3}
                    />
                  </div>
                </details>
              </section>

              <div className="border-t border-slate-700" />

              {/* ===== Contact & Links ===== */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-white">Contact & Links</h2>
                  <span className="text-xs text-slate-400">email / phone / resume_url / calendly_url</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email" className="text-slate-200">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setField('email', e.target.value)}
                      className="bg-slate-900 border-slate-600 text-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-slate-200">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setField('phone', e.target.value)}
                      className="bg-slate-900 border-slate-600 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="resume_url" className="text-slate-200">
                      Resume URL
                    </Label>
                    <Input
                      id="resume_url"
                      type="url"
                      value={formData.resume_url}
                      onChange={(e) => setField('resume_url', e.target.value)}
                      className="bg-slate-900 border-slate-600 text-white"
                      placeholder="https://..."
                    />
                  </div>

                  <div>
                    <Label htmlFor="calendly_url" className="text-slate-200">
                      Calendly URL
                    </Label>
                    <Input
                      id="calendly_url"
                      type="url"
                      value={formData.calendly_url}
                      onChange={(e) => setField('calendly_url', e.target.value)}
                      className="bg-slate-900 border-slate-600 text-white"
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </section>

              <div className="border-t border-slate-700" />

              {/* ===== Media & SEO ===== */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-white">Media & SEO</h2>
                  <span className="text-xs text-slate-400">avatar_url / og_image_url</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="avatar_url" className="text-slate-200">
                      Avatar URL (About image)
                    </Label>
                    <Input
                      id="avatar_url"
                      type="url"
                      value={formData.avatar_url}
                      onChange={(e) => setField('avatar_url', e.target.value)}
                      className="bg-slate-900 border-slate-600 text-white"
                      placeholder="https://..."
                    />
                    {previewAvatar ? (
                      <p className="text-xs text-slate-400 mt-2 break-all">
                        Preview: <span className="text-slate-200">{previewAvatar}</span>
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <Label htmlFor="og_image_url" className="text-slate-200">
                      OG Image URL (social share)
                    </Label>
                    <Input
                      id="og_image_url"
                      type="url"
                      value={formData.og_image_url}
                      onChange={(e) => setField('og_image_url', e.target.value)}
                      className="bg-slate-900 border-slate-600 text-white"
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </section>

              <div className="flex gap-3">
                <Button type="submit" disabled={isSaving} className="bg-blue-600 hover:bg-blue-700">
                  {isSaving ? 'Saving...' : 'Save Profile'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="border-slate-600 text-slate-200"
                  onClick={loadProfile}
                  disabled={isSaving}
                >
                  Reload
                </Button>
              </div>

              <p className="text-xs text-slate-500">
                Current row: <span className="text-slate-300">{profile?.id ?? 'none'}</span>
              </p>
            </form>
          </div>
        )}
      </main>
    </div>
  )
}