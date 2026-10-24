import Link from "next/link";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/brand-icons";
import { footerNav } from "@/lib/nav-config";
import { siteConfig } from "@/lib/site-config";

const socials = [
  { label: "LinkedIn", href: siteConfig.social.linkedin, icon: LinkedinIcon },
  { label: "GitHub", href: siteConfig.social.github, icon: GithubIcon },
  { label: "Email", href: `mailto:${siteConfig.email}`, icon: Mail },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative">
      <div
        className="from-brand-1/0 via-brand-1 to-brand-2/0 h-px bg-linear-to-r"
        aria-hidden="true"
      />
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-14 sm:flex-row sm:justify-between">
        <div className="max-w-sm space-y-3">
          <p className="text-lg font-bold tracking-tight">{siteConfig.name}</p>
          <p className="text-muted-foreground text-sm text-pretty">{siteConfig.tagline}</p>
          <div className="flex items-center gap-2 pt-2">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={social.label}
                className="border-border text-muted-foreground hover:text-foreground hover:border-brand-1/50 flex size-9 items-center justify-center rounded-lg border transition-colors"
              >
                <social.icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-2">
          <p className="text-muted-foreground mb-1 font-mono text-xs tracking-widest uppercase">
            Navigate
          </p>
          {footerNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-6 pb-8">
        <p className="text-muted-foreground text-xs">
          © {year} {siteConfig.name}. All rights reserved.
        </p>
        <p className="text-muted-foreground font-mono text-xs">
          <span className="text-brand-3">●</span> Built with Next.js &amp; Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
