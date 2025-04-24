"use client"

import { useState, useEffect } from "react"

/**
 * Hook to track scroll position
 * @returns Current scroll position
 */
export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    // Function to update scroll position
    const updatePosition = () => {
      setScrollPosition(window.pageYOffset)
    }

    // Add event listener for scroll
    window.addEventListener("scroll", updatePosition)

    // Initial position
    updatePosition()

    // Clean up event listener
    return () => window.removeEventListener("scroll", updatePosition)
  }, [])

  return scrollPosition
}
