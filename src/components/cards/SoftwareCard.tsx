import type { FC } from "react";
import { ItemCard } from "@/components/cards/ItemCard";
import { resolveLogoAsset, type ImageLike } from "@/utils/images";

type SoftwareCardData = {
  name?: string;
  description?: string;
  shortDescription?: string;
  category?: string;
  status?: string;
  featured?: boolean;
  links?: {
    website?: string;
    github?: string;
    code?: string;
    documentation?: string;
    demo?: string;
    pypi?: string;
    npm?: string;
  };
  images?: {
    logo?: ImageLike;
    hero?: ImageLike;
    logoUrl?: string;
  };
};

export interface SoftwareCardProps {
  softwareId: string;
  data: SoftwareCardData;
  className?: string;
}

export const SoftwareCard: FC<SoftwareCardProps> = ({
  softwareId,
  data,
  className: _className,
}) => {
  const categoryLabel = data.category
    ? data.category.charAt(0).toUpperCase() + data.category.slice(1)
    : "";
  const logoSource = resolveLogoAsset(data.images);

  return (
    <ItemCard
      title={data.name || softwareId}
      description={data.shortDescription || data.description}
      href={`/software/${softwareId}`}
      type="software"
      image={data.images?.hero}
      imageAlt={data.name}
      logo={logoSource}
      status={data.status}
      category={categoryLabel}
      featuredState={data.featured ? "featured" : "not-featured"}
      links={{
        website: data.links?.website,
        github: data.links?.github || data.links?.code,
        docs: data.links?.documentation,
        demo: data.links?.demo,
        pypi: data.links?.pypi,
        npm: data.links?.npm,
      }}
    />
  );
};
