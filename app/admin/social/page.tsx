'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getSocialLinks, createSocialLink, updateSocialLink, deleteSocialLink } from '@/app/actions/cms'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SocialLink } from '@/lib/db'

export default function AdminSocialPage() {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    platform: '',
    url: '',
    enabled: true,
    order: 0,
  })

  useEffect(() => {
    loadSocialLinks()
  }, [])

  async function loadSocialLinks() {
    try {
      const data = await getSocialLinks()
      setSocialLinks(data)
    } catch (error) {
      console.error('Error loading social links:', error)
      setError('Failed to load social links')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    try {
      if (editingId) {
        const result = await updateSocialLink(editingId, formData)
        if (result.error) {
          setError(result.error)
        } else {
          await loadSocialLinks()
          resetForm()
        }
      } else {
        const result = await createSocialLink({
          ...formData,
          order: socialLinks.length,
        })
        if (result.error) {
          setError(result.error)
        } else {
          await loadSocialLinks()
          resetForm()
        }
      }
    } catch (error) {
      console.error('Error saving social link:', error)
      setError('Failed to save social link')
    }
  }

  function resetForm() {
    setEditingId(null)
    setIsCreating(false)
    setFormData({
      platform: '',
      url: '',
      enabled: true,
      order: 0,
    })
  }

  async function handleEdit(socialLink: SocialLink) {
    setEditingId(socialLink.id)
    setFormData({
      platform: socialLink.platform,
      url: socialLink.url,
      enabled: socialLink.enabled,
      order: socialLink.order,
    })
    setIsCreating(true)
  }

  async function handleDelete(id: number) {
    if (confirm('Are you sure you want to delete this social link?')) {
      try {
        const result = await deleteSocialLink(id)
        if (result.error) {
          setError(result.error)
        } else {
          await loadSocialLinks()
        }
      } catch (error) {
        console.error('Error deleting social link:', error)
        setError('Failed to delete social link')
      }
    }
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <header className="border-b border-slate-700 bg-slate-800/50">
        <div className="container mx-auto px-4 py-6">
          <Link href="/admin/dashboard" className="text-slate-400 hover:text-slate-200 mb-4 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-white">Manage Social Links</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {isCreating && (
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-white mb-4">
              {editingId ? 'Edit Social Link' : 'Create New Social Link'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-500/10 border border-red-500 rounded-md p-3">
                  <p className="text-red-500 text-sm">{error}</p>
                </div>
              )}

              <div>
                <Label htmlFor="platform" className="text-slate-200">
                  Platform
                </Label>
                <Input
                  id="platform"
                  value={formData.platform}
                  onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                  placeholder="LinkedIn, GitHub, Twitter, etc."
                  required
                  className="bg-slate-900 border-slate-600 text-white"
                />
              </div>

              <div>
                <Label htmlFor="url" className="text-slate-200">
                  URL
                </Label>
                <Input
                  id="url"
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  required
                  className="bg-slate-900 border-slate-600 text-white"
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-slate-200">
                  <input
                    type="checkbox"
                    checked={formData.enabled}
                    onChange={(e) => setFormData({ ...formData, enabled: e.target.checked })}
                  />
                  Enabled
                </label>
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  {editingId ? 'Update Link' : 'Create Link'}
                </Button>
                <Button type="button" onClick={resetForm} variant="outline" className="border-slate-600 text-slate-200">
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
          <div className="p-6 border-b border-slate-700 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Social Links ({socialLinks.length})</h2>
            {!isCreating && (
              <Button onClick={() => setIsCreating(true)} className="bg-green-600 hover:bg-green-700">
                + Add Link
              </Button>
            )}
          </div>

          {isLoading ? (
            <div className="p-6 text-center text-slate-400">Loading...</div>
          ) : socialLinks.length === 0 ? (
            <div className="p-6 text-center text-slate-400">No social links found. Create your first link!</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-200">Platform</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-200">URL</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-200">Enabled</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-slate-200">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {socialLinks.map((socialLink) => (
                    <tr key={socialLink.id} className="hover:bg-slate-700/50">
                      <td className="px-6 py-3 text-sm text-slate-300">{socialLink.platform}</td>
                      <td className="px-6 py-3 text-sm text-slate-400 truncate">{socialLink.url}</td>
                      <td className="px-6 py-3 text-sm">
                        <span className={socialLink.enabled ? 'text-green-400' : 'text-red-400'}>
                          {socialLink.enabled ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-right text-sm space-x-2">
                        <button onClick={() => handleEdit(socialLink)} className="text-blue-400 hover:text-blue-300">
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(socialLink.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
