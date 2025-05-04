import { NextResponse } from "next/server"
import { Resend } from "resend"
import { profile } from "@/admin/profile"

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if we're in preview mode (no API key)
    const isPreview = !process.env.RESEND_API_KEY

    if (isPreview) {
      console.log("Preview mode: Email would be sent with:", {
        name,
        email,
        subject,
        message,
      })

      return NextResponse.json(
        {
          success: true,
          preview: true,
          message: "Email would be sent in production mode",
        },
        { status: 200 },
      )
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || `${profile.name} <onboarding@resend.dev>`,
      to: process.env.RESEND_TO_EMAIL || email,
      subject: `Contact Form: ${subject}`,
      reply_to: email,
      text: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
      `,
      html: `
<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #3B82F6;">New Contact Form Submission</h2>
  <p><strong>Name:</strong> ${name}</p>
  <p><strong>Email:</strong> ${email}</p>
  <p><strong>Subject:</strong> ${subject}</p>
  <div style="margin-top: 20px; padding: 15px; background-color: #f9fafb; border-radius: 5px;">
    <p style="margin-top: 0;"><strong>Message:</strong></p>
    <p style="white-space: pre-wrap;">${message}</p>
  </div>
  <p style="margin-top: 20px; font-size: 12px; color: #6b7280;">
    This email was sent from the contact form on ${profile.name}'s portfolio website.
  </p>
</div>
      `,
    })

    if (error) {
      console.error("Error sending email:", error)
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
    }

    return NextResponse.json({ success: true, data }, { status: 200 })
  } catch (error) {
    console.error("Error in contact API route:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
