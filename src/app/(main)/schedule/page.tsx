"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getCurrentMasehiDate, getCurrentHijriDate } from "@/lib/date-utils";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, AlertCircle } from "lucide-react";

export interface PrayerTime {
  name: string;
  time: string;
}

// Static fallback prayer times
const staticPrayerTimes: PrayerTime[] = [
  { name: "Subuh", time: "04:45" },
  { name: "Terbit", time: "06:05" },
  { name: "Dzuhur", time: "12:15" },
  { name: "Ashar", time: "15:30" },
  { name: "Maghrib", time: "18:20" },
  { name: "Isya", time: "19:35" },
];

export default function SchedulePage() {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>(staticPrayerTimes);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState<string>("Jakarta");
  const [coords, setCoords] = useState<{ lat: number; long: number } | null>(null);

  const masehiDate = getCurrentMasehiDate();
  const hijriDate = getCurrentHijriDate();

  // Sample city options (can be expanded)
  const cities = ["Jakarta", "Bandung", "Surabaya", "Medan", "Makassar", "Malang", "Jember", "Palembang", "Semarang"];

  useEffect(() => {
    // Attempt to get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({ lat: position.coords.latitude, long: position.coords.longitude });
        },
        () => {
          console.warn("Geolocation access denied, using default city.");
          fetchPrayerTimes();
        }
      );
    } else {
      fetchPrayerTimes();
    }
  }, []);

  useEffect(() => {
    if (coords || city) {
      fetchPrayerTimes();
    }
  }, [coords, city]);

  const fetchPrayerTimes = async () => {
    setIsLoading(true);
    setError(null);
    try {
      let url = `https://api.aladhan.com/v1/timings/${new Date().toISOString().split("T")[0]}?method=2`;
      if (coords) {
        url += `&latitude=${coords.lat}&longitude=${coords.long}`;
      } else {
        url += `&city=${city}&country=Indonesia`;
      }

      const response = await fetch(url);
      if (!response.ok) throw new Error("Gagal memuat jadwal shalat.");
      const data = await response.json();

      const timings = data.data.timings;
      setPrayerTimes([
        { name: "Subuh", time: timings.Fajr },
        { name: "Terbit", time: timings.Sunrise },
        { name: "Dzuhur", time: timings.Dhuhr },
        { name: "Ashar", time: timings.Asr },
        { name: "Maghrib", time: timings.Maghrib },
        { name: "Isya", time: timings.Isha },
      ]);
    } catch (err) {
      console.error("Error fetching prayer times:", err);
      setError("Gagal memuat jadwal shalat. Menggunakan data statis.");
      setPrayerTimes(staticPrayerTimes);
    } finally {
      setIsLoading(false);
    }
  };

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
              <Clock className="w-8 h-8 text-primary" />
            </motion.div>
            <h1 className="font-headline text-3xl md:text-4xl font-semibold text-primary">Jadwal Shalat</h1>
          </div>
          <div className="w-24 h-1 bg-primary/20 rounded-full mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-loose">
            Pastikan Anda menunaikan shalat tepat waktu 🕒. Pilih wilayah Anda untuk mendapatkan jadwal shalat yang
            akurat sesuai lokasi, lengkap dengan tanggal Masehi dan Hijriyah.
          </p>
        </motion.div>

        <Separator className="bg-muted/50" />

        <motion.div variants={itemVariants} className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Tanggal Masehi</p>
              <p className="text-lg font-semibold text-primary">{masehiDate}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Tanggal Hijriah</p>
              <p className="text-lg font-semibold text-primary">{hijriDate}</p>
            </div>
          </div>

          <div className="mb-4">
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger className="w-full bg-card/80 border-muted">
                <SelectValue placeholder="Pilih Kota" />
              </SelectTrigger>
              <SelectContent className="bg-card/90 border-muted">
                {cities.map((cityOption) => (
                  <SelectItem key={cityOption} value={cityOption}>
                    {cityOption}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {coords && (
              <p className="text-sm text-muted-foreground mt-2 text-center">
                Menggunakan lokasi saat ini. Pilih kota untuk mengganti.
              </p>
            )}
          </div>

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
                onClick={fetchPrayerTimes}
              >
                Coba Lagi 🔄
              </Button>
            </div>
          ) : (
            <Card className="bg-card/80 backdrop-blur-sm border-muted">
              <CardHeader>
                <CardTitle className="text-xl text-primary">Jadwal Shalat Hari Ini 🕋</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {prayerTimes.map((prayer, index) => (
                    <motion.div
                      key={prayer.name}
                      className={`flex justify-between items-center p-3 rounded-md ${
                        index % 2 === 0 ? "bg-secondary/10" : ""
                      }`}
                      whileHover={{ scale: 1.01, backgroundColor: "rgba(var(--secondary-rgb), 0.15)" }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <span className="text-base font-medium text-primary">{prayer.name}</span>
                      <span className="text-base text-foreground">{prayer.time}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>

        <Separator className="bg-muted/50" />

        <motion.div variants={itemVariants} className="text-center text-muted-foreground text-sm">
          <p>
            Jadwal shalat dihitung menggunakan{" "}
            <a
              href="https://aladhan.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              API Aladhan
            </a>
            . Untuk informasi lebih lanjut, hubungi otoritas keagamaan setempat.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
