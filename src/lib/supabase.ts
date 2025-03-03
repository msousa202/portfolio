import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

// Create a mock client if the environment variables are not set properly
const isMockClient = !import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Add a console warning if using mock client
if (isMockClient) {
  console.warn(
    'Supabase client initialized with placeholder values. The newsletter subscription feature will not work. ' +
    'Please set the VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables in a .env file.'
  );
}
