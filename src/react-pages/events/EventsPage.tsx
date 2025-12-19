import React from "react";
import HeroHeader from "@/components/hero/HeroHeader";
import ConnectSection from "@/react-pages/home/sections/ConnectSection";
import { Calendar } from "@solar-icons/react-perf/LineDuotone";

export interface EventsPageProps {
  children?: React.ReactNode;
}

export default function EventsPage({ children }: EventsPageProps) {
  return (
    <>
      <HeroHeader
        fullBleed
        icon={<Calendar className="w-16 h-16 text-accent-two" />}
        title="Events"
        description="Gather with the Semio Community at conferences, workshops, and training events focused on human-centered robotics and AI."
        actions={[
          { label: "Featured Events", href: "#featured" },
          { label: "Upcoming Events", href: "#upcoming", variant: "secondary" },
          { label: "Past Events", href: "#past", variant: "tertiary" },
        ]}
      />

      {children}

      <ConnectSection />
    </>
  );
}
