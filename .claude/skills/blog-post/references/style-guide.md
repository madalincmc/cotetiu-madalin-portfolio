# Style guide

## Who is writing, for whom

Madalin Cotetiu — Engineering Manager by day, builder on the side (websites, web apps, browser
extensions, test-automation tools). Quality-first. The blog sits on his portfolio, so every
post doubles as evidence of how he thinks: a hiring manager should come away with "this person
has judgment", an engineer with "I can use this tomorrow".

Primary readers: software engineers, QA/test-automation engineers, engineering managers.

## Voice

- **First person, practitioner.** "I", "we" (the team). Speak from doing, not from reading.
- **Direct.** Lead with the point; explain after. Opinions are fine — say why.
- **Concrete.** A real example, snippet, or number beats an abstraction. If there's no real
  example available, use a `TODO(Madalin)` placeholder instead of inventing one.
- **Plain English.** Many readers aren't native speakers. Short sentences, common words, no
  idioms that don't translate.
- **Calm.** No hype, no exclamation marks, no "game-changer", "revolutionize", "supercharge",
  "unlock", "seamless", "robust", "leverage", "delve", "in today's fast-paced world",
  "it's important to note", "in conclusion". No emoji in body text.

## Structure

- **Length:** 800–1,800 words. Shorter is fine if the idea is complete. Split rather than pad.
- **Opening:** 2–4 sentences — the problem or moment that triggered the post. No "In this
  post I will…".
- **Headings:** `##` for sections, `###` sparingly. Never `#` (the page renders the title).
  Headings say something: "Flaky tests are a scheduling problem", not "Background".
  Sentence case.
- **Paragraphs:** 1–4 sentences. Use lists for genuinely parallel items, not to chop prose.
- **Code:** always tag the language (` ```ts `, ` ```bash `). Keep snippets minimal and
  runnable-looking; cut boilerplate with a comment.
- **Ending:** a short "Takeaways" list or a closing paragraph that restates the one idea.
  No "Thanks for reading", no calls to subscribe.
- **Links:** link projects on this site (`/projects/<slug>`) and earlier posts
  (`/blog/<slug>`) where relevant; external links only to primary sources (official docs,
  the original paper/post).

## Accuracy

- Never fabricate experiences, metrics, team sizes, company names, quotes, or results.
- Check versions and APIs against official docs before stating them.
- Don't name employers, colleagues, or clients unless the user has provided them for the post.

## Final checklist

- [ ] Title ≤ ~65 chars, sentence case, specific
- [ ] `description` ≤ 200 chars and says what the reader gets
- [ ] Opening paragraph states the problem without preamble
- [ ] Every H2 makes a claim or names a concrete step
- [ ] No banned words (see Voice), no emoji, no exclamation marks
- [ ] Every code block has a language
- [ ] Every image has descriptive alt text; diagrams follow `diagrams.md`
- [ ] Cover illustration drawn (no text), rendered, and checked visually
- [ ] At least one internal link if a related project/post exists
- [ ] All personal facts are either supplied by the user or marked `TODO(Madalin)`
- [ ] `draft: true`
