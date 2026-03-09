"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import type { IconType } from "react-icons"
import {
  FaLinkedin,
  FaGithub,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaTelegram,
  FaDiscord,
  FaBehance,
  FaDribbble,
  FaMedium,
  FaReddit,
  FaPinterest,
  FaSnapchat,
} from "react-icons/fa"
import { FaXTwitter, FaTiktok } from "react-icons/fa6"
import { FiGlobe } from "react-icons/fi"
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
  accentColor?: string
}

type ResolvedNetwork = {
  name: string
  icon: IconType
  brandColor: string
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

function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace("#", "")
  const full =
    clean.length === 3
      ? clean
        .split("")
        .map((c) => c + c)
        .join("")
      : clean

  const num = parseInt(full, 16)
  const r = (num >> 16) & 255
  const g = (num >> 8) & 255
  const b = num & 255

  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function resolveNetwork(url: string): ResolvedNetwork {
  const host = getHostname(url)

  const rules: Array<{
    match: string[]
    name: string
    icon: IconType
    brandColor: string
  }> = [
      {
        match: ["linkedin.com"],
        name: "LinkedIn",
        icon: FaLinkedin,
        brandColor: "#0A66C2",
      },
      {
        match: ["github.com"],
        name: "GitHub",
        icon: FaGithub,
        brandColor: "#ffffff",
      },
      {
        match: ["twitter.com", "x.com"],
        name: "X",
        icon: FaXTwitter,
        brandColor: "#ffffff",
      },
      {
        match: ["facebook.com", "fb.com"],
        name: "Facebook",
        icon: FaFacebook,
        brandColor: "#1877F2",
      },
      {
        match: ["instagram.com"],
        name: "Instagram",
        icon: FaInstagram,
        brandColor: "#E4405F",
      },
      {
        match: ["youtube.com", "youtu.be"],
        name: "YouTube",
        icon: FaYoutube,
        brandColor: "#FF0000",
      },
      {
        match: ["tiktok.com"],
        name: "TikTok",
        icon: FaTiktok,
        brandColor: "#ffffff",
      },
      {
        match: ["whatsapp.com", "wa.me"],
        name: "WhatsApp",
        icon: FaWhatsapp,
        brandColor: "#25D366",
      },
      {
        match: ["telegram.org", "t.me", "telegram.me"],
        name: "Telegram",
        icon: FaTelegram,
        brandColor: "#26A5E4",
      },
      {
        match: ["discord.com", "discord.gg"],
        name: "Discord",
        icon: FaDiscord,
        brandColor: "#5865F2",
      },
      {
        match: ["behance.net"],
        name: "Behance",
        icon: FaBehance,
        brandColor: "#1769FF",
      },
      {
        match: ["dribbble.com"],
        name: "Dribbble",
        icon: FaDribbble,
        brandColor: "#EA4C89",
      },
      {
        match: ["medium.com"],
        name: "Medium",
        icon: FaMedium,
        brandColor: "#ffffff",
      },
      {
        match: ["reddit.com"],
        name: "Reddit",
        icon: FaReddit,
        brandColor: "#FF4500",
      },
      {
        match: ["pinterest.com"],
        name: "Pinterest",
        icon: FaPinterest,
        brandColor: "#E60023",
      },
      {
        match: ["snapchat.com"],
        name: "Snapchat",
        icon: FaSnapchat,
        brandColor: "#FFFC00",
      },
    ]

  const found = rules.find((rule) =>
    rule.match.some((domain) => host === domain || host.endsWith(`.${domain}`))
  )

  if (found) {
    return found
  }

  return {
    name: host || "Website",
    icon: FiGlobe,
    brandColor: "#ffffff",
  }
}

export default function SocialLinks({
  size = "md",
  centered = false,
  accentColor = "#7c3aed",
}: SocialLinksProps) {
  const [items, setItems] = useState<SocialRow[]>([])
  const [loaded, setLoaded] = useState(false)

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

  const iconBox =
    size === "sm" ? "h-10 w-10" : size === "lg" ? "h-14 w-14" : "h-12 w-12"

  const iconClass =
    size === "sm" ? "text-[18px]" : size === "lg" ? "text-[26px]" : "text-[22px]"

  const networks = useMemo(() => {
    return (items || [])
      .filter((x) => x && x.enabled !== false && x.url && String(x.url).trim())
      .sort((a, b) => Number(a.order ?? 0) - Number(b.order ?? 0))
      .map((x) => {
        const resolved = resolveNetwork(x.url)

        return {
          key: `${x.id}-${x.url}`,
          url: x.url,
          label: getDisplayName(x.platform, x.url) || resolved.name,
          icon: resolved.icon,
          brandColor: resolved.brandColor,
        }
      })
  }, [items])

  if (!loaded || networks.length === 0) return null

  const glow = hexToRgba(accentColor, 0.35)
  const overlay = hexToRgba(accentColor, 0.14)
  const border = hexToRgba(accentColor, 0.45)

  return (
    <div className={`flex flex-wrap gap-3 ${centered ? "justify-center" : ""}`}>
      {networks.map((n) => {
        const Icon = n.icon

        return (
          <motion.a
            key={n.key}
            href={n.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${n.label}`}
            title={n.label}
            whileHover={{ y: -4, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`${iconBox} group relative flex items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-md transition-all duration-300`}
          >
            {/* base ring */}
            <span className="absolute inset-[3px] rounded-full border border-white/10 transition-all duration-300 group-hover:border-transparent" />

            {/* hover glow */}
            <span
              className="absolute inset-0 rounded-full opacity-0 transition-all duration-300 group-hover:opacity-100"
              style={{
                background: `radial-gradient(circle at center, ${glow} 0%, transparent 70%)`,
                boxShadow: `0 0 22px ${glow}`,
              }}
            />

            {/* hover tint */}
            <span
              className="absolute inset-0 rounded-full opacity-0 transition-all duration-300 group-hover:opacity-100"
              style={{
                backgroundColor: overlay,
                border: `1px solid ${border}`,
              }}
            />

            {/* icon */}
            <span className="relative z-10 flex items-center justify-center">
              <Icon
                className={`${iconClass} transition-transform duration-300 group-hover:scale-110`}
                style={{ color: n.brandColor }}
              />
            </span>
          </motion.a>
        )
      })}
    </div>
  )
}