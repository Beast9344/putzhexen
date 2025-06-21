'use client';
import { Building, Home, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '../ui/button';

export function ServicesSection() {
  const { translations } = useLanguage();

  const services = [
    {
      icon: <Home className="h-8 w-8 text-primary" />,
      title: translations.services.categories.residential.title,
      description: translations.services.categories.residential.description,
    },
    {
      icon: <Building className="h-8 w-8 text-primary" />,
      title: translations.services.categories.commercial.title,
      description: translations.services.categories.commercial.description,
    },
    {
      icon: <Sparkles className="h-8 w-8 text-primary" />,
      title: translations.services.categories.specialized.title,
      description: translations.services.categories.specialized.description,
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {translations.services.title}
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            {translations.services.subheadline}
          </p>
        </div>
        <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3 mt-12">
          {services.map((service, index) => (
            <Card key={index} className="text-left">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-md">{service.icon}</div>
                <CardTitle className="font-headline text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
         <div className="mt-12 text-center">
            <Button asChild variant="outline">
                <Link href="/services">{translations.services.viewAll}</Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
