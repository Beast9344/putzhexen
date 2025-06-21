'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/language-context';

export function HeroSection() {
  const { translations } = useLanguage();

  return (
    <section className="w-full py-20 md:py-32 lg:py-40 bg-primary/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl">
                {translations.hero.headline}
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                {translations.hero.subheadline}
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link href="/quote">{translations.hero.cta}</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
             <div className="w-full h-full absolute -right-4 -bottom-4 bg-primary/20 rounded-lg transform rotate-2"></div>
            <Image
              alt="Professional cleaning a shiny floor"
              className="relative mx-auto aspect-video overflow-hidden rounded-lg object-cover"
              height={400}
              src="/images/hero.jpeg"
              width={600}
              data-ai-hint="floor cleaning"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
