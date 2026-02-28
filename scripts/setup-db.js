import { execSync } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

console.log('[v0] Starting database setup...')

try {
  console.log('[v0] Generating Prisma client...')
  execSync('npx prisma generate', { stdio: 'inherit', cwd: path.join(__dirname, '..') })
  
  console.log('[v0] Pushing schema to database...')
  execSync('npx prisma db push --skip-generate', { stdio: 'inherit', cwd: path.join(__dirname, '..') })
  
  console.log('[v0] Database setup completed successfully')
} catch (error) {
  console.error('[v0] Database setup failed:', error.message)
  process.exit(1)
}
