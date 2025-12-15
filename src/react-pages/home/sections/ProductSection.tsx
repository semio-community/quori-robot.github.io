import React from "react";
import SectionBlock from "@/components/sections/SectionBlock";
import {
  Calendar,
  Programming,
  SquareTransferHorizontal,
  ThreeSquares,
} from "@solar-icons/react-perf/LineDuotone";

interface Feature {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
}

export interface ProductSectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  ariaLabel?: string;
  className?: string;
  cardClassName?: string;
  primaryCopy?: React.ReactNode;
  features?: Feature[];
}

export default function ProductSection({
  id = "product",
  title = "Product",
  subtitle = "Our product of our process is the Quori social robot hardware and HRI software tools, replication studies network, and community events.",
  ariaLabel,
  className,
  cardClassName,
  primaryCopy = (
    <>
      The platform combines modular Quori hardware, an HRI software stack, and
      community programming so teams can build, test, and compare results
      together.
    </>
  ),
  features = [
    {
      title: "Quori hardware platform",
      description:
        "A modular social robot with interchangeable components, standard interfaces, and reference builds for varied research needs.",
      icon: (
        <SquareTransferHorizontal className="w-12 h-12 mx-auto mb-3 text-accent-three" />
      ),
    },
    {
      title: "HRI software tools",
      description:
        "Open-source behaviors, perception pipelines, and evaluation tooling tuned for social interaction and rapid iteration.",
      icon: (
        <Programming className="w-12 h-12 mx-auto mb-3 text-accent-three" />
      ),
    },
    {
      title: "Replication studies network",
      description:
        "Coordinated studies and shared datasets that benchmark results across sites and harden findings.",
      icon: (
        <ThreeSquares className="w-12 h-12 mx-auto mb-3 text-accent-three" />
      ),
    },
    {
      title: "Community events",
      description:
        "Meetups, demos, and conferences that connect contributors and showcase advances from across the ecosystem.",
      icon: <Calendar className="w-12 h-12 mx-auto mb-3 text-accent-three" />,
    },
  ],
}: ProductSectionProps) {
  return (
    <SectionBlock
      id={id}
      title={title}
      subtitle={subtitle}
      ariaLabel={ariaLabel || title}
      variant="tertiary"
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
