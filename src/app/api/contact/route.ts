import { NextRequest, NextResponse } from 'next/server'
import { submitContactForm } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // Submit to Supabase
    const result = await submitContactForm({ name, email, message })

    // You could also send an email notification here using a service like Resend, SendGrid, etc.

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message! I will get back to you soon.',
      data: result,
    })
  } catch (error) {
    console.error('Contact form submission error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    )
  }
} 