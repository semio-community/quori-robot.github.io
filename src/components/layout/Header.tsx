import { useCallback } from "react";
import { NavigationMenuComponent } from "@/components/navigation/NavigationMenu";
import { SearchApp } from "@/components/search/SearchApp";
import { menuLinks, siteConfig } from "@/site.config";
import type { NavCollections } from "@/site.config";
import { homeUrl, url } from "@/utils/url";

import "@/components/navigation/navigation-menu.css";

export type HeaderProps = {
  currentPath: string;
  navCollections: NavCollections;
};

export default function Header({ currentPath, navCollections }: HeaderProps) {
  const urlPrefix = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
  const handleThemeToggle = useCallback(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    const isDark = root.getAttribute("data-theme") === "dark";
    const ev = new CustomEvent("theme-change", {
      detail: { theme: isDark ? "light" : "dark" },
    });
    document.dispatchEvent(ev);
  }, []);

  return (
    <header
      id="main-header"
      className="fixed left-0 right-0 z-50 lg:sticky top-0 h-[72px] w-full bg-surface/80 backdrop-blur-xl lg:bg-surface/85 lg:backdrop-blur-lg border-b border-accent-base/10 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.07)] dark:shadow-[0_2px_8px_-3px_rgba(0,0,0,0.3)]"
    >
      <div className="w-full h-full xl:max-w-6xl xl:mx-auto px-2 sm:px-4 md:px-6 lg:px-8 flex items-center justify-between">
        <a
          aria-label={siteConfig.title}
          aria-current={currentPath === "/" ? "page" : undefined}
          className="group flex items-center sm:relative h-8 px-2 md:p-2 rounded-lg justify-start hover:bg-accent-base/10 transition-colors"
          href={homeUrl()}
        >
          <img src="/brand.svg" className="size-5 dark:hidden block" />
          <img src="/brand-dark.svg" className="size-5 hidden dark:block" />
          <strong className="block z-10 mb-0 ms-2 text-base xl:text-xl hover:opacity-90 whitespace-nowrap uppercase">
            {siteConfig.title.charAt(0)}
            <span className="text-xs xl:text-sm">
              {siteConfig.title.slice(1)}
            </span>
          </strong>
        </a>

        <nav className="hidden md:flex ml-auto mr-2 lg:mr-6 items-center">
          <NavigationMenuComponent
            currentPath={currentPath}
            menuLinks={menuLinks}
            navCollections={navCollections}
            urlPrefix={urlPrefix}
          />
        </nav>

        <div className="flex items-center gap-x-1 md:gap-x-2">
          <div
            id="buttons-panel"
            className="hidden md:flex space-x-1 md:space-x-2"
          >
            <button
              className="hidden md:flex relative items-center justify-center select-none rounded-lg transition-colors bg-color-100 text-accent-base hover:bg-accent-base/10 focus:outline-2 focus:outline-accent-two outline-offset-2 h-8 w-8"
              type="button"
              aria-label="Toggle theme"
              onClick={handleThemeToggle}
            >
              <svg
                aria-hidden="true"
                className="absolute w-5 h-5 opacity-100 scale-100 transition-all dark:opacity-0 dark:scale-0"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <line
                  x1="12"
                  y1="2"
                  x2="12"
                  y2="5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <line
                  x1="12"
                  y1="19"
                  x2="12"
                  y2="22"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <line
                  x1="2"
                  y1="12"
                  x2="5"
                  y2="12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <line
                  x1="19"
                  y1="12"
                  x2="22"
                  y2="12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <line
                  x1="4.22"
                  y1="4.22"
                  x2="6.34"
                  y2="6.34"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <line
                  x1="17.66"
                  y1="17.66"
                  x2="19.78"
                  y2="19.78"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <line
                  x1="17.66"
                  y1="6.34"
                  x2="19.78"
                  y2="4.22"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <line
                  x1="4.22"
                  y1="19.78"
                  x2="6.34"
                  y2="17.66"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <svg
                aria-hidden="true"
                className="absolute w-5 h-5 opacity-0 scale-0 transition-all dark:opacity-100 dark:scale-100"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                ></path>
              </svg>
            </button>
          </div>

          <SearchApp
            menuLinks={menuLinks}
            currentPath={currentPath}
            urlPrefix={urlPrefix}
          />
        </div>
      </div>
    </header>
  );
}
