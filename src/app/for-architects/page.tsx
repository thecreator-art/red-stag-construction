import type { Metadata } from 'next';

import { ContactForm } from '@/components/forms/ContactForm';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ParallaxHero } from '@/components/ui/ParallaxHero';

export const metadata: Metadata = {
  title: 'Architect Partner Program | Red Stag Construction',
  description:
    'Partner with Red Stag Construction for permit-ready execution, disciplined OAC coordination, and design-build delivery across Los Angeles.',
};

const introParagraphs = [
  `Architects do not need another contractor who says yes in the meeting and then spends the next six months calling with problems. They need a general contractor who reads the structural set, understands the specification book, and can tell the difference between a drafting issue and a field issue before either one turns into a change order. That is where Red Stag fits. We work with architects across Los Angeles who need a builder that can carry a drawn concept through pricing, permits, procurement, field supervision, inspections, and closeout without diluting the intent on the page. We do not just read finish schedules. We read framing plans, shear details, steel callouts, waterproofing assemblies, drainage notes, and consultant comments because those are the details that decide whether the design holds together once crews start building it.`,
  `That matters in Los Angeles because architecture here is rarely being built on a simple flat lot with a generic city review path. A project may be running through LADBS, an independent city building department like Beverly Hills or Santa Monica, or a review track shaped by hillside conditions, HOA oversight, geology, or access limitations. If those realities are not addressed early, the architect ends up babysitting construction instead of designing. We take that pressure off by doing the preconstruction work the right way. We flag constructability issues before they become field delays, pressure-test consultant coordination before submittal, and manage permit packages so the architect is not spending valuable hours chasing a builder who should have prepared the file in the first place.`,
  `Our role in the partnership is simple. Protect the design. Tell the truth about what the site, the permit desk, and the budget will support. Then build it cleanly. That means showing up to OAC meetings prepared, answering RFIs in a disciplined way, documenting site conditions clearly, and bringing solutions instead of drama. If a detail needs adjustment because of a real field conflict, we explain the issue plainly and propose a buildable path that respects the architecture instead of making a convenience decision on site. That approach keeps the architect in control of the design while keeping the project moving at a pace the client can trust.`,
];

const valueParagraphs = [
  `Architects who work with us get a contractor who understands that coordination is part of the build, not a side task. We come into meetings having reviewed the current set, consultant notes, permit comments, and procurement constraints so the conversation can stay focused on decisions instead of recaps. When a drawing package has a mismatch between structural intent and field sequencing, we surface it early. When a detail needs more information, we issue the question clearly. When the answer affects schedule or cost, we explain the impact in direct terms so the architect can advise the client from a position of control rather than reacting after the fact.`,
  `We also understand the part that architects should not have to manage themselves. Permit runs through LADBS and independent city departments can eat time fast if the contractor is not organized. Submittals, correction responses, consultant coordination, and revision tracking are all handled on our side so the architect is not acting like an unpaid project expediter. In the field, we maintain the same standard. We document conditions, protect finished work, and keep the trades aligned so the architect is not getting calls about preventable site chaos. That consistency is what keeps the professional relationship healthy. The architect stays focused on design leadership. We stay accountable for building it correctly.`,
  `The referral relationship is equally straightforward. We do not pay a formal referral fee because that usually distorts incentives and muddies the client relationship. What we do instead is protect the architect by making sure the client gets exactly what was promised in the design conversation. If the architect brings us into a project, we treat that trust seriously. We do not try to rewrite the scope around our convenience, we do not bypass the architect on design decisions, and we do not create site confusion that reflects back on the design team. Our job is to make the architect look well represented in front of the client by executing the work the way it was meant to be executed.`,
];

const workingStyleParagraphs = [
  `Most architects who call us are looking for one of three things. They need a builder who can take over the heavy lifting once the design is ready for permitting. They need a contractor who can join earlier and help price real constructability before the set is locked. Or they need a design-build team that can pull the whole process together under one agreement without losing the discipline an architect expects. We can support all three, but the standard stays the same in each case: direct answers, disciplined communication, and a job site that does not embarrass the design team.`,
  `That is why we keep our process practical. We review the set, confirm what additional consultant input is needed, map the likely permit path, align procurement to the schedule, and establish how RFIs, submittals, and design clarifications will be handled before the project gets busy. Once construction starts, the field team is expected to build to the documents, respect design intent, and escalate real conflicts early. That sounds basic, but in Los Angeles it is the difference between an architect who can trust the builder and an architect who has to keep one eye on every site walk because nobody is sure what will have changed since the last meeting.`,
];

export default function ForArchitectsPage() {
  return (
    <>
      <section className="border-b border-gray-200 bg-warm-white py-4">
        <div className="container mx-auto px-4">
          <Breadcrumbs
            crumbs={[
              { label: 'Home', href: '/' },
              { label: 'Partners', href: '/for-architects' },
              { label: 'For Architects', href: '/for-architects' },
            ]}
          />
        </div>
      </section>
      <ParallaxHero
        imageSrc="/images/hero/hero-main.jpg"
        imageAlt="Architect reviewing residential construction drawings with builder"
        h1Text="Partner With a General Contractor Who Executes Your Vision"
        h2Text="We read structural drawings, flag constructability issues early, and manage permits through LADBS and independent city departments so architects do not have to babysit the build."
        ctaText="Start the Conversation"
        ctaHref="#partner-form"
        phoneNumber="(626) 652-2303"
      />

      <section className="bg-white py-20 md:py-24">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="mb-10 flex items-center gap-4">
            <span className="h-0.5 w-14 bg-accent-red"></span>
            <h2 className="text-3xl font-serif font-bold text-text-dark md:text-4xl">
              Why architects bring Red Stag in early
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
              What architects get from the relationship
            </h2>
          </div>
          <div className="space-y-8 text-lg leading-8 text-text-body">
            {valueParagraphs.map((paragraph) => (
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
              How we work once the project is live
            </h2>
          </div>
          <div className="space-y-8 text-lg leading-8 text-text-body">
            {workingStyleParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section id="partner-form" className="bg-navy-deep py-20 md:py-24">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-serif font-bold text-white md:text-4xl">
              Let&apos;s talk through your next set before it reaches the field.
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/80">
              If you need a Los Angeles builder who can carry the plans through permits and construction without losing the design, send the project details here. We will review the scope and come back with a direct next step.
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
