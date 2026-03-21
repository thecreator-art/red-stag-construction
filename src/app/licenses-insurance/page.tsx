import { ParallaxHero } from "@/components/ui/ParallaxHero";

export const metadata = {
  title: "Licenses & Insurance | Red Stag Construction",
  description: "Verify our active California contractor license (#964664), liability insurance, workers compensation, and bonding status."
};

export default function Licenses() {
  return (
    <>
      <ParallaxHero 
        imageSrc="/images/hero-license.jpg" 
        imageAlt="Licensed Contractor Los Angeles"
        h1Text="Licenses & Insurance"
        h2Text="Fully licensed, bonded, and insured in the state of California."
        ctaText="Verify License"
        ctaHref="https://www.cslb.ca.gov"
        phoneNumber="(626) 652-2303"
      />
      
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="w-24 h-24 mx-auto bg-primary-dark text-white rounded-full flex items-center justify-center mb-10 shadow-xl border-4 border-cream">
            <span className="text-4xl" aria-hidden="true">🏛️</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-dark mb-4">CSLB License #964664</h2>
          <p className="text-xl text-body-grey mb-12">Established in 2011, Red Stag Construction maintains an impeccable standing with the California Contractors State License Board.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mt-16">
            <div className="bg-cream p-8 border border-gray-200 rounded">
              <h3 className="text-xl font-bold text-primary-dark mb-2">Liability Insurance</h3>
              <p className="text-body-grey text-sm leading-relaxed">Active general liability insurance carrying a multi-million dollar umbrella specifically formatted for high-value residential projects.</p>
            </div>
            <div className="bg-cream p-8 border border-gray-200 rounded">
              <h3 className="text-xl font-bold text-primary-dark mb-2">Workers Comp</h3>
              <p className="text-body-grey text-sm leading-relaxed">Full workers compensation coverage for all site employees and sub-contractors, protecting you from on-site liability.</p>
            </div>
            <div className="bg-cream p-8 border border-gray-200 rounded">
              <h3 className="text-xl font-bold text-primary-dark mb-2">Bonding Status</h3>
              <p className="text-body-grey text-sm leading-relaxed">Bonded up to state-mandated caps to ensure financial security and project completion on all major builds.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
