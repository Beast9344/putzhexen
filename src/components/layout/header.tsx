'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image'; // Import the Image component

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
// import { Logo } from '@/components/logo'; // Remove or comment out this line
import { LanguageSwitcher } from '@/components/language-switcher';
import { useLanguage } from '@/context/language-context';

export function AppHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { translations } = useLanguage();

  const navLinks = [
    { href: '/', label: translations.navigation.home },
    { href: '/services', label: translations.navigation.services },
    { href: '/quote', label: translations.navigation.requestQuote },
    { href: '/contact', label: translations.navigation.contact },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        {/* Replace <Logo /> with next/image */}
        <Link href="/" className="flex items-center space-x-2" aria-label="Home">
          <Image
            src="/images/logo.png" // Adjust this path to your actual logo location in the public folder
            alt="Putzhexen Logo" // Provide a descriptive alt text for accessibility
            width={100} // Set an appropriate width for your header logo
            height={30} // Set an appropriate height (adjust to maintain aspect ratio)
            priority // Important for main logo in header
          />
          {/* You might want to optionally add a site title next to the logo if it's text-based */}
          {/* <span className="font-bold text-lg">{translations.siteTitle}</span> */}
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />
          <Button asChild>
            <Link href="/quote">{translations.navigation.getAQuote}</Link>
          </Button>
        </div>

        <div className="md:hidden flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div
          className={cn(
            'md:hidden',
            'fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-y-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80'
          )}
        >
          <div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
            <nav className="grid gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="py-2 text-lg font-medium transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center justify-between pt-4 border-t">
              <span className="text-muted-foreground">{translations.language}</span>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}