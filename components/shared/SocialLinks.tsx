"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { getSocialLinks } from "@/app/actions/cms"

type SocialRow = {
  id: number
  platform: string
  url: string
  enabled: boolean
  order: number
}

interface SocialLinksProps {
  size?: "sm" | "md" | "lg"
  centered?: boolean
}

function getHostname(url: string): string {
  try {
    const parsed = new URL(url)
    return parsed.hostname.replace(/^www\./, "").toLowerCase()
  } catch {
    return ""
  }
}

function getDisplayName(platform: string, url: string): string {
  const p = String(platform || "").trim()
  if (p) return p

  const host = getHostname(url)
  if (!host) return "Link"

  return host.split(".")[0]
}

function getFaviconUrl(url: string): string {
  const host = getHostname(url)
  if (!host) return ""
  return `https://www.google.com/s2/favicons?domain=${host}&sz=64`
}

function stringToColor(input: string): string {
  let hash = 0
  for (let i = 0; i < input.length; i++) {
    hash = input.charCodeAt(i) + ((hash << 5) - hash)
  }
  const hue = Math.abs(hash % 360)
  return `hsl(${hue} 70% 55%)`
}

export default function SocialLinks({ size = "md", centered = false }: SocialLinksProps) {
  const [items, setItems] = useState<SocialRow[]>([])
  const [loaded, setLoaded] = useState(false)
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})

  useEffect(() => {
    let mounted = true

      ; (async () => {
        try {
          const rows = (await getSocialLinks()) as SocialRow[]
          if (!mounted) return
          setItems(Array.isArray(rows) ? rows : [])
        } catch (error) {
          console.error("Failed to load social links:", error)
          if (mounted) setItems([])
        } finally {
          if (mounted) setLoaded(true)
        }
      })()

    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    console.log("SOCIAL LINKS FROM DB:", items)
  }, [items])

  const iconBox =
    size === "sm" ? "h-9 w-9" : size === "lg" ? "h-14 w-14" : "h-11 w-11"

  const iconInner =
    size === "sm" ? "h-4 w-4" : size === "lg" ? "h-6 w-6" : "h-5 w-5"

  const networks = useMemo(() => {
    return (items || [])
      .filter((x) => x && x.enabled !== false && x.url && String(x.url).trim())
      .sort((a, b) => Number(a.order ?? 0) - Number(b.order ?? 0))
      .map((x) => {
        const host = getHostname(x.url)
        const label = getDisplayName(x.platform, x.url)
        const favicon = getFaviconUrl(x.url)
        const color = stringToColor(host || label)

        return {
          key: `${x.id}-${host || label}`,
          label,
          url: x.url,
          host,
          favicon,
          color,
          letter: (label[0] || "L").toUpperCase(),
        }
      })
  }, [items])

  if (!loaded) return null
  if (networks.length === 0) return null

  return (
    <div className={`flex gap-3 flex-wrap ${centered ? "justify-center" : ""}`}>
      {networks.map((n) => {
        const showFallback = imageErrors[n.key] || !n.favicon

        return (
          <motion.a
            key={n.key}
            href={n.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${iconBox} rounded-full border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center shadow-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 overflow-hidden`}
            whileHover={{ y: -5, scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            aria-label={`Visit ${n.label}`}
            title={n.label}
          >
            {showFallback ? (
              <div
                className="w-full h-full flex items-center justify-center font-bold text-white"
                style={{ backgroundColor: n.color }}
              >
                {n.letter}
              </div>
            ) : (
              <img
                src={n.favicon}
                alt={n.label}
                className={iconInner}
                onError={() =>
                  setImageErrors((prev) => ({ ...prev, [n.key]: true }))
                }
              />
            )}
          </motion.a>
        )
      })}
    </div>
  )
}