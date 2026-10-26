import { readFileSync, writeFileSync } from "node:fs";
import { ImageResponse } from "next/og";

// Usage: npm run blog:preview-svg -- <input.svg> <output.png>
//
// Rasterizes a diagram at the width it's actually shown in a post (~768px) so it can be checked
// visually — the Read tool shows PNGs but not SVGs. Preview only; posts embed the SVG itself.

const PREVIEW_WIDTH = 768;

async function main() {
  const [input, output] = process.argv.slice(2);
  if (!input || !output) {
    throw new Error("Usage: npm run blog:preview-svg -- <input.svg> <output.png>");
  }

  const svg = readFileSync(input, "utf8");
  const viewBox = svg
    .match(/viewBox="([\d.\s-]+)"/)?.[1]
    .trim()
    .split(/\s+/)
    .map(Number);
  if (!viewBox || viewBox.length !== 4) {
    throw new Error(`${input}: the <svg> element needs a viewBox attribute.`);
  }

  const [, , vbWidth, vbHeight] = viewBox;
  const height = Math.round((PREVIEW_WIDTH * vbHeight) / vbWidth);
  const src = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;

  const response = new ImageResponse(
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} width={PREVIEW_WIDTH} height={height} alt="" />,
    { width: PREVIEW_WIDTH, height },
  );
  writeFileSync(output, Buffer.from(await response.arrayBuffer()));
  console.log(`Preview written: ${output} (${PREVIEW_WIDTH}×${height})`);
}

main().catch((error: unknown) => {
  console.error("Failed to preview SVG:", error instanceof Error ? error.message : error);
  process.exit(1);
});
