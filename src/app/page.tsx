import { ParallaxHero } from '@/components/ui/ParallaxHero';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { WhyRedStag } from '@/components/sections/WhyRedStag';
import { FeaturedProjects } from '@/components/sections/FeaturedProjects';
import { SplitBreakCTA } from '@/components/sections/SplitBreakCTA';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { TeamSection } from '@/components/sections/TeamSection';
import { ReviewCarousel, Review } from '@/components/sections/ReviewCarousel';
import { ServiceAreaMap } from '@/components/maps/ServiceAreaMap';
import { ContactForm } from '@/components/forms/ContactForm';

export const metadata = {
  title: 'General Contractor in Los Angeles, CA | Red Stag Construction',
  description:
    'Licensed GC in Los Angeles since 2011. Custom homes, ADUs, remodels, additions, hardscape, and fencing across Beverly Hills, Bel Air, and Malibu.',
};

export default function HomePage() {
  const services = [
    { slug: 'kitchen-remodel-los-angeles', title: 'Kitchen Remodel', imageSrc: '/images/services/kitchen.jpg' },
    { slug: 'bathroom-remodel-los-angeles', title: 'Bathroom Remodel', imageSrc: '/images/services/bathroom.jpg' },
    { slug: 'adu-contractor-los-angeles', title: 'ADU Construction', imageSrc: '/images/services/adu.jpg' },
    { slug: 'custom-home-builder-los-angeles', title: 'Custom Home Build', imageSrc: '/images/services/custom.jpg' },
    { slug: 'home-addition-contractor-los-angeles', title: 'Home Addition', imageSrc: '/images/services/home.jpg' },
    { slug: 'general-contractor-los-angeles', title: 'General Contracting', imageSrc: '/images/services/general.jpg' },
    { slug: 'hardscape-contractor-los-angeles', title: 'Hardscaping', imageSrc: '/images/services/hardscape.jpg' },
    { slug: 'fence-company-los-angeles', title: 'Fencing & Gates', imageSrc: '/images/services/fence.jpg' },
    { slug: 'window-replacement-los-angeles', title: 'Window Replacement', imageSrc: '/images/services/window.jpg' }
  ];

  const reviews: Review[] = [
    { id: '1', name: 'M. Peterson', platform: 'Google', rating: 5, text: 'Red Stag handled our kitchen remodel with absolute precision. Their design-build team caught structural issues early and addressed them without delaying the timeline.' },
    { id: '2', name: 'S. Reynolds', platform: 'Yelp', rating: 5, text: 'We hired them for a 800 sq ft ADU in Sherman Oaks. They navigated the city permitting process entirely on their own, which was a huge relief.' },
    { id: '3', name: 'D. Choy', platform: 'Houzz', rating: 5, text: 'Exceptional attention to detail on our custom home build. Israel and Anthony were always available for site walks.' },
    { id: '4', name: 'J. Larson', platform: 'Google', rating: 5, text: 'They rebuilt our master suite and bathroom. The craftsmanship on the tilework and custom vanity is stunning.' },
    { id: '5', name: 'A. Davies', platform: 'Yelp', rating: 5, text: 'Professional, clean job site, and no surprise invoices. Red Stag stuck perfectly to their original estimate.' }
  ];

  const cities = [
    { name: 'Beverly Hills', slug: '/general-contractor-beverly-hills' },
    { name: 'Bel Air', slug: '/general-contractor-bel-air' },
    { name: 'Hidden Hills', slug: '/general-contractor-hidden-hills' },
    { name: 'Pacific Palisades', slug: '/general-contractor-pacific-palisades' },
    { name: 'Malibu', slug: '/general-contractor-malibu' },
    { name: 'Brentwood', slug: '/general-contractor-brentwood-la' },
    { name: 'Manhattan Beach', slug: '/general-contractor-manhattan-beach' },
    { name: 'Santa Monica', slug: '/general-contractor-santa-monica' },
    { name: 'West Hollywood', slug: '/general-contractor-west-hollywood' },
    { name: 'Silver Lake', slug: '/general-contractor-silver-lake' },
    { name: 'Studio City', slug: '/general-contractor-studio-city' },
    { name: 'Sherman Oaks', slug: '/general-contractor-sherman-oaks' },
    { name: 'Encino', slug: '/general-contractor-encino' },
    { name: 'Calabasas', slug: '/general-contractor-calabasas' },
    { name: 'Tarzana', slug: '/general-contractor-tarzana' },
    { name: 'Woodland Hills', slug: '/general-contractor-woodland-hills' },
    { name: 'Burbank', slug: '/general-contractor-burbank' },
    { name: 'Granada Hills', slug: '/general-contractor-granada-hills' },
    { name: 'Northridge', slug: '/general-contractor-northridge' },
    { name: 'San Fernando', slug: '/general-contractor-san-fernando' }
  ];
  const half = Math.ceil(cities.length / 2);
  const leftCities = cities.slice(0, half);
  const rightCities = cities.slice(half);
  const homepageFaqs = [
    {
      question: 'How long does a typical remodel or build take?',
      answer:
        'Timelines vary by scope. A kitchen or bathroom remodel typically takes 6–10 weeks. ADUs and home additions range from 3–5 months. Custom home builds run 8–14 months depending on complexity. We provide a detailed project schedule during your consultation.',
    },
    {
      question: 'Do you handle permits and city approvals?',
      answer:
        'Yes. We manage the entire permitting process including city plan checks, HOA submissions, and historic preservation board approvals. Our team has permitted over 100 projects across Los Angeles.',
    },
    {
      question: 'Do I need to hire an architect before contacting you?',
      answer:
        'No. As a design-build firm, we have licensed architects and structural engineers in-house. We handle design, engineering, and construction under one roof so you do not need to coordinate separate teams.',
    },
    {
      question: 'What does your estimate process look like?',
      answer:
        'We start with a free on-site consultation where we walk the property, discuss your vision, and assess structural requirements. Within one week you receive a detailed written estimate with line-item pricing. No vague ranges or hidden fees.',
    },
    {
      question: 'What areas of Los Angeles do you serve?',
      answer:
        'We serve all of Greater Los Angeles and the San Fernando Valley including Beverly Hills, Bel Air, Pacific Palisades, Malibu, Brentwood, Studio City, Sherman Oaks, Encino, Calabasas, and surrounding neighborhoods.',
    },
  ];
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'GeneralContractor'],
    name: 'Red Stag Construction',
    url: 'https://redstagcc.com',
    telephone: '(626) 652-2303',
    email: 'support@redstagcc.com',
    slogan: 'Designed here. Built right. Delivered on time.',
    foundingDate: '2011',
    sameAs: [
      'https://www.yelp.com/biz/red-stag-construction-los-angeles',
      'https://www.houzz.com/professionals/red-stag-construction',
      'https://www.facebook.com/Redstagconstructioncompany',
      'https://www.instagram.com/redstagcc',
      'https://www.linkedin.com/in/israel-aquino-59333259',
    ],
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Contractor License',
      name: 'CSLB License 964664',
      awardedBy: {
        '@type': 'Organization',
        name: 'California State License Board',
      },
    },
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      value: 10,
    },
  };

  return (
    <div className="w-full relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      {/* SECTION 1 */}
      <ParallaxHero 
        imageSrc="/images/projects/trousdale-after.jpg"
        imageAlt="Modern custom home construction project in Los Angeles"
        h1Text="General Contractor in Los Angeles, CA"
        h2Text="Design-Build Specialists — Custom Homes, ADUs, Kitchen and Bathroom Remodels, and High-End Construction Across Greater Los Angeles"
        ctaText="Get a Free Estimate"
        ctaHref="/contact"
        phoneNumber="(626) 652-2303"
      />

      {/* SECTION 2 */}
      <ServicesGrid services={services} className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5" />

      {/* SECTION 3 */}
      <WhyRedStag />

      {/* SECTION 4 */}
      <FeaturedProjects />

      {/* SECTION 5 */}
      <ReviewCarousel reviews={reviews} />

      {/* SECTION 6 */}
      <SplitBreakCTA />

      {/* SECTION 7 */}
      <ProcessSection />

      {/* SECTION 8 */}
      <TeamSection />

      {/* SECTION 9 */}
      <section className="w-full border-y border-[#e2ddd5] bg-[#F0EDE8] px-6 py-24 md:px-12 md:py-28">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <h2 className="font-serif text-4xl font-bold text-[#1A1A1A] md:text-5xl">
              Frequently Asked Questions
            </h2>
            <div className="mx-auto mt-5 h-1.5 w-24 bg-accent-red shadow-md" />
          </div>

          <div className="mt-14 space-y-4">
            {homepageFaqs.map((faq) => (
              <details
                key={faq.question}
                className="group border border-[#ddd6cc] bg-white shadow-sm transition-shadow open:shadow-md"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 font-sans text-lg font-semibold text-navy-deep">
                  <span>{faq.question}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="h-5 w-5 shrink-0 text-accent-red transition-transform duration-300 group-open:rotate-180"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m6 9 6 6 6-6" />
                  </svg>
                </summary>
                <div className="border-l-[3px] border-accent-red px-6 py-4 font-sans text-base leading-7 text-text-body">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10 */}
      <section className="w-full bg-white py-24 md:py-32 px-6 md:px-12 border-y border-gray-200">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/3 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-serif text-[#111] font-bold leading-tight mb-8">Serving Greater Los Angeles and The San Fernando Valley</h2>
            <div className="w-16 h-1.5 bg-accent-red mb-10 shadow-md"></div>
            
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              <ul className="space-y-3">
                {leftCities.map((city) => (
                  <li key={city.slug} className="text-gray-600 font-bold uppercase tracking-wider text-[10px] sm:text-xs">
                    <span className="text-accent-red mr-2 font-black">•</span>
                    <a href={city.slug} className="transition-colors hover:text-accent-red">
                      {city.name}
                    </a>
                  </li>
                ))}
              </ul>
              <ul className="space-y-3">
                {rightCities.map((city) => (
                  <li key={city.slug} className="text-gray-600 font-bold uppercase tracking-wider text-[10px] sm:text-xs">
                    <span className="text-accent-red mr-2 font-black">•</span>
                    <a href={city.slug} className="transition-colors hover:text-accent-red">
                      {city.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="lg:w-2/3 h-[500px] border-[6px] border-white shadow-2xl rounded-sm overflow-hidden bg-navy-deep">
            <ServiceAreaMap />
          </div>
        </div>
      </section>

      {/* SECTION 11 */}
      <section className="w-full bg-navy-deep py-24 md:py-32 px-6 md:px-12 select-none relative overflow-hidden">
        {/* Background Ghost Element */}
        <div className="absolute top-1/2 -translate-y-1/2 -right-40 opacity-[0.03] pointer-events-none w-[800px] h-[800px]">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 relative z-10">
          <div>
            <ContactForm />
          </div>
          
          <div className="flex flex-col justify-center text-white lg:pl-10">
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-10 leading-tight">Let's Discuss Your Blueprint.</h2>
            
            <div className="space-y-10 text-gray-300 text-lg font-serif">
              <p className="border-l-4 border-accent-red pl-6 py-2 italic text-xl">Red Stag Construction operates across Greater Los Angeles specializing in high-end design-build frameworks.</p>
              
              <div>
                <span className="block text-xs font-sans font-bold uppercase tracking-widest text-[#B31217] mb-2">Direct Line</span>
                <a href="tel:6266522303" className="text-3xl md:text-4xl font-extrabold text-white hover:text-accent-red transition-colors tracking-wider">(626) 652-2303</a>
              </div>
              
              <div>
                <span className="block text-xs font-sans font-bold uppercase tracking-widest text-[#B31217] mb-2">Email</span>
                <a href="mailto:support@redstagcc.com" className="text-xl md:text-2xl font-extrabold text-white hover:text-accent-red transition-colors tracking-wider">support@redstagcc.com</a>
              </div>
              
              <div>
                <span className="block text-xs font-sans font-bold uppercase tracking-widest text-[#B31217] mb-2">Headquarters</span>
                <p className="text-lg md:text-xl font-medium tracking-wide">3211 Cahuenga Blvd W Ste 207<br/>Los Angeles, CA 90068</p>
              </div>
            </div>
            
            {/* Social Matrix */}
            <div className="flex space-x-6 mt-16 border-t border-gray-800 pt-10">
              <a href="#" aria-label="Instagram" className="w-14 h-14 bg-navy-deep border border-gray-800 flex items-center justify-center hover:border-accent-red transition-colors group shadow-lg hover:-translate-y-1 transform duration-300">
                <svg className="w-5 h-5 text-gray-400 group-hover:text-accent-red transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.20 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="#" aria-label="Facebook" className="w-14 h-14 bg-navy-deep border border-gray-800 flex items-center justify-center hover:border-accent-red transition-colors group shadow-lg hover:-translate-y-1 transform duration-300">
                <svg className="w-5 h-5 text-gray-400 group-hover:text-accent-red transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.597 0 0 .597 0 1.325v21.351C0 23.403.597 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.597 1.323-1.325V1.325C24 .597 23.403 0 22.675 0z"/></svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="w-14 h-14 bg-navy-deep border border-gray-800 flex items-center justify-center hover:border-accent-red transition-colors group shadow-lg hover:-translate-y-1 transform duration-300">
                <svg className="w-5 h-5 text-gray-400 group-hover:text-accent-red transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003L22.225 0z"/></svg>
              </a>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
