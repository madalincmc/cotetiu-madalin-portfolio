# Implementation Plan — Madalin Cotetiu Portfolio & Blog

## Context

The project directory started with only `prd.md` (the 29-section PRD) and an earlier draft of this plan. This is a greenfield build — no code exists yet. The earlier draft was a reasonable skeleton but, checked against the full PRD, was missing: the Leadership/Resources/Uses/Now pages, global Ctrl+K search, dark mode, security hardening (CSP, rate limiting, spam protection), an explicit content-model/schema design, and the Claude Code skills setup called out in PRD §28. It also left several concrete architecture decisions unresolved (how the resume PDF actually gets generated, how Pagefind gets wired into a non-static Next.js app, what the content storage format is).

This plan supersedes that draft. It resolves those open decisions, fills the gaps, and orders phases by actual dependency (content model → pages → search/PDF, which both depend on content → SEO threaded in incrementally → security hardened last). Confirmed with the user: **npm** as package manager, **placeholder/sample content** built now (real content swapped in later, no code changes needed), **resume PDF generated programmatically from the shared resume data** (not a hand-maintained static file), and **Pagefind** for the Ctrl+K global search.

## Flagged PRD Issues (resolved here, not left open)

1. **Lighthouse "Accessibility/SEO/Best Practices >100" (§3) is impossible — 100 is the max.** Treat §27's "100 where achievable" as canonical; §3 is loosely worded.
2. **"Avg session >3min" / "bounce rate <35%" (§3) aren't testable at launch** — they need real traffic. Moved to a post-launch KPI review, not part of the Definition of Done.
3. **reCAPTCHA "or" Turnstile (§24) — decided: Cloudflare Turnstile.** No visible-badge friction, fits the Vercel-hosted stack.
4. **Next.js 15 vs the PPR requirement (§23) conflict**: PPR is experimental/unsupported-for-production on Next 15; it's stable (as Cache Components) on Next 16. **Recommendation: build on Next.js 16** (current stable) so PPR is a supported feature, not a risky flag. This is a deviation from the PRD's literal "Next.js 15" — flagged explicitly; can pin to 15 instead if there's a reason to.
5. **"Edge Runtime" as a blanket requirement (§23) conflicts with Resend/@react-pdf/renderer/rate-limiting, which are Node-only.** Scope Edge narrowly to `middleware.ts` and a `/api/og` image route; everything else is static/Node by default.
6. **PRD §28 names Claude Code skills that don't match what's actually installed** (`vercel:nextjs`, `vercel:shadcn` etc. are what's available). Treat §28 as aspirational; use the real equivalents at build time.
7. **Gallery (masonry + lightbox + zoom + keyboard nav + video + GIF, §11) needs a concrete library**, not a from-scratch build: `yet-another-react-lightbox` (zoom/video/thumbnails plugins, keyboard nav built-in) + `react-masonry-css` for layout. "GIF support" = treat GIFs as images with `unoptimized` (so `next/image` doesn't kill the animation) — no special player.
8. **Pagefind can't just crawl a static export** — the app needs API routes/middleware, so `output: 'export'` is off the table. Resolved below (Node-API indexing, not HTML crawling).
9. **Resume PDF "download" is a static-asset link — it generates no server signal for the "resume downloads" business metric on its own.** Must explicitly fire a client-side analytics `track()` call on the download button's click handler.

## Technology Stack (confirmed)

- **Framework:** Next.js 16 (App Router), React 19, TypeScript, npm
- **Styling:** Tailwind CSS v4 (CSS-first config), shadcn/ui, Framer Motion, Lucide Icons
- **Content:** Fumadocs MDX content collections (blog + projects), a plain typed+Zod-validated data module for the resume
- **Search:** Pagefind (Node.js indexing API, not HTML crawl), `cmdk`/shadcn `Command` for the Ctrl+K UI
- **Resume PDF:** `@react-pdf/renderer`, generated at build time (`prebuild` npm script) from the same resume data object the page renders — ships as a static file, no serverless cold starts
- **Contact:** Resend + React Email, Cloudflare Turnstile, Zod validation, honeypot field
- **Deployment:** Vercel, Vercel Analytics, Speed Insights
- **Gallery:** `yet-another-react-lightbox` + `react-masonry-css`

## Content Model & Storage

```
source.config.ts                 # Fumadocs MDX collection defs for content/blog and content/projects
content/
  blog/*.mdx                     # frontmatter: title, slug, description, tags[], category,
                                  #   publishedAt, updatedAt, heroImage, author (defaults to site author)
  projects/*.mdx                 # frontmatter: title, slug, category (enum, not folder — so re-categorizing
                                  #   never breaks URLs), tags[], description, coverImage, gallery[]
                                  #   (path/alt/type: image|video), technologies[], githubUrl, liveUrl,
                                  #   featured, publishedAt
                                  # MDX body uses real ## headings for Overview/Problem/Solution/
                                  #   Architecture/Challenges/Lessons Learned/Results (feeds TOC + search)
  resume/
    resume.schema.ts             # Zod schema
    resume.data.ts                # summary, skills[], experience[], leadership[], education[],
                                  #   certifications[], awards[], languages[] — single source of truth,
                                  #   imported by the resume page, the PDF generator, AND the search indexer
lib/content/
  blog.ts                        # getAllPosts, getPostBySlug, getRelatedPosts, computeReadingTime
  projects.ts                    # getAllProjects, getProjectBySlug, getFeaturedProjects, filter helpers
```

Resume page entries need stable `id` attributes per section (e.g. `#experience-<company-slug>`) from the start — Pagefind needs these to deep-link search results to a specific role/cert instead of just "the resume page."

## Directory Structure

```
src/
  app/
    layout.tsx  globals.css  not-found.tsx  error.tsx
    sitemap.ts  robots.ts  manifest.ts
    (marketing)/layout.tsx        # shared header/footer chrome
      page.tsx                   # Home
      about/  leadership/  resources/  uses/  now/  contact/{page.tsx,actions.ts}
    resume/page.tsx
    blog/{page.tsx, [slug]/page.tsx, feed.xml/route.ts}
    projects/{page.tsx, [slug]/page.tsx}
    api/{contact/route.ts, og/route.tsx}
  components/
    layout/  (header, footer, nav, theme-toggle, search-modal)
    ui/       (shadcn generated — don't hand-edit internals)
    sections/ (homepage: hero, featured-projects, experience-metrics, recent-articles, leadership-cta, final-cta)
    blog/     (post-card, toc, reading-progress-bar, share-buttons, author-card, related-posts, copy-code-button)
    projects/ (project-card, filter-bar, gallery/masonry-grid, gallery/lightbox)
    resume/   (timeline, resume-section, download-button)
    motion/   (reveal-on-scroll, animated-counter, page-transition, parallax-wrapper — all funnel through one
               shared useReducedMotion hook so prefers-reduced-motion is enforced in exactly one place)
    seo/json-ld.tsx
  content/ ...                   # see above
  lib/{content/, resume/, seo/, search/, email/, rate-limit.ts, analytics.ts, utils.ts}
  emails/                        # React Email templates
  hooks/                         # use-reduced-motion, use-search-shortcut, use-theme
  scripts/                       # generate-resume-pdf.ts, build-search-index.ts (not bundled into the app)
  middleware.ts                  # security headers, CSP nonce, rate-limit pre-check
```

## Resume PDF Pipeline

`lib/resume/pdf.tsx` (a `@react-pdf/renderer` Document tree consuming `resume.data.ts`) + `scripts/generate-resume-pdf.ts` (Node script, run via `tsx`) writing `public/resume/Madalin-Cotetiu-Resume.pdf`. Wired as `"prebuild": "tsx scripts/generate-resume-pdf.ts"` so every deploy regenerates it from current data before `next build`. The download button links to the static file with `download`, and its `onClick` fires `track('resume_download')` from `@vercel/analytics` — this is the only way that metric gets captured.

## Search (Pagefind) Pipeline

`scripts/build-search-index.ts`, run as `"postbuild": "tsx scripts/build-search-index.ts"`. It imports the same `lib/content/blog.ts` / `lib/content/projects.ts` / `resume.data.ts` functions the pages use (no duplication), and calls Pagefind's Node indexing API (`addCustomRecord`) per blog post / project / resume section — not `addHTMLFile` crawling, since the app isn't a static export. Output to `public/pagefind`. Client side, `components/layout/search-modal.tsx` (shadcn `Command`) lazy-loads `/pagefind/pagefind.js` via `await import(/* webpackIgnore: true */ '/pagefind/pagefind.js')` and must handle the index-not-built-yet case gracefully in `next dev` (index only exists after a production build has run once). Also show a visible "Search ⌘K" button in the header, not just the shortcut, for discoverability/a11y.

## Phased Delivery Plan

**Phase 1 — Foundation + Content Layer.** Scaffold Next.js 16/TS/Tailwind v4/shadcn/Framer Motion/ESLint+Prettier. Define Zod schemas + Fumadocs collections, and author placeholder content across all 6 project categories, several blog posts, and the full resume dataset. Everything downstream reads from this — must be substantively complete before Phase 3.

**Phase 2 — Shell & Navigation.** Header/footer/nav/theme-toggle/route-group layout. Only needs the IA list, not real data — can run alongside the tail of Phase 1.

**Phase 3 — Homepage, About, Interactive Resume.** Depends on Phases 1–2. Build resume section anchors now (needed by Phase 6 and 3b).

**Phase 3b — Resume PDF pipeline.** Depends on the resume data model (Phase 1) + resume page styling (Phase 3). Independent of Projects/Blog — parallel track with Phase 4.

**Phase 4 — Projects showcase.** Depends on Phase 1's project content. Gallery via `yet-another-react-lightbox` + `react-masonry-css` (decided above, not re-litigated mid-phase).

**Phase 5 — Blog system.** Depends on Phase 1's blog collection. Syntax highlighting (rehype-pretty-code/shiki), TOC extraction, and reading time live in `lib/content/blog.ts`, not page components.

**Phase 6 — Search (Pagefind).** Hard dependency on Phases 3–5 existing (real content + resume anchors to index). Wires the Ctrl+K modal shell from Phase 2 to a real index for the first time.

**Phase 7 — SEO/Metadata/Structured Data.** Thread canonical URLs, `generateMetadata`, and Article/Project JSON-LD incrementally through Phases 3–5 as those pages are built (not batched at the end). A dedicated end-of-project pass only for sitemap/robots/RSS/OG-route consistency, since `sitemap.ts` needs the final slug list.

**Phase 8 — Contact + Security hardening.** Contact form (Resend + React Email) can be built in parallel with Phase 4/5 — it's independent. Deliberately hold CSP headers and final rate-limit config until near-launch: CSP has to enumerate every third-party script origin actually in use (Analytics, Speed Insights, Resend, Turnstile, fonts), and locking it early causes breakage as dependencies get added. Layer: Vercel Firewall rate-limit rule on `/api/contact` (platform-level, no code) + Turnstile + server-side Zod validation + honeypot.

**Phase 9 — Performance/Accessibility audit + Launch.** Lighthouse passes, keyboard-nav + reduced-motion audit, per-route Edge/PPR opt-in only where it helps, final QA, deploy.

## Definition of Done

- All pages (Home, About, Resume, Projects + detail, Blog + detail, Leadership, Resources, Uses, Now, Contact) built, responsive, and reading from the content layer (placeholder data acceptable for v1).
- Resume interactive page + auto-generated PDF both driven by the same data source; download tracked in analytics.
- Global Ctrl+K search working across blog/projects/resume with deep links to resume sections.
- Dark mode (auto + manual + persisted), animations respecting `prefers-reduced-motion`, WCAG AA keyboard/screen-reader pass.
- Metadata/OG/JSON-LD/sitemap/robots/RSS all wired; Lighthouse Performance ≥95, Accessibility/SEO/Best Practices at 100 where achievable.
- Contact form delivers email via Resend, protected by Turnstile + rate limiting; CSP and security headers finalized.
- Deployed on Vercel with Analytics + Speed Insights enabled; content updatable without code changes.

## Verification

- `npm run build` locally must succeed end-to-end (prebuild PDF generation → next build → postbuild search indexing) before each phase is considered done.
- Manual smoke test per phase: run `npm run dev`, exercise the new pages/features in-browser (this project has no existing test suite to extend — Playwright E2E for the contact form + nav + search can be added in Phase 9 if time allows, given the user's QA background this is a natural fit but not blocking v1).
- Lighthouse CI (or manual Lighthouse run) at the end of Phase 7 and again at Phase 9 to confirm scores before launch.
- Accessibility pass with keyboard-only navigation and a screen reader spot-check in Phase 9.
