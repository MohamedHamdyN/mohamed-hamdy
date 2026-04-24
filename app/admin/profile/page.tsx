'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { getProfile, updateProfile } from '@/app/actions/cms'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export default function AdminProfilePage() {
  const [formData, setFormData] = useState({
    name: '',
    job_title_1: '',
    job_title_2: '',
    email: '',
    phone_number: '',
    location: '',
    hero_description: '',
    description: '',
    special_description: '',
    quote: '',
    resume_url: '',
    calendly_url: '',
  })

  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    loadProfile()
  }, [])

  async function loadProfile() {
    try {
      const data = await getProfile()
      if (data) {
        setFormData(data)
      }
    } catch (err) {
      console.error('Error loading profile:', err)
      setError('Failed to load profile data')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
      setIsSaving(true)
      const result = await updateProfile(formData)
      if ((result as any)?.error) {
        setError((result as any).error)
      } else {
        setSuccess('Profile saved successfully!')
        await loadProfile()
      }
    } catch (err) {
      console.error('Error saving profile:', err)
      setError('Error saving profile data')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return <div className="p-8 text-center">Loading profile...</div>
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
        <p className="text-muted-foreground">Edit your profile information</p>
      </div>

      {error && <div className="p-4 bg-red-500/10 border border-red-500 text-red-600 rounded-lg">{error}</div>}
      {success && <div className="p-4 bg-green-500/10 border border-green-500 text-green-600 rounded-lg">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-6 bg-card border rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Your full name"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="your.email@example.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="job_title_1">Primary Job Title</Label>
            <Input
              id="job_title_1"
              value={formData.job_title_1}
              onChange={(e) => setFormData({ ...formData, job_title_1: e.target.value })}
              placeholder="e.g., Data Analyst"
            />
          </div>
          <div>
            <Label htmlFor="job_title_2">Secondary Job Title</Label>
            <Input
              id="job_title_2"
              value={formData.job_title_2}
              onChange={(e) => setFormData({ ...formData, job_title_2: e.target.value })}
              placeholder="e.g., Financial Accountant"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="phone_number">Phone Number (leave 00 to hide)</Label>
            <Input
              id="phone_number"
              value={formData.phone_number}
              onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
              placeholder="+1 (555) 123-4567"
            />
          </div>
          <div>
            <Label htmlFor="location">Location (leave 00 to hide)</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="City, Country"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="hero_description">Hero Description</Label>
          <Textarea
            id="hero_description"
            value={formData.hero_description}
            onChange={(e) => setFormData({ ...formData, hero_description: e.target.value })}
            placeholder="Short description shown on home page"
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="special_description">Special Description (About page header)</Label>
          <Textarea
            id="special_description"
            value={formData.special_description}
            onChange={(e) => setFormData({ ...formData, special_description: e.target.value })}
            placeholder="Description shown at the top of About page"
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="description">Full Description (About page)</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Full biography shown on About page"
            rows={5}
          />
        </div>

        <div>
          <Label htmlFor="quote">Quote</Label>
          <Textarea
            id="quote"
            value={formData.quote}
            onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
            placeholder="Inspirational quote or motto"
            rows={2}
            maxLength={150}
          />
          <p className="text-xs text-muted-foreground mt-1">{formData.quote.length}/150</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="resume_url">Resume URL</Label>
            <Input
              id="resume_url"
              value={formData.resume_url}
              onChange={(e) => setFormData({ ...formData, resume_url: e.target.value })}
              placeholder="https://example.com/resume.pdf"
            />
          </div>
          <div>
            <Label htmlFor="calendly_url">Calendly URL (leave 00 to hide)</Label>
            <Input
              id="calendly_url"
              value={formData.calendly_url}
              onChange={(e) => setFormData({ ...formData, calendly_url: e.target.value })}
              placeholder="https://calendly.com/yourname"
            />
          </div>
        </div>

        <Button type="submit" disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Profile'}
        </Button>
      </form>
    </div>
  )
}
