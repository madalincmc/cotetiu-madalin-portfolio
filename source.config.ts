import { defineConfig } from "fumadocs-mdx/config";

// Global MDX settings shared by all collections (including the ones declared via the
// `fumadocs-mdx/macro` API in lib/content/*.ts). The default "github-light" shiki theme has
// at least one token color (#E36209) that falls short of WCAG AA contrast against a white
// background — GitHub's own "-high-contrast" theme variants exist specifically to fix this.
export default defineConfig({
  mdxOptions: {
    rehypeCodeOptions: {
      themes: {
        light: "github-light-high-contrast",
        dark: "github-dark-high-contrast",
      },
    },
    // Keep image `src` as a plain public path instead of an `import` — the build scripts load
    // content through Node, which can't import .png/.svg files, and MdxImage reads sizes itself.
    remarkImageOptions: { useImport: false },
  },
});
