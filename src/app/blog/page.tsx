import type { Metadata } from "next";
import { Rss } from "lucide-react";
import { getAllPosts, getAllTags } from "@/lib/content/blog";
import { POST_CATEGORIES } from "@/lib/content/schemas";
import { PostCard } from "@/components/blog/post-card";
import { FilterBar } from "@/components/filter-bar";
import { AuroraBackground } from "@/components/motion/aurora";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { buildMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/site-config";

const baseMetadata = buildMetadata({
  title: "Blog",
  description:
    "Notes on engineering, leadership, QA and test automation, AI tooling, and building side projects.",
  path: "/blog",
});

export const metadata: Metadata = {
  ...baseMetadata,
  alternates: {
    ...baseMetadata.alternates,
    types: { "application/rss+xml": `${siteConfig.url}/blog/feed.xml` },
  },
};

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const { filter } = await searchParams;
  const active = filter && filter !== "All" ? filter : "All";

  const posts = getAllPosts();
  const filtered =
    active === "All"
      ? posts
      : posts.filter((post) => post.category === active || post.tags.includes(active));

  // Only offer filters that match at least one post, so no filter leads to an empty page.
  const usedCategories = POST_CATEGORIES.filter((category) =>
    posts.some((post) => post.category === category),
  );
  const filters = [...new Set([...usedCategories, ...getAllTags()])];

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <AuroraBackground />
        <RevealOnScroll className="mx-auto max-w-6xl px-6 pt-20 pb-12 sm:pt-28">
          <p className="text-brand-2 mb-4 font-mono text-xs tracking-[0.2em] uppercase">
            {"// "}Blog
          </p>
          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
            Notes &amp; <span className="text-gradient animate-gradient-x">writing</span>
          </h1>
          <p className="text-muted-foreground mt-5 max-w-2xl text-lg text-pretty sm:text-xl">
            What I learn leading engineering teams, building test automation, and shipping side
            projects — written down so it sticks.
          </p>
          <a
            href="/blog/feed.xml"
            className="text-muted-foreground hover:text-foreground mt-6 inline-flex items-center gap-1.5 font-mono text-sm transition-colors"
          >
            <Rss className="size-4" aria-hidden="true" />
            RSS feed
          </a>
        </RevealOnScroll>
      </section>

      <div className="mx-auto max-w-6xl px-6 pb-24">
        {posts.length === 0 ? (
          <p className="text-muted-foreground mt-8 text-center font-mono text-sm">
            The first posts are on their way.
          </p>
        ) : (
          <>
            <FilterBar basePath="/blog" label="Filter posts" filters={filters} active={active} />

            <h2 className="sr-only">All posts</h2>

            {filtered.length === 0 ? (
              <p className="text-muted-foreground mt-16 text-center font-mono text-sm">
                No posts match this filter yet.
              </p>
            ) : (
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((post, index) => (
                  <RevealOnScroll
                    key={post.info.path}
                    delay={(index % 3) * 0.08}
                    className="h-full"
                  >
                    <PostCard post={post} />
                  </RevealOnScroll>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
