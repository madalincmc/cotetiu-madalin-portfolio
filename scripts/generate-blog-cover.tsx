import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { getAllPosts, getPostBySlug, postSlug, type Post } from "@/lib/content/blog";
import type { PostCategory } from "@/lib/content/schemas";
import { siteConfig } from "@/lib/site-config";

// Usage:
//   npm run blog:cover -- <slug>     render one post's cover (overwrites)
//   npm run blog:cover -- --missing  render covers for every post whose coverImage file is absent
//
// Covers are drawn from code (next/og → PNG) so every post gets an on-brand image without an
// external image service. The file lands at the post's `coverImage` path under public/.

const WIDTH = 1200;
const HEIGHT = 630;

// Hex approximations of the dark-theme brand tokens in globals.css (satori has no oklch).
const BRAND = {
  violet: "#a77bff",
  cyan: "#5fd4f0",
  green: "#6fe88a",
  pink: "#ff5c9d",
  amber: "#ffc35a",
};

const CATEGORY_COLORS: Record<PostCategory, [string, string]> = {
  Engineering: [BRAND.violet, BRAND.cyan],
  Leadership: [BRAND.amber, BRAND.pink],
  "QA & Testing": [BRAND.green, BRAND.cyan],
  Automation: [BRAND.cyan, BRAND.violet],
  AI: [BRAND.pink, BRAND.violet],
  Career: [BRAND.cyan, BRAND.amber],
};

function titleFontSize(title: string): number {
  if (title.length <= 40) return 76;
  if (title.length <= 65) return 64;
  return 52;
}

function Cover({ post }: { post: Post }) {
  const [primary, secondary] = CATEGORY_COLORS[post.category];
  const host = new URL(siteConfig.url).host;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        backgroundColor: "#09090b",
        backgroundImage: `radial-gradient(circle at 88% 12%, ${primary}55 0%, transparent 45%), radial-gradient(circle at 8% 100%, ${secondary}40 0%, transparent 50%)`,
        color: "#fafafa",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 24 }}>
        <div style={{ display: "flex", color: primary, letterSpacing: 4 }}>
          {`// ${post.category.toUpperCase()}`}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <div
          style={{
            display: "flex",
            width: 120,
            height: 8,
            borderRadius: 4,
            backgroundImage: `linear-gradient(90deg, ${primary}, ${secondary})`,
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: titleFontSize(post.title),
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: -1.5,
            maxWidth: 1000,
          }}
        >
          {post.title}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 12 }}>
          {post.tags.slice(0, 3).map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                padding: "6px 16px",
                borderRadius: 999,
                border: "1px solid #3f3f46",
                color: "#d4d4d8",
                fontSize: 22,
              }}
            >
              {`#${tag}`}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <div style={{ display: "flex", fontSize: 26, fontWeight: 700 }}>{siteConfig.name}</div>
          <div style={{ display: "flex", fontSize: 20, color: "#a1a1aa" }}>{host}</div>
        </div>
      </div>
    </div>
  );
}

async function renderCover(post: Post): Promise<string> {
  if (!post.coverImage.startsWith("/")) {
    throw new Error(
      `${postSlug(post)}: coverImage must be a path under public/, got "${post.coverImage}"`,
    );
  }

  const response = new ImageResponse(<Cover post={post} />, { width: WIDTH, height: HEIGHT });
  const outputPath = path.join(process.cwd(), "public", post.coverImage);
  mkdirSync(path.dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, Buffer.from(await response.arrayBuffer()));
  return outputPath;
}

async function main() {
  const arg = process.argv[2];
  if (!arg) {
    throw new Error("Pass a post slug, or --missing to render every absent cover.");
  }

  const targets =
    arg === "--missing"
      ? getAllPosts().filter(
          (post) => !existsSync(path.join(process.cwd(), "public", post.coverImage)),
        )
      : [getPostBySlug(arg)].filter((post): post is Post => post !== undefined);

  if (arg !== "--missing" && targets.length === 0) {
    throw new Error(`No post found with slug "${arg}" in content/blog/.`);
  }

  for (const post of targets) {
    console.log(`Cover written: ${path.relative(process.cwd(), await renderCover(post))}`);
  }
  if (targets.length === 0) console.log("Every post already has a cover.");
}

main().catch((error: unknown) => {
  console.error("Failed to generate blog cover:", error instanceof Error ? error.message : error);
  process.exit(1);
});
