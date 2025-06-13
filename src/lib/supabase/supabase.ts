import { createClient } from "@supabase/supabase-js";
import type { MasjidProfile, MasjidAnnouncement } from "@/types";

// Ensure these environment variables are set in your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabaseInstance;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Supabase URL or Anon Key is missing. Using placeholder values. " +
      "Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables."
  );
  // Use placeholder values to allow the app to run without actual Supabase connection
  supabaseInstance = createClient("http://localhost:54321", "placeholder.anon.key", {
    auth: {
      persistSession: false, // Do not attempt to persist session with dummy client
    },
    // Disable realtime if using placeholders, or handle it gracefully
    realtime: {
      params: {
        eventsPerSecond: 0, // Effectively disables realtime
      },
    },
  });
} else {
  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
}

export const supabase = supabaseInstance;

// Helper functions to fetch data (Server-side)

export async function getMasjidProfile(): Promise<MasjidProfile | null> {
  if (!supabaseUrl || !supabaseAnonKey) {
    // Return mock data if Supabase is not configured
    console.log("Supabase not configured, returning mock MasjidProfile data.");
    return {
      id: "mock-profile-id",
      mosque_name: "Masjid Al-Mock",
      slogan: "Portal Informasi Mock Masjid",
      hero_image_url: "https://placehold.co/1200x500.png",
      intro_text: "Ini adalah data mock karena Supabase belum dikonfigurasi. Silakan atur variabel lingkungan Anda.",
      donation_bank_name: "Bank Mock Syariah",
      donation_account_number: "0000-0000-0000",
      donation_account_holder_name: "Yayasan Mock Masjid",
      donation_contact_for_confirmation: "0812-0000-0000",
    };
  }
  const { data, error } = await supabase.from("masjid_profiles").select("*").maybeSingle(); // Use maybeSingle if you expect 0 or 1 row

  if (error) {
    console.error("Error fetching masjid profile:", error);
    return null;
  }
  return data;
}

export async function getLatestAnnouncements(limit: number = 5): Promise<MasjidAnnouncement[]> {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.log("Supabase not configured, returning mock MasjidAnnouncement data.");
    return [
      {
        id: "mock-ann-1",
        title: "Pengumuman Mock 1",
        content: "Ini adalah konten pengumuman mock pertama.",
        created_at: new Date().toISOString(),
      },
      {
        id: "mock-ann-2",
        title: "Pengumuman Mock 2",
        content: "Ini adalah konten pengumuman mock kedua.",
        created_at: new Date().toISOString(),
      },
    ];
  }
  const { data, error } = await supabase
    .from("masjid_announcements")
    .select("id, title, content, created_at")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching announcements:", error);
    return [];
  }
  return data || [];
}

// Donation info is part of masjid_profiles as per simplification
export async function getDonationInfo(): Promise<Partial<MasjidProfile> | null> {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.log("Supabase not configured, returning mock DonationInfo data.");
    return {
      donation_bank_name: "Bank Mock Syariah",
      donation_account_number: "0000-0000-0000",
      donation_account_holder_name: "Yayasan Mock Masjid",
      donation_contact_for_confirmation: "0812-0000-0000",
    };
  }
  const profile = await getMasjidProfile();
  if (!profile) return null;
  return {
    donation_bank_name: profile.donation_bank_name,
    donation_account_number: profile.donation_account_number,
    donation_account_holder_name: profile.donation_account_holder_name,
    donation_contact_for_confirmation: profile.donation_contact_for_confirmation,
  };
}
