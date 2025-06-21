'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/context/language-context';

export function Testimonials() {
  const { translations } = useLanguage();
  const testimonials = [
    {
      ...translations.testimonials.person1,
      avatar: 'https://placehold.co/100x100',
      initials: 'AJ',
      aiHint: 'professional man'
    },
    {
      ...translations.testimonials.person2,
      avatar: 'https://placehold.co/100x100',
      initials: 'MG',
      aiHint: 'smiling woman'
    },
    {
      ...translations.testimonials.person3,
      avatar: 'https://placehold.co/100x100',
      initials: 'DC',
      aiHint: 'business person'
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {translations.testimonials.title}
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            {translations.testimonials.subheadline}
          </p>
        </div>
        <div className="grid gap-8 mt-12 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <blockquote className="space-y-4">
                  <p className="text-lg">&ldquo;{testimonial.quote}&rdquo;</p>
                  <footer className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint={testimonial.aiHint} />
                      <AvatarFallback>{testimonial.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                    </div>
                  </footer>
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
