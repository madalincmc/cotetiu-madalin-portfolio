import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon } from "@/components/icons/brand-icons";
import { AuroraBackground } from "@/components/motion/aurora";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { HeroTerminal } from "@/components/sections/hero-terminal";
import { getAllProjects, projectSlug } from "@/lib/content/projects";
import { siteConfig } from "@/lib/site-config";

const socials = [
  { label: "GitHub", href: siteConfig.social.github, icon: GithubIcon },
  { label: "LinkedIn", href: siteConfig.social.linkedin, icon: LinkedinIcon },
  { label: "Email", href: `mailto:${siteConfig.email}`, icon: Mail },
];

export function Hero() {
  const projects = getAllProjects();
  const terminalProjects = projects.map((project) => ({
    title: project.title,
    category: project.category,
    href: `/projects/${projectSlug(project)}`,
    status: project.liveUrl ? "live" : "done",
  }));

  return (
    <section className="relative isolate overflow-hidden">
      <AuroraBackground />
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 pt-20 pb-24 sm:pt-28 lg:grid-cols-[1.15fr_0.85fr] lg:pb-32">
        <RevealOnScroll className="space-y-8">
          <Link
            href="/projects"
            className="border-border bg-card/60 hover:border-brand-3/50 inline-flex items-center gap-2.5 rounded-full border py-1.5 pr-4 pl-2 text-sm backdrop-blur transition-colors"
          >
            <span className="relative flex size-2.5">
              <span className="bg-brand-3 absolute inline-flex size-full animate-ping rounded-full opacity-75" />
              <span className="bg-brand-3 relative inline-flex size-2.5 rounded-full" />
            </span>
            <span className="font-mono text-xs">{projects.length} side projects</span>
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>

          <h1 className="text-5xl leading-[1.05] font-bold tracking-tight sm:text-6xl xl:text-7xl">
            I lead teams and build things on the side.
          </h1>

          <p className="text-muted-foreground max-w-xl text-lg text-pretty sm:text-xl">
            <span className="text-foreground font-semibold">{siteConfig.name}</span>
            {" — "}engineering manager with a background in testing. My side projects usually start
            from a problem I ran into myself. I&apos;m also interested in AI and how it changes the
            way teams build software.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              size="lg"
              className="from-brand-1 to-brand-4 shadow-brand-1/30 hover:shadow-brand-1/50 h-12 gap-2 bg-linear-to-r px-6 text-base text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
              nativeButton={false}
              render={<Link href="/projects" />}
            >
              See the projects
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-card/50 h-12 px-6 text-base backdrop-blur"
              nativeButton={false}
              render={<Link href="/contact" />}
            >
              Contact
            </Button>
          </div>

          <div className="flex items-center gap-5">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={social.label}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <social.icon className="size-5" />
              </a>
            ))}
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.15}>
          <HeroTerminal projects={terminalProjects} />
        </RevealOnScroll>
      </div>
    </section>
  );
}
