"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import * as LucideIcons from "lucide-react"
import { PuzzlePiece } from "@/components/shared/CustomIcons"
import { useMobile } from "@/hooks/use-mobile"

interface SliderItem {
  id: number
  title: string
  description: string
  icon: string
  color: string
  enabled?: boolean
}

interface InfiniteSliderProps {
  items: SliderItem[]
  title: string
  description?: string
  reverseDirection?: boolean
  autoplaySpeed?: number
  pauseOnHover?: boolean
}

export default function InfiniteSlider({
  items,
  title,
  description,
  reverseDirection = false,
  autoplaySpeed = 3000,
  pauseOnHover = true,
}: InfiniteSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })
  const controls = useAnimation()
  const [isPaused, setIsPaused] = useState(false)
  const isMobile = useMobile()

  // Filter enabled items
  const enabledItems = items.filter((item) => item.enabled !== false)

  // Reduce repetition - only duplicate items once instead of twice
  const displayItems = [...enabledItems, ...enabledItems]

  useEffect(() => {
    if (isInView && !isPaused) {
      controls.start({
        x: reverseDirection ? "100%" : "-100%",
        transition: {
          x: {
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            duration: 60, // Slower animation (increased from 30 to 60)
            ease: "linear",
          },
        },
      })
    } else {
      controls.stop()
    }

    return () => {
      controls.stop()
    }
  }, [controls, isInView, isPaused, reverseDirection])

  const getIcon = (iconName: string) => {
    if (iconName === "PuzzlePiece") {
      return <PuzzlePiece className="h-6 w-6" aria-hidden="true" />
    }

    const Icon = LucideIcons[iconName as keyof typeof LucideIcons]
    if (Icon) {
      return <Icon className="h-6 w-6" aria-hidden="true" />
    }
    return <LucideIcons.Star className="h-6 w-6" aria-hidden="true" />
  }

  return (
    <section
      ref={containerRef}
      className="py-20 bg-background relative overflow-hidden"
      aria-labelledby={`${title.toLowerCase().replace(/\s+/g, "-")}-heading`}
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2
            id={`${title.toLowerCase().replace(/\s+/g, "-")}-heading`}
            className="text-3xl font-bold mb-4 inline-block relative"
          >
            {title}
            <motion.span
              className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"
              initial={{ width: 0 }}
              animate={isInView ? { width: "100%" } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              aria-hidden="true"
            ></motion.span>
          </h2>
          {description && <p className="text-muted-foreground max-w-2xl mx-auto">{description}</p>}
        </motion.div>

        <div className="relative w-full overflow-hidden">
          {/* Left fade effect */}
          <div
            className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-background to-transparent z-10"
            aria-hidden="true"
          ></div>

          {/* Right fade effect */}
          <div
            className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-background to-transparent z-10"
            aria-hidden="true"
          ></div>

          <div
            className="w-full overflow-hidden"
            onMouseEnter={() => pauseOnHover && setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => pauseOnHover && setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
            aria-label={`${title} slider - press tab to navigate items`}
          >
            <motion.div
              ref={sliderRef}
              className="flex gap-6 py-4"
              animate={controls}
              initial={{ x: 0 }}
              style={{
                width: `${displayItems.length * (isMobile ? 280 : 320) + displayItems.length * 24}px`,
              }}
            >
              {displayItems.map((item, idx) => (
                <motion.div
                  key={`${item.id}-${idx}`}
                  className="flex-shrink-0 w-64 sm:w-72 p-4 rounded-xl border border-border/40 bg-background/30 backdrop-blur-sm hover:border-primary/40 transition-all duration-500 group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: (idx * 0.05) % 0.5 }}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  tabIndex={0}
                  role="article"
                  aria-label={`${item.title}: ${item.description}`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`${item.color} bg-background/80 p-2 rounded-lg`}>{getIcon(item.icon)}</div>
                    <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{item.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
