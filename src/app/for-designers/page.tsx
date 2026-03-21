import { ParallaxHero } from '@/components/ui/ParallaxHero';
import { ContactForm } from '@/components/forms/ContactForm';

export default function ForDesigners() {
  return (
    <>
      <ParallaxHero 
        imageSrc="/images/hero/hero-main.jpg"
        imageAlt="Interior Designer Partnerships"
        h1Text="For Elite Interior Designers"
        h2Text="We provide the high-end structural framework and masterful finish execution to make your designs look flawless."
        ctaText="Let's Collaborate"
        ctaHref="#partner-form"
        phoneNumber="(626) 652-2303"
      />
      
      <section className="bg-warm-grey py-24 border-y border-gray-200">
         <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-4xl font-serif font-bold text-text-dark mb-8">Uncompromising Attention to Finish Details</h2>
            <p className="text-xl text-text-body leading-relaxed mb-12">Custom cabinetry. Rare imported stone. Flawless hardware alignment. Our teams execute the most meticulous finish plans in Los Angeles, protecting your reputation with your clients through perfect physical installations.</p>
         </div>
      </section>
      
      <section id="partner-form" className="bg-navy-deep py-24 border-t border-gray-800">
         <div className="container mx-auto px-4 max-w-4xl text-center">
           <h2 className="text-4xl font-serif font-bold text-white mb-6">Contact The Procurement Team</h2>
           <div className="bg-white p-8 md:p-12 text-left rounded-sm shadow-xl mt-12">
             <ContactForm />
           </div>
         </div>
      </section>
    </>
  );
}
