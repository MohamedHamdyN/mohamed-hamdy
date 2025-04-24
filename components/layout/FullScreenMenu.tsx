"use client"

import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface MenuItem {
  name: string
  href: string
}

interface FullScreenMenuProps {
  isOpen: boolean
  onClose: () => void
  items: MenuItem[]
}

export default function FullScreenMenu({ isOpen, onClose, items }: FullScreenMenuProps) {
  const pathname = usePathname()

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-background z-40 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <nav className="text-center">
            {items.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className={`block text-4xl font-bold mb-6 transition-colors ${
                    pathname === item.href ? "text-primary" : "text-foreground hover:text-primary"
                  }`}
                  onClick={onClose}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
