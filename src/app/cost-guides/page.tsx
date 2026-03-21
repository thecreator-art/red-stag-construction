import { ParallaxHero } from "@/components/ui/ParallaxHero";
import Link from 'next/link';
import { TrustBadge } from "@/components/ui/TrustBadge";

export const metadata = {
  title: "LA Construction Cost Guides | Red Stag Construction",
  description: "Detailed 2026 cost guides for Los Angeles kitchen remodels, bathroom remodels, ADUs, and custom homes."
};

export default function CostGuidesIndex() {
  const guides = [
    { title: "Kitchen Remodel Cost Guide", slug: "kitchen-remodel-cost-los-angeles", desc: "Breakdown of basic, mid-tier, and premium luxury kitchen renovations." },
    { title: "Bathroom Remodel Cost Guide", slug: "bathroom-remodel-cost-los-angeles", desc: "Understand tile, plumbing, and structural costs for standard and primary baths." },
    { title: "ADU Construction Cost Guide", slug: "adu-cost-los-angeles", desc: "Garage conversions vs. detached ADUs, including soft costs and permits." },
    { title: "Custom Home Build Cost Guide", slug: "custom-home-cost-los-angeles", desc: "Cost per square foot analysis for ground-up hillside and flat lot builds." },
    { title: "Home Addition Cost Guide", slug: "home-addition-cost-los-angeles", desc: "First floor bump-outs vs second story addition cost projections." }
  ];

  return (
    <>
      <ParallaxHero 
        imageSrc="/images/hero-cost-guides.jpg" 
        imageAlt="Construction Cost Guides Los Angeles 2026"
        h1Text="Los Angeles Construction Cost Guides"
        h2Text="Transparent, 2026-updated pricing data for your next project."
        ctaText="Get a Custom Estimate"
        ctaHref="/contact"
        phoneNumber="(626) 652-2303"
      />
      <TrustBadge />
      
      <section className="py-24 bg-warm-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.map((g, i) => (
              <div key={i} className="bg-white p-8 shadow-sm border-t-4 border-accent-red flex flex-col rounded hover:shadow-md transition-shadow">
                <h2 className="text-2xl font-serif font-bold text-text-dark mb-4">{g.title}</h2>
                <p className="text-text-body mb-8 flex-grow leading-relaxed">{g.desc}</p>
                <Link href={`/cost-guides/${g.slug}`} className="text-accent-red font-bold uppercase tracking-widest text-xs hover:text-[#990000] transition-colors border-b-2 border-accent-red inline-block self-start pb-1">
                  Read the Full Guide
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
