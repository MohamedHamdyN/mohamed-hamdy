'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { getClients } from '@/app/actions/cms'
import { useTranslations } from '@/hooks/useTranslations'
import { useLanguage } from '@/context/language-context'
import Image from 'next/image'
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

        <style>{`
          @keyframes scroll-infinite {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          
          .clients-track {
            display: flex;
            gap: 1rem;
            animation: scroll-infinite 40s linear infinite;
          }
          
          .clients-track:hover {
            animation-play-state: paused;
          }
          
          .client-item {
            flex: 0 0 calc(25% - 0.75rem);
            min-width: 200px;
          }
          
          @media (max-width: 1024px) {
            .client-item {
              flex: 0 0 calc(33.333% - 0.67rem);
            }
          }
          
          @media (max-width: 640px) {
            .client-item {
              flex: 0 0 calc(50% - 0.5rem);
            }
          }
        `}</style>
        
        <div className="overflow-hidden rounded-lg">
          <motion.div 
            className="clients-track"
            style={{ opacity, y }}
          >
            {[...clients, ...clients, ...clients].map((client, index) => (
              <motion.a
                key={`${client.id}-${index}`}
                href={client.website || '#'}
                target={client.website ? '_blank' : undefined}
                rel={client.website ? 'noopener noreferrer' : undefined}
                className="client-item group flex flex-col items-center justify-center p-6 rounded-lg border border-border bg-card hover:border-primary/50 hover:bg-card/80 transition-all duration-300 cursor-pointer"
                whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)" }}
              >
                <div className="relative w-20 h-20 mb-4 overflow-hidden rounded-lg">
                  <Image
                    src={client.logo_url || '/placeholder.svg'}
                    alt={client.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                </div>
                <h3 className="text-center font-semibold text-sm sm:text-base group-hover:text-primary transition-colors">
                  {client.name}
                </h3>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
