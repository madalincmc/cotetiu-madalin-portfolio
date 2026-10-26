# Diagrams (hand-written SVG)

Diagrams are plain `.svg` files in `public/images/blog/<slug>/`, embedded with Markdown image
syntax. They render through a regular `<img>`, which means **the SVG cannot see the site's
light/dark toggle**. So every diagram carries its own dark card background — the same look as
the generated covers — and reads well on both themes.

## When to draw one

Draw a diagram when the reader needs to see **structure**: a flow between steps, layers of a
system, a before/after, a comparison of two approaches, a timeline. Don't draw one to decorate,
and don't redraw what a bullet list already says.

## Rules

- `viewBox="0 0 1200 H"` with `H` between 360 and 800, sized to the content (no big empty bands); no fixed `width`/`height` attributes
  (the page scales it to the column width, ~768px — so text must stay legible at ~64%).
- Background: `<rect width="100%" height="100%" rx="24" fill="#0f0f12"/>`.
- Text: `font-family="ui-sans-serif, system-ui, sans-serif"`; labels ≥ 26px, secondary text
  ≥ 22px (they shrink with the image). Primary text `#fafafa`, secondary `#a1a1aa`.
- Boxes: fill `#18181b`, stroke `#3f3f46`, `rx="14"`. Highlight one element at most with a
  brand stroke.
- Brand accents (same as covers): violet `#a77bff`, cyan `#5fd4f0`, green `#6fe88a`,
  pink `#ff5c9d`, amber `#ffc35a`. Use one or two per diagram, with meaning (e.g. green = pass,
  pink = fail), not as decoration.
- Arrows: stroke `#71717a`, width 3, with a shared `<marker>` arrowhead.
- Keep ≥ 40px padding inside the card; nothing touches the edges.
- Include `<title>` as the first child, matching the alt text.
- No external fonts, images, scripts, or `<foreignObject>`.

## Skeleton

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 400" role="img">
  <title>Request flows from the test runner through the API to the database</title>
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="#71717a"/>
    </marker>
  </defs>
  <rect width="100%" height="100%" rx="24" fill="#0f0f12"/>

  <g font-family="ui-sans-serif, system-ui, sans-serif">
    <rect x="80" y="130" width="280" height="140" rx="14" fill="#18181b" stroke="#3f3f46" stroke-width="2"/>
    <text x="220" y="195" fill="#fafafa" font-size="30" font-weight="700" text-anchor="middle">Test runner</text>
    <text x="220" y="235" fill="#a1a1aa" font-size="22" text-anchor="middle">Playwright</text>

    <line x1="360" y1="200" x2="450" y2="200" stroke="#71717a" stroke-width="3" marker-end="url(#arrow)"/>

    <rect x="460" y="130" width="280" height="140" rx="14" fill="#18181b" stroke="#a77bff" stroke-width="3"/>
    <text x="600" y="195" fill="#fafafa" font-size="30" font-weight="700" text-anchor="middle">API</text>
    <text x="600" y="235" fill="#a1a1aa" font-size="22" text-anchor="middle">under test</text>

    <line x1="740" y1="200" x2="830" y2="200" stroke="#71717a" stroke-width="3" marker-end="url(#arrow)"/>

    <rect x="840" y="130" width="280" height="140" rx="14" fill="#18181b" stroke="#3f3f46" stroke-width="2"/>
    <text x="980" y="195" fill="#fafafa" font-size="30" font-weight="700" text-anchor="middle">Database</text>
    <text x="980" y="235" fill="#a1a1aa" font-size="22" text-anchor="middle">seeded per test</text>
  </g>
</svg>
```

## Check it

The Read tool shows PNGs but not SVGs, so rasterize a preview at the width the post displays
it (768px) — write it to your scratchpad/temp directory, not into `public/`:

```bash
npm run blog:preview-svg -- public/images/blog/<slug>/flow.svg <scratchpad>/flow-preview.png
```

The preview renderer has no system fonts, so text shows in a fallback serif and runs slightly
wider than in a browser — judge layout and spacing from it, not typography. Then Read the PNG
and look for: text overflowing boxes, labels overlapping arrows, anything
closer than 40px to the card edge, and text too small to read. Fix and re-preview.
