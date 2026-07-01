import type { SiteConfig } from "@/types";
import {
	type FeaturedSection as CoreFeaturedSection,
	type LinkSection as CoreLinkSection,
	type Section as CoreSection,
	type MenuLink,
	type NavCollectionKey,
	type NavCollections,
	setActiveSiteKey,
} from "@semio-community/ecosystem-site-core";

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
	siteKey: "quori",
	homeOrganizationId: "semio-community",
	suppressOrganizationPage: false,
};

// Publish this build's site key to the shared card converters so their
// featured-state checks narrow to THIS site ("featured here") rather
// than "featured on any site." Runs at module-eval time — before any
// page renders a card — so the converters always see the right key.
// See `active-site.ts` in site-core for why a build singleton is used.
setActiveSiteKey(siteConfig.siteKey);

// Re-export the canonical types from site-core so the local
// `@/site.config` import surface stays unchanged for downstream
// consumers. Site-core's `FeaturedSection` allows the `press` /
// `awards` collections and makes `items` optional (enabling
// auto-populated featured sections).
export type LinkSection = CoreLinkSection;
export type FeaturedSection = CoreFeaturedSection;
export type Section = CoreSection;
export type { NavCollectionKey, NavCollections };

// Used to generate links in both the Header & Footer.
export const menuLinks: MenuLink[] = [
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
		// Detail pages for hardware, software, and research entries live
		// at their own top-level routes but are conceptually projects.
		subroutes: ["/hardware/", "/software/", "/research/"],
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
		// Person and organization detail pages live at their own routes
		// but conceptually belong to the contributors section (the
		// `/people` and `/organization`/`/partners` listings redirect here).
		subroutes: ["/people/", "/organizations/", "/organization/", "/partners/"],
		sections: [
			{ kind: "link", title: "People", href: "/contributors/#people" },
			{ kind: "link", title: "Partners", href: "/contributors/#partners" },
			{ kind: "link", title: "Sponsors", href: "/contributors/#sponsors" },
		],
	},
	{
		path: "/press/",
		title: "Press",
		inHeader: true,
		dropdownSubtitle:
			"Announcements, publications, stories, and awards from across the ecosystem",
		sections: [
			{ kind: "link", title: "Featured", href: "/press/#featured" },
			{ kind: "link", title: "Announcements", href: "/press/#announcements" },
			{ kind: "link", title: "Publications", href: "/press/#publications" },
			{ kind: "link", title: "Stories", href: "/press/#stories" },
			{ kind: "link", title: "Awards", href: "/press/#awards" },
			{
				kind: "featured",
				title: "Featured Press",
				collection: "press",
				limit: 3,
				fields: { title: "title", subtitle: "description" },
			},
			{
				kind: "featured",
				title: "Featured Awards",
				collection: "awards",
				limit: 3,
				fields: { title: "title", subtitle: "description" },
			},
		],
	},
	{
		path: "/get-involved/",
		title: "Get Involved",
		inHeader: true,
		callToAction: true,
	},
];
