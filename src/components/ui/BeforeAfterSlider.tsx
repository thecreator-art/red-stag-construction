'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';

export interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  labelBefore?: string;
  labelAfter?: string;
  className?: string;
  altText?: string;
}

export const BeforeAfterSlider = ({
  beforeImage,
  afterImage,
  labelBefore = 'BEFORE',
  labelAfter = 'AFTER',
  className = '',
  altText = 'Before and After Project Comparison',
}: BeforeAfterSliderProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const activePointerIdRef = useRef<number | null>(null);

  const getSliderPosition = (clientX: number, rect: DOMRect) => {
    const rawPercentage = ((clientX - rect.left) / rect.width) * 100;
    return Math.min(100, Math.max(0, rawPercentage));
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    activePointerIdRef.current = event.pointerId;
    event.currentTarget.setPointerCapture(event.pointerId);
    setSliderPosition(getSliderPosition(event.clientX, rect));
    setIsDragging(true);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || activePointerIdRef.current !== event.pointerId) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    setSliderPosition(getSliderPosition(event.clientX, rect));
  };

  const handlePointerEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    if (activePointerIdRef.current !== event.pointerId) {
      return;
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    activePointerIdRef.current = null;
    setIsDragging(false);
  };

  return (
    <div
      className={`relative aspect-[3/2] w-full select-none overflow-hidden bg-navy-deep ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} ${className}`}
      style={{ touchAction: 'none' }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
    >
      <Image
        src={afterImage}
        alt={altText}
        fill
        priority
        sizes="(max-width: 768px) 100vw, 50vw"
        className="pointer-events-none object-cover"
      />

      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image
          src={beforeImage}
          alt={altText}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      <div
        className="pointer-events-none absolute inset-y-0 z-10 flex w-px -translate-x-1/2 items-center justify-center bg-accent-red shadow-[0_0_15px_rgba(0,0,0,0.55)]"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className={`flex h-11 w-11 items-center justify-center rounded-full border-2 border-accent-red bg-navy-deep text-white shadow-xl ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
            <path d="M8 5v14l-6-7 6-7zM16 5v14l6-7-6-7z" />
          </svg>
        </div>
      </div>

      <div className="pointer-events-none absolute left-4 top-4 z-20 rounded-sm bg-navy-deep/75 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-white md:text-sm">
        {labelBefore}
      </div>
      <div className="pointer-events-none absolute right-4 top-4 z-20 rounded-sm bg-navy-deep/75 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-white md:text-sm">
        {labelAfter}
      </div>
    </div>
  );
};
