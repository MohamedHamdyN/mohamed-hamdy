'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createAdmin, getAdminsCount } from '@/app/actions/cms'
import bcrypt from 'bcryptjs'

export default function AdminSetupPage() {
  const router = useRouter()
  const [step, setStep] = useState<'check' | 'create'>('check')
  const [adminsCount, setAdminsCount] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })

  // Check admin status on mount
  async function checkAdmins() {
    try {
      const count = await getAdminsCount()
      setAdminsCount(count)
      setStep(count === 0 ? 'create' : 'check')
    } catch (err) {
      console.error('Error checking admins:', err)
      setError('فشل التحقق من حالة المسؤولين')
    } finally {
      setIsLoading(false)
    }
  }

  // Call check on mount
  if (isLoading) {
    checkAdmins()
  }

  async function handleCreateAdmin(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!formData.email || !formData.password) {
      setError('البريد الإلكتروني وكلمة المرور مطلوبان')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('كلمة المرور غير متطابقة')
      return
    }

    if (formData.password.length < 8) {
      setError('كلمة المرور يجب أن تكون 8 أحرف على الأقل')
      return
    }

    try {
      setIsSubmitting(true)

      // Hash password
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(formData.password, salt)

      // Create admin
      const result = await createAdmin(formData.email, hashedPassword)

      if (result.error) {
        setError(result.error)
        return
      }

      // Redirect to login
      router.push('/admin/login')
    } catch (err) {
      console.error('Error creating admin:', err)
      setError('فشل إنشاء حساب المسؤول')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-muted-foreground">جاري التحقق...</p>
        </div>
      </div>
    )
  }

  if (step === 'check') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-full max-w-md p-8 bg-card border rounded-lg">
          <h1 className="text-3xl font-bold mb-6">حالة النظام</h1>

          {adminsCount && adminsCount > 0 ? (
            <div className="space-y-4">
              <div className="p-4 bg-green-500/10 border border-green-500 text-green-600 rounded-lg">
                <p className="font-semibold">النظام معد!</p>
                <p className="text-sm mt-1">
                  يوجد بالفعل {adminsCount} مسؤول في النظام
                </p>
              </div>
              <Button onClick={() => router.push('/admin/login')} className="w-full">
                الذهاب لتسجيل الدخول
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-blue-500/10 border border-blue-500 text-blue-600 rounded-lg">
                <p className="font-semibold">لا توجد حسابات مسؤول</p>
                <p className="text-sm mt-1">
                  قم بإنشاء حساب المسؤول الأول للبدء
                </p>
              </div>
              <Button onClick={() => setStep('create')} className="w-full">
                إنشاء حساب مسؤول
              </Button>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="bg-card border rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-2">إنشاء حساب مسؤول</h1>
          <p className="text-muted-foreground mb-6">
            إنشاء حساب المسؤول الأول للموقع
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleCreateAdmin} className="space-y-4">
            <div>
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                disabled={isSubmitting}
              />
            </div>

            <div>
              <Label htmlFor="password">كلمة المرور</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                disabled={isSubmitting}
              />
              <p className="text-xs text-muted-foreground mt-1">
                يجب أن تكون 8 أحرف على الأقل
              </p>
            </div>

            <div>
              <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                disabled={isSubmitting}
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? 'جاري الإنشاء...' : 'إنشاء حساب'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
