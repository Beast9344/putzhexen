'use server';

/**
 * @fileOverview Provides an initial service quote estimate based on the details provided in the quote request form.
 *
 * - smartEstimator - A function that handles the service quote estimation process.
 * - SmartEstimatorInput - The input type for the smartEstimator function.
 * - SmartEstimatorOutput - The return type for the smartEstimator function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartEstimatorInputSchema = z.object({
  propertyType: z.string().describe('The type of property (e.g., apartment, house, office).'),
  propertySizeSqMeters: z.number().describe('The size of the property in square meters.'),
  numberOfRooms: z.number().describe('The number of rooms in the property.'),
  cleaningFrequency: z.string().describe('How often the cleaning is needed (e.g., once, weekly, monthly).'),
  additionalServices: z.array(z.string()).describe('Any additional services requested (e.g., window cleaning, carpet cleaning).'),
  comments: z.string().optional().describe('Any additional comments or specific needs.'),
});
export type SmartEstimatorInput = z.infer<typeof SmartEstimatorInputSchema>;

const SmartEstimatorOutputSchema = z.object({
  estimatedQuote: z.number().describe('The estimated service quote in CHF.'),
  breakdown: z.string().describe('A breakdown of how the estimate was calculated.'),
});
export type SmartEstimatorOutput = z.infer<typeof SmartEstimatorOutputSchema>;

export async function smartEstimator(input: SmartEstimatorInput): Promise<SmartEstimatorOutput> {
  return smartEstimatorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smartEstimatorPrompt',
  input: {schema: SmartEstimatorInputSchema},
  output: {schema: SmartEstimatorOutputSchema},
  prompt: `You are a cleaning service quote estimator for Putzhexen Services, a cleaning company in Switzerland.  Given the following details from a quote request form, provide an estimated service quote in CHF and a breakdown of how you calculated the estimate.

Property Type: {{{propertyType}}}
Property Size: {{{propertySizeSqMeters}}} square meters
Number of Rooms: {{{numberOfRooms}}}
Cleaning Frequency: {{{cleaningFrequency}}}
Additional Services: {{#each additionalServices}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
Comments: {{{comments}}}

Consider the average cleaning costs in Switzerland and provide a reasonable estimate.`,
});

const smartEstimatorFlow = ai.defineFlow(
  {
    name: 'smartEstimatorFlow',
    inputSchema: SmartEstimatorInputSchema,
    outputSchema: SmartEstimatorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
