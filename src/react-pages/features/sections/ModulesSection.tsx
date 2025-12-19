import React from "react";
import Section from "@/components/sections/Section";
import {
  ArmsIcon,
  BaseIcon,
  ChestIcon,
  HeadIcon,
  SpeakerIcon,
  StandIcon,
  TorsoIcon,
} from "./configurator3d/icons";
import { clsx } from "clsx";
import { SettingsMinimalistic } from "@solar-icons/react-perf/LineDuotone";

type ModuleCardDefinition = {
  id: string;
  name: string;
  description: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  accentClassName: string;
  imageSrc?: string;
  bullets: string[];
};

const moduleCards: ModuleCardDefinition[] = [
  {
    id: "head",
    name: "Head",
    description: "Core sensing and expressive interaction surface.",
    Icon: HeadIcon,
    accentClassName: "text-accent-two",
    imageSrc: "/configurations/images/head-render.png",
    bullets: [
      "Pairs with mobile or stationary deployments",
      "Mount point for speaker option",
    ],
  },
  {
    id: "speaker",
    name: "Speaker",
    description: "Audio output module for speech and interaction cues.",
    Icon: SpeakerIcon,
    accentClassName: "text-accent-two",
    bullets: ["Can mount on head, torso, base, or stand"],
  },
  {
    id: "torso",
    name: "Torso",
    description: "Adds stability and mounting space for front/back modules.",
    Icon: TorsoIcon,
    accentClassName: "text-accent-three",
    imageSrc: "/configurations/images/torso-render.png",
    bullets: [
      "Supports chest fascia and arm mounts",
      "Typical bridge between base/stand and head",
    ],
  },
  {
    id: "chest",
    name: "Chest",
    description: "Front fascia for sensors, displays, and branding.",
    Icon: ChestIcon,
    accentClassName: "text-accent-base",
    imageSrc: "/configurations/images/chest-render.png",
    bullets: ["Sits on the front of the torso", "Optional with arms"],
  },
  {
    id: "arms",
    name: "Arms",
    description: "Optional manipulation modules mounted behind the torso.",
    Icon: ArmsIcon,
    accentClassName: "text-accent-base",
    imageSrc: "/configurations/images/arms-render.png",
    bullets: ["Can be used with or without chest", "Mounted slightly behind"],
  },
  {
    id: "base",
    name: "Mobile Base",
    description: "Locomotion platform for navigation and mobile studies.",
    Icon: BaseIcon,
    accentClassName: "text-accent-one",
    imageSrc: "/configurations/images/base-render.png",
    bullets: ["Provides mobility + power", "Supports torso/head stacks"],
  },
  {
    id: "stand",
    name: "Stand",
    description: "Stationary base option for fixed-position experiments.",
    Icon: StandIcon,
    accentClassName: "text-accent-one",
    imageSrc: "/configurations/images/stand-render.png",
    bullets: ["Swap-in for base configurations", "Stable, compact footprint"],
  },
];

export default function ModulesSection() {
  return (
    <Section
      id="modules"
      title="Modules"
      subtitle="Review each module and how it fits into Quori’s modular configurations."
      variant="primary"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {moduleCards.map((m) => (
          <div
            key={m.id}
            id={`module-${m.id}`}
            className="group flex flex-col bg-special-lighter rounded-lg hover:shadow-lg transition-all hover:scale-105 h-full overflow-hidden backdrop-blur-lg"
          >
            {/* Image section */}
            <div className="mb-4">
              <div className="aspect-square overflow-hidden bg-linear-to-br from-special-lighter to-special relative">
                {m.imageSrc ? (
                  <img
                    src={m.imageSrc}
                    alt={m.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={clsx("h-24 w-24", m.accentClassName)}>
                      <m.Icon
                        className="h-full w-full group-hover:scale-110 transition-transform duration-300"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Content section */}
            <div className="flex flex-col flex-1 p-6 pt-0 min-h-0">
              <h3 className="font-semibold mb-2 text-accent-base group-hover:text-accent-two transition-colors flex items-center justify-between gap-2">
                <span className="truncate">{m.name}</span>
                <m.Icon
                  className={clsx("w-6 h-6 shrink-0", m.accentClassName)}
                  aria-hidden="true"
                />
              </h3>

              <p className="text-sm text-color-600 dark:text-color-400 mb-3 line-clamp-3 min-h-15">
                {m.description}
              </p>

              {m.bullets.length > 0 ? (
                <div className="text-sm text-color-600 dark:text-color-400 mb-3 min-h-10">
                  {m.bullets.slice(0, 2).map((item) => (
                    <div
                      key={`${m.id}-${item}`}
                      className="flex items-start gap-2"
                    >
                      <SettingsMinimalistic className="text-accent-two mt-0.5 w-4 h-4 shrink-0" />
                      <span className="text-sm text-accent-base">{item}</span>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
