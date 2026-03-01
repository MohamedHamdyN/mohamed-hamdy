'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getProjects, createProject, updateProject, deleteProject } from '@/app/actions/cms'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Project } from '@/lib/db'

const CATEGORIES = {
  1: 'Data Visualization',
  2: 'Machine Learning',
  3: 'Business Intelligence',
  4: 'Statistical Analysis',
  5: 'Data Engineering',
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    short_description: '',
    category_id: 1,
    image_url: '',
    project_url: '',
    linkedin_url: '',
    technologies: [] as string[],
    date: new Date().toISOString().split('T')[0],
    featured: false,
    draft: false,
  })

  const [techInput, setTechInput] = useState('')

  useEffect(() => {
    loadProjects()
  }, [])

  async function loadProjects() {
    try {
      const data = await getProjects(true) // Include drafts
      setProjects(data)
    } catch (error) {
      console.error('Error loading projects:', error)
      setError('Failed to load projects')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    try {
      if (editingId) {
        const result = await updateProject(editingId, formData)
        if (result.error) {
          setError(result.error)
        } else {
          await loadProjects()
          resetForm()
        }
      } else {
        const result = await createProject(formData)
        if (result.error) {
          setError(result.error)
        } else {
          await loadProjects()
          resetForm()
        }
      }
    } catch (error) {
      console.error('Error saving project:', error)
      setError('Failed to save project')
    }
  }

  function resetForm() {
    setEditingId(null)
    setIsCreating(false)
    setFormData({
      title: '',
      description: '',
      short_description: '',
      category_id: 1,
      image_url: '',
      project_url: '',
      linkedin_url: '',
      technologies: [],
      date: new Date().toISOString().split('T')[0],
      featured: false,
      draft: false,
    })
    setTechInput('')
  }

  async function handleEdit(project: Project) {
    setEditingId(project.id)
    setFormData({
      title: project.title,
      description: project.description,
      short_description: project.short_description,
      category_id: project.category_id,
      image_url: project.image_url,
      project_url: project.project_url || '',
      linkedin_url: project.linkedin_url || '',
      technologies: project.technologies || [],
      date: project.date,
      featured: project.featured,
      draft: project.draft,
    })
    setIsCreating(true)
  }

  async function handleDelete(id: number) {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        const result = await deleteProject(id)
        if (result.error) {
          setError(result.error)
        } else {
          await loadProjects()
        }
      } catch (error) {
        console.error('Error deleting project:', error)
        setError('Failed to delete project')
      }
    }
  }

  function addTechnology() {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, techInput.trim()],
      })
      setTechInput('')
    }
  }

  function removeTechnology(tech: string) {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((t) => t !== tech),
    })
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <header className="border-b border-slate-700 bg-slate-800/50">
        <div className="container mx-auto px-4 py-6">
          <Link href="/admin/dashboard" className="text-slate-400 hover:text-slate-200 mb-4 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-white">Manage Projects</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Create/Edit Form */}
        {isCreating && (
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-white mb-4">
              {editingId ? 'Edit Project' : 'Create New Project'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-500/10 border border-red-500 rounded-md p-3">
                  <p className="text-red-500 text-sm">{error}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title" className="text-slate-200">
                    Title
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="bg-slate-900 border-slate-600 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="category_id" className="text-slate-200">
                    Category
                  </Label>
                  <select
                    id="category_id"
                    value={formData.category_id}
                    onChange={(e) => setFormData({ ...formData, category_id: parseInt(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-600 text-white rounded-md p-2"
                  >
                    {Object.entries(CATEGORIES).map(([id, name]) => (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="short_description" className="text-slate-200">
                  Short Description
                </Label>
                <Input
                  id="short_description"
                  value={formData.short_description}
                  onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                  required
                  className="bg-slate-900 border-slate-600 text-white"
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-slate-200">
                  Description
                </Label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  className="w-full bg-slate-900 border border-slate-600 text-white rounded-md p-2"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="image_url" className="text-slate-200">
                    Image URL
                  </Label>
                  <Input
                    id="image_url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    type="url"
                    className="bg-slate-900 border-slate-600 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="date" className="text-slate-200">
                    Date
                  </Label>
                  <Input
                    id="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    type="date"
                    className="bg-slate-900 border-slate-600 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="project_url" className="text-slate-200">
                    Project URL
                  </Label>
                  <Input
                    id="project_url"
                    value={formData.project_url}
                    onChange={(e) => setFormData({ ...formData, project_url: e.target.value })}
                    type="url"
                    className="bg-slate-900 border-slate-600 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="linkedin_url" className="text-slate-200">
                    LinkedIn URL
                  </Label>
                  <Input
                    id="linkedin_url"
                    value={formData.linkedin_url}
                    onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                    type="url"
                    className="bg-slate-900 border-slate-600 text-white"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="technologies" className="text-slate-200">
                  Technologies
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="technologies"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        addTechnology()
                      }
                    }}
                    placeholder="Add technology and press Enter"
                    className="bg-slate-900 border-slate-600 text-white"
                  />
                  <Button type="button" onClick={addTechnology} className="bg-blue-600 hover:bg-blue-700">
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-slate-700 text-slate-200 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => removeTechnology(tech)}
                        className="hover:text-red-400"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 text-slate-200">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  />
                  Featured
                </label>
                <label className="flex items-center gap-2 text-slate-200">
                  <input
                    type="checkbox"
                    checked={formData.draft}
                    onChange={(e) => setFormData({ ...formData, draft: e.target.checked })}
                  />
                  Draft
                </label>
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  {editingId ? 'Update Project' : 'Create Project'}
                </Button>
                <Button type="button" onClick={resetForm} variant="outline" className="border-slate-600 text-slate-200">
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Projects List */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
          <div className="p-6 border-b border-slate-700 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Projects ({projects.length})</h2>
            {!isCreating && (
              <Button onClick={() => setIsCreating(true)} className="bg-green-600 hover:bg-green-700">
                + Add Project
              </Button>
            )}
          </div>

          {isLoading ? (
            <div className="p-6 text-center text-slate-400">Loading...</div>
          ) : projects.length === 0 ? (
            <div className="p-6 text-center text-slate-400">No projects found. Create your first project!</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-200">Title</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-200">Category</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-200">Featured</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-200">Draft</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-slate-200">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {projects.map((project) => (
                    <tr key={project.id} className="hover:bg-slate-700/50">
                      <td className="px-6 py-3 text-sm text-slate-300">{project.title}</td>
                      <td className="px-6 py-3 text-sm text-slate-300">
                        {CATEGORIES[project.category_id as keyof typeof CATEGORIES]}
                      </td>
                      <td className="px-6 py-3 text-sm">
                        <span className={project.featured ? 'text-green-400' : 'text-slate-400'}>
                          {project.featured ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-sm">
                        <span className={project.draft ? 'text-orange-400' : 'text-slate-400'}>
                          {project.draft ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-right text-sm space-x-2">
                        <button
                          onClick={() => handleEdit(project)}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(project.id)}
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
