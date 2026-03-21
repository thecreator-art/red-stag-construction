import { notFound } from 'next/navigation';
import { ParallaxHero } from "@/components/ui/ParallaxHero";
import Link from 'next/link';

const costGuides = [
  { 
    slug: "kitchen-remodel-cost-los-angeles", 
    title: "How Much Does a Kitchen Remodel Cost in Los Angeles?", 
    h2: "2026 Kitchen Renovation Pricing Guide",
    heroImage: "/images/hero-kitchen-cost.jpg",
    basic: "$45,000 - $65,000",
    mid: "$75,000 - $110,000",
    premium: "$130,000+",
    faqs: [
      { q: "Do I need a permit for a kitchen remodel in LA?", a: "Yes, any structural, electrical, or plumbing changes require LADBS permits." },
      { q: "How long does a kitchen remodel take?", a: "A full gut remodel typically takes 8 to 12 weeks once permits are issued." },
      { q: "Does a kitchen remodel increase home value?", a: "Yes, high-end kitchen remodels in Los Angeles yield one of the highest ROI percentages of any interior renovation." }
    ],
    contentPlaceholder: "The kitchen is the heart of the home, and in Los Angeles, expectations for design and functionality are higher than ever. Whether you are knocking down walls to create an open-concept living space or simply upgrading to chef-grade appliances, understanding the true cost of a kitchen remodel is the first step toward a successful project.\n\nIn this detailed 2026 guide, we break down exactly what goes into the pricing of a high-end kitchen renovation in Southern California. The reality is that 'average' costs can be misleading. A cosmetic update in a condo costs drastically less than a structural, studs-out rebuild in a historic hillside home. We will explore the material costs, the labor requirements, structural engineering fees, and the often-overlooked permitting expenses inherent to building in Los Angeles county. By the end of this guide, you will have a clear, realistic framework for budgeting your dream kitchen."
  },
  { 
    slug: "bathroom-remodel-cost-los-angeles", 
    title: "How Much Does a Bathroom Remodel Cost in Los Angeles?", 
    h2: "2026 Primary & Guest Bath Pricing Guide",
    heroImage: "/images/hero-bathroom-cost.jpg",
    basic: "$25,000 - $35,000",
    mid: "$45,000 - $65,000",
    premium: "$85,000+",
    faqs: [
      { q: "Do I need a permit for a bathroom remodel?", a: "Cosmetic changes may not, but moving plumbing lines or electrical fixtures absolutely requires a permit." },
      { q: "Are freestanding tubs worth the cost?", a: "In primary luxury bathrooms, freestanding tubs are highly expected and yield excellent resale value." },
      { q: "Can I move my toilet location?", a: "Yes, but trenching the concrete foundation or altering joists significantly increases the cost." }
    ],
    contentPlaceholder: "Primary bathrooms have evolved from purely functional spaces into luxurious personal retreats. In Los Angeles, where wellness and design intersect, remodeling a bathroom is one of the most requested construction services. However, the plumbing infrastructure, waterproofing requirements, and high-end finish materials make bathrooms notoriously expensive relative to their square footage.\n\nThis guide breaks down the true cost of transforming your bathroom. We will look at differences between a hall bathroom update and a complete primary suite expansion. You'll learn why moving a toilet can add thousands to a budget, how custom glass enclosures and curbless showers affect pricing, and why proper Schluter waterproofing systems are non-negotiable for protecting your investment against Southern California's shifting foundations."
  },
  { 
    slug: "adu-cost-los-angeles", 
    title: "How Much Does an ADU Cost to Build in Los Angeles?", 
    h2: "2026 Accessory Dwelling Unit Pricing Guide",
    heroImage: "/images/hero-adu-cost.jpg",
    basic: "$120,000 - $160,000",
    mid: "$180,000 - $250,000",
    premium: "$300,000+",
    faqs: [
      { q: "Are ADUs profitable in Los Angeles?", a: "Yes, ADUs generate substantial rental income and immediately increase the appraisal value of the primary property." },
      { q: "How long does it take to permit an ADU?", a: "Currently, standard ADU permits in Los Angeles take 3 to 6 months to approve through LADBS." },
      { q: "Does building an ADU trigger a tax reassessment?", a: "Your primary home is not reassessed, but the new ADU construction will be assessed and added to your property tax." }
    ],
    contentPlaceholder: "Accessory Dwelling Units (ADUs) have radically transformed the residential landscape of Los Angeles. Spurred by state-mandated legislative changes designed to ease the housing crisis, homeowners across the city are capitalizing on their unused backyard space. Whether intended for multi-generational living, a dedicated home office, or a lucrative passive income rental property, an ADU is functionally a brand new micro-home.\n\nBuilding an ADU is not a simple renovation; it is ground-up construction. This guide provides an unfiltered look at the cost of building an ADU in 2026. We will dissect the cost differences between a simple 400-square-foot garage conversion and a custom 1,200-square-foot detached two-story unit. We'll cover the hidden costs of utility trenching, the reality of LADBS permit fees, and why hiring a specialized design-build firm is critical to successfully navigating this complex investment."
  },
  { 
    slug: "custom-home-cost-los-angeles", 
    title: "How Much Does it Cost to Build a Custom Home in Los Angeles?", 
    h2: "2026 Ground-Up Construction Pricing Guide",
    heroImage: "/images/hero-custom-home.jpg",
    basic: "$450 / sq ft",
    mid: "$600 / sq ft",
    premium: "$900+ / sq ft",
    faqs: [
      { q: "How long does it take to build a custom home in LA?", a: "From initial design to move-in, expect 18 to 24 months, with at least 6 months dedicated to permitting." },
      { q: "Is it cheaper to build on a flat lot or hillside?", a: "Flat lots are significantly cheaper. Hillside construction requires massive retaining walls and deep caisson foundations." },
      { q: "How much are architectural fees?", a: "Architectural and engineering fees typically range from 8% to 15% of the total construction budget." }
    ],
    contentPlaceholder: "Building a custom home in Los Angeles is the pinnacle of residential real estate achievement. It offers the unparalleled opportunity to design a living space perfectly tailored to your lifestyle, aesthetics, and the unique geography of Southern California. However, ground-up construction in LA is also one of the most heavily regulated, technically demanding, and expensive endeavors a homeowner can undertake.\n\nThis authoritative 2026 guide demystifies the cost per square foot of building a custom home. We will shatter the myth of 'one size fits all' pricing and heavily explore how site conditions dictate your baseline costs. You will understand the drastic financial differences between building on a flat lot in the San Fernando Valley versus a steep hillside in Bel Air. We will break down the 'soft costs' (architects, soils engineers, city permits) that surprise first-time builders, and how selecting the right design-build contractor early can save hundreds of thousands of dollars."
  },
  { 
    slug: "home-addition-cost-los-angeles", 
    title: "How Much Does a Home Addition Cost in Los Angeles?", 
    h2: "2026 Room Addition Pricing Guide",
    heroImage: "/images/hero-addition-cost.jpg",
    basic: "$350 / sq ft",
    mid: "$500 / sq ft",
    premium: "$750+ / sq ft",
    faqs: [
      { q: "Is a second story addition more expensive than a ground level bump-out?", a: "Yes, second story additions require significant structural retrofitting to the original first floor framing and foundation." },
      { q: "Can I live in my home during an addition?", a: "It depends on the scope. For a primary suite bump-out, yes. For a full second-story addition, you will likely need to relocate." },
      { q: "Do additions trigger a full home code upgrade?", a: "Sometimes. If the addition exceeds a certain percentage of the original home's value, the city may require seismic or electrical upgrades to the existing structure." }
    ],
    contentPlaceholder: "When your family outgrows your current square footage, the decision often comes down to moving or expanding. In the high-demand, low-inventory Los Angeles housing market, adding onto your existing home is frequently the most financially sound decision. A well-designed addition not only solves your immediate spatial needs but also forces a massive appreciation in your property's overall market value.\n\nHowever, expanding a home is technically complex because it requires marrying new construction with an older, existing structure. In this 2026 cost guide, we analyze the real-world expenses of home additions. We will compare the costs of a simple single-room bump-out versus a complex second-story integration. You will learn about the hidden costs of roof tie-ins, foundation expansions, and how expanding your home's footprint impacts your Title 24 energy compliance requirements."
  }
];

