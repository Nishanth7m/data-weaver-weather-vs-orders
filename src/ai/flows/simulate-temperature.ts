// src/ai/flows/simulate-temperature.ts
'use server';
/**
 * @fileOverview Simulates temperature based on city and date using a deterministic algorithm.
 *
 * - simulateTemperature - A function that takes city and date as input and returns a simulated temperature.
 * - SimulateTemperatureInput - The input type for the simulateTemperature function.
 * - SimulateTemperatureOutput - The return type for the simulateTemperature function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SimulateTemperatureInputSchema = z.object({
  city: z.string().describe('The city for which to simulate the temperature.'),
  date: z.string().describe('The date for which to simulate the temperature (YYYY-MM-DD).'),
});
export type SimulateTemperatureInput = z.infer<typeof SimulateTemperatureInputSchema>;

const SimulateTemperatureOutputSchema = z.object({
  temperature: z.number().describe('The simulated temperature in Celsius.'),
});
export type SimulateTemperatureOutput = z.infer<typeof SimulateTemperatureOutputSchema>;

/**
 * Simulates temperature based on city and date.
 * @param input - The input containing the city and date.
 * @returns The simulated temperature.
 */
export async function simulateTemperature(input: SimulateTemperatureInput): Promise<SimulateTemperatureOutput> {
  return simulateTemperatureFlow(input);
}

const prompt = ai.definePrompt({
  name: 'simulateTemperaturePrompt',
  input: {schema: SimulateTemperatureInputSchema},
  output: {schema: SimulateTemperatureOutputSchema},
  prompt: `You are a weather simulation expert. Given the city and date, you will simulate a temperature in Celsius. Use a deterministic algorithm based on the city and date provided.

City: {{{city}}}
Date: {{{date}}}

Return the simulated temperature as a number.

Here's how temperature simulation works. Convert date -> integer and mix with city hash. City hash will be calculated deterministically, and then base temps per city (small deterministic base). Then vary by day.
`,
});

const simulateTemperatureFlow = ai.defineFlow(
  {
    name: 'simulateTemperatureFlow',
    inputSchema: SimulateTemperatureInputSchema,
    outputSchema: SimulateTemperatureOutputSchema,
  },
  async input => {
    // Convert date -> integer and mix with city hash
    const d = new Date(input.date);
    const day = d.getDate();
    // city hash
    let h = 0;
    for (let i = 0; i < input.city.length; i++) {
      h = (h << 5) - h + input.city.charCodeAt(i);
    }
    // base temps per city (small deterministic base)
    const base = 20 + (Math.abs(h) % 10); // 20..29
    // vary by day
    const temperature = base + ((day % 5) - 2);

    return {temperature};
  }
);
