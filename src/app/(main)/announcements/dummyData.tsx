export interface Announcement {
  id: number;
  title: string;
  description: string;
  date: string;
  image?: string;
}

export const dummyAnnouncements: Announcement[] = [
  {
    id: 1,
    title: "Kajian Bulanan: Membangun Akhlak Mulia",
    description:
      "Kami mengundang jamaah untuk menghadiri kajian bulanan bersama Ustadz Ahmad Syarif pada hari Sabtu, 15 Juni 2025, pukul 16.00 WIB di Masjid Al-Ikhlas. Tema: Membangun Akhlak Mulia dalam Kehidupan Sehari-hari.",
    date: "2025-06-10",
    image: "/images/kajian-bulanan.jpg",
  },
  {
    id: 2,
    title: "Pembersihan Masjid Bersama",
    description:
      "Mari bersama-sama memakmurkan masjid dengan kegiatan pembersihan pada hari Minggu, 22 Juni 2025, pukul 07.00 WIB. Alat kebersihan disediakan, bawa semangat kebersamaan!",
    date: "2025-06-12",
    image: "/images/pembersihan-masjid.jpg",
  },
  {
    id: 3,
    title: "Donasi untuk Renovasi Karpet Masjid",
    description:
      "Kami membuka donasi untuk penggantian karpet masjid. Donasi dapat disalurkan melalui rekening masjid atau QRIS. Informasi lebih lanjut hubungi pengurus masjid.",
    date: "2025-06-08",
  },
  {
    id: 4,
    title: "Jadwal Imam dan Khotib Jumat",
    description:
      "Pengurus masjid telah merilis jadwal imam dan khotib untuk shalat Jumat selama bulan Juni 2025. Silakan cek di papan pengumuman atau hubungi sekretariat masjid.",
    date: "2025-06-05",
  },
  {
    id: 5,
    title: "Peringatan Maulid Nabi Muhammad SAW",
    description:
      "Masjid Al-Ikhlas mengadakan peringatan Maulid Nabi Muhammad SAW pada hari Rabu, 18 Juni 2025, pukul 19.00 WIB. Acara diisi dengan ceramah oleh Ustadzah Siti Aisyah dan pembacaan shalawat bersama.",
    date: "2025-06-13",
    image: "/images/maulid-nabi.jpg",
  },
  {
    id: 6,
    title: "Kelas Tahsin Al-Qur'an untuk Pemula",
    description:
      "Kelas tahsin Al-Qur'an untuk pemula dimulai pada hari Senin, 23 Juni 2025, pukul 17.00 WIB. Pendaftaran dibuka hingga 20 Juni 2025. Hubungi panitia untuk informasi lebih lanjut.",
    date: "2025-06-11",
  },
  {
    id: 7,
    title: "Buka Puasa Bersama Anak Yatim",
    description:
      "Mari berbagi kebahagiaan dengan mengikuti buka puasa bersama anak yatim pada hari Kamis, 26 Juni 2025, pukul 17.30 WIB di Masjid Al-Ikhlas. Donasi makanan dan dana sangat diharapkan.",
    date: "2025-06-14",
    image: "/images/buka-puasa.jpg",
  },
  {
    id: 8,
    title: "Lomba Adzan untuk Remaja",
    description:
      "Kami mengadakan lomba adzan untuk remaja usia 12-17 tahun pada hari Sabtu, 28 Juni 2025, pukul 09.00 WIB. Hadiah menarik menanti! Daftar sekarang di sekretariat masjid.",
    date: "2025-06-10",
  },
  {
    id: 9,
    title: "Pengajian Khusus Ibu-Ibu: Meneladani Siti Khadijah",
    description:
      "Pengajian khusus untuk ibu-ibu dengan tema 'Meneladani Siti Khadijah' akan diadakan pada hari Selasa, 17 Juni 2025, pukul 10.00 WIB bersama Ustadzah Nurul Hidayah.",
    date: "2025-06-09",
    image: "/images/pengajian-ibu.jpg",
  },
  {
    id: 10,
    title: "Pembagian Sembako untuk Dhuafa",
    description:
      "Masjid Al-Ikhlas akan mengadakan pembagian sembako untuk dhuafa pada hari Jumat, 20 Juni 2025, pukul 14.00 WIB. Kontribusi Anda sangat berarti bagi mereka yang membutuhkan.",
    date: "2025-06-07",
  },
  {
    id: 11,
    title: "Workshop Fiqih Shalat untuk Pemuda",
    description:
      "Workshop fiqih shalat untuk pemuda akan diadakan pada hari Minggu, 29 Juni 2025, pukul 15.00 WIB. Dipandu oleh Ustadz Hasan Basri. Kuota terbatas, segera daftar!",
    date: "2025-06-12",
  },
  {
    id: 12,
    title: "Pemeriksaan Kesehatan Gratis",
    description:
      "Kami bekerja sama dengan Puskesmas setempat untuk mengadakan pemeriksaan kesehatan gratis pada hari Rabu, 25 Juni 2025, pukul 08.00 WIB di halaman masjid.",
    date: "2025-06-06",
    image: "/images/pemeriksaan-kesehatan.jpg",
  },
  {
    id: 13,
    title: "Penutupan Sementara Perpustakaan Masjid",
    description:
      "Perpustakaan masjid akan ditutup sementara untuk renovasi mulai 16 Juni 2025 hingga 30 Juni 2025. Mohon maaf atas ketidaknyamanannya.",
    date: "2025-06-05",
  },
  {
    id: 14,
    title: "Tadarus Al-Qur'an Malam Hari",
    description:
      "Mari perbanyak ibadah dengan mengikuti tadarus Al-Qur'an setiap malam selama bulan Juni 2025, pukul 20.00 WIB di Masjid Al-Ikhlas. Terbuka untuk semua jamaah.",
    date: "2025-06-04",
  },
  {
    id: 15,
    title: "Pelatihan Manajemen Zakat",
    description:
      "Pelatihan manajemen zakat untuk pengurus masjid dan masyarakat umum akan diadakan pada hari Selasa, 24 Juni 2025, pukul 13.00 WIB. Pendaftaran gratis, hubungi panitia.",
    date: "2025-06-03",
  },
];
