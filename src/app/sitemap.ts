import type { MetadataRoute } from "next";
import { getAllProjects, projectSlug } from "@/lib/content/projects";
import { siteConfig } from "@/lib/site-config";

const STATIC_ROUTES = ["/", "/projects", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
  }));

  const projectEntries: MetadataRoute.Sitemap = getAllProjects().map((project) => ({
    url: `${siteConfig.url}/projects/${projectSlug(project)}`,
    lastModified: project.publishedAt,
  }));

  return [...staticEntries, ...projectEntries];
}
