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
