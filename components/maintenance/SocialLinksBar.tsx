"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"

type Item = { platform: string; url: string }

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

export default function SocialLinksBar({ items }: { items: Item[] }) {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})

  const networks = useMemo(() => {
    return (items || [])
      .filter((x) => x && x.url && String(x.url).trim())
      .map((x) => {
        const host = getHostname(x.url)
        const label = getDisplayName(x.platform, x.url)
        const favicon = getFaviconUrl(x.url)
        const color = stringToColor(host || label)

        return {
          key: `${label}-${x.url}`,
          label,
          url: x.url,
          favicon,
          color,
          letter: (label[0] || "L").toUpperCase(),
        }
      })
  }, [items])

  if (!networks.length) return null

  return (
    <div className="flex gap-3 flex-wrap">
      {networks.map((n) => {
        const showFallback = imageErrors[n.key] || !n.favicon

        return (
          <motion.a
            key={n.key}
            href={n.url}
            target="_blank"
            rel="noopener noreferrer"
            className="h-12 w-12 rounded-full border border-border bg-card hover:border-primary/30 transition flex items-center justify-center overflow-hidden"
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.96 }}
            aria-label={n.label}
            title={n.label}
          >
            {showFallback ? (
              <div
                className="w-full h-full flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: n.color }}
              >
                {n.letter}
              </div>
            ) : (
              <img
                src={n.favicon}
                alt={n.label}
                className="h-5 w-5"
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