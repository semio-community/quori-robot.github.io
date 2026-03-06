import React from "react";
import { ModuleCarousel } from "@/components/ui/ModuleCarousel";
import MissionSection from "@/react-pages/home/sections/MissionSection";
import StrategySection from "@/react-pages/home/sections/StrategySection";
import PlatformsSection from "@/react-pages/home/sections/PlatformsSection";
import ValuesSection from "@/react-pages/home/sections/ValuesSection";
import ConnectSection from "@/react-pages/home/sections/ConnectSection";
import ContributorsSection, {
  type FundingPartnerData,
} from "@/react-pages/home/sections/ContributorsSection";
import type { CollectionEntry } from "astro:content";
import {
  configurator3DConfigurations,
  configurator3DModules,
} from "@/react-pages/platform/sections/configurator3d/spec";
import { CallToActionButton, BaseUrlProvider } from "@semio-community/ecosystem-site-core";

const BASE_URL = import.meta.env.BASE_URL;

export interface HomePageProps {
  projectCount: number;
  featuredEventCount: number;
  fundingPartner?: FundingPartnerData | null;
  contributors?: Array<{
    id: string;
    data?: CollectionEntry<"organizations">["data"];
  }>;
}

export default function HomePage({
  projectCount: _projectCount,
  featuredEventCount: _featuredEventCount,
  fundingPartner,
  contributors = [],
}: HomePageProps) {
  return (
    <BaseUrlProvider baseUrl={BASE_URL}>
    <div className="space-y-12">
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

      <div className="bg-linear-to-bl from-accent-three/10 to-accent-base/10 rounded-lg p-8 border border-accent-three/20 backdrop-blur-lg text-center text-lg flex flex-col gap-6">
        <div>
          Quori is a not-for-profit, low-cost, modular, open-source social robot
          platform designed <span className="italic">with</span> the HRI
          community <span className="italic">for</span> the HRI community.
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CallToActionButton
            key="mission"
            href="#mission"
            size="large"
            variant="primary"
            ariaLabel="Mission"
          >
            Our Mission
          </CallToActionButton>
          <CallToActionButton
            key="strategy"
            href="#strategy"
            size="large"
            variant="secondary"
            ariaLabel="Strategy"
          >
            Our Strategy
          </CallToActionButton>
          <CallToActionButton
            key="platforms"
            href="#platforms"
            size="large"
            variant="tertiary"
            ariaLabel="Platforms"
          >
            Our Platforms
          </CallToActionButton>
          <CallToActionButton
            key="values"
            href="#values"
            size="large"
            variant="primary"
            ariaLabel="Values"
          >
            Our Values
          </CallToActionButton>

          <CallToActionButton
            key="contributors"
            href="#contributors"
            size="large"
            variant="default"
            ariaLabel="Contributors"
            className="col-span-1 md:col-span-2"
          >
            Our Contributors
          </CallToActionButton>
        </div>
      </div>

      <MissionSection />
      <StrategySection />
      <PlatformsSection />
      <ValuesSection />

      <ContributorsSection
        // partner={fundingPartner}
        contributors={contributors}
      />

      <ConnectSection />
    </div>
    </BaseUrlProvider>
  );
}
