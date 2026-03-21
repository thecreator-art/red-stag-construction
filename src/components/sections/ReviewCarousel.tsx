'use client';
import { useState, useEffect, useCallback } from 'react';

export interface Review {
  id: string;
  name: string;
  platform: 'Google' | 'Yelp' | 'Houzz';
  rating: number;
  text: string;
}

interface ReviewCarouselProps {
  reviews: Review[];
  className?: string;
}

export const ReviewCarousel = ({ reviews, className = '' }: ReviewCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  }, [reviews.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  if (!reviews || reviews.length === 0) return null;

  // Extract active chunk bounds via dynamic modulo spanning arrays safely
  const getVisibleReviews = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(reviews[(currentIndex + i) % reviews.length]);
    }
    return visible;
  };

  const visibleReviews = getVisibleReviews();

  const getPlatformIcon = (platform: string) => {
    if (platform === 'Google') {
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.55-.2-2.27H12v4.3h6.45a5.52 5.52 0 0 1-2.39 3.62v3h3.87c2.26-2.08 3.56-5.15 3.56-8.65Z" />
          <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.95-2.91l-3.87-3c-1.07.72-2.43 1.15-4.08 1.15-3.13 0-5.78-2.11-6.72-4.95H1.28v3.1A12 12 0 0 0 12 24Z" />
          <path fill="#FBBC05" d="M5.28 14.29A7.2 7.2 0 0 1 4.91 12c0-.79.14-1.55.37-2.29v-3.1H1.28A12 12 0 0 0 0 12c0 1.94.46 3.78 1.28 5.39l4-3.1Z" />
          <path fill="#EA4335" d="M12 4.77c1.76 0 3.33.61 4.57 1.8l3.43-3.43C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.28 6.61l4 3.1c.94-2.84 3.59-4.94 6.72-4.94Z" />
        </svg>
      );
    }
    if (platform === 'Yelp') {
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="#CC0000"
            d="M12.72 1.4c.64.2 1.08.78 1.08 1.45v5.55c0 .8-.65 1.45-1.45 1.45-.36 0-.71-.13-.98-.38L8.01 6.1a1.46 1.46 0 0 1-.2-1.88l2.08-2.94c.57-.8 1.8-.38 1.83.12Zm-5.9 6.35c.52-.43 1.26-.48 1.83-.12l4.8 3.02c.68.43.89 1.32.46 2-.16.26-.4.46-.68.58l-4.97 2.06a1.46 1.46 0 0 1-1.8-.59l-1.83-3.1a1.45 1.45 0 0 1 .39-1.85Zm2.9 9.76a1.45 1.45 0 0 1 1.39-.39l5.2 1.2c.78.18 1.28.96 1.1 1.74-.07.3-.22.57-.43.78l-2.88 2.72c-.42.39-1.01.52-1.56.35l-3.5-1.13a1.45 1.45 0 0 1-.99-1.7l.67-3.57Zm8.3-2.2c-.37-.77-.04-1.69.73-2.06l4.8-2.31c.74-.35 1.62-.03 1.97.7.13.27.17.58.11.87l-.78 3.88c-.1.52-.48.95-.98 1.12l-3.54 1.14a1.46 1.46 0 0 1-1.8-.78l-.5-1.56Zm-1.1-7.18c-.78-.12-1.31-.85-1.2-1.62l.64-5.3c.1-.82.84-1.4 1.66-1.31.3.04.58.16.82.35l2.97 2.35c.4.32.62.81.58 1.32l-.22 3.71a1.46 1.46 0 0 1-1.65 1.36l-3.6-.86Z"
          />
        </svg>
      );
    }
    if (platform === 'Houzz') {
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="#4DBC15" d="M3 3h5.4v7.6h7.2V3H21v18h-5.4v-6.2H8.4V21H3V3Z" />
        </svg>
      );
    }
    return null;
  };

  return (
    <div 
      className={`relative w-full bg-navy-deep py-20 px-6 md:px-12 overflow-hidden ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Core Nav controls mapping exactly to the local iterator limiters */}
        <div className="flex justify-between items-end mb-10 border-b border-gray-800 pb-6">
          <h2 className="text-3xl md:text-4xl font-serif text-white font-bold leading-tight">Client Reviews</h2>
          <div className="flex space-x-3">
            <button onClick={prevSlide} className="p-3 bg-[#222] hover:bg-accent-red transition-colors text-white shadow-xl">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
            </button>
            <button onClick={nextSlide} className="p-3 bg-[#222] hover:bg-accent-red transition-colors text-white shadow-xl">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
            </button>
          </div>
        </div>

        {/* Component Grid Projection handling responsive 1 column > 3 column mapping blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {visibleReviews.map((review, i) => (
            <div 
              key={`${review.id}-${i}`} 
              className={`bg-navy-deep border-t-4 border-accent-red p-8 shadow-2xl flex flex-col justify-between h-full ${i > 0 ? 'hidden md:flex' : 'flex'}`}
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  {/* Dynamic star injection tracking discrete integer payloads */}
                  <div className="flex items-center space-x-1 text-yellow-400">
                    {[...Array(review.rating)].map((_, idx) => (
                      <svg key={idx} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" /></svg>
                    ))}
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md">
                    {getPlatformIcon(review.platform)}
                  </div>
                </div>
                <p className="text-gray-300 italic mb-10 leading-relaxed font-serif">&ldquo;{review.text}&rdquo;</p>
              </div>
              <div className="text-white font-extrabold tracking-widest text-xs uppercase opacity-80">{review.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
