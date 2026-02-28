#!/usr/bin/env node

/**
 * Postinstall script to generate Prisma client
 * Runs automatically after npm/pnpm install
 */

const { execSync } = require("child_process")

try {
  console.log("[v0] Generating Prisma client...")
  execSync("npx prisma generate", { stdio: "inherit" })
  console.log("[v0] Prisma client generated successfully")
} catch (error) {
  console.error("[v0] Failed to generate Prisma client:", error.message)
  // Don't exit with error - let the build continue, it will fail at build time if really needed
}
