'use server'

import { sql } from '@neondatabase/serverless'
import { hashPassword, verifyPassword, createAdminSession, setSessionCookie } from '@/lib/auth'
import { redirect } from 'next/navigation'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set')
}

export async function loginAdmin(email: string, password: string) {
  try {
    // Validate input
    if (!email || !password) {
      return { error: 'Email and password are required' }
    }

    // Find admin by email
    const result = await sql`
      SELECT id, password_hash FROM admins WHERE email = ${email}
      LIMIT 1
    `

    if (result.rows.length === 0) {
      return { error: 'Invalid email or password' }
    }

    const admin = result.rows[0] as { id: number; password_hash: string }

    // Verify password
    const isValid = await verifyPassword(password, admin.password_hash)

    if (!isValid) {
      return { error: 'Invalid email or password' }
    }

    // Create session
    const token = await createAdminSession(admin.id)
    await setSessionCookie(token)

    return { success: true }
  } catch (error) {
    console.error('[v0] Login error:', error)
    const errorMessage = error instanceof Error ? error.message : 'An error occurred during login'
    return { error: errorMessage }
  }
}

export async function logoutAdmin() {
  try {
    const { logout } = await import('@/lib/auth')
    await logout()
    redirect('/admin/login')
  } catch (error) {
    console.error('Logout error:', error)
    return { error: 'An error occurred during logout' }
  }
}

export async function initializeAdmin(email: string, password: string) {
  try {
    console.log('[v0] Starting admin initialization for email:', email)
    
    // Validate input
    if (!email || !password) {
      return { error: 'Email and password are required' }
    }

    if (password.length < 8) {
      return { error: 'Password must be at least 8 characters long' }
    }

    // Check if admin already exists
    console.log('[v0] Checking if admin already exists')
    const existing = await sql`
      SELECT id FROM admins WHERE email = ${email} LIMIT 1
    `

    if (existing.rows.length > 0) {
      console.log('[v0] Admin already exists')
      return { error: 'Admin account already exists' }
    }

    // Hash password and create admin
    console.log('[v0] Hashing password and creating admin account')
    const passwordHash = await hashPassword(password)

    const result = await sql`
      INSERT INTO admins (email, password_hash)
      VALUES (${email}, ${passwordHash})
      RETURNING id
    `

    if (!result.rows || result.rows.length === 0) {
      console.log('[v0] Failed to create admin - no rows returned')
      return { error: 'Failed to create admin account' }
    }

    console.log('[v0] Admin created successfully with ID:', (result.rows[0] as any).id)
    return { success: true, adminId: (result.rows[0] as any).id }
  } catch (error) {
    console.error('[v0] Initialize admin error:', error)
    const errorMessage = error instanceof Error ? error.message : 'An error occurred while creating admin account'
    return { error: errorMessage }
  }
}
