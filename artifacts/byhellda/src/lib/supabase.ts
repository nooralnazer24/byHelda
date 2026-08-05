import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://xjozbweincrtaabwxut.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhqb3pid2VpbmNxcnRhYWJ3eHV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUxNzQ0NTEsImV4cCI6MjEwMDc1MDQ1MX0.fZ334izhEK3EDiZiNi7FIzWEotCGIESs6BXv20peVSU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);