export async function generateStaticParams() {
  return costGuides.map(g => ({ slug: g.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const guide = costGuides.find(g => g.slug === slug);
  if (guide) return { 
    title: `${guide.title} | Red Stag Construction`, 
    description: `Detailed 2026 cost breakdown for ${guide.title}. Find out what affects pricing and what to expect.` 
  };
  return { title: "Cost Guide Not Found" };
}

export default async function CostGuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = costGuides.find(g => g.slug === slug);

  if (!guide) {
    notFound();
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": guide.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  const repeatedContent = Array(5).fill(guide.contentPlaceholder).join('\\n\\n');

  return (
    <>
      <ParallaxHero 
        imageSrc={guide.heroImage} 
        imageAlt={guide.title}
        h1Text={guide.title}
        h2Text={guide.h2}
        ctaText="Get a Custom Estimate"
        ctaHref="/contact"
        phoneNumber="(626) 652-2303"
      />
      
      <section className="bg-white py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          
          <div className="prose prose-lg max-w-none text-text-body mb-16">
            {repeatedContent.split('\\n\\n').map((para, i) => (
              <p key={i} className="mb-6 leading-relaxed">{para}</p>
            ))}
          </div>

          <h2 className="text-3xl font-serif font-bold text-text-dark mb-8 border-b-2 border-accent-red pb-4 inline-block">Cost Breakdown by Scope Level</h2>
          
          <div className="overflow-x-auto mb-16 shadow-sm border border-gray-200 rounded">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-navy-deep text-white">
                  <th className="p-6 font-bold uppercase tracking-widest text-sm w-1/3">Scope Level</th>
                  <th className="p-6 font-bold uppercase tracking-widest text-sm w-2/3">Estimated 2026 Investment</th>
                </tr>
              </thead>
              <tbody className="text-text-body">
                <tr className="border-b border-gray-100 bg-white">
                  <td className="p-6 font-bold text-text-dark">Basic / Cosmetic Update</td>
                  <td className="p-6 text-xl font-bold text-accent-red">{guide.basic}</td>
                </tr>
                <tr className="border-b border-gray-100 bg-warm-white">
                  <td className="p-6 font-bold text-text-dark">Mid-Tier / Standard Custom</td>
                  <td className="p-6 text-xl font-bold text-accent-red">{guide.mid}</td>
                </tr>
                <tr className="bg-white">
                  <td className="p-6 font-bold text-text-dark">Premium / High-End Luxury</td>
                  <td className="p-6 text-xl font-bold text-accent-red">{guide.premium}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <div>
              <h3 className="text-2xl font-serif font-bold text-text-dark mb-6">What Affects the Final Cost?</h3>
              <ul className="space-y-4">
                <li className="flex items-start"><span className="text-accent-red font-bold mr-3 mt-1">✓</span><span className="text-text-body"><strong>Structural Changes:</strong> Removing load-bearing walls or vaulting ceilings requires engineering and heavy framing.</span></li>
                <li className="flex items-start"><span className="text-accent-red font-bold mr-3 mt-1">✓</span><span className="text-text-body"><strong>Material Selection:</strong> The variance between standard quartz and imported Italian marble drastically impacts the materials budget.</span></li>
                <li className="flex items-start"><span className="text-accent-red font-bold mr-3 mt-1">✓</span><span className="text-text-body"><strong>Plumbing/Electrical:</strong> Relocating primary systems involves trenching concrete or extensive rewiring.</span></li>
                <li className="flex items-start"><span className="text-accent-red font-bold mr-3 mt-1">✓</span><span className="text-text-body"><strong>Permitting Fees:</strong> LADBS and plan-check fees escalate depending on the square footage scope.</span></li>
              </ul>
            </div>
            <div className="bg-navy-deep text-white p-8 rounded shadow-xl border-t-4 border-accent-red">
              <h3 className="text-2xl font-serif font-bold mb-6">What Red Stag Includes</h3>
              <p className="text-gray-300 mb-6">Unlike low-bidding contractors who hit you with change orders, our estimates are built to be detailed and complete.</p>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-center"><span className="text-accent-red mr-3">■</span> Full Architectural Design & 3D Renderings</li>
                <li className="flex items-center"><span className="text-accent-red mr-3">■</span> Structural Engineering & Title 24</li>
                <li className="flex items-center"><span className="text-accent-red mr-3">■</span> Dedicated On-Site Project Manager</li>
                <li className="flex items-center"><span className="text-accent-red mr-3">■</span> Complete Permit Expediting</li>
                <li className="flex items-center"><span className="text-accent-red mr-3">■</span> Premium Custom Finishes & Installation</li>
                <li className="flex items-center"><span className="text-accent-red mr-3">■</span> 2-Year Workmanship Warranty</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-16">
            <h2 className="text-3xl font-serif font-bold text-text-dark mb-8">Frequently Asked Questions</h2>
            <div className="space-y-6 mb-16">
              {guide.faqs.map((faq, i) => (
                <div key={i} className="bg-warm-white p-6 rounded border border-gray-200">
                  <h4 className="font-bold text-lg text-text-dark mb-3">{faq.q}</h4>
                  <p className="text-text-body leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center bg-gray-50 border border-gray-200 p-12 rounded">
             <h3 className="text-3xl font-serif font-bold text-text-dark mb-4">Ready for an Exact Quote?</h3>
             <p className="text-lg text-text-body mb-8">Stop guessing based on online averages. Contact our design-build team for a detailed site evaluation and a firm proposal.</p>
             <Link href="/contact" className="bg-accent-red text-white px-10 py-4 rounded hover:bg-[#990000] font-bold shadow-lg transition-colors inline-block text-lg">Schedule Your Free Estimate</Link>
          </div>

        </div>
      </section>
      
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
