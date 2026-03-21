import { ParallaxHero } from '@/components/ui/ParallaxHero';
import { ContactForm } from '@/components/forms/ContactForm';

export default function ForRealEstateAgents() {
  return (
    <>
      <ParallaxHero 
        imageSrc="/images/hero/hero-main.jpg"
        imageAlt="Real Estate Partnerships"
        h1Text="For Luxury Real Estate Agents"
        h2Text="Elevate property values pre-listing. From cosmetic remodels to comprehensive staging build-outs, we move at the speed of the market."
        ctaText="Request a Property Walkthrough"
        ctaHref="#partner-form"
        phoneNumber="(626) 652-2303"
      />
      
      <section className="bg-white py-24 border-y border-gray-200">
         <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-4xl font-serif font-bold text-text-dark mb-8">Maximize ROI on Every Listing</h2>
            <p className="text-xl text-text-body leading-relaxed mb-12">Whether a property requires a rapid kitchen modernization or structural foundation repairs before hitting MLS, our specialized Realtor teams mobilize immediately. We help you increase the final closing price through targeted, high-return construction strategies designed specifically for the Los Angeles market.</p>
         </div>
      </section>
      
      <section id="partner-form" className="bg-navy-deep py-24 border-t border-gray-800">
         <div className="container mx-auto px-4 max-w-4xl text-center">
           <h2 className="text-4xl font-serif font-bold text-white mb-6">Schedule a Property Walkthrough</h2>
           <p className="text-xl text-gray-400 mb-12">Bring our project managers to your next distressed or outdated listing for an immediate physical assessment.</p>
           <div className="bg-white p-8 md:p-12 text-left rounded-sm shadow-xl mt-12">
             <ContactForm />
           </div>
         </div>
      </section>
    </>
  );
}
