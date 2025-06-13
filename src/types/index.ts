export interface MasjidProfile {
  id: string;
  mosque_name?: string | null;
  slogan?: string | null;
  hero_image_url?: string | null;
  intro_text?: string | null;
  donation_bank_name?: string | null;
  donation_account_number?: string | null;
  donation_account_holder_name?: string | null;
  donation_contact_for_confirmation?: string | null;
  // location_latitude and location_longitude might be useful for prayer time APIs
  // location_latitude?: number | null;
  // location_longitude?: number | null;
}

export interface MasjidAnnouncement {
  id: string;
  title: string;
  content: string;
  created_at: string; // ISO date string
}

export interface PrayerTime {
  name: string;
  time: string;
}
