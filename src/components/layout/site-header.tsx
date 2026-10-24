import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MainNav } from "@/components/layout/main-nav";
import { MobileNav } from "@/components/layout/mobile-nav";
import { SearchModal } from "@/components/layout/search-modal";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { siteConfig } from "@/lib/site-config";
import { initials } from "@/lib/utils";

export function SiteHeader() {
  return (
    <header className="bg-background/70 border-border/60 sticky top-0 z-40 border-b backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="group flex items-center gap-2.5">
            <span className="from-brand-1 via-brand-4 to-brand-2 animate-gradient-x flex size-8 items-center justify-center rounded-lg bg-linear-to-br bg-[length:200%_200%] font-mono text-xs font-bold text-white shadow-md transition-transform group-hover:rotate-6">
              {initials(siteConfig.name)}
            </span>
            <span className="text-sm font-semibold tracking-tight">{siteConfig.name}</span>
          </Link>
          <MainNav />
        </div>

        <div className="flex items-center gap-2">
          <SearchModal />
          <ThemeToggle />
          <Button
            size="sm"
            className="from-brand-1 to-brand-4 hidden bg-linear-to-r text-white shadow-md transition-opacity hover:opacity-90 md:inline-flex"
            nativeButton={false}
            render={<Link href="/contact" />}
          >
            Contact
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
