// app/(main)/layout.tsx
import type { Metadata } from "next";
import AppHeader from "@/components/layout/header";
import AppFooter from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "El Mimbar - Public",
  description: "Halaman Publik El Mimbar",
};

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="main-layout">
      <AppHeader />
      {children}
      <AppFooter />
    </main>
  );
}
