'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getProjectCategories, createProjectCategory, updateProjectCategory, deleteProjectCategory } from '@/app/actions/cms'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Trash2, Edit2 } from 'lucide-react'

interface Category {
  id: number
  name: string
  slug: string
  description: string | null
  order: number
  enabled: boolean
  created_at: string
  updated_at: string
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    order: 0,
  })

  useEffect(() => {
    loadCategories()
  }, [])

  async function loadCategories() {
    try {
      const data = await getProjectCategories()
      setCategories(data)
    } catch (error) {
      console.error('Error loading categories:', error)
      setError('Failed to load categories')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!formData.name.trim()) {
      setError('Category name is required')
      return
    }

    try {
      setIsSaving(true)
      if (editingId) {
        const result = await updateProjectCategory(editingId, {
          name: formData.name,
          description: formData.description || null,
          order: formData.order,
        })
        if ((result as any)?.error) {
          setError((result as any).error)
        } else {
          setSuccess('Category updated successfully!')
          await loadCategories()
          setEditingId(null)
          resetForm()
        }
      } else {
        const result = await createProjectCategory({
          name: formData.name,
          description: formData.description || null,
          order: formData.order,
        })
        if ((result as any)?.error) {
          setError((result as any).error)
        } else {
          setSuccess('Category created successfully!')
          await loadCategories()
          resetForm()
        }
      }
    } catch (error) {
      console.error('Error saving category:', error)
      setError('Failed to save category')
    } finally {
      setIsSaving(false)
    }
  }

  function resetForm() {
    setFormData({ name: '', description: '', order: 0 })
    setIsCreating(false)
  }

  async function handleEdit(category: Category) {
    setEditingId(category.id)
    setFormData({
      name: category.name,
      description: category.description || '',
      order: category.order,
    })
    setIsCreating(true)
  }

  async function handleDelete(id: number) {
    if (!window.confirm('Are you sure you want to delete this category?')) return

    setError('')
    setSuccess('')

    try {
      const result = await deleteProjectCategory(id)
      if ((result as any)?.error) {
        setError((result as any).error)
      } else {
        setSuccess('Category deleted successfully!')
        await loadCategories()
      }
    } catch (error) {
      console.error('Error deleting category:', error)
      setError('Failed to delete category')
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
          <h1 className="text-4xl font-bold text-white">Project Categories</h1>
          <p className="text-slate-400 mt-2">Manage project categories</p>
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
              {editingId ? 'Edit Category' : 'Create New Category'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-white">
                  Category Name *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white mt-2"
                  placeholder="e.g., Web Development"
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-white">
                  Description
                </Label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="bg-slate-700 border border-slate-600 text-white mt-2 rounded px-3 py-2 w-full"
                  placeholder="Optional description..."
                  rows={3}
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
                  {editingId ? 'Update Category' : 'Create Category'}
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
            Add New Category
          </Button>
        )}

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-slate-400">Loading categories...</p>
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-400">No categories found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-slate-800 border border-slate-700 rounded-lg p-6 flex items-center justify-between hover:bg-slate-750 transition-colors"
              >
                <div className="flex-1">
                  <h3 className="text-white font-semibold">{category.name}</h3>
                  {category.description && (
                    <p className="text-slate-400 text-sm mt-1">{category.description}</p>
                  )}
                  <p className="text-slate-500 text-xs mt-2">Order: {category.order}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleEdit(category)}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Edit2 size={16} />
                  </Button>
                  <Button
                    onClick={() => handleDelete(category.id)}
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
