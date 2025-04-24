"use client"

import { useState } from "react"
import { toggleSettings } from "@/admin/toggle"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ToggleContactForm() {
  const [isEnabled, setIsEnabled] = useState(toggleSettings.contact_form)

  // En un entorno real, esto se guardaría en una base de datos o API
  const toggleContactForm = () => {
    const newValue = !isEnabled
    setIsEnabled(newValue)

    // Simulamos cambiar la configuración (en un entorno real, esto se guardaría)
    toggleSettings.contact_form = newValue

    // Recargamos la página para reflejar el cambio
    window.location.reload()
  }

  return (
    <Card className="w-full max-w-md mx-auto mb-8">
      <CardHeader>
        <CardTitle>Contact Form Settings</CardTitle>
        <CardDescription>Enable or disable the contact form on the Contact page</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          <Switch id="contact-form" checked={isEnabled} onCheckedChange={toggleContactForm} />
          <Label htmlFor="contact-form">{isEnabled ? "Contact Form is Enabled" : "Contact Form is Disabled"}</Label>
        </div>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        {isEnabled
          ? "Users can send you messages through the contact form."
          : "Users will see your contact information but cannot send messages through the form."}
      </CardFooter>
    </Card>
  )
}
