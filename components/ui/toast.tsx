"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ToastProps {
  title: string
  description?: string
  variant?: "default" | "destructive"
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function Toast({ title, description, variant = "default", open: openProp, onOpenChange }: ToastProps) {
  const [open, setOpen] = useState(openProp || false)

  useEffect(() => {
    if (openProp !== undefined) {
      setOpen(openProp)
    }
  }, [openProp])

  const handleClose = () => {
    setOpen(false)
    onOpenChange?.(false)
  }

  // إذا كان مغلقًا، لا تعرض شيئًا
  if (!open) return null

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 z-50 max-w-md rounded-lg border p-4 shadow-md",
        variant === "destructive"
          ? "border-red-500/30 bg-red-500/10 text-red-500"
          : "border-green-500/30 bg-green-500/10 text-green-500",
      )}
      role="alert"
    >
      <div className="flex items-start gap-2">
        <div className="flex-1">
          <h3 className="font-medium">{title}</h3>
          {description && <p className="text-sm opacity-90 mt-1">{description}</p>}
        </div>
        <button onClick={handleClose} className="rounded-full p-1 hover:bg-background/20" aria-label="Close">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

export function Toaster() {
  // هذا المكون يمكن استخدامه لعرض قائمة من التنبيهات
  // ولكن للتبسيط، سنتركه فارغًا
  return null
}
