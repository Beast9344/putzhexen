import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { LanguageProvider } from '@/context/language-context';
import { AppHeader } from '@/components/layout/header';
import { AppFooter } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Putzhexen Services - Professional Cleaning Services',
  description:
    'Top-tier cleaning services for private and corporate clients in Switzerland. Request your free quote today!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased'
        )}
        suppressHydrationWarning={true}
      >
        <LanguageProvider>
          <div className="relative flex min-h-dvh flex-col bg-background">
            <AppHeader />
            <main className="flex-1">{children}</main>
            <AppFooter />
          </div>
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}
