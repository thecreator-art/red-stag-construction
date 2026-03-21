'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
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

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current || !isDragging) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  }, [isDragging]);

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX);
    const handleTouchMove = (e: TouchEvent) => {
      // Prevent the page from scrolling on mobile while dragging the handle
      e.preventDefault();
      handleMove(e.touches[0].clientX);
    };

    if (isDragging) {
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchend', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
    }
    
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isDragging, handleMove]);

  return (
    <div 
      ref={containerRef}
      className={`relative w-full aspect-[3/2] overflow-hidden select-none cursor-ew-resize bg-black ${className}`}
      onMouseDown={() => setIsDragging(true)}
      onTouchStart={() => setIsDragging(true)}
    >
      {/* After Image (Background) */}
      <Image 
        src={afterImage} 
        alt={altText}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover absolute inset-0 pointer-events-none" 
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
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover" 
        />
      </div>
      
      {/* Slider Handle & Divider */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-primary-red cursor-ew-resize pointer-events-none flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.8)] z-10"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        <div className="w-10 h-10 rounded-full bg-[#1A1A1A] shadow-xl flex items-center justify-center border-2 border-primary-red pointer-events-auto transition-transform hover:scale-110">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
            <path d="M8 5v14l-6-7 6-7zM16 5v14l6-7-6-7z"/>
          </svg>
        </div>
      </div>
      
      {/* Labels */}
      <div className="absolute top-4 left-4 bg-black/70 text-white text-xs md:text-sm px-3 py-1.5 font-bold tracking-widest rounded-sm pointer-events-none uppercase">{labelBefore}</div>
      <div className="absolute top-4 right-4 bg-black/70 text-white text-xs md:text-sm px-3 py-1.5 font-bold tracking-widest rounded-sm pointer-events-none uppercase">{labelAfter}</div>
    </div>
  );
};
