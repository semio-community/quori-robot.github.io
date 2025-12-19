import React from "react";
import HeroHeader from "@/components/hero/HeroHeader";
import { CpuBolt } from "@solar-icons/react-perf/LineDuotone";
import ConnectSection from "@/react-pages/home/sections/ConnectSection";
import ConfiguratorSection from "./sections/ConfiguratorSection";
import ModulesSection from "./sections/ModulesSection";
import ComparisonSection from "./sections/ComparisonSection";

export default function FeaturesPage() {
  return (
    <>
      <HeroHeader
        fullBleed
        icon={<CpuBolt className="w-16 h-16 text-accent-two" />}
        title="Features"
        description="Explore the modular design, configuration options, and evolution of the Quori platform."
        actions={[
          { label: "Configurations", href: "#builder", indicatorText: "29" },
          {
            label: "Modules",
            href: "#modules",
            variant: "secondary",
            indicatorText: "7",
          },
          { label: "Comparison", href: "#comparison", variant: "tertiary" },
        ]}
      />

      <ConfiguratorSection />
      <ModulesSection />
      <ComparisonSection />
      <ConnectSection />
    </>
  );
}
