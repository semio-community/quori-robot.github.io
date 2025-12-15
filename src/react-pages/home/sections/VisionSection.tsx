import React from "react";
import SectionBlock from "@/components/sections/SectionBlock";
import { TestTube, Stopwatch, Copy } from "@solar-icons/react-perf/LineDuotone";

interface Feature {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
}

export interface VisionSectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  ariaLabel?: string;
  className?: string;
  cardClassName?: string;
  primaryCopy?: React.ReactNode;
  features?: Feature[];
}

export default function VisionSection({
  id = "vision",
  title = "Vision",
  subtitle = "Our purpose is to bridge the accessibility gap and accelerate HRI development for researchers, and address the replication crisis to solidify HRI as a scientific discipline.",
  ariaLabel,
  className,
  cardClassName,
  primaryCopy = (
    <>
      We are building an HRI ecosystem where anyone can access the same tools,
      replicate results with confidence, and move faster from idea to impact.
    </>
  ),
  features = [
    {
      title: "Accessible for every lab",
      description:
        "Transparent bills of materials, kits, and onboarding that let new teams join without prohibitive cost or complexity.",
      icon: <TestTube className="w-12 h-12 mx-auto mb-3 text-accent-two" />,
    },
    {
      title: "Faster experimentation",
      description:
        "Reference behaviors, quick-start robot configurations, and study templates keep researchers focused on new insights.",
      icon: <Stopwatch className="w-12 h-12 mx-auto mb-3 text-accent-two" />,
    },
    {
      title: "Reproducible by default",
      description:
        "Shared protocols and cross-lab comparisons that tackle the replication crisis and strengthen HRI as a discipline.",
      icon: <Copy className="w-12 h-12 mx-auto mb-3 text-accent-two" />,
    },
  ],
}: VisionSectionProps) {
  return (
    <SectionBlock
      id={id}
      title={title}
      subtitle={subtitle}
      ariaLabel={ariaLabel || title}
      variant="primary"
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
