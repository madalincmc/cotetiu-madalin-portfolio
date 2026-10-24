export interface PagefindSearchResult {
  id: string;
  url: string;
  title: string;
  excerpt: string;
}

interface PagefindResultData {
  url: string;
  excerpt: string;
  meta: Record<string, string>;
}

interface PagefindResult {
  id: string;
  data: () => Promise<PagefindResultData>;
}

interface PagefindModule {
  init: () => Promise<void>;
  search: (term: string) => Promise<{ results: PagefindResult[] }>;
}

// The index only exists after a production build (postbuild script), so this path can't be
// statically resolved by TypeScript/the bundler at build time. Using a variable (rather than a
// string literal) keeps TS from trying to resolve it — it only needs to exist at runtime.
const PAGEFIND_ENTRY_PATH = "/pagefind/pagefind.js";

let pagefindPromise: Promise<PagefindModule> | null = null;

function loadPagefind(): Promise<PagefindModule> {
  pagefindPromise ??= import(/* webpackIgnore: true */ PAGEFIND_ENTRY_PATH).then(
    async (mod: PagefindModule) => {
      await mod.init();
      return mod;
    },
  );
  return pagefindPromise;
}

const MAX_RESULTS = 8;

export async function searchSite(term: string): Promise<PagefindSearchResult[]> {
  if (!term.trim()) return [];

  const pagefind = await loadPagefind();
  const { results } = await pagefind.search(term);
  const topResults = results.slice(0, MAX_RESULTS);
  const data = await Promise.all(topResults.map((result) => result.data()));

  return data.map((entry, index) => ({
    id: topResults[index].id,
    url: entry.url,
    title: entry.meta.title ?? entry.url,
    excerpt: entry.excerpt,
  }));
}
