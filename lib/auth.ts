import { sql } from '@neondatabase/serverless'
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

  await sql`
    INSERT INTO admin_sessions (admin_id, token, expires_at)
    VALUES (${adminId}, ${token}, ${expiresAt})
  `

  return token
}

export async function getAdminFromSession(): Promise<{ id: number; email: string } | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('admin_session')?.value

    if (!token) {
      return null
    }

    const result = await sql`
      SELECT a.id, a.email
      FROM admins a
      JOIN admin_sessions s ON a.id = s.admin_id
      WHERE s.token = ${token}
      AND s.expires_at > NOW()
      LIMIT 1
    `

    if (result.rows.length === 0) {
      return null
    }

    return {
      id: result.rows[0].id as number,
      email: result.rows[0].email as string,
    }
  } catch (error) {
    console.error('Error getting admin from session:', error)
    return null
  }
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_session')?.value

  if (token) {
    await sql`
      DELETE FROM admin_sessions
      WHERE token = ${token}
    `
  }

  cookieStore.delete('admin_session')
}

export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set('admin_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION / 1000,
  })
}
