"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getLatestAnnouncements } from "@/lib/supabase/supabase";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Megaphone, AlertCircle, X } from "lucide-react";
import Image from "next/image";
import { dummyAnnouncements } from "./dummyData";

// Define TypeScript interfaces
export interface Announcement {
  id: number;
  title: string;
  description: string;
  date: string;
  image?: string;
}

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

  useEffect(() => {
    async function fetchAnnouncements() {
      try {
        const data = await getLatestAnnouncements(5);
        if (data && Array.isArray(data) && data.length > 0) {
          setAnnouncements(
            data.map((item: any) => ({
              id: item.id,
              title: item.title,
              description: item.description ?? "",
              date: item.date ?? "",
              image: item.image,
            }))
          );
        } else {
          setAnnouncements(dummyAnnouncements);
        }
      } catch (error) {
        console.error("Error fetching announcements:", error);
        setError("Gagal memuat pengumuman. Silakan coba lagi nanti.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchAnnouncements();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-3xl mx-auto space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="text-center">
          <div className="flex items-center justify-center mb-4">
            <motion.div
              className="bg-primary/10 rounded-full p-2 mr-3"
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Megaphone className="w-8 h-8 text-primary" />
            </motion.div>
            <h1 className="font-headline text-3xl md:text-4xl font-semibold text-primary">
              Berita & Pengumuman Masjid Al-Ikhlas
            </h1>
          </div>
          <div className="w-24 h-1 bg-primary/20 rounded-full mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-loose">
            Tetap terhubung dengan kabar terbaru dari Masjid Al-Ikhlas. Ikuti pengumuman kami untuk mengetahui jadwal
            kajian, kegiatan kemasjidan, dan berita penting lainnya. Bersama, mari kita wujudkan semangat ukhuwah dalam
            kebersamaan menuju keberkahan.
          </p>
        </motion.div>

        <Separator className="bg-muted/50" />

        <motion.div variants={itemVariants}>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12 bg-card/80 backdrop-blur-sm border border-muted rounded-lg">
              <AlertCircle className="w-12 h-12 mx-auto text-red-500 mb-4" />
              <p className="text-lg text-red-500 mb-4">{error}</p>
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                onClick={() => window.location.reload()}
              >
                Coba Lagi 🔄
              </Button>
            </div>
          ) : announcements.length > 0 ? (
            <div className="space-y-4 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent scrollbar-thumb-rounded-md pr-2">
              {announcements.map((announcement) => (
                <motion.div
                  key={announcement.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.01, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="p-5 bg-card/80 backdrop-blur-sm border border-muted rounded-lg cursor-pointer hover:bg-card/90"
                  onClick={() => setSelectedAnnouncement(announcement)}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 bg-primary/10 rounded-full p-2">
                      <span className="text-lg">📜</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-primary">{announcement.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {new Date(announcement.date).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-card/80 backdrop-blur-sm border border-muted rounded-lg">
              <AlertCircle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-xl text-muted-foreground">Belum ada pengumuman saat ini 😊.</p>
            </div>
          )}
        </motion.div>

        <Separator className="bg-muted/50 mt-6" />
      </motion.div>

      <AnimatePresence>
        {selectedAnnouncement && (
          <Dialog open={!!selectedAnnouncement} onOpenChange={() => setSelectedAnnouncement(null)}>
            <DialogContent className="max-w-lg bg-card/90 backdrop-blur-sm border-muted">
              <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit">
                <DialogHeader className="relative">
                  <DialogTitle className="text-xl text-primary flex items-center">
                    <Megaphone className="w-5 h-5 mr-2" />
                    {selectedAnnouncement.title}
                  </DialogTitle>
                </DialogHeader>
                <div className="mt-4 space-y-4">
                  {selectedAnnouncement.image && (
                    <div className="relative h-48 rounded-lg overflow-hidden">
                      <Image
                        src={selectedAnnouncement.image}
                        alt={selectedAnnouncement.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <p className="text-sm text-muted-foreground">
                    {new Date(selectedAnnouncement.date).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-base text-foreground leading-relaxed">{selectedAnnouncement.description}</p>
                </div>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}
