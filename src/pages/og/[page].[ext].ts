import type { APIContext } from "astro";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { renderOgImage } from "@/og/renderer";
import type { OgImageProps } from "@/og/types";
import { siteConfig } from "@/site.config";
import {
  mainRouteIconMap,
  type NavigationIcon,
} from "@/components/navigation/navIcons";

const STATIC_PAGES: Record<string, OgImageProps> = {
  home: {
    title: siteConfig.title,
    description: siteConfig.description,
  },
  features: {
    title: "Features",
    description:
      "Explore the modular design, configuration builder, and evolution of the Quori social robot platform.",
  },
  projects: {
    title: "Projects",
    description:
      "Explore community-driven robotics hardware platforms, open-source software tools, and reproducible research contributions advancing human-robot interaction",
  },
  services: {
    title: "Services",
    description:
      "Comprehensive support services for robotics hardware development, software engineering, and research programs in human-robot interaction",
  },
  events: {
    title: "Events",
    description:
      "Conferences, workshops, and training events for the human-robot interaction community",
  },
  contributors: {
    title: "Contributors",
    description:
      "People and organizations advancing human-centered robotics and AI together",
  },
  "get-involved": {
    title: "Get Involved",
    description:
      "Join the Semio Community - donate, volunteer, and help advance human-centered robotics and AI",
  },
  about: {
    title: "About",
    description:
      "Learn about Semio Community's mission to advance human-centered robotics through open science and collaboration",
  },
};

const BADGE_ICON_SIZE = 180;
const BADGE_ICON_COLOR = "#FF9E00";

const createBadgeIcon = (Icon: NavigationIcon) => {
  const svg = renderToStaticMarkup(
    React.createElement(Icon, {
      width: BADGE_ICON_SIZE,
      height: BADGE_ICON_SIZE,
      color: BADGE_ICON_COLOR,
    }),
  );
  const dataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  return React.createElement("img", {
    src: dataUrl,
    width: BADGE_ICON_SIZE,
    height: BADGE_ICON_SIZE,
    alt: "",
    style: { display: "block" },
  });
};

function getBadgeIcon(page: string): React.ReactNode {
  if (page === "home") {
    return React.createElement(
      "svg",
      {
        width: BADGE_ICON_SIZE,
        height: BADGE_ICON_SIZE,
        viewBox: "0 0 24 24",
        xmlns: "http://www.w3.org/2000/svg",
        style: { display: "block", color: BADGE_ICON_COLOR },
      },
      React.createElement(
        "g",
        { transform: "rotate(135 12 12)" },
        React.createElement("path", {
          d: "M8.7919 5.14712C9.17345 4.98591 9.35208 4.54591 9.19087 4.16435C9.02966 3.7828 8.58966 3.60417 8.2081 3.76538C4.70832 5.24406 2.25 8.70925 2.25 12.7503C2.25 18.1351 6.61522 22.5003 12 22.5003C17.3848 22.5003 21.75 18.1351 21.75 12.7503C21.75 8.70925 19.2917 5.24406 15.7919 3.76538C15.4103 3.60417 14.9703 3.7828 14.8091 4.16435C14.6479 4.54591 14.8265 4.98591 15.2081 5.14712C18.1722 6.39947 20.25 9.33312 20.25 12.7503C20.25 17.3067 16.5563 21.0003 12 21.0003C7.44365 21.0003 3.75 17.3067 3.75 12.7503C3.75 9.33312 5.82779 6.39947 8.7919 5.14712Z",
          fill: "currentColor",
        }),
        React.createElement("path", {
          d: "M12.75 2.75C12.75 2.33579 12.4142 2 12 2C11.5858 2 11.25 2.33579 11.25 2.75V6.75C11.25 7.16421 11.5858 7.5 12 7.5C12.4142 7.5 12.75 7.16421 12.75 6.75V2.75Z",
          fill: "currentColor",
        }),
      ),
    );
  }
  const Icon = mainRouteIconMap[page];
  return Icon ? createBadgeIcon(Icon) : null;
}

function getFormat(ext: string | undefined): "png" | "svg" {
  return ext === "svg" ? "svg" : "png";
}

export async function GET(context: APIContext) {
  const page = context.params.page as string;
  const ext = context.params.ext as string | undefined;
  const ogConfig = STATIC_PAGES[page];
  if (!ogConfig) {
    return new Response("Not found", { status: 404 });
  }
  const withIcon: OgImageProps = { ...ogConfig, badgeIcon: getBadgeIcon(page) };
  const { body, contentType } = await renderOgImage(getFormat(ext), withIcon);
  const responseBody =
    typeof body === "string"
      ? body
      : new Blob([Buffer.from(body)], { type: contentType });
  return new Response(responseBody, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}

export function getStaticPaths() {
  return Object.keys(STATIC_PAGES).flatMap((page) =>
    ["png", "svg"].map((ext) => ({
      params: { page, ext },
      props: STATIC_PAGES[page],
    })),
  );
}
