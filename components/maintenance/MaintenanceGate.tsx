"use client"

import { useMemo } from "react"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import { ExternalLink } from "lucide-react"

type SocialItem = {
  id: number
  platform: string
  url: string
  enabled: boolean
  order: number
}

type MaintenanceData = {
  name: string
  title: string
  shortTitle?: string
  heroDescription?: string
  heroImageType?: string
  heroImageUrl?: string
  socialLinks: SocialItem[]
}

export default function MaintenanceGate({
  enabled,
  data,
  children,
}: {
  enabled: boolean
  data: MaintenanceData
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith("/admin")

  if (!enabled || isAdmin) return <>{children}</>

  const links = useMemo(() => {
    const sorted = [...(data.socialLinks ?? [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    return sorted.filter((x) => x?.enabled !== false && x?.url)
  }, [data.socialLinks])

  const titleLine = data.shortTitle?.trim() ? data.shortTitle.trim() : data.title

  return (
    <div className="relative isolate overflow-hidden bg-background min-h-screen flex items-center">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-[10%] w-[500px] h-[500px] bg-primary/10 rounded-full filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 right-[10%] w-[600px] h-[600px] bg-secondary/10 rounded-full filter blur-3xl opacity-20"></div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40 w-full">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0">
          <motion.p
            className="text-base font-semibold leading-7 text-primary"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            Hello, I&apos;m
          </motion.p>

          <motion.h1
            className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-6xl"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
          >
            <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-400 to-secondary">
              {data.name}
            </span>
          </motion.h1>

          <motion.h2
            className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl min-h-[40px] text-primary"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.12 }}
          >
            {titleLine}
          </motion.h2>

          <motion.p
            className="mt-6 text-lg leading-8 text-muted-foreground max-w-xl"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.18 }}
          >
            {data.heroDescription?.trim()
              ? data.heroDescription
              : "This website is temporarily in maintenance mode. Please check back soon."}
          </motion.p>

          {/* Social Icons بدل الأزرار */}
          <motion.div
            className="mt-10 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.25 }}
          >
            {links.length === 0 ? (
              <div className="text-muted-foreground text-sm">No social links configured.</div>
            ) : (
              links.map((x) => (
                <a
                  key={x.id}
                  href={x.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-full bg-card border border-border hover:border-primary/40 transition flex items-center gap-2 text-sm"
                  aria-label={x.platform}
                >
                  <span className="capitalize">{x.platform}</span>
                  <ExternalLink className="h-4 w-4 opacity-70" />
                </a>
              ))
            )}
          </motion.div>
        </div>

        {/* Right image circle (logo/avatar) */}
        <motion.div
          className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <div className="relative h-[280px] w-[280px] sm:h-[360px] sm:w-[360px]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full rounded-full overflow-hidden border border-border/60 bg-card/40 backdrop-blur">
                  {data.heroImageUrl ? (
                    <Image
                      src={data.heroImageUrl}
                      alt={data.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 280px, 360px"
                      unoptimized
                      priority
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-6xl font-bold text-primary">
                        {data.name?.slice(0, 1)?.toUpperCase() || "M"}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}