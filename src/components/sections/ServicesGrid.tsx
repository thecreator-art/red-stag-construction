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
    <div className={`grid grid-cols-2 gap-0 lg:grid-cols-5 ${className}`}>
      {services.map((service, idx) => (
        <Link
          key={service.slug}
          href={`/${service.slug}`}
          className="group relative block aspect-[4/5] w-full cursor-pointer overflow-hidden bg-navy-deep"
        >
          <Image
            src={service.imageSrc}
            alt={service.title}
            fill
            sizes="(max-width: 768px) 50vw, 20vw"
            className="object-cover transition-all duration-300 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-all duration-300 group-hover:from-black/95 group-hover:via-black/60 group-hover:to-black/15" />

          <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
            <h3 className="font-serif text-lg font-bold leading-tight text-white drop-shadow-md md:text-xl">
              {service.title}
            </h3>
            <div className="mt-3 flex translate-y-4 items-center gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-white">
                View Details
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="h-4 w-4 text-accent-red"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </div>
        </Link>
      ))}

      <Link
        href="/contact"
        className="group relative flex aspect-[4/5] w-full cursor-pointer flex-col items-center justify-center overflow-hidden border border-gray-200 bg-[#F0EDE8] p-6 text-center transition-all duration-300 hover:bg-[#E8E4DE]"
      >
        <div className="relative mb-6 h-28 w-28">
          <Image
            src="/images/brand/deer.png"
            alt="Red Stag icon"
            fill
            sizes="112px"
            className="object-contain transition-all duration-300 group-hover:scale-105"
          />
        </div>

        <h3 className="font-serif text-2xl font-bold leading-tight text-[#1A1A1A]">
          Ready to Build?
        </h3>

        <div className="mt-5 flex items-center gap-2 text-accent-red">
          <span className="text-xs font-bold uppercase tracking-[0.18em]">
            Start Your Project
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </div>
      </Link>
    </div>
  );
};
