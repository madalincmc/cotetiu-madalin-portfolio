import { cn } from "@/lib/utils";

/** Slow-moving blurred color blobs plus a faded grid, used behind hero-style sections. */
export function AuroraBackground({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 -z-10", className)} aria-hidden="true">
      <div className="bg-grid fade-mask absolute inset-0" />
      <div className="aurora">
        <span className="bg-brand-1 -top-32 left-[10%] size-[28rem]" />
        <span
          className="bg-brand-2 top-10 right-[5%] size-[24rem]"
          style={{ animationDelay: "-6s" }}
        />
        <span
          className="bg-brand-4 top-64 left-[40%] size-[20rem]"
          style={{ animationDelay: "-12s" }}
        />
      </div>
    </div>
  );
}
