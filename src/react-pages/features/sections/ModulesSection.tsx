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
  imageSrc?: { light: string; dark?: string } | string;
  bullets: string[];
};

const moduleCards: ModuleCardDefinition[] = [
  {
    id: "head",
    name: "Head",
    description: "Core sensing and expressive interaction surface.",
    Icon: HeadIcon,
    accentClassName: "text-accent-two",
    imageSrc: {
      light: "/configurations/images/Head_light.gif",
      dark: "/configurations/images/Head_dark.gif",
    },
    bullets: [
      "3-DOFs (pan, tilt, lift)",
      "Integrated RGB+D camera",
      "Touchscreen display",
      "Pairs with mobile or stationary deployments",
      "Mount point for smart speaker",
    ],
  },
  {
    id: "speaker",
    name: "Smart Speaker",
    description:
      "Audio input/output module for spoken dialogue and human-robot interaction.",
    Icon: SpeakerIcon,
    accentClassName: "text-accent-two",
    imageSrc: {
      light: "/configurations/images/Speaker_light.gif",
      dark: "/configurations/images/Speaker_dark.gif",
    },
    bullets: [
      "Can mount on head, torso, base, or stand",
      "LED Light array for visual feedback",
      "Physical control buttons",
    ],
  },
  {
    id: "base",
    name: "Mobile Base",
    description: "Locomotion platform for navigation and mobile studies.",
    Icon: BaseIcon,
    accentClassName: "text-accent-one",
    imageSrc: {
      light: "/configurations/images/Base_light.gif",
      dark: "/configurations/images/Base_dark.gif",
    },
    bullets: [
      "Holonomic 3-DOF control of (x, y, θ)",
      "Integrated LiDAR sensors",
      "LED Light array for visual feedback",
      "Storage compartment",
      "Battery pack and charging port",
    ],
  },
  {
    id: "chest",
    name: "Chest",
    description: "Front fascia for sensors, displays, and branding.",
    Icon: ChestIcon,
    accentClassName: "text-accent-base",
    imageSrc: {
      light: "/configurations/images/Chest_light.gif",
      dark: "/configurations/images/Chest_dark.gif",
    },
    bullets: [
      "Sits on the front of the torso",
      "Customizable design for branding",
    ],
  },
  {
    id: "arms",
    name: "Arms",
    description: "Optional manipulation modules mounted behind the torso.",
    Icon: ArmsIcon,
    accentClassName: "text-accent-base",
    imageSrc: {
      light: "/configurations/images/Arms_light.gif",
      dark: "/configurations/images/Arms_dark.gif",
    },
    bullets: [
      "LED Light arrays for visual feedback",
      "Can be used with or without chest",
      "4-DOF per arm (shoulder flexion/abduction and elbow rotation/flexion)",
    ],
  },
  {
    id: "torso",
    name: "Torso",
    description:
      "Adds stability and mounting space for arms and chest modules.",
    Icon: TorsoIcon,
    accentClassName: "text-accent-three",
    imageSrc: { light: "/configurations/images/torso-render.png" },
    bullets: [
      "Supports chest fascia and arm mounts",
      "Typical bridge between base/stand and head",
      "Utilizes the modular connector design as other modules for quick and easy swapping",
    ],
  },
  {
    id: "stand",
    name: "Stand",
    description: "Stationary base option.",
    Icon: StandIcon,
    accentClassName: "text-accent-one",
    imageSrc: {
      light: "/configurations/images/Stand_light.gif",
      dark: "/configurations/images/Stand_dark.gif",
    },
    bullets: [
      "Swap-in option for base configurations",
      "Stable, compact footprint",
      "Ideal for development or stationary deployments",
    ],
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
      <div className="max-w-6xl mx-auto grid grid-cols-1 gap-6">
        {moduleCards.map((m, index) => (
          <div
            key={m.id}
            id={`module-${m.id}`}
            className={clsx(
              "group bg-neutral-200 dark:bg-neutral-800 rounded-lg hover:shadow-lg transition-all hover:scale-105 h-full overflow-hidden backdrop-blur-lg",
              "flex flex-col sm:flex-row sm:items-stretch",
              index % 2 === 1 ? "sm:flex-row-reverse" : null,
            )}
          >
            {/* Image section */}
            <div className="mb-4 sm:mb-0 sm:w-1/2">
              <div className="aspect-square sm:aspect-auto sm:h-full overflow-hidden bg-[#C9C9C9] dark:bg-[#4D4D4D] relative">
                {m.imageSrc ? (
                  (() => {
                    const source =
                      typeof m.imageSrc === "string"
                        ? { light: m.imageSrc }
                        : m.imageSrc;
                    return (
                      <>
                        <img
                          src={source.light}
                          alt={m.name}
                          className={clsx(
                            "w-full h-full object-cover group-hover:scale-110 transition-transform duration-300",
                            source.dark ? "dark:hidden" : null,
                          )}
                          loading="lazy"
                          decoding="async"
                        />
                        {source.dark ? (
                          <img
                            src={source.dark}
                            alt={m.name}
                            className="hidden dark:block w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            loading="lazy"
                            decoding="async"
                          />
                        ) : null}
                      </>
                    );
                  })()
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
            <div className="flex flex-col flex-1 p-6 pt-0 sm:pt-6 min-h-0">
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
                  {m.bullets.map((item) => (
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
