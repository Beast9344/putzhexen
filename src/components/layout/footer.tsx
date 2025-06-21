'use client';
import { Facebook, Instagram, Twitter, Mail, Phone } from 'lucide-react';
// import { Logo } from '@/components/logo'; // Remove or comment out this line if you no longer need the Logo component
import Link from 'next/link';
import Image from 'next/image'; // Import the Image component
import { useLanguage } from '@/context/language-context';

export function AppFooter() {
  const { translations } = useLanguage();
  return (
    <footer className="border-t">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            {/* Replace <Logo /> with next/image */}
            <Link href="/" aria-label="Home page"> {/* It's good practice to wrap logos in a link to home */}
              <Image
                src="/images/logo.png" // Adjust this path to your actual logo location in the public folder
                alt="Putzhexen Logo" // Provide a descriptive alt text for accessibility
                width={150} // Set an appropriate width for your logo
                height={50} // Set an appropriate height for your logo (adjust as needed to maintain aspect ratio)
                priority // Optional: If the logo is visible on initial load, use priority
              />
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              {translations.footer.description}
            </p>
          </div>
          <div>
            <h3 className="mt-8 text-lg font-headline font-semibold">{translations.footer.contact}</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:contact@putzhexen.ch" className="text-muted-foreground hover:text-primary">
                  contact@putzhexen.ch
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:+41123456789" className="text-muted-foreground hover:text-primary">
                  +41 123 456 789
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mt-8 text-lg font-headline font-semibold">{translations.footer.legal}</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  {translations.footer.privacy}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  {translations.footer.imprint}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mt-8 text-lg font-headline font-semibold">{translations.footer.follow}</h3>
            <div className="flex mt-4 space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary" aria-label="Facebook">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary" aria-label="Instagram">
                <Instagram className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary" aria-label="Twitter">
                <Twitter className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>{translations.footer.copyright.replace('{year}', new Date().getFullYear().toString())}</p>
        </div>
      </div>
    </footer>
  );
}