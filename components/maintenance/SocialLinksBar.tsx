// components/maintenance/SocialLinksBar.tsx
"use client"

import { motion } from "framer-motion"
import { Linkedin, Github, Twitter, Facebook, Instagram, ExternalLink } from "lucide-react"

type Item = { platform: string; url: string }

function keyOf(platform: string) {
  const p = platform.toLowerCase().trim()
  if (p.includes("linkedin")) return "linkedin"
  if (p.includes("github")) return "github"
  if (p.includes("twitter") || p.includes("x")) return "twitter"
  if (p.includes("facebook")) return "facebook"
  if (p.includes("instagram")) return "instagram"
  return "other"
}

export default function SocialLinksBar({ items }: { items: Item[] }) {
  if (!items?.length) return null

  const iconClass = "h-5 w-5"
  const containerClass = "p-3 rounded-full bg-card border border-border hover:border-primary/30 transition"

  const iconMap: Record<string, JSX.Element> = {
    linkedin: <Linkedin className={iconClass} />,
    github: <Github className={iconClass} />,
    twitter: <Twitter className={iconClass} />,
    facebook: <Facebook className={iconClass} />,
    instagram: <Instagram className={iconClass} />,
    other: <ExternalLink className={iconClass} />,
  }

  return (
    <div className="flex gap-3 flex-wrap">
      {items.map((x) => {
        const k = keyOf(x.platform)
        return (
          <motion.a
            key={`${x.platform}-${x.url}`}
            href={x.url}
            target="_blank"
            rel="noopener noreferrer"
            className={containerClass}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.96 }}
            aria-label={x.platform}
            title={x.platform}
          >
            {iconMap[k]}
          </motion.a>
        )
      })}
    </div>
  )
}