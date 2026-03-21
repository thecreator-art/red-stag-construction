'use client';
import Link from 'next/link';

export const StickyMobileHeader = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-navy-deep border-b border-gray-800 text-white h-16 flex items-center justify-between px-4 md:hidden shadow-xl">
      
      {/* Left: Standard Branding */}
      <Link href="/" className="flex items-center text-accent-red font-serif font-bold text-lg leading-none">
        Red Stag
      </Link>

      {/* Center: Immediate Direct Phone Protocol */}
      <a href="tel:6266522303" className="flex items-center font-extrabold tracking-widest text-white text-xs">
        (626) 652-2303
      </a>

      {/* Right: Pathing CTA Block */}
      <Link href="/contact" className="bg-accent-red text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-2 rounded-sm whitespace-nowrap truncate">
        Get Estimate
      </Link>
      
    </div>
  );
};
