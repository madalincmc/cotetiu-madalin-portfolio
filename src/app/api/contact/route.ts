import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/contact-schema";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { isRateLimited } from "@/lib/rate-limit";
import { getResendClient } from "@/lib/email/resend";
import { ContactNotificationEmail } from "@/emails/contact-notification";
import { ContactAutoReplyEmail } from "@/emails/contact-autoreply";
import { siteConfig } from "@/lib/site-config";

export const runtime = "nodejs";

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  return forwardedFor?.split(",")[0]?.trim() ?? "unknown";
}

export async function POST(request: Request) {
  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  const body: unknown = await request.json().catch(() => null);
  const parsed = contactFormSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  const { name, email, message, company, turnstileToken } = parsed.data;

  // Honeypot tripped — pretend success so the bot doesn't learn anything, but skip sending.
  if (company) {
    return NextResponse.json({ ok: true });
  }

  const isHuman = await verifyTurnstileToken(turnstileToken, ip).catch(() => false);
  if (!isHuman) {
    return NextResponse.json({ error: "Verification failed. Please try again." }, { status: 400 });
  }

  const resend = getResendClient();

  const { error } = await resend.emails.send({
    from: `${siteConfig.name} Website <onboarding@resend.dev>`,
    to: siteConfig.email,
    replyTo: email,
    subject: `New contact form message from ${name}`,
    react: ContactNotificationEmail({ name, email, message }),
  });

  if (error) {
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 502 },
    );
  }

  await resend.emails
    .send({
      from: `${siteConfig.name} <onboarding@resend.dev>`,
      to: email,
      subject: `Thanks for reaching out, ${name}`,
      react: ContactAutoReplyEmail({ name }),
    })
    .catch(() => {
      // The notification to the site owner already succeeded; a failed autoreply isn't fatal.
    });

  return NextResponse.json({ ok: true });
}
