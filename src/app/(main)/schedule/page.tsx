import PrayerTimesTable from '@/components/prayer-times-table';
import { getCurrentMasehiDate, getCurrentHijriDate } from '@/lib/date-utils';
import type { PrayerTime } from '@/types';
import { Separator } from '@/components/ui/separator';

// Static prayer times data as per prompt
const staticPrayerTimes: PrayerTime[] = [
  { name: 'Subuh', time: '04:45' },
  { name: 'Terbit', time: '06:05' }, // Added Terbit as it's common
  { name: 'Dzuhur', time: '12:15' },
  { name: 'Ashar', time: '15:30' },
  { name: 'Maghrib', time: '18:20' },
  { name: 'Isya', time: '19:35' },
];

export default function SchedulePage() {
  const masehiDate = getCurrentMasehiDate();
  const hijriDate = getCurrentHijriDate();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl md:text-4xl font-bold text-primary mb-2">Jadwal Sholat</h1>
        <p className="text-lg text-muted-foreground">
          Informasi waktu sholat harian untuk wilayah Anda.
        </p>
      </div>
      <Separator />
      <div className="max-w-2xl mx-auto">
        <PrayerTimesTable 
          prayerTimes={staticPrayerTimes} 
          masehiDate={masehiDate}
          hijriDate={hijriDate}
        />
      </div>
      <div className="text-center text-muted-foreground text-sm mt-8">
        <p>*Waktu sholat ini adalah contoh statis. Untuk waktu yang akurat, silakan merujuk pada sumber resmi di wilayah Anda.</p>
      </div>
    </div>
  );
}
