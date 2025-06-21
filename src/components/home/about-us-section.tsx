'use client';
import { useLanguage } from '@/context/language-context';
import Image from 'next/image';

export function AboutUsSection() {
  const { translations } = useLanguage();

  return (
    <section className="w-full py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {translations.aboutUs.title}
            </h2>
            <p className="mt-4 max-w-[600px] text-muted-foreground md:text-xl/relaxed">
              {translations.aboutUs.paragraph1}
            </p>
            <p className="mt-4 max-w-[600px] text-muted-foreground md:text-xl/relaxed">
              {translations.aboutUs.paragraph2}
            </p>
          </div>
          <div className="relative">
            <div className="w-full h-full absolute -left-4 -bottom-4 bg-secondary/20 rounded-lg transform -rotate-2"></div>
            <Image
              alt="SwissClean team"
              className="relative mx-auto aspect-video overflow-hidden rounded-lg object-cover"
              height="400"
              src="/images/image1.webp"
              width="600"
              data-ai-hint="cleaning team working"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
