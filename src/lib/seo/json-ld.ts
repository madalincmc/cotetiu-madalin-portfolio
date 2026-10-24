import type { Project } from "@/lib/content/projects";
import { projectSlug } from "@/lib/content/projects";
import { siteConfig } from "@/lib/site-config";

const personRef = {
  "@type": "Person" as const,
  name: siteConfig.name,
  url: siteConfig.url,
};

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.title,
    description: siteConfig.tagline,
    url: siteConfig.url,
    email: `mailto:${siteConfig.email}`,
    sameAs: [siteConfig.social.linkedin, siteConfig.social.github],
  };
}

export function creativeWorkJsonLd(project: Project) {
  const url = `${siteConfig.url}/projects/${projectSlug(project)}`;

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    image: `${siteConfig.url}${project.coverImage}`,
    datePublished: project.publishedAt.toISOString(),
    author: personRef,
    url,
    keywords: project.technologies.join(", "),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}
