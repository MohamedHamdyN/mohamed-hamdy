"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only enable custom cursor on desktop
    const isMobile = window.matchMedia("(max-width: 768px)").matches
    if (isMobile) return

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)
    }

    window.addEventListener("mousemove", updateMousePosition)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference"
      animate={{ x: mousePosition.x - 5, y: mousePosition.y - 5 }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
    >
      <div className="w-3 h-3 bg-white rounded-full" />
    </motion.div>
  )
}
