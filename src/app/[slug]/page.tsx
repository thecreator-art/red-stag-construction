import { notFound } from 'next/navigation';
import servicesData from '@/data/services.json';
import locationsData from '@/data/locations.json';
import matrixData from '@/data/matrix.json';
import blogsData from '@/data/blogs.json';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';

import { ParallaxHero } from '@/components/ui/ParallaxHero';
import { BeforeAfterSlider } from '@/components/ui/BeforeAfterSlider';
import { TrustBadge } from '@/components/ui/TrustBadge';
import { ContactForm } from '@/components/forms/ContactForm';
import { Button } from '@/components/ui/Button';

// 1. Static Paths for Build Time
export async function generateStaticParams() {
  const serviceParams = servicesData.map(s => ({ slug: s.slug }));
  const locationParams = locationsData.map(l => ({ slug: l.slug }));
  const matrixParams = matrixData.map(m => ({ slug: m.slug }));
  const blogParams = blogsData.map(b => ({ slug: b.slug }));
  return [...serviceParams, ...locationParams, ...matrixParams, ...blogParams];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

// 2. Dynamic Metadata Generation
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const baseUrl = 'https://redstagcc.com';
  
  const service = servicesData.find(s => s.slug === slug);
  if (service) return { 
    title: service.metaTitle || 'Construction Services | Red Stag', 
    description: service.metaDescription || 'Expert construction services in Los Angeles.',
    alternates: { canonical: `${baseUrl}/${slug}` }
  };
  
  const location = locationsData.find(l => l.slug === slug);
  if (location) return {
    title: `General Contractor in ${location.city || 'Los Angeles'}, CA | Red Stag Construction`,
    description: `Licensed general contractor in ${location.city || 'Los Angeles'}, CA. Building custom homes, ADUs, and high-end remodels. Free design-build estimates.`,
    alternates: { canonical: `${baseUrl}/${slug}` }
  };
  
  const matrix = matrixData.find(m => m.slug === slug);
  if (matrix) return {
    title: `${matrix.title || 'Construction Service'} | Red Stag Construction`,
    description: matrix.intro ? matrix.intro.substring(0, 155).trim() + '...' : 'Expert construction in Los Angeles.',
    alternates: { canonical: `${baseUrl}/${slug}` }
  };
  const blog = blogsData.find(b => b.slug === slug);
  if (blog) return {
    title: blog.title || 'Construction Blog',
    description: `Read more about ${blog.keyword || 'building'} and expert construction insights.`,
    alternates: { canonical: `${baseUrl}/${slug}` }
  };
  
  return { title: "Page Not Found" };
}

