'use client';
import { MapPin } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { Card, CardContent } from '@/components/ui/card';

export function ServiceAreaMap() {
  const { translations } = useLanguage();

  return (
    <section className="py-20 md:py-28 bg-primary/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {translations.serviceArea.title}
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            {translations.serviceArea.description}
          </p>
        </div>
        <Card className="mt-12 overflow-hidden shadow-lg">
            <CardContent className="p-0">
                <div className="grid md:grid-cols-2">
                    <div className="p-8 flex flex-col justify-center order-2 md:order-1">
                         <h3 className="font-headline text-2xl font-bold">{translations.serviceArea.headline}</h3>
                         <p className="mt-2 text-muted-foreground">{translations.serviceArea.subheadline}</p>
                         <div className="mt-6 flex items-start gap-4">
                            <MapPin className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                            <div>
                                <p className="font-semibold text-lg">{translations.serviceArea.hq}</p>
                                <p className="text-muted-foreground">{translations.serviceArea.address}</p>
                            </div>
                        </div>
                    </div>
                    <div className="aspect-square md:aspect-auto w-full overflow-hidden order-1 md:order-2 min-h-[400px]">
                        <iframe
                            className="w-full h-full border-0"
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2701.442339553759!2d8.5379613156227!3d47.3719119791694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47900a08a385f5e1%3A0x8f0449a7a1a2b2e8!2sBahnhofstrasse%201%2C%208001%20Z%C3%BCrich%2C%20Switzerland!5e0!3m2!1sen!2sus!4v1620930103123!5m2!1sen!2sus"
                            title="Service Area Map"
                        ></iframe>
                    </div>
                </div>
              </CardContent>
        </Card>
      </div>
    </section>
  );
}
