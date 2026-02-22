'use server';
/**
 * @fileOverview This file implements a Genkit flow for recommending a suitable Form 4 stream to students.
 *
 * - recommendStream - A function that handles the stream recommendation process.
 * - RecommendStreamInput - The input type for the recommendStream function.
 * - RecommendStreamOutput - The return type for the recommendStream function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendStreamInputSchema = z.object({
  studentName: z.string().describe('The name of the student.'),
  assessmentResults: z
    .array(
      z.object({
        assessmentName: z.string().describe('Name of the assessment (e.g., Aptitude Test, Personality Quiz).'),
        score: z
          .number()
          .optional()
          .describe('Numerical score from the assessment, if applicable.'),
        qualitativeResult: z
          .string()
          .optional()
          .describe('Qualitative description or summary of the assessment result, if applicable.'),
      })
    )
    .describe('Results from various aptitude and interest assessments.'),
  strengths: z
    .array(z.string())
    .describe('List of student strengths identified through assessments or self-reflection.'),
  interests: z
    .array(z.string())
    .describe('List of student interests identified through assessments or self-reflection.'),
  availableStreams: z
    .array(
      z.object({
        streamName: z.string().describe('The name of the Form 4 stream (e.g., Science, Arts, Technical).'),
        description: z.string().describe('A brief description of the stream.'),
        subjects: z.array(z.string()).describe('Key subjects offered in this stream.'),
        careerPaths: z
          .array(z.string())
          .optional()
          .describe('Potential career paths associated with this stream.'),
      })
    )
    .describe('A list of all available Form 4 streams with their details.'),
});
export type RecommendStreamInput = z.infer<typeof RecommendStreamInputSchema>;

const RecommendStreamOutputSchema = z.object({
  streamCompatibility: z
    .array(
      z.object({
        streamName: z.string().describe('The name of the Form 4 stream.'),
        compatibilityPercentage: z
          .number()
          .min(0)
          .max(100)
          .describe('The calculated compatibility percentage (0-100) for this stream.'),
      })
    )
    .describe('A list of available streams with their calculated compatibility percentages.'),
  mostSuitableStream: z
    .string()
    .describe('The name of the Form 4 stream identified as most suitable.'),
  keyInsights: z
    .string()
    .describe(
      'A detailed explanation of why the recommended stream is suitable, referencing student strengths, interests, and assessment results.'
    ),
});
export type RecommendStreamOutput = z.infer<typeof RecommendStreamOutputSchema>;

export async function recommendStream(input: RecommendStreamInput): Promise<RecommendStreamOutput> {
  return recommendStreamFlow(input);
}

const streamRecommendationPrompt = ai.definePrompt({
  name: 'streamRecommendationPrompt',
  input: {schema: RecommendStreamInputSchema},
  output: {schema: RecommendStreamOutputSchema},
  prompt: `You are an experienced educational counselor specializing in guiding Form 3 students in Malaysia to choose the most suitable Form 4 academic stream. Your goal is to provide a personalized recommendation based on a student's profile, assessment results, strengths, and interests, rather than just academic grades.

Student Profile:
Name: {{{studentName}}}

Assessment Results:
{{#each assessmentResults}}
  - Assessment: {{{assessmentName}}}
    {{#if score}}Score: {{{score}}}{{/if}}
    {{#if qualitativeResult}}Result: {{{qualitativeResult}}}{{/if}}
{{/each}}

Identified Strengths:
{{#each strengths}}
  - {{{this}}}
{{/each}}

Identified Interests:
{{#each interests}}
  - {{{this}}}
{{/each}}

Available Form 4 Streams:
{{#each availableStreams}}
  Stream Name: {{{streamName}}}
  Description: {{{description}}}
  Key Subjects: {{#each subjects}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
  {{#if careerPaths}}Potential Career Paths: {{#each careerPaths}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{/if}}

Please analyze the provided student information and the available streams. For each stream, calculate a compatibility percentage (from 0 to 100) that reflects how well it aligns with the student's profile, assessment results, strengths, and interests. Then, identify the single most suitable stream.

Finally, provide a detailed explanation (key insights) justifying your recommendation, highlighting specific connections between the student's attributes and the chosen stream's characteristics.

Ensure your output adheres strictly to the JSON schema provided.`,
});

const recommendStreamFlow = ai.defineFlow(
  {
    name: 'recommendStreamFlow',
    inputSchema: RecommendStreamInputSchema,
    outputSchema: RecommendStreamOutputSchema,
  },
  async input => {
    const {output} = await streamRecommendationPrompt(input);
    return output!;
  }
);
