import { defineCollections } from "fumadocs-mdx/macro";
import { postSchema } from "./schemas";

const posts = defineCollections({
  type: "doc",
  dir: "content/blog",
  schema: postSchema,
});

export type Post = (typeof posts.entries)[number];

const WORDS_PER_MINUTE = 230;

const showDrafts = process.env.NODE_ENV !== "production";

function slugFromPath(path: string): string {
  return path.replace(/\.mdx?$/, "");
}

function sortByPublishedAtDesc(a: Post, b: Post): number {
  return b.publishedAt.getTime() - a.publishedAt.getTime();
}

export function getAllPosts(): Post[] {
  return posts.entries.filter((post) => showDrafts || !post.draft).sort(sortByPublishedAtDesc);
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((post) => postSlug(post) === slug);
}

export function getLatestPosts(limit = 3): Post[] {
  return getAllPosts().slice(0, limit);
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  for (const post of getAllPosts()) {
    for (const tag of post.tags) tags.add(tag);
  }
  return [...tags].sort();
}

/** Posts sharing the most tags (category match as a tiebreaker), excluding the post itself. */
export function getRelatedPosts(post: Post, limit = 2): Post[] {
  const slug = postSlug(post);
  return getAllPosts()
    .filter((candidate) => postSlug(candidate) !== slug)
    .map((candidate) => ({
      candidate,
      score:
        candidate.tags.filter((tag) => post.tags.includes(tag)).length * 2 +
        (candidate.category === post.category ? 1 : 0),
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}

export function postText(post: Post): string {
  return post.structuredData.contents.map((c) => c.content).join(" ");
}

export function readingTimeMinutes(post: Post): number {
  const words = postText(post).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

export function postSlug(post: Post): string {
  return slugFromPath(post.info.path);
}
