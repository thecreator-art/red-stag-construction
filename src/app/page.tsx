import dynamic from 'next/dynamic';
import { ParallaxHero } from '@/components/ui/ParallaxHero';
import { TrustBar } from '@/components/sections/TrustBar';
import { SplitBreak } from '@/components/sections/SplitBreak';
import { WhyRedStag } from '@/components/sections/WhyRedStag';
import { SplitBreakCTA } from '@/components/sections/SplitBreakCTA';
import { TeamSection } from '@/components/sections/TeamSection';
import type { Review } from '@/components/sections/ReviewCarousel';

// Dynamically import heavy Client Components to defer JavaScript loading
const ServicesGrid = dynamic(() => import('@/components/sections/ServicesGrid').then(mod => mod.ServicesGrid));
const FeaturedProjects = dynamic(() => import('@/components/sections/FeaturedProjects').then(mod => mod.FeaturedProjects));
const ProcessSection = dynamic(() => import('@/components/sections/ProcessSection').then(mod => mod.ProcessSection));
const ReviewCarousel = dynamic(() => import('@/components/sections/ReviewCarousel').then(mod => mod.ReviewCarousel));
const ServiceAreaMap = dynamic(() => import('@/components/maps/ServiceAreaMap').then(mod => mod.ServiceAreaMap));
const FAQAccordion = dynamic(() => import('@/components/ui/FAQAccordion').then(mod => mod.FAQAccordion));

export const metadata = {
  title: 'General Contractor in Los Angeles, CA | Red Stag Construction',
  description:
    'Licensed GC in Los Angeles since 2011. Custom homes, ADUs, remodels, additions, hardscape, and fencing across Beverly Hills, Bel Air, and Malibu.',
  alternates: {
    canonical: 'https://redstagcc.com',
  },
  openGraph: {
    title: 'General Contractor in Los Angeles, CA | Red Stag Construction',
    description:
      'Licensed GC in Los Angeles since 2011. Custom homes, ADUs, remodels, additions, hardscape, and fencing across Beverly Hills, Bel Air, and Malibu.',
    url: 'https://redstagcc.com',
  },
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
    address: {
      '@type': 'PostalAddress',
      streetAddress: '3211 Cahuenga Blvd W Ste 207',
      addressLocality: 'Los Angeles',
      addressRegion: 'CA',
      postalCode: '90068',
      addressCountry: 'US',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: 5.0,
      reviewCount: 47,
      bestRating: 5,
      worstRating: 1,
    },
    license: {
      value: 'https://www.cslb.ca.gov',
      identifier: '964664',
    },
    priceRange: '$$$',
    currenciesAccepted: 'USD',
    paymentAccepted: 'Cash Check Credit Card',
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
  const heroImageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    url: 'https://redstagcc.com/images/projects/trousdale-after.jpg',
    width: 1920,
    height: 1080,
    name: 'Beverly Hills Estate Renovation by Red Stag Construction Los Angeles',
    description:
      'Premium general contractor project in Beverly Hills California featuring custom exterior renovation pool deck and hardscaping by Red Stag Construction.',
    author: {
      '@type': 'Organization',
      name: 'Red Stag Construction',
    },
  };

  return (
    <div className="w-full relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(heroImageSchema) }}
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
      <TrustBar />

      {/* SECTION 3 */}
      <ServicesGrid services={services} className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5" />

      {/* SECTION 4 */}
      <SplitBreak />

      {/* SECTION 5 */}
      <WhyRedStag />

      {/* SECTION 6 */}
      <FeaturedProjects />

      {/* SECTION 7 */}
      <ReviewCarousel reviews={reviews} />

      {/* SECTION 8 */}
      <SplitBreakCTA />

      {/* SECTION 9 */}
      <TeamSection />

      {/* SECTION 10 */}
      <ProcessSection />

      {/* SECTION 11 */}
      <section className="w-full border-y border-white/10 bg-navy-deep px-6 py-24 md:px-12 md:py-28">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <h2 className="font-serif text-4xl font-bold text-white md:text-5xl">
              Frequently Asked Questions
            </h2>
            <div className="mx-auto mt-5 h-1.5 w-24 bg-accent-red shadow-md" />
          </div>

          <div className="mt-14">
            <FAQAccordion
              darkMode
              showSearch={false}
              categories={[
                {
                  categoryTitle: 'General Questions',
                  questions: homepageFaqs,
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* SECTION 12 */}
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

    </div>
  );
}
