import { ParallaxHero } from "@/components/ui/ParallaxHero";
import { TrustBadge } from "@/components/ui/TrustBadge";

export const metadata = {
  title: "Client Reviews & Testimonials | Red Stag Construction",
  description: "Read reviews from our Los Angeles clients on Google, Yelp, Houzz, and Facebook."
};

export default function Reviews() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Red Stag Construction",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "142"
    }
  };

  const reviews = [
    { name: "M. Peterson", site: "Google", text: "Handled our kitchen remodel with absolute precision.", service: "Kitchen" },
    { name: "S. Reynolds", site: "Yelp", text: "Navigated the city permitting process entirely on their own.", service: "ADU" },
    { name: "D. Choy", site: "Houzz", text: "Exceptional attention to detail on our custom home build.", service: "Custom Home" },
    { name: "J. Larson", site: "Facebook", text: "The craftsmanship on the tilework is stunning.", service: "Bathroom" }
  ];

  return (
    <>
      <ParallaxHero 
        imageSrc="/images/hero-reviews.jpg" 
        imageAlt="Client Reviews"
        h1Text="Client Reviews"
        h2Text="Don't just take our word for it."
        ctaText="View Portfolio"
        ctaHref="/our-work"
        phoneNumber="(626) 652-2303"
      />
      <TrustBadge />
      
      <section className="py-24 bg-cream">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-wrap gap-4 mb-12 justify-center">
             <span className="px-6 py-2 bg-primary-dark text-white font-bold rounded cursor-pointer">All Services</span>
             <span className="px-6 py-2 bg-white text-body-grey border border-gray-200 font-bold rounded cursor-pointer shadow-sm">Kitchens</span>
             <span className="px-6 py-2 bg-white text-body-grey border border-gray-200 font-bold rounded cursor-pointer shadow-sm">Bathrooms</span>
             <span className="px-6 py-2 bg-white text-body-grey border border-gray-200 font-bold rounded cursor-pointer shadow-sm">ADUs</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {reviews.map((r, i) => (
              <div key={i} className="bg-white p-8 shadow-sm border-t-4 border-gold flex flex-col h-full rounded">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-primary-dark">{r.name}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{r.site}</span>
                </div>
                <div className="text-gold mb-4 text-xl tracking-widest">★★★★★</div>
                <p className="text-body-grey flex-grow italic mb-4">"{r.text}"</p>
                <div className="pt-4 border-t border-gray-100 text-xs font-bold text-primary-red uppercase">
                  Service: {r.service}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-24 border-t border-gray-200 pt-16 text-center">
            <h2 className="text-3xl font-serif font-bold text-primary-dark mb-8">Leave Us a Review</h2>
            <div className="flex flex-wrap justify-center gap-6">
              <a href="https://google.com" target="_blank" rel="noopener noreferrer" className="w-16 h-16 bg-white flex items-center justify-center rounded-full shadow-md text-primary-dark border border-gray-200 font-bold text-xl hover:bg-gray-50 transition-colors">G</a>
              <a href="https://yelp.com" target="_blank" rel="noopener noreferrer" className="w-16 h-16 bg-white flex items-center justify-center rounded-full shadow-md text-primary-dark border border-gray-200 font-bold text-xl hover:bg-gray-50 transition-colors">Y</a>
              <a href="https://houzz.com" target="_blank" rel="noopener noreferrer" className="w-16 h-16 bg-white flex items-center justify-center rounded-full shadow-md text-primary-dark border border-gray-200 font-bold text-xl hover:bg-gray-50 transition-colors">H</a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-16 h-16 bg-white flex items-center justify-center rounded-full shadow-md text-primary-dark border border-gray-200 font-bold text-xl hover:bg-gray-50 transition-colors">F</a>
            </div>
          </div>
        </div>
      </section>
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
