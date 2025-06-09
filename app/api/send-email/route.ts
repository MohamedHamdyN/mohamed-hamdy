import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json()

    // Get environment variables
    const resendApiKey = process.env.RESEND_API_KEY
    const resendFromEmail = process.env.RESEND_FROM_EMAIL
    const resendToEmail = process.env.RESEND_TO_EMAIL

    // Check if required environment variables are available
    if (!resendApiKey || !resendFromEmail || !resendToEmail) {
      console.log("Resend configuration is missing, using fallback")

      // Return success in preview mode or when environment variables are missing
      return NextResponse.json({
        success: true,
        preview: true,
        message: "Email would be sent in production environment",
      })
    }

    // Check if we're in development/preview environment
    const isPreview = process.env.VERCEL_ENV === "preview" || process.env.NODE_ENV === "development"

    if (isPreview) {
      console.log("Preview mode: simulating email send")
      console.log({
        to: resendToEmail,
        subject: `Contact Form: ${subject}`,
        from: resendFromEmail,
        name,
        email,
        message,
      })

      // Simulate a delay and return success in preview
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return NextResponse.json({ success: true, preview: true })
    }

    // For production, we'll use a simple fetch approach instead of Resend SDK
    // to avoid potential SSR issues
    const emailData = {
      from: `Contact Form <${resendFromEmail}>`,
      to: resendToEmail,
      subject: `Contact Form: ${subject}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    }

    // Use fetch instead of Resend SDK to avoid SSR issues
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log("Email sent: ", data)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
