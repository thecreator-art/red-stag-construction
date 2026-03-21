import Link from 'next/link';

export const SplitBreakCTA = () => {
  return (
    <section className="relative z-20 flex w-full items-center justify-center overflow-hidden border-y border-gray-900 px-6 py-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] md:py-16">
      {/* Background Image Loading Payload */}
      <div className="absolute inset-0 -z-20">
        <img 
          src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000" 
          alt="Luxury Construction Framework"
          className="w-full h-full object-cover object-center filter grayscale contrast-125"
        />
      </div>
      
      {/* Opacity Mask */}
      <div className="absolute inset-0 bg-navy-deep/80 -z-10" />

      {/* Conversion Hierarchy */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-8 text-center lg:gap-6">
        <div className="max-w-4xl">
          <h2 className="text-2xl font-serif font-bold leading-tight text-white drop-shadow-2xl md:text-3xl">
            Ready to Build Something That Lasts?
          </h2>
          <p className="mt-3 text-base font-medium text-gray-300 drop-shadow-md md:text-lg">
            Our schedule fills 6-8 weeks out. The sooner we talk, the sooner we build.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
          <a href="tel:6266522303" className="block text-3xl font-extrabold tracking-wider text-white transition-colors hover:text-accent-red md:text-4xl">
            (626) 652-2303
          </a>

          <Link href="/contact" className="rounded-sm border border-accent-red/50 bg-accent-red px-10 py-4 text-sm font-extrabold uppercase tracking-widest text-white shadow-2xl transition-colors duration-300 hover:-translate-y-1 hover:bg-[#990000] hover:shadow-[0_0_25px_rgba(179,18,23,0.5)]">
            Get a Free Estimate
          </Link>
        </div>
      </div>
    </section>
  );
};
