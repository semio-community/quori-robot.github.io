import React from "react";
import {
  Book2,
  Global,
  HandStars,
  SquareAcademicCap,
} from "@solar-icons/react-perf/LineDuotone";
import SectionBlock from "@/components/sections/SectionBlock";

interface Feature {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
}

export interface StrategySectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  ariaLabel?: string;
  className?: string;
  cardClassName?: string;
  primaryCopy?: React.ReactNode;
  features?: Feature[];
}

export default function StrategySection({
  id = "strategy",
  title = "Strategy",
  subtitle = "Our process to achieve our purpose is by establishing a shared platform for hardware and software, and building a community through resources, events, and collaboration.",
  ariaLabel,
  className,
  cardClassName,
  primaryCopy = (
    <>
      We align the community around a common platform and shared rituals—docs,
      events, and collaboration channels—so improvements spread quickly and
      newcomers are never alone.
    </>
  ),
  features = [
    {
      title: "Shared platform",
      description:
        "Open Quori hardware and modular HRI software so upgrades ripple across every team instead of staying siloed.",
      icon: <Global className="w-12 h-12 mx-auto mb-3 text-accent-one" />,
    },
    {
      title: "Community resources",
      description:
        "Documentation, starter kits, and learning paths that make contributing, teaching, and deploying straightforward.",
      icon: <Book2 className="w-12 h-12 mx-auto mb-3 text-accent-one" />,
    },
    {
      title: "Events and learning",
      description:
        "Workshops, office hours, and demos where we share what's working, surface challenges, and onboard new collaborators.",
      icon: (
        <SquareAcademicCap className="w-12 h-12 mx-auto mb-3 text-accent-one" />
      ),
    },
    {
      title: "Collaboration network",
      description:
        "Pair labs, partners, and students to co-develop modules, replicate studies, and evaluate systems together.",
      icon: <HandStars className="w-12 h-12 mx-auto mb-3 text-accent-one" />,
    },
  ],
}: StrategySectionProps) {
  return (
    <SectionBlock
      id={id}
      title={title}
      subtitle={subtitle}
      ariaLabel={ariaLabel || title}
      variant="secondary"
      className={className}
    >
      <div className="max-w-5xl mx-auto">
        <div
          className={`bg-special-lighter rounded-lg p-8 border border-special mb-8 backdrop-blur-lg ${
            cardClassName || ""
          }`}
        >
          {primaryCopy ? (
            <div className="text-lg leading-relaxed text-center mb-6">
              {typeof primaryCopy === "string" ? (
                <p>{primaryCopy}</p>
              ) : (
                primaryCopy
              )}
            </div>
          ) : null}

          {features.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, idx) => (
                <div
                  key={`${feature.title}-${idx}`}
                  className={`text-center ${feature.className || ""}`}
                >
                  {feature.icon ? (
                    <div className="w-12 h-12 mx-auto mb-3 text-accent-two flex items-center justify-center">
                      {feature.icon}
                    </div>
                  ) : null}
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-accent-base/50">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </SectionBlock>
  );
}
