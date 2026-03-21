export const WhyRedStag = () => {
  return (
    <section className="w-full bg-[#F5F0E8] py-24 px-6 md:px-12 text-[#2A2A2A]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        {/* Left Informational Structural Tree */}
        <div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 leading-tight">Built Different.<br/>Managed Different.</h2>
          <div className="space-y-6 text-lg text-[#4a4a4a] leading-relaxed font-serif">
            <p>
              When you hire Red Stag Construction, you are not hiring a broker who subcontracts every phase of your build to the lowest bidder. You are hiring a dedicated design-build team that manages your project from the first architectural sketch to the final coat of paint.
            </p>
            <p>
              We bring the structural engineers, the permitted architects, and the master tradesmen together under one roof. This unified approach eliminates the traditional friction between designers and builders, ensuring your custom home, ADU, or luxury remodel is executed cleanly, on schedule, and to an exacting standard of quality.
            </p>
          </div>
        </div>

        {/* Right Feature Set Output */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center">
            <div className="w-16 h-16 rounded-full bg-primary-red/10 flex items-center justify-center mb-4 lg:mb-0 lg:mr-6 flex-shrink-0">
              <svg className="w-8 h-8 text-primary-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
            </div>
            <div>
              <h3 className="font-bold uppercase tracking-widest text-sm mb-2 text-[#111]">Design-Build Integrated</h3>
              <p className="text-sm text-[#4a4a4a] leading-relaxed">Architects and builders working in perfect sync. No miscommunications or costly redesigns.</p>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center">
            <div className="w-16 h-16 rounded-full bg-primary-red/10 flex items-center justify-center mb-4 lg:mb-0 lg:mr-6 flex-shrink-0">
              <svg className="w-8 h-8 text-primary-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
            </div>
            <div>
              <h3 className="font-bold uppercase tracking-widest text-sm mb-2 text-[#111]">In-House Engineering</h3>
              <p className="text-sm text-[#4a4a4a] leading-relaxed">Structural integrity is calculated from day one, not patched together as an afterthought.</p>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center">
            <div className="w-16 h-16 rounded-full bg-primary-red/10 flex items-center justify-center mb-4 lg:mb-0 lg:mr-6 flex-shrink-0">
              <svg className="w-8 h-8 text-primary-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.956 11.956 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
            <div>
              <h3 className="font-bold uppercase tracking-widest text-sm mb-2 text-[#111]">Permitted and Licensed</h3>
              <p className="text-sm text-[#4a4a4a] leading-relaxed">We navigate Los Angeles city planning, HOA constraints, and historic preservation boards for you.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
