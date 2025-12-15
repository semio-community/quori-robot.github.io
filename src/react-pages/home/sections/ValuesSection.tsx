import React from "react";
import SectionBlock from "@/components/sections/SectionBlock";
import {
  Earth,
  EmojiFunnySquare,
  HandShake,
  Rocket2,
} from "@solar-icons/react-perf/LineDuotone";

interface Feature {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
}

export interface ValuesSectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  ariaLabel?: string;
  className?: string;
  cardClassName?: string;
  primaryCopy?: React.ReactNode;
  features?: Feature[];
}

export default function ValuesSection({
  id = "values",
  title = "Values",
  subtitle = "We are a friendly and rebellious community that values collaboration, innovation, and inclusivity in human-robot interaction (HRI).",
  ariaLabel,
  className,
  cardClassName,
  primaryCopy = (
    <>
      We welcome curious builders and researchers, celebrate bold ideas, and
      design with accessibility and representation in mind.
    </>
  ),
  features = [
    {
      title: "Friendly & rebellious",
      description:
        "We keep HRI approachable, question conventions, and share openly to move the field forward.",
      icon: (
        <EmojiFunnySquare className="w-10 h-10 dark:text-black text-white" />
      ),
    },
    {
      title: "Collaboration first",
      description:
        "We co-create hardware, software, and studies, giving credit, mentorship, and visibility along the way.",
      icon: <HandShake className="w-10 h-10 dark:text-black text-white" />,
    },
    {
      title: "Innovative by default",
      description:
        "We prototype quickly, test in the open, and turn research insights into reusable tools for everyone.",
      icon: <Rocket2 className="w-10 h-10 dark:text-black text-white" />,
    },
    {
      title: "Inclusive practice",
      description:
        "We design for diverse users and contributors, centering access, safety, and representation in every release.",
      icon: <Earth className="w-10 h-10 dark:text-black text-white" />,
    },
  ],
}: ValuesSectionProps) {
  return (
    <SectionBlock
      id={id}
      title={title}
      subtitle={subtitle}
      ariaLabel={ariaLabel || title}
      variant="default"
      className={className}
    >
      <div className="max-w-4xl mx-auto">
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
                    <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center rounded-xl bg-linear-to-br from-accent-one via-accent-two to-accent-three text-white shadow-sm">
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
