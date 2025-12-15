import React from "react";
import HeroSection from "@/react-pages/home/sections/HeroSection";
import VisionSection from "@/react-pages/home/sections/VisionSection";
import StrategySection from "@/react-pages/home/sections/StrategySection";
import ProductSection from "@/react-pages/home/sections/ProductSection";
import ValuesSection from "@/react-pages/home/sections/ValuesSection";
import ConnectSection from "@/react-pages/home/sections/ConnectSection";

export interface HomePageProps {
  projectCount: number;
  featuredEventCount: number;
}

export default function HomePage({
  projectCount,
  featuredEventCount,
}: HomePageProps) {
  return (
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
        <HeroSection
          projectCount={projectCount}
          upcomingEventCount={featuredEventCount}
        />
      </div>

      <VisionSection />
      <StrategySection />
      <ProductSection />
      <ValuesSection />

      <ConnectSection />
    </div>
  );
}
