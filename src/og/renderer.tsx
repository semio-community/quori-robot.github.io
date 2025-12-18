import React from "react";
import satori, { type SatoriOptions } from "satori";
import { Resvg } from "@resvg/resvg-js";
import { readFile } from "node:fs/promises";
import path from "node:path";
import GilroyRegular from "@/assets/fonts/Gilroy-Regular.otf";
import GilroyMedium from "@/assets/fonts/Gilroy-Medium.otf";
import GilroySemibold from "@/assets/fonts/Gilroy-SemiBold.otf";
import GilroyBold from "@/assets/fonts/Gilroy-Bold.otf";
import { OgCard } from "./components/OgCard";
import type { OgImageAsset, OgImageProps } from "./types";
import { OG_HEIGHT, OG_WIDTH } from "./constants";

const ogOptions: SatoriOptions = {
  width: OG_WIDTH,
  height: OG_HEIGHT,
  fonts: [
    {
      data: Buffer.from(GilroyRegular),
      name: "Gilroy",
      weight: 400,
      style: "normal",
    },
    {
      data: Buffer.from(GilroyMedium),
      name: "Gilroy",
      weight: 500,
      style: "normal",
    },
    {
      data: Buffer.from(GilroySemibold),
      name: "Gilroy",
      weight: 600,
      style: "normal",
    },
    {
      data: Buffer.from(GilroyBold),
      name: "Gilroy",
      weight: 700,
      style: "normal",
    },
  ],
};

let fallbackHeroImagePromise: Promise<OgImageAsset> | null = null;
async function getFallbackHeroImage(): Promise<OgImageAsset> {
  if (!fallbackHeroImagePromise) {
    fallbackHeroImagePromise = (async () => {
      const filePath = path.join(
        process.cwd(),
        "public",
        "quori-v2-banner.png",
      );
      const buffer = await readFile(filePath);
      return {
        src: `data:image/png;base64,${Buffer.from(buffer).toString("base64")}`,
        width: 1280,
        height: 720,
        alt: "",
      };
    })();
  }
  return fallbackHeroImagePromise;
}

export async function renderOgImage(
  format: "png" | "svg",
  props: OgImageProps,
): Promise<{ body: string | Uint8Array; contentType: string }> {
  const resolvedHero = props.heroImage?.src
    ? props.heroImage
    : await getFallbackHeroImage();
  const element = <OgCard {...props} heroImage={resolvedHero} />;
  let svg: string;
  try {
    svg = await satori(element, ogOptions);
  } catch (error) {
    console.error("Failed to render OG image", {
      format,
      title: props.title,
      hasHero: Boolean(props.heroImage),
      hasLogo: Boolean(props.logoImage),
    });
    throw error;
  }

  if (format === "svg") {
    return {
      body: svg,
      contentType: "image/svg+xml; charset=utf-8",
    };
  }

  const png = new Resvg(svg).render().asPng();
  return {
    body: png,
    contentType: "image/png",
  };
}
