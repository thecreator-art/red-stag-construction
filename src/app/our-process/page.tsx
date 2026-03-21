import { ParallaxHero } from "@/components/ui/ParallaxHero";
import { TrustBadge } from "@/components/ui/TrustBadge";
import Link from "next/link";

export const metadata = {
  title: "Our Process | Red Stag Construction",
  description: "Discover our 5-phase design-build process from initial consultation to final closeout for construction projects in Los Angeles."
};

export default function OurProcess() {
  const phases = [
    { title: "1. Initial Consultation & Site Visit", text: "The very first step is understanding your vision. We conduct a thorough site evaluation to identify structural constraints and zoning limitations right away. We discuss budgeting expectations, architectural timelines, and feasible concepts. This is crucial for custom home builds and ADU projects." },
    { title: "2. Design & Architectural Planning", text: "Once engaged, our design-build team drafts the initial concepts. We coordinate directly with structural engineers, soil testers, and Title 24 energy consultants to prepare a full plan. By managing this under one roof, we eliminate the friction between standalone architects and builders, saving weeks of back-and-forth." },
    { title: "3. Permitting & Clearances", text: "Los Angeles requires rigorous permitting. We handle the entire LADBS permit expedition matrix. From coastal commission clearances in Malibu to hillside ordnance compliance in the Hollywood Hills, our team ensures every piece of paperwork is filed accurately to prevent costly delays." },
    { title: "4. Physical Construction", text: "With permits in hand, physical construction begins. We maintain a relentlessly clean and organized job site. Site supervisors are present daily to manage tradesmen, sequence deliveries, and pass city inspections. You receive constant updates and access to our digital portal tracking progress, finishes, and schedules." },
    { title: "5. Final Walkthrough & Closeout", text: "As we near completion, we execute a meticulous punch list. We refuse to consider a project finished until every tile is perfectly aligned and all mechanical systems are fully commissioned. We acquire the final Certificate of Occupancy from the city and hand over the keys to your newly transformed space." }
  ];

  return (
    <>
      <ParallaxHero 
        imageSrc="/images/hero-process.jpg" 
        imageAlt="Our Construction Process"
        h1Text="The Design-Build Process"
        h2Text="How we execute complex LA construction projects with total accountability."
        ctaText="Start Your Process"
        ctaHref="/contact"
        phoneNumber="(626) 652-2303"
      />
      
      <TrustBadge />
      
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none text-text-body mb-16 border-l-4 border-accent-red pl-8">
            <p className="mb-4">At Red Stag Construction, we believe that predictability is the ultimate luxury in residential construction. The traditional model of hiring a separate architect, bidding out to multiple contractors, and managing endless change orders is fundamentally broken. It leads to ballooning budgets and adversarial relationships.</p>
            <p>Our 5-phase design-build methodology vertically integrates the entire process. By aligning the architectural vision with the structural reality from day one, we guarantee a smoother, faster, and more transparent build. This process has been refined over a decade of operating in the highly regulated Los Angeles jurisdiction, ensuring that your custom home, kitchen remodel, or <strong><Link href="/general-contractor-los-angeles">general contracting project</Link></strong> is carried through cleanly.</p>
          </div>

          <div className="relative border-l-2 border-gray-200 ml-3 md:ml-6 mt-16 space-y-20">
            {phases.map((phase, i) => (
              <div key={i} className="relative pl-10 md:pl-16">
                <div className="absolute w-8 h-8 bg-navy-deep rounded-full -left-[17px] border-4 border-white flex items-center justify-center text-white font-bold text-xs top-1 shadow-md">
                  {i + 1}
                </div>
                <h3 className="text-3xl font-serif font-bold text-text-dark mb-4">{phase.title}</h3>
                <p className="text-lg leading-relaxed text-text-body">{phase.text}</p>
                <div className="mt-6 flex gap-4">
                   <div className="h-1 w-12 bg-accent-red"></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-24 text-center">
             <p className="text-xl font-bold text-text-dark mb-6">Experience the difference of a true design-build firm.</p>
             <Link href="/contact" className="bg-accent-red text-white px-8 py-4 rounded shadow-md hover:bg-[#990000] font-bold transition-colors inline-block">Schedule a Site Visit</Link>
          </div>
        </div>
      </section>
    </>
  );
}
