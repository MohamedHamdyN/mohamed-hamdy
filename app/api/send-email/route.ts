import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json()

    // Get environment variables
    const emailUser = process.env.EMAIL_USER
    const emailPass = process.env.EMAIL_PASSWORD
    const workEmail = process.env.WORK_EMAIL

    // Check if required environment variables are available
    if (!emailUser || !emailPass || !workEmail) {
      console.log("Email configuration is missing, using fallback")

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
        to: workEmail,
        subject: `Contact Form: ${subject}`,
        from: emailUser,
        name,
        email,
        message,
      })

      // Simulate a delay and return success in preview
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return NextResponse.json({ success: true, preview: true })
    }

    // Configure nodemailer transport for production
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    })

    // Configure email
    const mailOptions = {
      from: emailUser,
      to: workEmail,
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

    // Send email
    const info = await transporter.sendMail(mailOptions)
    console.log("Email sent: ", info.response)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
