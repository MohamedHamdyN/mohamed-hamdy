"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { useTranslations } from "@/hooks/useTranslations"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/context/language-context"

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
})

export default function NewsletterSubscribe() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const t = useTranslations()
  const { toast } = useToast()
  const { language } = useLanguage()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      console.log(values)
      setIsSubmitting(false)
      toast({
        title: t.newsletter.success,
        description: new Date().toLocaleTimeString(),
      })
      form.reset()
    }, 2000)
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-8 shadow-lg max-w-3xl mx-auto"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">{t.newsletter.title}</h2>
          <p className="text-muted-foreground mb-6 text-center">{t.newsletter.description}</p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input placeholder={t.newsletter.placeholder} {...field} className="rounded-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="rounded-full" disabled={isSubmitting}>
                {isSubmitting ? "..." : t.newsletter.submit}
              </Button>
            </form>
          </Form>
        </motion.div>
      </div>
    </section>
  )
}
