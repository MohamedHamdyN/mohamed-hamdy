"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

export default function SkipToContent() {
  const [focused, setFocused] = useState(false)

  return (
    <a
      href="#main-content"
      className={cn(
        "fixed top-4 left-4 z-50 bg-primary text-primary-foreground px-4 py-2 rounded-md transition-transform",
        focused ? "translate-y-0" : "-translate-y-20",
      )}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      Skip to content
    </a>
  )
}
