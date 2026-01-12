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
  navigation: {
    highlightVariant: "tertiary",
    ctaVariant: "tertiary",
  },
};

export interface LinkSection {
  kind: "link";
  title: string;
  href: string;
}

export interface FeaturedSection {
  kind: "featured";
  title: string;
  collection:
    | "organizations"
    | "events"
    | "software"
    | "research"
    | "hardware"
    | "people";
  items: string[];
  fields: {
    title: string;
    subtitle?: string;
  };
}

export type Section = LinkSection | FeaturedSection;
export type NavCollectionKey = FeaturedSection["collection"];
export type NavCollections = Partial<
  Record<
    NavCollectionKey,
    Record<
      string,
      {
        id: string;
        fields: Record<string, string | number | undefined>;
      }
    >
  >
>;

// Used to generate links in both the Header & Footer.
export const menuLinks: {
  path: string;
  title: string;
  inHeader: boolean;
  callToAction?: boolean;
  dropdownSubtitle?: string;
  sections?: Section[];
}[] = [
  {
    path: "/",
    title: "Home",
    inHeader: false,
  },
  {
    path: "/platform/",
    title: "Platform",
    inHeader: true,
    dropdownSubtitle: "Explore the platform",
    sections: [
      {
        kind: "link",
        title: "Configurations",
        href: "/platform/#configurations",
      },
      { kind: "link", title: "Modules", href: "/platform/#modules" },
      { kind: "link", title: "Comparison", href: "/platform/#comparison" },
    ],
  },
  {
    path: "/projects/",
    title: "Projects",
    inHeader: true,
    sections: [
      { kind: "link", title: "Hardware Projects", href: "/projects/#hardware" },
      { kind: "link", title: "Software Projects", href: "/projects/#software" },
      { kind: "link", title: "Research Projects", href: "/projects/#research" },
      {
        kind: "featured",
        title: "Featured Hardware",
        collection: "hardware",
        items: ["quori-v2", "quori-v1"],
        fields: {
          title: "name",
          subtitle: "shortDescription",
        },
      },
      {
        kind: "featured",
        title: "Featured Software",
        collection: "software",
        items: ["arora", "vizij"],
        fields: {
          title: "name",
          subtitle: "shortDescription",
        },
      },
    ],
  },
  {
    path: "/events/",
    title: "Events",
    inHeader: true,
    sections: [
      { kind: "link", title: "Featured Events", href: "/events/#featured" },
      { kind: "link", title: "Upcoming Events", href: "/events/#upcoming" },
      { kind: "link", title: "Past Events", href: "/events/#past" },
      {
        kind: "link",
        title: "Partner for an Event",
        href: "/events/#events-contribute",
      },
    ],
  },
  {
    path: "/contributors/",
    title: "Contributors",
    inHeader: true,
    sections: [
      { kind: "link", title: "People", href: "/contributors/#people" },
      { kind: "link", title: "Partners", href: "/contributors/#partners" },
      { kind: "link", title: "Sponsors", href: "/contributors/#sponsors" },
    ],
  },
  {
    path: "/get-involved/",
    title: "Get Involved",
    inHeader: true,
    callToAction: true,
  },
];
