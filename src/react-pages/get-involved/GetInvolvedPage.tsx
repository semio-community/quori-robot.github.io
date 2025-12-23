import HeroHeader from "@/components/hero/HeroHeader";
import Section from "@/components/sections/Section";
import { CallToActionButton } from "@/components/ui/CallToActionButton";
import {
  Letter,
  CalendarMark,
  TestTube,
  UsersGroupTwoRounded,
  HandMoney,
  Gift,
  Buildings2,
  Target,
  Eye,
  ShieldCheck,
} from "@solar-icons/react-perf/LineDuotone";
import { UserPlusRounded } from "@solar-icons/react-perf/LineDuotone";

export default function GetInvolvedPage() {
  return (
    <>
      <HeroHeader
        fullBleed
        icon={<UserPlusRounded className="w-16 h-16 text-accent-three" />}
        title="Get Involved"
        description={
          <>
            Be part of a global community advancing human-centered robotics and
            AI. Your support helps us foster reproducible science and develop
            reusable systems for human-robot interaction.
          </>
        }
        actions={[
          { label: "Make a Donation", href: "#donate" },
          {
            label: "Join the Mailing List",
            href: "#mailing-list",
            variant: "tertiary",
          },
        ]}
      />

      {/* Donate Section */}
      <Section
        id="donate"
        title="Support Quori Development"
        subtitle="Your donations enable us to advance open science in robotics"
      >
        <div className="max-w-5xl mx-auto">
          <div className="bg-linear-to-r from-accent-one/10 to-accent-two/10 rounded-lg p-8 border border-accent-two/20 mb-8 backdrop-blur-lg">
            <h3 className="text-2xl font-semibold mb-4 text-center text-accent-base">
              Why Your Support Matters
            </h3>
            <p className="text-center mb-6 text-color-600 dark:text-color-400">
              We want to make the best possible hardware and software stack for
              robotics research, while maintaining a low pricepoint that is
              accessible for everyone. Your donations help us achieve this goal
              by funding research, development, and outreach efforts.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <ShieldCheck className="w-12 h-12 mx-auto mb-3 text-accent-two" />
                <h4 className="font-semibold mb-2">Tax Deductible</h4>
                <p className="text-sm text-color-600 dark:text-color-400">
                  All donations are tax-deductible to the fullest extent of the
                  law
                </p>
              </div>
              <div className="text-center">
                <Eye className="w-12 h-12 mx-auto mb-3 text-accent-two" />
                <h4 className="font-semibold mb-2">Transparent</h4>
                <p className="text-sm text-color-600 dark:text-color-400">
                  Annual reports show exactly how your donations are used
                </p>
              </div>
              <div className="text-center">
                <Target className="w-12 h-12 mx-auto mb-3 text-accent-two" />
                <h4 className="font-semibold mb-2">Impactful</h4>
                <p className="text-sm text-color-600 dark:text-color-400">
                  100% of donations directly support the Quori project and
                  community
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="flex gap-4 justify-center">
                <CallToActionButton
                  href="https://donate.stripe.com/cNiaEX4ZE07R8Wj8Yva7C00"
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
          </div>

          <div className="bg-surface rounded-lg p-6 border border-special">
            <h3 className="text-lg font-semibold mb-4 text-center">
              Other Ways to Give
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <Buildings2 className="w-10 h-10 mx-auto mb-3 text-accent-two" />
                <h4 className="font-semibold mb-2">Corporate Sponsorship</h4>
                <p className="text-sm text-color-600 dark:text-color-400">
                  Partner with us through corporate giving programs
                </p>
              </div>
              <div>
                <Gift className="w-10 h-10 mx-auto mb-3 text-accent-two" />
                <h4 className="font-semibold mb-2">In-Kind Donations</h4>
                <p className="text-sm text-color-600 dark:text-color-400">
                  Donate equipment, software licenses, or services
                </p>
              </div>
              <div>
                <HandMoney className="w-10 h-10 mx-auto mb-3 text-accent-two" />
                <h4 className="font-semibold mb-2">Planned Giving</h4>
                <p className="text-sm text-color-600 dark:text-color-400">
                  Include the Quori project in your estate planning
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Mailing List Section */}
      <Section
        id="mailing-list"
        title="Join Our Mailing List"
        subtitle="Stay connected with the latest news, events, and opportunities"
        variant="tertiary"
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-special-lighter rounded-lg p-8 border border-special backdrop-blur-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  What You'll Receive:
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Letter className="w-5 h-5 text-accent-three shrink-0 mt-0.5" />
                    <span className="text-sm">
                      Regular newsletter with community updates
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CalendarMark className="w-5 h-5 text-accent-three shrink-0 mt-0.5" />
                    <span className="text-sm">
                      Early announcements for events and workshops
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <TestTube className="w-5 h-5 text-accent-three shrink-0 mt-0.5" />
                    <span className="text-sm">
                      Research highlights and findings
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <UsersGroupTwoRounded className="w-5 h-5 text-accent-three shrink-0 mt-0.5" />
                    <span className="text-sm">
                      Volunteer and collaboration opportunities
                    </span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Sign Up:</h3>
                <CallToActionButton
                  size="large"
                  variant="tertiary"
                  fullWidth
                  href="https://forms.gle/RaU4n2BHMzENj94f8"
                >
                  Connect with Us
                </CallToActionButton>
              </div>
            </div>

            <div className="text-center text-sm text-color-600 dark:text-color-400">
              <p>
                We respect your privacy and never share your information with
                third parties.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
