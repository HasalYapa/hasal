import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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