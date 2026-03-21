import Link from 'next/link';

export const metadata = {
  title: "Thank You | Red Stag Construction",
  robots: "noindex, nofollow"
};

export default function ThankYou() {
  return (
    <div className="bg-navy-deep min-h-screen flex flex-col items-center justify-center py-24 px-4 text-center">
      <div className="text-accent-red font-bold text-xl tracking-widest uppercase mb-4">RED STAG CONSTRUCTION</div>
      <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">Your project is on our radar.</h1>
      <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-16">
        A member of the Red Stag team will reach out within 2 hours during business hours.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
        <div className="h-64 bg-navy-deep border border-gray-800 rounded flex items-center justify-center overflow-hidden relative">
          <img src="/images/projects/kitchen-remodel-beverly-hills-after-01.jpg" alt="Kitchen Remodel" className="object-cover w-full h-full opacity-60" />
        </div>
        <div className="h-64 bg-navy-deep border border-gray-800 rounded flex items-center justify-center overflow-hidden relative">
          <img src="/images/projects/bathroom-remodel-encino-after-01.jpg" alt="Bathroom Remodel" className="object-cover w-full h-full opacity-60" />
        </div>
        <div className="h-64 bg-navy-deep border border-gray-800 rounded flex items-center justify-center overflow-hidden relative">
          <img src="/images/projects/adu-construction-studio-city-after-01.jpg" alt="ADU Construction" className="object-cover w-full h-full opacity-60" />
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-6">
        <Link href="/our-work" className="bg-accent-red text-white px-8 py-4 rounded hover:bg-[#990000] font-bold shadow-lg transition-colors">
          View Our Work
        </Link>
        <Link href="/about" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded hover:bg-white hover:text-text-dark font-bold transition-colors">
          About Us
        </Link>
        <a href="https://search.google.com/local/writereview?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4" target="_blank" rel="noopener noreferrer" className="bg-white text-text-dark px-8 py-4 rounded hover:bg-gray-200 font-bold transition-colors">
          Read Google Reviews
        </a>
      </div>
    </div>
  );
}
