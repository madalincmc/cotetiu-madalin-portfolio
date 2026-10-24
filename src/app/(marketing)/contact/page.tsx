import type { Metadata } from "next";
import { Mail, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/brand-icons";
import { AuroraBackground } from "@/components/motion/aurora";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { buildMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: "Get in touch by email, LinkedIn, or GitHub.",
  path: "/contact",
});

const links = [
  {
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    icon: Mail,
    color: "from-brand-1 to-brand-4",
  },
  {
    label: "LinkedIn",
    value: "Connect professionally",
    href: siteConfig.social.linkedin,
    icon: LinkedinIcon,
    color: "from-brand-2 to-brand-1",
  },
  {
    label: "GitHub",
    value: "See the code",
    href: siteConfig.social.github,
    icon: GithubIcon,
    color: "from-brand-3 to-brand-2",
  },
];

export default function ContactPage() {
  return (
    <div className="relative isolate overflow-hidden">
      <AuroraBackground />
      <div className="mx-auto max-w-6xl px-6 pt-20 pb-24 sm:pt-28">
        <RevealOnScroll className="max-w-3xl">
          <p className="text-brand-2 mb-4 font-mono text-xs tracking-[0.2em] uppercase">
            {"// "}Contact
          </p>
          <h1 className="text-5xl font-bold tracking-tight text-balance sm:text-7xl">
            Let&apos;s build <span className="text-gradient animate-gradient-x">something</span>.
          </h1>
          <p className="text-muted-foreground mt-5 text-lg text-pretty sm:text-xl">
            Have a project idea, a role, or just want to talk shop? Reach out
            directly.
          </p>
        </RevealOnScroll>

        <div className="mt-14">
          <ul className="grid gap-4 sm:grid-cols-3">
            {links.map((link, index) => (
              <li key={link.label}>
                <RevealOnScroll delay={index * 0.06}>
                  <SpotlightCard className="rounded-2xl">
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="border-border bg-card/60 hover:border-brand-1/40 group flex items-center gap-4 rounded-2xl border p-4 backdrop-blur transition-colors"
                    >
                      <span
                        className={`${link.color} flex size-11 shrink-0 items-center justify-center rounded-xl bg-linear-to-br text-white shadow-md`}
                      >
                        <link.icon className="size-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold">{link.label}</span>
                        <span className="text-muted-foreground block truncate text-sm">
                          {link.value}
                        </span>
                      </span>
                      <ArrowUpRight
                        className="text-muted-foreground group-hover:text-foreground size-4 shrink-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </a>
                  </SpotlightCard>
                </RevealOnScroll>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
