"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getSupabaseSession } from "@/lib/supabase/client";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { session }: any = await getSupabaseSession();
      console.log(session);
      if (!session) router.push("/login");
    };

    checkSession();
  }, []);

  return <main className="min-h-screen dashboard-layout">{children}</main>;
}
