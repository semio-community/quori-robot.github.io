import HeroHeader from "@/components/hero/HeroHeader";
import Section from "@/components/sections/Section";
import { CallToActionButton } from "@/components/ui/CallToActionButton";
import {
  Letter,
  CalendarMark,
  TestTube,
  UsersGroupTwoRounded,
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
          {
            label: "Join the Mailing List",
            href: "#mailing-list",
            variant: "tertiary",
          },
        ]}
      />

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
