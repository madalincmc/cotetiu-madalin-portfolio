import { Layers, Rocket, ShieldCheck, Users } from "lucide-react";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { SectionHeading } from "@/components/sections/section-heading";

const principles = [
  {
    icon: Rocket,
    title: "Product thinking",
    description:
      "Every project starts from a real problem and is built to be used — then improved based on how it holds up.",
    color: "from-brand-1 to-brand-4",
  },
  {
    icon: Users,
    title: "Engineering leadership",
    description:
      "Day to day I lead engineering teams — setting direction, unblocking people and raising the bar for how software gets built.",
    color: "from-brand-2 to-brand-1",
  },
  {
    icon: ShieldCheck,
    title: "Quality is a feature",
    description:
      "A QA background means tests, edge cases and reliability are designed in from day one, not bolted on at the end.",
    color: "from-brand-3 to-brand-2",
  },
  {
    icon: Layers,
    title: "End to end",
    description:
      "Design, code, infrastructure, deployment. Every project here went from a blank repo to a live site.",
    color: "from-brand-5 to-brand-4",
  },
];

export function Principles() {
  return (
    <section className="relative py-24">
      <div className="bg-grid fade-mask absolute inset-0 -z-10 opacity-60" aria-hidden="true" />
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Operating system"
          title={
            <>
              How I <span className="text-gradient animate-gradient-x">build</span>
            </>
          }
          description="The principles behind how I work — with my team and on my own projects."
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
