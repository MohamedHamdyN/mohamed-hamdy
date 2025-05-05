"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"
import Link from "next/link"
import { profile } from "@/admin/profile"
import Image from "next/image"

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
}

export class HeaderErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Header error caught:", error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-xl border-b border-border/30">
          <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
            <div className="flex lg:flex-1">
              <Link href="/" className="-m-1.5 p-1.5" aria-label="Home">
                <span className="sr-only">{profile.name}</span>
                <div className="relative h-8 w-8 overflow-hidden rounded-full border border-primary/20 bg-background/80 backdrop-blur-sm shadow-sm">
                  <Image
                    src="/logo.svg"
                    alt={profile.name}
                    width={32}
                    height={32}
                    className="h-full w-full object-contain p-1"
                    priority
                    unoptimized
                  />
                </div>
              </Link>
            </div>
            <div className="text-sm text-muted-foreground">
              <Link href="/" className="px-4 py-2 hover:text-primary">
                Home
              </Link>
            </div>
          </nav>
        </header>
      )
    }

    return this.props.children
  }
}
