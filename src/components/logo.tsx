import Link from 'next/link';
import Image from 'next/image';
import { logoUrl } from './logo-image';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="Putzhexen Services Home">
      <Image
        src={logoUrl}
        alt="Putzhexen Services Logo"
        width={160} 
        height={102}
        priority 
      />
    </Link>
  );
}
