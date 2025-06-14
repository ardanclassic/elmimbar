import moment from "moment";
import "moment/locale/id"; // Import Indonesian locale for Moment

moment.locale("id"); // Set Moment locale to Indonesian

export const getCurrentMasehiDate = (): string => {
  return moment().format("dddd, D MMMM YYYY");
};

export const getCurrentHijriDate = (): string => {
  try {
    const today = new Date(); // Dapatkan objek Date Masehi saat ini

    // Daftar nama bulan Hijriyah yang sudah dikoreksi dan akan digunakan
    const manualHijriMonths = [
      "Muharram",
      "Safar",
      "Rabi'ul Awal",
      "Rabi'ul Akhir",
      "Jumadil Awal",
      "Jumadil Akhir",
      "Rajab",
      "Sya'ban",
      "Ramadhan",
      "Syawal",
      "Dzulqa'dah",
      "Dzulhijjah",
    ];

    // Formatter untuk mendapatkan komponen tanggal secara terpisah (Weekday, Day, Year)
    const dayOfWeekFormatter = new Intl.DateTimeFormat("id-ID", { weekday: "long" }); // Hanya weekday dengan locale Masehi untuk konsisten
    const hijriDayFormatter = new Intl.DateTimeFormat("id-ID-u-ca-islamic", { day: "numeric" });
    // Tahun biasanya menyertakan 'H' atau 'هـ' secara otomatis di beberapa locale Islami
    const hijriYearFormatter = new Intl.DateTimeFormat("id-ID-u-ca-islamic", { year: "numeric" });

    const dayOfWeek = dayOfWeekFormatter.format(today); // Hari dalam bahasa Indonesia
    const hijriDay = hijriDayFormatter.format(today); // Tanggal Hijriyah numerik
    const hijriYear = hijriYearFormatter.format(today); // Tahun Hijriyah numerik (contoh: 1446 H)

    // Dapatkan nomor bulan Hijriyah (1-12) menggunakan formatToParts
    const parts = new Intl.DateTimeFormat("en-US-u-ca-islamic", {
      calendar: "islamic-umalqura", // Pastikan kalender yang sama
      month: "numeric",
    }).formatToParts(today);

    let hijriMonthNumber: number | undefined;
    for (const part of parts) {
      if (part.type === "month") {
        hijriMonthNumber = parseInt(part.value, 10);
        break;
      }
    }

    let hijriMonthName = "Bulan Tidak Dikenal";
    if (hijriMonthNumber !== undefined && hijriMonthNumber >= 1 && hijriMonthNumber <= 12) {
      hijriMonthName = manualHijriMonths[hijriMonthNumber - 1]; // Gunakan array manual Anda
    } else {
      console.error("Could not determine Hijri month number from Intl.DateTimeFormat.");
    }

    // --- Penting: Hapus penambahan " H" manual di sini ---
    // Karena hasil dari hijriYearFormatter.format(today) sudah mungkin menyertakan " H" atau "هـ"
    // atau jika belum, kita tidak menambahkannya secara manual lagi di sini.
    // Asumsi: Kita hanya ingin string yang dikembalikan oleh Intl.DateTimeFormat (yang sudah benar)
    // dan hanya memodifikasi nama bulannya.

    // Gabungkan komponen menjadi string akhir
    // Cek apakah hijriYear sudah mengandung 'H' atau 'هـ'
    let yearPart = hijriYear;
    if (!yearPart.endsWith("H") && !yearPart.endsWith("هـ")) {
      yearPart = `${yearPart} H`; // Tambahkan hanya jika belum ada
    }

    const finalHijriDateString = `${dayOfWeek}, ${hijriDay} ${hijriMonthName} ${yearPart}`;

    // --- Bagian Debugging Nama Bulan (dapat di-komen setelah diverifikasi) ---
    // console.log("--- Debugging Nama Bulan Hijriyah ---");
    // console.log("Nama bulan Hijriyah dari Intl.DateTimeFormat (long):");
    // const monthFormatterIntl = new Intl.DateTimeFormat("id-ID-u-ca-islamic", { month: "long" });
    // for (let i = 0; i < 12; i++) {
    //     const dateForMonth = new Date(today.getFullYear(), i, 15);
    //     const hijriMonthNameIntl = monthFormatterIntl.format(dateForMonth);
    //     console.log(`Bulan ${i + 1} Masehi (${format(dateForMonth, "MMMM")}) -> Bulan Hijriyah (Intl): ${hijriMonthNameIntl}`);
    // }

    // console.log("\nNama bulan Hijriyah secara manual (akan digunakan):");
    // manualHijriMonths.forEach((name, index) => {
    //     console.log(`Bulan ke-${index + 1}: ${name}`);
    // });
    // console.log("----------------------------");
    // --- Akhir Bagian Debugging ---

    return finalHijriDateString;
  } catch (error) {
    console.error("Error getting Hijri date with Intl.DateTimeFormat and manual month mapping:", error);
    return "Tanggal Hijriyah tidak tersedia (Error)";
  }
};

export const formatAnnouncementDate = (dateString: string): string => {
  return moment(dateString).format("D MMMM YYYY, HH:mm");
};
