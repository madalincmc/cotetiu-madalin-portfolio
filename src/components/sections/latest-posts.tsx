import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PostCard } from "@/components/blog/post-card";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { SectionHeading } from "@/components/sections/section-heading";
import { getLatestPosts } from "@/lib/content/blog";

export function LatestPosts() {
  const posts = getLatestPosts(3);
  if (posts.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        eyebrow="Blog"
        title={
          <>
            Latest <span className="text-gradient animate-gradient-x">writing</span>
          </>
        }
        description="Notes on engineering, leadership, testing and the tools I build."
        action={
          <Link
            href="/blog"
            className="text-muted-foreground hover:text-foreground group inline-flex items-center gap-1.5 font-mono text-sm transition-colors"
          >
            All posts
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        }
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <RevealOnScroll key={post.info.path} delay={index * 0.08} className="h-full">
            <PostCard post={post} />
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
