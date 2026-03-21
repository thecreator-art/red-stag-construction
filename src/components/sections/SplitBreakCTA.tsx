import Link from 'next/link';

export const SplitBreakCTA = () => {
  return (
    <section className="relative w-full py-40 md:py-56 px-6 flex items-center justify-center overflow-hidden border-y border-gray-900 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-20">
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
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-white leading-tight mb-8 drop-shadow-2xl">
          Ready to Build Something That Lasts?
        </h2>
        <p className="text-lg md:text-2xl text-gray-300 font-medium mb-16 drop-shadow-md max-w-2xl font-serif">
          Our schedule fills 6-8 weeks out. The sooner we talk, the sooner we build.
        </p>
        
        <a href="tel:6266522303" className="text-5xl md:text-7xl font-extrabold tracking-wider text-white hover:text-accent-red transition-colors mb-16 block drop-shadow-lg">
          (626) 652-2303
        </a>

        <Link href="/contact" className="bg-accent-red hover:bg-[#990000] transition-colors text-white font-extrabold tracking-widest uppercase px-16 py-6 rounded-sm shadow-2xl hover:-translate-y-1 transform duration-300 border border-accent-red/50 hover:shadow-[0_0_25px_rgba(179,18,23,0.5)]">
          Get a Free Estimate
        </Link>
      </div>
    </section>
  );
};
