import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  // Used as both a meta property (src/components/BaseHead.astro L:31 + L:49) & the generated satori png (src/pages/og-image/[slug].png.ts)
  author: "Quori",
  // Date.prototype.toLocaleDateString() parameters, found in src/utils/date.ts.
  date: {
    locale: "en-US",
    options: {
      day: "numeric",
      month: "short",
      year: "numeric",
    },
  },
  // Used as the default description meta property and webmanifest description
  description: "A Community-Driven Modular Research Platform.",
  // HTML lang property, found in src/layouts/SiteShell.astro (html lang attr) & astro.config.ts L:48
  lang: "en-US",
  // Meta property, found in src/components/BaseHead.astro L:42
  ogLocale: "en_US",
  // Used to construct the meta title property found in src/components/BaseHead.astro L:11, and webmanifest name found in astro.config.ts L:42
  title: "Quori",
};

// Used to generate links in both the Header & Footer.
export const menuLinks: {
  path: string;
  title: string;
  inHeader: boolean;
  callToAction?: boolean;
}[] = [
  {
    path: "/",
    title: "Home",
    inHeader: false,
  },
  {
    path: "/features/",
    title: "Features",
    inHeader: true,
  },
  {
    path: "/projects/",
    title: "Projects",
    inHeader: true,
  },
  {
    path: "/events/",
    title: "Events",
    inHeader: true,
  },
  {
    path: "/contributors/",
    title: "Contributors",
    inHeader: true,
  },
  {
    path: "/get-involved/",
    title: "Get Involved",
    inHeader: true,
    callToAction: true,
  },
];
