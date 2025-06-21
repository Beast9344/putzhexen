'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Wand2 } from 'lucide-react';

import { smartEstimator, type SmartEstimatorOutput } from '@/ai/flows/smart-estimator';
import { useLanguage } from '@/context/language-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export function QuoteForm() {
  const { translations } = useLanguage();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SmartEstimatorOutput | null>(null);

  const additionalServicesOptions = [
    { id: 'windowCleaning', label: translations.quote.form.windowCleaning },
    { id: 'carpetCleaning', label: translations.quote.form.carpetCleaning },
    { id: 'deepCleaning', label: translations.quote.form.deepCleaning },
    { id: 'ovenCleaning', label: translations.quote.form.ovenCleaning },
  ];

  const formSchema = z.object({
    propertyType: z.string().min(1, 'Property type is required'),
    propertySizeSqMeters: z.coerce.number().min(10, 'Must be at least 10 m²'),
    numberOfRooms: z.coerce.number().min(1, 'Must be at least 1 room'),
    cleaningFrequency: z.string().min(1, 'Cleaning frequency is required'),
    additionalServices: z.array(z.string()).default([]),
    comments: z.string().optional(),
  });

  type QuoteFormData = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      additionalServices: [],
    },
  });

  const onSubmit = async (data: QuoteFormData) => {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await smartEstimator(data);
      setResult(response);
    } catch (error) {
      console.error('Failed to get estimate:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate an estimate. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (result) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <Wand2 className="mx-auto h-12 w-12 text-primary" />
          <CardTitle className="text-2xl font-headline">{translations.quote.result.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">{translations.quote.result.estimatedCost}</p>
            <p className="text-5xl font-bold font-headline text-primary">
              {result.estimatedQuote.toFixed(2)} {translations.quote.result.chf}
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">{translations.quote.result.breakdown}</h3>
            <p className="text-sm text-muted-foreground p-4 bg-muted rounded-md">{result.breakdown}</p>
          </div>
        </CardContent>
        <CardFooter className="flex-col text-center gap-4">
          <p className="text-xs text-muted-foreground">{translations.quote.result.disclaimer}</p>
          <Button onClick={() => setResult(null)}>{translations.quote.result.newEstimate}</Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="propertyType">{translations.quote.form.propertyType}</Label>
              <Controller
                name="propertyType"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder={translations.quote.form.propertyTypePlaceholder} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">{translations.quote.form.apartment}</SelectItem>
                      <SelectItem value="house">{translations.quote.form.house}</SelectItem>
                      <SelectItem value="office">{translations.quote.form.office}</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.propertyType && <p className="text-destructive text-sm mt-1">{errors.propertyType.message}</p>}
            </div>
            <div>
              <Label htmlFor="cleaningFrequency">{translations.quote.form.cleaningFrequency}</Label>
              <Controller
                name="cleaningFrequency"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder={translations.quote.form.cleaningFrequencyPlaceholder} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="once">{translations.quote.form.once}</SelectItem>
                      <SelectItem value="weekly">{translations.quote.form.weekly}</SelectItem>
                      <SelectItem value="bi-weekly">{translations.quote.form.biweekly}</SelectItem>
                      <SelectItem value="monthly">{translations.quote.form.monthly}</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.cleaningFrequency && <p className="text-destructive text-sm mt-1">{errors.cleaningFrequency.message}</p>}
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="propertySizeSqMeters">{translations.quote.form.propertySize}</Label>
              <Input id="propertySizeSqMeters" type="number" {...register('propertySizeSqMeters')} />
              {errors.propertySizeSqMeters && <p className="text-destructive text-sm mt-1">{errors.propertySizeSqMeters.message}</p>}
            </div>
            <div>
              <Label htmlFor="numberOfRooms">{translations.quote.form.numberOfRooms}</Label>
              <Input id="numberOfRooms" type="number" {...register('numberOfRooms')} />
              {errors.numberOfRooms && <p className="text-destructive text-sm mt-1">{errors.numberOfRooms.message}</p>}
            </div>
          </div>
          <div>
            <Label>{translations.quote.form.additionalServices}</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
              {additionalServicesOptions.map(service => (
                <Controller
                  key={service.id}
                  name="additionalServices"
                  control={control}
                  render={({ field }) => (
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={service.id}
                        checked={field.value?.includes(service.id)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...(field.value || []), service.id])
                            : field.onChange(field.value?.filter(value => value !== service.id));
                        }}
                      />
                      <Label htmlFor={service.id} className="font-normal">{service.label}</Label>
                    </div>
                  )}
                />
              ))}
            </div>
          </div>
          <div>
            <Label htmlFor="comments">{translations.quote.form.comments}</Label>
            <Textarea
              id="comments"
              placeholder={translations.quote.form.commentsPlaceholder}
              {...register('comments')}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {translations.quote.form.loading}
              </>
            ) : (
              translations.quote.form.submit
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
