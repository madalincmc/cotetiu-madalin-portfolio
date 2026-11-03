import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PostCard, formatPostDate } from "@/components/blog/post-card";
import { MdxImage } from "@/components/mdx/mdx-image";
import { Pre } from "@/components/mdx/pre";
import { AuroraBackground } from "@/components/motion/aurora";
import { HeroScene } from "@/components/motion/hero-scene";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { JsonLd } from "@/components/seo/json-ld";
import { postCategoryStyles } from "@/lib/category-styles";
import {
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
  postSlug,
  readingTimeMinutes,
} from "@/lib/content/blog";
import { blogPostingJsonLd, breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: postSlug(post) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const metadata = buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${slug}`,
  });

  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: "article",
      publishedTime: post.publishedAt.toISOString(),
      modifiedTime: post.updatedAt?.toISOString(),
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const Body = post.body;
  const styles = postCategoryStyles[post.category];
  const related = getRelatedPosts(post);
  // Only h2/h3 — deeper levels make the outline noisier than the article itself.
  const toc = post.toc.filter((item) => item.depth <= 3);

  return (
    <article>
      <JsonLd data={blogPostingJsonLd(post)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${slug}` },
        ])}
      />

      <header className="relative isolate overflow-hidden">
        <AuroraBackground />
        <HeroScene textEdge="22.5rem" />
        <RevealOnScroll className="mx-auto max-w-3xl px-6 pt-14 pb-10 sm:pt-20">
          <Link
            href="/blog"
            className="text-muted-foreground hover:text-foreground group inline-flex items-center gap-1.5 font-mono text-sm transition-colors"
          >
            <ArrowLeft
              className="size-4 transition-transform group-hover:-translate-x-1"
              aria-hidden="true"
            />
            All posts
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3 font-mono text-xs">
            {post.draft ? (
              <span className="bg-brand-5 rounded-full px-3 py-1 font-semibold text-black">
                Draft — not published
              </span>
            ) : null}
            <span className={cn("rounded-full border px-3 py-1", styles.badge)}>
              {post.category}
            </span>
            <time dateTime={post.publishedAt.toISOString()} className="text-muted-foreground">
              {formatPostDate(post.publishedAt)}
            </time>
            {post.updatedAt ? (
              <span className="text-muted-foreground">
                · Updated{" "}
                <time dateTime={post.updatedAt.toISOString()}>
                  {formatPostDate(post.updatedAt)}
                </time>
              </span>
            ) : null}
            <span className="text-muted-foreground">· {readingTimeMinutes(post)} min read</span>
          </div>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-balance sm:text-6xl">
            {post.title}
          </h1>
          <p className="text-muted-foreground mt-5 text-lg text-pretty sm:text-xl">
            {post.description}
          </p>

          {post.tags.length > 0 ? (
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tags">
              {post.tags.map((tag) => (
                <li key={tag}>
                  <Link
                    href={`/blog?filter=${encodeURIComponent(tag)}`}
                    className="border-border bg-card/60 hover:border-brand-1/50 rounded-md border px-2.5 py-1 font-mono text-xs backdrop-blur transition-colors"
                  >
                    #{tag}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </RevealOnScroll>
      </header>

      <div className="mx-auto max-w-4xl px-6">
        <RevealOnScroll>
          <div className="gradient-border bg-muted relative aspect-[1200/630] overflow-hidden rounded-2xl shadow-2xl shadow-black/20">
            <Image
              src={post.coverImage}
              alt=""
              fill
              sizes="(min-width: 1024px) 896px, 100vw"
              priority
              className="object-cover"
            />
          </div>
        </RevealOnScroll>
      </div>

      <div className="mx-auto max-w-3xl px-6">
        {toc.length >= 3 ? (
          <nav
            aria-label="Table of contents"
            className="border-border bg-card/50 mt-12 rounded-2xl border p-6 backdrop-blur"
          >
            <p className="text-brand-2 mb-3 font-mono text-xs tracking-[0.2em] uppercase">
              {"// "}On this page
            </p>
            <ol className="space-y-1.5 text-sm">
              {toc.map((item) => (
                <li key={item.url} className={cn(item.depth === 3 && "pl-4")}>
                  <a
                    href={item.url}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <div className="prose prose-neutral dark:prose-invert prose-headings:tracking-tight prose-headings:scroll-mt-24 prose-a:text-brand-1 prose-li:marker:text-brand-1 mt-12 max-w-none">
          <Body components={{ pre: Pre, img: MdxImage }} />
        </div>
      </div>

      {related.length > 0 ? (
        <div className="mx-auto max-w-5xl px-6 py-24">
          <p className="text-brand-2 mb-3 font-mono text-xs tracking-[0.2em] uppercase">
            {"// "}Keep reading
          </p>
          <h2 className="mb-6 text-3xl font-bold tracking-tight">Related posts</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {related.map((entry) => (
              <PostCard key={entry.info.path} post={entry} />
            ))}
          </div>
        </div>
      ) : (
        <div className="pb-24" />
      )}
    </article>
  );
}
