// Static markup. The reviews are repeated four times so the strip can loop.
// Auto-scroll and drag are handled by src/scripts/site.ts ([data-ticker]);
// without JavaScript it is a normal horizontally scrollable row.

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
  if (!reviews || reviews.length === 0) return null;

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
        <img src="/images/brand/yelp-icon.png" alt="Yelp" width={20} height={20} className="object-contain" />
      );
    }
    if (platform === 'Houzz') {
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="#4DBC15" d="M5 2h5v8.15l9 2.54V22h-5v-7h-4v7H5V2Z" />
        </svg>
      );
    }
    return null;
  };

  return (
    <section className={`relative w-full overflow-hidden bg-[#F0EDE8] px-6 py-20 md:px-12 ${className}`}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 border-b border-[#d9d1c5] pb-6">
          <h2 className="text-3xl font-serif font-bold leading-tight text-navy-deep md:text-4xl">Client Reviews</h2>
        </div>

        <div
          data-ticker
          className="scrollbar-none relative z-[1] flex cursor-grab touch-pan-x select-none overflow-x-auto overflow-y-hidden"
        >
          <div className="flex w-max gap-8 px-4">
            {/* Render 4 identical groups to guarantee infinite visual bleed in both directions */}
            {[0, 1, 2, 3].map((groupIndex) => (
              <div 
                key={groupIndex}
                data-ticker-group
                aria-hidden={groupIndex === 0 ? undefined : true}
                className="ticker-group flex gap-8"
              >
                {reviews.map((review) => (
                  <article
                    key={`${groupIndex}-${review.id}`}
                    className="group flex h-[320px] w-[320px] shrink-0 flex-col justify-between border-t-4 border-accent-red bg-white p-8 shadow-[0_16px_40px_rgba(15,43,68,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(15,43,68,0.18)] md:w-[360px]"
                  >
                    <div>
                      <div className="mb-6 flex items-start justify-between">
                        <div className="flex items-center space-x-1 text-yellow-400">
                          {[...Array(review.rating)].map((_, idx) => (
                            <svg key={idx} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                              <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                            </svg>
                          ))}
                        </div>
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md">
                          {getPlatformIcon(review.platform)}
                        </div>
                      </div>
                      <p className="line-clamp-6 font-serif italic leading-relaxed text-navy-deep transition-colors duration-300 group-hover:text-[#1A1A1A]">
                        &ldquo;{review.text}&rdquo;
                      </p>
                    </div>
                    <div className="text-xs font-extrabold uppercase tracking-widest text-[#1A1A1A] opacity-80">
                      {review.name}
                    </div>
                  </article>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};
