'use client';
import { useState, useRef, useCallback } from 'react';
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
  altText = 'Before and After Project Comparison'
}: BeforeAfterSliderProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const activePointerId = useRef<number | null>(null);

  const updateSliderPosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  }, []);

  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    updateSliderPosition(clientX);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    activePointerId.current = event.pointerId;
    event.currentTarget.setPointerCapture(event.pointerId);
    handleDragStart(event.clientX);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || activePointerId.current !== event.pointerId) return;
    updateSliderPosition(event.clientX);
  };

  const handlePointerEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    if (activePointerId.current !== event.pointerId) return;
    setIsDragging(false);
    activePointerId.current = null;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`group relative w-full aspect-[3/2] overflow-hidden select-none bg-navy-deep ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} ${className}`}
      style={{ touchAction: 'none' }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
      onPointerLeave={handlePointerEnd}
    >
      {/* After Image (Background) */}
      <Image 
        src={afterImage} 
        alt={altText}
        fill
        priority
        sizes="(max-width: 768px) 100vw, 50vw"
        className="absolute inset-0 object-cover pointer-events-none transition-transform duration-500 group-hover:scale-105" 
      />
      
      {/* Before Image (Clipped) */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image 
          src={beforeImage} 
          alt={altText}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105" 
        />
      </div>
      
      {/* Slider Handle & Divider */}
      <div 
        className="absolute top-0 bottom-0 z-10 flex w-1 pointer-events-none items-center justify-center bg-accent-red shadow-[0_0_15px_rgba(0,0,0,0.8)]"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        <div className={`pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border-2 border-accent-red bg-navy-deep shadow-xl transition-transform hover:scale-110 ${isDragging ? 'cursor-grabbing scale-110' : 'cursor-grab'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
            <path d="M8 5v14l-6-7 6-7zM16 5v14l6-7-6-7z"/>
          </svg>
        </div>
      </div>
      
      {/* Labels */}
      <div className="pointer-events-none absolute left-4 top-4 z-20 rounded-sm bg-navy-deep/70 px-3 py-1.5 text-xs font-bold tracking-widest text-white uppercase md:text-sm">{labelBefore}</div>
      <div className="pointer-events-none absolute right-4 top-4 z-20 rounded-sm bg-navy-deep/70 px-3 py-1.5 text-xs font-bold tracking-widest text-white uppercase md:text-sm">{labelAfter}</div>

      <div className="absolute inset-0 z-[5]" aria-hidden="true" />
    </div>
  );
};
