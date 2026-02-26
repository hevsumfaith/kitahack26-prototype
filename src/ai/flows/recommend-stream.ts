'use server';
/**
 * @fileOverview This file implements the HalaTuju Career Oracle Genkit flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendStreamInputSchema = z.object({
  studentName: z.string().describe('The name of the student.'),
  language: z.enum(['en', 'ms']).default('en').describe('The output language.'),
  streamAnswers: z.array(z.string()).describe('Array of 30 answers (A, B, C, or D) from Section 1: Interest & Social Battery.'),
  personalityAnswers: z.array(z.string()).describe('Array of 30 answers (I or E) from Section 2: Personality.'),
  problemSolvingAnswers: z.array(z.string()).describe('Array of 30 answers (A, B, C, or D) from Section 3: Problem Solving.'),
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
    .describe('Compatibility percentages for all 4 streams based on the 90-question assessment.'),
  mostSuitableStream: z.string().describe('The name of the recommended stream.'),
  personalityProfile: z.string().describe('A catchy personality title based on Introvert vs Extrovert majority.'),
  keyInsights: z.string().describe('A 2-sentence explanation of WHY they fit this stream based on their passion for People/Data/Things.'),
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
  prompt: `You are the "HalaTuju Career Oracle," a specialized AI advisor for Malaysian secondary school students. Your mission is to analyze 90 assessment answers to provide a high-accuracy Form 4 stream recommendation.

### DATA:
Student: {{{studentName}}}
1. Section 1 (Interest & Social Battery - 30 answers): {{#each streamAnswers}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
2. Section 2 (Personality - 30 answers): {{#each personalityAnswers}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
3. Section 3 (Problem Solving - 30 answers): {{#each problemSolvingAnswers}}{{#unless @last}}, {{/unless}}{{/each}}

### SCORING LOGIC:
1. TOTAL DOMAIN SCORE (60 points total):
   - Combine Section 1 (30) and Section 3 (30).
   - Count A (Science/Data), B (Arts/People), C (TVET/Things), D (Business/People-Strategy).
   - MOSTLY A: Science Stream
   - MOSTLY B: Arts & Humanities Stream
   - MOSTLY C: TVET / Vocational Stream
   - MOSTLY D: Business & Accountancy Stream
   - Calculate compatibility percentages for all four streams.

2. PERSONALITY (30 points total):
   - Section 2 is dedicated to Introversion (I) vs Extroversion (E). Majority wins.

### CAREER MAPPING MATRIX:
- Science + E: Medical Doctor, Project Engineer.
- Science + I: Data Scientist, Research Lab Chemist.
- Arts + E: Public Relations Specialist, Lawyer.
- Arts + I: Content Writer, Digital Illustrator.
- TVET + E: Aviation Cabin Crew, Chef de Cuisine.
- TVET + I: Software Developer, Automotive Specialist.
- Business + E: Entrepreneur, Marketing Manager.
- Business + I: Investment Analyst, Accountant.

### TONE:
Output in {{{language}}}. Be encouraging and professional.
Ensure the "personalityProfile" is a creative title (e.g. "The Analytical Visionary").
Return valid JSON only.`,
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
