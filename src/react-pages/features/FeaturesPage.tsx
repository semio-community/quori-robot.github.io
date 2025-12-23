import React from "react";
import HeroHeader from "@/components/hero/HeroHeader";
import { CpuBolt } from "@solar-icons/react-perf/LineDuotone";
import ConnectSection from "@/react-pages/home/sections/ConnectSection";
import ConfiguratorSection from "./sections/ConfiguratorSection";
import ModulesSection from "./sections/ModulesSection";
import ComparisonSection from "./sections/ComparisonSection";
import {
  configurator3DConfigurations,
  configurator3DModules,
} from "./sections/configurator3d/spec";

export default function FeaturesPage() {
  const configurationCount = Object.keys(configurator3DConfigurations).length;
  const moduleCount = Object.keys(configurator3DModules).length;

  return (
    <>
      <HeroHeader
        fullBleed
        icon={<CpuBolt className="w-16 h-16 text-accent-two" />}
        title="Features"
        description="Explore the modular design, configuration options, and evolution of the Quori platform."
        actions={[
          {
            label: "Configurations",
            href: "#configurations",
            indicatorText: String(configurationCount),
          },
          {
            label: "Modules",
            href: "#modules",
            variant: "secondary",
            indicatorText: String(moduleCount),
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
