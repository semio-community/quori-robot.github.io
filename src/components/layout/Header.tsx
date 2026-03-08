import { navIconMap } from "@/components/navigation/navIcons";
import { SearchApp } from "@/components/search/SearchApp";
import { menuLinks, siteConfig } from "@/site.config";
import type { NavCollections } from "@/site.config";
import { url, homeUrl } from "@/utils/url";
import {
	BoundNavigationMenu,
	Header as SharedHeader,
	getNavHighlightClasses,
	resolveNavCtaVariant,
	resolveNavHighlightVariant,
} from "@semio-community/ecosystem-site-core";

const quoriHomeLinkClassName =
	"group flex items-center sm:relative h-8 px-2 md:p-2 rounded-lg justify-start hover:bg-accent-base/10 transition-colors";

export type HeaderProps = {
	currentPath: string;
	navCollections: NavCollections;
};

const navHighlight = getNavHighlightClasses(
	resolveNavHighlightVariant(siteConfig.navigation?.highlightVariant),
);
const ctaVariant = resolveNavCtaVariant({
	ctaVariant: siteConfig.navigation?.ctaVariant,
	highlightVariant: siteConfig.navigation?.highlightVariant,
});

function normalizeCurrentPath(currentPath: string, urlPrefix: string) {
	if (!urlPrefix || urlPrefix === "/") {
		return currentPath;
	}
	if (currentPath === urlPrefix) {
		return "/";
	}
	if (currentPath.startsWith(`${urlPrefix}/`)) {
		const stripped = currentPath.slice(urlPrefix.length);
		return stripped.startsWith("/") ? stripped : `/${stripped}`;
	}
	return currentPath;
}

export default function Header({ currentPath, navCollections }: HeaderProps) {
	const urlPrefix = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
	const normalizedCurrentPath = normalizeCurrentPath(currentPath, urlPrefix);
	const resolveHref = (path: string) => url(path, urlPrefix || import.meta.env.BASE_URL);

	return (
		<SharedHeader
			currentPath={normalizedCurrentPath}
			siteTitle={siteConfig.title}
			homeHref={homeUrl()}
			showMobileGlow={false}
			homeLinkClassName={quoriHomeLinkClassName}
			homeLinkContent={
				<>
					<img src="/brand.svg" alt={siteConfig.title} className="size-5 dark:hidden block" />
					<img src="/brand-dark.svg" alt={siteConfig.title} className="size-5 hidden dark:block" />
					<strong className="block z-10 mb-0 ms-2 text-base xl:text-xl hover:opacity-90 whitespace-nowrap uppercase text-foreground">
						{siteConfig.title.charAt(0)}
						<span className="text-xs xl:text-sm">{siteConfig.title.slice(1)}</span>
					</strong>
				</>
			}
			navigation={
				<BoundNavigationMenu
					currentPath={normalizedCurrentPath}
					menuLinks={menuLinks}
					navCollections={navCollections}
					resolveHref={resolveHref}
					navHighlight={navHighlight}
					ctaVariant={ctaVariant}
					dropdownIconMap={navIconMap}
				/>
			}
			search={
				<SearchApp
					menuLinks={menuLinks}
					currentPath={normalizedCurrentPath}
					urlPrefix={urlPrefix}
				/>
			}
		/>
	);
}
