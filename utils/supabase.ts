import { createClient } from '@supabase/supabase-js'
import type { Database } from 'database.types.ts'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://mock.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || 'mock-key'

export const supabase = createClient<Database>(supabaseUrl, supabaseKey)

export default supabase
