import type { ReactNode } from "react";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <RevealOnScroll
      className={cn("mb-12 flex flex-wrap items-end justify-between gap-6", className)}
    >
      <div className="max-w-2xl">
        <p className="text-brand-2 mb-3 font-mono text-xs tracking-[0.2em] uppercase">
          {"// "}
          {eyebrow}
        </p>
        <h2 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl">{title}</h2>
        {description ? (
          <p className="text-muted-foreground mt-4 text-lg text-pretty">{description}</p>
        ) : null}
      </div>
      {action}
    </RevealOnScroll>
  );
}
