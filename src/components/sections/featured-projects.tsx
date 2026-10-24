import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedProjects } from "@/lib/content/projects";
import { ProjectCard } from "@/components/projects/project-card";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { SectionHeading } from "@/components/sections/section-heading";

export function FeaturedProjects() {
  const projects = getFeaturedProjects(10);

  if (projects.length === 0) return null;

  const [lead, ...rest] = projects;

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <SectionHeading
        eyebrow="Portfolio"
        title={
          <>
            Things I&apos;ve <span className="text-gradient animate-gradient-x">built</span>
          </>
        }
        description="A few recent projects, from websites and web apps to tools for developers and testers — each one built and deployed end to end."
        action={
          <Link
            href="/projects"
            className="text-muted-foreground hover:text-foreground group inline-flex items-center gap-1.5 font-mono text-sm transition-colors"
          >
            View all projects
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <RevealOnScroll className="lg:col-span-3">
          <ProjectCard project={lead} index={0} featured />
        </RevealOnScroll>
        {rest.map((project, index) => (
          <RevealOnScroll key={project.info.path} delay={index * 0.08} className="h-full">
            <ProjectCard project={project} index={index + 1} />
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
