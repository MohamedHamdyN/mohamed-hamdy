'use server'

import { db } from '@/lib/db'
import { hashPassword, verifyPassword, createAdminSession, setSessionCookie } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { getAdminFromSession } from '@/lib/auth'

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
    const rows = await db.query`
      SELECT id, password_hash FROM admins WHERE email = ${email}
      LIMIT 1
    `

    if (rows.length === 0) {
      return { error: 'Invalid email or password' }
    }

    const admin = rows[0] as { id: number; password_hash: string }

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
export async function getAdminsCount() {
  try {
    const rows = await db.query`SELECT COUNT(*)::int AS count FROM admins`
    const count = (rows?.[0] as any)?.count ?? 0
    return { count }
  } catch (error) {
    console.error('[v0] getAdminsCount error:', error)
    return { error: 'Failed to get admins count' }
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
    const existing = await db.query`
      SELECT id FROM admins WHERE email = ${email} LIMIT 1
    `

    if (existing.length > 0) {
      console.log('[v0] Admin already exists')
      return { error: 'Admin account already exists' }
    }

    // Hash password and create admin
    console.log('[v0] Hashing password and creating admin account')
    const passwordHash = await hashPassword(password)

    const result = await db.query`
      INSERT INTO admins (email, password_hash)
      VALUES (${email}, ${passwordHash})
      RETURNING id
    `

    if (!result || result.length === 0) {
      console.log('[v0] Failed to create admin - no rows returned')
      return { error: 'Failed to create admin account' }
    }

    console.log('[v0] Admin created successfully with ID:', (result[0] as any).id)
    return { success: true, adminId: (result[0] as any).id }
  } catch (error) {
    console.error('[v0] Initialize admin error:', error)
    const errorMessage = error instanceof Error ? error.message : 'An error occurred while creating admin account'
    return { error: errorMessage }
  }
}

export async function updateCurrentAdminCredentials(input: {
  oldPassword: string
  newEmail?: string
  newPassword?: string
}) {
  try {
    const admin = await getAdminFromSession()
    if (!admin) return { error: 'Unauthorized' }

    const oldPassword = String(input.oldPassword || '')
    const newEmail = (input.newEmail ?? '').trim().toLowerCase()
    const newPassword = String(input.newPassword || '')

    if (!oldPassword) return { error: 'Old password is required' }
    if (!newEmail && !newPassword) return { error: 'Provide a new email or a new password' }
    if (newPassword && newPassword.length < 8) return { error: 'New password must be at least 8 characters' }

    // load current admin hash
    const rows = await db.query`
      SELECT id, email, password_hash
      FROM admins
      WHERE id = ${admin.id}
      LIMIT 1
    `
    if (rows.length === 0) return { error: 'Admin not found' }

    const current = rows[0] as { id: number; email: string; password_hash: string }

    // verify old password
    const ok = await verifyPassword(oldPassword, current.password_hash)
    if (!ok) return { error: 'Old password is incorrect' }

    // email uniqueness
    if (newEmail && newEmail !== current.email) {
      const exists = await db.query`
        SELECT id FROM admins WHERE email = ${newEmail} LIMIT 1
      `
      if (exists.length > 0) return { error: 'Email already in use' }
    }

    const nextEmail = newEmail ? newEmail : current.email
    const nextHash = newPassword ? await hashPassword(newPassword) : current.password_hash

    await db.query`
      UPDATE admins
      SET email = ${nextEmail}, password_hash = ${nextHash}
      WHERE id = ${current.id}
    `

    return { success: true }
  } catch (e) {
    console.error('updateCurrentAdminCredentials error:', e)
    return { error: e instanceof Error ? e.message : 'Failed to update admin credentials' }
  }
}
