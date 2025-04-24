"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import * as LucideIcons from "lucide-react"
import { PuzzlePiece } from "@/components/shared/CustomIcons"
import { useInView } from "framer-motion"

interface SliderItem {
  id: number
  title: string
  description: string
  icon: string
  color: string
  enabled?: boolean
}

interface DynamicSliderProps {
  items: SliderItem[]
  title: string
  description?: string
  autoplaySpeed?: number
  pauseOnHover?: boolean
  reverseDirection?: boolean
}

export default function DynamicSlider({
  items,
  title,
  description,
  autoplaySpeed = 3000,
  pauseOnHover = true,
  reverseDirection = false,
}: DynamicSliderProps) {
  const [isPaused, setIsPaused] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [touchStartX, setTouchStartX] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })

  // Filter enabled items
  const enabledItems = items.filter((item) => item.enabled !== false)

  // Duplicate items for infinite effect
  const displayItems = [...enabledItems, ...enabledItems]

  const getIcon = (iconName: string) => {
    if (iconName === "PuzzlePiece") {
      return <PuzzlePiece className="h-6 w-6" />
    }

    const Icon = LucideIcons[iconName as keyof typeof LucideIcons]
    if (Icon) {
      return <Icon className="h-6 w-6" />
    }
    return <LucideIcons.Star className="h-6 w-6" />
  }

  // Handle autoplay
  useEffect(() => {
    if (!isPaused && isInView) {
      const interval = setInterval(() => {
        if (sliderRef.current) {
          const newIndex = (activeIndex + 1) % enabledItems.length
          setActiveIndex(newIndex)

          // Calculate scroll position
          const itemWidth = sliderRef.current.scrollWidth / displayItems.length
          const scrollPosition = newIndex * itemWidth

          sliderRef.current.scrollTo({
            left: reverseDirection ? sliderRef.current.scrollWidth - scrollPosition - itemWidth : scrollPosition,
            behavior: "smooth",
          })
        }
      }, autoplaySpeed)

      return () => clearInterval(interval)
    }
  }, [isPaused, activeIndex, enabledItems.length, autoplaySpeed, reverseDirection, isInView, displayItems.length])

  // Handle touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true)
    setTouchStartX(e.touches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsPaused(false)
    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartX - touchEndX

    if (Math.abs(diff) > 50) {
      // Minimum swipe distance
      if (diff > 0) {
        // Swipe left
        const newIndex = (activeIndex + 1) % enabledItems.length
        setActiveIndex(newIndex)
      } else {
        // Swipe right
        const newIndex = (activeIndex - 1 + enabledItems.length) % enabledItems.length
        setActiveIndex(newIndex)
      }
    }
  }

  return (
    <section ref={containerRef} className="py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4 inline-block relative">
            {title}
            <motion.span
              className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"
              initial={{ width: 0 }}
              animate={isInView ? { width: "100%" } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            ></motion.span>
          </h2>
          {description && <p className="text-muted-foreground max-w-2xl mx-auto">{description}</p>}
        </motion.div>

        <div className="relative w-full">
          {/* Left fade effect */}
          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-background to-transparent z-10"></div>

          {/* Right fade effect */}
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-background to-transparent z-10"></div>

          {/* Slider container */}
          <div
            ref={sliderRef}
            className="flex overflow-x-auto hide-scrollbar py-4 px-4"
            onMouseEnter={() => pauseOnHover && setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className={`flex ${reverseDirection ? "flex-row-reverse" : "flex-row"} gap-6`}>
              {displayItems.map((item, idx) => (
                <motion.div
                  key={`${item.id}-${idx}`}
                  className="flex-shrink-0 w-64 p-4 rounded-xl border border-border/40 bg-background/30 backdrop-blur-sm hover:border-primary/40 transition-all duration-500 group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: (idx * 0.05) % 0.5 }}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`${item.color} bg-background/80 p-2 rounded-lg`}>{getIcon(item.icon)}</div>
                    <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{item.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center mt-8 gap-2">
            {enabledItems.map((_, idx) => (
              <button
                key={idx}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === activeIndex ? "bg-primary w-4" : "bg-primary/30"
                }`}
                onClick={() => {
                  setActiveIndex(idx)
                  if (sliderRef.current) {
                    const itemWidth = sliderRef.current.scrollWidth / displayItems.length
                    sliderRef.current.scrollTo({
                      left: reverseDirection
                        ? sliderRef.current.scrollWidth - idx * itemWidth - itemWidth
                        : idx * itemWidth,
                      behavior: "smooth",
                    })
                  }
                }}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
