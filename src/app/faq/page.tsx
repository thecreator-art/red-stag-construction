import { ParallaxHero } from "@/components/ui/ParallaxHero";
import Link from 'next/link';
import { TrustBadge } from "@/components/ui/TrustBadge";

export const metadata = {
  title: "Frequently Asked Questions | Red Stag Construction",
  description: "Answers to common questions about Los Angeles construction, permits, costs, and hiring a general contractor."
};

export default function FAQ() {
  const faqs = Array.from({ length: 30 }).map((_, i) => ({
    question: `Common Construction Question ${i + 1}`,
    answer: `This is a comprehensive answer covering permits, timelines, and costs. Check out our <a href="/general-contractor" class="text-accent-red font-bold hover:underline">General Contracting Services</a> to learn more about how we handle this specific phase of construction.`
  }));

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer.replace(/<[^>]+>/g, '')
      }
    }))
  };

  return (
    <>
      <ParallaxHero 
        imageSrc="/images/hero-faq.jpg" 
        imageAlt="FAQ Red Stag Construction"
        h1Text="Frequently Asked Questions"
        h2Text="Everything you need to know about building in Los Angeles."
        ctaText="Have More Questions?"
        ctaHref="/contact"
        phoneNumber="(626) 652-2303"
      />
      <TrustBadge />
      
      <section className="py-24 bg-warm-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <details key={i} className="group bg-white border border-gray-200 p-6 shadow-sm rounded-sm">
                <summary className="flex justify-between items-center font-bold font-serif text-xl cursor-pointer list-none text-text-dark">
                  <span>{faq.question}</span>
                  <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </span>
                </summary>
                <div className="text-text-body mt-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: faq.answer }}></div>
              </details>
            ))}
          </div>
        </div>
      </section>
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
