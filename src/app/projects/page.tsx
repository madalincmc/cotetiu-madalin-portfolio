import type { Metadata } from "next";
import { getAllProjects, getAllTechnologies } from "@/lib/content/projects";
import { PROJECT_CATEGORIES } from "@/lib/content/schemas";
import { ProjectCard } from "@/components/projects/project-card";
import { FilterBar } from "@/components/filter-bar";
import { AuroraBackground } from "@/components/motion/aurora";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Projects",
  description:
    "Side projects built outside work: tools for testers and developers, a few apps and websites.",
  path: "/projects",
});

export default async function ProjectsIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const { filter } = await searchParams;
  const active = filter && filter !== "All" ? filter : "All";

  const projects = getAllProjects();
  const technologies = getAllTechnologies();
  const filtered =
    active === "All"
      ? projects
      : projects.filter(
          (project) => project.category === active || project.technologies.includes(active),
        );

  // Only offer categories that actually have projects, so no filter leads to an empty page.
  const usedCategories = PROJECT_CATEGORIES.filter((category) =>
    projects.some((project) => project.category === category),
  );
  const filters = [...new Set([...usedCategories, ...technologies])];

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <AuroraBackground />
        <RevealOnScroll className="mx-auto max-w-6xl px-6 pt-20 pb-12 sm:pt-28">
          <p className="text-brand-2 mb-4 font-mono text-xs tracking-[0.2em] uppercase">
            {"// "}Portfolio
          </p>
          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
            Side <span className="text-gradient animate-gradient-x">projects</span>
          </h1>
          <p className="text-muted-foreground mt-5 max-w-2xl text-lg text-pretty sm:text-xl">
            Things I built outside work: tools for testers and developers, a few apps and websites.
          </p>
          <p className="mt-6 font-mono text-sm">
            <span className="text-brand-3">{projects.length}</span>{" "}
            <span className="text-muted-foreground">projects</span>
            <span className="text-muted-foreground mx-3">·</span>
            <span className="text-brand-2">{technologies.length}</span>{" "}
            <span className="text-muted-foreground">technologies</span>
            <span className="text-muted-foreground mx-3">·</span>
            <span className="text-brand-4">{usedCategories.length}</span>{" "}
            <span className="text-muted-foreground">categories</span>
          </p>
        </RevealOnScroll>
      </section>

      <div className="mx-auto max-w-6xl px-6 pb-24">
        <FilterBar basePath="/projects" label="Filter projects" filters={filters} active={active} />

        <h2 className="sr-only">All Projects</h2>

        {filtered.length === 0 ? (
          <p className="text-muted-foreground mt-16 text-center font-mono text-sm">
            No projects match this filter yet.
          </p>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {filtered.map((project, index) => (
              <RevealOnScroll key={project.info.path} delay={(index % 2) * 0.08} className="h-full">
                <ProjectCard project={project} index={index} />
              </RevealOnScroll>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
