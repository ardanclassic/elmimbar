import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { MasjidProfile } from '@/types';

interface HeroSectionProps {
  profile: MasjidProfile | null;
}

const HeroSection = ({ profile }: HeroSectionProps) => {
  const heroImageUrl = profile?.hero_image_url || "https://placehold.co/1200x500.png";
  const slogan = profile?.slogan || "Selamat Datang di Portal Masjid Kami";
  const mosqueName = profile?.mosque_name || "El Mimbar";

  return (
    <section className="relative h-[calc(100vh-10rem)] min-h-[400px] max-h-[600px] w-full rounded-lg overflow-hidden shadow-lg">
      <Image
        src={heroImageUrl}
        alt={`Hero image for ${mosqueName}`}
        layout="fill"
        objectFit="cover"
        priority
        className="brightness-75"
        data-ai-hint="mosque building"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-center p-8">
        <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>
          {mosqueName}
        </h1>
        <p className="text-xl sm:text-2xl text-gray-200 mb-8 max-w-2xl" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}>
          {slogan}
        </p>
        <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
          <Link href="/schedule">
            Lihat Jadwal Sholat
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
