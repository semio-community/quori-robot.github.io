import React from "react";
import { ModuleCarousel } from "@/components/ui/ModuleCarousel";
import VisionSection from "@/react-pages/home/sections/VisionSection";
import StrategySection from "@/react-pages/home/sections/StrategySection";
import ProductSection from "@/react-pages/home/sections/ProductSection";
import ValuesSection from "@/react-pages/home/sections/ValuesSection";
import ConnectSection from "@/react-pages/home/sections/ConnectSection";
import FundingPartnerSection, {
  type FundingPartnerData,
} from "@/react-pages/home/sections/FundingPartnerSection";
import {
  configurator3DConfigurations,
  configurator3DModules,
} from "@/react-pages/features/sections/configurator3d/spec";

export interface HomePageProps {
  projectCount: number;
  featuredEventCount: number;
  fundingPartner?: FundingPartnerData | null;
}

export default function HomePage({
  projectCount: _projectCount,
  featuredEventCount: _featuredEventCount,
  fundingPartner,
}: HomePageProps) {
  return (
    <div className="space-y-12 pt-[72px] lg:pt-0">
      <div
        className="relative mb-8 sm:mb-12"
        style={{
          width: "100vw",
          position: "relative",
          left: "50%",
          right: "50%",
          marginLeft: "-50vw",
          marginRight: "-50vw",
        }}
      >
        <ModuleCarousel
          modules={configurator3DModules}
          configurations={configurator3DConfigurations}
          configurationIds={[
            "base-torso-chest-arms-head-speaker",
            "base-speaker",
            "stand-head-speaker",
            "base-head-speaker",
            "base-torso-chest-head-speaker",
            "stand-torso-chest-arms-head-speaker",
          ]}
          autoAdvance
          autoAdvanceMs={6500}
        />
      </div>

      <VisionSection />
      <StrategySection />
      <ProductSection />
      <ValuesSection />

      <FundingPartnerSection partner={fundingPartner} />

      <ConnectSection />
    </div>
  );
}
