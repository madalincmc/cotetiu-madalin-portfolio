import { getAllTechnologies } from "@/lib/content/projects";

const DOT_COLORS = ["bg-brand-1", "bg-brand-2", "bg-brand-3", "bg-brand-4", "bg-brand-5"];

export function TechMarquee() {
  const technologies = getAllTechnologies();
  if (technologies.length === 0) return null;

  // The list is rendered twice so translating by -50% loops seamlessly.
  const track = [...technologies, ...technologies];

  return (
    <section className="py-14" aria-label="Technologies I build with">
      <p className="text-muted-foreground mb-6 text-center font-mono text-xs tracking-[0.2em] uppercase">
        {"// "}The stack behind the projects
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <ul className="animate-marquee flex w-max gap-3 hover:[animation-play-state:paused]">
          {track.map((tech, index) => (
            <li
              key={`${tech}-${index}`}
              aria-hidden={index >= technologies.length ? true : undefined}
              className="border-border bg-card/60 flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-sm whitespace-nowrap backdrop-blur"
            >
              <span className={`size-1.5 rounded-full ${DOT_COLORS[index % DOT_COLORS.length]}`} />
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
