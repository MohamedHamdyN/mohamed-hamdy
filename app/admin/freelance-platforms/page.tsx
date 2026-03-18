'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getFreelancePlatforms, createFreelancePlatform, updateFreelancePlatform, deleteFreelancePlatform } from '@/app/actions/cms'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Trash2, Edit2 } from 'lucide-react'

interface FreelancePlatform {
  id: number
  name: string
  profile_url: string
  logo_url: string | null
  color: string | null
  enabled: boolean
  order: number
  created_at: string
  updated_at: string
}

export default function AdminFreelancePlatformsPage() {
  const [platforms, setPlatforms] = useState<FreelancePlatform[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    profile_url: '',
    logo_url: '',
    color: 'border-blue-500',
    order: 0,
  })

  useEffect(() => {
    loadPlatforms()
  }, [])

  async function loadPlatforms() {
    try {
      const data = await getFreelancePlatforms()
      setPlatforms(data)
    } catch (error) {
      console.error('Error loading freelance platforms:', error)
      setError('Failed to load freelance platforms')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!formData.name.trim()) {
      setError('Platform name is required')
      return
    }

    if (!formData.profile_url.trim()) {
      setError('Profile URL is required')
      return
    }

    try {
      setIsSaving(true)
      if (editingId) {
        const result = await updateFreelancePlatform(editingId, {
          name: formData.name,
          profile_url: formData.profile_url,
          logo_url: formData.logo_url || null,
          color: formData.color || null,
          order: formData.order,
        })
        if ((result as any)?.error) {
          setError((result as any).error)
        } else {
          setSuccess('Platform updated successfully!')
          await loadPlatforms()
          setEditingId(null)
          resetForm()
        }
      } else {
        const result = await createFreelancePlatform({
          name: formData.name,
          profile_url: formData.profile_url,
          logo_url: formData.logo_url || null,
          color: formData.color || null,
          order: formData.order,
        })
        if ((result as any)?.error) {
          setError((result as any).error)
        } else {
          setSuccess('Platform created successfully!')
          await loadPlatforms()
          resetForm()
        }
      }
    } catch (error) {
      console.error('Error saving platform:', error)
      setError('Failed to save platform')
    } finally {
      setIsSaving(false)
    }
  }

  function resetForm() {
    setFormData({
      name: '',
      profile_url: '',
      logo_url: '',
      color: 'border-blue-500',
      order: 0,
    })
    setIsCreating(false)
  }

  async function handleEdit(platform: FreelancePlatform) {
    setEditingId(platform.id)
    setFormData({
      name: platform.name,
      profile_url: platform.profile_url,
      logo_url: platform.logo_url || '',
      color: platform.color || 'border-blue-500',
      order: platform.order,
    })
    setIsCreating(true)
  }

  async function handleDelete(id: number) {
    if (!window.confirm('Are you sure you want to delete this platform?')) return

    setError('')
    setSuccess('')

    try {
      const result = await deleteFreelancePlatform(id)
      if ((result as any)?.error) {
        setError((result as any).error)
      } else {
        setSuccess('Platform deleted successfully!')
        await loadPlatforms()
      }
    } catch (error) {
      console.error('Error deleting platform:', error)
      setError('Failed to delete platform')
    }
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <header className="border-b border-slate-700 bg-slate-800/50">
        <div className="container mx-auto px-4 py-6">
          <Link href="/admin/dashboard" className="text-slate-400 hover:text-slate-200 mb-4 inline-flex items-center gap-2">
            <ArrowLeft size={20} />
            Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-white">Freelance Platforms</h1>
          <p className="text-slate-400 mt-2">Manage your freelance platform profiles</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500 text-red-300 rounded-lg">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500 text-green-300 rounded-lg">
            {success}
          </div>
        )}

        {isCreating || editingId ? (
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              {editingId ? 'Edit Platform' : 'Add New Platform'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-white">
                  Platform Name *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white mt-2"
                  placeholder="e.g., Upwork"
                />
              </div>

              <div>
                <Label htmlFor="profile_url" className="text-white">
                  Profile URL *
                </Label>
                <Input
                  id="profile_url"
                  type="url"
                  value={formData.profile_url}
                  onChange={(e) => setFormData({ ...formData, profile_url: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white mt-2"
                  placeholder="https://www.upwork.com/..."
                />
              </div>

              <div>
                <Label htmlFor="logo_url" className="text-white">
                  Logo URL
                </Label>
                <Input
                  id="logo_url"
                  type="url"
                  value={formData.logo_url}
                  onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white mt-2"
                  placeholder="https://..."
                />
              </div>

              <div>
                <Label htmlFor="color" className="text-white">
                  Border Color
                </Label>
                <Input
                  id="color"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white mt-2"
                  placeholder="e.g., border-blue-500"
                />
              </div>

              <div>
                <Label htmlFor="order" className="text-white">
                  Order
                </Label>
                <Input
                  id="order"
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  className="bg-slate-700 border-slate-600 text-white mt-2"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  type="submit"
                  disabled={isSaving}
                  className="bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
                >
                  {editingId ? 'Update Platform' : 'Create Platform'}
                </Button>
                {(editingId || isCreating) && (
                  <Button
                    type="button"
                    onClick={() => {
                      setEditingId(null)
                      resetForm()
                    }}
                    className="bg-slate-700 hover:bg-slate-600 text-white"
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </div>
        ) : (
          <Button
            onClick={() => setIsCreating(true)}
            className="mb-8 bg-blue-600 hover:bg-blue-700 text-white"
          >
            Add New Platform
          </Button>
        )}

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-slate-400">Loading platforms...</p>
          </div>
        ) : platforms.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-400">No platforms found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {platforms.map((platform) => (
              <div
                key={platform.id}
                className="bg-slate-800 border border-slate-700 rounded-lg p-6 flex items-center justify-between hover:bg-slate-750 transition-colors"
              >
                <div className="flex-1">
                  <h3 className="text-white font-semibold">{platform.name}</h3>
                  <p className="text-slate-400 text-sm mt-1">
                    <a href={platform.profile_url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                      {platform.profile_url}
                    </a>
                  </p>
                  <p className="text-slate-500 text-xs mt-2">Order: {platform.order}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleEdit(platform)}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Edit2 size={16} />
                  </Button>
                  <Button
                    onClick={() => handleDelete(platform.id)}
                    size="sm"
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
