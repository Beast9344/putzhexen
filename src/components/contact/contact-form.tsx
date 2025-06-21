'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMemo, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { handleContactFormSubmit } from '@/lib/actions';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

export function ContactForm() {
  const { translations } = useLanguage();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const formSchema = useMemo(() => z.object({
    name: z.string().min(2, { message: translations.zod.nameMin }),
    email: z.string().email({ message: translations.zod.emailInvalid }),
    message: z.string().min(10, { message: translations.zod.messageMin }),
    attachment: z.any()
      .optional()
      .refine(
        (files) => !files || files.length === 0 || files?.[0]?.size <= MAX_FILE_SIZE,
        translations.zod.fileSize
      )
      .refine(
        (files) => !files || files.length === 0 || ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
        translations.zod.fileType
      ),
  }), [translations]);

  type ContactFormData = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('message', data.message);
    if (data.attachment && data.attachment.length > 0) {
      formData.append('attachment', data.attachment[0]);
    }

    try {
      const result = await handleContactFormSubmit(formData);
      if (result.success) {
        toast({
          title: 'Success',
          description: translations.contact.form.success,
        });
        reset();
      } else {
        let errorMessage = translations.contact.form.error;
        if (result.error === 'validation_error') {
          errorMessage = translations.contact.form.error_validation;
        } else if (result.error === 'server_error') {
          errorMessage = translations.contact.form.error_server;
        }
        toast({
          variant: 'destructive',
          title: 'Error',
          description: errorMessage,
        });
      }
    } catch (error) {
       toast({
        variant: 'destructive',
        title: 'Error',
        description: translations.contact.form.error,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label htmlFor="name">{translations.contact.form.name}</Label>
        <Input id="name" placeholder={translations.contact.form.namePlaceholder} {...register('name')} />
        {errors.name && <p className="text-destructive text-sm mt-1">{errors.name.message}</p>}
      </div>
      <div>
        <Label htmlFor="email">{translations.contact.form.email}</Label>
        <Input id="email" type="email" placeholder={translations.contact.form.emailPlaceholder} {...register('email')} />
        {errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message}</p>}
      </div>
      <div>
        <Label htmlFor="message">{translations.contact.form.message}</Label>
        <Textarea id="message" placeholder={translations.contact.form.messagePlaceholder} {...register('message')} />
        {errors.message && <p className="text-destructive text-sm mt-1">{errors.message.message}</p>}
      </div>
      <div>
        <Label htmlFor="attachment">{translations.contact.form.attachment}</Label>
        <Input id="attachment" type="file" {...register('attachment')} />
        <p className="text-sm text-muted-foreground mt-1">{translations.contact.form.attachmentDescription}</p>
        {errors.attachment && typeof errors.attachment.message === 'string' && <p className="text-destructive text-sm mt-1">{errors.attachment.message}</p>}
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {translations.contact.form.sending}
          </>
        ) : (
          translations.contact.form.submit
        )}
      </Button>
    </form>
  );
}
