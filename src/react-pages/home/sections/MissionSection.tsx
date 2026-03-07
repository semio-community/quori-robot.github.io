import React from "react";
import { MissionSection as SharedMissionSection, type MissionSectionProps } from "@semio-community/ecosystem-site-core";
import { TestTube, Stopwatch, Copy } from "@solar-icons/react-perf/LineDuotone";

export type { MissionSectionProps };

const defaultPrimaryCopy = (
  <>
    We are building an HRI ecosystem where anyone can access the same tools,
    move faster from idea to impact, and replicate results with confidence.
  </>
);

const defaultFeatures: MissionSectionProps["features"] = [
  {
    title: "Accessible for every lab",
    description:
      "Transparent bills of materials, kits, and onboarding that let new teams join without prohibitive cost or complexity.",
    icon: <TestTube className="w-12 h-12 mx-auto mb-3 text-accent-two" />,
  },
  {
    title: "Faster experimentation",
    description:
      "Reference behaviors, quick-start robot configurations, and study templates keep researchers focused on new insights.",
    icon: <Stopwatch className="w-12 h-12 mx-auto mb-3 text-accent-two" />,
  },
  {
    title: "Reproducible by default",
    description:
      "Shared protocols and cross-lab comparisons that tackle the replication crisis and strengthen HRI as a science.",
    icon: <Copy className="w-12 h-12 mx-auto mb-3 text-accent-two" />,
  },
];

export default function MissionSection(props: MissionSectionProps) {
  return (
    <SharedMissionSection
      subtitle="We aim to bridge the accessibility gap and accelerate research and development for human-robot interaction (HRI), and to address the replication crisis to solidify HRI as a scientific discipline."
      primaryCopy={defaultPrimaryCopy}
      features={defaultFeatures}
      {...props}
    />
  );
}
