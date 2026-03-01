'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { initializeAdmin, loginAdmin } from '@/app/actions/auth'
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

  useEffect(() => {
    // Check database connection on mount
    async function checkDb() {
      try {
        console.log('[v0] Checking database connection')
        const response = await fetch('/api/test-db')
        const data = await response.json()
        
        if (response.ok) {
          console.log('[v0] Database connected:', data)
          setDbConnected(true)
        } else {
          console.error('[v0] Database error:', data.error)
          setDbConnected(false)
        }
      } catch (err) {
        console.error('[v0] Database connection check failed:', err)
        setDbConnected(false)
      }
    }
    
    checkDb()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Validation
    if (!email.trim()) {
      setError('Email is required')
      setIsLoading(false)
      return
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address')
      setIsLoading(false)
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long')
      setIsLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    try {
      console.log('[v0] Starting admin setup process')
      
      // First try to initialize the admin account
      console.log('[v0] Calling initializeAdmin')
      const initResult = await initializeAdmin(email, password)

      console.log('[v0] initializeAdmin result:', initResult)
      
      if (initResult.error) {
        console.error('[v0] Init error:', initResult.error)
        setError(initResult.error)
        return
      }
      
      if (!initResult.success) {
        console.error('[v0] Init did not succeed')
        setError('Failed to create admin account')
        return
      }

      console.log('[v0] Admin created successfully, attempting login')
      
      // Then log them in
      const loginResult = await loginAdmin(email, password)

      console.log('[v0] loginAdmin result:', loginResult)
      
      if (loginResult.error) {
        console.error('[v0] Login error:', loginResult.error)
        setError(loginResult.error)
      } else if (loginResult.success) {
        console.log('[v0] Login successful, redirecting to dashboard')
        router.push('/admin/dashboard')
      }
    } catch (err) {
      console.error('[v0] Setup error:', err)
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-white mb-2 text-center">Create Admin Account</h1>
          <p className="text-slate-400 text-center mb-8">Set up your first admin account to manage the portfolio</p>

          {dbConnected === false && (
            <div className="bg-red-500/10 border border-red-500 rounded-md p-3 mb-6 flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-500 font-semibold text-sm">Database Connection Error</p>
                <p className="text-red-400 text-sm">Unable to connect to the database. Please ensure DATABASE_URL is set.</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-200">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-slate-900 border-slate-600 text-white placeholder-slate-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-200">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-slate-900 border-slate-600 text-white placeholder-slate-500"
              />
              <p className={`text-sm ${password.length < 8 ? 'text-yellow-500' : 'text-green-500'}`}>
                {password.length < 8 ? `${8 - password.length} more characters needed` : 'Password is strong'}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-slate-200">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="bg-slate-900 border-slate-600 text-white placeholder-slate-500"
              />
              {confirmPassword && (
                <p className={`text-sm ${password === confirmPassword ? 'text-green-500' : 'text-red-500'}`}>
                  {password === confirmPassword ? 'Passwords match' : 'Passwords do not match'}
                </p>
              )}
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500 rounded-md p-3">
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading || dbConnected === false}
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
