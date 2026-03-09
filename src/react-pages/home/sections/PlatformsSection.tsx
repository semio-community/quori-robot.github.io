import SectionBlock from "@/components/sections/SectionBlock";
import {
	Calendar,
	Programming,
	SquareTransferHorizontal,
	ThreeSquares,
} from "@solar-icons/react-perf/LineDuotone";
import type React from "react";

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

export default function PlatformsSection({
	id = "platforms",
	title = "Our Platforms",
	subtitle = "The Quori platform offers social robot hardware and HRI software tools, a replication studies network, and community events.",
	ariaLabel,
	className,
	cardClassName,
	primaryCopy = (
		<>
			The platform combines modular Quori hardware, an HRI software stack, and community programming
			so teams can build, test, and compare results together.
		</>
	),
	features = [
		{
			title: "Quori robot hardware",
			description:
				"A reconfigurable social robot with modular components based on a standard hardware interface, and reference builds for varied research needs.",
			icon: <SquareTransferHorizontal className="w-12 h-12 mx-auto mb-3 text-accent-three" />,
		},
		{
			title: "HRI software tools",
			description:
				"Open-source software for low-level to high-level control and sensing; no-code tools for rapidly creating, deploying, and sharing functionality.",
			icon: <Programming className="w-12 h-12 mx-auto mb-3 text-accent-three" />,
		},
		{
			title: "Research studies network",
			description:
				"Coordinated studies and shared datasets to support replication efforts and benchmark results across sites to strengthen findings.",
			icon: <ThreeSquares className="w-12 h-12 mx-auto mb-3 text-accent-three" />,
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
							{typeof primaryCopy === "string" ? <p>{primaryCopy}</p> : primaryCopy}
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
									<p className="text-sm text-accent-base/50">{feature.description}</p>
								</div>
							))}
						</div>
					) : null}
				</div>
			</div>
		</SectionBlock>
	);
}
