import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import type { MasjidProfile } from "@/types";
import { Banknote, Landmark, UserCircle, Phone } from "lucide-react";

interface DonationCardProps {
  donationInfo: Partial<MasjidProfile> | null;
}

const DonationCardItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value?: string | null }) => {
  if (!value) return null;
  return (
    <div className="flex items-start space-x-3 mb-3">
      <span className="text-primary mt-1">{icon}</span>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-semibold text-foreground">{value}</p>
      </div>
    </div>
  );
};

const DonationCard = ({ donationInfo }: DonationCardProps) => {
  if (!donationInfo) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-primary">Informasi Donasi</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Informasi donasi tidak tersedia saat ini.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-xl max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="font-headline text-2xl md:text-3xl text-center text-primary">Salurkan Infaq & Shadaqah Anda</CardTitle>
        <CardDescription className="text-center text-muted-foreground pt-2">
          Setiap kontribusi Anda sangat berarti untuk kegiatan dan pemeliharaan masjid.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <DonationCardItem
          icon={<Landmark className="h-5 w-5" />}
          label="Nama Bank"
          value={donationInfo.donation_bank_name}
        />
        <DonationCardItem
          icon={<Banknote className="h-5 w-5" />}
          label="Nomor Rekening"
          value={donationInfo.donation_account_number}
        />
        <DonationCardItem
          icon={<UserCircle className="h-5 w-5" />}
          label="Atas Nama"
          value={donationInfo.donation_account_holder_name}
        />
        <DonationCardItem
          icon={<Phone className="h-5 w-5" />}
          label="Kontak Konfirmasi"
          value={donationInfo.donation_contact_for_confirmation}
        />
      </CardContent>
    </Card>
  );
};

export default DonationCard;
