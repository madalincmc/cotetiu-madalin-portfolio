const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export async function verifyTurnstileToken(token: string, remoteIp?: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("TURNSTILE_SECRET_KEY is not set");
  }

  const body = new URLSearchParams({ secret: secretKey, response: token });
  if (remoteIp) body.set("remoteip", remoteIp);

  const response = await fetch(VERIFY_URL, { method: "POST", body });
  const data = (await response.json()) as { success: boolean };
  return data.success;
}
