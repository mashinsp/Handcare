import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, company, country, product, quantity, message } = body

    // Validate required fields
    if (!name || !email || !phone || !country || !product || !quantity) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Map product ID to readable name
    const productNames: { [key: string]: string } = {
      'working-gloves': 'Working Gloves',
      'welding-gloves': 'Welding Gloves',
      'mechanical-gloves': 'Mechanical Gloves',
      'gardening-gloves': 'Gardening Gloves',
      'riding-gloves': 'Riding Gloves',
      'canadian-gloves': 'Canadian Gloves',
      'multiple': 'Multiple Products',
      'custom': 'Custom Requirements',
    }

    const productName = productNames[product] || product

    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    // Email content
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'handcare514@gmail.com',
      subject: `New Quote Request from ${name} - ${productName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #111827; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
            New Quote Request
          </h2>
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <h3 style="color: #111827; margin-top: 0;">Contact Information</h3>
            <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p style="margin: 10px 0;"><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
            ${company ? `<p style="margin: 10px 0;"><strong>Company:</strong> ${company}</p>` : ''}
            <p style="margin: 10px 0;"><strong>Country:</strong> ${country}</p>
            
            <h3 style="color: #111827; margin-top: 20px;">Quote Details</h3>
            <p style="margin: 10px 0;"><strong>Product of Interest:</strong> ${productName}</p>
            <p style="margin: 10px 0;"><strong>Estimated Quantity:</strong> ${quantity}</p>
            
            ${message ? `
              <h3 style="color: #111827; margin-top: 20px;">Additional Requirements or Questions</h3>
              <div style="background-color: white; padding: 15px; border-radius: 4px; margin-top: 10px; border-left: 4px solid #111827;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            ` : ''}
          </div>
          <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">
            This email was sent from the Handcare website quote request form.
          </p>
        </div>
      `,
      replyTo: email,
    }

    // Send email
    await transporter.sendMail(mailOptions)

    return NextResponse.json(
      { message: 'Quote request sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Quote form error:', error)
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    )
  }
}

