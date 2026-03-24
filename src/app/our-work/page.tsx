import { ParallaxHero } from "@/components/ui/ParallaxHero";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { TrustBadge } from "@/components/ui/TrustBadge";

export const metadata = {
  title: "Construction Portfolio | Red Stag Construction Los Angeles",
  description: "View our portfolio of custom homes, ADUs, and high-end remodels across Los Angeles. Our work speaks for itself.",
};

export default function OurWork() {
  return (
    <>
      <ParallaxHero 
        imageSrc="/images/hero-portfolio.jpg" 
        imageAlt="Construction portfolio Los Angeles"
        h1Text="Our Work Speaks for Itself"
        h2Text="Luxury construction and remodeling across Greater Los Angeles."
        ctaText="Get a Free Estimate"
        ctaHref="/contact"
        phoneNumber="(626) 652-2303"
      />

      <TrustBadge />

      <section className="bg-navy-deep pt-12 pb-24 border-b border-gray-800 text-white">
        <div className="container mx-auto px-4">
          {/* Static portfolio gallery showcasing the primary projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto mt-16">
            
            <div className="bg-navy-deep border border-gray-800 overflow-hidden">
              <BeforeAfterSlider 
                beforeImage="/images/projects/kitchen-remodel-beverly-hills-before-01.jpg" 
                afterImage="/images/projects/kitchen-remodel-beverly-hills-after-01.jpg" 
                altText="Kitchen remodel Beverly Hills before and after" 
              />
              <div className="p-8">
                <span className="text-accent-red font-bold uppercase tracking-widest text-sm mb-2 block">Kitchen Remodel</span>
                <h3 className="text-2xl font-serif font-bold mb-4">Beverly Hills Estate Kitchen</h3>
                <p className="text-gray-400 text-sm leading-relaxed border-t border-gray-800 pt-4">
                  Full gut remodel involving structural wall removal, integrated Sub-Zero appliances, and bookmatched marble waterfall islands. Delivered on an aggressive 10-week schedule.
                </p>
              </div>
            </div>

            <div className="bg-navy-deep border border-gray-800 overflow-hidden">
              <BeforeAfterSlider 
                beforeImage="/images/projects/bathroom-remodel-encino-before-01.jpg" 
                afterImage="/images/projects/bathroom-remodel-encino-after-01.jpg" 
                altText="Bathroom remodel Encino before and after" 
              />
              <div className="p-8">
                <span className="text-accent-red font-bold uppercase tracking-widest text-sm mb-2 block">Bathroom Remodel</span>
                <h3 className="text-2xl font-serif font-bold mb-4">Encino Primary Bath</h3>
                <p className="text-gray-400 text-sm leading-relaxed border-t border-gray-800 pt-4">
                  Transformation of a cramped 1970s layout into a luxury spa retreat featuring a freestanding soaking tub, curbless walk-in shower, and heated floors.
                </p>
              </div>
            </div>

            <div className="bg-navy-deep border border-gray-800 overflow-hidden">
              <BeforeAfterSlider 
                beforeImage="/images/projects/adu-construction-studio-city-before-01.jpg" 
                afterImage="/images/projects/adu-construction-studio-city-after-01.jpg" 
                altText="ADU build Studio City before and after" 
              />
              <div className="p-8">
                <span className="text-accent-red font-bold uppercase tracking-widest text-sm mb-2 block">ADU Construction</span>
                <h3 className="text-2xl font-serif font-bold mb-4">Studio City Detached ADU</h3>
                <p className="text-gray-400 text-sm leading-relaxed border-t border-gray-800 pt-4">
                  A complete ground-up 800 sq ft accessory dwelling unit. Included structural foundation on a slight slope, separate metering, and premium rental finishes.
                </p>
              </div>
            </div>

            <div className="bg-navy-deep border border-gray-800 overflow-hidden">
              <BeforeAfterSlider 
                beforeImage="/images/projects/home-addition-calabasas-before-01.jpg" 
                afterImage="/images/projects/home-addition-calabasas-after-01.jpg" 
                altText="Home addition Calabasas CA before and after" 
              />
              <div className="p-8">
                <span className="text-accent-red font-bold uppercase tracking-widest text-sm mb-2 block">Home Addition</span>
                <h3 className="text-2xl font-serif font-bold mb-4">Calabasas Second Story Addition</h3>
                <p className="text-gray-400 text-sm leading-relaxed border-t border-gray-800 pt-4">
                  A complex second-story addition requiring extensive HOA approvals and structural steel reinforcement to preserve the open floor plan below without view obstruction.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
