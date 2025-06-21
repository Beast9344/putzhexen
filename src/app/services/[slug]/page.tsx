
'use client';

import { useLanguage } from '@/context/language-context';
import { useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ServiceDetailPage() {
  const params = useParams();
  const { slug } = params;
  const { translations } = useLanguage();

  const service = Object.values(translations.services.serviceList).find(
    (s) => s.slug === slug
  );

  if (!service) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-headline font-bold">Service not found</h1>
        <p className="mt-4 text-muted-foreground">The service you are looking for does not exist.</p>
        <Button asChild className="mt-8">
            <Link href="/services">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Services
            </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Button asChild variant="outline" className="mb-8">
            <Link href="/services">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {translations.services.viewAll}
            </Link>
        </Button>
      
        <h1 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl">
          {service.title}
        </h1>
        
        <div className="mt-8 text-lg text-muted-foreground whitespace-pre-wrap font-body">
          {service.longDescription}
        </div>

        <div className="mt-12 text-center">
             <Button asChild size="lg">
                <Link href="/quote">{translations.hero.cta}</Link>
              </Button>
        </div>
      </div>
    </div>
  );
}
