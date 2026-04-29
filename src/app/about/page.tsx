import { ParallaxHero } from "@/components/ui/ParallaxHero";
import { TrustBadge } from "@/components/ui/TrustBadge";
import Image from "next/image";

export const metadata = {
  title: "About Red Stag | Los Angeles General Contractor",
  description:
    "Meet Red Stag Construction, a Los Angeles general contractor building custom homes, ADUs, remodels, and additions across Greater LA.",
  alternates: {
    canonical: 'https://redstagcc.com/about',
  },
};

export default function About() {
  return (
    <>
      <ParallaxHero 
        imageSrc="/images/hero/hero-main.jpg" 
        imageAlt="Red Stag Construction Company Team Los Angeles"
        h1Text="About Red Stag Construction — Licensed General Contractor in Los Angeles"
        h2Text="The team behind Los Angeles most demanding construction projects."
        ctaText="Get a Free Estimate"
        ctaHref="/contact"
        phoneNumber="(626) 652-2303"
      />
      
      <TrustBadge />

      <section className="bg-warm-white py-24">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-text-dark mb-8">The Team Behind Your Project</h2>
          <p className="text-lg text-text-body mb-16 leading-relaxed">
            Red Stag was founded in 2011 around a simple standard: the builder who takes your call should still be accountable when the plans are stamped, the permits are issued, and the finish work is being checked at the very end. Our leadership team brings that accountability to every custom home, ADU, addition, and full-scale remodel we take on in Los Angeles.
          </p>
          <p className="mx-auto mb-16 max-w-3xl text-base leading-8 text-text-body md:text-lg">
            Elisa T. Aquino leads the company as CEO, Israel Aquino serves as Principal Contractor, Anthony Torsarkissian keeps operations and business development moving, and Zack Ward drives the early-stage conversations that turn rough goals into scoped projects. Together they cover the full timeline from first meeting to final closeout.
          </p>
          </div>

          <div className="grid grid-cols-1 gap-10 text-left md:grid-cols-2 lg:grid-cols-4">
            <div className="group overflow-hidden border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="relative h-72 w-full md:h-80">
                <Image src="/images/team/elisa.jpg" alt="Elisa T. Aquino — CEO" fill sizes="(max-width: 768px) 100vw, 33vw" priority className="object-cover object-[50%_15%] filter grayscale transition-all duration-500 group-hover:grayscale-0" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-text-dark mb-1">Elisa T. Aquino</h3>
                <p className="text-sm font-bold text-accent-red uppercase tracking-wide mb-4">CEO</p>
                <p className="text-text-body text-sm leading-relaxed">
                  Elisa oversees the strategic direction and operations of Red Stag Construction. Her leadership ensures that the company consistently delivers high-quality results while maintaining strong, transparent relationships with clients and partners.
                </p>
                <div className="mt-6 space-y-4 border-t border-gray-100 pt-5 text-sm leading-6 text-text-body">
                  <div>
                    <p className="font-bold uppercase tracking-[0.16em] text-accent-red">Leadership</p>
                    <p>Guides the overarching strategy and ensures Red Stag&apos;s standards of excellence are met on every project.</p>
                  </div>
                  <div>
                    <p className="font-bold uppercase tracking-[0.16em] text-accent-red">Operations</p>
                    <p>Manages the high-level operations that keep the company running smoothly behind the scenes.</p>
                  </div>
                  <div>
                    <p className="font-bold uppercase tracking-[0.16em] text-accent-red">Client Focus</p>
                    <p>Dedicated to fostering strong client relationships and maintaining the company&apos;s reputation for integrity.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="group overflow-hidden border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="relative h-72 w-full md:h-80">
                <Image src="/images/team/israel.jpg" alt="Israel Aquino — Founder and General Contractor" fill sizes="(max-width: 768px) 100vw, 33vw" priority className="object-cover object-top filter grayscale transition-all duration-500 group-hover:grayscale-0" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-text-dark mb-1">Israel Aquino</h3>
                <p className="text-sm font-bold text-accent-red uppercase tracking-wide mb-4">Principal Contractor</p>
                <p className="text-text-body text-sm leading-relaxed">
                  Israel founded Red Stag in 2011 and has spent the last 15 years building a reputation around direct accountability. He is the principal contractor clients trust when a project has real complexity, whether that means coordinating architects, solving structural issues early, or managing a high-end build with no room for sloppy execution.
                </p>
                <div className="mt-6 space-y-4 border-t border-gray-100 pt-5 text-sm leading-6 text-text-body">
                  <div>
                    <p className="font-bold uppercase tracking-[0.16em] text-accent-red">2011</p>
                    <p>Licensed in California and launched Red Stag Construction as a design-build general contractor serving Los Angeles.</p>
                  </div>
                  <div>
                    <p className="font-bold uppercase tracking-[0.16em] text-accent-red">2011-Present</p>
                    <p>Has led projects of every size, from selective remodel scopes to full-property construction work with existing architect relationships already in place.</p>
                  </div>
                  <div>
                    <p className="font-bold uppercase tracking-[0.16em] text-accent-red">Today</p>
                    <p>Still sets the standard for how Red Stag communicates, scopes, and closes out jobs. <a href="mailto:israel@redstagcc.com" className="font-semibold text-accent-red underline decoration-accent-red underline-offset-4">israel@redstagcc.com</a></p>
                  </div>
                </div>
              </div>
            </div>

            <div className="group overflow-hidden border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="relative h-72 w-full md:h-80">
                <Image src="/images/team/anthony.jpg" alt="Anthony Torsarkissian — COO" fill sizes="(max-width: 768px) 100vw, 33vw" priority className="object-cover object-top filter grayscale transition-all duration-500 group-hover:grayscale-0" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-text-dark mb-1">Anthony Torsarkissian</h3>
                <p className="text-sm font-bold text-accent-red uppercase tracking-wide mb-4">COO & Prime Contractor</p>
                <p className="text-text-body text-sm leading-relaxed">
                  Anthony joined Red Stag in 2022 and brought with him the instincts of someone who was mentored early inside a family-run construction business. He now runs the operational and business-development side of the company, making sure the back end of the job is as disciplined as what the client sees in the field.
                </p>
                <div className="mt-6 space-y-4 border-t border-gray-100 pt-5 text-sm leading-6 text-text-body">
                  <div>
                    <p className="font-bold uppercase tracking-[0.16em] text-accent-red">Early Foundation</p>
                    <p>Learned construction management in a family business environment where schedules, crews, and budgets had to be controlled from day one.</p>
                  </div>
                  <div>
                    <p className="font-bold uppercase tracking-[0.16em] text-accent-red">2022</p>
                    <p>Joined Red Stag as COO and prime contractor, expanding the company&apos;s operational depth and business development capacity.</p>
                  </div>
                  <div>
                    <p className="font-bold uppercase tracking-[0.16em] text-accent-red">Current Role</p>
                    <p>Oversees systems, growth, and execution standards so projects keep moving without losing control of schedule or communication.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="group overflow-hidden border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="relative h-72 w-full md:h-80">
                <Image src="/images/team/zack.jpg" alt="Zack Ward — Head of Project Development" fill sizes="(max-width: 768px) 100vw, 33vw" priority className="object-cover object-top filter grayscale transition-all duration-500 group-hover:grayscale-0" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-text-dark mb-1">Zack Ward</h3>
                <p className="text-sm font-bold text-accent-red uppercase tracking-wide mb-4">Head of Project Development</p>
                <p className="text-text-body text-sm leading-relaxed">
                  Zack leads client engagement and project development, helping homeowners, investors, and referral partners turn first conversations into clearly defined next steps. He is also the point person for much of Red Stag&apos;s outreach to real estate agents and strategic partners.
                </p>
                <div className="mt-6 space-y-4 border-t border-gray-100 pt-5 text-sm leading-6 text-text-body">
                  <div>
                    <p className="font-bold uppercase tracking-[0.16em] text-accent-red">First Contact</p>
                    <p>Guides early discovery calls, initial scope conversations, and project fit so clients know quickly what path makes sense.</p>
                  </div>
                  <div>
                    <p className="font-bold uppercase tracking-[0.16em] text-accent-red">Project Development</p>
                    <p>Works with the team to shape the early brief, align expectations, and keep communication clear before the project moves into production.</p>
                  </div>
                  <div>
                    <p className="font-bold uppercase tracking-[0.16em] text-accent-red">Partner Outreach</p>
                    <p>Supports referral relationships, including real estate agent outreach, so Red Stag stays connected to high-value opportunities across LA.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
