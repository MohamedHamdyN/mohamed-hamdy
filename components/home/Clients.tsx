"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"

export default function Clients() {
  // Hardcoded translations
  const translations = {
    clients: {
      title: "Trusted By",
      description: "Companies and organizations I've worked with",
    },
  }

  // Hardcoded clients
  const clients = [
    {
      id: 1,
      name: "NovaTech Solutions",
      rating: 5,
      testimonial:
        "The data analysis provided crucial insights that helped us refine our digital transformation strategy.",
    },
    {
      id: 2,
      name: "Skyline Finance",
      rating: 5,
      testimonial: "The financial forecasting models helped us optimize our risk management and investment planning.",
    },
    {
      id: 3,
      name: "SwiftRetail",
      rating: 4,
      testimonial: "The customer segmentation analysis significantly improved our targeted marketing campaigns.",
    },
  ]

  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">{translations.clients.title || "Trusted By"}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {translations.clients.description || "Companies and organizations I've worked with"}
          </p>
        </motion.div>

        <div className="flex overflow-x-auto pb-8 hide-scrollbar">
          <div className="flex space-x-6">
            {clients.map((client) => (
              <motion.div
                key={client.id}
                className="flex-shrink-0 w-80 p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-300"
                whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.3)" }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full mr-4 flex items-center justify-center">
                    <span className="text-xl font-bold">{client.name.charAt(0)}</span>
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
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
