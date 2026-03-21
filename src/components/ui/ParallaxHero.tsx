'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export interface ParallaxHeroProps {
  imageSrc: string;
  imageAlt: string;
  h1Text: string;
  h2Text: string;
  ctaText: string;
  ctaHref: string;
  phoneNumber: string;
  className?: string;
}

export const ParallaxHero = ({
  imageSrc,
  imageAlt,
  h1Text,
  h2Text,
  ctaText,
  ctaHref,
  phoneNumber,
  className = ''
}: ParallaxHeroProps) => {
  const router = useRouter();
  const bgRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    // Highly optimized passive scroll capturing window.scrollY without triggering React render cycles.
    const handleScroll = () => {
      if (bgRef.current) {
        // Apply transform exclusively to the DOM node
        bgRef.current.style.transform = `translateY(${window.scrollY * 0.5}px)`;
      }
    };

    // Attach passive listener safely to the browser window
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Explicitly pulse the initial state payload against hydration
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleQuickQuoteSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    const formData = new FormData(e.currentTarget);

    if (formData.get('_honey')) {
      setIsSubmitting(false);
      return;
    }

    const payload = {
      fullName: formData.get('fullName'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      message: formData.get('message'),
      source: 'hero_quick_quote',
    };

    try {
      const webhookUrl = process.env.NEXT_PUBLIC_GHL_WEBHOOK_URL || '';
      if (!webhookUrl) {
        throw new Error('Missing webhook configuration');
      }

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Lead submission failed');
      }

      const gtag = typeof window !== 'undefined'
        ? (window as Window & { gtag?: (...args: unknown[]) => void }).gtag
        : undefined;

      if (gtag) {
        gtag('event', 'contact_form_submitted', {
          service_type: 'Quick Quote',
          city: 'Los Angeles',
          page_location: window.location.href,
        });
      }

      router.push('/thank-you');
    } catch {
      setErrorMsg('There was an error submitting your request. Please call (626) 652-2303.');
      setIsSubmitting(false);
    }
  };

  return (
    <section className={`relative flex min-h-[760px] w-full items-center justify-center overflow-hidden md:min-h-[860px] ${className}`}>
      
      {/* Background Image Container mapped directly to the passive scroll ref */}
      <div 
        ref={bgRef}
        className="absolute top-0 left-0 w-full h-[120%] -z-20 origin-top will-change-transform"
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Lighter overlay keeps text legible without burying the photo */}
      <div className="absolute inset-0 bg-black/40 -z-10" />

      {/* Hero Interactive Geometry */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-6 pt-28 text-center md:px-12 md:pt-24">
        
        {/* Mobile Header Direct Dial (Above the fold dynamic rendering) */}
        <div className="md:hidden mb-10 border border-white/20 bg-navy-deep/40 px-6 py-2.5 rounded-full backdrop-blur-sm shadow-xl">
          <a href={`tel:${phoneNumber.replace(/[^0-9]/g, '')}`} className="text-white font-extrabold tracking-widest text-sm flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2 text-accent-red">
              <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75v-2.25Z" clipRule="evenodd" />
            </svg>
            {phoneNumber}
          </a>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-tight mb-6 drop-shadow-2xl max-w-5xl">
          {h1Text}
        </h1>
        
        <h2 className="text-lg md:text-2xl text-gray-200 font-medium mb-12 max-w-3xl drop-shadow-md leading-relaxed">
          {h2Text}
        </h2>

        <form
          onSubmit={handleQuickQuoteSubmit}
          className="mb-8 w-full max-w-6xl rounded-sm border border-white/25 bg-white/95 px-4 py-3 text-left shadow-[0_18px_50px_rgba(10,24,38,0.28)] backdrop-blur-sm md:px-5 md:py-4"
        >
          <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />
          <div className="grid gap-3 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-center">
            <div className="flex items-center px-2 text-center lg:text-left">
              <h3 className="font-serif text-3xl font-bold text-[#1A1A1A]">
                Start your quote.
              </h3>
            </div>

            <div>
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-[1fr_1fr_1fr_1.25fr_auto]">
                <input
                  required
                  type="text"
                  name="fullName"
                  placeholder="Name"
                  className="h-12 min-w-0 rounded-sm border border-[#d9d1c5] bg-[#F8F6F2] px-4 text-sm text-[#1A1A1A] outline-none transition-colors placeholder:text-[#6B7280] focus:border-accent-red"
                />
                <input
                  required
                  type="tel"
                  name="phone"
                  placeholder="Number"
                  className="h-12 min-w-0 rounded-sm border border-[#d9d1c5] bg-[#F8F6F2] px-4 text-sm text-[#1A1A1A] outline-none transition-colors placeholder:text-[#6B7280] focus:border-accent-red"
                />
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="h-12 min-w-0 rounded-sm border border-[#d9d1c5] bg-[#F8F6F2] px-4 text-sm text-[#1A1A1A] outline-none transition-colors placeholder:text-[#6B7280] focus:border-accent-red"
                />
                <input
                  required
                  type="text"
                  name="message"
                  placeholder="Project details"
                  className="h-12 min-w-0 rounded-sm border border-[#d9d1c5] bg-[#F8F6F2] px-4 text-sm text-[#1A1A1A] outline-none transition-colors placeholder:text-[#6B7280] focus:border-accent-red"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-12 min-w-[170px] rounded-sm bg-accent-red px-6 text-sm font-extrabold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#990000] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? 'Sending...' : 'Get Estimate'}
                </button>
              </div>
            </div>
          </div>
          {errorMsg ? (
            <p className="mt-3 text-sm font-medium text-accent-red">{errorMsg}</p>
          ) : null}
        </form>
      </div>
      
    </section>
  );
};
