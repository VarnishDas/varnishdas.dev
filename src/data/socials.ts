export interface SocialLink {
  href: string;
  label: string;
}

export const socialLinks = [
  { href: "mailto:varnish.das@outlook.com", label: "email" },
  { href: "https://github.com/varnishdas", label: "github" },
  { href: "https://linkedin.com/in/varnishdas", label: "linkedin" },
  { href: "https://x.com/varnishdas", label: "x" },
  { href: "https://instagram.com/varnishdas", label: "instagram" },
] as const satisfies readonly SocialLink[];
