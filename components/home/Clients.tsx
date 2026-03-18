'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getClients } from '@/app/actions/cms'
import { useTranslations } from '@/hooks/useTranslations'
import { useLanguage } from '@/context/language-context'
import Image from 'next/image'
import { Client } from '@/lib/db'

export default function Clients() {
  const t = useTranslations()
  const { isRTL } = useLanguage()
  const [clients, setClients] = useState<Client[]>([])
  const [isLoading, setIsLoading] = useState(true)

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
      <section className="py-20 bg-background overflow-hidden">
        <div className="container mx-auto px-4 text-center text-slate-400">Loading clients...</div>
      </section>
    )
  }

  if (clients.length === 0) {
    return (
      <section className="py-20 bg-background overflow-hidden">
        <div className="container mx-auto px-4 text-center text-slate-400">No clients to display</div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
            {t?.clients?.title || "Trusted By"}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
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
          <div 
            className="clients-track"
          >
            {[...clients, ...clients, ...clients].map((client, index) => (
              <a
                key={`${client.id}-${index}`}
                href={client.website || '#'}
                target={client.website ? '_blank' : undefined}
                rel={client.website ? 'noopener noreferrer' : undefined}
                className="client-item group flex flex-col items-center justify-center p-6 rounded-xl border border-border/40 bg-gradient-to-br from-card/80 to-card hover:border-primary/50 hover:from-card hover:to-card/70 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
              >
                <div className="relative w-20 h-20 mb-4 overflow-hidden rounded-lg bg-muted/30 flex items-center justify-center">
                  <Image
                    src={client.logo_url || '/placeholder.svg'}
                    alt={client.name}
                    fill
                    className="object-contain group-hover:scale-110 transition-transform duration-300 p-2"
                    unoptimized
                  />
                </div>
                <h3 className="text-center font-semibold text-sm sm:text-base group-hover:text-primary transition-colors">
                  {client.name}
                </h3>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
