import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables!');
  console.error('Make sure you have set:');
  console.error('- NEXT_PUBLIC_SUPABASE_URL');
  console.error('- NEXT_PUBLIC_SUPABASE_ANON_KEY');
  throw new Error('Missing Supabase environment variables');
}

// Create and export Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // We're not using auth for this simple form
  },
});

// Helper function to insert registration
export async function insertRegistration(data) {
  try {
    const { data: result, error } = await supabase
      .from('registrations')
      .insert([
        {
          name: data.name,
          email: data.email,
          whatsapp: data.whatsapp,
          why_campfire: data.whyCampfire,
        }
      ])
      .select();

    if (error) throw error;

    return { success: true, data: result };
  } catch (error) {
    console.error('Error inserting registration:', error);
    return { success: false, error: error.message };
  }
}

// Helper function to check if email already registered
export async function checkEmailExists(email) {
  try {
    const { data, error } = await supabase
      .from('registrations')
      .select('email')
      .eq('email', email)
      .single();

    if (error && error.code !== 'PGRST116') {
      // PGRST116 is "not found" error, which is expected
      throw error;
    }

    return { exists: !!data };
  } catch (error) {
    console.error('Error checking email:', error);
    return { exists: null, error: error.message };
  }
}

// Helper function to get registration count (if needed)
export async function getRegistrationCount() {
  try {
    const { count, error } = await supabase
      .from('registrations')
      .select('*', { count: 'exact', head: true });

    if (error) throw error;

    return { success: true, count };
  } catch (error) {
    console.error('Error getting count:', error);
    return { success: false, count: 0 };
  }
}

