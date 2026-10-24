"use client";

import type { PointerEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Card wrapper whose radial highlight follows the cursor (see the `spotlight` utility). */
export function SpotlightCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }

  return (
    <div onPointerMove={onPointerMove} className={cn("spotlight", className)}>
      {children}
    </div>
  );
}
