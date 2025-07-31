"use client"

import type React from "react"

import { Suspense, lazy, type ComponentType } from "react"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

interface LazySectionProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  rootMargin?: string
  className?: string
}

export default function LazySection({
  children,
  fallback = <div className="h-64 bg-muted animate-pulse rounded-lg" />,
  rootMargin = "100px",
  className = "",
}: LazySectionProps) {
  const [ref, isIntersecting] = useIntersectionObserver({
    rootMargin,
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <div ref={ref} className={className}>
      {isIntersecting ? <Suspense fallback={fallback}>{children}</Suspense> : fallback}
    </div>
  )
}

// HOC para crear componentes lazy
export function createLazyComponent<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback?: React.ReactNode,
) {
  const LazyComponent = lazy(importFunc)

  return function LazyWrapper(props: React.ComponentProps<T>) {
    return (
      <Suspense fallback={fallback || <div className="h-64 bg-muted animate-pulse rounded-lg" />}>
        <LazyComponent {...props} />
      </Suspense>
    )
  }
}
