export interface NavItem {
  label: string;
  href: string;
}

export const primaryNav: NavItem[] = [
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
];

export const footerNav: NavItem[] = [...primaryNav, { label: "Contact", href: "/contact" }];
