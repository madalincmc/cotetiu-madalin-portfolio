import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuroraBackground } from "@/components/motion/aurora";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { siteConfig } from "@/lib/site-config";

export function FinalCta() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-8 pb-24">
      <RevealOnScroll>
        <div className="gradient-border bg-card/60 relative isolate overflow-hidden rounded-3xl px-6 py-20 text-center sm:px-16">
          <AuroraBackground />
          <p className="text-brand-2 mb-4 font-mono text-xs tracking-[0.2em] uppercase">
            {"// "}Get in touch
          </p>
          <h2 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-balance sm:text-6xl">
            Want to get <span className="text-gradient animate-gradient-x">in touch?</span>
          </h2>
          <p className="text-muted-foreground mx-auto mt-5 max-w-xl text-lg text-pretty">
            Questions about a project, something you read here, or just want to talk about testing,
            leadership or AI — send me a message.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button
              size="lg"
              className="from-brand-1 to-brand-4 shadow-brand-1/30 hover:shadow-brand-1/50 h-12 gap-2 bg-linear-to-r px-6 text-base text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
              nativeButton={false}
              render={<Link href="/contact" />}
            >
              Get in touch
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-card/50 h-12 gap-2 px-6 text-base backdrop-blur"
              nativeButton={false}
              render={<a href={`mailto:${siteConfig.email}`} />}
            >
              <Mail className="size-4" aria-hidden="true" />
              {siteConfig.email}
            </Button>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}
