'use client';
import Link from 'next/link';
import { BeforeAfterSlider } from '../ui/BeforeAfterSlider';

export const FeaturedProjects = () => {
  const projects = [
    { id: '1', title: 'Trousdale Estates Renovation', city: 'Beverly Hills', serviceType: 'Custom Home Build', beforeImage: '/images/projects/trousdale-before.jpg', afterImage: '/images/projects/trousdale-after.jpg' },
    { id: '2', title: 'Canyon Modern ADU Addition', city: 'Sherman Oaks', serviceType: 'ADU Construction', beforeImage: 'https://images.unsplash.com/photo-1542316527-0cf75cce9697?q=80&w=800', afterImage: '/images/projects/project-2.jpg' },
    { id: '3', title: 'Bel Air Primary Suite Expansion', city: 'Bel Air', serviceType: 'Bathroom Remodel', beforeImage: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=800', afterImage: '/images/projects/project-3.jpg' },
    { id: '4', title: 'Chef\'s Kitchen Open Concept', city: 'Studio City', serviceType: 'Kitchen Remodel', beforeImage: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800', afterImage: '/images/projects/project-4.jpg' },
    { id: '5', title: 'Hillside Structural Reinforcement', city: 'Pacific Palisades', serviceType: 'General Contracting', beforeImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800', afterImage: '/images/projects/project-5.jpg' },
    { id: '6', title: 'Historic Craftsman Restoration', city: 'Silver Lake', serviceType: 'Home Addition', beforeImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800', afterImage: '/images/projects/project-6.jpg' },
  ];

  return (
    <section className="w-full bg-[#111] py-24 md:py-32 px-6 md:px-12 border-y border-gray-900">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-gray-800 pb-10">
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white font-bold leading-tight">Featured Projects</h2>
            <p className="text-gray-400 mt-4 max-w-xl text-lg">Move the sliders below to see the dramatic transformations achieved by our integrated design-build teams across Los Angeles.</p>
          </div>
          <div className="mt-8 md:mt-0">
            <Link href="/our-work" className="inline-flex items-center text-accent-red font-bold uppercase tracking-widest text-sm hover:text-white transition-colors">
              View All Work
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4 ml-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          {projects.map(project => (
            <div key={project.id} className="bg-[#1A1A1A] rounded-sm overflow-hidden border border-gray-800 shadow-2xl group flex flex-col">
              <BeforeAfterSlider 
                beforeImage={project.beforeImage} 
                afterImage={project.afterImage} 
                altText={`${project.title} Before and After`}
              />
              <div className="p-8 md:p-10 flex flex-col flex-grow justify-between border-t border-gray-800">
                <div>
                  <div className="flex flex-col xl:flex-row xl:justify-between items-start xl:items-center mb-6 gap-4">
                    <h3 className="text-2xl md:text-3xl font-serif text-white leading-tight">{project.title}</h3>
                    <span className="text-accent-red font-bold text-[10px] md:text-xs tracking-widest uppercase border border-accent-red/30 px-3 py-1.5 bg-accent-red/10 whitespace-nowrap rounded-sm">{project.city}</span>
                  </div>
                  <p className="text-gray-400 text-sm md:text-base">{project.serviceType}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/our-work" className="inline-block bg-[#1A1A1A] hover:bg-accent-red border border-gray-700 hover:border-accent-red transition-all text-white font-extrabold tracking-widest uppercase px-12 py-5 rounded-sm shadow-xl hover:-translate-y-1 duration-300">
            Explore Portfolio
          </Link>
        </div>
      </div>
    </section>
  );
};
