"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users, Heart, BookOpen, Calendar, Star, Globe } from "lucide-react";
import { motion, Variants } from "framer-motion";

import { MasjidProfile, Feature, Program, Achievement } from "@/types/homepage";

const MasjidLandingPage: React.FC = () => {
  const masjidProfile: MasjidProfile = {
    mosque_name: "Masjid Al Ikhlas",
    location: "Jakarta Selatan",
    phone: "+62 21 1234 5678",
    email: "info@masjidalikhlas.id",
  };

  const introText: string =
    "Selamat datang di El Mimbar, platform informasi utama untuk kegiatan dan layanan masjid kami. Kami berkomitmen untuk menyediakan akses mudah ke jadwal sholat, pengumuman terkini, serta informasi donasi. Mari bersama kita makmurkan masjid dan perkuat ukhuwah Islamiyah.";

  const features: Feature[] = [
    {
      icon: Clock,
      title: "Jadwal Sholat Akurat",
      description: "Dapatkan jadwal sholat yang tepat waktu sesuai lokasi masjid",
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
    },
    {
      icon: Users,
      title: "Komunitas Aktif",
      description: "Bergabung dengan jamaah yang solid dan saling mendukung",
      color: "bg-gradient-to-br from-green-500 to-green-600",
    },
    {
      icon: Heart,
      title: "Donasi Mudah",
      description: "Berinfaq dan bersedekah dengan sistem yang transparan",
      color: "bg-gradient-to-br from-red-500 to-red-600",
    },
    {
      icon: BookOpen,
      title: "Kajian Rutin",
      description: "Ikuti kajian Islam dan pengajian berkualitas setiap minggu",
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
    },
  ];

  const programs: Program[] = [
    {
      title: "Tahfidz Al-Quran",
      description: "Program menghafal Al-Quran untuk segala usia dengan metode modern",
      time: "Senin - Jumat, 16:00 - 18:00",
      participants: "50+ Santri",
      image: "bg-gradient-to-r from-emerald-400 to-teal-500",
    },
    {
      title: "Kajian Tafsir",
      description: "Memahami makna dan hikmah ayat-ayat Al-Quran dengan mendalam",
      time: "Ahad, 08:00 - 10:00",
      participants: "100+ Jamaah",
      image: "bg-gradient-to-r from-blue-400 to-indigo-500",
    },
    {
      title: "Pengajian Ibu-Ibu",
      description: "Kajian khusus untuk muslimah dengan tema keluarga Islami",
      time: "Kamis, 09:00 - 11:00",
      participants: "80+ Ibu-Ibu",
      image: "bg-gradient-to-r from-pink-400 to-rose-500",
    },
    {
      title: "Remaja Masjid",
      description: "Kegiatan positif untuk remaja muslim generasi penerus",
      time: "Sabtu, 14:00 - 16:00",
      participants: "40+ Remaja",
      image: "bg-gradient-to-r from-orange-400 to-red-500",
    },
  ];

  const achievements: Achievement[] = [
    { number: "1000+", label: "Jamaah Aktif", icon: Users },
    { number: "50+", label: "Program Bulanan", icon: Calendar },
    { number: "15", label: "Tahun Berdiri", icon: Star },
    { number: "24/7", label: "Layanan Online", icon: Globe },
  ];

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeInOut" } },
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section - Fullscreen */}
      <motion.section
        className="relative h-screen w-full overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.3 }}
      >
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src={`/videos/mosque-footage.mp4`} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-800 to-blue-900 opacity-50 dark:opacity-60"></div>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-[1px]"></div>
        </div>

        <motion.div
          className="relative z-10 h-full flex items-center justify-center text-center px-4"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ amount: 0.3 }}
        >
          <div className="max-w-4xl mx-auto text-white dark:text-gray-100">
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ amount: 0.3 }}
            >
              <span className="inline-block">بسم الله</span>
              <br />
              <span className="text-3xl md:text-5xl text-emerald-300 dark:text-emerald-400 font-normal">
                {masjidProfile.mosque_name}
              </span>
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl mb-8 text-gray-200 dark:text-gray-300 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ amount: 0.3 }}
            >
              Rumah Allah tempat berkumpulnya umat Muslim
              <span className="text-emerald-300 dark:text-emerald-400 ml-2">untuk beribadah dan menambahkan ilmu</span>
            </motion.p>
          </div>
        </motion.div>
      </motion.section>

      {/* About Section */}
      <motion.section
        className="py-20 px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.3 }}
        variants={containerVariants}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div variants={cardVariants}>
            <Card className="shadow-xl border-0 bg-white dark:bg-gray-800 rounded-2xl overflow-hidden">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                  Tentang {masjidProfile.mosque_name}
                </CardTitle>
                <div className="w-24 h-1 bg-blue-500 dark:bg-blue-400 mx-auto rounded-full"></div>
              </CardHeader>
              <CardContent className="text-center px-8 pb-12">
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl mx-auto mb-8">
                  {introText}
                </p>
                <motion.div
                  className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ amount: 0.3 }}
                >
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      className="text-center group"
                      variants={cardVariants}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 dark:bg-blue-600 rounded-full mb-4 group-hover:shadow-lg transition-all duration-300">
                        {React.createElement(achievement.icon, { className: "h-8 w-8 text-white" })}
                      </div>
                      <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                        {achievement.number}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400 font-medium">{achievement.label}</div>
                    </motion.div>
                  ))}
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="py-20 px-4 bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900"
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.3 }}
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-6">
              Layanan & Fasilitas
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Kami menyediakan berbagai layanan dan fasilitas untuk mendukung ibadah dan aktivitas umat
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.3 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-0 bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md dark:shadow-gray-700/50">
                  <CardContent className="p-8 text-center">
                    <motion.div
                      className={`inline-flex items-center justify-center w-20 h-20 ${feature.color} rounded-2xl mb-6`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {React.createElement(feature.icon, { className: "h-10 w-10 text-white" })}
                    </motion.div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Programs Section */}
      <motion.section
        className="py-20 px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.3 }}
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-6">Program & Kegiatan</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Ikuti berbagai program unggulan yang dirancang untuk meningkatkan kualitas spiritual dan intelektual
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.3 }}
          >
            {programs.map((program, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-0 bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md dark:shadow-gray-700/50">
                  <div className={`h-48 ${program.image} relative`}>
                    <motion.div
                      className="absolute inset-0 bg-black/30"
                      initial={{ opacity: 0.3 }}
                      whileHover={{ opacity: 0.1 }}
                      transition={{ duration: 0.3 }}
                    ></motion.div>
                    <div className="absolute top-4 right-4 bg-blue-500/80 dark:bg-blue-600/80 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {program.participants}
                    </div>
                  </div>
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">{program.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{program.description}</p>
                    <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium">
                      <Clock className="h-4 w-4 mr-2" />
                      {program.time}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default MasjidLandingPage;
