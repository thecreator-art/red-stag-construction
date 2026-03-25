import type { Metadata } from 'next';

import { ContactForm } from '@/components/forms/ContactForm';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ParallaxHero } from '@/components/ui/ParallaxHero';

export const metadata: Metadata = {
  title: 'Agent Partner Program | Red Stag Construction',
  description:
    'Partner with Red Stag Construction for pre-listing renovation, permit-pulled updates, and fast project turnaround across Los Angeles.',
};

const introParagraphs = [
  `Real estate agents do not need a contractor who wants to turn every listing into a year-long custom project. They need a builder who understands timing, disclosure, buyer psychology, and the difference between work that raises the final number and work that just burns calendar. That is the reason Red Stag partners with agents across Los Angeles before a listing hits the market. We help identify which updates will actually move the sale price, which repairs need to be documented properly, and how to get the house into showing condition without losing the listing window.`,
  `That planning matters because pre-listing renovation is not generic remodeling. In Encino, a $50,000 kitchen update can easily turn into an $80,000 to $120,000 swing in buyer perception and final value if the scope is chosen correctly. In Sherman Oaks, a bathroom refresh can change the buyer pool because families comparing similar homes immediately read the house as more complete, more current, and less likely to require immediate post-close work. But those returns only show up when the renovation is controlled. If the contractor misses the timeline, leaves a punch list, or creates permit questions that surface during escrow, the agent loses the advantage the project was supposed to create.`,
  `We approach pre-listing work with the same discipline we bring to larger design-build projects, but the priorities are different. Speed matters. Clean disclosure matters. Scope selection matters. A light kitchen update, new flooring, paint, exterior cleanup, window replacement, bath refresh, or selective hardscape package can make a property read much stronger online and in person, but only if the work is tied to the market around that address. We help agents decide where money should go first so the property competes harder without overbuilding for the neighborhood.`,
];

const packageParagraphs = [
  `Our pre-listing renovation packages are designed for fast turnover. Most agent-driven scopes are completed in four to eight weeks depending on permits, procurement, and the amount of hidden repair work inside the house. We keep the scope tight, schedule the trades aggressively, and push the finish line toward staging readiness instead of treating the job like an open-ended homeowner remodel. That difference is what allows an agent to build a listing strategy around the work instead of crossing their fingers and hoping the contractor hits the date.`,
  `Permit-pulled work matters here. Buyers, listing agents, and escrow teams all get nervous when a renovation looks new but the paperwork is vague. We handle the work cleanly so it shows up the right way on disclosure and does not create last-minute questions that shrink buyer confidence. If the project needs electrical work, plumbing relocation, structural repair, window replacement, or any other permit-sensitive upgrade, we build that path into the schedule from the start. It is better to be honest and organized than fast and sloppy.`,
  `The finish package is equally important. We focus on staging-ready results that photograph well, feel current in person, and hold up under inspection. That does not mean overdesigning the house. It means knowing which countertop, paint color, flooring decision, hardware package, lighting swap, and curb-appeal move actually helps the sale in that neighborhood. The goal is not to make the house look expensive for one weekend. The goal is to make the buyer feel like the hard work has already been done.`,
];

const relationshipParagraphs = [
  `Agents who refer Red Stag get priority scheduling and a dedicated project liaison because the listing timeline is rarely flexible. Once the decision is made to improve a property, the work needs to move with the urgency of a live deal. We coordinate the estimate, scope alignment, field schedule, and closeout around that reality so the agent is not trying to manage trade sequencing between showings, open house prep, and seller expectations.`,
  `The relationship also works because we understand the agent&apos;s risk. If the contractor misses the date, the agent looks disorganized. If the scope is wrong, the seller questions the recommendation. If the quality is weak, buyers feel it immediately. Our job is to protect the referral by making the process look controlled, the site look professional, and the finished product look worth the investment. That is why agents keep calling us in before the listing strategy is fully locked. They want a contractor who can move quickly without creating cleanup work later.`,
];

export default function ForRealEstateAgentsPage() {
  return (
    <>
      <section className="border-b border-gray-200 bg-warm-white py-4">
        <div className="container mx-auto px-4">
          <Breadcrumbs
            crumbs={[
              { label: 'Home', href: '/' },
              { label: 'Partners', href: '/for-real-estate-agents' },
              { label: 'For Real Estate Agents', href: '/for-real-estate-agents' },
            ]}
          />
        </div>
      </section>
      <ParallaxHero
        imageSrc="/images/hero/hero-main.jpg"
        imageAlt="Real estate agent walking a pre-listing renovation with contractor"
        h1Text="Turn Any Property Into a Premium Listing"
        h2Text="We help Los Angeles agents use pre-listing renovation to lift buyer confidence, strengthen the sale price, and get properties market-ready on a real timeline."
        ctaText="Request a Walkthrough"
        ctaHref="#partner-form"
        phoneNumber="(626) 652-2303"
      />

      <section className="bg-white py-20 md:py-24">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="mb-10 flex items-center gap-4">
            <span className="h-0.5 w-14 bg-accent-red"></span>
            <h2 className="text-3xl font-serif font-bold text-text-dark md:text-4xl">
              Why agents call us before the listing goes live
            </h2>
          </div>
          <div className="space-y-8 text-lg leading-8 text-text-body">
            {introParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-warm-white py-20 md:py-24">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="mb-10 flex items-center gap-4">
            <span className="h-0.5 w-14 bg-accent-red"></span>
            <h2 className="text-3xl font-serif font-bold text-text-dark md:text-4xl">
              How our pre-listing renovation packages work
            </h2>
          </div>
          <div className="space-y-8 text-lg leading-8 text-text-body">
            {packageParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-24">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="mb-10 flex items-center gap-4">
            <span className="h-0.5 w-14 bg-accent-red"></span>
            <h2 className="text-3xl font-serif font-bold text-text-dark md:text-4xl">
              What the referral relationship looks like
            </h2>
          </div>
          <div className="space-y-8 text-lg leading-8 text-text-body">
            {relationshipParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section id="partner-form" className="bg-navy-deep py-20 md:py-24">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-serif font-bold text-white md:text-4xl">
              Bring us into the next listing before the seller commits to the wrong scope.
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/80">
              Send the property details, timing, and sale goals here. We will review the likely return drivers, the permit risk, and the fastest practical path to a staging-ready finish.
            </p>
          </div>
          <div className="mt-12 bg-white p-8 md:p-12">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
