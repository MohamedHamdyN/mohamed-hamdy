"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useTranslations } from "@/hooks/useTranslations"
import { useToast } from "@/components/ui/use-toast"
import { AlertCircle, Send, User, Mail, Type, MessageSquare, CheckCircle } from "lucide-react"

// Function to validate email domain
const isValidEmailDomain = (email: string) => {
  const domainPart = email.split("@")[1]
  if (!domainPart) return false

  // List of common email domains
  const commonDomains = [
    "gmail.com",
    "yahoo.com",
    "hotmail.com",
    "outlook.com",
    "aol.com",
    "icloud.com",
    "protonmail.com",
    "mail.com",
    "zoho.com",
    "yandex.com",
    "gmx.com",
    "live.com",
    "msn.com",
    "me.com",
    "mac.com",
  ]

  // Check if domain is common or has a valid format
  return commonDomains.includes(domainPart) || /^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+$/.test(domainPart)
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z
    .string()
    .email({
      message: "Please enter a valid email address.",
    })
    .refine(isValidEmailDomain, {
      message: "Please enter a valid email domain.",
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    setError(null)
    setIsSuccess(false)

    try {
      // Send the form through an API
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      const data = await response.json()

      if (response.ok) {
        setIsSuccess(true)
        toast({
          title: data.preview ? "Preview mode: Message simulated successfully" : t.contact.success,
          description: data.preview
            ? "In production, a real email will be sent."
            : "I'll get back to you soon with more details.",
          variant: "default",
        })
        form.reset()
      } else {
        throw new Error(data.error || "Failed to send email")
      }
    } catch (error) {
      console.error("Error sending email:", error)
      setError(error instanceof Error ? error.message : "Failed to send email. Please try again later.")
      toast({
        title: t.contact.error,
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
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6 flex items-start">
          <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
          <div>
            <p className="text-red-500 font-medium">Error</p>
            <p className="text-sm text-red-500/80">{error}</p>
          </div>
        </div>
      )}

      {isSuccess && (
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-6 flex items-start">
          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
          <div>
            <p className="text-green-500 font-medium">Message Sent!</p>
            <p className="text-sm text-green-500/80">Thank you for your message. I'll get back to you soon.</p>
          </div>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <div className="relative">
                    <FormLabel className="text-muted-foreground">{t.contact.form.name}</FormLabel>
                    <FormControl>
                      <div className="relative mt-2">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
                        <Input
                          placeholder="Mohamed Hamdy"
                          {...field}
                          className="pl-10 bg-background/40 border-border/50 focus-visible:ring-primary/30"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <div className="relative">
                    <FormLabel className="text-muted-foreground">{t.contact.form.email}</FormLabel>
                    <FormControl>
                      <div className="relative mt-2">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
                        <Input
                          placeholder="mohamed@example.com"
                          {...field}
                          className="pl-10 bg-background/40 border-border/50 focus-visible:ring-primary/30"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <div className="relative">
                  <FormLabel className="text-muted-foreground">{t.contact.form.subject}</FormLabel>
                  <FormControl>
                    <div className="relative mt-2">
                      <Type className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
                      <Input
                        placeholder="Project Inquiry"
                        {...field}
                        className="pl-10 bg-background/40 border-border/50 focus-visible:ring-primary/30"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <div className="relative">
                  <FormLabel className="text-muted-foreground">{t.contact.form.message}</FormLabel>
                  <FormControl>
                    <div className="relative mt-2">
                      <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground/60" />
                      <Textarea
                        placeholder="Tell me about your project..."
                        className="min-h-[150px] pl-10 bg-background/40 border-border/50 focus-visible:ring-primary/30"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full group relative overflow-hidden" disabled={isSubmitting}>
            <span className="absolute inset-0 w-0 bg-gradient-to-r from-primary to-blue-500 transition-all duration-500 ease-out group-hover:w-full"></span>
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isSubmitting ? "Sending..." : t.contact.form.submit}
              <Send className="h-4 w-4" />
            </span>
          </Button>
        </form>
      </Form>
    </motion.div>
  )
}
