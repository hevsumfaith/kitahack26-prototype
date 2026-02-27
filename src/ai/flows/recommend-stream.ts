'use server';
/**
 * @fileOverview This file implements the HalaTuju Career Oracle Genkit flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendStreamInputSchema = z.object({
  studentName: z.string().describe('The name of the student.'),
  language: z.enum(['en', 'ms']).default('en').describe('The output language.'),
  grades: z.record(z.string()).describe('The student\'s Form 3 grades (A, B, C, D, E, or G) for core subjects.'),
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
  keyInsights: z.string().describe('A 2-sentence explanation of WHY they fit this stream based on their passion for People/Data/Things and their academic grades.'),
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
  prompt: `You are the "HalaTuju Career Oracle," a specialized AI advisor for Malaysian secondary school students. Your mission is to analyze both academic grades and 90 assessment answers to provide a high-accuracy Form 4 stream recommendation.

### DATA:
Student: {{{studentName}}}

ACADEMIC GRADES:
{{#each grades}}
- {{{@key}}}: {{{this}}}
{{/each}}

ASSESSMENT SECTIONS:
1. Section 1 (Interest & Social - 30 answers): {{#each streamAnswers}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
2. Section 2 (Personality - 30 answers): {{#each personalityAnswers}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
3. Section 3 (Problem Solving - 30 answers): {{#each personalityAnswers}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

### SCORING LOGIC:
1. ACADEMIC WEIGHT (40%): 
   - Science Stream requires at least B in Math and Science.
   - Business requires at least C in Math.
   - Arts/TVET are more flexible but look for strengths in BM/BI.

2. ASSESSMENT WEIGHT (60%):
   - Analyze Domain (Mostly A: Science, B: Arts, C: TVET, D: Business).
   - Factor in Introversion (I) vs Extroversion (E).

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
In "keyInsights", mention how their specific grades (e.g. "Your strong Math results...") support the recommendation.
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
