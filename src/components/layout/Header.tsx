import { NavigationMenuComponent } from "@/components/navigation/NavigationMenu";
import { SearchApp } from "@/components/search/SearchApp";
import { menuLinks, siteConfig } from "@/site.config";
import type { NavCollections } from "@/site.config";
import { homeUrl } from "@/utils/url";
import { Header as SharedHeader } from "@semio-community/ecosystem-site-core";

const quoriHomeLinkClassName =
  "group flex items-center sm:relative h-8 px-2 md:p-2 rounded-lg justify-start hover:bg-accent-base/10 transition-colors";

export type HeaderProps = {
  currentPath: string;
  navCollections: NavCollections;
};

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

  return (
    <SharedHeader
      currentPath={normalizedCurrentPath}
      siteTitle={siteConfig.title}
      homeHref={homeUrl()}
      showMobileGlow={false}
      homeLinkClassName={quoriHomeLinkClassName}
      homeLinkContent={
        <>
          <img src="/brand.svg" className="size-5 dark:hidden block" />
          <img src="/brand-dark.svg" className="size-5 hidden dark:block" />
          <strong className="block z-10 mb-0 ms-2 text-base xl:text-xl hover:opacity-90 whitespace-nowrap uppercase">
            {siteConfig.title.charAt(0)}
            <span className="text-xs xl:text-sm">{siteConfig.title.slice(1)}</span>
          </strong>
        </>
      }
      navigation={
        <NavigationMenuComponent
          currentPath={normalizedCurrentPath}
          menuLinks={menuLinks}
          navCollections={navCollections}
          urlPrefix={urlPrefix}
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
