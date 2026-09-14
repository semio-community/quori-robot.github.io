import ConnectSection from "@/react-pages/home/sections/ConnectSection";
import { EventsPage as SharedEventsPage } from "@semio-community/ecosystem-site-core";
import { Calendar } from "@solar-icons/react-perf/LineDuotone";
import type React from "react";

export type { EventsPageProps } from "@semio-community/ecosystem-site-core";

const footerSection = <ConnectSection />;

export default function EventsPage({ children }: { children?: React.ReactNode }) {
	return (
		<SharedEventsPage
			title="Events"
			description="Gather with the Semio Community at conferences, workshops, and training events focused on human-centered robotics and AI."
			heroIcon={<Calendar className="w-16 h-16 text-accent-two" />}
			footerSection={footerSection}
		>
			{children}
		</SharedEventsPage>
	);
}
