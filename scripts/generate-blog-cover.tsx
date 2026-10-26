import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { getAllPosts, getPostBySlug, postSlug, type Post } from "@/lib/content/blog";
import type { PostCategory } from "@/lib/content/schemas";

// Usage:
//   npm run blog:cover -- <slug>     render one post's cover (overwrites)
//   npm run blog:cover -- --missing  render covers for every post whose coverImage file is absent
//
// Covers are drawn from code (next/og → PNG) so every post gets an on-brand image without an
// external image service. They carry no text: the title already sits right above the cover on
// the post page and below it on cards, so repeating it in the image just reads as a screenshot.
//
// If `content/blog/<slug>.cover.svg` exists, that illustration is drawn over the category
// background; otherwise a geometric pattern seeded from the slug fills it. The PNG lands at the
// post's `coverImage` path under public/.

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

function illustrationPath(post: Post): string {
  return path.join(process.cwd(), "content", "blog", `${postSlug(post)}.cover.svg`);
}

/** Small deterministic PRNG (mulberry32) so a post's pattern never changes between runs. */
function seededRandom(seed: string): () => number {
  let state = 0;
  for (const char of seed) state = (Math.imul(state, 31) + char.charCodeAt(0)) | 0;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const PATTERN_COLUMNS = 12;
const PATTERN_ROWS = 6;
const PATTERN_CELL = 94;
// Centres the grid: (1200 - 11 × 94) / 2 and (630 - 5 × 94) / 2.
const PATTERN_INSET_X = 83;
const PATTERN_INSET_Y = 80;

/** A field of dots that thickens toward the top-right, in the category's two colours. */
function Pattern({ post }: { post: Post }) {
  const [primary, secondary] = CATEGORY_COLORS[post.category];
  const random = seededRandom(postSlug(post));
  const dots = [];

  for (let row = 0; row < PATTERN_ROWS; row++) {
    for (let column = 0; column < PATTERN_COLUMNS; column++) {
      const weight = (column / (PATTERN_COLUMNS - 1) + (1 - row / (PATTERN_ROWS - 1))) / 2;
      if (random() > weight + 0.15) continue;
      const size = 10 + Math.round(random() * 46 * weight);
      dots.push(
        <div
          key={`${row}-${column}`}
          style={{
            position: "absolute",
            left: PATTERN_INSET_X + column * PATTERN_CELL - size / 2,
            top: PATTERN_INSET_Y + row * PATTERN_CELL - size / 2,
            width: size,
            height: size,
            borderRadius: random() > 0.75 ? 12 : size,
            backgroundColor: random() > 0.5 ? primary : secondary,
            opacity: 0.25 + weight * 0.6,
          }}
        />,
      );
    }
  }

  return <div style={{ display: "flex", position: "absolute", inset: 0 }}>{dots}</div>;
}

function Cover({ post, illustration }: { post: Post; illustration: string | null }) {
  const [primary, secondary] = CATEGORY_COLORS[post.category];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        backgroundColor: "#09090b",
        backgroundImage: `radial-gradient(circle at 85% 15%, ${primary}55 0%, transparent 50%), radial-gradient(circle at 10% 95%, ${secondary}40 0%, transparent 55%)`,
      }}
    >
      {illustration ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={illustration} width={WIDTH} height={HEIGHT} alt="" />
      ) : (
        <Pattern post={post} />
      )}
    </div>
  );
}

async function renderCover(post: Post): Promise<string> {
  if (!post.coverImage.startsWith("/")) {
    throw new Error(
      `${postSlug(post)}: coverImage must be a path under public/, got "${post.coverImage}"`,
    );
  }

  const svgPath = illustrationPath(post);
  const illustration = existsSync(svgPath)
    ? `data:image/svg+xml;base64,${readFileSync(svgPath).toString("base64")}`
    : null;

  const response = new ImageResponse(<Cover post={post} illustration={illustration} />, {
    width: WIDTH,
    height: HEIGHT,
  });
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
    const source = existsSync(illustrationPath(post)) ? "illustration" : "pattern";
    console.log(
      `Cover written (${source}): ${path.relative(process.cwd(), await renderCover(post))}`,
    );
  }
  if (targets.length === 0) console.log("Every post already has a cover.");
}

main().catch((error: unknown) => {
  console.error("Failed to generate blog cover:", error instanceof Error ? error.message : error);
  process.exit(1);
});