// 3. Main Page Component
export default async function DynamicSlugPage({ params }: PageProps) {
  const { slug } = await params;

  const service = servicesData.find(s => s.slug === slug);
  const location = locationsData.find(l => l.slug === slug);
  const matrix = matrixData.find(m => m.slug === slug);
  const blog = blogsData.find(b => b.slug === slug);

  if (!service && !location && !matrix && !blog) {
    notFound();
  }

  // --- BLOG PAGE TEMPLATE ---
  if (blog) {
    const filePath = path.join(process.cwd(), 'src', 'content', 'blog', `${blog.slug}.mdx`);
    let fileContent = '';
    try { fileContent = fs.readFileSync(filePath, 'utf8'); } catch (e) {}
    
    let contentBody = fileContent.replace(/---[\s\S]*?---/, '').trim();
    contentBody = contentBody.replace(/^#\s+(.*$)/gim, '<h1 class="text-4xl md:text-5xl font-serif font-bold text-primary-dark mb-8">$1</h1>');
    contentBody = contentBody.replace(/^##\s+(.*$)/gim, '<h2 class="text-3xl font-serif font-bold text-primary-dark mt-12 mb-6">$1</h2>');
    contentBody = contentBody.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    const parts = contentBody.split('\n\n');
    let htmlContent = parts.map(p => {
      if (p.trim() === '' || p.startsWith('<h') || p.startsWith('<script') || p.startsWith('</script') || p.includes('type="application/ld+json"') || p.startsWith('---')) return p;
      return `<p class="mb-6 leading-relaxed text-lg">${p}</p>`;
    }).join('\n');

    return (
      <div className="bg-white py-24 min-h-screen">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="prose prose-lg max-w-none text-body-grey" dangerouslySetInnerHTML={{ __html: htmlContent }} />
          
          <div className="border-t border-gray-200 pt-10 mt-16 pb-8">
            <h3 className="text-2xl font-serif font-bold text-primary-dark mb-6">Explore Related Services</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={`/${blog.serviceSlug || ''}`} className="bg-cream text-primary-dark border border-gray-200 px-8 py-4 rounded hover:bg-gold hover:text-white transition-colors font-bold text-center">Service: <span className="capitalize">{(blog.serviceSlug || '').replace(/-/g, ' ')}</span></Link>
              <Link href={`/${blog.locationSlug || ''}`} className="bg-primary-red text-white px-8 py-4 rounded shadow-md hover:bg-[#8e0e12] transition-colors font-bold text-center">Location: <span className="capitalize">{(blog.locationSlug || '').replace('general-contractor-', '').replace(/-/g, ' ')}</span></Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- SERVICE PAGE TEMPLATE ---
  if (service) {
    return (
      <>
        <ParallaxHero 
          imageSrc={`/images/services/${(service.slug || '').split('-')[0]}.jpg`} // Fallback image logic based on slug
          imageAlt={service.h1 || 'Construction Service'}
          h1Text={service.h1 || 'Expert Construction Services'}
          h2Text={service.keyword || 'Los Angeles General Contractor'}
          ctaText="Get a Free Estimate"
          ctaHref="/contact"
          phoneNumber="(626) 652-2303"
        />
        <TrustBadge />
        <section className="bg-cream py-24">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-serif font-bold text-primary-dark mb-8">What We Do</h2>
            <div className="text-lg text-body-grey leading-relaxed whitespace-pre-wrap mb-16">
              {service.intro || ''}
            </div>
          </div>
        </section>
        
        {/* Universal Contact Block for Service pages */}
        <section className="bg-primary-dark py-24 border-t border-gray-800">
           <div className="container mx-auto px-4 max-w-4xl text-center">
             <h2 className="text-4xl font-serif font-bold text-white mb-6">Ready to Start Your {(service.title || 'Construction').split(' ')[0]} Project?</h2>
             <p className="text-xl text-gray-300 mb-12">Contact Red Stag Construction for a free initial consultation and site visit.</p>
             <div className="bg-white p-8 md:p-12 text-left rounded-sm shadow-xl">
               <ContactForm />
             </div>
           </div>
        </section>
      </>
    );
  }

  // --- LOCATION PAGE TEMPLATE ---
  if (location) {
    return (
      <>
        <ParallaxHero 
          imageSrc={`/images/locations/city-overview.jpg`} // Fallback image logic
          imageAlt={`General Contractor ${location.city || 'Los Angeles'}`}
          h1Text={`General Contractor in ${location.city || 'Los Angeles'}, CA`}
          h2Text={`Luxury remodels, ADUs, and Custom Homes in ${location.city || 'Los Angeles'}.`}
          ctaText="Get a Free Estimate"
          ctaHref="/contact"
          phoneNumber="(626) 652-2303"
        />
        <TrustBadge />
        <section className="bg-white py-24">
          <div className="container mx-auto px-4 max-w-4xl">
             <h2 className="text-3xl font-serif font-bold text-primary-dark mb-8">Building in {location.city || 'Los Angeles'}</h2>
             <p className="text-lg text-body-grey leading-relaxed mb-12">
               {location.intro || ''}
             </p>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center pt-8 border-t border-gray-200">
                <Button href={`/kitchen-remodel-${(location.slug || '').replace('general-contractor-', '')}`} variant="outline">Kitchen Remodeling in {location.city || 'Los Angeles'}</Button>
                <Button href={`/bathroom-remodel-${(location.slug || '').replace('general-contractor-', '')}`} variant="outline">Bathroom Remodeling in {location.city || 'Los Angeles'}</Button>
                <Button href={`/adu-contractor-${(location.slug || '').replace('general-contractor-', '')}`} variant="outline">ADU Contractor in {location.city || 'Los Angeles'}</Button>
                <Button href={`/custom-home-builder-${(location.slug || '').replace('general-contractor-', '')}`} variant="outline">Custom Homes in {location.city || 'Los Angeles'}</Button>
             </div>
          </div>
        </section>
        
        <section className="bg-primary-dark py-24 border-t border-gray-800">
           <div className="container mx-auto px-4 max-w-4xl text-center">
             <h2 className="text-4xl font-serif font-bold text-white mb-6">Start Your {location.city || 'Los Angeles'} Project</h2>
             <div className="bg-white p-8 md:p-12 text-left rounded-sm shadow-xl mt-12">
               <ContactForm />
             </div>
           </div>
        </section>
      </>
    );
  }

  // --- MATRIX PAGE TEMPLATE ---
  if (matrix) {
    return (
      <>
        <ParallaxHero 
          imageSrc={`/images/services/${(matrix.service || 'general').toLowerCase().split(' ')[0]}.jpg`} // Fallback
          imageAlt={`${matrix.service || 'Service'} in ${matrix.city || 'Los Angeles'}`}
          h1Text={matrix.title || 'Construction Services'}
          h2Text={`${matrix.city || 'Los Angeles'}, CA`}
          ctaText="Get a Free Estimate"
          ctaHref="/contact"
          phoneNumber="(626) 652-2303"
        />
        <TrustBadge />
        <section className="bg-cream py-24">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex items-center space-x-4 mb-8">
              <span className="w-12 h-1 bg-primary-red"></span>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary-dark">Serving {matrix.city || 'Los Angeles'} and Surrounding Areas</h2>
            </div>
            <p className="text-lg text-body-grey leading-relaxed">
              {matrix.intro || ''}
            </p>
          </div>
        </section>
        <section className="bg-white py-24 border-t border-gray-200">
           <div className="container mx-auto px-4 max-w-4xl text-center">
             <h2 className="text-4xl font-serif font-bold text-primary-dark mb-6">Expert {matrix.service || 'Construction'} Installation</h2>
             <p className="text-xl text-body-grey mb-12">Red Stag Construction handles all permits and engineering requirements natively. Contact us today.</p>
             <div className="bg-gray-50 p-8 md:p-12 text-left border border-gray-200">
               <ContactForm />
             </div>
           </div>
        </section>
      </>
    );
  }
}
