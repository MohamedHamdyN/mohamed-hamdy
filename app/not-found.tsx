import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, FileQuestion } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
            <div className="relative bg-card border border-border rounded-full p-6">
              <FileQuestion className="h-16 w-16 text-primary" />
            </div>
          </div>
        </div>

        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          404
        </h1>

        <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>

        <p className="text-muted-foreground mb-8">The page you are looking for does not exist or has been moved.</p>

        <Link href="/">
          <Button className="gap-2">
            <Home className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  )
}
