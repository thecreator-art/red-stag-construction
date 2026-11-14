import { ParallaxHero } from '@/components/ui/ParallaxHero';
import { TrustBadge } from '@/components/ui/TrustBadge';

export const metadata = {
  title: '2026 Los Angeles Construction & Remodeling Cost Benchmarks | Red Stag Construction',
  description:
    'Written design-build pricing benchmarks from our headquarters at 3211 Cahuenga Boulevard West, STE 207, Los Angeles, CA 90068 (CSLB License #964664) across Los Angeles, Burbank, Glendale, Pasadena, Universal City, Encino, Sherman Oaks, and Beverly Hills.',
  alternates: {
    canonical: 'https://redstagcc.com/pricing',
  },
  openGraph: {
    title: '2026 Los Angeles Construction & Remodeling Cost Benchmarks | Red Stag Construction',
    description:
      'Written design-build pricing benchmarks from our headquarters at 3211 Cahuenga Boulevard West, STE 207, Los Angeles, CA 90068 (CSLB License #964664) across Los Angeles, Burbank, Glendale, Pasadena, Universal City, Encino, Sherman Oaks, and Beverly Hills.',
    url: 'https://redstagcc.com/pricing',
  },
};

export default function PricingPage() {
  return (
    <>
      <ParallaxHero
        imageSrc="/images/hero/hero-main.jpg"
        imageAlt="Los Angeles construction and remodeling project by Red Stag Construction"
        h1Text="Pricing"
        h2Text="2026 Los Angeles construction and remodeling cost benchmarks."
        ctaText="Get a Free Estimate"
        ctaHref="/contact"
        phoneNumber="(323) 922-4235"
      />

      <TrustBadge />

      <section className="w-full scroll-mt-28 bg-white py-20 px-6 md:px-12 border-t border-gray-200" id="cost-benchmarks">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <span className="w-14 h-0.5 bg-accent-red"></span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#111]">
              2026 Los Angeles Construction &amp; Remodeling Cost Benchmarks
            </h2>
          </div>
          <p className="text-base md:text-lg text-gray-600 mb-8 max-w-4xl">
            Written design-build pricing benchmarks from our headquarters at 3211 Cahuenga Boulevard West, STE 207, Los Angeles, CA 90068 (CSLB License #964664) across Los Angeles, Burbank, Glendale, Pasadena, Universal City, Encino, Sherman Oaks, and Beverly Hills.
          </p>
          <div className="overflow-x-auto border border-gray-200 rounded-sm">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-navy-deep text-left text-white">
                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider">Construction Scope</th>
                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider">2026 Los Angeles Cost Range</th>
                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider">Typical Timeline</th>
                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider">Permits &amp; Engineering Included</th>
                </tr>
              </thead>
              <tbody className="bg-white text-sm md:text-base text-gray-700">
                <tr className="border-b border-gray-200">
                  <td data-label="Construction Scope" className="px-5 py-4 font-bold text-[#111]">Custom Kitchen Remodeling</td>
                  <td data-label="2026 Los Angeles Cost Range" className="px-5 py-4 font-semibold text-accent-red">$65,000 – $175,000+</td>
                  <td data-label="Typical Timeline" className="px-5 py-4">6 – 10 Weeks</td>
                  <td data-label="Permits & Engineering Included" className="px-5 py-4">3D layout design, custom cabinetry, quartz/stone slabs, MEP rough-in &amp; LADBS permits</td>
                </tr>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <td data-label="Construction Scope" className="px-5 py-4 font-bold text-[#111]">Luxury Primary Bathroom Remodel</td>
                  <td data-label="2026 Los Angeles Cost Range" className="px-5 py-4 font-semibold text-accent-red">$42,000 – $115,000+</td>
                  <td data-label="Typical Timeline" className="px-5 py-4">5 – 8 Weeks</td>
                  <td data-label="Permits & Engineering Included" className="px-5 py-4">Hot-mop waterproofing, curbless frameless glass shower, custom vanity, tile &amp; plumbing permits</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td data-label="Construction Scope" className="px-5 py-4 font-bold text-[#111]">ADU Construction &amp; Garage Conversion</td>
                  <td data-label="2026 Los Angeles Cost Range" className="px-5 py-4 font-semibold text-accent-red">$185,000 – $425,000+</td>
                  <td data-label="Typical Timeline" className="px-5 py-4">4 – 7 Months</td>
                  <td data-label="Permits & Engineering Included" className="px-5 py-4">Architectural plans, Title 24 energy calcs, structural engineering, utility trenching &amp; Certificate of Occupancy</td>
                </tr>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <td data-label="Construction Scope" className="px-5 py-4 font-bold text-[#111]">Home Addition &amp; Second-Story Build</td>
                  <td data-label="2026 Los Angeles Cost Range" className="px-5 py-4 font-semibold text-accent-red">$220,000 – $550,000+</td>
                  <td data-label="Typical Timeline" className="px-5 py-4">4 – 8 Months</td>
                  <td data-label="Permits & Engineering Included" className="px-5 py-4">Seismic foundation tie-ins, structural steel framing, roofline integration, HVAC &amp; full city plan check</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td data-label="Construction Scope" className="px-5 py-4 font-bold text-[#111]">Ground-Up Custom Home Build</td>
                  <td data-label="2026 Los Angeles Cost Range" className="px-5 py-4 font-semibold text-accent-red">$450 – $850+ / sq ft</td>
                  <td data-label="Typical Timeline" className="px-5 py-4">10 – 16 Months</td>
                  <td data-label="Permits & Engineering Included" className="px-5 py-4">Soils/geotechnical reports, hillside caissons, architectural engineering, turnkey interior &amp; exterior build</td>
                </tr>
                <tr>
                  <td data-label="Construction Scope" className="px-5 py-4 font-bold text-[#111]">Hardscaping, Fencing &amp; Window Replacement</td>
                  <td data-label="2026 Los Angeles Cost Range" className="px-5 py-4 font-semibold text-accent-red">$18,000 – $125,000+</td>
                  <td data-label="Typical Timeline" className="px-5 py-4">2 – 6 Weeks</td>
                  <td data-label="Permits & Engineering Included" className="px-5 py-4">Retaining walls, pavers, hardwood/steel automated gates, and Title 24 full-frame window installation</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
