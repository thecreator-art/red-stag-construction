import React from 'react';
import Link from 'next/link';

export const TrustBadge = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`bg-warm-white py-6 border-y border-mid-grey/30 ${className}`.trim()}>
      <div className="container mx-auto px-4 flex flex-wrap justify-center items-center gap-6 md:gap-12 text-sm font-bold text-text-dark uppercase tracking-wider text-center">
        <div className="flex items-center space-x-2">
          <span>🛡️</span>
          <span>License #964664</span>
        </div>
        <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-accent-red"></div>
        <div className="flex items-center space-x-2">
          <span>🏛️</span>
          <span>Est. 2011</span>
        </div>
        <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-accent-red"></div>
        <div className="flex items-center space-x-2">
          <span>📍</span>
          <span>Studio City</span>
        </div>
        <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-accent-red"></div>
        <div className="flex items-center space-x-2">
          <span>🏗️</span>
          <span>100+ Projects</span>
        </div>
        <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-accent-red"></div>
        <div className="flex items-center space-x-2">
          <span className="text-accent-red">★★★★★</span>
          <span>5-Star</span>
        </div>
      </div>
    </div>
  );
};
