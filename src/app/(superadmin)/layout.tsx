"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
// import { getSupabaseSession } from "@/lib/supabase/client";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {}, []);

  return <main className="min-h-screen admin-layout">{children}</main>;
}
