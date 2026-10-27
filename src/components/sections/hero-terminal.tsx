"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

export interface TerminalProject {
  title: string;
  category: string;
  href: string;
  status: string;
}

const COMMAND = "madalin ls --projects";
const TYPE_MS = 45;
const LINE_MS = 320;

export function HeroTerminal({ projects }: { projects: TerminalProject[] }) {
  const shouldReduceMotion = useReducedMotion();
  const [typed, setTyped] = useState(0);
  const [lines, setLines] = useState(0);
  const shownChars = shouldReduceMotion ? COMMAND.length : typed;
  const shownLines = shouldReduceMotion ? projects.length + 1 : lines;
  const finished = shownLines > projects.length;

  useEffect(() => {
    if (shouldReduceMotion) return;
    if (typed < COMMAND.length) {
      const id = setTimeout(() => setTyped((t) => t + 1), TYPE_MS);
      return () => clearTimeout(id);
    }
    if (lines <= projects.length) {
      const id = setTimeout(() => setLines((l) => l + 1), lines === 0 ? 400 : LINE_MS);
      return () => clearTimeout(id);
    }
  }, [shouldReduceMotion, typed, lines, projects.length]);

  return (
    <div className="gradient-border bg-card/80 animate-float relative rounded-2xl shadow-2xl shadow-black/20 backdrop-blur-xl">
      <div className="border-border flex items-center gap-2 border-b px-4 py-3">
        <span className="size-3 rounded-full bg-[#ff5f57]" />
        <span className="size-3 rounded-full bg-[#febc2e]" />
        <span className="size-3 rounded-full bg-[#28c840]" />
        <span className="text-muted-foreground ml-3 font-mono text-xs">~/portfolio — zsh</span>
      </div>
      <div className="min-h-[19rem] p-5 font-mono text-[13px] leading-relaxed sm:text-sm">
        <p>
          <span className="text-brand-3">➜</span> <span className="text-brand-2">~</span>{" "}
          <span>{COMMAND.slice(0, shownChars)}</span>
          {shownChars < COMMAND.length ? (
            <span className="bg-foreground animate-blink ml-0.5 inline-block h-4 w-2 align-middle" />
          ) : null}
        </p>

        <ul className="mt-3 space-y-1.5" aria-label="Projects">
          {projects.slice(0, shownLines).map((project) => (
            <li key={project.href} className="flex items-center gap-3">
              <span className="text-brand-3">✓</span>
              <Link
                href={project.href}
                className="hover:text-brand-2 truncate font-semibold transition-colors"
              >
                {project.title}
              </Link>
              <span className="text-muted-foreground hidden truncate sm:inline">
                {project.category}
              </span>
              <span className="text-brand-3 ml-auto shrink-0 text-xs">{project.status}</span>
            </li>
          ))}
        </ul>

        {finished ? (
          <>
            <p className="text-muted-foreground mt-4">{projects.length} projects</p>
            <p className="mt-3">
              <span className="text-brand-3">➜</span> <span className="text-brand-2">~</span>{" "}
              <span
                className={cn(
                  "bg-foreground inline-block h-4 w-2 align-middle",
                  !shouldReduceMotion && "animate-blink",
                )}
              />
            </p>
          </>
        ) : null}
      </div>
    </div>
  );
}
