"use client"

import { motion } from "framer-motion"
import { useProfile } from "@/context/profile-context"
import { Linkedin, Github, Twitter, Facebook, Instagram, ExternalLink } from "lucide-react"

interface SocialLinksProps {
  size?: "sm" | "md" | "lg"
  centered?: boolean
}

type SocialMap = Record<string, string>

function safeParseJSON(value: unknown): any {
  if (typeof value !== "string") return value
  try {
    return JSON.parse(value)
  } catch {
    return value
  }
}

function normalizeSocialLinks(profile: any): SocialMap {
  if (!profile) return {}

  // ✅ supports: socialLinks OR social_links (object or json string)
  const raw = safeParseJSON(profile.socialLinks ?? profile.social_links)
  if (raw && typeof raw === "object" && !Array.isArray(raw)) return raw as SocialMap

  // ✅ fallback if you store as separate columns
  const map: SocialMap = {
    linkedin: profile.linkedin ?? profile.linkedin_url ?? "",
    github: profile.github ?? profile.github_url ?? "",
    twitter: profile.twitter ?? profile.twitter_url ?? "",
    facebook: profile.facebook ?? profile.facebook_url ?? "",
    instagram: profile.instagram ?? profile.instagram_url ?? "",
  }

  Object.keys(map).forEach((k) => {
    if (!map[k] || !String(map[k]).trim()) delete map[k]
  })

  return map
}

export default function SocialLinks({ size = "md", centered = false }: SocialLinksProps) {
  const profile = useProfile()
  const socialLinks = normalizeSocialLinks(profile as any)

  const iconSize = size === "sm" ? "h-4 w-4" : size === "lg" ? "h-6 w-6" : "h-5 w-5"
  const containerSize = size === "sm" ? "p-2" : size === "lg" ? "p-3" : "p-2.5"

  const knownIcons: Record<string, JSX.Element> = {
    linkedin: <Linkedin className={iconSize} />,
    github: <Github className={iconSize} />,
    twitter: <Twitter className={iconSize} />,
    facebook: <Facebook className={iconSize} />,
    instagram: <Instagram className={iconSize} />,
  }

  const knownColors: Record<string, string> = {
    linkedin: "bg-[#0077B5]/10 text-[#0077B5] hover:bg-[#0077B5]",
    github:
      "bg-[#333]/10 text-[#333] dark:text-[#f5f5f5] dark:bg-[#f5f5f5]/10 hover:bg-[#333] dark:hover:bg-[#f5f5f5] dark:hover:text-[#333]",
    twitter: "bg-[#1DA1F2]/10 text-[#1DA1F2] hover:bg-[#1DA1F2]",
    facebook: "bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2]",
    instagram:
      "bg-gradient-to-br from-[#833AB4]/10 via-[#FD1D1D]/10 to-[#FCAF45]/10 text-[#FD1D1D] hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#FCAF45]",
  }

  const networks = Object.entries(socialLinks).map(([key, url]) => ({
    key,
    url,
    icon: knownIcons[key] || <ExternalLink className={iconSize} />,
    color: knownColors[key] || "bg-gray-500/10 text-gray-500 hover:bg-gray-500",
  }))

  // لو فاضي فعلاً، طبيعي مش هيظهر
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
          aria-label={`Visit ${n.key}`}
        >
          {n.icon}
        </motion.a>
      ))}
    </div>
  )
}