import { getAllPosts, postSlug } from "@/lib/content/blog";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const posts = getAllPosts();

  const items = posts
    .map((post) => {
      const url = `${siteConfig.url}/blog/${postSlug(post)}`;
      const categories = [post.category, ...post.tags]
        .map((category) => `      <category>${escapeXml(category)}</category>`)
        .join("\n");

      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${post.publishedAt.toUTCString()}</pubDate>
${categories}
    </item>`;
    })
    .join("\n");

  const lastBuildDate = (posts[0]?.publishedAt ?? new Date()).toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${siteConfig.name} — Blog`)}</title>
    <link>${siteConfig.url}/blog</link>
    <description>${escapeXml(siteConfig.tagline)}</description>
    <language>en</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${siteConfig.url}/blog/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
