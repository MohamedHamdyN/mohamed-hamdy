"use client"

import type React from "react"
import { Suspense, type ComponentType } from "react"

interface LazySectionProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  className?: string
}

export default function LazySection({
  children,
  fallback = <div className="h-64 bg-muted animate-pulse rounded-lg" />,
  className = "",
}: LazySectionProps) {
  return (
    <div className={className}>
      <Suspense fallback={fallback}>
        {children}
      </Suspense>
    </div>
  )
}

// اختياري: High Order Component لو بتحتاج تكسل كمبوننت ديناميكياً
export function createLazyComponent<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback?: React.ReactNode,
) {
  const LazyComponent = React.lazy(importFunc)

  return function LazyWrapper(props: React.ComponentProps<T>) {
    return (
      <Suspense fallback={fallback || <div className="h-64 bg-muted animate-pulse rounded-lg" />}>
        <LazyComponent {...props} />
      </Suspense>
    )
  }
}
