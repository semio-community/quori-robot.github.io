import {
	CallToActionButton,
	ConnectSection as SharedConnectSection,
} from "@semio-community/ecosystem-site-core";
import type { ConnectSectionProps } from "@semio-community/ecosystem-site-core";
import React from "react";

export type { ConnectSectionProps };

export default function ConnectSection(props: ConnectSectionProps) {
	return (
		<SharedConnectSection sectionVariant="tertiary" {...props}>
			<CallToActionButton
				href="https://donate.semio.community/b/00w3cv77McUD6Ob2A7a7C01"
				size="large"
				variant="primary"
				rel="noopener noreferrer"
				target="_blank"
				fullWidth
				ariaLabel="Make a donation"
			>
				Make a Donation
			</CallToActionButton>
			<CallToActionButton
				href="mailto:info@semio.ai"
				size="large"
				variant="secondary"
				fullWidth
				ariaLabel="Email info@semio.ai"
			>
				Contact Us
			</CallToActionButton>
			<CallToActionButton
				href="https://forms.gle/RaU4n2BHMzENj94f8"
				size="large"
				variant="tertiary"
				rel="noopener noreferrer"
				target="_blank"
				fullWidth
				ariaLabel="Join the Quori mailing list"
			>
				Join the Mailing List
			</CallToActionButton>
		</SharedConnectSection>
	);
}
