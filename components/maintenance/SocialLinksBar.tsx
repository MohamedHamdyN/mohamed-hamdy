"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import {
  Linkedin,
  Github,
  Twitter,
  Facebook,
  Instagram,
  ExternalLink,
  Youtube,
  MessageCircle,
  Send,
  Globe,
} from "lucide-react"

type Item = {
  platform: string
  url: string
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

function DatacampIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12.946 18.151v-5.239L21.209 8.033v4.962l-8.263 5.156zm-1.825.468L2.791 13.25V8.033l8.33 5.418v5.168zM12 0L0 7.165v8.496l12 7.339 12-7.339V7.165L12 0z" />
    </svg>
  )
}

function resolveSocial(host: string, iconSize: string) {
  const key = host.toLowerCase()

  if (key.includes("linkedin.com")) {
    return {
      icon: <Linkedin className={iconSize} />,
      color: "bg-[#0077B5]/10 text-[#0077B5] hover:bg-[#0077B5] hover:text-white",
      name: "LinkedIn",
    }
  }

  if (key.includes("github.com")) {
    return {
      icon: <Github className={iconSize} />,
      color:
        "bg-[#333]/10 text-[#333] dark:text-[#f5f5f5] dark:bg-[#f5f5f5]/10 hover:bg-[#333] dark:hover:bg-[#f5f5f5] hover:text-white dark:hover:text-[#333]",
      name: "GitHub",
    }
  }

  if (key.includes("twitter.com") || key.includes("x.com")) {
    return {
      icon: <Twitter className={iconSize} />,
      color: "bg-[#1DA1F2]/10 text-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-white",
      name: "Twitter / X",
    }
  }

  if (key.includes("facebook.com") || key.includes("fb.com")) {
    return {
      icon: <Facebook className={iconSize} />,
      color: "bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2] hover:text-white",
      name: "Facebook",
    }
  }

  if (key.includes("instagram.com")) {
    return {
      icon: <Instagram className={iconSize} />,
      color:
        "bg-gradient-to-br from-[#833AB4]/10 via-[#FD1D1D]/10 to-[#FCAF45]/10 text-[#FD1D1D] hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#FCAF45] hover:text-white",
      name: "Instagram",
    }
  }

  if (key.includes("youtube.com") || key.includes("youtu.be")) {
    return {
      icon: <Youtube className={iconSize} />,
      color: "bg-[#FF0000]/10 text-[#FF0000] hover:bg-[#FF0000] hover:text-white",
      name: "YouTube",
    }
  }

  if (key.includes("datacamp.com")) {
    return {
      icon: <DatacampIcon className={iconSize} />,
      color: "bg-[#03EF62]/10 text-[#03EF62] hover:bg-[#03EF62] hover:text-black",
      name: "DataCamp",
    }
  }

  if (key.includes("whatsapp.com") || key.includes("wa.me")) {
    return {
      icon: <MessageCircle className={iconSize} />,
      color: "bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white",
      name: "WhatsApp",
    }
  }

  if (
    key.includes("t.me") ||
    key.includes("telegram.me") ||
    key.includes("telegram.org")
  ) {
    return {
      icon: <Send className={iconSize} />,
      color: "bg-[#229ED9]/10 text-[#229ED9] hover:bg-[#229ED9] hover:text-white",
      name: "Telegram",
    }
  }

  if (key.includes("vercel.app") || key.includes("netlify.app")) {
    return {
      icon: <Globe className={iconSize} />,
      color: "bg-sky-500/10 text-sky-500 hover:bg-sky-500 hover:text-white",
      name: "Website",
    }
  }

  return {
    icon: <ExternalLink className={iconSize} />,
    color: "bg-gray-500/10 text-gray-500 hover:bg-gray-500 hover:text-white",
    name: "External Link",
  }
}

export default function SocialLinksBar({ items }: { items: Item[] }) {
  const iconSize = "h-5 w-5"
  const containerSize = "p-2.5"

  const networks = useMemo(() => {
    return (items || [])
      .filter((x) => x && x.url && String(x.url).trim())
      .map((x) => {
        const host = getHostname(x.url)
        const detected = resolveSocial(host, iconSize)
        const label = getDisplayName(x.platform, x.url)

        return {
          key: `${label}-${x.url}`,
          label: label || detected.name,
          url: x.url,
          icon: detected.icon,
          color: detected.color,
        }
      })
  }, [items])

  if (!networks.length) return null

  return (
    <div className="flex gap-3 flex-wrap">
      {networks.map((network) => (
        <motion.a
          key={network.key}
          href={network.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${containerSize} ${network.color} rounded-full transition-all duration-300 shadow-sm hover:shadow-lg`}
          whileHover={{ y: -5 }}
          whileTap={{ scale: 0.95 }}
          aria-label={`Visit ${network.label}`}
          title={network.label}
        >
          {network.icon}
        </motion.a>
      ))}
    </div>
  )
}