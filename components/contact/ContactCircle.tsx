"use client"

import { motion } from "framer-motion"
import { profile } from "@/admin/profile"
import Image from "next/image"

export default function ContactCircle() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-card p-8 rounded-xl border border-border flex items-center justify-center"
    >
      <div className="relative h-96 flex items-center justify-center">
        <motion.div
          className="absolute w-80 h-80 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full"
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 5, 0],
            borderRadius: ["50%", "45%", "50%"],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        <motion.div
          className="absolute w-72 h-72 bg-card rounded-full flex items-center justify-center overflow-hidden"
          animate={{
            scale: [1, 1.03, 1],
            rotate: [0, -3, 0],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 0.5,
          }}
        >
          <div className="relative z-10 text-center p-6">
            {/* Logo circular */}
            <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-primary/20">
              {profile.logo ? (
                <Image
                  src={profile.logo || "/placeholder.svg"}
                  alt={profile.name}
                  width={128}
                  height={128}
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                  <motion.span
                    className="text-3xl font-bold text-primary"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  >
                    MH
                  </motion.span>
                </div>
              )}
            </div>

            {/* Nombre con estilo mejorado */}
            <motion.h3
              className="text-2xl font-bold mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
              }}
            >
              {profile.name}
            </motion.h3>

            {/* Email */}
            <p className="text-muted-foreground hover:text-primary transition-colors">
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </p>
          </div>
        </motion.div>

        {/* Partículas animadas */}
        <motion.div
          className="absolute w-3 h-3 bg-primary rounded-full"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
        />

        <motion.div
          className="absolute w-2 h-2 bg-secondary rounded-full"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            delay: 1,
          }}
        />

        <motion.div
          className="absolute w-4 h-4 bg-accent rounded-full"
          animate={{
            x: [0, 30, 0],
            y: [0, 30, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            delay: 2,
          }}
        />
      </div>
    </motion.div>
  )
}
