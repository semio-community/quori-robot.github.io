import type { FC } from "react";
import type { ImageLike } from "@/utils/images";
import { ItemCard } from "@/components/cards/ItemCard";

type HardwareCardData = {
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
  };
  images?: {
    logo?: ImageLike;
    hero?: ImageLike;
    logoUrl?: string;
  };
};

export interface HardwareCardProps {
  hardwareId: string;
  data: HardwareCardData;
  className?: string;
}

export const HardwareCard: FC<HardwareCardProps> = ({
  hardwareId,
  data,
  className: _className,
}) => {
  const categoryLabel = data.category
    ? data.category.charAt(0).toUpperCase() + data.category.slice(1)
    : "";

  return (
    <ItemCard
      title={data.name || hardwareId}
      description={data.shortDescription || data.description}
      href={`/hardware/${hardwareId}`}
      type="hardware"
      image={data.images?.hero}
      imageAlt={data.name}
      status={data.status}
      category={categoryLabel}
      featuredState={data.featured ? "featured" : "not-featured"}
      links={{
        website: data.links?.website,
        github: data.links?.github || data.links?.code,
        docs: data.links?.documentation,
        demo: data.links?.demo,
      }}
    />
  );
};
