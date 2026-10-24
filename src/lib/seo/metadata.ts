import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

/**
 * `title` should be the short, page-level title (e.g. "About") — the root layout's
 * title template appends the site name automatically for the `<title>` tag. OG/Twitter
 * titles don't go through that template, so the full "Page — Site" form is built here.
 */
export function buildMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const fullTitle = `${title} — ${siteConfig.name}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
