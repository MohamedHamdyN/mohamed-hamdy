"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  priority?: boolean
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down"
  onLoad?: () => void
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className,
  priority = false,
  objectFit = "cover",
  onLoad,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [imgSrc, setImgSrc] = useState(src)

  // Reset loading state when src changes
  useEffect(() => {
    setIsLoading(true)
    setImgSrc(src)
  }, [src])

  return (
    <div className={cn("overflow-hidden relative", className)}>
      {isLoading && <div className="absolute inset-0 bg-muted/20 animate-pulse rounded-md" />}

      <Image
        src={imgSrc || "/placeholder.svg"}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        className={cn(
          "transition-all duration-300",
          isLoading ? "scale-110 blur-sm" : "scale-100 blur-0",
          objectFit === "cover" && "object-cover",
          objectFit === "contain" && "object-contain",
          objectFit === "fill" && "object-fill",
          objectFit === "none" && "object-none",
          objectFit === "scale-down" && "object-scale-down",
        )}
        onLoad={() => {
          setIsLoading(false)
          if (onLoad) onLoad()
        }}
        onError={() => {
          setImgSrc("/placeholder.svg")
        }}
        loading={priority ? "eager" : "lazy"}
        priority={priority}
        unoptimized
      />
    </div>
  )
}
