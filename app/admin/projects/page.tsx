'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  getProjects,
  getCategories,
  getTechnologies,
  createProject,
  updateProject,
  deleteProject,
} from '@/app/actions/cms'
import { Plus, Edit2, Trash2, ArrowLeft } from 'lucide-react'

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [technologies, setTechnologies] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category_id: 1,
    image: '',
    live_url: '',
    status: true,
    featured: false,
    sort_order: 0,
    technology_ids: [] as number[],
  })

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    try {
      const [projData, catData, techData] = await Promise.all([
        getProjects(),
        getCategories(),
        getTechnologies(),
      ])
      setProjects(projData || [])
      setCategories(catData || [])
      setTechnologies(techData || [])
    } catch (e) {
      setError('Failed to load data')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
      if (editingId) {
        await updateProject(editingId, formData)
        setSuccess('Project updated successfully')
      } else {
        await createProject(formData)
        setSuccess('Project created successfully')
      }
      resetForm()
      await loadData()
    } catch (e: any) {
      setError(e.message || 'Failed to save project')
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Are you sure?')) return
    try {
      await deleteProject(id)
      setSuccess('Project deleted')
      await loadData()
    } catch (e: any) {
      setError(e.message)
    }
  }

  function resetForm() {
    setEditingId(null)
    setShowForm(false)
    setFormData({
      title: '',
      description: '',
      category_id: 1,
      image: '',
      live_url: '',
      status: true,
      featured: false,
      sort_order: 0,
      technology_ids: [],
    })
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link href="/admin/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <h1 className="text-3xl font-bold">Projects</h1>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500 p-3 rounded mb-4 text-red-700">{error}</div>}
        {success && <div className="bg-green-500/10 border border-green-500 p-3 rounded mb-4 text-green-700">{success}</div>}

        {showForm && (
          <div className="bg-card border rounded-lg p-6 mb-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label>Description</Label>
                <textarea
                  className="w-full px-3 py-2 border rounded-md bg-background"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Category</Label>
                  <select
                    className="w-full px-3 py-2 border rounded-md bg-background"
                    value={formData.category_id}
                    onChange={(e) => setFormData({ ...formData, category_id: parseInt(e.target.value) })}
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label>Image</Label>
                  <Input
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label>Project URL</Label>
                <Input
                  value={formData.live_url}
                  onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Technologies</Label>
                <div className="grid grid-cols-2 gap-2">
                  {technologies.map((tech) => (
                    <label key={tech.id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.technology_ids.includes(tech.id)}
                        onChange={(e) => {
                          const ids = formData.technology_ids
                          if (e.target.checked) {
                            ids.push(tech.id)
                          } else {
                            ids.splice(ids.indexOf(tech.id), 1)
                          }
                          setFormData({ ...formData, technology_ids: [...ids] })
                        }}
                      />
                      <span>{tech.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  />
                  Featured
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.checked })}
                  />
                  Active
                </label>
              </div>

              <div className="flex gap-2">
                <Button type="submit">Save</Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-card border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted border-b">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Title</th>
                <th className="px-4 py-3 text-left font-semibold">Category</th>
                <th className="px-4 py-3 text-left font-semibold">Featured</th>
                <th className="px-4 py-3 text-left font-semibold">Status</th>
                <th className="px-4 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b hover:bg-muted/30">
                  <td className="px-4 py-3">{project.title}</td>
                  <td className="px-4 py-3">{project.category_name || 'N/A'}</td>
                  <td className="px-4 py-3">{project.featured ? '✓' : '-'}</td>
                  <td className="px-4 py-3">{project.status ? 'Active' : 'Inactive'}</td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setEditingId(project.id)
                        setFormData({
                          title: project.title,
                          description: project.description,
                          category_id: project.category_id,
                          image: project.image,
                          live_url: project.live_url,
                          status: project.status,
                          featured: project.featured,
                          sort_order: project.sort_order,
                          technology_ids: project.technology_ids || [],
                        })
                        setShowForm(true)
                      }}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(project.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
