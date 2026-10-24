// In-memory fixed-window rate limiter. Resets on cold start and doesn't share state across
// serverless instances — a best-effort backstop for local/dev and non-Vercel deployments.
// On Vercel, pair this with a platform-level Firewall rate-limit rule on the same route for
// real protection across instances.

const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;

const hits = new Map<string, { count: number; windowStart: number }>();

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || now - entry.windowStart > WINDOW_MS) {
    hits.set(key, { count: 1, windowStart: now });
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_REQUESTS_PER_WINDOW;
}
