"use client"

// تبسيط مكون use-toast لتجنب مشاكل التوافق
import { useState } from "react"

type ToastVariant = "default" | "destructive"

interface ToastProps {
  title: string
  description?: string
  variant?: ToastVariant
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const toast = (props: ToastProps) => {
    // في بيئة الإنتاج، يمكننا إضافة التنبيه إلى قائمة التنبيهات
    // ولكن للتبسيط، سنستخدم console.log فقط
    console.log(`Toast: ${props.title} - ${props.description || ""}`)

    // يمكننا أيضًا استخدام alert للاختبار
    // alert(`${props.title}\n${props.description || ""}`)
  }

  return { toast, toasts }
}
