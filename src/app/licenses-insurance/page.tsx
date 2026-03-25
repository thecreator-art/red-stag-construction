import { ParallaxHero } from "@/components/ui/ParallaxHero";
import { TrustBadge } from "@/components/ui/TrustBadge";

export const metadata = {
  title: "Licenses & Insurance | Red Stag Construction",
  description: "Verify our active California contractor license (#964664), liability insurance, workers compensation, and bonding status.",
  alternates: {
    canonical: 'https://redstagcc.com/licenses-insurance',
  },
};

export default function Licenses() {
  return (
    <>
      <ParallaxHero 
        imageSrc="/images/projects/hillside-after.jpg" 
        imageAlt="Licensed Contractor Los Angeles"
        h1Text="Licenses & Insurance"
        h2Text="Fully licensed, bonded, and insured in the state of California."
        ctaText="Verify License"
        ctaHref="https://www.cslb.ca.gov"
        phoneNumber="(626) 652-2303"
      />

      <TrustBadge />
      
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-text-dark mb-4">CSLB License #964664</h2>
          <p className="text-xl text-text-body mb-12">Established in 2011, Red Stag Construction maintains an impeccable standing with the California Contractors State License Board.</p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://www.cslb.ca.gov"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center rounded-sm bg-accent-red px-8 py-4 text-sm font-extrabold uppercase tracking-widest text-white transition-all duration-200 hover:scale-[1.02] hover:bg-[#990000]"
            >
              Verify License
            </a>
            <a
              href="/documents/red-stag-license.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center rounded-sm border-2 border-navy-deep px-8 py-4 text-sm font-extrabold uppercase tracking-widest text-navy-deep transition-all duration-200 hover:border-accent-red hover:text-accent-red"
            >
              Download License PDF
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mt-16">
            <div className="bg-warm-white p-8 border border-gray-200 rounded">
              <h3 className="text-xl font-bold text-text-dark mb-2">Liability Insurance</h3>
              <p className="text-text-body text-sm leading-relaxed">Active general liability insurance carrying a multi-million dollar umbrella specifically formatted for high-value residential projects.</p>
            </div>
            <div className="bg-warm-white p-8 border border-gray-200 rounded">
              <h3 className="text-xl font-bold text-text-dark mb-2">Workers Comp</h3>
              <p className="text-text-body text-sm leading-relaxed">Full workers compensation coverage for all site employees and sub-contractors, protecting you from on-site liability.</p>
            </div>
            <div className="bg-warm-white p-8 border border-gray-200 rounded">
              <h3 className="text-xl font-bold text-text-dark mb-2">Bonding Status</h3>
              <p className="text-text-body text-sm leading-relaxed">Bonded up to state-mandated caps to ensure financial security and project completion on all major builds.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
