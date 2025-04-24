"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { profile } from "@/admin/profile"

interface LazyImageProps {
  src: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down"
  priority?: boolean
}

export default function LazyImage({
  src,
  alt,
  fill = false,
  width,
  height,
  className = "",
  objectFit = "cover",
  priority = false,
}: LazyImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(src)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    // Reset states when src changes
    setImgSrc(src)
    setLoading(true)
    setError(false)
  }, [src])

  const handleError = () => {
    setError(true)
    setLoading(false)
    setImgSrc(profile.defaultProjectImage || "/placeholder.svg?height=600&width=800")
  }

  const handleLoad = () => {
    setLoading(false)
  }

  // Common props for both Image components
  const imageProps = {
    src: imgSrc,
    alt,
    className: `transition-opacity duration-500 ${loading ? "opacity-0" : "opacity-100"} ${className}`,
    style: { objectFit },
    onError: handleError,
    onLoad: handleLoad,
    priority,
  }

  return (
    <>
      {fill ? <Image fill {...imageProps} /> : <Image width={width || 100} height={height || 100} {...imageProps} />}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/20 backdrop-blur-sm">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </>
  )
}
