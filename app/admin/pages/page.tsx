'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { getPageStatus, updatePageStatus } from '@/app/actions/cms'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

export default function AdminPagesPage() {
  const [pages, setPages] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    loadPages()
  }, [])

  async function loadPages() {
    try {
      const data = await getPageStatus()
      setPages(data || [])
    } catch (err) {
      console.error('Error loading pages:', err)
      setError('فشل في تحميل البيانات')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleToggle(id: number, currentStatus: boolean) {
    setError('')
    setSuccess('')

    try {
      setIsSaving(true)
      await updatePageStatus(id, { status: !currentStatus })
      await loadPages()
      setSuccess('تم تحديث حالة الصفحة بنجاح')
    } catch (err) {
      console.error('Error updating page status:', err)
      setError('خطأ في تحديث حالة الصفحة')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">حالة الصفحات</h1>
        <p className="text-muted-foreground">إدارة ظهور وإخفاء الصفحات والأقسام</p>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-500/10 border border-green-500 text-green-600 rounded-lg">
          {success}
        </div>
      )}

      {isLoading ? (
        <div className="p-8 text-center text-muted-foreground">جاري التحميل...</div>
      ) : pages.length === 0 ? (
        <div className="p-8 text-center text-muted-foreground">لا توجد صفحات</div>
      ) : (
        <div className="bg-card border rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
            {pages.map((page) => (
              <div key={page.id} className="border rounded-lg p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{page.name}</h3>
                  <p className="text-sm text-muted-foreground">{page.key}</p>
                </div>
                <Button
                  variant={page.status ? 'default' : 'outline'}
                  onClick={() => handleToggle(page.id, page.status)}
                  disabled={isSaving}
                  className="ml-4"
                >
                  {page.status ? 'مفعل' : 'معطل'}
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
