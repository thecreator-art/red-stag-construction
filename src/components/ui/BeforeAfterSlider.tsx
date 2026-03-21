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
  const interactionLayerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const activePointerIdRef = useRef<number | null>(null);

  const updateSliderPosition = (clientX: number, rect: DOMRect) => {
    const percentage = ((clientX - rect.left) / rect.width) * 100;
    const clampedPercentage = Math.min(100, Math.max(0, percentage));
    setSliderPosition(clampedPercentage);
  };

  const setCursor = (cursor: 'grab' | 'grabbing') => {
    if (interactionLayerRef.current) {
      interactionLayerRef.current.style.cursor = cursor;
    }
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();

    isDraggingRef.current = true;
    activePointerIdRef.current = event.pointerId;
    event.currentTarget.setPointerCapture(event.pointerId);
    setCursor('grabbing');
    updateSliderPosition(event.clientX, rect);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || activePointerIdRef.current !== event.pointerId) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    updateSliderPosition(event.clientX, rect);
  };

  const handlePointerEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    if (activePointerIdRef.current !== event.pointerId) {
      return;
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    isDraggingRef.current = false;
    activePointerIdRef.current = null;
    setCursor('grab');
  };

  return (
    <div className={`relative aspect-[3/2] w-full overflow-hidden bg-navy-deep ${className}`}>
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
        style={{
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
          willChange: 'clip-path',
        }}
      >
        <Image
          src={beforeImage}
          alt={altText}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="pointer-events-none object-cover"
        />
      </div>

      <div
        className="pointer-events-none absolute inset-y-0 z-20 w-px -translate-x-1/2 bg-accent-red shadow-[0_0_14px_rgba(0,0,0,0.45)]"
        style={{ left: `${sliderPosition}%` }}
      />

      <div
        className="pointer-events-none absolute top-1/2 z-20 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-accent-red bg-navy-deep text-white shadow-xl"
        style={{ left: `${sliderPosition}%` }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
          <path d="M8 5v14l-6-7 6-7zM16 5v14l6-7-6-7z" />
        </svg>
      </div>

      <div className="pointer-events-none absolute left-4 top-4 z-30 rounded-sm bg-navy-deep/75 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-white md:text-sm">
        {labelBefore}
      </div>
      <div className="pointer-events-none absolute right-4 top-4 z-30 rounded-sm bg-navy-deep/75 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-white md:text-sm">
        {labelAfter}
      </div>

      <div
        ref={interactionLayerRef}
        className="absolute inset-0 z-40 cursor-grab touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        aria-label="Before and after image comparison slider"
      />
    </div>
  );
};
