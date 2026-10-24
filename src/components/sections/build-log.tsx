import Link from "next/link";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { SectionHeading } from "@/components/sections/section-heading";
import { categoryStyles } from "@/lib/category-styles";
import { getAllProjects, projectSlug } from "@/lib/content/projects";
import { cn } from "@/lib/utils";

function formatMonth(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function BuildLog() {
  const projects = getAllProjects();
  if (projects.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        eyebrow="Build log"
        title={
          <>
            What I&apos;ve been <span className="text-gradient animate-gradient-x">building</span>
          </>
        }
        description="Every project, newest first."
      />

      <div className="relative ml-3 sm:ml-0">
        <span
          className="from-brand-1 via-brand-2 to-brand-3 absolute top-2 bottom-2 left-0 w-px bg-linear-to-b sm:left-[9.5rem]"
          aria-hidden="true"
        />
        <ol className="space-y-10">
          {projects.map((project, index) => {
            const styles = categoryStyles[project.category];
            return (
              <li key={project.info.path} className="relative">
                <RevealOnScroll
                  delay={index * 0.06}
                  className="grid gap-2 pl-8 sm:grid-cols-[8rem_1fr] sm:gap-12 sm:pl-0"
                >
                  <span
                    className={cn(
                      "absolute top-1.5 left-0 size-3 -translate-x-1/2 rounded-full sm:left-[9.5rem]",
                      styles.dot,
                    )}
                    aria-hidden="true"
                  />
                  <time
                    dateTime={project.publishedAt.toISOString()}
                    className="text-muted-foreground font-mono text-sm sm:pt-0.5 sm:text-right"
                  >
                    {formatMonth(project.publishedAt)}
                  </time>
                  <div className="sm:pl-4">
                    <p className={cn("font-mono text-xs tracking-widest uppercase", styles.text)}>
                      {project.category}
                    </p>
                    <Link
                      href={`/projects/${projectSlug(project)}`}
                      className="hover:text-brand-1 mt-1 inline-block text-2xl font-bold tracking-tight transition-colors"
                    >
                      {project.title}
                    </Link>
                    <p className="text-muted-foreground mt-2 line-clamp-2 max-w-2xl text-pretty">
                      {project.description}
                    </p>
                  </div>
                </RevealOnScroll>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
