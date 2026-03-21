import { ParallaxHero } from "@/components/ui/ParallaxHero";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Areas We Serve | Red Stag Construction Greater Los Angeles",
  description: "Red Stag Construction is a licensed general contractor building custom homes, ADUs, and remodeling in Beverly Hills, Bel Air, Malibu, and the entire LA area.",
};

const topTierCities = [
  "Beverly Hills", "Bel Air", "Brentwood", "Pacific Palisades", "Malibu", "Santa Monica", "Manhattan Beach"
];

const svfCities = [
  "Studio City", "Sherman Oaks", "Encino", "Calabasas", "Hidden Hills", "Tarzana", "Woodland Hills"
];

const reachCities = [
  "West Hollywood", "Silver Lake", "Burbank", "Granada Hills", "Northridge", "San Fernando"
];

export default function AreasWeServe() {
  const formatSlug = (city: string) => {
    // Edge case matching the spec
    if (city === "Brentwood") return "general-contractor-brentwood-la";
    return `general-contractor-${city.toLowerCase().replace(/ /g, '-')}`;
  };

  return (
    <>
      <ParallaxHero 
        imageSrc="/images/hero-areas.jpg" 
        imageAlt="General Contractor Service Areas Greater Los Angeles"
        h1Text="We Build Across Greater Los Angeles"
        h2Text="From the beaches to the San Fernando Valley."
        ctaText="Get a Free Estimate"
        ctaHref="/contact"
        phoneNumber="(626) 652-2303"
      />

      <section className="py-24 bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary-dark mb-6">Serving Greater Los Angeles</h2>
            <p className="text-lg text-body-grey">
              Red Stag Construction is licensed and insured, operating across 20 distinct municipalities and neighborhoods in the greater Los Angeles area. We understand the specific zoning, permitting, and building requirements for each distinct jurisdiction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Tier 1 */}
            <div className="bg-white p-8 border-t-4 border-primary-red shadow-sm">
              <h3 className="text-2xl font-serif font-bold text-primary-dark mb-6 pb-4 border-b border-gray-100">Westside & Luxury Homes</h3>
              <ul className="space-y-4 font-semibold">
                {topTierCities.map(city => (
                  <li key={city}>
                    <Link href={`/${formatSlug(city)}`} className="text-body-grey hover:text-primary-red transition-colors flex items-center group">
                      <span className="w-1.5 h-1.5 bg-gold rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {city}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tier 2 */}
            <div className="bg-white p-8 border-t-4 border-primary-dark shadow-sm">
              <h3 className="text-2xl font-serif font-bold text-primary-dark mb-6 pb-4 border-b border-gray-100">San Fernando Valley</h3>
              <ul className="space-y-4 font-semibold">
                {svfCities.map(city => (
                  <li key={city}>
                    <Link href={`/${formatSlug(city)}`} className="text-body-grey hover:text-primary-red transition-colors flex items-center group">
                      <span className="w-1.5 h-1.5 bg-gold rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {city}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tier 3 */}
            <div className="bg-white p-8 border-t-4 border-gold shadow-sm">
              <h3 className="text-2xl font-serif font-bold text-primary-dark mb-6 pb-4 border-b border-gray-100">Greater LA & Metro</h3>
              <ul className="space-y-4 font-semibold">
                {reachCities.map(city => (
                  <li key={city}>
                    <Link href={`/${formatSlug(city)}`} className="text-body-grey hover:text-primary-red transition-colors flex items-center group">
                      <span className="w-1.5 h-1.5 bg-gold rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {city}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mt-16 text-center">
             <Button href="/contact" variant="primary">Schedule a Site Visit</Button>
          </div>
        </div>
      </section>
    </>
  );
}
