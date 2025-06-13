// lib/supabase/client.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const getSupabaseSession = async () => {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    console.error("Gagal mengambil session:", error.message);
    return null;
  }

  return data;
};
