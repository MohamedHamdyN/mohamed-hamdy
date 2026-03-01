'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { getClients } from '@/app/actions/cms'
import { useTranslations } from '@/hooks/useTranslations'
import { useLanguage } from '@/context/language-context'
import Image from 'next/image'
import { Star, ExternalLink, FileCode } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Client } from '@/lib/db'

export default function Clients() {
  const t = useTranslations()
  const { isRTL } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)
  const [clients, setClients] = useState<Client[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100])

  useEffect(() => {
    async function loadClients() {
      try {
        const data = await getClients()
        // Filter enabled clients
        const enabledClients = data.filter((client) => client.enabled !== false)
        setClients(enabledClients)
      } catch (error) {
        console.error('Error loading clients:', error)
        setClients([])
      } finally {
        setIsLoading(false)
      }
    }

    loadClients()
  }, [])

  if (isLoading) {
    return (
      <section ref={containerRef} className="py-20 bg-background overflow-hidden">
        <div className="container mx-auto px-4 text-center text-slate-400">Loading clients...</div>
      </section>
    )
  }

  if (clients.length === 0) {
    return (
      <section ref={containerRef} className="py-20 bg-background overflow-hidden">
        <div className="container mx-auto px-4 text-center text-slate-400">No clients to display</div>
      </section>
    )
  }

  return (
    <section ref={containerRef} className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div className="text-center mb-16" style={{ opacity, y }}>
          <h2 className="text-3xl font-bold mb-4">{t?.clients?.title || "Trusted By"}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t?.clients?.description || "Companies and organizations I've worked with"}
          </p>
        </motion.div>

        <div className="flex overflow-x-auto pb-8 hide-scrollbar">
          <div className="flex space-x-6 animate-scroll">
            {clients.map((client) => (
              <motion.div
                key={client.id}
                className="flex-shrink-0 w-80 p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-300"
                whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.3)" }}
              >
                <div className="flex items-center mb-4">
                  <div className="relative w-16 h-16 mr-4 overflow-hidden rounded-full">
                    <Image
                      src={client.logo_url || '/placeholder.svg'}
                      alt={client.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{client.name}</h3>
                    <div className="flex mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < client.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                {client.testimonial && <p className="text-muted-foreground italic mb-4">"{client.testimonial}"</p>}

                <div className="flex flex-col gap-2">
                  {client.website && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full flex items-center justify-center gap-2"
                      onClick={() => window.open(client.website!, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4" />
                      Visit Website
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
