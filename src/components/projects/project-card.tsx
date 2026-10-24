import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { categoryStyles } from "@/lib/category-styles";
import type { Project } from "@/lib/content/projects";
import { projectSlug } from "@/lib/content/projects";
import { cn } from "@/lib/utils";

export function ProjectCard({
  project,
  index,
  featured = false,
}: {
  project: Project;
  index?: number;
  featured?: boolean;
}) {
  const slug = projectSlug(project);
  const styles = categoryStyles[project.category];

  return (
    <SpotlightCard className="group h-full rounded-2xl">
      <Link
        href={`/projects/${slug}`}
        className={cn(
          "border-border bg-card/70 hover:border-brand-1/40 hover:shadow-brand-1/15 relative flex h-full flex-col overflow-hidden rounded-2xl border backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl",
          featured && "lg:grid lg:grid-cols-[1.35fr_1fr]",
        )}
      >
        <div
          className={cn(
            "bg-muted relative aspect-[16/10] overflow-hidden",
            featured && "lg:aspect-auto lg:min-h-[22rem]",
          )}
        >
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            sizes={featured ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
          <div className="from-card/90 absolute inset-0 bg-linear-to-t via-transparent to-transparent" />
          <div className="bg-background/85 absolute top-3 left-3 rounded-full backdrop-blur-md">
            <span
              className={cn(
                "block rounded-full border px-2.5 py-0.5 font-mono text-[11px]",
                styles.badge,
              )}
            >
              {project.category}
            </span>
          </div>
          {project.liveUrl ? (
            <span className="bg-background/70 absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-mono text-[11px] backdrop-blur-md">
              <span className="relative flex size-1.5">
                <span className="bg-brand-3 absolute inline-flex size-full animate-ping rounded-full opacity-75" />
                <span className="bg-brand-3 relative inline-flex size-1.5 rounded-full" />
              </span>
              Live
            </span>
          ) : null}
        </div>

        <div
          className={cn("flex flex-1 flex-col gap-3 p-6", featured && "lg:justify-center lg:p-10")}
        >
          {index !== undefined ? (
            <span className={cn("font-mono text-xs", styles.text)}>
              {String(index + 1).padStart(2, "0")} /
            </span>
          ) : null}
          <h3
            className={cn(
              "flex items-start justify-between gap-3 font-bold tracking-tight",
              featured ? "text-3xl sm:text-4xl" : "text-xl",
            )}
          >
            {project.title}
            <ArrowUpRight
              className="text-muted-foreground group-hover:text-foreground mt-1 size-5 shrink-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </h3>
          <p
            className={cn(
              "text-muted-foreground text-sm text-pretty",
              featured ? "line-clamp-4 sm:text-base" : "line-clamp-3",
            )}
          >
            {project.description}
          </p>
          <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
            {project.technologies.slice(0, featured ? 6 : 4).map((tech) => (
              <span
                key={tech}
                className="border-border bg-background/50 rounded-md border px-2 py-0.5 font-mono text-[11px]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </SpotlightCard>
  );
}
