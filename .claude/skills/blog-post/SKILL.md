---
name: blog-post
description: Prepare a blog post for this portfolio site — research, outline, write the MDX article in content/blog/ as a draft, and produce its images (code-generated cover + SVG diagrams, reused project screenshots). Use when the user asks to write, draft, prepare, or plan a blog post/article, or to make images for one.
argument-hint: "<topic, notes, project slug, or URL>"
---

# Blog post

Turns a topic, rough notes, a project from `content/projects/`, or a source URL into a
ready-to-review blog post: one MDX file plus its images. Every post is created as a **draft**
(`draft: true`) — it renders under `npm run dev` with a "Draft" badge but is left out of
production builds until Madalin flips it to `false`.

Articles are written in **English**. Talk to the user in whatever language they use.

## Files involved

| What              | Where                                                                                                                          |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Article           | `content/blog/<slug>.mdx` — frontmatter validated by `postSchema` in `src/lib/content/schemas.ts`                              |
| Cover             | `public/images/blog/<slug>/cover.png` — rendered by `npm run blog:cover -- <slug>` from `content/blog/<slug>.cover.svg`        |
| Diagrams          | `public/images/blog/<slug>/<name>.svg` — hand-written SVG, see `references/diagrams.md`; check with `npm run blog:preview-svg` |
| Screenshots       | reuse from `public/images/projects/<project>/`, or new ones under `public/images/blog/<slug>/`                                 |
| Template          | `templates/post.mdx` in this skill                                                                                             |
| Voice & structure | `references/style-guide.md` in this skill — read it before writing                                                             |

## Workflow

### 1. Understand the brief

Work out from the request: the **topic**, the **reader** (engineers? engineering managers?
recruiters?), and the **one takeaway** the reader should leave with.

- Given detailed notes or a clear angle → go straight to step 2.
- Given only a topic → propose 2–3 title options and a short outline (H2 headings + one line
  each), and ask which to go with. One round of questions, not more.

### 2. Gather context

- Read `src/lib/site-config.ts` (who Madalin is) and skim `content/projects/*.mdx` — posts
  should connect to real work where they can, and link to those project pages.
- List `content/blog/` so the post doesn't duplicate an existing one, and so it can link to
  related posts.
- If the post is about a project, read that project's MDX and look at its images.
- If a URL or external fact is involved, verify it (WebFetch/WebSearch) rather than relying on
  memory. Version numbers and APIs especially.

### 3. Write the article

Copy `templates/post.mdx` to `content/blog/<slug>.mdx` and fill it in following
`references/style-guide.md`.

- `slug`: lowercase, hyphenated, 3–6 words, no dates (`testing-pyramid-is-a-budget`).
- `category`: one of `Engineering`, `Leadership`, `QA & Testing`, `Automation`, `AI`, `Career`.
- `tags`: 2–5, lowercase, reuse existing tags from other posts where they fit
  (`grep -h "^  - " content/blog/*.mdx | sort | uniq -c`).
- `description`: ≤ 200 chars (schema-enforced), one or two sentences, says what the reader gets.
- `coverImage`: `/images/blog/<slug>/cover.png`.
- `publishedAt`: today's date (YYYY-MM-DD). `draft: true`.

**Never invent personal experience, numbers, or quotes.** Where the article needs something
only Madalin knows (an anecdote, a team metric, a real outcome), leave an MDX comment
placeholder and keep going:

```mdx
{/* TODO(Madalin): one sentence on the incident that made the team adopt this. */}
```

### 4. Make the images

1. **Cover** (always): draw a topic illustration in `content/blog/<slug>.cover.svg` following
   the "Cover illustrations" section of `references/diagrams.md`, then run
   `npm run blog:cover -- <slug>`. The script paints the category background and renders the
   illustration on top. **Covers never contain the title or any text** — the title already sits
   directly above the cover on the post page, and a text cover reads as a screenshot of it.
   Without an illustration file the script falls back to an abstract dot pattern; use that only
   when the user explicitly doesn't want an illustration. Look at the PNG with the Read tool and
   fix overlaps or crowding before moving on.
2. **Diagrams** (when a concept has structure — a flow, layers, a before/after, a comparison):
   write SVG files following `references/diagrams.md`. 1–3 per post is plenty; a diagram has
   to explain something the text can't do as quickly.
3. **Screenshots**: for posts about a project, reuse that project's existing images rather
   than creating new ones.

Embed images with Markdown — the optional title becomes the caption:

```mdx
![Alt text describing what the image shows](/images/blog/<slug>/flow.svg "Caption shown under the image")
```

Every image needs real alt text (what it shows, not "diagram").

### 5. Verify

- `npm run dev`, open `http://localhost:3000/blog/<slug>` and check: page renders, images load,
  code blocks are highlighted, table of contents appears (≥ 3 headings).
- If the dev server can't be checked, at minimum run `npx tsc --noEmit` and `npm run build`
  (the build validates frontmatter against the schema; drafts are excluded but still parsed).
- Re-read the article once against the checklist at the end of `references/style-guide.md`.

### 6. Hand off

Tell the user, briefly: the file path, the preview URL, word count / reading time, the images
created, and **every `TODO(Madalin)` placeholder** that needs their input. Do not commit unless
asked.

## Publishing (only when the user says to)

1. Resolve all `TODO(Madalin)` comments (`grep -n "TODO(Madalin)" content/blog/<slug>.mdx`
   must return nothing).
2. Set `draft: false` and update `publishedAt` to the publish date.
3. `npm run build` must pass.
4. Commit on a branch and open a PR — merging to `main` deploys to production.

Editing an already-published post: set `updatedAt` to today, keep `publishedAt`.
