import {
	CallToActionButton,
	MarketingPage,
	type MarketingPageContent,
} from "@semio-community/ecosystem-site-core";
import {
	Buildings2,
	CalendarMark,
	Eye,
	Gift,
	HandMoney,
	Letter,
	ShieldCheck,
	Target,
	TestTube,
	UserPlusRounded,
	UsersGroupTwoRounded,
} from "@solar-icons/react-perf/LineDuotone";

/**
 * Quori's Get Involved page content. Uses the shared `MarketingPage`
 * content-block engine; the bespoke donate CTA (a button row plus a
 * fiscal-sponsor disclaimer) is supplied via a `custom` block.
 */
const content: MarketingPageContent = {
	hero: {
		icon: <UserPlusRounded className="w-16 h-16 text-accent-three" />,
		title: "Get Involved",
		description: (
			<>
				Be part of a global community advancing human-centered robotics and AI.
				Your support helps us foster reproducible science and develop reusable
				systems for human-robot interaction.
			</>
		),
		actions: [
			{ label: "Make a Donation", href: "#donate" },
			{ label: "Join the Mailing List", href: "#mailing-list", variant: "tertiary" },
		],
	},
	sections: [
		{
			id: "donate",
			title: "Support Quori Development",
			subtitle: "Your donations enable us to advance open science in robotics",
			containerClassName: "max-w-5xl mx-auto",
			blocks: [
				{
					kind: "box",
					style: "highlight",
					className: "mb-8",
					children: [
						{
							kind: "heading",
							as: "h3",
							text: "Why Your Support Matters",
							className: "text-2xl font-semibold mb-4 text-center text-accent-base",
						},
						{
							kind: "prose",
							content:
								"We want to make the best possible hardware and software stack for robotics research, while maintaining a low pricepoint that is accessible for everyone. Your donations help us achieve this goal by funding research, development, and outreach efforts.",
						},
						{
							kind: "pillars",
							items: [
								{
									icon: ShieldCheck,
									title: "Tax Deductible",
									description:
										"All donations are tax-deductible to the fullest extent of the law",
								},
								{
									icon: Eye,
									title: "Transparent",
									description:
										"Annual reports show exactly how your donations are used",
								},
								{
									icon: Target,
									title: "Impactful",
									description:
										"100% of donations directly support the Quori project and community",
								},
							],
						},
						{
							kind: "custom",
							node: (
								<div className="text-center">
									<div className="flex gap-4 justify-center">
										<CallToActionButton
											href="https://donate.semio.community/b/00w3cv77McUD6Ob2A7a7C01"
											size="large"
										>
											Donate Now
										</CallToActionButton>

										<CallToActionButton
											href="mailto:info@semio.ai"
											size="large"
											variant="secondary"
											ariaLabel="Email info@semio.ai"
										>
											Contact Us
										</CallToActionButton>
									</div>
									<p className="text-sm text-color-600 dark:text-color-400 pt-3">
										Donations are handled through the managing entity and fiscal
										sponsor for Quori,
										<br />
										<a
											href="https://semio.community"
											className="text-accent-three hover:underline"
											target="_blank"
											rel="noopener noreferrer"
										>
											Semio Community
										</a>
										, a 501(c)(3) nonprofit organization.
									</p>
								</div>
							),
						},
					],
				},
				{
					kind: "box",
					style: "surface",
					children: [
						{ kind: "heading", as: "h3", text: "Other Ways to Give" },
						{
							kind: "pillars",
							compact: true,
							gridClassName: "grid grid-cols-1 md:grid-cols-3 gap-6 text-center",
							items: [
								{
									icon: Buildings2,
									title: "Corporate Sponsorship",
									description: "Partner with us through corporate giving programs",
								},
								{
									icon: Gift,
									title: "In-Kind Donations",
									description: "Donate equipment, software licenses, or services",
								},
								{
									icon: HandMoney,
									title: "Planned Giving",
									description: "Include the Quori project in your estate planning",
								},
							],
						},
					],
				},
			],
		},
		{
			id: "mailing-list",
			title: "Join Our Mailing List",
			subtitle: "Stay connected with the latest news, events, and opportunities",
			variant: "tertiary",
			containerClassName: "max-w-4xl mx-auto",
			blocks: [
				{
					kind: "box",
					style: "surfaceLighter",
					children: [
						{
							kind: "columns",
							columns: [
								[
									{
										kind: "heading",
										as: "h3",
										text: "What You'll Receive:",
										className: "text-lg font-semibold mb-4",
									},
									{
										kind: "iconList",
										items: [
											{ icon: Letter, text: "Regular newsletter with community updates" },
											{
												icon: CalendarMark,
												text: "Early announcements for events and workshops",
											},
											{ icon: TestTube, text: "Research highlights and findings" },
											{
												icon: UsersGroupTwoRounded,
												text: "Volunteer and collaboration opportunities",
											},
										],
									},
								],
								[
									{
										kind: "heading",
										as: "h3",
										text: "Sign Up:",
										className: "text-lg font-semibold mb-4",
									},
									{
										kind: "custom",
										node: (
											<CallToActionButton
												size="large"
												variant="tertiary"
												fullWidth
												href="https://forms.gle/RaU4n2BHMzENj94f8"
											>
												Connect with Us
											</CallToActionButton>
										),
									},
								],
							],
						},
						{
							kind: "custom",
							node: (
								<div className="text-center text-sm text-color-600 dark:text-color-400">
									<p>
										We respect your privacy and never share your information with
										third parties.
									</p>
								</div>
							),
						},
					],
				},
			],
		},
	],
};

export default function GetInvolvedPage() {
	return <MarketingPage content={content} baseUrl={import.meta.env.BASE_URL} />;
}
