'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { getCategories, createCategory, updateCategory, deleteCategory, getColors } from '@/app/actions/cms'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Trash2, Edit2, Plus } from 'lucide-react'

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([])
  const [colors, setColors] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    sort_order: 0,
    color_id: 1,
    status: true,
  })

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    try {
      const [categoriesData, colorsData] = await Promise.all([
        getCategories(),
        getColors(),
      ])
      setCategories(categoriesData || [])
      setColors(colorsData || [])
    } catch (err) {
      console.error('Error loading data:', err)
      setError('Failed to load categories')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!formData.name.trim()) {
      setError('Category name is required')
      return
    }

    try {
      setIsSaving(true)
      if (editingId) {
        await updateCategory(editingId, formData)
      } else {
        await createCategory(formData)
      }
      setFormData({ name: '', slug: '', description: '', sort_order: 0, color_id: 1, status: true })
      setEditingId(null)
      setShowForm(false)
      await loadData()
    } catch (err) {
      console.error('Error saving category:', err)
      setError('Error saving category')
    } finally {
      setIsSaving(false)
    }
  }

  function handleEdit(category: any) {
    setEditingId(category.id)
    setFormData({
      name: category.name,
      slug: category.slug || '',
      description: category.description || '',
      sort_order: category.sort_order || 0,
      color_id: category.color_id || 1,
      status: category.status !== false,
    })
    setShowForm(true)
  }

  async function handleDelete(id: number) {
    if (!window.confirm('Delete this category?')) return
    setError('')
    try {
      await deleteCategory(id)
      await loadData()
    } catch (err) {
      console.error('Error deleting category:', err)
      setError('Error deleting category')
    }
  }

  if (isLoading) {
    return <div className="p-8 text-center">Loading categories...</div>
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Categories</h1>
        <p className="text-muted-foreground">Manage project categories</p>
      </div>

      {error && <div className="p-4 bg-red-500/10 border border-red-500 text-red-600 rounded-lg">{error}</div>}

      {showForm && (
        <div className="bg-card border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">{editingId ? 'Edit Category' : 'Add Category'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Category name"
              />
            </div>
            <div>
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="category-name"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Category description"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="sort_order">Sort Order</Label>
                <Input
                  id="sort_order"
                  type="number"
                  value={formData.sort_order}
                  onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div>
                <Label htmlFor="color_id">Color</Label>
                <select
                  id="color_id"
                  value={formData.color_id}
                  onChange={(e) => setFormData({ ...formData, color_id: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-md bg-background"
                >
                  {colors.map((color) => (
                    <option key={color.id} value={color.id}>
                      {color.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-2">
              <Button type="submit" disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setEditingId(null)
                  setShowForm(false)
                  setFormData({ name: '', slug: '', description: '', sort_order: 0, color_id: 1, status: true })
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {!showForm && (
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      )}

      <div className="bg-card border rounded-lg overflow-hidden">
        {categories.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">No categories found</div>
        ) : (
          <table className="w-full">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="text-left p-4 font-medium">Name</th>
                <th className="text-left p-4 font-medium">Slug</th>
                <th className="text-left p-4 font-medium">Sort Order</th>
                <th className="text-left p-4 font-medium">Status</th>
                <th className="text-right p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id} className="border-b hover:bg-muted/30">
                  <td className="p-4">{category.name}</td>
                  <td className="p-4 text-muted-foreground">{category.slug}</td>
                  <td className="p-4">{category.sort_order}</td>
                  <td className="p-4">
                    <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-700">
                      {category.status ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="p-4 flex gap-2 justify-end">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(category)}>
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(category.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
