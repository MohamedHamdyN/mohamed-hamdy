"use client"

import { useState, useEffect, useRef, useCallback } from "react"

interface UseIntersectionObserverProps {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
  debounceMs?: number
}

export function useIntersectionObserver({
  threshold = 0.1,
  rootMargin = "0px",
  triggerOnce = true,
  debounceMs = 100,
}: UseIntersectionObserverProps = {}) {
  const [isIntersecting, setIntersecting] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)
  const ref = useRef<HTMLElement | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()

  const debouncedSetIntersecting = useCallback(
    (value: boolean) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
        setIntersecting(value)
        if (value && triggerOnce) {
          setHasTriggered(true)
        }
      }, debounceMs)
    },
    [debounceMs, triggerOnce],
  )

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (triggerOnce && hasTriggered) return
        debouncedSetIntersecting(entry.isIntersecting)
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
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [rootMargin, threshold, triggerOnce, hasTriggered, debouncedSetIntersecting])

  return [ref, isIntersecting] as const
}
