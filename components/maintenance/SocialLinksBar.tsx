"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import type { IconType } from "react-icons"
import {
  FaLinkedinIn,
  FaGithub,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaTelegramPlane,
  FaDiscord,
  FaBehance,
  FaDribbble,
  FaMediumM,
  FaRedditAlien,
  FaPinterestP,
  FaSnapchatGhost,
  FaGlobe,
} from "react-icons/fa"
import { FaXTwitter, FaTiktok } from "react-icons/fa6"

type Item = {
  platform: string
  url: string
}

type ResolvedNetwork = {
  name: string
  icon: IconType
  bg: string
  iconColor: string
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

function stringToColor(input: string): string {
  let hash = 0
  for (let i = 0; i < input.length; i++) {
    hash = input.charCodeAt(i) + ((hash << 5) - hash)
  }
  const hue = Math.abs(hash % 360)
  return `hsl(${hue} 70% 45%)`
}

function resolveNetwork(url: string): ResolvedNetwork {
  const host = getHostname(url)

  const rules: Array<{
    match: string[]
    name: string
    icon: IconType
    bg: string
    iconColor?: string
  }> = [
      {
        match: ["linkedin.com"],
        name: "LinkedIn",
        icon: FaLinkedinIn,
        bg: "#0077B5",
      },
      {
        match: ["github.com"],
        name: "GitHub",
        icon: FaGithub,
        bg: "#1f2937",
      },
      {
        match: ["twitter.com", "x.com"],
        name: "X",
        icon: FaXTwitter,
        bg: "#111827",
      },
      {
        match: ["facebook.com", "fb.com"],
        name: "Facebook",
        icon: FaFacebookF,
        bg: "#1877F2",
      },
      {
        match: ["instagram.com"],
        name: "Instagram",
        icon: FaInstagram,
        bg: "#E1306C",
      },
      {
        match: ["youtube.com", "youtu.be"],
        name: "YouTube",
        icon: FaYoutube,
        bg: "#FF0000",
      },
      {
        match: ["tiktok.com"],
        name: "TikTok",
        icon: FaTiktok,
        bg: "#111827",
      },
      {
        match: ["whatsapp.com", "wa.me"],
        name: "WhatsApp",
        icon: FaWhatsapp,
        bg: "#25D366",
      },
      {
        match: ["telegram.org", "telegram.me", "t.me"],
        name: "Telegram",
        icon: FaTelegramPlane,
        bg: "#229ED9",
      },
      {
        match: ["discord.com", "discord.gg"],
        name: "Discord",
        icon: FaDiscord,
        bg: "#5865F2",
      },
      {
        match: ["behance.net"],
        name: "Behance",
        icon: FaBehance,
        bg: "#1769FF",
      },
      {
        match: ["dribbble.com"],
        name: "Dribbble",
        icon: FaDribbble,
        bg: "#EA4C89",
      },
      {
        match: ["medium.com"],
        name: "Medium",
        icon: FaMediumM,
        bg: "#121212",
      },
      {
        match: ["reddit.com"],
        name: "Reddit",
        icon: FaRedditAlien,
        bg: "#FF4500",
      },
      {
        match: ["pinterest.com"],
        name: "Pinterest",
        icon: FaPinterestP,
        bg: "#E60023",
      },
      {
        match: ["snapchat.com"],
        name: "Snapchat",
        icon: FaSnapchatGhost,
        bg: "#FFFC00",
        iconColor: "#111111",
      },
    ]

  const found = rules.find((rule) =>
    rule.match.some((domain) => host === domain || host.endsWith(`.${domain}`))
  )

  if (found) {
    return {
      name: found.name,
      icon: found.icon,
      bg: found.bg,
      iconColor: found.iconColor ?? "#ffffff",
    }
  }

  return {
    name: host || "Website",
    icon: FaGlobe,
    bg: stringToColor(host || "website"),
    iconColor: "#ffffff",
  }
}

export default function SocialLinksBar({ items }: { items: Item[] }) {
  const networks = useMemo(() => {
    return (items || [])
      .filter((x) => x && x.url && String(x.url).trim())
      .map((x) => {
        const resolved = resolveNetwork(x.url)
        const label = getDisplayName(x.platform, x.url)

        return {
          key: `${label}-${x.url}`,
          label: label || resolved.name,
          url: x.url,
          icon: resolved.icon,
          bg: resolved.bg,
          iconColor: resolved.iconColor,
        }
      })
  }, [items])

  if (!networks.length) return null

  return (
    <div className="flex gap-3 flex-wrap">
      {networks.map((n) => {
        const Icon = n.icon

        return (
          <motion.a
            key={n.key}
            href={n.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={n.label}
            title={n.label}
            className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center overflow-hidden shadow-md transition-all duration-300"
            style={{
              backgroundColor: n.bg,
              boxShadow: `0 8px 22px ${n.bg}40`,
            }}
            whileHover={{ y: -4, scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="absolute inset-0 bg-white/0 hover:bg-white/10 transition-all duration-300 rounded-full" />
            <span className="relative z-10 flex items-center justify-center">
              <Icon
                className="text-[18px]"
                style={{ color: n.iconColor }}
              />
            </span>
          </motion.a>
        )
      })}
    </div>
  )
}