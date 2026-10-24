import Link from "next/link";
import { cn } from "@/lib/utils";

export function FilterBar({
  basePath,
  label,
  filters,
  active,
}: {
  basePath: string;
  label: string;
  filters: string[];
  active: string;
}) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label={label}>
      {["All", ...filters].map((filter) => {
        const isActive = filter === active;
        const href =
          filter === "All" ? basePath : `${basePath}?filter=${encodeURIComponent(filter)}`;

        return (
          <Link
            key={filter}
            href={href}
            aria-current={isActive ? "true" : undefined}
            className={cn(
              "rounded-full border px-3.5 py-1.5 font-mono text-xs transition-all",
              isActive
                ? "from-brand-1 to-brand-4 border-transparent bg-linear-to-r text-white shadow-md"
                : "text-muted-foreground hover:text-foreground border-border bg-card/50 hover:border-brand-1/50",
            )}
          >
            {filter}
          </Link>
        );
      })}
    </div>
  );
}
