import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseKey = (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY) as string | undefined;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);
export const isAuthRedirectConfigured =
  isSupabaseConfigured && import.meta.env.VITE_SUPABASE_REDIRECTS_READY === "true";

let browserClient: SupabaseClient | null | undefined;

export function getSupabaseClient() {
  if (typeof window === "undefined" || !isSupabaseConfigured) return null;

  if (browserClient === undefined) {
    browserClient = createClient(supabaseUrl!, supabaseKey!, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
  }

  return browserClient;
}
