"use client";

import { useRouter } from "next/navigation";
import { useSupabaseSession } from "@/hooks/useSupabaseSession";
import LogoutButton from "./LogoutButton";

export default function DashboardPage() {
  const router = useRouter();
  const { session, loading } = useSupabaseSession();

  if (loading) {
    setTimeout(() => {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <p>loading...</p>
        </div>
      );
    }, 200);
  } else {
    if (!session) {
      setTimeout(() => {
        return router.push("/login");
      }, 100);
    } else {
      return (
        <div className="p-8">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Halo, {session.user.email}</p>

          <div className="mt-6">
            <LogoutButton />
          </div>
        </div>
      );
    }
  }
}
