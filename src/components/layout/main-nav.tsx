"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { primaryNav } from "@/lib/nav-config";

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={cn(
        "hover:text-foreground text-sm font-medium transition-colors",
        isActive ? "text-foreground" : "text-muted-foreground",
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {label}
    </Link>
  );
}

export function MainNav() {
  return (
    <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
      {primaryNav.map((item) => (
        <NavLink key={item.href} href={item.href} label={item.label} />
      ))}
    </nav>
  );
}
