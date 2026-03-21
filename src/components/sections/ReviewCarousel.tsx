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
    if (platform === 'Google') return <span className="font-extrabold text-blue-400">G</span>;
    if (platform === 'Yelp') return <span className="font-extrabold text-red-500">Y</span>;
    if (platform === 'Houzz') return <span className="font-extrabold text-green-500">H</span>;
    return null;
  };

  return (
    <div 
      className={`relative w-full bg-[#1A1A1A] py-20 px-6 md:px-12 overflow-hidden ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Core Nav controls mapping exactly to the local iterator limiters */}
        <div className="flex justify-between items-end mb-10 border-b border-gray-800 pb-6">
          <h2 className="text-3xl md:text-4xl font-serif text-white font-bold leading-tight">Client Reviews</h2>
          <div className="flex space-x-3">
            <button onClick={prevSlide} className="p-3 bg-[#222] hover:bg-primary-red transition-colors text-white shadow-xl">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
            </button>
            <button onClick={nextSlide} className="p-3 bg-[#222] hover:bg-primary-red transition-colors text-white shadow-xl">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
            </button>
          </div>
        </div>

        {/* Component Grid Projection handling responsive 1 column > 3 column mapping blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {visibleReviews.map((review, i) => (
            <div 
              key={`${review.id}-${i}`} 
              className={`bg-[#111] border-t-4 border-primary-red p-8 shadow-2xl flex flex-col justify-between h-full ${i > 0 ? 'hidden md:flex' : 'flex'}`}
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  {/* Dynamic star injection tracking discrete integer payloads */}
                  <div className="flex items-center space-x-1 text-yellow-400">
                    {[...Array(review.rating)].map((_, idx) => (
                      <svg key={idx} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" /></svg>
                    ))}
                  </div>
                  <div className="flex items-center justify-center w-8 h-8 bg-black rounded-full text-xs shadow-md">
                    {getPlatformIcon(review.platform)}
                  </div>
                </div>
                <p className="text-gray-300 italic mb-10 leading-relaxed font-serif">"{review.text}"</p>
              </div>
              <div className="text-white font-extrabold tracking-widest text-xs uppercase opacity-80">{review.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
