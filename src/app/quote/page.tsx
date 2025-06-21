'use client';
import { QuoteForm } from '@/components/quote/quote-form';
import { useLanguage } from '@/context/language-context';

export default function QuotePage() {
  const { translations } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl">
            {translations.quote.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {translations.quote.description}
          </p>
        </div>

        <div className="mt-12">
          <QuoteForm />
        </div>
      </div>
    </div>
  );
}
