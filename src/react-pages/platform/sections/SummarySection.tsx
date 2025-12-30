import React from "react";
import Section from "@/components/sections/Section";
import FeatureCard from "@/components/cards/FeatureCard";
import {
  SettingsMinimalistic,
  Eye,
  ShieldCheck,
  SquareAcademicCap,
} from "@solar-icons/react-perf/LineDuotone";

const summaryItems = [
  {
    title: "Modular by design",
    description:
      "Interchangeable head, torso, and arm modules let you tailor Quori to your study without rebuilding from scratch.",
    icon: SettingsMinimalistic,
  },
  {
    title: "Human-centered interaction",
    description:
      "Expressive sensing, responsive behaviors, and a community library of proven interaction patterns.",
    icon: Eye,
  },
  {
    title: "Reliable & replicable",
    description:
      "Standardized builds, shared protocols, and validation tools that reduce replication friction across labs.",
    icon: ShieldCheck,
  },
  {
    title: "Built with the community",
    description:
      "Guided by shared research needs, open documentation, and support for classrooms and outreach.",
    icon: SquareAcademicCap,
  },
];

export default function SummarySection() {
  return (
    <Section
      id="summary"
      title="Robot Goals"
      subtitle="The current generation of Quori focuses on modularity, reproducibility, and approachable HRI experimentation."
      variant="primary"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryItems.map((item) => (
          <FeatureCard
            key={item.title}
            title={item.title}
            description={item.description}
            iconComponent={item.icon}
            variant="primary"
          />
        ))}
      </div>
    </Section>
  );
}
