'use client';
import { Mail, Phone, MapPin } from 'lucide-react';
import { ContactForm } from '@/components/contact/contact-form';
import { useLanguage } from '@/context/language-context';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function ContactPage() {
  const { translations } = useLanguage();

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl">
            {translations.contact.title}
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            {translations.contact.description}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
          <Card>
            <CardHeader>
                <CardTitle className="font-headline text-2xl">{translations.contact.form.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                 <CardTitle className="font-headline text-2xl">{translations.contact.map.title}</CardTitle>
                 <CardDescription>{translations.contact.map.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video w-full overflow-hidden rounded-lg">
                    <iframe
                        className="w-full h-full border-0"
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2701.442339553759!2d8.5379613156227!3d47.3719119791694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47900a08a385f5e1%3A0x8f0449a7a1a2b2e8!2sBahnhofstrasse%201%2C%208001%20Z%C3%BCrich%2C%20Switzerland!5e0!3m2!1sen!2sus!4v1620930103123!5m2!1sen!2sus"
                        title="Map of Putzhexen Services HQ"
                    ></iframe>
                </div>
                 <div className="mt-4 flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                        <p className="font-semibold">Putzhexen Services HQ</p>
                        <p className="text-muted-foreground">Bahnhofstrasse 1, 8001 Zürich, Switzerland</p>
                    </div>
                </div>
              </CardContent>
            </Card>
            <div className="flex flex-col sm:flex-row justify-around gap-4 text-center">
                 <div className="flex items-center gap-2">
                    <Mail className="h-6 w-6 text-primary" />
                    <a href="mailto:contact@putzhexen.ch" className="hover:text-primary">
                      contact@putzhexen.ch
                    </a>
                  </div>
                   <div className="flex items-center gap-2">
                    <Phone className="h-6 w-6 text-primary" />
                    <a href="tel:+41123456789" className="hover:text-primary">
                      +41 123 456 789
                    </a>
                  </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
