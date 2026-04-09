import { defineCollection} from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const popurris = defineCollection({
  loader: glob({ base: '../popurris', pattern: [
      '**/*.{md,mdx}',
      '!**/AI/**',
    ]}),
  schema: z.object({
    p_title: z.string(),
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

const docs = defineCollection({
  loader: glob({ base: '../docs', pattern: [
      '**/*.{md,mdx}',
    ]}),
  schema: z.object({
    p_title: z.string().optional(),
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


const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: [
      '**/*.{md,mdx}',
    ]}),
  schema: z.object({
    p_title: z.string(),
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


export const collections = { popurris, docs, posts };