
'use client';
import { 
  Home, 
  Building, 
  Wrench, 
  Sprout, 
  GlassWater, 
  Building2, 
  Triangle, 
  Truck, 
  Milestone, 
  Construction, 
  Layers, 
  Trash2, 
  Star 
} from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function ServicesPage() {
  const { translations } = useLanguage();
  
  const serviceKeys: (keyof typeof translations.services.serviceList)[] = [
    'private', 'office', 'maintenance', 'garden', 'window', 'facade', 
    'roof', 'moving', 'staircase', 'construction', 'carpet', 'disposal', 'special'
  ];

  const serviceIcons: { [key: string]: React.ReactElement } = {
    private: <Home className="h-10 w-10 text-primary" />,
    office: <Building className="h-10 w-10 text-primary" />,
    maintenance: <Wrench className="h-10 w-10 text-primary" />,
    garden: <Sprout className="h-10 w-10 text-primary" />,
    window: <GlassWater className="h-10 w-10 text-primary" />,
    facade: <Building2 className="h-10 w-10 text-primary" />,
    roof: <Triangle className="h-10 w-10 text-primary" />,
    moving: <Truck className="h-10 w-10 text-primary" />,
    staircase: <Milestone className="h-10 w-10 text-primary" />,
    construction: <Construction className="h-10 w-10 text-primary" />,
    carpet: <Layers className="h-10 w-10 text-primary" />,
    disposal: <Trash2 className="h-10 w-10 text-primary" />,
    special: <Star className="h-10 w-10 text-primary" />,
  };

  const services = serviceKeys.map(key => ({
    icon: serviceIcons[key],
    title: translations.services.serviceList[key].title,
    description: translations.services.serviceList[key].description,
    slug: translations.services.serviceList[key].slug,
  }));

  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl">
          {translations.services.title}
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          {translations.services.subheadline}
        </p>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <Link href={`/services/${service.slug}`} key={index} className="flex">
            <Card className="text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col w-full">
              <CardHeader>
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                  {service.icon}
                </div>
                <CardTitle className="mt-4 font-headline text-2xl">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
