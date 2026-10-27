import { Bug, Lightbulb, Sparkles, Users } from "lucide-react";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { SectionHeading } from "@/components/sections/section-heading";

const principles = [
  {
    icon: Users,
    title: "Leading teams",
    description:
      "My day job: leading engineering teams — setting priorities, removing blockers and helping people grow.",
    color: "from-brand-2 to-brand-1",
  },
  {
    icon: Bug,
    title: "Testing background",
    description:
      "I started in testing, so I still think about how things break before I think about how they work.",
    color: "from-brand-3 to-brand-2",
  },
  {
    icon: Lightbulb,
    title: "Problems first",
    description:
      "My side projects start from problems I've run into, not from a technology I wanted to try.",
    color: "from-brand-5 to-brand-4",
  },
  {
    icon: Sparkles,
    title: "Curious about AI",
    description: "I use AI in my own projects to see where it actually helps and where it doesn't.",
    color: "from-brand-1 to-brand-4",
  },
];

export function Principles() {
  return (
    <section className="relative py-24">
      <div className="bg-grid fade-mask absolute inset-0 -z-10 opacity-60" aria-hidden="true" />
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="About"
          title={
            <>
              How I <span className="text-gradient animate-gradient-x">work</span>
            </>
          }
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((principle, index) => (
            <RevealOnScroll key={principle.title} delay={index * 0.08} className="h-full">
              <SpotlightCard className="border-border bg-card/60 h-full rounded-2xl border p-6 backdrop-blur transition-transform duration-300 hover:-translate-y-1">
                <div
                  className={`${principle.color} mb-5 inline-flex size-12 items-center justify-center rounded-xl bg-linear-to-br text-white shadow-lg`}
                >
                  <principle.icon className="size-6" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold tracking-tight">{principle.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm text-pretty">
                  {principle.description}
                </p>
              </SpotlightCard>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
