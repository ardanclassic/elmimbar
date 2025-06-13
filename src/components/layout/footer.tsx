import { MapPin, Phone, Mail } from "lucide-react";
import { MasjidProfile } from "@/types/homepage";

const AppFooter = () => {
  const masjidProfile: MasjidProfile = {
    mosque_name: "Masjid Al Ikhlas",
    location: "Jakarta Selatan",
    phone: "+62 21 1234 5678",
    email: "info@masjidalikhlas.id",
  };

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300 py-12 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h3 className="text-2xl font-bold text-white dark:text-gray-100 mb-4">{masjidProfile.mosque_name}</h3>
        <p className="text-gray-400 dark:text-gray-500 mb-6">
          "Sesungguhnya yang memakmurkan masjid-masjid Allah hanyalah orang-orang yang beriman kepada Allah dan hari
          akhir, menegakkan salat, menunaikan zakat, dan tidak takut kecuali kepada Allah. Maka, mereka itulah yang
          diharapkan termasuk golongan orang-orang yang mendapat petunjuk." <br /> (Q.S. At-Taubah: 18)
        </p>
        <div className="w-24 h-1 bg-blue-500 dark:bg-blue-400 mx-auto rounded-full mb-6"></div>
        <div className="flex justify-center gap-4 mb-6">
          <a
            href={`tel:${masjidProfile.phone}`}
            className="flex items-center gap-2 text-blue-400 dark:text-blue-300 hover:text-blue-600 dark:hover:text-blue-500"
          >
            <Phone className="h-5 w-5" />
            {masjidProfile.phone}
          </a>
          <a
            href={`mailto:${masjidProfile.email}`}
            className="flex items-center gap-2 text-blue-400 dark:text-blue-300 hover:text-blue-600 dark:hover:text-blue-500"
          >
            <Mail className="h-5 w-5" />
            {masjidProfile.email}
          </a>
          <a
            href={`https://maps.google.com/maps?q=${encodeURIComponent(masjidProfile.location)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-400 dark:text-blue-300 hover:text-blue-600 dark:hover:text-blue-500"
          >
            <MapPin className="h-5 w-5" />
            {masjidProfile.location}
          </a>
        </div>
        <p className="text-gray-500 dark:text-gray-600">
          © 2025 {masjidProfile.mosque_name}. Semua hak cipta dilindungi.
        </p>
      </div>
    </footer>
  );
};

export default AppFooter;
