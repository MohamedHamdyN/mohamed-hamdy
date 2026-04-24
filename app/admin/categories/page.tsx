'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Trash2, Edit2 } from 'lucide-react'
import { createCategory, updateCategory, deleteCategory, getCategories } from '@/app/actions/cms'

interface Category {
  id: number
  name: string
  slug: string
  description?: string
  sort_order?: number
  color_id?: number
  status?: boolean
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingId, setEditingId] = useState<number | null>(null)
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
    loadCategories()
  }, [])

  async function loadCategories() {
    try {
      const data = await getCategories()
      setCategories(data || [])
    } catch (err) {
      console.error('Error loading categories:', err)
      setError('خطأ في تحميل الفئات')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!formData.name.trim()) {
      setError('اسم الفئة مطلوب')
      return
    }

    try {
      setIsSaving(true)
      if (editingId) {
        await updateCategory(editingId, formData)
      } else {
        await createCategory(formData)
      }
      setFormData({ name: '', slug: '', description: '', sort_order: 0 })
      setEditingId(null)
      await loadCategories()
    } catch (err) {
      console.error('Error saving category:', err)
      setError('خطأ في حفظ الفئة')
    } finally {
      setIsSaving(false)
    }
  }

  function handleEdit(category: Category) {
    setEditingId(category.id)
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || '',
      sort_order: category.sort_order || 0,
      color_id: category.color_id || 1,
      status: category.status !== false,
    })
  }

  async function handleDelete(id: number) {
    if (!window.confirm('هل أنت متأكد من حذف هذه الفئة؟')) return

    setError('')
    try {
      await deleteCategory(id)
      await loadCategories()
    } catch (err) {
      console.error('Error deleting category:', err)
      setError('خطأ في حذف الفئة')
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">فئات المشاريع</h1>
        <p className="text-muted-foreground">إدارة فئات المشاريع</p>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-card border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? 'تعديل فئة' : 'إضافة فئة جديدة'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">اسم الفئة</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="مثال: تطوير ويب"
            />
          </div>
          <div>
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="web-development"
            />
          </div>
          <div>
            <Label htmlFor="description">الوصف</Label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="وصف الفئة"
              className="w-full px-3 py-2 border rounded-md bg-background text-foreground"
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="sort_order">ترتيب العرض</Label>
            <Input
              id="sort_order"
              type="number"
              value={formData.sort_order}
              onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit" disabled={isSaving}>
              {editingId ? 'تحديث' : 'إضافة'}
            </Button>
            {editingId && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setEditingId(null)
      setFormData({ name: '', slug: '', description: '', sort_order: 0, color_id: 1, status: true })
                }}
              >
                إلغاء
              </Button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-card border rounded-lg">
        {isLoading ? (
          <div className="p-8 text-center text-muted-foreground">جاري التحميل...</div>
        ) : categories.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">لا توجد فئات</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="text-left p-4">الفئة</th>
                  <th className="text-left p-4">Slug</th>
                  <th className="text-left p-4">الترتيب</th>
                  <th className="text-left p-4">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id} className="border-b hover:bg-muted/30">
                    <td className="p-4 font-medium">{category.name}</td>
                    <td className="p-4 text-muted-foreground">{category.slug}</td>
                    <td className="p-4">{category.sort_order}</td>
                    <td className="p-4 flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(category)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(category.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
