export interface NavItem {
  label: string;
  href: string;
}

export const primaryNav: NavItem[] = [{ label: "Projects", href: "/projects" }];

export const footerNav: NavItem[] = [...primaryNav, { label: "Contact", href: "/contact" }];
