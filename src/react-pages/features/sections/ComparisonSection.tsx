import React from "react";
import Section from "@/components/sections/Section";
import ComparisonTable, {
  type ComparisonColumn,
  type ComparisonRow,
} from "@/components/ui/ComparisonTable";

const comparisonColumns: ComparisonColumn[] = [
  { key: "v2", label: "Quori V2", accentClassName: "text-accent-two" },
  { key: "v1", label: "Quori V1", accentClassName: "text-accent-one" },
];

const comparisonRows: ComparisonRow[] = [
  {
    label: "Availability",
    description: "Ability to recieve a robot",
    cells: {
      v1: "Limited academic release",
      v2: "Community production pipeline",
    },
  },
  {
    label: "Modularity",
    description: "Swap or upgrade modules without a full rebuild.",
    cells: {
      v1: "Fixed head + torso",
      v2: "Modular head, torso, chestplate, arms",
    },
  },
  {
    label: "Sensors & perception",
    cells: {
      v1: "Baseline RGB + audio",
      v2: "Expanded sensing options; open interfaces for add-ons",
    },
  },
  {
    label: "Software stack",
    cells: {
      v1: "Early ROS integration",
      v2: "Refined HRI stack with behaviors, evaluation tools, and docs",
    },
  },
  {
    label: "Replication support",
    cells: {
      v1: "Ad hoc sharing",
      v2: "Standardized protocols, shared datasets, and study templates",
    },
  },
  {
    label: "Community resources",
    cells: {
      v1: "Small cohort",
      v2: "Active events, office hours, and cross-lab collaboration",
    },
  },
];

export default function ComparisonSection() {
  return (
    <Section
      id="comparison"
      title="Quori V1 vs V2"
      subtitle="A quick snapshot of what's new in the latest generation."
      variant="tertiary"
    >
      <div className="max-w-6xl mx-auto">
        <ComparisonTable
          title="Model comparison"
          caption="Temporary values for illustration; update with final specs as they are finalized."
          columns={comparisonColumns}
          rows={comparisonRows}
        />
      </div>
    </Section>
  );
}
