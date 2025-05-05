"use client"

import { motion } from "framer-motion"
import { profile } from "@/admin/profile"
import { Linkedin, Github, Twitter, Facebook, Instagram, ExternalLink } from "lucide-react"

interface SocialLinksProps {
  size?: "sm" | "md" | "lg"
  centered?: boolean
  className?: string
}

export default function SocialLinks({ size = "md", centered = false, className = "" }: SocialLinksProps) {
  const getSizeClass = () => {
    switch (size) {
      case "sm":
        return "h-4 w-4"
      case "md":
        return "h-5 w-5"
      case "lg":
        return "h-6 w-6"
      default:
        return "h-5 w-5"
    }
  }

  const getContainerClass = () => {
    switch (size) {
      case "sm":
        return "p-2"
      case "md":
        return "p-2.5"
      case "lg":
        return "p-3"
      default:
        return "p-2.5"
    }
  }

  const iconSize = getSizeClass()
  const containerSize = getContainerClass()

  // Custom icon for Datacamp
  const DatacampIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12.946 18.151v-5.239L21.209 8.033v4.962l-8.263 5.156zm-1.825.468L2.791 13.25V8.033l8.33 5.418v5.168zM12 0L0 7.165v8.496l12 7.339 12-7.339V7.165L12 0z" />
    </svg>
  )

  // Define known icons
  const knownIcons: Record<string, JSX.Element> = {
    linkedin: <Linkedin className={iconSize} />,
    github: <Github className={iconSize} />,
    twitter: <Twitter className={iconSize} />,
    facebook: <Facebook className={iconSize} />,
    instagram: <Instagram className={iconSize} />,
    datacamp: <DatacampIcon className={iconSize} />,
  }

  // Define known colors
  const knownColors: Record<string, string> = {
    linkedin: "bg-[#0077B5]/10 text-[#0077B5] hover:bg-[#0077B5]",
    github:
      "bg-[#333]/10 text-[#333] dark:text-[#f5f5f5] dark:bg-[#f5f5f5]/10 hover:bg-[#333] dark:hover:bg-[#f5f5f5] dark:hover:text-[#333]",
    twitter: "bg-[#1DA1F2]/10 text-[#1DA1F2] hover:bg-[#1DA1F2]",
    facebook: "bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2]",
    instagram:
      "bg-gradient-to-br from-[#833AB4]/10 via-[#FD1D1D]/10 to-[#FCAF45]/10 text-[#FD1D1D] hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#FCAF45]",
    datacamp: "bg-[#03EF62]/10 text-[#03EF62] hover:bg-[#03EF62]",
  }

  // Create an array of social networks from the socialLinks object
  const socialNetworks = Object.entries(profile.socialLinks || {})
    .filter(([_, url]) => url && url.trim() !== "")
    .map(([key, url]) => ({
      key,
      url,
      icon: knownIcons[key] || <ExternalLink className={iconSize} />,
      color: knownColors[key] || "bg-gray-500/10 text-gray-500 hover:bg-gray-500",
    }))

  return (
    <div className={`flex gap-3 flex-wrap ${centered ? "justify-center" : ""} ${className}`}>
      {socialNetworks.map((network) => (
        <motion.a
          key={network.key}
          href={network.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${containerSize} ${network.color} rounded-full hover:text-white transition-colors`}
          whileHover={{ y: -5 }}
          whileTap={{ scale: 0.95 }}
          aria-label={`Visit ${network.key}`}
        >
          {network.icon}
        </motion.a>
      ))}
    </div>
  )
}
