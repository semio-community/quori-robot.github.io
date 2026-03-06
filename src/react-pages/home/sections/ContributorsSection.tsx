import React from "react";
import SectionBlock from "@/components/sections/SectionBlock";
import {
  BasicChip,
  CallToActionButton,
  OrganizationListElement,
} from "@semio-community/ecosystem-site-core";
import type { CollectionEntry } from "astro:content";
import { url } from "@/utils/url";

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

const awardLinkClass = "text-link hover:ring-1 rounded-sm px-1";

export default function ContributorsSection({
  partner,
  contributors = [],
}: {
  partner?: FundingPartnerData | null;
  contributors?: Array<{
    id: string;
    data?: CollectionEntry<"organizations">["data"];
  }>;
}) {
  if (!partner && contributors.length === 0) return null;

  const displayName =
    partner && partner.shortName && partner.shortName !== partner.name
      ? `${partner.name} (${partner.shortName})`
      : partner?.name;
  const typeLabel = partner?.type ? typeLabels[partner.type] : undefined;
  const categoryLabel = partner?.category
    ? categoryLabels[partner.category]
    : undefined;

  return (
    <SectionBlock
      id="contributors"
      title="Contributors"
      subtitle="Sustaining open, reproducible HRI research through multidisciplinary collaboration among academia, industry, and the public sector."
      variant="tertiary"
    >
      <div className="text-center text-color-600 dark:text-color-400 mb-6">
        The Quori project is made possible through the contributions of partners
        <br className="hidden md:block" /> spanning academia, industry, and
        government.
      </div>
      <div className="max-w-5xl mx-auto space-y-8">
        {contributors.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {contributors.map((org) => (
              <OrganizationListElement
                key={org.id}
                organizationId={org.id}
                data={org.data}
                className="w-full"
              />
            ))}
          </div>
        )}

        <div className="text-center text-color-600 dark:text-color-400">
          The development of Quori v2 is supported by NSF IIS grants{" "}
          <a
            className={awardLinkClass}
            target="_blank"
            referrerPolicy="no-referrer"
            href="https://www.nsf.gov/awardsearch/show-award?AWD_ID=2235042"
          >
            #2235042
          </a>{" "}
          and{" "}
          <a
            className={awardLinkClass}
            target="_blank"
            referrerPolicy="no-referrer"
            href="https://www.nsf.gov/awardsearch/show-award?AWD_ID=2235043"
          >
            #2235043
          </a>
          . The development of Quori v1 was supported by NSF CNS grants{" "}
          <a
            className={awardLinkClass}
            target="_blank"
            referrerPolicy="no-referrer"
            href="https://www.nsf.gov/awardsearch/show-award?AWD_ID=1513108"
          >
            #1513108
          </a>{" "}
          and{" "}
          <a
            className={awardLinkClass}
            target="_blank"
            referrerPolicy="no-referrer"
            href="https://www.nsf.gov/awardsearch/show-award?AWD_ID=1513275"
          >
            #1513275
          </a>
          .
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <CallToActionButton
            href={url("/contributors")}
            size="large"
            variant="tertiary"
          >
            See Contributors
          </CallToActionButton>

          <CallToActionButton
            target="_blank"
            rel="noopener noreferrer"
            href="https://donate.semio.community/b/00w3cv77McUD6Ob2A7a7C01"
            size="large"
            variant="tertiary"
          >
            Support the Quori Project
          </CallToActionButton>
        </div>

        {partner && (
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

            <div className="flex flex-col flex-1 p-6 pt-6">
              <div className="flex flex-wrap gap-2 mb-4">
                {categoryLabel && (
                  <BasicChip text="Sponsor" variant="secondary" />
                )}
                {typeLabel && <BasicChip text={typeLabel} variant="default" />}
              </div>

              {displayName && (
                <h3 className="text-xl font-semibold text-accent-base mb-3">
                  {displayName}
                </h3>
              )}

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
        )}
      </div>
    </SectionBlock>
  );
}
