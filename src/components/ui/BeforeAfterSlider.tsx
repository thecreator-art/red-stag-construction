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

  const updateSliderPosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  }, []);

  const handleMove = useCallback((clientX: number) => {
    if (!isDragging) return;
    updateSliderPosition(clientX);
  }, [isDragging, updateSliderPosition]);

  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    updateSliderPosition(clientX);
  };

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
      className={`group relative w-full aspect-[3/2] overflow-hidden select-none touch-none bg-navy-deep ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} ${className}`}
      onMouseDown={(event) => handleDragStart(event.clientX)}
      onTouchStart={(event) => handleDragStart(event.touches[0].clientX)}
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
    </div>
  );
};
