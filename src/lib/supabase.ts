import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Types for database tables
export interface ContactSubmission {
  id: string
  name: string
  email: string
  message: string
  created_at: string
}

// Contact form submission
export async function submitContactForm(data: {
  name: string
  email: string
  message: string
}) {
  // Check if Supabase is configured
  if (!supabase) {
    console.log('Contact form submission (Supabase not configured):', data)
    return { message: 'Thank you for your message! (Demo mode - Supabase not configured)' }
  }

  const { data: result, error } = await supabase
    .from('contacts')
    .insert([
      {
        name: data.name,
        email: data.email,
        message: data.message,
        created_at: new Date().toISOString(),
      },
    ])
    .select()

  if (error) {
    throw new Error(error.message)
  }

  return result
} 