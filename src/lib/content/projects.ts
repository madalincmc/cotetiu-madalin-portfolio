import { defineCollections } from "fumadocs-mdx/macro";
import { projectSchema, type ProjectCategory } from "./schemas";

const projects = defineCollections({
  type: "doc",
  dir: "content/projects",
  schema: projectSchema,
});

export type Project = (typeof projects.entries)[number];

function slugFromPath(path: string): string {
  return path.replace(/\.mdx?$/, "");
}

function sortByPublishedAtDesc(a: Project, b: Project): number {
  return b.publishedAt.getTime() - a.publishedAt.getTime();
}

export function getAllProjects(): Project[] {
  return [...projects.entries].sort(sortByPublishedAtDesc);
}

export function getProjectSlugs(): string[] {
  return projects.entries.map((entry) => slugFromPath(entry.info.path));
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.entries.find((entry) => slugFromPath(entry.info.path) === slug);
}

export function getFeaturedProjects(limit = 4): Project[] {
  return getAllProjects()
    .filter((project) => project.featured)
    .slice(0, limit);
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return getAllProjects().filter((project) => project.category === category);
}

export function getProjectsByTechnology(technology: string): Project[] {
  return getAllProjects().filter((project) => project.technologies.includes(technology));
}

export function getAllTechnologies(): string[] {
  const technologies = new Set<string>();
  for (const project of projects.entries) {
    for (const tech of project.technologies) technologies.add(tech);
  }
  return [...technologies].sort();
}

export function projectSlug(project: Project): string {
  return slugFromPath(project.info.path);
}
