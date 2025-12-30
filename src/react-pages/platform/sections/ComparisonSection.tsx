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
    description: "Access to hardware for research teams.",
    cells: {
      v1: "10 units distributed to select US research institutions.",
      v2: "NSF-funded manufacturing and distribution of 50 robots.",
    },
  },
  {
    label: "Hardware modularity",
    description: "Swap or upgrade major components.",
    cells: {
      v1: "Integrated head, torso, spine, arms, and base with removable panels.",
      v2: "Seven modules: head, speaker, torso, chest, arms, mobile base, stand.",
    },
  },
  {
    label: "Sensors and perception",
    description: "Core sensing payload for HRI studies.",
    cells: {
      v1: "Depth + RGB cameras, microphone array, touch and proximity sensors.",
      v2: "RGB+D camera, IMUs, dual LiDARs, microphone array, light arrays.",
    },
  },
  {
    label: "Interaction surfaces",
    description: "How Quori communicates and expresses intent.",
    cells: {
      v1: "Rear-projected animated face and gesturing arms.",
      v2: "Touchscreen display, light arrays, and modular arms.",
    },
  },
  {
    label: "Degrees of freedom",
    description: "Key articulation and mobility degrees.",
    cells: {
      v1: "2-DOF per arm, turret rotation, articulated spine, holonomic base.",
      v2: "3-DOF head, 4-DOF per arm, holonomic base (x, y, θ).",
    },
  },
  {
    label: "Mobility and form factor",
    description: "Locomotion and physical configuration options.",
    cells: {
      v1: "Omnidirectional base with bowing spine, ADA-compliant footprint.",
      v2: "Holonomic 3-DOF base with telescoping pole and onboard storage.",
    },
  },
  {
    label: "Software stack",
    description: "Core autonomy, social behaviors, and tooling.",
    cells: {
      v1: "ROS-based control interfaces plus browser tools for content.",
      v2: "ROS 2 autonomy, social behavior layer, and GUI dev tools.",
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
