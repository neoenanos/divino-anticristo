import { defineCollection} from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  loader: glob({ base: './src/content/popurris', pattern: [
      '**/*.{md,mdx}',
      '!**/AI/**',
    ]}),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate:  z.coerce.date().optional(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().optional(),
    image: z.string().optional(),
    externalLink: z.string().optional(),
    slug: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };