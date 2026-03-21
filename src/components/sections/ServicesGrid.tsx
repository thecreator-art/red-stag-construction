'use client';
import Link from 'next/link';
import Image from 'next/image';

export interface ServiceTile {
  slug: string;
  title: string;
  imageSrc: string;
}

export interface ServicesGridProps {
  services: ServiceTile[];
  className?: string;
}

export const ServicesGrid = ({ services, className = '' }: ServicesGridProps) => {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-0 ${className}`}>
      {services.map((service, idx) => (
        <Link 
          key={idx} 
          href={`/${service.slug}`}
          className="group relative w-full aspect-[4/5] overflow-hidden block bg-[#1A1A1A]"
        >
          <Image 
            src={service.imageSrc} 
            alt={service.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
          />
          {/* Default Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-colors duration-500 group-hover:bg-navy-light/80" />
          
          {/* Default Visible Title (bottom left) */}
          <div className="absolute bottom-6 left-6 right-6 transition-all duration-500 group-hover:-translate-y-6">
            <h3 className="text-white font-bold text-lg md:text-xl leading-tight font-serif drop-shadow-md">
              {service.title}
            </h3>
          </div>

          {/* Hover Arrow/Action */}
          <div className="absolute bottom-6 left-6 opacity-0 transition-all duration-500 translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 flex items-center text-accent-red">
            <span className="text-xs font-bold tracking-widest uppercase mr-2 text-white/90">View Details</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4 text-accent-red">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </div>
        </Link>
      ))}
    </div>
  );
};
