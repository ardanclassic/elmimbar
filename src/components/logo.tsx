import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/" className="text-2xl font-headline text-primary hover:text-primary/80 transition-colors">
      El Mimbar
    </Link>
  );
};

export default Logo;
