import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'
import crypto from 'crypto'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set')
}

const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000 // 7 days
const SESSION_TOKEN_LENGTH = 32

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash)
}

export function generateSessionToken(): string {
  return crypto.randomBytes(SESSION_TOKEN_LENGTH).toString('hex')
}

export async function createAdminSession(adminId: number): Promise<string> {
  const token = generateSessionToken()
  const expiresAt = new Date(Date.now() + SESSION_DURATION)

  await db.query`
    INSERT INTO admin_sessions (admin_id, token, expires_at)
    VALUES (${adminId}, ${token}, ${expiresAt})
  `

  return token
}

export async function getAdminFromSession(): Promise<{ id: number; email: string } | null> {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get('admin_session')?.value

    if (!token) {
      return null
    }

    const rows = await db.query`
      SELECT a.id, a.email
      FROM admins a
      JOIN admin_sessions s ON a.id = s.admin_id
      WHERE s.token = ${token}
      AND s.expires_at > NOW()
      LIMIT 1
    `

    if (rows.length === 0) {
      return null
    }

    return {
      id: rows[0].id as number,
      email: rows[0].email as string,
    }
  } catch (error) {
    console.error('[v0] Error getting admin from session:', error)
    return null
  }
}

export async function logout(): Promise<void> {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get('admin_session')?.value

    if (token) {
      await db.query`
        DELETE FROM admin_sessions
        WHERE token = ${token}
      `
    }

    cookieStore.delete('admin_session')
  } catch (error) {
    console.error('[v0] Error during logout:', error)
    throw error
  }
}

export async function setSessionCookie(token: string): Promise<void> {
  try {
    const cookieStore = cookies()
    cookieStore.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: SESSION_DURATION / 1000,
      path: '/',
    })
  } catch (error) {
    console.error('[v0] Error setting session cookie:', error)
    throw error
  }
}
