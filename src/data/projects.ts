export interface Project {
  id: string;
  title: string;
  role: string;
  description: string;
  href: string;
  featured: boolean;
}

export const projects = [
  {
    id: "f1-points-calculator",
    title: "F1 Points Calculator",
    role: "creator",
    description:
      "a formula 1 points calculator for predicting the rest of the season with drag-and-drop race results and instant standings updates.",
    href: "https://f1-points-calculator.varnishdas.dev",
    featured: true,
  },
] as const satisfies readonly Project[];
