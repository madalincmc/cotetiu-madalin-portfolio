import { z } from "zod";

export const PROJECT_CATEGORIES = [
  "Websites",
  "Applications",
  "Browser Extensions",
  "Automation",
  "Open Source",
  "AI",
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

const galleryItemSchema = z.object({
  path: z.string(),
  alt: z.string(),
  type: z.enum(["image", "video"]).default("image"),
});

export const projectSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.enum(PROJECT_CATEGORIES),
  technologies: z.array(z.string()).default([]),
  coverImage: z.string(),
  gallery: z.array(galleryItemSchema).default([]),
  githubUrl: z.url().optional(),
  liveUrl: z.url().optional(),
  firefoxUrl: z.url().optional(),
  featured: z.boolean().default(false),
  publishedAt: z.coerce.date(),
});

export type ProjectFrontmatter = z.infer<typeof projectSchema>;

export const POST_CATEGORIES = [
  "Engineering",
  "Leadership",
  "QA & Testing",
  "Automation",
  "AI",
  "Career",
] as const;

export type PostCategory = (typeof POST_CATEGORIES)[number];

export const postSchema = z.object({
  title: z.string(),
  description: z.string().max(200),
  category: z.enum(POST_CATEGORIES),
  tags: z.array(z.string()).default([]),
  coverImage: z.string(),
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
  // Drafts render under `next dev` (with a badge) so they can be reviewed, but are left out of
  // production builds entirely: no page, no sitemap/RSS entry, no search record.
  draft: z.boolean().default(false),
});

export type PostFrontmatter = z.infer<typeof postSchema>;
