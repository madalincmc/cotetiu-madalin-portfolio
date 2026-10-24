import type { ProjectCategory } from "@/lib/content/schemas";

// Each category gets its own brand color so cards, timeline nodes and badges stay
// recognizable across the site. Class strings are written out in full so Tailwind sees them.
export const categoryStyles: Record<ProjectCategory, { text: string; badge: string; dot: string }> =
  {
    Websites: {
      text: "text-brand-2",
      badge: "border-brand-2/30 bg-brand-2/10 text-brand-2",
      dot: "bg-brand-2 shadow-[0_0_16px] shadow-brand-2/70",
    },
    Applications: {
      text: "text-brand-1",
      badge: "border-brand-1/30 bg-brand-1/10 text-brand-1",
      dot: "bg-brand-1 shadow-[0_0_16px] shadow-brand-1/70",
    },
    "Browser Extensions": {
      text: "text-brand-5",
      badge: "border-brand-5/30 bg-brand-5/10 text-brand-5",
      dot: "bg-brand-5 shadow-[0_0_16px] shadow-brand-5/70",
    },
    Automation: {
      text: "text-brand-3",
      badge: "border-brand-3/30 bg-brand-3/10 text-brand-3",
      dot: "bg-brand-3 shadow-[0_0_16px] shadow-brand-3/70",
    },
    "Open Source": {
      text: "text-brand-4",
      badge: "border-brand-4/30 bg-brand-4/10 text-brand-4",
      dot: "bg-brand-4 shadow-[0_0_16px] shadow-brand-4/70",
    },
    AI: {
      text: "text-brand-4",
      badge: "border-brand-4/30 bg-brand-4/10 text-brand-4",
      dot: "bg-brand-4 shadow-[0_0_16px] shadow-brand-4/70",
    },
  };
