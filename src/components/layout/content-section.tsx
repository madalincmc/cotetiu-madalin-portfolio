import type { ReactNode } from "react";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";

export function ContentSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <RevealOnScroll className="border-t py-12 first:border-t-0 first:pt-0">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-4">{children}</div>
    </RevealOnScroll>
  );
}
