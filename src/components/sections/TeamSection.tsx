export const TeamSection = () => {
  const team = [
    { name: 'Israel', title: 'Founder, CEO & Prime Contractor', bio: 'Israel manages the physical execution of every Red Stag job site. He oversees all structural work, framing, and on-site crews to guarantee the build meets local codes and our standard of quality.', photo: '/images/team/israel.jpg' },
    { name: 'Anthony', title: 'COO & Prime Contractor', bio: 'Anthony drives day-to-day logistics, vendor management, and material procurement. He keeps every project phased, scheduled, and moving forward on timeline without costly delays.', photo: '/images/team/anthony.jpg' },
    { name: 'Zack', title: 'Head of Project Development', bio: 'Zack leads initial client consultations, site evaluations, and pre-construction planning. He breaks down the raw numbers, assesses structural feasibility, and guides homeowners through the permitting process.', photo: '/images/team/zack.jpg' }
  ];

  return (
    <section className="w-full bg-[#F5F0E8] py-24 md:py-32 px-6 md:px-12 text-[#2A2A2A] border-y border-[#dcd2c6] shadow-inner">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 md:mb-28">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-8">The Team Behind Your Project</h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-serif text-xl border-l-4 border-accent-red pl-6 py-2">Uncompromising standards require uncompromising leadership.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {team.map((member, i) => (
            <div key={i} className="flex flex-col group bg-warm-white shadow-xl hover:shadow-2xl transition-shadow pb-8 rounded-sm overflow-hidden">
              <div className="w-full aspect-[3/4] overflow-hidden mb-8 bg-gray-200 border-b-[6px] border-accent-red relative">
                <div className="absolute inset-0 bg-accent-red/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 duration-500 mix-blend-multiply"></div>
                <img src={member.photo} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 filter grayscale group-hover:grayscale-0 relative z-0" />
              </div>
              <h3 className="text-2xl font-bold uppercase tracking-widest px-8 mb-2 text-[#111]">{member.name}</h3>
              <p className="text-accent-red font-bold text-xs tracking-[0.2em] uppercase mb-6 px-8">{member.title}</p>
              <p className="text-gray-600 leading-relaxed font-serif px-8">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
