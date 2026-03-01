"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useProfile } from "@/context/profile-context"

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
  const profile = useProfile()

  const fallback =
    (profile as any)?.defaultProjectImage ??
    (profile as any)?.default_project_image ??
    "/placeholder.svg?height=600&width=800"

  const [imgSrc, setImgSrc] = useState<string>(src)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setImgSrc(src)
    setLoading(true)
  }, [src])

  const handleError = () => {
    setLoading(false)
    setImgSrc(fallback)
  }

  const handleLoad = () => setLoading(false)

  const imageProps = {
    src: imgSrc,
    alt,
    className: `transition-opacity duration-500 ${loading ? "opacity-0" : "opacity-100"} ${className}`,
    style: { objectFit },
    onError: handleError,
    onLoad: handleLoad,
    priority,
    unoptimized: true,
  } as const

  return (
    <div className="relative">
      {fill ? (
        <Image fill {...imageProps} />
      ) : (
        <Image width={width || 100} height={height || 100} {...imageProps} />
      )}

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/20 backdrop-blur-sm">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  )
}