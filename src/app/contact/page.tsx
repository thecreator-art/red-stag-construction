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
        imageSrc="/images/hero-contact.jpg" 
        imageAlt="Contact Red Stag Construction"
        h1Text="Let's Talk About Your Project"
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

                <div className="pt-8 border-t border-gray-800 flex space-x-6">
                  {/* Social links */}
                  <a href="https://www.instagram.com/redstagcc" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                    <span className="sr-only">Instagram</span>
                    <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                  </a>
                  <a href="https://www.facebook.com/Redstagconstructioncompany" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                    <span className="sr-only">Facebook</span>
                    <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                  </a>
                  <a href="https://www.linkedin.com/in/israel-aquino-59333259" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                    <span className="sr-only">LinkedIn</span>
                    <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
                  </a>
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
