"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { getSocialLinks } from "@/app/actions/cms"
import { ExternalLink, Linkedin, Github, Twitter, Facebook, Instagram, Youtube, Globe } from "lucide-react"

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

function normPlatform(p: string) {
  return String(p || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/-/g, "")
}

export default function SocialLinks({ size = "md", centered = false }: SocialLinksProps) {
  const [items, setItems] = useState<SocialRow[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let mounted = true
      ; (async () => {
        try {
          const rows = (await getSocialLinks()) as any[]
          if (!mounted) return
          setItems(Array.isArray(rows) ? (rows as SocialRow[]) : [])
        } finally {
          if (mounted) setLoaded(true)
        }
      })()
    return () => {
      mounted = false
    }
  }, [])

  const iconSize = size === "sm" ? "h-4 w-4" : size === "lg" ? "h-6 w-6" : "h-5 w-5"
  const containerSize = size === "sm" ? "p-2" : size === "lg" ? "p-3" : "p-2.5"

  const { networks } = useMemo(() => {
    const knownIcons: Record<string, JSX.Element> = {
      linkedin: <Linkedin className={iconSize} />,
      github: <Github className={iconSize} />,
      twitter: <Twitter className={iconSize} />,
      x: <Twitter className={iconSize} />,
      facebook: <Facebook className={iconSize} />,
      instagram: <Instagram className={iconSize} />,
      youtube: <Youtube className={iconSize} />,
      website: <Globe className={iconSize} />,
      portfolio: <Globe className={iconSize} />,
    }

    const knownColors: Record<string, string> = {
      linkedin: "bg-[#0077B5]/10 text-[#0077B5] hover:bg-[#0077B5]",
      github:
        "bg-[#333]/10 text-[#333] dark:text-[#f5f5f5] dark:bg-[#f5f5f5]/10 hover:bg-[#333] dark:hover:bg-[#f5f5f5] dark:hover:text-[#333]",
      twitter: "bg-[#1DA1F2]/10 text-[#1DA1F2] hover:bg-[#1DA1F2]",
      x: "bg-[#1DA1F2]/10 text-[#1DA1F2] hover:bg-[#1DA1F2]",
      facebook: "bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2]",
      instagram:
        "bg-gradient-to-br from-[#833AB4]/10 via-[#FD1D1D]/10 to-[#FCAF45]/10 text-[#FD1D1D] hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#FCAF45]",
      youtube: "bg-red-500/10 text-red-500 hover:bg-red-500",
      website: "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500",
      portfolio: "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500",
    }

    const rows = (items || [])
      .filter((x) => x && x.enabled !== false && x.url && String(x.url).trim())
      .sort((a, b) => Number(a.order ?? 0) - Number(b.order ?? 0))

    const mapped = rows.map((x) => {
      const key = normPlatform(x.platform)
      return {
        key: `${key}-${x.id}`,
        label: x.platform,
        url: x.url,
        icon: knownIcons[key] || <ExternalLink className={iconSize} />,
        color: knownColors[key] || "bg-gray-500/10 text-gray-500 hover:bg-gray-500",
      }
    })

    return { networks: mapped }
  }, [items, iconSize])

  // لو لسه محمّلش، خليه ما يبوّظش الـ layout
  if (!loaded) return null
  if (networks.length === 0) return null

  return (
    <div className={`flex gap-3 flex-wrap ${centered ? "justify-center" : ""}`}>
      {networks.map((n) => (
        <motion.a
          key={n.key}
          href={n.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${containerSize} ${n.color} rounded-full hover:text-white transition-colors`}
          whileHover={{ y: -5 }}
          whileTap={{ scale: 0.95 }}
          aria-label={`Visit ${n.label}`}
          title={n.label}
        >
          {n.icon}
        </motion.a>
      ))}
    </div>
  )
}