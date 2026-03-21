'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { TrustBadge } from './TrustBadge';

export interface ParallaxHeroProps {
  imageSrc: string;
  imageAlt: string;
  h1Text: string;
  h2Text: string;
  ctaText: string;
  ctaHref: string;
  phoneNumber: string;
  className?: string;
}

export const ParallaxHero = ({
  imageSrc,
  imageAlt,
  h1Text,
  h2Text,
  ctaText,
  ctaHref,
  phoneNumber,
  className = ''
}: ParallaxHeroProps) => {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Highly optimized passive scroll capturing window.scrollY without triggering React render cycles.
    const handleScroll = () => {
      if (bgRef.current) {
        // Apply transform exclusively to the DOM node
        bgRef.current.style.transform = `translateY(${window.scrollY * 0.5}px)`;
      }
    };

    // Attach passive listener safely to the browser window
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Explicitly pulse the initial state payload against hydration
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className={`relative w-full h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden ${className}`}>
      
      {/* Background Image Container mapped directly to the passive scroll ref */}
      <div 
        ref={bgRef}
        className="absolute top-0 left-0 w-full h-[120%] -z-20 origin-top will-change-transform"
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Dark Overlay @ 0.6 opacity structural constraint */}
      <div className="absolute inset-0 bg-navy-deep/60 -z-10" />

      {/* Hero Interactive Geometry */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center text-center mt-12 md:mt-0">
        
        {/* Mobile Header Direct Dial (Above the fold dynamic rendering) */}
        <div className="md:hidden mb-10 border border-white/20 bg-navy-deep/40 px-6 py-2.5 rounded-full backdrop-blur-sm shadow-xl">
          <a href={`tel:${phoneNumber.replace(/[^0-9]/g, '')}`} className="text-white font-extrabold tracking-widest text-sm flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2 text-accent-red">
              <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75v-2.25Z" clipRule="evenodd" />
            </svg>
            {phoneNumber}
          </a>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-tight mb-6 drop-shadow-2xl max-w-5xl">
          {h1Text}
        </h1>
        
        <h2 className="text-lg md:text-2xl text-gray-200 font-medium mb-12 max-w-3xl drop-shadow-md leading-relaxed">
          {h2Text}
        </h2>

        {/* Central TrustBadge Integration */}
        <TrustBadge className="mb-12 scale-90 md:scale-100 opacity-95" />

        <Link href={ctaHref} className="bg-accent-red hover:bg-[#990000] transition-all text-white font-extrabold tracking-widest uppercase px-12 py-5 rounded-sm shadow-2xl hover:shadow-[0_0_20px_rgba(179,18,23,0.4)] hover:-translate-y-1 duration-300 border border-accent-red/50">
          {ctaText}
        </Link>
      </div>
      
    </section>
  );
};
