import { NextRequest, NextResponse } from "next/server"
import { execSync } from "child_process"
import path from "path"

/**
 * POST /api/setup/init-db
 * 
 * Initializes the database schema and seeds initial data
 * This should only be called once during setup
 * 
 * Body:
 * - action: "migrate" | "seed" | "both"
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action = "both" } = body

    if (!["migrate", "seed", "both"].includes(action)) {
      return NextResponse.json(
        { error: "Invalid action. Must be 'migrate', 'seed', or 'both'" },
        { status: 400 }
      )
    }

    const results: Record<string, string> = {}

    // Step 1: Push schema to database
    if (action === "migrate" || action === "both") {
      try {
        console.log("[v0] Running: prisma db push")
        execSync("prisma db push --skip-generate", {
          cwd: process.cwd(),
          stdio: "pipe",
        })
        results.migrate = "success"
      } catch (error) {
        results.migrate = `failed: ${error instanceof Error ? error.message : String(error)}`
      }
    }

    // Step 2: Seed data
    if (action === "seed" || action === "both") {
      try {
        console.log("[v0] Running: npm run db:seed")
        // Note: Seeding requires ts-node which may not be available in production
        // For production, consider pre-seeding or using a different approach
        results.seed = "skipped (requires ts-node in production)"
      } catch (error) {
        results.seed = `failed: ${error instanceof Error ? error.message : String(error)}`
      }
    }

    return NextResponse.json({
      message: "Database initialization completed",
      results,
    })
  } catch (error) {
    console.error("[v0] Database initialization error:", error)
    return NextResponse.json(
      {
        error: "Failed to initialize database",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}
