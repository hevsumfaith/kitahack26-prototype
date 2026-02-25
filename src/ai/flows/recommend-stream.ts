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
  language: z.enum(['en', 'ms']).default('en').describe('The output language for insights.'),
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
  prompt: `You are an expert educational counselor in Malaysia. Your goal is to logicially calculate the compatibility of a student with various academic streams.

Language Output Instruction: Provide the 'keyInsights' in the requested language: {{{language}}}. (en = English, ms = Bahasa Melayu).

Logic Guidelines:
1. Weight Interests at 60%: A student's passion is the primary driver for long-term success.
2. Weight Strengths at 40%: Natural aptitudes indicate the student's ease of learning specific subjects.
3. Penalty: If a student's interests are purely creative but the stream is purely technical, compatibility should not exceed 50% unless they possess overlapping strengths like "Attention to Detail".

Student Profile:
Name: {{{studentName}}}

Interests:
{{#each interests}} - {{{this}}} {{/each}}

Strengths:
{{#each strengths}} - {{{this}}} {{/each}}

Available Streams:
{{#each availableStreams}}
- Stream: {{{streamName}}}
  Focus: {{{description}}}
  Subjects: {{#each subjects}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
{{/each}}

Calculate a compatibility percentage for EVERY stream. Identify the 'mostSuitableStream'.
In 'keyInsights', explain the LOGIC used: point out exactly which interests matched which subjects, and how their strengths will help them excel in this specific stream. Use the language {{{language}}}.

Ensure output is valid JSON according to the schema.`,
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
