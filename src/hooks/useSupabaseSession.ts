// hooks/useSupabaseSession.ts
import { useEffect, useState } from "react";
import { getSupabaseSession } from "@/lib/supabase/client";

export const useSupabaseSession = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const data = await getSupabaseSession();
      if (data) {
        setSession(data?.session);
      } else {
        setError("Tidak ada session");
      }
      setLoading(false);
    };

    fetchSession();
  }, []);

  return { session, loading, error };
};
