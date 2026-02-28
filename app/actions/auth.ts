'use server'

import { sql } from '@neondatabase/serverless'
import { hashPassword, verifyPassword, createAdminSession, setSessionCookie } from '@/lib/auth'
import { redirect } from 'next/navigation'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set')
}

export async function loginAdmin(email: string, password: string) {
  try {
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
    console.error('Login error:', error)
    return { error: 'An error occurred during login' }
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
    // Check if admin already exists
    const existing = await sql`
      SELECT id FROM admins WHERE email = ${email} LIMIT 1
    `

    if (existing.rows.length > 0) {
      return { error: 'Admin already exists' }
    }

    // Hash password and create admin
    const passwordHash = await hashPassword(password)

    const result = await sql`
      INSERT INTO admins (email, password_hash)
      VALUES (${email}, ${passwordHash})
      RETURNING id
    `

    return { success: true, adminId: result.rows[0].id }
  } catch (error) {
    console.error('Initialize admin error:', error)
    return { error: 'An error occurred while creating admin account' }
  }
}
