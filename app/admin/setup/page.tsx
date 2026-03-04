'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { initializeAdmin, loginAdmin, getAdminsCount } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AlertCircle } from 'lucide-react'

export default function AdminSetupPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [dbConnected, setDbConnected] = useState<boolean | null>(null)

  // ✅ NEW
  const [adminsCount, setAdminsCount] = useState<number | null>(null)
  const limitReached = (adminsCount ?? 0) >= 2

  useEffect(() => {
    async function boot() {
      // check db
      try {
        const response = await fetch('/api/test-db')
        const data = await response.json()
        setDbConnected(response.ok)
        if (!response.ok) console.error('[v0] Database error:', data?.error)
      } catch {
        setDbConnected(false)
      }

      // get admins count
      try {
        const res = await getAdminsCount()
        if ('error' in res && res.error) {
          console.error(res.error)
          setAdminsCount(null)
        } else {
          setAdminsCount(res.count)
        }
      } catch (e) {
        console.error('[v0] getAdminsCount failed:', e)
        setAdminsCount(null)
      }
    }

    boot()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // ✅ UI Guard
    if (limitReached) {
      setError('Admin limit reached (max 2 admins).')
      setIsLoading(false)
      return
    }

    if (!email.trim()) return setIsLoading(false), setError('Email is required')
    if (!email.includes('@')) return setIsLoading(false), setError('Please enter a valid email address')
    if (password.length < 8) return setIsLoading(false), setError('Password must be at least 8 characters long')
    if (password !== confirmPassword) return setIsLoading(false), setError('Passwords do not match')

    try {
      const initResult = await initializeAdmin(email, password)
      if (initResult.error) return setError(initResult.error)

      const loginResult = await loginAdmin(email, password)
      if (loginResult.error) setError(loginResult.error)
      else router.push('/admin/dashboard')
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'An unexpected error occurred'
      setError(msg)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-white mb-2 text-center">Create Admin Account</h1>
          <p className="text-slate-400 text-center mb-6">
            {adminsCount === null ? 'Checking admins...' : `Admins: ${adminsCount}/2`}
          </p>

          {dbConnected === false && (
            <div className="bg-red-500/10 border border-red-500 rounded-md p-3 mb-6 flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-500 font-semibold text-sm">Database Connection Error</p>
                <p className="text-red-400 text-sm">Unable to connect to the database. Please ensure DATABASE_URL is set.</p>
              </div>
            </div>
          )}

          {limitReached && (
            <div className="bg-yellow-500/10 border border-yellow-500 rounded-md p-3 mb-6 flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-yellow-400 font-semibold text-sm">Admin Limit Reached</p>
                <p className="text-yellow-300 text-sm">You already have 2 admins. You can’t create more from setup.</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-200">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={limitReached}
                className="bg-slate-900 border-slate-600 text-white placeholder-slate-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-200">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={limitReached}
                className="bg-slate-900 border-slate-600 text-white placeholder-slate-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-slate-200">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={limitReached}
                className="bg-slate-900 border-slate-600 text-white placeholder-slate-500"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500 rounded-md p-3">
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading || dbConnected === false || limitReached || adminsCount === null}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating Account...' : 'Create Admin Account'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}