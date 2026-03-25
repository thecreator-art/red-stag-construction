import { ParallaxHero } from "@/components/ui/ParallaxHero";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata = {
  title: "Contact Red Stag Construction | Free Estimate Los Angeles",
  description: "Contact Red Stag Construction for a free estimate on your custom home, remodel, or addition project in Los Angeles. Call (626) 652-2303.",
  alternates: {
    canonical: 'https://redstagcc.com/contact',
  },
};

export default function Contact() {
  return (
    <>
      <ParallaxHero 
        imageSrc="/images/hero/hero-main.jpg" 
        imageAlt="Contact Red Stag Construction"
        h1Text="Contact Red Stag Construction — Free Estimates in Los Angeles CA"
        h2Text="We respond to all inquiries within 2 hours during business hours."
        ctaText="Get a Free Estimate"
        ctaHref="/contact"
        phoneNumber="(626) 652-2303"
      />

      <section className="bg-warm-white py-24 relative overflow-hidden">
        {/* Abstract stag graphic watermark */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 opacity-5 pointer-events-none w-[800px] h-[800px]">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-current text-text-dark">
            {/* Simple placeholder for the stag logo vector watermark */}
            <path d="M50 0 L100 100 L0 100 Z" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            <div className="lg:col-span-5 bg-navy-deep text-white p-12 border-t-8 border-accent-red shadow-xl">
              <h2 className="text-3xl font-serif font-bold mb-8">Contact Information</h2>
              
              <div className="space-y-10">
                <div>
                  <h3 className="text-accent-red font-bold uppercase tracking-widest text-sm mb-2">Phone Directory</h3>
                  <a href="tel:6266522303" className="block text-3xl font-bold hover:text-accent-red transition-colors">(626) 652-2303</a>
                  <p className="text-gray-400 text-sm mt-2">Mon - Fri: 9:00 AM - 6:00 PM<br/>Sat: 9:00 AM - 3:00 PM</p>
                </div>

                <div>
                  <h3 className="text-accent-red font-bold uppercase tracking-widest text-sm mb-2">Email Address</h3>
                  <a href="mailto:support@redstagcc.com" className="block text-xl hover:text-accent-red transition-colors">support@redstagcc.com</a>
                </div>

                <div>
                  <h3 className="text-accent-red font-bold uppercase tracking-widest text-sm mb-2">Corporate Office</h3>
                  <address className="not-italic text-lg text-gray-300">
                    3211 Cahuenga Blvd W Ste 207<br />
                    Los Angeles, CA 90068
                  </address>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white p-12 border border-gray-200 shadow-xl">
              <h2 className="text-3xl font-serif font-bold text-text-dark mb-2">Request an Estimate</h2>
              <p className="text-text-body mb-8">Ready to build? Fill out the form below and we will contact you shortly.</p>
              
              <ContactForm />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
