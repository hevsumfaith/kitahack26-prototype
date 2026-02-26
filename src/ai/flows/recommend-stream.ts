'use server';
/**
 * @fileOverview This file implements the HalaTuju Career Oracle Genkit flow.
 *
 * - recommendStream - A function that handles the Kitahack Career Test logic.
 * - RecommendStreamInput - The input type for the recommendStream function.
 * - RecommendStreamOutput - The return type for the recommendStream function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendStreamInputSchema = z.object({
  studentName: z.string().describe('The name of the student.'),
  language: z.enum(['en', 'ms']).default('en').describe('The output language.'),
  streamAnswers: z.array(z.string()).describe('Array of answers (A, B, C, or D) from the stream preference section.'),
  personalityAnswers: z.array(z.string()).describe('Array of answers (I or E) from the personality section.'),
});
export type RecommendStreamInput = z.infer<typeof RecommendStreamInputSchema>;

const RecommendStreamOutputSchema = z.object({
  streamCompatibility: z
    .array(
      z.object({
        streamName: z.string().describe('The name of the Form 4 stream.'),
        compatibilityPercentage: z.number().min(0).max(100),
      })
    )
    .describe('Compatibility percentages for all 4 streams.'),
  mostSuitableStream: z.string().describe('The name of the recommended stream.'),
  personalityProfile: z.string().describe('A catchy personality title (e.g., The Technical Thinker).'),
  keyInsights: z.string().describe('A 2-sentence encouraging explanation of WHY they fit this stream.'),
  suggestedCareers: z.array(z.string()).describe('List of 2 specific jobs from the career matrix.'),
});
export type RecommendStreamOutput = z.infer<typeof RecommendStreamOutputSchema>;

export async function recommendStream(input: RecommendStreamInput): Promise<RecommendStreamOutput> {
  return recommendStreamFlow(input);
}

const oraclePrompt = ai.definePrompt({
  name: 'oraclePrompt',
  input: {schema: RecommendStreamInputSchema},
  output: {schema: RecommendStreamOutputSchema},
  prompt: `You are the "HalaTuju Career Oracle," a specialized AI advisor for Malaysian secondary school students. Your mission is to analyze student assessment data and provide a highly accurate Form 4 stream recommendation based on the "Kitahack Career Test" logic.

### SCORING LOGIC:
1. PRIMARY STREAM:
   - MOSTLY A: Science Stream (The Logic Seekers)
   - MOSTLY B: Arts & Humanities Stream (The Storytellers)
   - MOSTLY C: TVET / Vocational Stream (The Makers)
   - MOSTLY D: Business & Accountancy Stream (The Strategists)

2. PERSONALITY (MBTI-Light):
   - Determine if the user is "Extrovert" (E) or "Introvert" (I) based on the majority of personalityAnswers.

### CAREER MAPPING MATRIX:
Recommend careers based on the Stream + Personality combination:
- Science + E: Medical Doctor, Project Engineer.
- Science + I: Data Scientist, Research Lab Chemist.
- Arts + E: Public Relations Specialist, Lawyer.
- Arts + I: Content Writer, Digital Illustrator.
- TVET + E: Aviation Cabin Crew, Chef de Cuisine.
- TVET + I: Software Developer, Automotive Specialist.
- Business + E: Entrepreneur, Marketing Manager.
- Business + I: Investment Analyst, Accountant.

### TONE:
Encouraging, professional, and clear. Use "HalaTuju" branding. Output language: {{{language}}}.

Student: {{{studentName}}}
Stream Answers: {{#each streamAnswers}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
Personality Answers: {{#each personalityAnswers}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

Calculate results and return strictly valid JSON.`,
});

const recommendStreamFlow = ai.defineFlow(
  {
    name: 'recommendStreamFlow',
    inputSchema: RecommendStreamInputSchema,
    outputSchema: RecommendStreamOutputSchema,
  },
  async input => {
    const {output} = await oraclePrompt(input);
    return output!;
  }
);
