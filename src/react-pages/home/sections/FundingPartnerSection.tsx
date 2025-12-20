import React from "react";
import SectionBlock from "@/components/sections/SectionBlock";
import BasicChip from "@/components/ui/BasicChip";
import { CallToActionButton } from "@/components/ui/CallToActionButton";

export interface FundingPartnerData {
  id: string;
  name: string;
  shortName?: string;
  description: string;
  collaborationSummary?: string;
  type?: string;
  category?: string;
  website?: string;
  logoSrc?: string;
}

const typeLabels: Record<string, string> = {
  academic: "Academic Institution",
  industry: "Industry Partner",
  nonprofit: "Non-Profit Organization",
  government: "Government Agency",
  community: "Community Organization",
};

const categoryLabels: Record<string, string> = {
  research: "Research Collaboration",
  development: "Development Partner",
  funding: "Funding Partner",
  infrastructure: "Infrastructure Support",
  outreach: "Outreach & Education",
};

export default function FundingPartnerSection({
  partner,
}: {
  partner?: FundingPartnerData | null;
}) {
  if (!partner) return null;

  const displayName =
    partner.shortName && partner.shortName !== partner.name
      ? `${partner.name} (${partner.shortName})`
      : partner.name;
  const typeLabel = partner.type ? typeLabels[partner.type] : undefined;
  const categoryLabel = partner.category
    ? categoryLabels[partner.category]
    : undefined;

  return (
    <SectionBlock
      id="sponsor"
      title="Primary Sponsor"
      subtitle="Sustaining open, reproducible HRI research through national research infrastructure support."
      variant="tertiary"
    >
      <div className="max-w-5xl mx-auto">
        <div className="group bg-special-lighter rounded-lg hover:shadow-lg transition-all hover:scale-[1.01] h-full overflow-hidden backdrop-blur-lg flex flex-col md:flex-row md:items-stretch">
          <div className="md:w-2/5">
            <div className="h-full min-h-[220px] bg-linear-to-br from-special-lighter to-special flex items-center justify-center p-10">
              {partner.logoSrc ? (
                <img
                  src={partner.logoSrc}
                  alt={`${partner.name} logo`}
                  className="w-full max-w-60 object-contain drop-shadow-sm"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <span className="text-3xl font-semibold text-accent-base">
                  {partner.shortName || partner.name}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col flex-1 p-6 pt-0 md:pt-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {categoryLabel && (
                <BasicChip text="Sponsor" variant="secondary" />
              )}
              {typeLabel && <BasicChip text={typeLabel} variant="default" />}
            </div>

            <h3 className="text-xl font-semibold text-accent-base mb-3">
              {displayName}
            </h3>

            <p className="text-sm text-color-600 dark:text-color-400 mb-4">
              {partner.collaborationSummary || partner.description}
            </p>

            {partner.collaborationSummary && (
              <p className="text-sm text-accent-base/70 mb-6 line-clamp-3">
                {partner.description}
              </p>
            )}

            <div className="mt-auto flex flex-wrap gap-3">
              <CallToActionButton
                href={`/organizations/${partner.id}`}
                variant="primary"
                size="medium"
              >
                Explore the partnership
              </CallToActionButton>
              {partner.website && (
                <CallToActionButton
                  href={partner.website}
                  variant="secondary"
                  size="medium"
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit NSF
                </CallToActionButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </SectionBlock>
  );
}
