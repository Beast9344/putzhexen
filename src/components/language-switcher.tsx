'use client';

import { Check, Languages } from 'lucide-react';

import { useLanguage } from '@/context/language-context';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Languages className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage('en')}>
          <div className="flex items-center gap-2">
            {language === 'en' && <Check className="h-4 w-4" />}
            <span>English</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('de')}>
          <div className="flex items-center gap-2">
            {language === 'de' && <Check className="h-4 w-4" />}
            <span>Deutsch</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
