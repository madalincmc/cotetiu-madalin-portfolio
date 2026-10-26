import type { MetadataRoute } from "next";
import { getAllPosts, postSlug } from "@/lib/content/blog";
import { getAllProjects, projectSlug } from "@/lib/content/projects";
import { siteConfig } from "@/lib/site-config";

const STATIC_ROUTES = ["/", "/projects", "/blog", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
  }));

  const projectEntries: MetadataRoute.Sitemap = getAllProjects().map((project) => ({
    url: `${siteConfig.url}/projects/${projectSlug(project)}`,
    lastModified: project.publishedAt,
  }));

  const postEntries: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${siteConfig.url}/blog/${postSlug(post)}`,
    lastModified: post.updatedAt ?? post.publishedAt,
  }));

  return [...staticEntries, ...projectEntries, ...postEntries];
}
