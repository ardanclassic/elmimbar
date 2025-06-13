"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getDonationInfo } from "@/lib/supabase/supabase";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Banknote, QrCode, AlertCircle, MessageCircle, Handshake } from "lucide-react";
import { dummyDonationInfo } from "./dummyData";
import Image from "next/image";
import QRIS from "@/assets/image/qris-sample.jpeg";

// Define TypeScript interfaces
interface BankAccount {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
}

interface DonationInfo {
  bankAccounts: BankAccount[];
  qrisImage?: string;
}

export default function DonatePage() {
  const [donationInfo, setDonationInfo] = useState<DonationInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDonationInfo() {
      try {
        const data = await getDonationInfo();
        if (data && (data as any).bankAccounts) {
          setDonationInfo({
            bankAccounts: (data as any).bankAccounts,
            qrisImage: (data as any).qrisImage,
          });
        } else {
          setDonationInfo(dummyDonationInfo);
        }
      } catch (error) {
        console.error("Error fetching donation info:", error);
        setError("Gagal memuat informasi donasi. Silakan coba lagi nanti.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchDonationInfo();
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
              <Handshake className="w-8 h-8 text-primary" />
            </motion.div>
            <h1 className="font-headline text-3xl md:text-4xl font-semibold text-primary">Informasi Donasi</h1>
          </div>
          <div className="w-24 h-1 bg-primary/20 rounded-full mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-loose">
            Mari dukung kelangsungan dan kemakmuran masjid kami dengan donasi Anda. Setiap kontribusi Anda adalah
            langkah mulia untuk mendukung kegiatan ibadah, pendidikan, dan sosial kemasyarakatan 🙏.
          </p>
        </motion.div>

        <Separator className="bg-muted/50" />

        <motion.div variants={itemVariants}>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500">
              <p>{error}</p>
              <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
                Coba Lagi
              </Button>
            </div>
          ) : (
            <Tabs defaultValue="bank">
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-secondary/20">
                <TabsTrigger
                  value="bank"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Banknote className="w-5 h-5 mr-2" /> Transfer Bank
                </TabsTrigger>
                <TabsTrigger
                  value="qris"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <QrCode className="w-5 h-5 mr-2" /> QRIS
                </TabsTrigger>
              </TabsList>

              <AnimatePresence mode="wait">
                <TabsContent value="bank">
                  <motion.div
                    key="bank"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="bg-card/80 backdrop-blur-sm border-muted">
                      <CardHeader>
                        <CardTitle className="text-xl text-primary">Rekening Donasi 💳</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {donationInfo?.bankAccounts?.map((account: BankAccount, index: number) => (
                          <motion.div
                            key={index}
                            className="p-5 bg-secondary/10 rounded-lg text-lg"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <p className="font-semibold text-primary">{account.bankName}</p>
                            <p className="text-muted-foreground mt-2">
                              No. Rekening: <span className="font-semibold">{account.accountNumber}</span>
                            </p>
                            <p className="text-muted-foreground mt-1">
                              Atas Nama: <span className="font-semibold">{account.accountHolder}</span>
                            </p>
                          </motion.div>
                        ))}
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>

                <TabsContent value="qris">
                  <motion.div
                    key="qris"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="bg-card/80 backdrop-blur-sm border-muted">
                      <CardHeader>
                        <CardTitle className="text-xl text-primary">Donasi via QRIS 📲</CardTitle>
                      </CardHeader>
                      <CardContent className="text-center">
                        <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                          <Image
                            src={donationInfo?.qrisImage || QRIS}
                            alt="QRIS Donasi"
                            className="mx-auto max-w-[250px] md:max-w-[350px] rounded-lg shadow-md"
                            width={350}
                            height={350}
                          />
                          <p className="mt-4 text-sm text-muted-foreground">
                            Scan kode QRIS di atas dengan aplikasi pembayaran digital Anda 📱.
                          </p>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
              </AnimatePresence>
            </Tabs>
          )}
        </motion.div>

        <Separator className="bg-muted/50" />

        <motion.div variants={itemVariants} className="bg-card/80 backdrop-blur-sm border-muted rounded-lg">
          <Card>
            <CardHeader>
              <motion.div
                className="flex items-center justify-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <AlertCircle className="w-6 h-6 mr-2 text-primary" />
                <CardTitle className="text-xl text-primary">Informasi</CardTitle>
              </motion.div>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <p className="text-base text-muted-foreground leading-relaxed">
                Mohon konfirmasi donasi Anda setelah transfer agar kami dapat mencatatnya dengan baik 🙏.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                <Button
                  variant="outline"
                  className="mt-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  onClick={() => window.open("https://wa.me/6281234567890", "_blank")}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Konfirmasi Donasi 📲
                </Button>
              </motion.div>
              <p className="text-base text-muted-foreground leading-relaxed">
                <span className="block italic bg-secondary/10 p-3 rounded-md mt-4">
                  "Sedekah tidak akan mengurangi harta. Tidaklah seseorang memberi sedekah melainkan Allah akan menambah
                  kehormatan kepadanya, dan tidaklah seseorang merendahkan diri karena Allah melainkan Allah akan
                  mengangkat derajatnya." (HR. Muslim) ✨
                </span>
                <span className="block mt-4">
                  Semoga Allahﷻ melipatgandakan pahala kebaikan Anda 💖. <br />
                  <span className="italic">Jazakumullah Khairan Katsiran.</span> <br />
                  Aamiin 🤲.
                </span>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
