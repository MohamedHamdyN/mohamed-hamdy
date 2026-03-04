// app/admin/profile/page.tsx
"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { getProfile, updateProfile } from "@/app/actions/cms"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Profile } from "@/lib/db"

type FormState = {
  name: string
  title: string
  short_title: string

  hero_description: string
  hero_image_type: string
  hero_image_url: string

  open_to_work: boolean

  email: string
  phone: string
  location: string

  bio: string
  short_bio: string
  long_bio: string
  about_intro: string

  avatar_url: string
  resume_url: string
  calendly_url: string
  og_image_url: string
}

function toFormState(p: Profile): FormState {
  return {
    name: p.name ?? "",
    title: p.title ?? "",
    short_title: p.short_title ?? "",

    hero_description: p.hero_description ?? "",
    hero_image_type: p.hero_image_type ?? "logo",
    hero_image_url: p.hero_image_url ?? "",

    open_to_work: Boolean(p.open_to_work),

    email: p.email ?? "",
    phone: p.phone ?? "",
    location: p.location ?? "",

    bio: p.bio ?? "",
    short_bio: p.short_bio ?? "",
    long_bio: p.long_bio ?? "",
    about_intro: p.about_intro ?? "",

    avatar_url: p.avatar_url ?? "",
    resume_url: p.resume_url ?? "",
    calendly_url: p.calendly_url ?? "",
    og_image_url: p.og_image_url ?? "",
  }
}

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  const [formData, setFormData] = useState<FormState>({
    name: "",
    title: "",
    short_title: "",

    hero_description: "",
    hero_image_type: "logo",
    hero_image_url: "",

    open_to_work: false,

    email: "",
    phone: "",
    location: "",

    bio: "",
    short_bio: "",
    long_bio: "",
    about_intro: "",

    avatar_url: "",
    resume_url: "",
    calendly_url: "",
    og_image_url: "",
  })

  useEffect(() => {
    loadProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function loadProfile() {
    setIsLoading(true)
    setError("")
    try {
      const data = await getProfile()
      if (data) {
        setProfile(data)
        setFormData(toFormState(data))
      } else {
        // لو مفيش profile row موجودة
        setProfile(null)
      }
    } catch (e) {
      console.error("Error loading profile:", e)
      setError("Failed to load profile")
    } finally {
      setIsLoading(false)
    }
  }

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setSuccess("")
    setIsSaving(true)

    try {
      // send Partial<Profile> in DB shape (same keys as table)
      const payload: Partial<Profile> = {
        name: formData.name || "Portfolio",
        title: formData.title || null,
        short_title: formData.short_title || null,

        hero_description: formData.hero_description || null,
        hero_image_type: formData.hero_image_type || "logo",
        hero_image_url: formData.hero_image_url || null,

        open_to_work: formData.open_to_work,

        email: formData.email || null,
        phone: formData.phone || null,
        location: formData.location || null,

        bio: formData.bio || null,
        short_bio: formData.short_bio || null,
        long_bio: formData.long_bio || null,
        about_intro: formData.about_intro || null,

        avatar_url: formData.avatar_url || null,
        resume_url: formData.resume_url || null,
        calendly_url: formData.calendly_url || null,
        og_image_url: formData.og_image_url || null,
      }

      const result: any = await updateProfile(payload)

      if (result?.error) {
        setError(result.error)
      } else {
        setSuccess("Profile updated successfully!")
        if (result?.data) {
          setProfile(result.data as Profile)
          setFormData(toFormState(result.data as Profile))
        } else {
          // fallback reload لو السيرفر ما رجعش data لأي سبب
          await loadProfile()
        }
      }
    } catch (e) {
      console.error("Error updating profile:", e)
      setError("Failed to update profile")
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
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
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

              {/* Basic */}
              <section className="space-y-4">
                <h2 className="text-white font-semibold text-lg">Basic</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-slate-200">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => set("name", e.target.value)}
                      required
                      className="bg-slate-900 border-slate-600 text-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="title" className="text-slate-200">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => set("title", e.target.value)}
                      className="bg-slate-900 border-slate-600 text-white"
                      placeholder="e.g., Accountant & Data Analyst"
                    />
                  </div>

                  <div>
                    <Label htmlFor="short_title" className="text-slate-200">Short Title</Label>
                    <Input
                      id="short_title"
                      value={formData.short_title}
                      onChange={(e) => set("short_title", e.target.value)}
                      className="bg-slate-900 border-slate-600 text-white"
                      placeholder="e.g., Data Analyst"
                    />
                  </div>

                  <div className="flex items-end gap-3">
                    <label className="flex items-center gap-2 text-slate-200">
                      <input
                        type="checkbox"
                        checked={formData.open_to_work}
                        onChange={(e) => set("open_to_work", e.target.checked)}
                      />
                      Open to work
                    </label>
                  </div>
                </div>
              </section>

              {/* Hero */}
              <section className="space-y-4">
                <h2 className="text-white font-semibold text-lg">Hero</h2>

                <div>
                  <Label htmlFor="hero_description" className="text-slate-200">Hero Description</Label>
                  <textarea
                    id="hero_description"
                    value={formData.hero_description}
                    onChange={(e) => set("hero_description", e.target.value)}
                    className="w-full bg-slate-900 border border-slate-600 text-white rounded-md p-2"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="hero_image_type" className="text-slate-200">Hero Image Type</Label>
                    <Input
                      id="hero_image_type"
                      value={formData.hero_image_type}
                      onChange={(e) => set("hero_image_type", e.target.value)}
                      className="bg-slate-900 border-slate-600 text-white"
                      placeholder="logo | avatar | ..."
                    />
                  </div>

                  <div>
                    <Label htmlFor="hero_image_url" className="text-slate-200">Hero Image URL</Label>
                    <Input
                      id="hero_image_url"
                      type="url"
                      value={formData.hero_image_url}
                      onChange={(e) => set("hero_image_url", e.target.value)}
                      className="bg-slate-900 border-slate-600 text-white"
                    />
                  </div>
                </div>
              </section>

              {/* Contact */}
              <section className="space-y-4">
                <h2 className="text-white font-semibold text-lg">Contact</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email" className="text-slate-200">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => set("email", e.target.value)}
                      className="bg-slate-900 border-slate-600 text-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-slate-200">Phone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      className="bg-slate-900 border-slate-600 text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="location" className="text-slate-200">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => set("location", e.target.value)}
                    className="bg-slate-900 border-slate-600 text-white"
                  />
                </div>
              </section>

              {/* Bio */}
              <section className="space-y-4">
                <h2 className="text-white font-semibold text-lg">Bio</h2>

                <div>
                  <Label htmlFor="bio" className="text-slate-200">Bio</Label>
                  <textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => set("bio", e.target.value)}
                    className="w-full bg-slate-900 border border-slate-600 text-white rounded-md p-2"
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="short_bio" className="text-slate-200">Short Bio</Label>
                  <textarea
                    id="short_bio"
                    value={formData.short_bio}
                    onChange={(e) => set("short_bio", e.target.value)}
                    className="w-full bg-slate-900 border border-slate-600 text-white rounded-md p-2"
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="long_bio" className="text-slate-200">Long Bio</Label>
                  <textarea
                    id="long_bio"
                    value={formData.long_bio}
                    onChange={(e) => set("long_bio", e.target.value)}
                    className="w-full bg-slate-900 border border-slate-600 text-white rounded-md p-2"
                    rows={6}
                  />
                </div>

                <div>
                  <Label htmlFor="about_intro" className="text-slate-200">About Intro</Label>
                  <textarea
                    id="about_intro"
                    value={formData.about_intro}
                    onChange={(e) => set("about_intro", e.target.value)}
                    className="w-full bg-slate-900 border border-slate-600 text-white rounded-md p-2"
                    rows={3}
                  />
                </div>
              </section>

              {/* Media / Links */}
              <section className="space-y-4">
                <h2 className="text-white font-semibold text-lg">Media & Links</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="avatar_url" className="text-slate-200">Avatar URL</Label>
                    <Input
                      id="avatar_url"
                      type="url"
                      value={formData.avatar_url}
                      onChange={(e) => set("avatar_url", e.target.value)}
                      className="bg-slate-900 border-slate-600 text-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="resume_url" className="text-slate-200">Resume URL</Label>
                    <Input
                      id="resume_url"
                      type="url"
                      value={formData.resume_url}
                      onChange={(e) => set("resume_url", e.target.value)}
                      className="bg-slate-900 border-slate-600 text-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="calendly_url" className="text-slate-200">Calendly URL</Label>
                    <Input
                      id="calendly_url"
                      type="url"
                      value={formData.calendly_url}
                      onChange={(e) => set("calendly_url", e.target.value)}
                      className="bg-slate-900 border-slate-600 text-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="og_image_url" className="text-slate-200">OG Image URL</Label>
                    <Input
                      id="og_image_url"
                      type="url"
                      value={formData.og_image_url}
                      onChange={(e) => set("og_image_url", e.target.value)}
                      className="bg-slate-900 border-slate-600 text-white"
                    />
                  </div>
                </div>
              </section>

              <Button type="submit" disabled={isSaving} className="w-full bg-blue-600 hover:bg-blue-700">
                {isSaving ? "Saving..." : "Save Profile"}
              </Button>
            </form>
          </div>
        )}
      </main>
    </div>
  )
}