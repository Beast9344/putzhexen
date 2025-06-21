'use client';
import Image from 'next/image';
import { useLanguage } from '@/context/language-context';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function VisualShowcase() {
  const { translations } = useLanguage();

  const showcaseImages = [
    {
      src: "/images/w1.webp", // Corrected path: removed /public
      alt: "Clean living room",
      aiHint: "clean living room",
    },
    {
      src: "/images/w2.webp",  // Changed to .png
      alt: "Sparkling clean kitchen",
      aiHint: "sparkling kitchen",
    },
    {
      src: "/images/w3.webp", // Ensure this matches your actual public folder structure
      alt: "Description of w3",
      aiHint: "hint for w3",
    },
    {
      src: "/images/w4.webp", // Ensure this matches your actual public folder structure
      alt: "Description of w4",
      aiHint: "hint for w4",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-primary/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {translations.visualShowcase.title}
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            {translations.visualShowcase.subheadline}
          </p>
        </div>

        <div className="mt-12">
            <Carousel className="w-full max-w-4xl mx-auto" opts={{ loop: true }}>
              <CarouselContent>
                {showcaseImages.map((image, index) => (
                  <CarouselItem key={index}>
                    <Card>
                      <CardContent className="p-0 aspect-video relative">
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            className="rounded-lg object-cover"
                            data-ai-hint={image.aiHint}
                          />
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
        </div>
      </div>
    </section>
  );
}