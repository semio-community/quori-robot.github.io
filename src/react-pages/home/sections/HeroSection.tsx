import React from "react";
import HeroHeader from "@/components/hero/HeroHeader";

export interface HeroSectionProps {
  /**
   * Total count of active projects (hardware + software + research).
   */
  projectCount: number;
  /**
   * Count of upcoming/featured events to display.
   */
  upcomingEventCount: number;
  /**
   * Count of available services. Defaults to the current site constant.
   */
  servicesCount?: number;
  /**
   * If provided, overrides the default heading level (h1).
   */
  as?: React.ElementType;
}

/**
 * HeroSection
 *
 * A reusable composition for the homepage hero that renders:
 * - Brand headline with accent word styling
 * - Supporting intro copy
 * - CTA row with indicator chips
 *
 * This uses the shared HeroHeader container (which renders the glyph field and overlays content).
 * The full-bleed outer wrapper (100vw wide) should be applied by the page layout if needed.
 */
export default function HeroSection({
  projectCount,
  upcomingEventCount,
  servicesCount = 18,
  as: HeadingTag = "h1",
}: HeroSectionProps) {
  const titleNode = (
    <>
      <span className="text-accent-three font-semibold uppercase tracking-wide">
        Community
      </span>{" "}
      <span className="text-accent-one font-semibold uppercase tracking-wide">
        Research
      </span>{" "}
      <span className="text-accent-two font-semibold uppercase tracking-wide">
        Platform
      </span>
    </>
  );

  return (
    <HeroHeader
      title={titleNode}
      img="/quori-v2-banner.png"
      imgAlt="Quori V2 hardware banner"
      imgClassName="dark:brightness-50"
      imgObjectPosition="90% 50%"
      description={
        <>
          A low-cost,{" "}
          <span className="font-medium text-foreground">
            community-informed
          </span>
          , modular, open-source <br className="hidden md:flex" />
          <span className="font-medium text-foreground">social robot</span>{" "}
          platform for the{" "}
          <span className="font-medium text-foreground">
            human-robot interaction research community
          </span>
        </>
      }
      headingTag={HeadingTag}
      // actions={[
      //   {
      //     label: "Active Projects",
      //     href: "/projects",
      //     variant: "primary",
      //     indicatorText: projectCount ? projectCount.toString() : undefined,
      //   },
      //   {
      //     label: "Upcoming Events",
      //     href: "/events",
      //     variant: "tertiary",
      //     indicatorText: upcomingEventCount
      //       ? upcomingEventCount.toString()
      //       : undefined,
      //   },
      // ]}
    />
  );
}
