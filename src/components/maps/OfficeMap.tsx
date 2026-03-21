'use client';
import dynamic from 'next/dynamic';

const MapInner = dynamic(() => import('./_OfficeMapInner'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-[#1A1A1A] animate-pulse flex items-center justify-center border border-gray-800">
      <div className="text-gray-500 uppercase tracking-widest text-xs font-bold flex flex-col items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mb-2 animate-bounce">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
        </svg>
        <span>Loading Coordinate Data</span>
      </div>
    </div>
  )
});

export const OfficeMap = ({ className = '' }: { className?: string }) => {
  return <MapInner className={className} />;
};
