import { ParallaxHero } from '@/components/ui/ParallaxHero';
import { ContactForm } from '@/components/forms/ContactForm';

export default function ForArchitects() {
  return (
    <>
      <ParallaxHero 
        imageSrc="/images/hero/hero-main.jpg"
        imageAlt="Architect Partnership Program"
        h1Text="For Forward-Thinking Architects"
        h2Text="Translating Complex Visions into Exact Concrete Realities. Partner with a Los Angeles GC that respects the blueprint."
        ctaText="Become a Partner"
        ctaHref="#partner-form"
        phoneNumber="(626) 652-2303"
      />
      
      <section className="bg-warm-white py-24">
         <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-4xl font-serif font-bold text-text-dark mb-8">Seamless Architectural Implementation</h2>
            <p className="text-xl text-text-body leading-relaxed mb-12">We know the friction that occurs when blueprints hit the dirt. Red Stag Construction bridges the gap between high-design architecture and onsite structural engineering. We execute your exact vision down to the millimeter, ensuring your client receives exactly what was pitched.</p>
         </div>
      </section>
      
      <section id="partner-form" className="bg-navy-deep py-24 border-t border-gray-800">
         <div className="container mx-auto px-4 max-w-4xl text-center">
           <h2 className="text-4xl font-serif font-bold text-white mb-6">Let's Discuss Your Next Build</h2>
           <p className="text-xl text-gray-400 mb-12">Fill out the brief form below to initiate a private partnership consultation.</p>
           <div className="bg-white p-8 md:p-12 text-left rounded-sm shadow-xl">
             <ContactForm />
           </div>
         </div>
      </section>
    </>
  );
}
