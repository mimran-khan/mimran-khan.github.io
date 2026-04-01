import { defineCollection, z } from 'astro:content';

const experience = defineCollection({
  type: 'content',
  schema: z.object({
    company: z.string(),
    role: z.string(),
    startDate: z.string(),
    endDate: z.string().optional(),
    location: z.string(),
    order: z.number(),
    highlights: z.array(z.string()),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    techStack: z.array(z.string()),
    link: z.string().optional(),
    github: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number(),
  }),
});

const achievements = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    year: z.string(),
    order: z.number(),
  }),
});

export const collections = {
  experience,
  projects,
  achievements,
};
