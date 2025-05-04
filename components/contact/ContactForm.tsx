"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { useTranslations } from "@/hooks/useTranslations"
import { useToast } from "@/components/ui/use-toast"
import { AlertCircle, Send, User, Mail, Type, MessageSquare, CheckCircle } from "lucide-react"

// تعريف مخطط التحقق من صحة النموذج
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(25, {
    message: "Message must be at least 25 characters.",
  }),
})

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const t = useTranslations()
  const { toast } = useToast()

  // تبسيط استخدام useForm بدون استخدام zodResolver مباشرة
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  async function onSubmit(values: any) {
    setIsSubmitting(true)
    setError(null)
    setIsSuccess(false)

    try {
      // محاكاة إرسال النموذج
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // نجاح وهمي
      setIsSuccess(true)
      toast({
        title: t.contact.success || "Message sent successfully!",
        description: "I'll get back to you soon with more details.",
        variant: "default",
      })
      form.reset()
    } catch (error) {
      console.error("Error sending email:", error)
      setError("Failed to send email. Please try again later.")
      toast({
        title: t.contact.error || "Error sending message",
        description: "Please try again or contact me directly.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      id="contact-form"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-card p-8 rounded-xl border border-border shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-6 text-primary">Get in Touch</h2>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6 flex items-start" role="alert">
          <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" aria-hidden="true" />
          <div>
            <p className="text-red-500 font-medium">Error</p>
            <p className="text-sm text-red-500/80">{error}</p>
          </div>
        </div>
      )}

      {isSuccess && (
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-6 flex items-start" role="alert">
          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" aria-hidden="true" />
          <div>
            <p className="text-green-500 font-medium">Message Sent!</p>
            <p className="text-sm text-green-500/80">Thank you for your message. I'll get back to you soon.</p>
          </div>
        </div>
      )}

      {/* استخدام نموذج HTML تقليدي بدلاً من مكون Form من shadcn/ui */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1">
              {t.contact.form.name || "Name"}
            </label>
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60"
                aria-hidden="true"
              />
              <input
                id="name"
                {...form.register("name", { required: "Name is required" })}
                placeholder="Mohamed Hamdy"
                className="w-full pl-10 py-2 bg-background/40 border border-border/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30"
                aria-required="true"
              />
            </div>
            {form.formState.errors.name && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">
              {t.contact.form.email || "Email"}
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60"
                aria-hidden="true"
              />
              <input
                id="email"
                type="email"
                {...form.register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                placeholder="mohamed@example.com"
                className="w-full pl-10 py-2 bg-background/40 border border-border/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30"
                aria-required="true"
              />
            </div>
            {form.formState.errors.email && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-muted-foreground mb-1">
            {t.contact.form.subject || "Subject"}
          </label>
          <div className="relative">
            <Type
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60"
              aria-hidden="true"
            />
            <input
              id="subject"
              {...form.register("subject", { required: "Subject is required" })}
              placeholder="Project Inquiry"
              className="w-full pl-10 py-2 bg-background/40 border border-border/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30"
              aria-required="true"
            />
          </div>
          {form.formState.errors.subject && (
            <p className="text-red-500 text-sm mt-1">{form.formState.errors.subject.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-1">
            {t.contact.form.message || "Message"}
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground/60" aria-hidden="true" />
            <textarea
              id="message"
              {...form.register("message", { required: "Message is required" })}
              placeholder="Tell me about your project..."
              className="w-full min-h-[150px] pl-10 py-2 bg-background/40 border border-border/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30"
              aria-required="true"
            />
          </div>
          {form.formState.errors.message && (
            <p className="text-red-500 text-sm mt-1">{form.formState.errors.message.message}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full group relative overflow-hidden"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          <span className="absolute inset-0 w-0 bg-gradient-to-r from-primary to-blue-500 transition-all duration-500 ease-out group-hover:w-full"></span>
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isSubmitting ? "Sending..." : t.contact.form.submit || "Send Message"}
            <Send className="h-4 w-4" aria-hidden="true" />
          </span>
        </Button>
      </form>
    </motion.div>
  )
}
