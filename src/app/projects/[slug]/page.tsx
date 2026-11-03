import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "@/components/icons/brand-icons";
import { ProjectGallery } from "@/components/projects/gallery/project-gallery";
import { Pre } from "@/components/mdx/pre";
import { AuroraBackground } from "@/components/motion/aurora";
import { HeroScene } from "@/components/motion/hero-scene";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { JsonLd } from "@/components/seo/json-ld";
import { categoryStyles } from "@/lib/category-styles";
import { breadcrumbJsonLd, creativeWorkJsonLd } from "@/lib/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";
import { getPublicImageSize } from "@/lib/images";
import { getAllProjects, getProjectBySlug, projectSlug } from "@/lib/content/projects";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: projectSlug(project) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return buildMetadata({
    title: project.title,
    description: project.description,
    path: `/projects/${slug}`,
  });
}

function hostOf(url: string | undefined): string {
  if (!url) return "localhost";
  try {
    return new URL(url).host;
  } catch {
    return url;
  }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const Body = project.body;
  const gallery = project.gallery.map((item) => ({ ...item, ...getPublicImageSize(item.path) }));
  const styles = categoryStyles[project.category];

  const all = getAllProjects();
  const position = all.findIndex((entry) => projectSlug(entry) === slug);
  const next = all[(position + 1) % all.length];

  return (
    <article>
      <JsonLd data={creativeWorkJsonLd(project)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Projects", path: "/projects" },
          { name: project.title, path: `/projects/${slug}` },
        ])}
      />

      <header className="relative isolate overflow-hidden">
        <AuroraBackground />
        <HeroScene textEdge="20rem" />
        <RevealOnScroll className="mx-auto max-w-5xl px-6 pt-14 pb-12 sm:pt-20">
          <Link
            href="/projects"
            className="text-muted-foreground hover:text-foreground group inline-flex items-center gap-1.5 font-mono text-sm transition-colors"
          >
            <ArrowLeft
              className="size-4 transition-transform group-hover:-translate-x-1"
              aria-hidden="true"
            />
            All projects
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className={cn("rounded-full border px-3 py-1 font-mono text-xs", styles.badge)}>
              {project.category}
            </span>
            <time
              dateTime={project.publishedAt.toISOString()}
              className="text-muted-foreground font-mono text-xs"
            >
              Released{" "}
              {project.publishedAt.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </time>
          </div>

          <h1 className="mt-4 text-5xl font-bold tracking-tight text-balance sm:text-7xl">
            {project.title}
          </h1>
          <p className="text-muted-foreground mt-5 max-w-3xl text-lg text-pretty sm:text-xl">
            {project.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {project.liveUrl ? (
              <Button
                size="lg"
                className="from-brand-1 to-brand-4 shadow-brand-1/30 h-11 gap-2 bg-linear-to-r px-5 text-white shadow-lg transition-all hover:-translate-y-0.5"
                nativeButton={false}
                render={<a href={project.liveUrl} target="_blank" rel="noopener noreferrer" />}
              >
                <ExternalLink className="size-4" aria-hidden="true" />
                {project.category === "Browser Extensions" ? "Chrome Web Store" : "Live demo"}
              </Button>
            ) : null}
            {project.firefoxUrl ? (
              <Button
                size="lg"
                variant="outline"
                className="bg-card/50 h-11 gap-2 px-5 backdrop-blur"
                nativeButton={false}
                render={<a href={project.firefoxUrl} target="_blank" rel="noopener noreferrer" />}
              >
                <ExternalLink className="size-4" aria-hidden="true" />
                Firefox Add-on
              </Button>
            ) : null}
            {project.githubUrl ? (
              <Button
                size="lg"
                variant="outline"
                className="bg-card/50 h-11 gap-2 px-5 backdrop-blur"
                nativeButton={false}
                render={<a href={project.githubUrl} target="_blank" rel="noopener noreferrer" />}
              >
                <GithubIcon className="size-4" />
                Source code
              </Button>
            ) : null}
          </div>

          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Technologies">
            {project.technologies.map((tech) => (
              <li
                key={tech}
                className="border-border bg-card/60 rounded-md border px-2.5 py-1 font-mono text-xs backdrop-blur"
              >
                {tech}
              </li>
            ))}
          </ul>
        </RevealOnScroll>
      </header>

      <div className="mx-auto max-w-5xl px-6">
        <RevealOnScroll>
          <div className="gradient-border bg-card overflow-hidden rounded-2xl shadow-2xl shadow-black/20">
            <div className="border-border flex items-center gap-2 border-b px-4 py-3">
              <span className="size-3 rounded-full bg-[#ff5f57]" />
              <span className="size-3 rounded-full bg-[#febc2e]" />
              <span className="size-3 rounded-full bg-[#28c840]" />
              <span className="bg-muted text-muted-foreground ml-3 flex-1 truncate rounded-md px-3 py-1 text-center font-mono text-xs">
                {hostOf(project.liveUrl)}
              </span>
            </div>
            <div className="bg-muted relative aspect-[16/10]">
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                sizes="(min-width: 1024px) 1024px, 100vw"
                priority
                className="object-cover object-top"
              />
            </div>
          </div>
        </RevealOnScroll>
      </div>

      <div className="mx-auto max-w-3xl px-6">
        <div className="prose prose-neutral dark:prose-invert prose-headings:tracking-tight prose-a:text-brand-1 prose-li:marker:text-brand-1 mt-16 max-w-none">
          <Body components={{ pre: Pre }} />
        </div>
      </div>

      {gallery.length > 0 ? (
        <div className="mx-auto max-w-5xl px-6">
          <div className="mt-16">
            <p className="text-brand-2 mb-3 font-mono text-xs tracking-[0.2em] uppercase">
              {"// "}Gallery
            </p>
            <h2 className="mb-6 text-3xl font-bold tracking-tight">Screenshots</h2>
            <ProjectGallery items={gallery} />
          </div>
        </div>
      ) : null}

      {next && projectSlug(next) !== slug ? (
        <div className="mx-auto max-w-5xl px-6 py-24">
          <Link
            href={`/projects/${projectSlug(next)}`}
            className="gradient-border bg-card/60 group flex items-center justify-between gap-6 rounded-2xl p-8 backdrop-blur transition-transform hover:-translate-y-1"
          >
            <div>
              <p className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
                Next project
              </p>
              <p className="mt-2 text-3xl font-bold tracking-tight">{next.title}</p>
              <p className="text-muted-foreground mt-1 line-clamp-1">{next.description}</p>
            </div>
            <ArrowRight
              className="text-brand-1 size-8 shrink-0 transition-transform group-hover:translate-x-2"
              aria-hidden="true"
            />
          </Link>
        </div>
      ) : (
        <div className="pb-24" />
      )}
    </article>
  );
}
