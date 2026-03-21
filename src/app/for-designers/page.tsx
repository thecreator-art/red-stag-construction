import type { Metadata } from 'next';

import { ContactForm } from '@/components/forms/ContactForm';
import { ParallaxHero } from '@/components/ui/ParallaxHero';

export const metadata: Metadata = {
  title: 'Designer Partner Program | Red Stag Construction',
  description:
    'Work with Red Stag Construction to protect design intent, manage lead times, and execute premium interior specifications across Los Angeles.',
};

const introParagraphs = [
  `Interior designers do not need a contractor who starts substituting materials the moment procurement gets difficult. They need a builder who respects the specification, understands what the client bought, and knows that finish execution is where the trust is either protected or lost. That is the standard Red Stag brings to designer partnerships. We work with Los Angeles designers who need a general contractor that can execute the interior vision exactly, not approximately. If the design calls for a specific slab, tile run, plumbing trim, cabinet finish, reveal detail, or appliance package, we plan around that requirement instead of trying to talk the job back toward whatever is easiest for the field.`,
  `That discipline starts well before installation. We review finish schedules, cabinetry plans, millwork details, appliance requirements, slab lead times, and site sequencing before demolition begins. A lot of frustration between designers and contractors comes from late ordering and vague scope. The designer has done the hard work of making the house feel intentional, then the contractor shows up without a procurement plan and suddenly the schedule is being rebuilt around stock substitutes, rushed deliveries, or field decisions nobody approved. We do the opposite. We want the tile, plumbing, stone, hardware, and specialty items ordered on a timeline that protects the design from avoidable compromise.`,
  `We also know that protecting design intent is not just about materials. It is about decision control. If a field condition comes up, we do not let the trades improvise their own answer because the owner is not home and the designer is not on site that hour. We stop, document the issue, and bring it back through the right channel. That keeps the designer in control of the interior language of the house while still letting the project move with real construction discipline.`,
];

const designerValueParagraphs = [
  `Designers who partner with Red Stag get a contractor who understands that the finished result reflects on them directly. If the tile layout is off, if the cabinet filler looks forced, if the stone seam lands in the wrong spot, or if the hardware alignment drifts, the client does not separate those failures into “design problem” and “construction problem.” They just see a room that missed. We take that responsibility seriously. Our field team coordinates shop drawings, approvals, site conditions, and installation sequencing to reduce those misses before they happen.`,
  `Lead times are another place where designers get hurt by weak contractors. In Los Angeles, imported stone, custom cabinetry, plumbing trim, specialty lighting, and made-to-order hardware can push the schedule hard if no one is watching the order path closely. We treat procurement as part of construction management, not a shopping list. Materials that decide the schedule get ordered before demolition when possible, and we communicate clearly about what is locked, what is pending, and what substitution risk exists so the designer is never blindsided by a field team acting like the long-lead issue appeared out of nowhere.`,
  `The real value of the relationship is that we make designers look well represented to their clients. We source the tile that was specified instead of swapping in a cheaper line. We do not make on-site aesthetic decisions without approval. We understand that protecting the designer&apos;s intent is part of protecting the entire project. When a client sees the room come together exactly the way it was presented, that trust stays intact. That is the outcome designers need, and it is the outcome we build toward.`,
];

const processParagraphs = [
  `The designers who work best with us usually want one contractor who can handle the practical side of premium interiors without constant supervision. They want shop drawings reviewed properly, finish protection taken seriously, punch handled tightly, and site communication organized enough that they can focus on client service instead of field cleanup. That is how we run. We do not need the designer chasing us for updates or trying to decode what the trades changed while nobody was looking.`,
  `Our process is direct. We review the design package, confirm what needs to be ordered and when, line up the site sequence around those lead times, and keep approval points clear so nothing is installed on assumptions. If a designer is coordinating with a homeowner who travels often, a high-profile client who expects discretion, or a project with a tight turnover window, we adapt the field plan around that reality instead of treating it as an inconvenience. At the end of the day, the goal is simple: build the room the designer sold, at the quality level the client expects, without turning the construction process into a fight.`,
];

export default function ForDesignersPage() {
  return (
    <>
      <ParallaxHero
        imageSrc="/images/hero/hero-main.jpg"
        imageAlt="Designer reviewing finish samples on a high-end remodel"
        h1Text="A General Contractor Who Protects Your Design Intent"
        h2Text="We source the materials you specified, lock in lead times before demo starts, and do not make field decisions that alter the design without approval."
        ctaText="Start a Designer Partnership"
        ctaHref="#partner-form"
        phoneNumber="(626) 652-2303"
      />

      <section className="bg-warm-grey py-20 md:py-24">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="mb-10 flex items-center gap-4">
            <span className="h-0.5 w-14 bg-accent-red"></span>
            <h2 className="text-3xl font-serif font-bold text-text-dark md:text-4xl">
              Why designers bring us into the room
            </h2>
          </div>
          <div className="space-y-8 text-lg leading-8 text-text-body">
            {introParagraphs.map((paragraph) => (
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
              What designers get from Red Stag
            </h2>
          </div>
          <div className="space-y-8 text-lg leading-8 text-text-body">
            {designerValueParagraphs.map((paragraph) => (
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
              How the partnership works in practice
            </h2>
          </div>
          <div className="space-y-8 text-lg leading-8 text-text-body">
            {processParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section id="partner-form" className="bg-navy-deep py-20 md:py-24">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-serif font-bold text-white md:text-4xl">
              Send the scope and let&apos;s review it before the schedule gets tight.
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/80">
              If you need a Los Angeles contractor who will make you look good to your client instead of creating cleanup work, send the project information here. We will review the design intent, likely procurement pressure, and the best next step.
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
