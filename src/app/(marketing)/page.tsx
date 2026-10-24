import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Stats } from "@/components/sections/stats";
import { TechMarquee } from "@/components/sections/tech-marquee";
import { Principles } from "@/components/sections/principles";
import { BuildLog } from "@/components/sections/build-log";
import { FinalCta } from "@/components/sections/final-cta";
import { siteConfig } from "@/lib/site-config";

// Not using buildMetadata here: the homepage wants the root layout's full default
// title verbatim, not the short-title-plus-template form every other page uses.
export const metadata: Metadata = {
  alternates: { canonical: siteConfig.url },
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.title}`,
    description: siteConfig.tagline,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.title}`,
    description: siteConfig.tagline,
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <TechMarquee />
      <FeaturedProjects />
      <Principles />
      <BuildLog />
      <FinalCta />
    </>
  );
}
