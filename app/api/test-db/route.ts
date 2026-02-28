import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@neondatabase/serverless'

export async function GET(request: NextRequest) {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        { error: 'DATABASE_URL is not configured' },
        { status: 500 }
      )
    }

    // Test basic connection
    const result = await sql`SELECT 1 as connected`
    
    // Check admins table
    const adminsResult = await sql`SELECT COUNT(*) as count FROM admins`
    
    return NextResponse.json({
      success: true,
      database: 'Connected',
      adminCount: (adminsResult.rows[0] as any).count,
    })
  } catch (error) {
    console.error('[v0] Database test error:', error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Database connection failed',
      },
      { status: 500 }
    )
  }
}
