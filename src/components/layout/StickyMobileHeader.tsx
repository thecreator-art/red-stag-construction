'use client';
import Link from 'next/link';

export const StickyMobileHeader = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-navy-deep border-b border-gray-800 text-white h-16 flex items-center justify-between px-4 md:hidden shadow-xl">
      
      {/* Left: Standard Branding */}
      <Link href="/" className="flex min-h-11 items-center text-accent-red font-serif font-bold text-lg leading-none">
        Red Stag
      </Link>

      {/* Center: Immediate Direct Phone Protocol */}
      <a href="tel:3239224235" className="flex min-h-11 items-center font-extrabold tracking-widest text-white text-xs">
        (323) 922-4235
      </a>

      {/* Right: Pathing CTA Block */}
      <Link href="/contact" className="cta cta-sm">
        Get Estimate
      </Link>
      
    </div>
  );
};
