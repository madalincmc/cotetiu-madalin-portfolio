import { AnimatedCounter } from "@/components/motion/animated-counter";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { getAllProjects, getAllTechnologies } from "@/lib/content/projects";

// Every number here is derived from the project content, so it stays accurate as projects are added.
export function Stats() {
  const projects = getAllProjects();
  const stats = [
    { label: "Projects", value: projects.length, color: "from-brand-1 to-brand-4" },
    {
      label: "Live online",
      value: projects.filter((p) => p.liveUrl).length,
      color: "from-brand-3 to-brand-2",
    },
    {
      label: "Technologies used",
      value: getAllTechnologies().length,
      color: "from-brand-2 to-brand-1",
    },
    {
      label: "Open-source repos",
      value: projects.filter((p) => p.githubUrl).length,
      color: "from-brand-5 to-brand-4",
    },
  ];

  return (
    <section className="border-border/60 bg-card/30 relative border-y backdrop-blur">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px px-6 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <RevealOnScroll
            key={stat.label}
            delay={index * 0.08}
            className="flex flex-col items-center gap-2 px-4 py-12 text-center"
          >
            <div
              className={`${stat.color} bg-linear-to-br bg-clip-text font-mono text-5xl font-bold tracking-tight text-transparent sm:text-6xl`}
            >
              <AnimatedCounter value={stat.value} />
            </div>
            <p className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
              {stat.label}
            </p>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
