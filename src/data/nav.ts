export interface NavLink {
  href: string;
  label: string;
  key: string;
}

export const navLinks = [
  { href: "/", label: "home", key: "h" },
  { href: "/blog", label: "blog", key: "b" },
  { href: "/projects", label: "projects", key: "p" },
  { href: "/now", label: "now", key: "n" },
  { href: "/uses", label: "uses", key: "u" },
] as const satisfies readonly NavLink[];
