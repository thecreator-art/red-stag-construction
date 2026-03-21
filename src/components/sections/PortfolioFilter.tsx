'use client';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BeforeAfterSlider } from '../ui/BeforeAfterSlider';

export interface PortfolioProject {
  id: string;
  title: string;
  serviceType: string;
  city: string;
  beforeImage: string;
  afterImage: string;
}

export interface PortfolioFilterProps {
  projects: PortfolioProject[];
  className?: string;
}

export const PortfolioFilter = ({ projects, className = '' }: PortfolioFilterProps) => {
  const [activeService, setActiveService] = useState<string | null>(null);
  const [activeCity, setActiveCity] = useState<string | null>(null);

  const services = useMemo(() => Array.from(new Set(projects.map(p => p.serviceType))), [projects]);
  const cities = useMemo(() => Array.from(new Set(projects.map(p => p.city))), [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      if (activeService && p.serviceType !== activeService) return false;
      if (activeCity && p.city !== activeCity) return false;
      return true;
    });
  }, [projects, activeService, activeCity]);

  return (
    <div className={`w-full ${className}`}>
      {/* Filter Controls */}
      <div className="flex flex-col md:flex-row gap-8 mb-16">
        <div className="flex-1">
          <h4 className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-4">Filter by Service</h4>
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setActiveService(null)}
              className={`px-5 py-2 text-xs font-bold tracking-wider uppercase border transition-all duration-300 ${!activeService ? 'bg-primary-red border-primary-red text-white' : 'border-gray-700 text-gray-400 hover:border-white hover:text-white bg-black/50'}`}
            >
              All Services
            </button>
            {services.map(service => (
              <button 
                key={service}
                onClick={() => setActiveService(service)}
                className={`px-5 py-2 text-xs font-bold tracking-wider uppercase border transition-all duration-300 ${activeService === service ? 'bg-primary-red border-primary-red text-white' : 'border-gray-700 text-gray-400 hover:border-white hover:text-white bg-black/50'}`}
              >
                {service}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex-1">
          <h4 className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-4">Filter by Area</h4>
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setActiveCity(null)}
              className={`px-5 py-2 text-xs font-bold tracking-wider uppercase border transition-all duration-300 ${!activeCity ? 'bg-white border-white text-black' : 'border-gray-700 text-gray-400 hover:border-white hover:text-white bg-black/50'}`}
            >
              All Areas
            </button>
            {cities.map(city => (
              <button 
                key={city}
                onClick={() => setActiveCity(city)}
                className={`px-5 py-2 text-xs font-bold tracking-wider uppercase border transition-all duration-300 ${activeCity === city ? 'bg-white border-white text-black' : 'border-gray-700 text-gray-400 hover:border-white hover:text-white bg-black/50'}`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map(project => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              key={project.id}
              className="group flex flex-col bg-[#111111] rounded-sm overflow-hidden border border-gray-800 shadow-xl"
            >
              <div className="overflow-hidden">
                <BeforeAfterSlider 
                  beforeImage={project.beforeImage} 
                  afterImage={project.afterImage} 
                  altText={`${project.title} Before and After`}
                />
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl md:text-3xl font-serif text-white leading-tight">{project.title}</h3>
                    <span className="text-primary-red font-bold text-xs tracking-widest uppercase border border-primary-red/30 px-3 py-1.5 bg-primary-red/10 whitespace-nowrap ml-4 rounded-sm">{project.city}</span>
                  </div>
                  <p className="text-gray-400 text-sm md:text-base mb-6 border-b border-gray-800 pb-6">{project.serviceType}</p>
                </div>
                
                <div className="flex items-center text-white/50 group-hover:text-white transition-colors">
                  <span className="text-xs font-bold tracking-[0.2em] uppercase mr-3">View Project Case</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredProjects.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="col-span-1 lg:col-span-2 py-32 text-center text-gray-500 border border-dashed border-gray-700 flex flex-col items-center justify-center bg-[#0a0a0a]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mb-4 opacity-50">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <p className="text-lg uppercase tracking-wider font-bold">No Projects Match Selected Filters</p>
            <p className="text-sm mt-2 max-w-md">Try adjusting your filters to see more of our completed construction and remodeling work across Los Angeles.</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
