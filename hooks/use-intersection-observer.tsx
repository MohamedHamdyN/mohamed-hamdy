"use client"

import { useState, useEffect, useRef } from "react"

interface UseIntersectionObserverProps {
  threshold?: number
  rootMargin?: string
}

/**
 * Hook to detect when an element is visible in the viewport
 * @param options - Intersection observer options
 * @returns [ref, isIntersecting] - Ref to attach to element and boolean indicating if element is visible
 */
export function useIntersectionObserver({ threshold = 0.1, rootMargin = "0px" }: UseIntersectionObserverProps = {}) {
  const [isIntersecting, setIntersecting] = useState(false)
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting)
      },
      {
        rootMargin,
        threshold,
      },
    )

    const currentRef = ref.current

    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [rootMargin, threshold])

  return [ref, isIntersecting] as const
}
