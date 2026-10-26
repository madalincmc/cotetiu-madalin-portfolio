import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { postCategoryStyles } from "@/lib/category-styles";
import type { Post } from "@/lib/content/blog";
import { postSlug, readingTimeMinutes } from "@/lib/content/blog";
import { cn } from "@/lib/utils";

export function formatPostDate(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function PostCard({ post }: { post: Post }) {
  const styles = postCategoryStyles[post.category];

  return (
    <SpotlightCard className="group h-full rounded-2xl">
      <Link
        href={`/blog/${postSlug(post)}`}
        className="border-border bg-card/70 hover:border-brand-1/40 hover:shadow-brand-1/15 relative flex h-full flex-col overflow-hidden rounded-2xl border backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
      >
        <div className="bg-muted relative aspect-[1200/630] overflow-hidden">
          <Image
            src={post.coverImage}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {post.draft ? (
            <span className="bg-brand-5 absolute top-3 right-3 rounded-full px-2.5 py-0.5 font-mono text-[11px] font-semibold text-black">
              Draft
            </span>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col gap-3 p-6">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className={cn("rounded-full border px-2.5 py-0.5", styles.badge)}>
              {post.category}
            </span>
            <time dateTime={post.publishedAt.toISOString()} className="text-muted-foreground">
              {formatPostDate(post.publishedAt)}
            </time>
            <span className="text-muted-foreground">· {readingTimeMinutes(post)} min read</span>
          </div>
          <h3 className="flex items-start justify-between gap-3 text-xl font-bold tracking-tight">
            {post.title}
            <ArrowUpRight
              className="text-muted-foreground group-hover:text-foreground mt-1 size-5 shrink-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </h3>
          <p className="text-muted-foreground line-clamp-3 text-sm text-pretty">
            {post.description}
          </p>
          {post.tags.length > 0 ? (
            <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
              {post.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="border-border bg-background/50 rounded-md border px-2 py-0.5 font-mono text-[11px]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </Link>
    </SpotlightCard>
  );
}
