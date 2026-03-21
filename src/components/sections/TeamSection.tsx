import Link from 'next/link';

export const TeamSection = () => {
  const team = [
    { name: 'Israel', title: 'Founder, CEO & Prime Contractor', bio: 'Israel manages the physical execution of every Red Stag job site. He oversees all structural work, framing, and on-site crews to guarantee the build meets local codes and our standard of quality.', photo: '/images/team/israel.jpg' },
    { name: 'Anthony', title: 'COO & Prime Contractor', bio: 'Anthony drives day-to-day logistics, vendor management, and material procurement. He keeps every project phased, scheduled, and moving forward on timeline without costly delays.', photo: '/images/team/anthony.jpg' },
    { name: 'Zack', title: 'Head of Project Development', bio: 'Zack leads initial client consultations, site evaluations, and pre-construction planning. He breaks down the raw numbers, assesses structural feasibility, and guides homeowners through the permitting process.', photo: '/images/team/zack.jpg' }
  ];

  return (
    <section className="w-full bg-[#F5F0E8] py-20 md:py-32 px-6 md:px-12 text-[#2A2A2A] border-y border-[#dcd2c6] shadow-inner">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 md:mb-28">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-8">The Team Behind Your Project</h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-serif text-xl border-l-4 border-accent-red pl-6 py-2">
            15 years. 100+ projects. Every one permitted and delivered on time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {team.map((member, i) => (
            <div key={i} className="group flex cursor-pointer flex-col overflow-hidden rounded-sm bg-warm-white pb-8 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <div className="w-full aspect-[3/4] overflow-hidden mb-8 bg-gray-200 border-b-[6px] border-accent-red relative">
                <div className="pointer-events-none absolute inset-0 z-10 bg-accent-red/20 opacity-0 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-100"></div>
                <img src={member.photo} alt={member.name} className="relative z-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:grayscale-0 grayscale" />
              </div>
              <h3 className="mb-2 px-8 text-2xl font-bold uppercase tracking-widest text-[#111] transition-colors duration-300 group-hover:text-accent-red">{member.name}</h3>
              <p className="mb-6 px-8 text-xs font-bold uppercase tracking-[0.2em] text-accent-red">{member.title}</p>
              <p className="px-8 font-serif leading-relaxed text-gray-600 transition-colors duration-300 group-hover:text-[#2A2A2A]">{member.bio}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <Link href="/contact" className="inline-block bg-accent-red text-white text-sm md:text-base font-bold tracking-[0.2em] uppercase px-12 py-5 hover:bg-[#B31217] hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            Schedule a Consultation
          </Link>
        </div>
      </div>
    </section>
  );
};
