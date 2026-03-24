import { ParallaxHero } from "@/components/ui/ParallaxHero";
import { TrustBadge } from "@/components/ui/TrustBadge";
import Image from "next/image";

export const metadata = {
  title: "About Red Stag Construction | Licensed LA General Contractor",
  description: "Red Stag Construction team: Built on Craft. Driven by Accountability. Learn about our leadership: Israel Aquino, Anthony Torsarkissian, and Zack Ward.",
};

export default function About() {
  return (
    <>
      <ParallaxHero 
        imageSrc="/images/team/red-stag-construction-team-job-site-01.jpg" 
        imageAlt="Red Stag Construction Company Team Los Angeles"
        h1Text="Built on Craft. Driven by Accountability."
        h2Text="The team behind Los Angeles most demanding construction projects."
        ctaText="Get a Free Estimate"
        ctaHref="/contact"
        phoneNumber="(626) 652-2303"
      />
      
      <TrustBadge />

      <section className="py-24 bg-warm-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-text-dark mb-8">The Team Behind Your Project</h2>
          <p className="text-lg text-text-body mb-16 leading-relaxed">
            Every project leaves Red Stag with the same attention to detail we would demand in our own home. Our leadership team brings decades of combined experience across the construction trade, engineering, and project development.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
            <div className="bg-white border border-gray-200 overflow-hidden shadow-sm">
              <div className="relative h-80 w-full">
                <Image src="/images/team/israel.jpg" alt="Israel Aquino — Founder and General Contractor" fill sizes="33vw" priority className="object-cover object-top filter grayscale" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-text-dark mb-1">Israel Aquino</h3>
                <p className="text-sm font-bold text-accent-red uppercase tracking-wide mb-4">Founder, CEO & Prime Contractor</p>
                <p className="text-text-body text-sm leading-relaxed">
                  Israel grew up in the construction trade and brought that foundation to Los Angeles, where he became a licensed California contractor and founded Red Stag in 2011. His standard has never changed: every project leaves Red Stag with the same attention to detail he would demand in his own home.
                </p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 overflow-hidden shadow-sm">
              <div className="relative h-80 w-full">
                <Image src="/images/team/anthony.jpg" alt="Anthony Torsarkissian — COO" fill sizes="33vw" priority className="object-cover object-top filter grayscale" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-text-dark mb-1">Anthony Torsarkissian</h3>
                <p className="text-sm font-bold text-accent-red uppercase tracking-wide mb-4">COO & Prime Contractor</p>
                <p className="text-text-body text-sm leading-relaxed">
                  A second-generation contractor, Anthony brings operational depth and technical command to every Red Stag project. His background spans residential and commercial builds — giving him the systems thinking that keeps complex projects on schedule and on budget.
                </p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 overflow-hidden shadow-sm">
              <div className="relative h-80 w-full">
                <Image src="/images/team/zack.jpg" alt="Zack Ward — Head of Project Development" fill sizes="33vw" priority className="object-cover object-top filter grayscale" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-text-dark mb-1">Zack Ward</h3>
                <p className="text-sm font-bold text-accent-red uppercase tracking-wide mb-4">Head of Project Development</p>
                <p className="text-text-body text-sm leading-relaxed">
                  Zack brings a rare combination of creative and operational leadership to Red Stag. With a background spanning the construction trade and the entertainment industry — including VP of a Los Angeles film studio — he leads client engagement and project development with the same precision used in high-stakes production.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
