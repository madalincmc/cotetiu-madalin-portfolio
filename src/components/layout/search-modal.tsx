"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { searchSite, type PagefindSearchResult } from "@/lib/search/pagefind-client";

const DEBOUNCE_MS = 200;

type Status = "idle" | "loading" | "ready" | "unavailable";

export function SearchModal() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PagefindSearchResult[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((value) => !value);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  // Clear any pending debounced search if the component unmounts mid-flight.
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  function onQueryChange(value: string) {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!value.trim()) {
      setResults([]);
      setStatus("idle");
      return;
    }

    setStatus("loading");
    debounceRef.current = setTimeout(() => {
      searchSite(value)
        .then((found) => {
          setResults(found);
          setStatus("ready");
        })
        .catch(() => {
          setStatus("unavailable");
        });
    }, DEBOUNCE_MS);
  }

  function onSelectResult(url: string) {
    setOpen(false);
    setQuery("");
    router.push(url);
  }

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="text-muted-foreground gap-2"
        onClick={() => setOpen(true)}
        aria-label="Search"
      >
        <Search className="size-4" aria-hidden="true" />
        <span className="hidden sm:inline">Search...</span>
        <kbd className="bg-muted pointer-events-none hidden items-center gap-0.5 rounded border px-1.5 font-mono text-xs sm:inline-flex">
          <span>⌘</span>K
        </kbd>
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Search"
        description="Search projects"
      >
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search projects..."
            value={query}
            onValueChange={onQueryChange}
          />
          <CommandList>
            {status === "unavailable" && (
              <CommandEmpty>
                Search index unavailable — run a production build first (`npm run build`).
              </CommandEmpty>
            )}
            {status === "loading" && <CommandEmpty>Searching...</CommandEmpty>}
            {status === "ready" && results.length === 0 && (
              <CommandEmpty>No results found.</CommandEmpty>
            )}
            {status === "idle" && <CommandEmpty>Start typing to search.</CommandEmpty>}
            {results.length > 0 && (
              <CommandGroup heading="Results">
                {results.map((result) => (
                  <CommandItem
                    key={result.id}
                    value={result.id}
                    onSelect={() => onSelectResult(result.url)}
                    className="flex-col items-start gap-0.5"
                  >
                    <span className="font-medium">{result.title}</span>
                    <span
                      className="text-muted-foreground line-clamp-1 text-xs"
                      dangerouslySetInnerHTML={{ __html: result.excerpt }}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
